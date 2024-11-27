import { useState, useEffect } from "react";
import { Switch, FormControlLabel, Box, Typography } from "@mui/material";

export default function RoleSwitcher({ onRoleChange }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    // Leer el estado inicial desde localStorage
    const savedRole = localStorage.getItem("role");
    return savedRole === "Admin";
  });

  const handleSwitchChange = (event) => {
    const isAdminSelected = event.target.checked;
    setIsAdmin(isAdminSelected);

    // Guardar el estado en localStorage
    const newRole = isAdminSelected ? "Admin" : "Cliente";
    localStorage.setItem("role", newRole);
    onRoleChange(newRole);
  };

  useEffect(() => {
    onRoleChange(isAdmin ? "Admin" : "Cliente");
  }, [isAdmin, onRoleChange]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        width: "100%",
        maxWidth: 400,
        my: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            flex: 1,
            textAlign: "center",
            backgroundColor: !isAdmin ? "gray" : "transparent",
            color: !isAdmin ? "white" : "text.secondary",
            padding: 1,
            borderRadius: 1,
          }}
        >
          Cliente
        </Typography>
        <Typography
          variant="h6"
          sx={{
            flex: 1,
            textAlign: "center",
            backgroundColor: isAdmin ? "primary.main" : "transparent",
            color: isAdmin ? "white" : "text.secondary",
            padding: 1,
            borderRadius: 1,
          }}
        >
          Admin
        </Typography>
      </Box>

      <FormControlLabel
        control={
          <Switch
            checked={isAdmin}
            onChange={handleSwitchChange}
            color={isAdmin ? "primary" : "secondary"}
            sx={{
              transform: "scale(1.3)",
              mt: 1,
            }}
          />
        }
        sx={{ mt: 1 }}
      />
    </Box>
  );
}
