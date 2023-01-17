import React from "react";
import { Card, Typography } from "@mui/material";

import PageTitle from "../PageTitle/PageTitle";

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <PageTitle title={"About This App"} />
        <Card sx={{ m: 2, mb: 10, p: 2 }} variant="outlined">
          <Typography variant="h3">Technologies Used</Typography>
          <Typography>
            <ul>
              <li>PostgreSQL</li>
              <li>Node.js / Express</li>
              <li>React.js</li>
              <li>Redux & Redux Sagas</li>
              <li>Luxon.js</li>
              <li>Material UI</li>
              <li>SweetAlert 2</li>
            </ul>
          </Typography>
          <Typography fontWeight={700}>Greatest Challenges</Typography>
          <Typography>
            <ul>
              <li>Layout & user experience</li>
              <li>Fundamentals of React component lifecycles</li>
            </ul>
          </Typography>
          <Typography fontWeight={700}>Next Steps</Typography>
          <Typography>
            <ul>
              <li>Profile pages</li>
              <li>Photo uploads</li>
              <li>Reply section</li>
              <li>Fully implemented email & text notifications</li>
            </ul>
          </Typography>
          <Typography variant="h3">Acknowledgements</Typography>
          <Typography>
            Thank you to:
            <ul>
              <li>My Prime Academy instructors Dane, Key, and Liz.</li>
              <li>The Prime Academy Shawl cohort</li>
              <li>My friends, family, and partner Marit</li>
              <li>You!</li>
            </ul>
          </Typography>
        </Card>
      </div>
    </div>
  );
}

export default AboutPage;
