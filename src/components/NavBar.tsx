// src/components/NavBar.tsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setClientName(userData.clientName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex", gap: 2 }}>
          <Button color="inherit" onClick={() => navigate("/dashboard")}>
            Dashboard
          </Button>
          <Button color="inherit" onClick={() => navigate("/transfer")}>
            Transferir
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {clientName && (
            <Typography variant="body1">Hola, {clientName}</Typography>
          )}
          <Button color="inherit" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
