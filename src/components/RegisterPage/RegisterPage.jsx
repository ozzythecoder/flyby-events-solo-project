import React from 'react';
import { useHistory } from 'react-router-dom';

import RegisterForm from '../RegisterForm/RegisterForm';
import PageTitle from "../PageTitle/PageTitle";

import { Box, Button, Grid } from "@mui/material";

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
          <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ mt: '30%' }}
    >
      <div>
        <PageTitle title={"Register to get started."} />
        <RegisterForm />

        <center>
          New to FlyBy?
          <Box sx={{ mb: 1.5 }} />
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              history.push("/login");
            }}
          >
            Login
          </Button>
        </center>
      </div>
    </Grid>
    </div>
  );
}

export default RegisterPage;
