import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Typography, TextField, Stack, Button } from "@mui/material";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      })
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <Stack spacing={2} alignItems="center" sx={{ my: 2 }}>
        <div>
          <TextField
            type="text"
            name="username"
            label="Username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <TextField
            type="password"
            name="password"
            label="Password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div>
          <Button
            size="large"
            variant="contained"
            color="primary"
            type="submit"
          >
            Log In
          </Button>
        </div>
        <div>
          {errors.loginMessage && (
            <Typography
              variant="body1"
              color="error"
              sx={{ mx: 3, fontWeight: 500 }}
            >
              {errors.loginMessage}
            </Typography>
          )}
        </div>
      </Stack>
    </form>
  );
}

export default LoginForm;
