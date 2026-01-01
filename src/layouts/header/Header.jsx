import apiList from "../../constants/apiList";
import apiService from "../../services/apiService";
import { useAuth } from "../../stores/useAuth";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

const Header = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await apiService(apiList.AUTH.LOGOUT);
      logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Chat App
        </Typography>
        <Box>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
