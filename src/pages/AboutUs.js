import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Fade, Grow } from '@mui/material';

function AboutUs() {
  return (
    <Container maxWidth="md" sx={{ py: 4, pt: { xs: 8, sm: 4 }, textAlign: 'center' }}>
      <Fade in={true} timeout={800}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #ff6a00, #ee0979)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontSize: { xs: '2rem', sm: '3rem' },
          }}
        >
          About Us 🚀
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
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>💡 Host engaging and educational meetings on cutting-edge topics.</li>
            <li>💻 Collaborate on impactful projects and competitions.</li>
            <li>🚀 Prepare members for internships and career opportunities in tech.</li>
          </ul>
        </Box>
      </Grow>

      {/* Mini Game Section */}
      <Grow in={true} timeout={1400}>
        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" gutterBottom>
            🎮 Try Our Mini-Game: Catch the Falling Code!
          </Typography>
          <Game />
        </Box>
      </Grow>
    </Container>
  );
}

function Game() {
  const [playerX, setPlayerX] = useState(50); // Player position (percentage)
  const [fallingCode, setFallingCode] = useState({ x: Math.random() * 100, y: 0 }); // Falling code position
  const [score, setScore] = useState(0);

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
    const newPlayerX = (touchX / screenWidth) * 100; // Convert to percentage

    setPlayerX(Math.min(95, Math.max(5, newPlayerX))); // Keep player inside bounds
  };

  // Falling code logic
  useEffect(() => {
    const interval = setInterval(() => {
      setFallingCode((prev) => ({
        ...prev,
        y: prev.y + 8, // Increased speed
      }));

      // Check for collision
      if (fallingCode.y > 90 && Math.abs(fallingCode.x - playerX) < 10) {
        setScore((prevScore) => prevScore + 1);
        setFallingCode({ x: Math.random() * 100, y: 0 });
      }

      // If the code reaches the bottom without being caught, reset score
      if (fallingCode.y > 100) {
        setScore(0); // Reset score when missed
        setFallingCode({ x: Math.random() * 100, y: 0 });
      }
    }, 150); // Faster falling speed

    return () => clearInterval(interval);
  }, [fallingCode, playerX]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '200px',
        background: '#f0f0f0',
        borderRadius: '10px',
        overflow: 'hidden',
        touchAction: 'none',
      }}
      onTouchMove={handleTouchMove} // Enable touch controls
    >
      {/* Falling Code */}
      <Box
        sx={{
          position: 'absolute',
          top: `${fallingCode.y}%`,
          left: `${fallingCode.x}%`,
          transform: 'translate(-50%, -50%)',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#ff6600',
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
          width: '40px',
          height: '10px',
          background: 'linear-gradient(90deg, #333, #666)',
          borderRadius: '5px',
        }}
      />

      {/* Score */}
      <Typography sx={{ position: 'absolute', top: 10, left: 10, fontSize: '1rem', fontWeight: 'bold' }}>
        Score: {score}
      </Typography>
    </Box>
  );
}

export default AboutUs;
