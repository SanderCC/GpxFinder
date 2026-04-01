import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const mockFavorites = [
  { id: 1, name: "Ravel de l'Ourthe", type: "Cycling", difficulty: "Beginner", distance: 42, elevation: 180 },
  { id: 2, name: "GR 5 Ardennes", type: "Hiking", difficulty: "Advanced", distance: 28, elevation: 650 },
  { id: 3, name: "Vennbahn Trail", type: "Cycling", difficulty: "Experienced", distance: 125, elevation: 420 },
];

export default function FavoritesPage() {
  return (
    <Box sx={{ py: { xs: 4, md: 6 } }}>
      <Container maxWidth="md">
        <Stack direction="row" alignItems="center" gap={1.5} sx={{ mb: 4 }}>
          <FavoriteIcon sx={{ color: "primary.main" }} />
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Favorites
          </Typography>
        </Stack>

        {mockFavorites.length === 0 ? (
          <Typography color="text.secondary">
            You haven't saved any favorites yet. Explore trails and click the heart icon to save them here.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {mockFavorites.map((trail) => (
              <Card
                key={trail.id}
                sx={{
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                  "&:hover": { borderColor: "primary.main" },
                }}
              >
                <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        {trail.name}
                      </Typography>
                      <Stack direction="row" gap={1} sx={{ mt: 0.5, mb: 0.5 }}>
                        <Chip label={trail.type} size="small" variant="outlined" />
                        <Chip label={trail.difficulty} size="small" variant="outlined" color="primary" />
                      </Stack>
                      <Typography variant="caption" color="text.secondary">
                        {trail.distance} km &middot; {trail.elevation}m elevation
                      </Typography>
                    </Box>
                    <IconButton size="small">
                      <ArrowForwardIcon />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}
