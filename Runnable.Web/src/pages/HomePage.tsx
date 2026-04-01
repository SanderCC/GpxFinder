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
  keyframes,
} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import TerrainIcon from "@mui/icons-material/Terrain";
import GroupsIcon from "@mui/icons-material/Groups";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.12; transform: scale(1); }
  50% { opacity: 0.2; transform: scale(1.05); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

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
          minHeight: { xs: "calc(100vh - 64px)", md: "70vh" },
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
            animation: `${pulse} 4s ease-in-out infinite`,
          },
        }}
      >
        {/* Floating background orbs */}
        <Box
          sx={{
            position: "absolute",
            width: { xs: 200, md: 300 },
            height: { xs: 200, md: 300 },
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124, 77, 255, 0.08), transparent 70%)",
            top: "10%",
            left: "5%",
            animation: `${float} 6s ease-in-out infinite`,
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: { xs: 150, md: 250 },
            height: { xs: 150, md: 250 },
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 230, 118, 0.06), transparent 70%)",
            bottom: "15%",
            right: "8%",
            animation: `${float} 8s ease-in-out infinite 1s`,
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="md" sx={{ textAlign: "center", position: "relative", py: { xs: 6, md: 8 } }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
              mb: 2,
              lineHeight: 1.15,
              animation: `${fadeInUp} 0.8s ease-out`,
            }}
          >
            Discover trails.{" "}
            <Box
              component="span"
              sx={{
                background:
                  "linear-gradient(135deg, #7c4dff, #00e676, #7c4dff)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: `${shimmer} 4s linear infinite`,
              }}
            >
              Explore freely.
            </Box>
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              mb: 5,
              fontWeight: 400,
              maxWidth: 560,
              mx: "auto",
              lineHeight: 1.6,
              fontSize: { xs: "1rem", md: "1.25rem" },
              animation: `${fadeInUp} 0.8s ease-out 0.15s both`,
            }}
          >
            Browse cycling and hiking trails around the world. Preview photos, check the stats, and
            download GPX files — all for free.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            sx={{ animation: `${fadeInUp} 0.8s ease-out 0.3s both` }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<MapIcon />}
              onClick={() => navigate("/explore")}
              sx={{
                px: 4,
                py: 1.5,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 30px rgba(124, 77, 255, 0.4)",
                },
              }}
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
                transition: "transform 0.2s, border-color 0.2s",
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.3)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              How it works
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Features */}
      <Box id="how-it-works" sx={{ py: { xs: 6, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            textAlign="center"
            sx={{
              mb: 1,
              fontSize: { xs: "1.6rem", md: "2rem" },
              animation: `${fadeIn} 0.6s ease-out`,
            }}
          >
            Everything you need
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            sx={{ mb: { xs: 4, md: 6 }, maxWidth: 500, mx: "auto" }}
          >
            From discovery to download, GpxFinder gives you the full picture of any trail.
          </Typography>

          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={feature.title}>
                <Card
                  sx={{
                    height: "100%",
                    bgcolor: "background.paper",
                    transition: "transform 0.25s, border-color 0.25s, box-shadow 0.25s",
                    animation: `${fadeInUp} 0.6s ease-out ${index * 0.1}s both`,
                    "&:hover": {
                      borderColor: "rgba(124, 77, 255, 0.3)",
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        color: "primary.main",
                        mb: 2,
                        transition: "transform 0.3s",
                        display: "inline-flex",
                        ".MuiCard-root:hover &": {
                          transform: "scale(1.15)",
                        },
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 500, fontSize: { xs: "1rem", md: "1.25rem" } }}>
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
          <Typography variant="h3" sx={{ mb: 2, fontSize: { xs: "1.3rem", md: "1.5rem" } }}>
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
            sx={{
              px: 4,
              py: 1.5,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 30px rgba(124, 77, 255, 0.4)",
              },
            }}
          >
            Open the map
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
