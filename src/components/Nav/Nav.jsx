import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// MUI imports
import {
  AppBar,
  Toolbar,
  IconButton,
  SwipeableDrawer,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
} from "@mui/material";
import { Menu, ExpandLess, ExpandMore } from "@mui/icons-material";

import "./Nav.css";
import NavLink from "../NavLink/NavLink";

function Nav() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [drawerOpen, openDrawer] = useState(false);
  const [eventMenuOpen, openEventMenu] = useState(false);

  const logoutUser = () => {
    history.push('/');
    dispatch({ type: "LOGOUT" });
  };
  
  const clearEventToSubmit = () => dispatch({ type: "CLEAR_EVENT_TO_SUBMIT" });

  return (
    <div>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            edge="start"
            onClick={() => openDrawer(true)}
            sx={{ display: { xs: "block", sm: "none" }, color: "white" }}
          >
            <Menu fontSize="large" />
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
            <Box
              sx={{
                backgroundColor: "#000000",
                height: "100vh",
              }}
            >
              <div>
                {/* If no user is logged in, show these links */}
                {!user.id && (
                  <>
                    <NavLink
                      linkTitle="Login / Register"
                      path={"/login"}
                      openDrawer={openDrawer}
                    />
                    <NavLink
                      linkTitle="About This App"
                      path={"/about"}
                      openDrawer={openDrawer}
                    />
                  </>
                )}

                {/* If a user is logged in, show these links */}
                {user.id && (
                  <>
                    <Box sx={{ ml: 4, mt: 2, mb: 3 }}>
                      <Typography variant="navLink">
                        Hello, {user.username}.
                      </Typography>
                    </Box>
                    <Divider
                      sx={{
                        backgroundColor: "#ffffff",
                        width: "70%",
                        ml: "15%",
                      }}
                    />
                    <List sx={{ color: "#ffffff", px: 2 }}>
                      <ListItemButton
                        onClick={() => openEventMenu(!eventMenuOpen)}
                      >
                        <ListItemText>
                          <Typography variant="navLink">Events</Typography>
                        </ListItemText>
                        {eventMenuOpen ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={eventMenuOpen} sx={{ pl: 3 }}>
                        <ListItemButton>
                          <ListItemText>
                            <NavLink
                              linkTitle="My Events"
                              path={"/myEvents"}
                              openDrawer={openDrawer}
                            />
                          </ListItemText>
                        </ListItemButton>
                        <ListItemButton>
                          <ListItemText>
                            <NavLink
                              linkTitle="Subscriptions"
                              path={"/myEvents/subscribed"}
                              openDrawer={openDrawer}
                            />
                          </ListItemText>
                        </ListItemButton>
                        <ListItemButton>
                          <ListItemText>
                            <NavLink
                              linkTitle="Pending Invitations"
                              path={"/myEvents/pending"}
                              openDrawer={openDrawer}
                            />
                          </ListItemText>
                        </ListItemButton>
                        <ListItemButton>
                          <ListItemText>
                            <NavLink
                              linkTitle="My Hosted Events"
                              path={"/myEvents/hosting"}
                              openDrawer={openDrawer}
                            />
                          </ListItemText>
                        </ListItemButton>
                      </Collapse>
                      <ListItemButton>
                        <ListItemText>
                          <NavLink
                            linkTitle="Create An Event"
                            path={"/createEvent"}
                            openDrawer={openDrawer}
                            callback={clearEventToSubmit}
                          />
                        </ListItemText>
                      </ListItemButton>
                      <ListItemButton>
                        <ListItemText>
                          <NavLink
                            linkTitle="About This App"
                            path={"/about"}
                            openDrawer={openDrawer}
                          />
                        </ListItemText>
                      </ListItemButton>
                      <ListItemButton>
                        <ListItemText>
                          <NavLink
                            linkTitle="Log Out"
                            path={"/home"}
                            openDrawer={openDrawer}
                            callback={logoutUser}
                          />
                        </ListItemText>
                      </ListItemButton>
                    </List>
                  </>
                )}
              </div>
            </Box>
          </SwipeableDrawer>
          <Link to="/home">
            <Typography variant="title">FlyBy Events</Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav;
