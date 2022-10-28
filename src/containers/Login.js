import React, { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Users from "../users.json";
import { useSnackbar } from "notistack";

export default function Login({isLogged,setIsLogged}) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  let loggedIn = false;

  const handleInput = (e) => {
    const [key, value] = [e.target.name, e.target.value];
    setFormData((nextFormData) => ({ ...nextFormData, [key]: value }));
  };

  function handleSubmit() {
    for (let i = 0; i < Users.length; i++) {
      if (
        Users[i].username === formData.username &&
        Users[i].password === formData.password
      ) {
        enqueueSnackbar("Logged in successfully", {
          variant: "success",
          autoHideDuration: 1000,
        });
        setIsLogged(true);
        loggedIn = true;
        window.localStorage.setItem("UserId", JSON.stringify({userId:Users[i].id}));
        navigate("/poll");
      }
    }
    if (!loggedIn) {
      enqueueSnackbar("Incorrect username or password", {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="50vh"
    >
      <Stack spacing={2}>
        <h2 className="title">Login</h2>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          name="username"
          value={formData.username}
          onChange={handleInput}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInput}
        />
        <Box display="flex" justifyContent="center" alignItems="center"></Box>
        <Button
          className="button"
          variant="contained"
          onClick={() => {
            handleSubmit();
          }}
        >
          Login to Dish Poll
        </Button>
      </Stack>
    </Box>
  );
}
