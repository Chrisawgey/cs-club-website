import React from 'react';
import { Container, Typography, Box, Fade, Grow } from '@mui/material';

function AboutUs() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Fade in={true} timeout={800}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
      </Fade>
      <Fade in={true} timeout={1000}>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Welcome to the CS Club! Our mission is to empower and inspire the next generation of
          computer scientists through hands-on learning, collaboration, and innovation.
        </Typography>
      </Fade>
      <Grow in={true} timeout={1200}>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Our Goals:</Typography>
          <ul>
            <li>Host engaging and educational meetings on cutting-edge topics.</li>
            <li>Collaborate on impactful projects and competitions.</li>
            <li>Prepare members for internships and career opportunities in tech.</li>
          </ul>
        </Box>
      </Grow>
    </Container>
  );
}

export default AboutUs;
