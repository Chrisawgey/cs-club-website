import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Fade, 
  Grow, 
  Grid, 
  Card, 
  CardContent,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';

function AboutUs() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: 4, 
        pt: { xs: 16, sm: 12, md: 10 }, 
        textAlign: 'center' 
      }}
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography 
          variant="h3" 
          gutterBottom 
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #0a0a0a, #3a3a3a, #0a0a0a)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontSize: { xs: '2.5rem', sm: '3.5rem' },
            mb: 4
          }}
        >
          About CS & CybSEC Club
        </Typography>
        
        <Typography 
          variant="h6" 
          color="text.secondary" 
          sx={{ 
            maxWidth: 700, 
            mx: 'auto', 
            mb: 6 
          }}
        >
          Empowering the next generation of tech innovators through collaborative learning, 
          cutting-edge projects, and industry-focused skill development.
        </Typography>
      </motion.div>

      {/* Goals Section */}
      <Grid container spacing={4} justifyContent="center" sx={{ mb: 6 }}>
        {[
          {
            icon: '💡',
            title: 'Innovative Learning',
            description: 'Explore cutting-edge technologies and emerging trends in computer science and cybersecurity.'
          },
          {
            icon: '💻',
            title: 'Hands-on Projects',
            description: 'Collaborate on real-world projects that challenge and expand your technical skills.'
          },
          {
            icon: '🚀',
            title: 'Career Preparation',
            description: 'Build professional networks and gain insights for internships and tech careers.'
          }
        ].map((goal, index) => (
          <Grid item xs={12} sm={6} md={4} key={goal.title}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2 
              }}
            >
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  p: 3,
                  borderRadius: 3,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: 3
                  }
                }}
              >
                <Typography sx={{ fontSize: '3rem', mb: 2 }}>
                  {goal.icon}
                </Typography>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  {goal.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  align="center"
                >
                  {goal.description}
                </Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Mini Game Section */}
      <Box sx={{ mt: 6 }}>
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ mb: 4 }}
        >
          🎮 Challenge Yourself: Catch the Falling Code!
        </Typography>
        <Game />
      </Box>
    </Container>
  );
}

function Game() {
  const [playerX, setPlayerX] = useState(50);
  const [fallingCode, setFallingCode] = useState({ x: Math.random() * 100, y: 0 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Keyboard controls for desktop
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowLeft' && playerX > 5) {
        setPlayerX((prev) => Math.max(0, prev - 10));
      } else if (event.key === 'ArrowRight' && playerX < 95) {
        setPlayerX((prev) => Math.min(100, prev + 10));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [playerX]);

  // Touch controls for mobile
  const handleTouchMove = (event) => {
    const touchX = event.touches[0].clientX;
    const screenWidth = window.innerWidth;
    const newPlayerX = (touchX / screenWidth) * 100;

    setPlayerX(Math.min(95, Math.max(5, newPlayerX)));
  };

  // Falling code logic
  useEffect(() => {
    const interval = setInterval(() => {
      setFallingCode((prev) => ({
        ...prev,
        y: prev.y + 8,
      }));

      // Check for collision
      if (fallingCode.y > 90 && Math.abs(fallingCode.x - playerX) < 10) {
        const newScore = score + 1;
        setScore(newScore);
        setHighScore(Math.max(newScore, highScore));
        setFallingCode({ x: Math.random() * 100, y: 0 });
      }

      // If the code reaches the bottom without being caught, reset score
      if (fallingCode.y > 100) {
        setScore(0);
        setFallingCode({ x: Math.random() * 100, y: 0 });
      }
    }, 150);

    return () => clearInterval(interval);
  }, [fallingCode, playerX, score, highScore]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '250px',
        background: 'linear-gradient(135deg, #f5f7fa, #e6e9f0)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: 2,
        touchAction: 'none',
      }}
      onTouchMove={handleTouchMove}
    >
      {/* Falling Code */}
      <Box
        sx={{
          position: 'absolute',
          top: `${fallingCode.y}%`,
          left: `${fallingCode.x}%`,
          transform: 'translate(-50%, -50%)',
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#ff6600',
          textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
        }}
      >
        {'</>'}
      </Box>

      {/* Player */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '10px',
          left: `${playerX}%`,
          transform: 'translateX(-50%)',
          width: '60px',
          height: '15px',
          background: 'linear-gradient(90deg, #333, #666)',
          borderRadius: '8px',
          boxShadow: 1
        }}
      />

      {/* Scores */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 10, 
          left: 10, 
          display: 'flex', 
          gap: 2 
        }}
      >
        <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
          Score: {score}
        </Typography>
        <Typography sx={{ fontSize: '1rem', fontWeight: 'bold', color: 'text.secondary' }}>
          High Score: {highScore}
        </Typography>
      </Box>
    </Box>
  );
}

export default AboutUs;