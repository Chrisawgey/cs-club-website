import React from 'react';
import { Container, Typography, Box, Grid, Card, CardActionArea, CardContent } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

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
        {/* Hero Section with Background Animation */}
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
          The Computer Science and Cybersecurity Club (CS&&CS) is for all technology-curious students who want to take their interest in computers further or learn the foundations of cybersecurity. We a variety of projects they can all work on and learn from.
          </Typography>
        </Box>
        
        {/* Categories Section */}
        <Container maxWidth="lg" sx={{ mt: -10, pb: 6 }}>
          <Grid container spacing={4}>
            {['Coding', 'Machine Learning', 'Hacking'].map((category, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card sx={{ position: 'relative', borderRadius: '10px', overflow: 'hidden' }}>
                  <CardActionArea>
                    <Box
                      component="img"
                      src={index === 0 ? "/images/code.gif" : index === 1 ? "/images/machinelearning.gif" : "/images/cyberhack.gif"} // Placeholder image
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
                      <Typography variant="h6">{category} →</Typography> {index === 0 ? (<Typography variant='body2' sx={{ position: 'absolute', bottom: '10px', left: '10px', color: 'white', fontWeight: 'bold' }}></Typography>) : null}
                    </CardContent>
                  </CardActionArea>
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
