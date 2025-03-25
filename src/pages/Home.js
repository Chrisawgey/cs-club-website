import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, Button, useMediaQuery, useTheme } from '@mui/material';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

function HomePage() {
  const [events, setEvents] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('date'), limit(4));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedEvents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(fetchedEvents);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Box className="home-page">
      {/* Hero Section */}
      <Box 
        sx={{
          position: 'relative',
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          bgcolor: '#0a0a0a',
          color: 'white',
          overflow: 'hidden',
          pt: { xs: 8, md: 0 }
        }}
      >
        {/* Animated gradient background */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.4,
            background: 'linear-gradient(45deg, #000000, #1a1a1a, #2c2c2c)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            '@keyframes gradient': {
              '0%': {
                backgroundPosition: '0% 50%'
              },
              '50%': {
                backgroundPosition: '100% 50%'
              },
              '100%': {
                backgroundPosition: '0% 50%'
              }
            }
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Typography 
                  variant="h1" 
                  sx={{
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                    fontWeight: 800,
                    lineHeight: 1.1,
                    mb: 3,
                    background: 'linear-gradient(to right, #fff 20%, #666 80%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  Code. Learn. Innovate.
                </Typography>
                <Typography 
                  sx={{
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    color: '#999',
                    mb: 4,
                    maxWidth: '540px'
                  }}
                >
                  Join Union County's premier Computer Science & Cybersecurity community. 
                  Get hands-on experience with cutting-edge technology and industry experts.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button 
                    variant="contained"
                    size="large"
                    href="https://owlsspace.ucc.edu/organization/cs2cs"
                    target="_blank"
                    sx={{
                      bgcolor: '#3b82f6',
                      fontSize: '1.125rem',
                      py: 2,
                      px: 4,
                      borderRadius: '8px',
                      fontWeight: 600,
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        bgcolor: '#2563eb',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    Join Us
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Grid 
              item 
              xs={12} 
              md={6} 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center' 
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  width: '100%'
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '500px',
                    display: { xs: 'block', md: 'block' },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '100%',
                      height: '100%',
                      background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(0,0,0,0) 70%)',
                      borderRadius: '50%',
                      animation: 'pulse 3s infinite'
                    },
                    '@keyframes pulse': {
                      '0%': {
                        transform: 'translate(-50%, -50%) scale(0.95)',
                        opacity: 0.5
                      },
                      '50%': {
                        transform: 'translate(-50%, -50%) scale(1)',
                        opacity: 0.8
                      },
                      '100%': {
                        transform: 'translate(-50%, -50%) scale(0.95)',
                        opacity: 0.5
                      }
                    }
                  }}
                >
                  <Box
                    component="img"
                    src="/images/code.gif"
                    alt="Coding Animation"
                    sx={{
                      width: '100%',
                      maxWidth: '500px',
                      height: 'auto',
                      borderRadius: '12px',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#fafafa' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            align="center" 
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 800,
              mb: 8,
              color: '#1a1a1a'
            }}
          >
            What We Offer
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: 'Hands-on Projects',
                description: 'Build real-world applications and expand your portfolio with guided project experiences',
                icon: '💻'
              },
              {
                title: 'Cybersecurity Training',
                description: 'Learn ethical hacking, penetration testing, and cyber defense strategies',
                icon: '🔒'
              },
              {
                title: 'Tech Workshops',
                description: 'Regular sessions on cutting-edge technologies',
                icon: '🚀'
              }
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  sx={{
                    height: '100%',
                    p: 4,
                    borderRadius: 3,
                    boxShadow: 'none',
                    border: '1px solid',
                    borderColor: 'rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                      borderColor: '#3b82f6'
                    }
                  }}
                >
                  <Typography variant="h1" sx={{ fontSize: '3rem', mb: 2 }}>
                    {feature.icon}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Events Section */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            align="center"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 800,
              mb: 2
            }}
          >
            Upcoming Events
          </Typography>
          <Typography 
            align="center" 
            color="text.secondary"
            sx={{ mb: 8, maxWidth: '600px', mx: 'auto' }}
          >
            Join us for exciting workshops, hackathons, and tech talks
          </Typography>

          <Grid container spacing={3}>
            {events.map((event, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card 
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 'none',
                    border: '1px solid',
                    borderColor: 'rgba(0,0,0,0.1)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: '#3b82f6',
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Calendar size={20} style={{ marginRight: '8px', color: '#3b82f6' }}/>
                    <Typography 
                      sx={{ 
                        fontSize: '0.875rem',
                        color: '#3b82f6',
                        fontWeight: 600
                      }}
                    >
                      {event.month} {event.date}, {event.time}
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {event.title}
                  </Typography>
                  {event.subtitle && (
                    <Typography variant="body2" color="text.secondary">
                      {event.subtitle}
                    </Typography>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#0a0a0a', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                UCNJ Computer Science & Cybersecurity Club
              </Typography>
              <Typography sx={{ color: 'gray.400', mb: 1 }}>
                1033 Springfield Ave.
              </Typography>
              <Typography sx={{ color: 'gray.400' }}>
                Cranford, NJ 07016
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Typography sx={{ color: 'gray.400' }}>
                © 2025 Union College of Union County
              </Typography>
              <Typography sx={{ color: 'gray.400', mt: 1 }}>
                Created by{' '}
                <Box
                  component="a"
                  href="https://www.linkedin.com/in/chrisvpopoca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: '#3b82f6',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Christopher Vargas - Class of 25'
                </Box>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default HomePage;