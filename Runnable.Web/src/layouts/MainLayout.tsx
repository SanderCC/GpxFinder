import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExploreIcon from "@mui/icons-material/Explore";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function MainLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navItems = [
    { label: "Home", path: "/", icon: <HomeIcon /> },
    { label: "Explore", path: "/explore", icon: <MapIcon /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ maxWidth: 1200, width: "100%", mx: "auto", px: { xs: 2, md: 3 } }}>
          <ExploreIcon sx={{ color: "primary.main", mr: 1 }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              cursor: "pointer",
              background: "linear-gradient(135deg, #7c4dff, #00e676)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            onClick={() => navigate("/")}
          >
            GpxFinder
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {!isMobile && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  color="inherit"
                  onClick={() => navigate(item.path)}
                  sx={{
                    color: isActive(item.path) ? "primary.main" : "text.secondary",
                    "&:hover": { color: "text.primary" },
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Box sx={{ width: 1, height: 24, bgcolor: "divider", mx: 1 }} />
              <Button
                variant="text"
                color="inherit"
                onClick={() => navigate("/login")}
                sx={{ color: "text.secondary" }}
              >
                Sign in
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => navigate("/register")}
              >
                Get started
              </Button>
            </Box>
          )}

          {isMobile && (
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 260, bgcolor: "background.paper" } }}
      >
        <List sx={{ pt: 2 }}>
          {navItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => { navigate(item.path); setDrawerOpen(false); }}
                selected={isActive(item.path)}
              >
                <ListItemIcon sx={{ minWidth: 40, color: isActive(item.path) ? "primary.main" : "text.secondary" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
          <Box sx={{ my: 2, mx: 2, borderTop: 1, borderColor: "divider" }} />
          <ListItem disablePadding>
            <ListItemButton onClick={() => { navigate("/login"); setDrawerOpen(false); }}>
              <ListItemIcon sx={{ minWidth: 40 }}><LoginIcon /></ListItemIcon>
              <ListItemText primary="Sign in" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => { navigate("/register"); setDrawerOpen(false); }}>
              <ListItemIcon sx={{ minWidth: 40 }}><PersonAddIcon /></ListItemIcon>
              <ListItemText primary="Get started" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      <Box
        component="footer"
        sx={{
          borderTop: 1,
          borderColor: "divider",
          py: 3,
          px: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          GpxFinder — Free trail discovery for everyone.
        </Typography>
      </Box>
    </Box>
  );
}
