import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

function Meetings() {
  const meetings = [
    { date: 'Jan 28, 2025', topic: 'Intro to Machine Learning' },
    { date: 'Feb 4, 2025', topic: 'LeetCode Practice' },
    { date: 'Feb 11, 2025', topic: 'Cybersecurity Basics' },
  ];

  return (
    <Container maxWidth="md" style={{ textAlign: 'center', padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Upcoming Meetings
      </Typography>
      <List>
        {meetings.map((meeting, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={meeting.topic}
              secondary={meeting.date}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Meetings;
