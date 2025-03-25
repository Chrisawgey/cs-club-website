import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  Box, 
  Dialog, 
  DialogContent,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';

// ✅ Use images from `public/images/` folder
const galleryImages = [
  {
    src: "/images/pic1.jpg",
    title: "Hackathon 2024",
    description: "Team working on an innovative project",
    category: "Event"
  },
  {
    src: "/images/pic2.jpg",
    title: "Cybersecurity Workshop",
    description: "Learning advanced network security techniques",
    category: "Workshop"
  },
  {
    src: "/images/pic3.jpg",
    title: "Code Review Session",
    description: "Collaborative coding and problem-solving",
    category: "Collaboration"
  },
  {
    src: "/images/pic4.jpg",
    title: "Tech Talk Event",
    description: "Guest speaker sharing industry insights",
    category: "Seminar"
  },
  {
    src: "/images/pic5.jpg",
    title: "Club Social Night",
    description: "Building connections beyond code",
    category: "Social"
  },
  {
    src: "/images/pic6.png",
    title: "Machine Learning Seminar",
    description: "Exploring cutting-edge AI technologies",
    category: "Tech"
  }
];

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('All');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const categories = ['All', ...new Set(galleryImages.map(img => img.category))];

  const filteredImages = filter === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: 4, 
        pt: { xs: 16, sm: 12, md: 10 }, // Increased top padding
        minHeight: '100vh' 
      }}
    >
      {/* Header with Gradient and Subtle Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography 
          variant="h3" 
          gutterBottom 
          textAlign="center"
          sx={{
            background: 'linear-gradient(90deg, #0a0a0a, #3a3a3a, #0a0a0a)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontWeight: 800,
            mb: 4,
            fontSize: { xs: '2.5rem', sm: '3.5rem' },
            backgroundSize: '200% auto',
            animation: 'shine 3s linear infinite'
          }}
        >
          Club Moments
        </Typography>

        {/* Category Filters */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: 2, 
            mb: 4 
          }}
        >
          {categories.map((category) => (
            <motion.div
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Box
                onClick={() => setFilter(category)}
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 4,
                  bgcolor: filter === category ? 'primary.main' : 'grey.200',
                  color: filter === category ? 'white' : 'text.primary',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: filter === category ? 'primary.dark' : 'grey.300'
                  }
                }}
              >
                <Typography variant="body2">{category}</Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </motion.div>

      {/* Gallery Grid */}
      <AnimatePresence>
        <Grid container spacing={3}>
          {filteredImages.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={image.src}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.1 
                }}
              >
                <Card 
                  sx={{ 
                    borderRadius: 3, 
                    overflow: "hidden", 
                    boxShadow: 3,
                    position: 'relative',
                    transform: 'perspective(1000px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'perspective(1000px) translateZ(20px)',
                      boxShadow: 6
                    }
                  }}
                  onClick={() => handleImageClick(image)}
                >
                  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      image={image.src}
                      alt={image.title}
                      sx={{ 
                        width: "100%", 
                        height: 250, 
                        objectFit: "cover",
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1)'
                        }
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))',
                        color: 'white',
                        p: 2,
                        pt: 4
                      }}
                    >
                      <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
                        {image.title}
                      </Typography>
                      <Typography variant="body2" noWrap>
                        {image.description}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </AnimatePresence>

      {/* Image Modal */}
      <Dialog
        open={!!selectedImage}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogContent 
          sx={{ 
            position: 'relative', 
            p: 0, 
            display: 'flex', 
            flexDirection: 'column',
            backgroundColor: 'rgba(0,0,0,0.9)'
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
              zIndex: 1,
              bgcolor: 'rgba(255,255,255,0.2)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.3)'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
          
          {selectedImage && (
            <>
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                style={{
                  width: '100%',
                  maxHeight: '70vh',
                  objectFit: 'contain'
                }}
              />
              <Box 
                sx={{ 
                  p: 3, 
                  bgcolor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  textAlign: 'center'
                }}
              >
                <Typography variant="h5" sx={{ color: 'white', mb: 1 }}>
                  {selectedImage.title}
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  {selectedImage.description}
                </Typography>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default Gallery;