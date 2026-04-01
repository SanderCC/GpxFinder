import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
  IconButton,
  Chip,
} from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const mockLists = [
  {
    id: 1,
    name: "Summer 2026 plans",
    trailCount: 5,
    trails: [
      { name: "Ravel de l'Ourthe", type: "Cycling" },
      { name: "GR 5 Ardennes", type: "Hiking" },
    ],
  },
  {
    id: 2,
    name: "Azores trip",
    trailCount: 3,
    trails: [
      { name: "Sete Cidades Loop", type: "Hiking" },
    ],
  },
];

export default function ListsPage() {
  return (
    <Box sx={{ py: { xs: 4, md: 6 } }}>
      <Container maxWidth="md">
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Stack direction="row" alignItems="center" gap={1.5}>
            <ListAltIcon sx={{ color: "primary.main" }} />
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              My Lists
            </Typography>
          </Stack>
          <Button variant="contained" size="small" startIcon={<AddIcon />}>
            New list
          </Button>
        </Stack>

        <Stack spacing={2}>
          {mockLists.map((list) => (
            <Card
              key={list.id}
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
                      {list.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
                      {list.trailCount} trails
                    </Typography>
                    <Stack direction="row" gap={1} flexWrap="wrap">
                      {list.trails.map((t) => (
                        <Chip key={t.name} label={t.name} size="small" variant="outlined" />
                      ))}
                      {list.trailCount > list.trails.length && (
                        <Chip
                          label={`+${list.trailCount - list.trails.length} more`}
                          size="small"
                          variant="outlined"
                          color="primary"
                        />
                      )}
                    </Stack>
                  </Box>
                  <IconButton size="small">
                    <ArrowForwardIcon />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
