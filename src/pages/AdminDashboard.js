import React, { useEffect, useState } from "react";
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Snackbar, 
  Alert, 
  Paper, 
  Grid,
  IconButton,
  Tooltip
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SaveIcon from '@mui/icons-material/Save';
import LogoutIcon from '@mui/icons-material/Logout';

function AdminDashboard() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin");
  const [events, setEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupSeverity, setPopupSeverity] = useState("success");

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin-login");
    }
    fetchEvents();
  }, [isAdmin, navigate]);

  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "events"));
      const eventsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
    } catch (error) {
      showNotification("Error fetching events", "error");
    }
  };

  const handleChange = (index, key, value) => {
    const updatedEvents = [...events];
    updatedEvents[index][key] = value;
    setEvents(updatedEvents);
  };

  const saveChanges = async () => {
    try {
      for (let event of events) {
        if (event.id) {
          const eventRef = doc(db, "events", event.id);
          await updateDoc(eventRef, {
            date: event.date,
            month: event.month,
            day: event.day,
            time: event.time,
            title: event.title,
            subtitle: event.subtitle || "",
          });
        } else {
          await addDoc(collection(db, "events"), {
            date: event.date,
            month: event.month,
            day: event.day,
            time: event.time,
            title: event.title,
            subtitle: event.subtitle || "",
          });
        }
      }
      showNotification("Changes saved successfully!", "success");
      fetchEvents();
    } catch (error) {
      console.error("Error updating events:", error);
      showNotification("Failed to save changes", "error");
    }
  };

  const addNewEvent = () => {
    setEvents([
      ...events, 
      { 
        date: "", 
        month: "", 
        day: "", 
        time: "", 
        title: "", 
        subtitle: "" 
      }
    ]);
  };

  const deleteEvent = async (index) => {
    try {
      const eventToDelete = events[index];
      
      // If the event has an ID, it exists in Firestore
      if (eventToDelete.id) {
        await deleteDoc(doc(db, "events", eventToDelete.id));
      }
      
      // Remove the event from local state
      const updatedEvents = events.filter((_, i) => i !== index);
      setEvents(updatedEvents);
      
      showNotification("Event deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting event:", error);
      showNotification("Failed to delete event", "error");
    }
  };

  const showNotification = (message, severity) => {
    setPopupMessage(message);
    setPopupSeverity(severity);
    setShowPopup(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        textAlign: "center", 
        py: 4, 
        pt: { xs: 16, sm: 12, md: 10 } 
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{
            background: 'linear-gradient(90deg, #0a0a0a, #3a3a3a, #0a0a0a)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontWeight: 800,
            mb: 4
          }}
        >
          Admin Dashboard - Manage Events
        </Typography>

        {events.map((event, index) => (
          <motion.div
            key={event.id || index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Paper 
              elevation={3} 
              sx={{ 
                my: 3, 
                p: 3, 
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                }
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Date"
                    value={event.date}
                    onChange={(e) => handleChange(index, "date", e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Month"
                    value={event.month}
                    onChange={(e) => handleChange(index, "month", e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    label="Day"
                    value={event.day}
                    onChange={(e) => handleChange(index, "day", e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    label="Time"
                    value={event.time}
                    onChange={(e) => handleChange(index, "time", e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Tooltip title="Delete Event">
                    <IconButton 
                      color="error" 
                      onClick={() => deleteEvent(index)}
                      sx={{
                        transition: 'transform 0.2s ease',
                        '&:hover': {
                          transform: 'scale(1.1)'
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>

              <Box sx={{ mt: 2 }}>
                <TextField
                  label="Event Title"
                  fullWidth
                  value={event.title}
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Subtitle (Optional)"
                  fullWidth
                  value={event.subtitle || ""}
                  onChange={(e) => handleChange(index, "subtitle", e.target.value)}
                  variant="outlined"
                />
              </Box>
            </Paper>
          </motion.div>
        ))}

        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 2, 
            mt: 4 
          }}
        >
          <Button 
            variant="contained" 
            color="primary" 
            onClick={addNewEvent}
            startIcon={<AddCircleOutlineIcon />}
            sx={{
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: 3
              }
            }}
          >
            Add New Event
          </Button>

          <Button 
            variant="contained" 
            color="success" 
            onClick={saveChanges}
            startIcon={<SaveIcon />}
            sx={{
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: 3
              }
            }}
          >
            Save Changes
          </Button>

          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: 3
              }
            }}
          >
            Logout
          </Button>
        </Box>

        {/* Success/Error Popup */}
        <Snackbar 
          open={showPopup} 
          autoHideDuration={3000} 
          onClose={() => setShowPopup(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setShowPopup(false)} 
            severity={popupSeverity} 
            sx={{ 
              width: "100%", 
              borderRadius: "12px" 
            }}
          >
            {popupMessage}
          </Alert>
        </Snackbar>
      </motion.div>
    </Container>
  );
}

export default AdminDashboard;