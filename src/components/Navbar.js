import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#ff0000' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            UCNJ CS & CybSEC
          </Link>
        </Typography>
        <Button color="inherit">
          <Link to="/club-chat" style={{ textDecoration: 'none', color: 'inherit' }}>
            Club Chat Room
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/gallery" style={{ textDecoration: 'none', color: 'inherit' }}>
            Gallery
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/about-us" style={{ textDecoration: 'none', color: 'inherit' }}>
            About Us
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/projects" style={{ textDecoration: 'none', color: 'inherit' }}>
            Projects
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
