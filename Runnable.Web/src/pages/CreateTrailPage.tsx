import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Chip,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DrawIcon from "@mui/icons-material/Draw";
import TerrainIcon from "@mui/icons-material/Terrain";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

export default function CreateTrailPage() {
  const [mode, setMode] = useState<"upload" | "draw">("upload");

  return (
    <Box sx={{ py: { xs: 4, md: 6 } }}>
      <Container maxWidth="md">
        <Typography variant="h3" sx={{ mb: 1 }}>
          Create a trail
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Upload a GPX file or draw a route on the map.
        </Typography>

        {/* Mode selector */}
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_, val) => { if (val) setMode(val); }}
          sx={{ mb: 4 }}
        >
          <ToggleButton value="upload">
            <CloudUploadIcon sx={{ mr: 1, fontSize: 18 }} />
            Upload GPX
          </ToggleButton>
          <ToggleButton value="draw">
            <DrawIcon sx={{ mr: 1, fontSize: 18 }} />
            Draw on map
          </ToggleButton>
        </ToggleButtonGroup>

        {/* GPX Upload or Map Draw */}
        {mode === "upload" ? (
          <Card sx={{ mb: 3 }}>
            <CardContent
              sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                border: "2px dashed",
                borderColor: "divider",
                borderRadius: 2,
                cursor: "pointer",
                "&:hover": { borderColor: "primary.main" },
              }}
            >
              <CloudUploadIcon sx={{ fontSize: 48, color: "text.secondary" }} />
              <Typography color="text.secondary">
                Drag and drop a .gpx file, or click to browse
              </Typography>
              <Button variant="outlined" size="small">
                Choose file
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card sx={{ mb: 3 }}>
            <Box
              sx={{
                height: 350,
                bgcolor: "rgba(124, 77, 255, 0.03)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <TerrainIcon sx={{ fontSize: 48, color: "text.secondary", opacity: 0.3 }} />
              <Typography color="text.secondary" variant="body2">
                Leaflet drawing tool will render here
              </Typography>
            </Box>
          </Card>
        )}

        {/* Trail details form */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Trail details
            </Typography>
            <Stack spacing={2.5}>
              <TextField label="Trail name" fullWidth />
              <TextField label="Description" fullWidth multiline rows={3} />

              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Trail type
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {["Cycling", "Hiking", "Running", "Mountain Biking", "Gravel", "Walking"].map(
                    (type) => (
                      <Chip key={type} label={type} variant="outlined" clickable />
                    )
                  )}
                </Stack>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Surface type
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {["Paved", "Gravel", "Dirt", "Sand", "Rock", "Grass", "Mixed"].map((s) => (
                    <Chip key={s} label={s} variant="outlined" clickable />
                  ))}
                </Stack>
              </Box>

              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Dog friendly"
                />
              </FormGroup>
            </Stack>
          </CardContent>
        </Card>

        {/* Photo upload */}
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Photos (optional)
            </Typography>
            <Box
              sx={{
                p: 3,
                border: "2px dashed",
                borderColor: "divider",
                borderRadius: 2,
                textAlign: "center",
                cursor: "pointer",
                "&:hover": { borderColor: "primary.main" },
              }}
            >
              <AddPhotoAlternateIcon sx={{ fontSize: 36, color: "text.secondary", mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Drop photos here, or click to browse
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button variant="outlined" color="inherit">Cancel</Button>
          <Button variant="contained" size="large">Publish trail</Button>
        </Stack>
      </Container>
    </Box>
  );
}
