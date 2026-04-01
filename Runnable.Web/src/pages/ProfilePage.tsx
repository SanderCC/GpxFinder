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
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

export default function ProfilePage() {
  return (
    <Box sx={{ py: { xs: 4, md: 6 } }}>
      <Container maxWidth="sm">
        <Stack direction="row" alignItems="center" gap={1.5} sx={{ mb: 4 }}>
          <PersonIcon sx={{ color: "primary.main", fontSize: 28 }} />
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Profile
          </Typography>
        </Stack>

        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Personal info
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <TextField label="First name" fullWidth defaultValue="Sander" />
                <TextField label="Last name" fullWidth defaultValue="" />
              </Stack>
              <TextField label="Hometown" fullWidth defaultValue="" />
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Preferences
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Distance unit
            </Typography>
            <ToggleButtonGroup
              exclusive
              value="km"
              size="small"
            >
              <ToggleButton value="km">Kilometers</ToggleButton>
              <ToggleButton value="mi">Miles</ToggleButton>
            </ToggleButtonGroup>
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Change password
            </Typography>
            <Stack spacing={2}>
              <TextField label="Current password" type="password" fullWidth />
              <TextField label="New password" type="password" fullWidth />
            </Stack>
          </CardContent>
        </Card>

        <Divider sx={{ my: 3 }} />

        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button variant="outlined" color="inherit">Cancel</Button>
          <Button variant="contained">Save changes</Button>
        </Stack>
      </Container>
    </Box>
  );
}
