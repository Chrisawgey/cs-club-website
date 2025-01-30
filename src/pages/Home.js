import React from 'react';
import { Container, Typography, Box, Grid, Card, CardActionArea, CardContent, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const events = [
  { date: '30', month: 'Jan', day: 'Thursday', time: '9:30 am', title: 'IAP 2025: Expanding Horizons in Computing (Cryptography and Security Day)' },
  { date: '31', month: 'Jan', day: 'Friday', time: '10:00 am', title: 'IAP 2025: Expanding Horizons in Computing (Quantum Computing Day)' },
  { date: '03', month: 'Feb', day: 'Monday', time: '4:00 pm', title: 'NextGen Fellowship Program Info Session', subtitle: 'Information Session' },
  { date: '04', month: 'Feb', day: 'Tuesday', time: '9:30 am', title: 'Doctoral Thesis: On the Learnability of General Reinforcement-learning Objectives', subtitle: 'Thesis Defense' }
];

function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
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
            height: '50vh',
            backgroundImage: 'linear-gradient(90deg, blue, purple, red, pink), url(/images/MIT_EECS_pattern-repeat_black_000000.svg)',
            backgroundSize: '200% 200%',
            animation: 'moveColors 10s linear infinite',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            p: 4,
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'white' }}>
            The Computer Science and Cybersecurity Club
          </Typography>
          <Typography variant="h6" sx={{ color: 'white', maxWidth: '800px', mt: 2 }}>
            The Computer Science and Cybersecurity Club (CS&&CS) is for all technology-curious students who want to take their interest in computers further or learn the foundations of cybersecurity. We have a variety of projects they can all work on and learn from.
          </Typography>
        </Box>

        {/* Categories Section (Unchanged) */}
        <Container maxWidth="lg" sx={{ mt: -10, pb: 6 }}>
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
                      <Typography variant="h6">{category} →</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Join Now Button */}
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Button variant="contained" color="primary" size="large" href="#" sx={{ fontSize: '1.2rem', fontWeight: 'bold', padding: '12px 20px' }}>
              Join Now
            </Button>
          </Box>
        </Container>

        {/* Upcoming Events Section (Fixed Layout) */}
        <Container maxWidth="lg" sx={{ mt: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Upcoming Events
          </Typography>

          <Grid container spacing={3} sx={{ mt: 3 }}>
            {events.map((event, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card sx={{ border: '2px solid #6A0DAD', borderRadius: '8px', p: 2, height: '100%' }}>
                  <Box display="flex" alignItems="flex-start">
                    <Typography variant="h3" sx={{ color: '#C2185B', fontWeight: 'bold', mr: 1 }}>
                      {event.date}
                    </Typography>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{event.month}</Typography>
                      <Typography variant="body2" sx={{ color: 'gray' }}>{event.day}, {event.time}</Typography>
                    </Box>
                  </Box>
                  {event.subtitle && (
                    <Typography variant="body2" sx={{ color: 'gray', fontWeight: 'bold', mt: 1 }}>
                      {event.subtitle}
                    </Typography>
                  )}
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1A237E', mt: 1 }}>
                    {event.title}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

      </Box>
    </ThemeProvider>
    
  );
}

export default HomePage;
