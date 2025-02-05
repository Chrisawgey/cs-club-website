import React, { useEffect, useState } from "react";
import { Container, TextField, Button, Typography, Box, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";

function AdminDashboard() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin");
  const [events, setEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // State for popup

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin-login");
    }
    fetchEvents();
  }, [isAdmin, navigate]);

  const fetchEvents = async () => {
    const querySnapshot = await getDocs(collection(db, "events"));
    const eventsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setEvents(eventsData);
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
      setShowPopup(true); // Show success popup
      fetchEvents(); // Refresh event list after update
    } catch (error) {
      console.error("Error updating events:", error);
    }
  };

  const addNewEvent = () => {
    setEvents([...events, { date: "", month: "", day: "", time: "", title: "", subtitle: "" }]);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", py: 4, pt: { xs: 8, sm: 4 } }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel - Edit Events
      </Typography>

      {events.map((event, index) => (
        <Box key={event.id || index} sx={{ my: 3, p: 2, border: "1px solid gray", borderRadius: "8px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 1,
              mb: 2,
            }}
          >
            <TextField
              label="Date"
              value={event.date}
              onChange={(e) => handleChange(index, "date", e.target.value)}
              fullWidth
            />
            <TextField
              label="Month"
              value={event.month}
              onChange={(e) => handleChange(index, "month", e.target.value)}
              fullWidth
            />
            <TextField
              label="Day"
              value={event.day}
              onChange={(e) => handleChange(index, "day", e.target.value)}
              fullWidth
            />
            <TextField
              label="Time"
              value={event.time}
              onChange={(e) => handleChange(index, "time", e.target.value)}
              fullWidth
            />
          </Box>
          <TextField
            label="Title"
            fullWidth
            value={event.title}
            onChange={(e) => handleChange(index, "title", e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Subtitle (Optional)"
            fullWidth
            value={event.subtitle || ""}
            onChange={(e) => handleChange(index, "subtitle", e.target.value)}
          />
        </Box>
      ))}

      <Button variant="contained" color="primary" onClick={addNewEvent} sx={{ mt: 3 }}>
        + Add New Event
      </Button>

      <Button variant="contained" color="success" onClick={saveChanges} sx={{ mt: 3, ml: 2 }}>
        Save Changes
      </Button>

      <Button variant="outlined" color="secondary" onClick={handleLogout} sx={{ mt: 3, ml: 2 }}>
        Logout
      </Button>

      {/* Success Popup */}
      <Snackbar open={showPopup} autoHideDuration={3000} onClose={() => setShowPopup(false)}>
        <Alert onClose={() => setShowPopup(false)} severity="success" sx={{ width: "100%", borderRadius: "12px" }}>
          ✅ Changes Saved Successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default AdminDashboard;