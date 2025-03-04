import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Confetti from 'react-confetti';

const SurprisePage = () => {
  return (
    <Box 
      sx={{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        padding: 3
      }}
    >
      <Confetti 
        width={window.innerWidth} 
        height={window.innerHeight}
        recycle={false}
      />
      <Typography variant="h2" sx={{ color: '#4CAF50', mb: 3 }}>
        🎉 Congratulations! 🕵️
      </Typography>
      <Typography variant="h4" sx={{ mb: 3 }}>
        You've Cracked the Code Like a Pro Hacker!
      </Typography>
      <Box 
        component="img" 
        src="/images/cathack.png" 
        alt="Congratulations Cat" 
        sx={{ 
          maxWidth: '400px', 
          borderRadius: '10px', 
          boxShadow: 3,
          mb: 3 
        }}
      />
      <Typography variant="body1" sx={{ mb: 2 }}>
        Looks like someone's got some serious tech skills! 
        But remember, with great power comes great responsibility.
      </Typography>
      <Button 
        variant="contained" 
        color="secondary"
        onClick={() => window.location.href = '/'}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default SurprisePage;