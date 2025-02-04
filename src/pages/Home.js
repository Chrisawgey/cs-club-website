import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardActionArea, CardContent, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function HomePage() {
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem('events')) || [
      { date: '11', month: 'Feb', day: 'Tuesday', time: '2:00 pm', title: 'Kali Linux 101 - Steven Linares', subtitle: 'Information Session & Hands on' },
      { date: '18', month: 'Feb', day: 'Tuesday', time: '2:00 pm', title: 'A.I Law Ethics - Former Ai Lawyer', subtitle: 'Tech Talk' },
      { date: '25', month: 'Feb', day: 'Tuesday', time: '2:00 pm', title: 'Boost your LinkedIn & Increase Internship Opportunities - Christopher Vargas', subtitle: 'Information Session & Hands On' },
      { date: '04', month: 'Mar', day: 'Tuesday', time: '2:00 pm', title: 'Open Slot', subtitle: 'N/A' }
    ]
  );

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events'));
    if (storedEvents) {
      setEvents(storedEvents);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ pt: { xs: 7, md: 0 } }}>
        <style>
          {`
            @keyframes moveColors {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}
        </style>

        {/* Hero Section */}
        <Box
          sx={{
            height: { xs: '40vh', md: '50vh' },
            backgroundImage: 'linear-gradient(90deg, blue, purple, red, pink), url(/images/MIT_EECS_pattern-repeat_black_000000.svg)',
            backgroundSize: '200% 200%',
            animation: 'moveColors 10s linear infinite',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            p: { xs: 2, md: 4 },
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'white', fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
            The Computer Science and Cybersecurity Club
          </Typography>
          <Typography variant="h6" sx={{ color: 'white', maxWidth: '800px', mt: 2, fontSize: { xs: '1rem', md: '1.25rem' } }}>
            The Computer Science and Cybersecurity Club (CS&&CS) is for all technology-curious students who want to take their interest in computers further or learn the foundations of cybersecurity. We have a variety of projects they can all work on and learn from.
          </Typography>
        </Box>

        {/* Categories Section */}
        <Container maxWidth="lg" sx={{ mt: { xs: -8, md: -10 }, pb: 6 }}>
          <Grid container spacing={4}>
            {['Coding', 'Machine Learning', 'Hacking'].map((category, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card sx={{ position: 'relative', borderRadius: '10px', overflow: 'hidden' }}>
                  <CardActionArea>
                    <Box
                      component="img"
                      src={index === 0 ? "/images/code.gif" : index === 1 ? "/images/machinelearning.gif" : "/images/cyberhack.gif"} 
                      alt={category}
                      sx={{ width: '100%', height: '250px', objectFit: 'cover' }}
                    />
                    <CardContent
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        background: 'rgba(0,0,0,0.6)',
                        color: 'white',
                        padding: '10px',
                      }}
                    >
                      <Typography variant="h6">{category} ✅</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Join Now Button */}
          <Box sx={{ textAlign: 'center', mt: { xs: 6, md: 10 } }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              href="https://owlsspace.ucc.edu/organization/cs2cs"
              target="_blank"
              sx={{ fontSize: '1.2rem', fontWeight: 'bold', padding: '12px 20px' }}
            >
              Join Now
            </Button>
          </Box>
        </Container>

        {/* Upcoming Events Section */}
        <Container maxWidth="lg" sx={{ mt: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '1.5rem', md: '2rem' } }}> {/* Adjusted font size for mobile */}
            Upcoming Events
          </Typography>

          <Grid container spacing={3} sx={{ mt: 3 }}>
            {events.map((event, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card sx={{ border: '2px solid #6A0DAD', borderRadius: '8px', p: 2, height: '100%' }}>
                  <Box display="flex" alignItems="flex-start">
                    <Typography variant="h3" sx={{ color: '#C2185B', fontWeight: 'bold', mr: 1, fontSize: { xs: '2rem', md: '3rem' } }}> {/* Adjusted font size for mobile */}
                      {event.date}
                    </Typography>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.25rem' } }}>{event.month}</Typography> {/* Adjusted font size for mobile */}
                      <Typography variant="body2" sx={{ color: 'gray', fontSize: { xs: '0.875rem', md: '1rem' } }}>{event.day}, {event.time}</Typography> {/* Adjusted font size for mobile */}
                    </Box>
                  </Box>
                  {event.subtitle && (
                    <Typography variant="body2" sx={{ color: 'gray', fontWeight: 'bold', mt: 1, fontSize: { xs: '0.875rem', md: '1rem' } }}> {/* Adjusted font size for mobile */}
                      {event.subtitle}
                    </Typography>
                  )}
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1A237E', mt: 1, fontSize: { xs: '1rem', md: '1.25rem' } }}> {/* Adjusted font size for mobile */}
                    {event.title}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Footer Section */}
        <Box sx={{ mt: 10 }}>
          <Box sx={{ height: '6px', background: 'linear-gradient(to right, #ff00ff, #ff6600, #ffcc00)' }} />
          <Box sx={{ backgroundImage: 'url(/images/MIT_EECS_pattern-repeat_black_000000.svg)', backgroundColor: 'black', color: 'white', py: 6, px: 4, textAlign: 'center' }}>
            <Container maxWidth="lg">
              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.25rem' } }}>UCNJ Computer Science & Cybersecurity Club</Typography> {/* Adjusted font size for mobile */}
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>1033 Springfield Ave.</Typography> {/* Adjusted font size for mobile */}
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>Inovation Center</Typography> {/* Adjusted font size for mobile */}
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>Cranford, NJ 07016</Typography> {/* Adjusted font size for mobile */}
                </Grid>
              </Grid>
              <Typography variant="body2" sx={{ mt: 4, fontSize: { xs: '0.875rem', md: '1rem' } }}>© 2025 Union College of Union County</Typography> {/* Adjusted font size for mobile */}
            </Container>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default HomePage;