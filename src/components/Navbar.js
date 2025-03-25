import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  Container,
  Menu,
  MenuItem,
  alpha
} from '@mui/material';
import { Menu as MenuIcon } from 'lucide-react';

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    navigate('/');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { text: 'Club Chat', path: '/club-chat' },
    { text: 'Gallery', path: '/gallery' },
    { text: 'About Us', path: '/about-us' }
  ];

  return (
    <AppBar 
      position="fixed" 
      elevation={isScrolled ? 4 : 0}
      sx={{
        background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        transition: 'all 0.3s ease'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          {/* Logo */}
          <Box component={Link} to="/" sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'none',
            color: isScrolled ? 'text.primary' : 'white'
          }}>
            <Box
              component="img"
              src="/images/uccowl.jpeg"
              alt="UCNJ CS Club Logo"
              sx={{
                height: { xs: 40, sm: 45 },
                width: 'auto',
                mr: 2,
                borderRadius: 1
              }}
            />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                fontSize: { xs: '1.1rem', sm: '1.3rem' },
                color: isScrolled ? 'text.primary' : 'white'
              }}
            >
              UCNJ CS & CybSEC
            </Typography>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                to={item.path}
                sx={{
                  color: isScrolled ? 'text.primary' : 'white',
                  fontSize: '1rem',
                  textTransform: 'none',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '0%',
                    height: '2px',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'primary.main',
                    transition: 'width 0.3s ease'
                  },
                  '&:hover::after': {
                    width: '80%'
                  }
                }}
              >
                {item.text}
              </Button>
            ))}

            {isAdmin ? (
              <>
                <Button
                  onClick={handleMenuOpen}
                  sx={{
                    color: isScrolled ? 'text.primary' : 'white',
                    textTransform: 'none'
                  }}
                >
                  Admin
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  sx={{
                    '& .MuiPaper-root': {
                      borderRadius: 2,
                      mt: 1,
                      boxShadow: 3,
                      minWidth: 180
                    }
                  }}
                >
                  <MenuItem 
                    component={Link} 
                    to="/admin"
                    onClick={handleMenuClose}
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem 
                    onClick={() => {
                      handleMenuClose();
                      handleLogout();
                    }}
                    sx={{ color: 'error.main' }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={Link}
                to="/admin-login"
                variant="contained"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  textTransform: 'none',
                  px: 3,
                  '&:hover': {
                    bgcolor: 'primary.dark'
                  }
                }}
              >
                Admin Login
              </Button>
            )}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            color={isScrolled ? 'inherit' : 'default'}
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              display: { md: 'none' },
              color: isScrolled ? 'text.primary' : 'white'
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 280,
            bgcolor: 'background.paper',
            borderRadius: '16px 0 0 16px'
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem 
                key={item.text}
                component={Link}
                to={item.path}
                onClick={handleDrawerToggle}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  '&:hover': {
                    bgcolor: alpha('#000', 0.04)
                  }
                }}
              >
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '1.1rem',
                    fontWeight: 500
                  }}
                />
              </ListItem>
            ))}

            {isAdmin ? (
              <>
                <ListItem
                  component={Link}
                  to="/admin"
                  onClick={handleDrawerToggle}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    '&:hover': {
                      bgcolor: alpha('#000', 0.04)
                    }
                  }}
                >
                  <ListItemText 
                    primary="Dashboard"
                    primaryTypographyProps={{
                      fontSize: '1.1rem',
                      fontWeight: 500
                    }}
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    handleDrawerToggle();
                    handleLogout();
                  }}
                  sx={{
                    borderRadius: 2,
                    color: 'error.main',
                    '&:hover': {
                      bgcolor: alpha('#f44336', 0.04)
                    }
                  }}
                >
                  <ListItemText 
                    primary="Logout"
                    primaryTypographyProps={{
                      fontSize: '1.1rem',
                      fontWeight: 500
                    }}
                  />
                </ListItem>
              </>
            ) : (
              <ListItem
                component={Link}
                to="/admin-login"
                onClick={handleDrawerToggle}
                sx={{
                  borderRadius: 2,
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark'
                  }
                }}
              >
                <ListItemText 
                  primary="Admin Login"
                  primaryTypographyProps={{
                    fontSize: '1.1rem',
                    fontWeight: 500
                  }}
                />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;