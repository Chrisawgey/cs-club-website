// Home.js
import React from 'react';
import { Container, Typography, Box, Button, Slide, Grow, Grid, Paper } from '@mui/material';
import { CalendarToday } from '@mui/icons-material';

function Home() {
  const upcomingEvents = [
    { date: 'January 28, 2025', event: 'Intro to Machine Learning' },
    { date: 'February 4, 2025', event: 'LeetCode Practice Session' },
    { date: 'February 11, 2025', event: 'Cybersecurity Basics' },
    { date: 'February 15, 2025', event: 'Cybersecurity Basics 2' },
    { date: 'March 9, 2025', event: 'Hackathon' },
    
  ];

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', py: 4 }}>
      {/* Banner Section */}
      <Slide direction="down" in={true} timeout={800}>
        <Box
          sx={{
            backgroundImage: 'url(/images/logo.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '300px',
            borderRadius: '10px',
            mb: 4,
          }}
        ></Box>
      </Slide>

      <Slide direction="up" in={true} timeout={800}>
        <Typography variant="h3" gutterBottom color="primary">
          Welcome to the UCNJ CS & CybSEC Club!
        </Typography>
      </Slide>
      <Slide direction="up" in={true} timeout={800}>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Empowering the next generation of computer scientists and cybersecurity professionals.
        </Typography>
      </Slide>
      <Grow in={true} timeout={1000}>
        <Button variant="contained" color="secondary" size="large" sx={{ mt: 4 }}>
          Join Us
        </Button>
      </Grow>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h5" color="primary" gutterBottom>
              Upcoming Events
            </Typography>
            <ul>
              {upcomingEvents.map((event, index) => (
                <li key={index}>
                  <Typography variant="body1">
                    <strong>{event.date}:</strong> {event.event}
                  </Typography>
                </li>
              ))}
            </ul>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
            <CalendarToday sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" color="primary" gutterBottom>
              Club Activities
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Join us for weekly sessions on programming, cybersecurity, and collaborative projects.
              Participate in hackathons, coding challenges, and more!
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={4}>
          <img
            src="/images/room.jpg"
            alt="Club Room"
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <img
            src="https://via.placeholder.com/300x200"
            alt="Activity 2"
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <img
            src="https://via.placeholder.com/300x200"
            alt="Activity 3"
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
