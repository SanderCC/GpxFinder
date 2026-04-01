import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import TerrainIcon from "@mui/icons-material/Terrain";
import GroupsIcon from "@mui/icons-material/Groups";

export default function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <SearchIcon sx={{ fontSize: 32 }} />,
      title: "Search anywhere",
      description:
        "Find trails by city, region, or name. If we don't have your area yet, we'll search for trails on the spot.",
    },
    {
      icon: <MapIcon sx={{ fontSize: 32 }} />,
      title: "Preview the route",
      description:
        "Browse photos along the trail, check difficulty, distance, and elevation before you go.",
    },
    {
      icon: <DownloadIcon sx={{ fontSize: 32 }} />,
      title: "Free GPX downloads",
      description:
        "Download GPX files for any trail — no account needed. Load them on your GPS device or phone.",
    },
    {
      icon: <TerrainIcon sx={{ fontSize: 32 }} />,
      title: "Compare difficulty",
      description:
        "See overlapping trails side by side. Find the right route for your level — beginner to advanced.",
    },
    {
      icon: <ExploreIcon sx={{ fontSize: 32 }} />,
      title: "Discover new areas",
      description:
        "Search an uncovered region and our crawlers will find trails from public sources in real time.",
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 32 }} />,
      title: "Community driven",
      description:
        "Upload your own trails and photos. Rate and review routes to help fellow adventurers.",
    },
  ];

  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(124, 77, 255, 0.12) 0%, transparent 60%)",
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center", position: "relative", py: 8 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.2rem", md: "3.5rem" },
              mb: 2,
              lineHeight: 1.15,
            }}
          >
            Discover trails.{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(135deg, #7c4dff, #00e676)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Explore freely.
            </Box>
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 5, fontWeight: 400, maxWidth: 560, mx: "auto", lineHeight: 1.6 }}
          >
            Browse cycling and hiking trails around the world. Preview photos, check the stats, and
            download GPX files — all for free.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              startIcon={<MapIcon />}
              onClick={() => navigate("/explore")}
              sx={{ px: 4, py: 1.5 }}
            >
              Explore trails
            </Button>
            <Button
              variant="outlined"
              size="large"
              color="inherit"
              onClick={() => {
                document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
              }}
              sx={{
                px: 4,
                py: 1.5,
                borderColor: "rgba(255,255,255,0.12)",
                "&:hover": { borderColor: "rgba(255,255,255,0.3)" },
              }}
            >
              How it works
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Features */}
      <Box id="how-it-works" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" textAlign="center" sx={{ mb: 1 }}>
            Everything you need
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            sx={{ mb: 6, maxWidth: 500, mx: "auto" }}
          >
            From discovery to download, GpxFinder gives you the full picture of any trail.
          </Typography>

          <Grid container spacing={3}>
            {features.map((feature) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={feature.title}>
                <Card
                  sx={{
                    height: "100%",
                    bgcolor: "background.paper",
                    transition: "border-color 0.2s",
                    "&:hover": { borderColor: "rgba(124, 77, 255, 0.3)" },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ color: "primary.main", mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ py: { xs: 6, md: 8 }, borderTop: 1, borderColor: "divider" }}>
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Ready to explore?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Start browsing trails now — no account required.
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<ExploreIcon />}
            onClick={() => navigate("/explore")}
            sx={{ px: 4, py: 1.5 }}
          >
            Open the map
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
