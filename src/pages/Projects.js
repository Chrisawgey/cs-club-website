import React from 'react';
import { Container, Typography, Card, CardContent, Grid, Button, Slide } from '@mui/material';

const projects = [
  {
    title: 'AI Lip Reading',
    description: 'Developing an AI-based system to read lips for accessibility and sports analysis.',
    link: '#',
  },
  {
    title: 'Group Stage Eliminator',
    description: 'A real-time elimination tracker for competitions with dynamic updates.',
    link: '#',
  },
  {
    title: 'Event Planner',
    description: 'A collaborative budget tracker and event planning app for students.',
    link: '#',
  },
];

function Projects() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>
      <Grid container spacing={3}>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Slide direction="up" in={true} style={{ transitionDelay: `${index * 200}ms` }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {project.description}
                  </Typography>
                  <Button variant="contained" color="primary" href={project.link} size="small">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Slide>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Projects;
