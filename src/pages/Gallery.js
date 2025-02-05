import React from 'react';
import { Container, Typography, Grid, Card, CardMedia, Zoom } from '@mui/material';

// ✅ Use images from `public/images/` folder
const images = [
  "/images/pic1.jpg",
  "/images/pic2.jpg",
  "/images/pic3.jpg",
  "/images/pic4.jpg",
  "/images/pic5.jpg",
  "/images/pic6.png",
];

function Gallery() {
  return (
    <Container maxWidth="lg" sx={{ py: 4, pt: { xs: 8, sm: 4 } }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        📸 Club Gallery
      </Typography>
      <Grid container spacing={3}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Zoom in={true} style={{ transitionDelay: `${index * 200}ms` }}>
              <Card sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  image={image}
                  alt={`Gallery Image ${index + 1}`}
                  sx={{ width: "100%", height: 250, objectFit: "cover" }}
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
