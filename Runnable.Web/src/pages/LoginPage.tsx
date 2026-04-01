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
} from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        position: "relative",
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
            Welcome back
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Sign in to your GpxFinder account
          </Typography>
        </Box>

        <Card>
          <CardContent sx={{ p: 3 }}>
            <Stack spacing={2.5}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="contained" fullWidth size="large" sx={{ mt: 1 }}>
                Sign in
              </Button>
            </Stack>
          </CardContent>
        </Card>

        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mt: 3 }}>
          Don't have an account?{" "}
          <Link
            component="button"
            onClick={() => navigate("/register")}
            sx={{ color: "primary.main", cursor: "pointer" }}
          >
            Get started
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
