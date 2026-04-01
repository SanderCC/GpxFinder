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
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import TerrainIcon from "@mui/icons-material/Terrain";
import TimerIcon from "@mui/icons-material/Timer";
import StraightenIcon from "@mui/icons-material/Straighten";
import PetsIcon from "@mui/icons-material/Pets";
import LinkIcon from "@mui/icons-material/Link";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

// Mock data
const trail = {
  name: "Ravel de l'Ourthe",
  type: "Cycling",
  difficulty: "Beginner",
  distance: 42,
  elevation: 180,
  duration: "2h 30m",
  surface: "Paved",
  dogFriendly: true,
  source: "ravel.wallonie.be",
  sourceUrl: "https://ravel.wallonie.be",
  description:
    "A beautiful cycling path along the Ourthe river valley, passing through picturesque villages and lush forests. The route is mostly flat, making it perfect for beginners and families.",
};

const mockPhotos = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  isBlurred: i === 5,
}));

const overlappingTrails = [
  { name: "Ourthe Valley Loop", difficulty: "Experienced", distance: 68, type: "Cycling" },
  { name: "Ourthe Riverside Walk", difficulty: "Beginner", distance: 12, type: "Hiking" },
];

const reviews = [
  { user: "Marie L.", rating: 5, comment: "Beautiful route, very well maintained!", date: "2 weeks ago" },
  { user: "Thomas D.", rating: 4, comment: "Nice scenery, a bit crowded on weekends.", date: "1 month ago" },
];

export default function TrailDetailPage() {
  return (
    <Box>
      {/* Header */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
            <Chip icon={<DirectionsBikeIcon />} label={trail.type} color="primary" variant="outlined" />
            <Chip label={trail.difficulty} color="secondary" variant="outlined" />
            <Chip label={trail.surface} variant="outlined" />
            {trail.dogFriendly && <Chip icon={<PetsIcon />} label="Dog friendly" variant="outlined" />}
          </Stack>

          <Typography variant="h1" sx={{ fontSize: { xs: "2rem", md: "2.8rem" }, mb: 1 }}>
            {trail.name}
          </Typography>

          <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 3 }}>
            <LinkIcon sx={{ fontSize: 16, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              Source: {trail.source}
            </Typography>
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
              {mockPhotos.map((photo) => (
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
                      filter: photo.isBlurred ? "blur(8px)" : "none",
                    }}
                  >
                    <TerrainIcon sx={{ fontSize: 32, color: "text.secondary", opacity: 0.2 }} />
                  </Box>
                  {photo.isBlurred && (
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
                        View all photos
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
                bgcolor: "rgba(124, 77, 255, 0.03)",
                borderRadius: 2,
                border: 1,
                borderColor: "divider",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 1,
                mb: 4,
              }}
            >
              <TerrainIcon sx={{ fontSize: 48, color: "text.secondary", opacity: 0.3 }} />
              <Typography color="text.secondary" variant="body2">
                Leaflet map with GPX route + photo markers
              </Typography>
            </Box>

            {/* Reviews */}
            <Typography variant="h4" sx={{ mb: 2 }}>
              Reviews
            </Typography>
            <Stack spacing={2} sx={{ mb: 3 }}>
              {reviews.map((review, i) => (
                <Card key={i}>
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
                    <Typography variant="body2" color="text.secondary">{review.comment}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>

            {/* Add review */}
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Leave a review</Typography>
                <Rating size="small" sx={{ mb: 2 }} />
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Share your experience..."
                  sx={{ mb: 2 }}
                />
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" size="small">Submit</Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    startIcon={<ThumbDownOffAltIcon />}
                  >
                    Dislike trail
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Right column */}
          <Grid size={{ xs: 12, md: 4 }}>
            {/* Overlapping trails */}
            <Typography variant="h4" sx={{ mb: 2 }}>
              Similar trails nearby
            </Typography>
            <Stack spacing={2}>
              {overlappingTrails.map((t, i) => (
                <Card
                  key={i}
                  sx={{
                    cursor: "pointer",
                    transition: "border-color 0.2s",
                    "&:hover": { borderColor: "primary.main" },
                  }}
                >
                  <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                    <Typography variant="subtitle2">{t.name}</Typography>
                    <Stack direction="row" gap={1} sx={{ mt: 1, mb: 1 }}>
                      <Chip label={t.type} size="small" variant="outlined" />
                      <Chip label={t.difficulty} size="small" variant="outlined" color="primary" />
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                      {t.distance} km
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Button variant="outlined" fullWidth startIcon={<DownloadIcon />}>
              Download GPX
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
