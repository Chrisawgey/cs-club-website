import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, keyframes } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

// Keyframes for the animated gradient
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar
      sx={{
        backgroundColor: 'white',
        boxShadow: 'none',
        borderBottom: '2px solid #ddd',
        position: { xs: "fixed", md: "sticky" },
        top: 0,
        zIndex: 1100,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", alignItems: "center", px: 2 }}>
        {/* Logo */}
        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Box
            component="img"
            src="/images/uccowl.jpeg"
            alt="UCNJ CS Club Logo"
            sx={{
              height: { xs: 40, sm: 50 },
              mr: 2
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black', fontSize: { xs: "1rem", sm: "1.2rem" } }}>
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
          sx={{ 
            display: { xs: 'block', md: 'none' }, 
            '& .MuiDrawer-paper': { 
              background: 'white', 
              width: 260, 
              padding: '20px 10px' 
            } 
          }}
        >
          <List>
            {['Club Chat Room', 'Gallery', 'About Us'].map((text, index) => (
              <ListItem 
                button 
                key={index} 
                component={Link} 
                to={text === 'Club Chat Room' ? '/club-chat' : `/${text.toLowerCase().replace(/ /g, '-')}`} 
                onClick={handleDrawerToggle}
                sx={{
                  padding: '14px 20px',
                  borderRadius: '8px',
                  transition: 'background 0.3s ease-in-out',
                  background: 'linear-gradient(270deg, #333333, #ffffff)',
                  backgroundSize: '400% 400%',
                  animation: `${gradientAnimation} 4s infinite`,
                  '&:hover': {
                    background: 'linear-gradient(270deg, #444444, #ffffff)',
                    backgroundSize: '400% 400%',
                    animation: `${gradientAnimation} 2s infinite`,
                  },
                  '&:active': {
                    background: 'linear-gradient(270deg, #222222, #ffffff)',
                  },
                  mb: 1 // Small margin between items
                }}
              >
                <ListItemText 
                  primary={text} 
                  primaryTypographyProps={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: 'black', // Ensuring visibility on gradient
                    textAlign: 'center'
                  }} 
                />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

// Custom Nav Button Component
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
        '&:hover': {
          color: '#ff6600',
        },
      }}
    >
      {children}
    </Button>
  );
}

export default Navbar;
