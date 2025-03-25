import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  Tab,
  Tabs
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, deleteDoc, addDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

function BadWordsManagement() {
  const [badWords, setBadWords] = useState([]);
  const [newWord, setNewWord] = useState('');
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [wordToDelete, setWordToDelete] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const functions = getFunctions();

  useEffect(() => {
    fetchBadWords();
  }, []);

  const fetchBadWords = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'badWords'));
      const words = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBadWords(words);
    } catch (error) {
      console.error('Error fetching bad words:', error);
      showNotification('Failed to load bad words list', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBadWord = async () => {
    if (!newWord.trim()) return;
    
    try {
      const addBadWord = httpsCallable(functions, 'addBadWord');
      await addBadWord({ word: newWord.trim() });
      
      setNewWord('');
      showNotification('Word added to filter list', 'success');
      fetchBadWords();
    } catch (error) {
      console.error('Error adding word:', error);
      showNotification('Failed to add word', 'error');
    }
  };

  const confirmDelete = (word) => {
    setWordToDelete(word);
    setOpenDialog(true);
  };

  const handleDeleteBadWord = async () => {
    if (!wordToDelete) return;
    
    try {
      const removeBadWord = httpsCallable(functions, 'removeBadWord');
      await removeBadWord({ id: wordToDelete.id });
      
      showNotification('Word removed from filter list', 'success');
      setOpenDialog(false);
      fetchBadWords();
    } catch (error) {
      console.error('Error removing word:', error);
      showNotification('Failed to remove word', 'error');
    }
  };

  const showNotification = (message, severity) => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  // Filter words based on search term
  const filteredWords = badWords.filter(word => 
    word.word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Content Moderation - Filtered Words
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          Add or remove words that should be filtered from chat messages
        </Typography>
        
        <Box sx={{ display: 'flex', mb: 2 }}>
          <TextField
            label="Add new word to filter"
            variant="outlined"
            size="small"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            sx={{ flexGrow: 1, mr: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddBadWord}
            disabled={!newWord.trim()}
          >
            Add
          </Button>
        </Box>
        
        <TextField
          label="Search filter list"
          variant="outlined"
          size="small"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Current Filter List ({filteredWords.length} words)
      </Typography>
      
      {loading ? (
        <Typography variant="body2">Loading...</Typography>
      ) : filteredWords.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          {searchTerm ? 'No words match your search' : 'No words in the filter list yet'}
        </Typography>
      ) : (
        <Box sx={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #e0e0e0', borderRadius: 1 }}>
          <List dense>
            {filteredWords.map((word, index) => (
              <React.Fragment key={word.id}>
                <ListItem>
                  <ListItemText primary={word.word} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => confirmDelete(word)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < filteredWords.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      )}
      
      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Removal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove "{wordToDelete?.word}" from the filter list?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteBadWord} color="error">Remove</Button>
        </DialogActions>
      </Dialog>
      
      {/* Notification Snackbar */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={4000} 
        onClose={handleCloseNotification}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default BadWordsManagement;