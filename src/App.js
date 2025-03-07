import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ClubChat from './pages/ClubChat';
import Gallery from './pages/Gallery';
import AboutUs from './pages/AboutUs';
import Projects from './pages/Projects';
import AdminLogin from './pages/AdminLogin';  // Added Admin Login Page
import AdminDashboard from './pages/AdminDashboard';  // Added Admin Dashboard
import theme from './theme';
import SurprisePage from './pages/Surprise';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/club-chat" element={<ClubChat />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/surprise" element={<SurprisePage/>} />

          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
