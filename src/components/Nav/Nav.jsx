import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector, useDispatch } from "react-redux";

// MUI imports
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  SwipeableDrawer,
  Box,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

function Nav() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [drawerOpen, openDrawer] = useState(true);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="white"
            onClick={() => openDrawer(true)}
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <Menu />
          </IconButton>
          <SwipeableDrawer
            anchor="left"
            variant="temporary"
            open={drawerOpen}
            onOpen={() => {
              openDrawer(true);
            }}
            onClose={() => {
              openDrawer(false);
            }}
          >
            <Box className="menu-bg">
              <div className="nav">
                {/* If no user is logged in, show these links */}
                {!user.id && (
                  // If there's no user, show login/registration links
                  <Link className="navLink" to="/login">
                    Login / Register
                  </Link>
                )}

                {/* If a user is logged in, show these links */}
                {user.id && (
                  <>
                    <Link
                      className="navLink"
                      to="/myEvents"
                      onClick={() => {
                        openDrawer(false);
                      }}
                    >
                      My Events
                    </Link>

                    <Link
                      onClick={() => {
                        dispatch({ type: "CLEAR_EVENT_TO_SUBMIT" });
                        openDrawer(false);
                      }}
                      className="navLink"
                      to="/createEvent"
                    >
                      Create Event
                    </Link>

                    <Link
                      className="navLink"
                      to='/home'
                      onClick={() => {dispatch({ type: 'LOGOUT' })}}>
                        Log Out
                    </Link>
                  </>
                )}

                <Link
                  className="navLink"
                  to="/about"
                  onClick={() => {
                    openDrawer(false);
                  }}
                >
                  About
                </Link>
              </div>
            </Box>
          </SwipeableDrawer>
          <Link to="/home" className='nav-title'>
            <Typography variant="h6">FlyBy Events</Typography>
            {/* <h2 className="nav-title">FlyBy Events</h2> */}
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav;
