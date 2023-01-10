import React, { useState } from "react";
import { Link } from "react-router-dom";
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

import "./Nav.css";
import NavLink from "../NavLink/NavLink";

function Nav() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [drawerOpen, openDrawer] = useState(false);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => openDrawer(true)}
            sx={{ display: { xs: "block", sm: "none" }, color: "white" }}
          >
            <Menu fontSize='large' />
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
                  <NavLink path={"/myEvents"} openDrawer={openDrawer} linkTitle="My Events" />
                    {/* <Link
                      className="navLink"
                      to="/myEvents"
                      onClick={() => {
                        openDrawer(false);
                      }}
                    >
                      My Events
                    </Link> */}

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
                
                {user.id && (
                  <Link
                    className="navLink"
                    to="/home"
                    onClick={() => {
                      dispatch({ type: "LOGOUT" });
                    }}
                  >
                    Log Out
                  </Link>
                )}
              </div>
            </Box>
          </SwipeableDrawer>
          <Link to="/home" className="nav-title">
            <Typography variant="h5">FlyBy Events</Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav;
