import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Link,
  Stack,
  Grid,
} from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    hometown: "",
  });

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        position: "relative",
        py: 4,
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(124, 77, 255, 0.08) 0%, transparent 60%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="xs" sx={{ position: "relative" }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <ExploreIcon sx={{ fontSize: 40, color: "primary.main", mb: 1 }} />
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Create your account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Join GpxFinder to save trails, write reviews, and more
          </Typography>
        </Box>

        <Card>
          <CardContent sx={{ p: 3 }}>
            <Stack spacing={2.5}>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    label="First name"
                    fullWidth
                    value={form.firstName}
                    onChange={update("firstName")}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    label="Last name"
                    fullWidth
                    value={form.lastName}
                    onChange={update("lastName")}
                  />
                </Grid>
              </Grid>
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={form.email}
                onChange={update("email")}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                value={form.password}
                onChange={update("password")}
              />
              <TextField
                label="Hometown"
                fullWidth
                value={form.hometown}
                onChange={update("hometown")}
                helperText="Used to suggest trails near you"
              />
              <Button variant="contained" fullWidth size="large" sx={{ mt: 1 }}>
                Create account
              </Button>
            </Stack>
          </CardContent>
        </Card>

        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mt: 3 }}>
          Already have an account?{" "}
          <Link
            component="button"
            onClick={() => navigate("/login")}
            sx={{ color: "primary.main", cursor: "pointer" }}
          >
            Sign in
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
