import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';

// MUI imports
import { AppBar, Toolbar, IconButton, Drawer, Box } from '@mui/material';
import { Menu } from '@mui/icons-material';

function Nav() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [ drawerOpen, openDrawer ] = useState(true)

  return (
    <div>

      <AppBar>
        <IconButton
          color='white'
          onClick={() => openDrawer(true)}
          sx={{ mr: 2, display: {xs: 'block', sm: 'none'}}}
        >
          <Menu />
        </IconButton>
        <Drawer
          anchor='left'
          variant='temporary'
          open={drawerOpen}
          onClose={() => {openDrawer(false)}}
        >
          <Box>
          <div className='nav'>
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
                    onClick={() => {openDrawer(false)}}
                    >
                    My Events
                  </Link>

                  <Link
                    onClick={() => {dispatch({ type: 'CLEAR_EVENT_TO_SUBMIT' }); openDrawer(false)}}
                    className="navLink"
                    to="/createEvent">
                    Create Event
                  </Link>

                  <LogOutButton
                    className="navLink"
                    onClick={() => {openDrawer(false)}}
                  />
                </>
              )}

              <Link
                className="navLink"
                to="/about"
                onClick={() => {openDrawer(false)}}>
                About
              </Link>
            </div>
          </Box>
        </Drawer>
      </AppBar>



      <Link to="/home">
        <h2 className="nav-title">FlyBy Events</h2>
      </Link>
      
    </div>
  );
}

export default Nav;
