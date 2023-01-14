import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail, validatePasswords } from "../../helpers/loginValidation";

import { Typography, TextField, Stack, Button } from "@mui/material";

function RegisterForm() {
  const dispatch = useDispatch();

  const errors = useSelector((store) => store.errors);

  const [username, setUsername] = useState("");
  const [emailIn, setEmailIn] = useState("");
  const [phoneIn, setPhoneIn] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = (event) => {
    event.preventDefault();

    if (!validateEmail(emailIn) || !validatePasswords(password, confirmPassword)) return;

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <>
      <form className="formPanel" onSubmit={registerUser}>
        <Stack spacing={2} alignItems="center" sx={{ mt: 1, my: 2 }}>
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
              type="text"
              name="email"
              label="Email Address"
              required
              value={emailIn}
              onChange={(event) => setEmailIn(event.target.value)}
            />
          </div>
          <div>
            <TextField
              type="number"
              name="phone"
              label="Phone Number"
              required
              value={phoneIn}
              onChange={(event) => setPhoneIn(event.target.value)}
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
            <TextField
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>

          <div>
            <Button
              size="large"
              variant="contained"
              color="primary"
              type="submit"
            >
              Register
            </Button>
          </div>
          <div>
            {errors.registrationMessage && (
              <Typography
                variant="body1"
                color="error"
                sx={{ mx: 3, fontWeight: 500 }}
              >
                {errors.registrationMessage}
              </Typography>
            )}
          </div>
        </Stack>
      </form>
    </>
    // <form className="formPanel" onSubmit={registerUser}>
    //   <h2>Register User</h2>
    //   {errors.registrationMessage && (
    //     <h3 className="alert" role="alert">
    //       {errors.registrationMessage}
    //     </h3>
    //   )}
    //   <div>
    //     <label htmlFor="username">
    //       Username:
    //       <input
    //         type="text"
    //         name="username"
    //         value={username}
    //         required
    //         onChange={(event) => setUsername(event.target.value)}
    //       />
    //     </label>
    //   </div>
    //   <div>
    //     <label htmlFor="password">
    //       Password:
    //       <input
    //         type="password"
    //         name="password"
    //         value={password}
    //         required
    //         onChange={(event) => setPassword(event.target.value)}
    //       />
    //     </label>
    //   </div>
    //   <div>
    //     <input className="btn" type="submit" name="submit" value="Register" />
    //   </div>
    // </form>
  );
}

export default RegisterForm;
