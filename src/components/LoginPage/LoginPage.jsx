import React from "react";
import { useHistory } from "react-router-dom";

import LoginForm from "../LoginForm/LoginForm";
import PageTitle from "../PageTitle/PageTitle";

import { Button, Grid } from "@mui/material";

function LoginPage() {
  const history = useHistory();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ mt: '30%' }}
    >
      <div>
        <PageTitle title={"Organize your event in seconds."} />
        <LoginForm />

        <center>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              history.push("/registration");
            }}
          >
            Register
          </Button>
        </center>
      </div>
    </Grid>
  );
}

export default LoginPage;
