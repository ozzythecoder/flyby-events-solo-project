import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";

import theme from "../../themes/themes";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import InfoPage from "../InfoPage/InfoPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import MyEvents from "../MyEvents/MyEvents";
import EventDetail from "../EventDetail/EventDetail";
import CreateEvent from "../CreateEvent/CreateEvent";
import CreateEventPreview from "../CreateEventPreview/CreateEventPreview";
import EditEvent from "../EditEvent/EditEvent";
import EditEventPreview from "../EditEventPreview/EditEventPreview";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Nav />
          <Switch>
            <Redirect exact from="/" to="/home" />

            <Route exact path="/about">
              <AboutPage />
            </Route>

            <ProtectedRoute exact path="/myEvents">
              <MyEvents />
            </ProtectedRoute>

            <ProtectedRoute exact path="/myEvents/subscribed">
              <MyEvents
                title={"My Subscribed Events"}
                stateFilter={"subscribed"}
              />
            </ProtectedRoute>

            <ProtectedRoute exact path="/myEvents/pending">
              <MyEvents title={"Pending Invitations"} stateFilter={"pending"} />
            </ProtectedRoute>

            <ProtectedRoute exact path="/myEvents/hosting">
              <MyEvents title={"My Hosted Events"} stateFilter={"hosting"} />
            </ProtectedRoute>

            <ProtectedRoute exact path="/createEvent">
              <CreateEvent />
            </ProtectedRoute>

            <ProtectedRoute exact path="/editEvent/:eventId">
              <EditEvent />
            </ProtectedRoute>

            <ProtectedRoute exact path="/editPreview">
              <EditEventPreview />
            </ProtectedRoute>

            <ProtectedRoute exact path="/createEvent/preview">
              <CreateEventPreview />
            </ProtectedRoute>

            <ProtectedRoute exact path="/event/:eventID">
              <EventDetail />
            </ProtectedRoute>

            <ProtectedRoute exact path="/user">
              <UserPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/info">
              <InfoPage />
            </ProtectedRoute>

            <Route exact path="/login">
              {user.id ? <Redirect to="/myEvents" /> : <LoginPage />}
            </Route>

            <Route exact path="/registration">
              {user.id ? <Redirect to="/myEvents" /> : <RegisterPage />}
            </Route>

            <Route exact path="/home">
              {user.id ? <Redirect to="/myEvents" /> : <LandingPage />}
            </Route>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          <Footer />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
