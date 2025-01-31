import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'white', boxShadow: 'none', borderBottom: '2px solid #ddd' }}>
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Logo */}
        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Box
            component="img"
            src="/images/uccowl.jpeg"
            alt="UCNJ CS Club Logo"
            sx={{ height: 50, mr: 2 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
            UCNJ CS & CybSEC
          </Typography>
        </Box>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
          <NavButton to="/club-chat">Club Chat Room</NavButton>
          <NavButton to="/gallery">Gallery</NavButton>
          <NavButton to="/about-us">About Us</NavButton>
        </Box>

        {/* Mobile Menu Button */}
        <IconButton 
          color="inherit" 
          onClick={handleDrawerToggle} 
          sx={{ display: { xs: 'block', md: 'none' }, color: 'black' }}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <List sx={{ width: 250 }}>
            {['Club Chat Room', 'Gallery', 'About Us'].map((text, index) => (
              <ListItem button key={index} component={Link} to={text.toLowerCase().replace(/ /g, '-')}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>

      </Toolbar>
    </AppBar>
  );
}

// Custom Nav Button Component with Gradient Hover Effect
function NavButton({ to, children }) {
  return (
    <Button
      component={Link}
      to={to}
      sx={{
        textTransform: 'none',
        fontSize: '1rem',
        fontWeight: 'bold',
        color: 'black',
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          bottom: -4,
          width: '100%',
          height: '3px',
          background: 'linear-gradient(90deg, #ff00ff, #ff6600, #ffcc00)',
          opacity: 0,
          transition: 'opacity 0.3s ease-in-out',
        },
        '&:hover::after': {
          opacity: 1,
        },
      }}
    >
      {children}
    </Button>
  );
}

export default Navbar;
