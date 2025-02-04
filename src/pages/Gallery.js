import React from 'react';
import { Container, Typography, Grid, Card, CardMedia, Zoom } from '@mui/material';

const images = [
  'https://via.placeholder.com/300x200',
  'https://via.placeholder.com/300x200',
  'https://via.placeholder.com/300x200',
  'https://via.placeholder.com/300x200',
  'https://via.placeholder.com/300x200',
  'https://via.placeholder.com/300x200',
];

function Gallery() {
  return (
    <Container maxWidth="lg" sx={{ py: 4, pt: { xs: 8, sm: 4 } }}>
      <Typography variant="h4" gutterBottom>
        Gallery
      </Typography>
      <Grid container spacing={3}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Zoom in={true} style={{ transitionDelay: `${index * 200}ms` }}>
              <Card>
                <CardMedia
                  component="img"
                  image={image}
                  alt={`Gallery Image ${index + 1}`}
                  sx={{ borderRadius: 1 }}
                />
              </Card>
            </Zoom>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Gallery;