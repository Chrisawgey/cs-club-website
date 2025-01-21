// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff0000', // Red for the primary color
    },
    secondary: {
      main: '#ffffff', // White for the secondary color
    },
    background: {
      default: '#ffffff', // White background
    },
    text: {
      primary: '#000000', // Black text for primary content
      secondary: '#000000', // Black text for secondary content
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none', // Disable uppercase text for buttons
      color: '#ffffff', // White text for buttons
    },
  },
});

export default theme;
