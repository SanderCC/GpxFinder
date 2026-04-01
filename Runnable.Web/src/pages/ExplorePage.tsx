import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  InputAdornment,
  Chip,
  Paper,
  Typography,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
  Stack,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import HikingIcon from "@mui/icons-material/Hiking";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import TerrainIcon from "@mui/icons-material/Terrain";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { mockTrails } from "../data/mockTrails";

const trailTypes = [
  { label: "Cycling", icon: <DirectionsBikeIcon sx={{ fontSize: 16 }} /> },
  { label: "Hiking", icon: <HikingIcon sx={{ fontSize: 16 }} /> },
  { label: "Running", icon: <DirectionsRunIcon sx={{ fontSize: 16 }} /> },
  { label: "Mountain Biking", icon: <TerrainIcon sx={{ fontSize: 16 }} /> },
];

const difficulties = ["Beginner", "Experienced", "Advanced"];

// Fix default marker icon for Leaflet + bundlers
const defaultIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function ExplorePage() {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [distanceRange, setDistanceRange] = useState<number[]>([0, 200]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleType = (label: string) => {
    setSelectedTypes((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label]
    );
  };

  const filteredTrails = mockTrails.filter((trail) => {
    if (search && !trail.name.toLowerCase().includes(search.toLowerCase()) &&
        !trail.region.toLowerCase().includes(search.toLowerCase()) &&
        !trail.country.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (selectedTypes.length > 0 && !selectedTypes.includes(trail.type)) {
      return false;
    }
    if (trail.distance < distanceRange[0] || trail.distance > distanceRange[1]) {
      return false;
    }
    return true;
  });

  const filterContent = (
    <Box sx={{ p: 3, width: isMobile ? 300 : "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Filters
        </Typography>
        {isMobile && (
          <IconButton size="small" onClick={() => setFilterOpen(false)}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
        Trail type
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 3 }}>
        {trailTypes.map((type) => (
          <Chip
            key={type.label}
            label={type.label}
            icon={type.icon}
            onClick={() => toggleType(type.label)}
            variant={selectedTypes.includes(type.label) ? "filled" : "outlined"}
            color={selectedTypes.includes(type.label) ? "primary" : "default"}
            size="small"
          />
        ))}
      </Stack>

      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
        Difficulty
      </Typography>
      <FormGroup sx={{ mb: 3 }}>
        {difficulties.map((d) => (
          <FormControlLabel
            key={d}
            control={<Checkbox size="small" />}
            label={<Typography variant="body2">{d}</Typography>}
          />
        ))}
      </FormGroup>

      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
        Distance (km)
      </Typography>
      <Slider
        value={distanceRange}
        onChange={(_, val) => setDistanceRange(val as number[])}
        min={0}
        max={200}
        valueLabelDisplay="auto"
        size="small"
        sx={{ mb: 3 }}
      />

      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
        Surface type
      </Typography>
      <FormGroup>
        {["Paved", "Gravel", "Dirt", "Mixed"].map((s) => (
          <FormControlLabel
            key={s}
            control={<Checkbox size="small" />}
            label={<Typography variant="body2">{s}</Typography>}
          />
        ))}
      </FormGroup>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "calc(100vh - 64px)", overflow: "hidden" }}>
      {/* Sidebar filters (desktop) */}
      {!isMobile && (
        <Paper
          elevation={0}
          sx={{
            width: 280,
            flexShrink: 0,
            borderRight: 1,
            borderColor: "divider",
            overflowY: "auto",
          }}
        >
          {filterContent}
        </Paper>
      )}

      {/* Mobile filter drawer */}
      <Drawer
        anchor="left"
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        PaperProps={{ sx: { bgcolor: "background.paper" } }}
      >
        {filterContent}
      </Drawer>

      {/* Main content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Search bar */}
        <Box
          sx={{
            p: 2,
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          {isMobile && (
            <IconButton onClick={() => setFilterOpen(true)}>
              <FilterListIcon />
            </IconButton>
          )}
          <TextField
            fullWidth
            placeholder="Search by city, region, or trail name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {/* Map + trail preview cards */}
        <Box sx={{ flexGrow: 1, position: "relative" }}>
          {/* Leaflet map */}
          <MapContainer
            center={[50.5, 5.5]}
            zoom={8}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {filteredTrails.map((trail) => (
              <Marker key={trail.id} position={[trail.lat, trail.lng]} icon={defaultIcon}>
                <Popup>
                  <strong>{trail.name}</strong>
                  <br />
                  {trail.type} &middot; {trail.difficulty}
                  <br />
                  {trail.distance} km &middot; {trail.elevation}m elev.
                  <br />
                  <a
                    href={`/trail/${trail.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/trail/${trail.id}`);
                    }}
                    style={{ color: "#7c4dff" }}
                  >
                    View details →
                  </a>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Trail preview cards (overlay) */}
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              left: 16,
              right: 16,
              zIndex: 1000,
              display: "flex",
              gap: 2,
              overflowX: "auto",
              pb: 1,
              "&::-webkit-scrollbar": { height: 4 },
              "&::-webkit-scrollbar-thumb": { bgcolor: "rgba(255,255,255,0.1)", borderRadius: 2 },
            }}
          >
            {filteredTrails.map((trail) => (
              <Card
                key={trail.id}
                onClick={() => navigate(`/trail/${trail.id}`)}
                sx={{
                  minWidth: 240,
                  maxWidth: 280,
                  flexShrink: 0,
                  cursor: "pointer",
                  transition: "transform 0.2s, border-color 0.2s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    borderColor: "primary.main",
                  },
                }}
              >
                <CardMedia
                  sx={{
                    height: 100,
                    bgcolor: "rgba(124, 77, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TerrainIcon sx={{ fontSize: 32, color: "text.secondary", opacity: 0.3 }} />
                </CardMedia>
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  <Typography variant="subtitle2" noWrap>
                    {trail.name}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 0.5, mb: 1 }}>
                    <Chip label={trail.type} size="small" variant="outlined" />
                    <Chip label={trail.difficulty} size="small" color="primary" variant="outlined" />
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="caption" color="text.secondary">
                      {trail.distance} km &middot; {trail.elevation}m elev.
                    </Typography>
                    <ArrowForwardIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
