import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// MUI imports
import {
  AppBar,
  Toolbar,
  IconButton,
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

  const logoutUser = () => dispatch({ type: 'LOGOUT' })
  const clearEventToSubmit = () => dispatch({ type: 'CLEAR_EVENT_TO_SUBMIT' })

  return (
    <div>
      <AppBar position="static">
        <Toolbar
          sx={{ justifyContent: 'space-between' }}
        >
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
                  <>
                    <NavLink linkTitle="Login / Register" path={"/login"} openDrawer={openDrawer} />
                    <NavLink linkTitle="About This App" path={"/about"} openDrawer={openDrawer} />
                  </>
                )}

                {/* If a user is logged in, show these links */}
                {user.id && (
                  <>
                    <NavLink linkTitle="My Events" path={"/myEvents"} openDrawer={openDrawer} />
                    <NavLink linkTitle="Subscriptions" path={"/myEvents/subscribed"} openDrawer={openDrawer} />
                    <NavLink linkTitle="Pending Invitations" path={"/myEvents/pending"} openDrawer={openDrawer} />
                    <NavLink linkTitle="My Hosted Events" path={"/myEvents/hosting"} openDrawer={openDrawer} />
                    <NavLink linkTitle="Create An Event" path={"/createEvent"} openDrawer={openDrawer} callback={clearEventToSubmit} />
                    <NavLink linkTitle="About This App" path={"/about"} openDrawer={openDrawer} />
                    <NavLink linkTitle="Log Out" path={"/home"} openDrawer={openDrawer} callback={logoutUser} />
                  </>
                )}
                
              </div>
            </Box>
          </SwipeableDrawer>
          <Link to="/home" className="nav-title">
            <Typography variant="title">FlyBy Events</Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav;
