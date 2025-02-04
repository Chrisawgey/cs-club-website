import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin-login');
    }
  }, [isAdmin, navigate]);

  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem('events')) || [
      { date: '30', month: 'Jan', day: 'Thursday', time: '9:30 am', title: 'Cryptography and Security Day', subtitle: 'Cybersecurity Event' },
      { date: '31', month: 'Jan', day: 'Friday', time: '10:00 am', title: 'Quantum Computing Day', subtitle: 'Tech Talk' },
      { date: '03', month: 'Feb', day: 'Monday', time: '4:00 pm', title: 'NextGen Fellowship Program Info', subtitle: 'Information Session' },
      { date: '04', month: 'Feb', day: 'Tuesday', time: '9:30 am', title: 'Doctoral Thesis: On the Learnability of General Reinforcement-learning Objectives', subtitle: 'Thesis Defense' }
    ]
  );

  const handleChange = (index, key, value) => {
    const updatedEvents = [...events];
    updatedEvents[index][key] = value;
    setEvents(updatedEvents);
  };

  const saveChanges = () => {
    localStorage.setItem('events', JSON.stringify(events));
    alert('Events Updated!');
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h4" gutterBottom>Admin Panel - Edit Events</Typography>

      {events.map((event, index) => (
        <Box key={index} sx={{ my: 3, p: 2, border: '1px solid gray', borderRadius: '8px' }}>
          <TextField label="Date" value={event.date} onChange={(e) => handleChange(index, 'date', e.target.value)} sx={{ mr: 1 }} />
          <TextField label="Month" value={event.month} onChange={(e) => handleChange(index, 'month', e.target.value)} sx={{ mr: 1 }} />
          <TextField label="Day" value={event.day} onChange={(e) => handleChange(index, 'day', e.target.value)} sx={{ mr: 1 }} />
          <TextField label="Time" value={event.time} onChange={(e) => handleChange(index, 'time', e.target.value)} sx={{ mr: 1 }} />
          <TextField label="Title" fullWidth value={event.title} onChange={(e) => handleChange(index, 'title', e.target.value)} sx={{ mt: 1 }} />
          <TextField label="Subtitle (Optional)" fullWidth value={event.subtitle || ''} onChange={(e) => handleChange(index, 'subtitle', e.target.value)} sx={{ mt: 1 }} />
        </Box>
      ))}

      <Button variant="contained" color="success" onClick={saveChanges} sx={{ mt: 3 }}>
        Save Changes
      </Button>

      <Button variant="outlined" color="secondary" onClick={handleLogout} sx={{ mt: 3, ml: 2 }}>
        Logout
      </Button>
    </Container>
  );
}

export default AdminDashboard;
