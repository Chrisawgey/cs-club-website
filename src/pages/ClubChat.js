import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Button, Avatar, TextField, Grid } from '@mui/material';
import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import LogoutIcon from '@mui/icons-material/Logout';

const firebaseConfig = {
  apiKey: "AIzaSyAtUFRFozm_qnEsPM0dXmeZ-La6WavLsuU",
  authDomain: "cschatroom-61048.firebaseapp.com",
  projectId: "cschatroom-61048",
  storageBucket: "cschatroom-61048.appspot.com",
  messagingSenderId: "244983335090",
  appId: "1:244983335090:web:d1e5a0eaa55849a82f61ab",
  measurementId: "G-6R8049MQK8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const badWords = ["badword1", "badword2", "badword3"]; // Replace with actual bad words.

function ClubChat() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    }, (error) => {
      console.error("Error in onAuthStateChanged:", error);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        setUser(result.user);
      } else {
        console.error("No user returned from sign-in.");
      }
    } catch (error) {
      console.error('Error during sign-in:', error.message);
      alert("Failed to sign in. Please try again.");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error during sign-out:', error.message);
      alert("Failed to sign out. Please try again.");
    }
  };

  const fetchMessages = () => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(fetchedMessages);
    });
  };

  const sendMessage = async () => {
    if (!user || !newMessage.trim()) return;

    // Check for bad words
    const containsBadWord = badWords.some((word) =>
      newMessage.toLowerCase().includes(word)
    );

    if (containsBadWord) {
      alert("Your message contains inappropriate language. Please modify it.");
      setNewMessage('');
      return;
    }

    try {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        timestamp: new Date(),
        user: user.displayName || 'Anonymous',
        avatar: user.photoURL || '',
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    if (user) fetchMessages();
  }, [user]);

  useEffect(() => {
    console.log("Current user:", user);
  }, [user]);

  return (
    <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, sm: 4 }, pt: { xs: 8, sm: 4 } }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: '12px', backgroundColor: '#f5f5f5' }}>
        {!user ? (
          <Box textAlign="center">
            <ChatBubbleOutlineIcon sx={{ fontSize: { xs: 40, sm: 50 }, color: '#3f51b5', mb: 2 }} />
            <Typography variant="h5" gutterBottom color="primary" fontSize={{ xs: '1.5rem', sm: '2rem' }}>
              Welcome to the Club Chat Room
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 2, width: { xs: '100%', sm: 'auto' } }}
              onClick={signInWithGoogle}
            >
              Sign in with Google
            </Button>
          </Box>
        ) : (
          <Box>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems="center"
              mb={2}
              sx={{ backgroundColor: '#3f51b5', color: '#fff', p: 2, borderRadius: '8px' }}
            >
              <Typography variant="h4" fontSize={{ xs: '1.5rem', sm: '2rem' }}>Club Chat Room</Typography>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<LogoutIcon />}
                onClick={handleSignOut}
                sx={{ backgroundColor: '#d32f2f', '&:hover': { backgroundColor: '#b71c1c' }, mt: { xs: 2, sm: 0 } }}
              >
                Log Out
              </Button>
            </Box>

            <Paper
              elevation={1}
              sx={{ p: 2, maxHeight: { xs: 300, sm: 400 }, overflowY: 'auto', mb: 3, borderRadius: '8px' }}
            >
              {messages.map((msg) => (
                <Box
                  key={msg.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                    backgroundColor: '#e3f2fd',
                    p: 2,
                    borderRadius: '8px',
                    flexDirection: { xs: 'column', sm: 'row' },
                  }}
                >
                  <Avatar
                    src={msg.avatar || '/default-avatar.png'}
                    alt={msg.user}
                    sx={{ mr: { sm: 2 }, mb: { xs: 1, sm: 0 }, width: 40, height: 40 }}
                  />
                  <Box textAlign={{ xs: 'center', sm: 'left' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
                      {msg.user}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {msg.text}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Paper>

            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  sx={{ backgroundColor: '#fff', borderRadius: '8px' }}
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default ClubChat;