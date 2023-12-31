
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useThemeContext } from "./ThemeContext";

export function NavMenu() {
    const { darkMode, toggleDarkMode } = useThemeContext();
    const handleThemeToggle = () => {
        toggleDarkMode();
    };
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="home"
          sx={{ mr: 2 }}
          component={Link}
          to="/"
        >
          <StorefrontIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Tools Bazaar
        </Typography>
        <Button component={Link} to="/all-products" color="inherit">
          All products
              </Button>
              <Button onClick={handleThemeToggle} color="inherit">
                  {darkMode ? "Light Mode" : "Dark Mode"}
              </Button>
      </Toolbar>
    </AppBar>
  );
}
