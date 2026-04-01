import { useState } from "react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Grid,
  Card,
  CardContent,
  Stack,
  Rating,
  TextField,
  Avatar,
  Divider,
  ImageList,
  ImageListItem,
  IconButton,
  Tooltip,
  Breadcrumbs,
  Link,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import HikingIcon from "@mui/icons-material/Hiking";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import TerrainIcon from "@mui/icons-material/Terrain";
import TimerIcon from "@mui/icons-material/Timer";
import StraightenIcon from "@mui/icons-material/Straighten";
import PetsIcon from "@mui/icons-material/Pets";
import LinkIcon from "@mui/icons-material/Link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { mockTrails } from "../data/mockTrails";
import type { TrailReview } from "../types/trail";

const typeIcons: Record<string, React.ReactElement> = {
  Cycling: <DirectionsBikeIcon />,
  Hiking: <HikingIcon />,
  Running: <DirectionsRunIcon />,
  "Mountain Biking": <TerrainIcon />,
};

const defaultIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const difficultyColor: Record<string, "success" | "warning" | "error"> = {
  Beginner: "success",
  Experienced: "warning",
  Advanced: "error",
};

export default function TrailDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const trail = mockTrails.find((t) => t.id === Number(id));

  const [isFavorite, setIsFavorite] = useState(false);
  const [reviewRating, setReviewRating] = useState<number | null>(null);
  const [reviewComment, setReviewComment] = useState("");
  const [reviews, setReviews] = useState<TrailReview[]>(trail?.reviews ?? []);

  if (!trail) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Trail not found</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          The trail you're looking for doesn't exist or has been removed.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/explore")}>
          Browse trails
        </Button>
      </Container>
    );
  }

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const similarTrails = mockTrails
    .filter((t) => t.id !== trail.id)
    .sort((a, b) => {
      const distA = Math.abs(a.lat - trail.lat) + Math.abs(a.lng - trail.lng);
      const distB = Math.abs(b.lat - trail.lat) + Math.abs(b.lng - trail.lng);
      return distA - distB;
    })
    .slice(0, 3);

  const photoMarkers = trail.photos.filter((p) => p.lat && p.lng);

  const handleSubmitReview = () => {
    if (!reviewRating) return;
    const newReview: TrailReview = {
      id: Date.now(),
      user: "You",
      rating: reviewRating,
      comment: reviewComment,
      date: "Just now",
    };
    setReviews((prev) => [newReview, ...prev]);
    setReviewRating(null);
    setReviewComment("");
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          {/* Breadcrumbs */}
          <Breadcrumbs sx={{ mb: 2 }}>
            <Link component={RouterLink} to="/explore" underline="hover" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <ArrowBackIcon sx={{ fontSize: 16 }} />
              Explore
            </Link>
            <Typography color="text.primary" variant="body2">{trail.name}</Typography>
          </Breadcrumbs>

          <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
            <Chip
              icon={typeIcons[trail.type]}
              label={trail.type}
              color="primary"
              variant="outlined"
            />
            <Chip
              label={trail.difficulty}
              color={difficultyColor[trail.difficulty]}
              variant="outlined"
            />
            <Chip label={trail.surface} variant="outlined" />
            {trail.dogFriendly && <Chip icon={<PetsIcon />} label="Dog friendly" variant="outlined" />}
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
            <Typography variant="h1" sx={{ fontSize: { xs: "2rem", md: "2.8rem" } }}>
              {trail.name}
            </Typography>
            <Stack direction="row" gap={1}>
              <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
                <IconButton
                  onClick={() => setIsFavorite(!isFavorite)}
                  sx={{
                    color: isFavorite ? "error.main" : "text.secondary",
                    transition: "color 0.2s, transform 0.2s",
                    "&:hover": { transform: "scale(1.1)" },
                  }}
                >
                  {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Share">
                <IconButton sx={{ color: "text.secondary" }}>
                  <ShareIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>

          <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 1 }}>
            {reviews.length > 0 && (
              <>
                <Rating value={avgRating} readOnly precision={0.5} size="small" />
                <Typography variant="body2" color="text.secondary">
                  {avgRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
                </Typography>
              </>
            )}
          </Stack>

          <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 2 }}>
            <LinkIcon sx={{ fontSize: 16, color: "text.secondary" }} />
            <Link
              href={trail.sourceUrl}
              target="_blank"
              rel="noopener"
              underline="hover"
              color="text.secondary"
              variant="body2"
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
              {trail.source}
              <OpenInNewIcon sx={{ fontSize: 12 }} />
            </Link>
          </Stack>

          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mb: 4 }}>
            {trail.description}
          </Typography>

          {/* Stats */}
          <Stack direction="row" flexWrap="wrap" gap={3}>
            <Stack direction="row" alignItems="center" gap={1}>
              <StraightenIcon sx={{ color: "primary.main" }} />
              <Box>
                <Typography variant="body2" color="text.secondary">Distance</Typography>
                <Typography variant="subtitle2">{trail.distance} km</Typography>
              </Box>
            </Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              <TerrainIcon sx={{ color: "primary.main" }} />
              <Box>
                <Typography variant="body2" color="text.secondary">Elevation</Typography>
                <Typography variant="subtitle2">{trail.elevation} m</Typography>
              </Box>
            </Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              <TimerIcon sx={{ color: "primary.main" }} />
              <Box>
                <Typography variant="body2" color="text.secondary">Duration</Typography>
                <Typography variant="subtitle2">{trail.duration}</Typography>
              </Box>
            </Stack>
          </Stack>

          <Box sx={{ mt: 3 }}>
            <Button variant="contained" startIcon={<DownloadIcon />} size="large">
              Download GPX
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={4}>
          {/* Left column */}
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Photo gallery */}
            <Typography variant="h4" sx={{ mb: 2 }}>
              Photos
            </Typography>
            <ImageList cols={3} gap={8} sx={{ mb: 4 }}>
              {trail.photos.slice(0, 6).map((photo, index) => (
                <ImageListItem
                  key={photo.id}
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      height: 160,
                      bgcolor: "rgba(124, 77, 255, 0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      filter: index === 5 && trail.photos.length > 6 ? "blur(8px)" : "none",
                    }}
                  >
                    <TerrainIcon sx={{ fontSize: 32, color: "text.secondary", opacity: 0.2 }} />
                  </Box>
                  {index === 5 && trail.photos.length > 6 && (
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "rgba(0,0,0,0.3)",
                      }}
                    >
                      <Typography variant="subtitle2" color="white">
                        +{trail.photos.length - 5} more
                      </Typography>
                    </Box>
                  )}
                </ImageListItem>
              ))}
            </ImageList>

            {/* Map */}
            <Typography variant="h4" sx={{ mb: 2 }}>
              Route map
            </Typography>
            <Box
              sx={{
                height: 350,
                borderRadius: 2,
                overflow: "hidden",
                border: 1,
                borderColor: "divider",
                mb: 4,
              }}
            >
              <MapContainer
                center={[trail.lat, trail.lng]}
                zoom={12}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                <Marker position={[trail.lat, trail.lng]} icon={defaultIcon}>
                  <Popup>{trail.name}</Popup>
                </Marker>
                {photoMarkers.map((photo) => (
                  <CircleMarker
                    key={photo.id}
                    center={[photo.lat!, photo.lng!]}
                    radius={6}
                    pathOptions={{
                      color: "#7c4dff",
                      fillColor: "#7c4dff",
                      fillOpacity: 0.8,
                    }}
                  >
                    <Popup>Photo location</Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
            </Box>

            {/* Reviews */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
              <Typography variant="h4">
                Reviews ({reviews.length})
              </Typography>
              {reviews.length > 0 && (
                <Stack direction="row" alignItems="center" gap={0.5}>
                  <Rating value={avgRating} readOnly precision={0.5} size="small" />
                  <Typography variant="body2" color="text.secondary">
                    {avgRating.toFixed(1)}
                  </Typography>
                </Stack>
              )}
            </Stack>

            {/* Add review */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Leave a review</Typography>
                <Rating
                  value={reviewRating}
                  onChange={(_, val) => setReviewRating(val)}
                  size="small"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Share your experience..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleSubmitReview}
                  disabled={!reviewRating}
                >
                  Submit
                </Button>
              </CardContent>
            </Card>

            <Stack spacing={2} sx={{ mb: 3 }}>
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                      <Stack direction="row" alignItems="center" gap={1}>
                        <Avatar sx={{ width: 28, height: 28, fontSize: 12, bgcolor: "primary.dark" }}>
                          {review.user[0]}
                        </Avatar>
                        <Typography variant="subtitle2">{review.user}</Typography>
                      </Stack>
                      <Typography variant="caption" color="text.secondary">{review.date}</Typography>
                    </Stack>
                    <Rating value={review.rating} readOnly size="small" sx={{ mb: 0.5 }} />
                    {review.comment && (
                      <Typography variant="body2" color="text.secondary">{review.comment}</Typography>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>

          {/* Right column */}
          <Grid size={{ xs: 12, md: 4 }}>
            {/* Trail info card */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Trail info</Typography>
                <Stack spacing={1.5}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">Region</Typography>
                    <Typography variant="body2">{trail.region}, {trail.country}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">Surface</Typography>
                    <Typography variant="body2">{trail.surface}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">Dog friendly</Typography>
                    <Typography variant="body2">{trail.dogFriendly ? "Yes" : "No"}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">Difficulty</Typography>
                    <Chip label={trail.difficulty} size="small" color={difficultyColor[trail.difficulty]} variant="outlined" />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            <Button variant="outlined" fullWidth startIcon={<DownloadIcon />} sx={{ mb: 3 }}>
              Download GPX
            </Button>

            <Divider sx={{ my: 3 }} />

            {/* Similar trails nearby */}
            <Typography variant="h4" sx={{ mb: 2 }}>
              Similar trails nearby
            </Typography>
            <Stack spacing={2}>
              {similarTrails.map((t) => (
                <Card
                  key={t.id}
                  component={RouterLink}
                  to={`/trail/${t.id}`}
                  sx={{
                    cursor: "pointer",
                    textDecoration: "none",
                    transition: "border-color 0.2s",
                    "&:hover": { borderColor: "primary.main" },
                  }}
                >
                  <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                    <Typography variant="subtitle2">{t.name}</Typography>
                    <Stack direction="row" gap={1} sx={{ mt: 1, mb: 1 }}>
                      <Chip label={t.type} size="small" variant="outlined" />
                      <Chip label={t.difficulty} size="small" variant="outlined" color={difficultyColor[t.difficulty]} />
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                      {t.distance} km &middot; {t.elevation}m elev.
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
