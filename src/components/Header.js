import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useNavigate } from "react-router-dom";
import Users from "../users.json";

const Header = () => {
  const navigate = useNavigate();

  const currentUser = JSON.parse(window.localStorage.getItem("UserId"));

  const handleLoggedOut = (e) => {
    navigate("/login");
  };
  return (
    <Box>
        <Stack direction="row" m={2} justifyContent="space-between">
        <div>Dish Poll</div>

      {currentUser ? (
        <Stack direction="row" spacing={2}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <p>{Users[currentUser.userId-1].username}</p>
          </Stack>
          <Button onClick={handleLoggedOut}>logout</Button>
        </Stack>
      ) : (
        <Stack direction="row" spacing={1}>
          <Button onClick={() => navigate("/login")}>Login</Button>
        </Stack>
      )}
      </Stack>
    </Box>
  );
};

export default Header;
