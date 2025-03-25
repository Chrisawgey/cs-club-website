import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Avatar,
  TextField,
  Grid,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import GoogleIcon from '@mui/icons-material/Google';
import SendIcon from '@mui/icons-material/Send';
import { formatDistanceToNow } from 'date-fns';

const badWords = [
  "fuck", "shit", "bitch", "cunt", "asshole", "bastard", "dick", "cock", "pussy",
  "whore", "slut", "nigger", "faggot", "chink", "spic", "kike", "gook", "wetback",
  "retard", "tranny", "dyke", "hoe", "dumbass", "jackass", "motherfucker", "son of a bitch",
  "twat", "wanker", "bollocks", "arsehole", "nonce", "slag", "tosser", "prick",
  "bloody", "bugger", "damn", "jerkoff", "sodomite", "homophobe", "pedophile",
  "rapist", "terrorist", "nazi", "hitler", "isis", "jihad", "zionist", "negro", "coon",
  "beaner", "camel jockey", "sand nigger", "gypsy", "cracker", "honky", "redneck", "white trash",
  "uncle tom", "oreogate", "banana", "house negro", "house nigger", "coonass",
  "wetback", "half breed", "mongoloid", "spook", "chinaman", "towelhead", "raghead",
  "jigaboo", "tar baby", "burrhead", "pickaninny", "darkie", "moon cricket", "mud person",
  "ape", "monkey", "jungle bunny", "ghetto", "fudge packer", "carpet muncher", "fag", "queer",
  "dyke", "tranny", "she male", "ladyboy", "drag queen", "fairy", "fruit", "sissy",
  "girly boy", "nancy boy", "shemale", "pillow biter", "bone smuggler", "butt pirate",
  "circle jerker", "cock jockey", "dong sucker", "cornholer", "cum guzzler", "knob gobbler",
  "flamer", "gaywad", "poof", "poofter", "tinkerbell", "twinkle toes", "rump ranger",
  "rump wrangler", "sausage jockey", "willy woofter", "yid", "kike", "hebe", "jewboy",
  "christ killer", "sheenie", "shylock", "shyster", "islamist", "raghead", "towel head",
  "sand monkey", "infidel", "muzzie", "hajji", "pig", "swine", "gringo", "gabacho",
  "bean eater", "spic", "spick", "wetback", "greaser", "cholo", "mick", "paddy", "fenians",
  "limey", "pommy", "kraut", "boche", "jerry", "fritz", "hun", "nazi", "goose stepper",
  "wop", "dago", "guido", "ginzo", "eyetie", "chink", "chinaman", "zipperhead", "gook",
  "slant eye", "slope", "yellow peril", "yank", "seppo", "coon", "darky", "niglet",
  "shitskin", "jiggaboo", "jiggaboos", "house negro", "field negro", "bluegum",
  "jungle bunny", "booger eater", "mudshark", "race traitor", "white devil", "cracker",
  "honky", "hillbilly", "peckerwood", "redneck", "trailer trash", "white trash",
  "wasp", "hick", "yokel", "gubba", "toerag", "scouser", "gypsy", "pikey", "tinker",
  "gorgio", "yob", "yobbo", "lad", "hooligan", "lout", "thug", "golliwog", "poppycock",
  "coochie", "cooter", "nut sack", "schlong", "dildo", "tit", "boob", "knockers",
  "jugs", "tits", "nipple", "nips", "camel toe", "muff", "cooch", "poon", "twat",
  "minge", "clunge", "gash", "beaver", "shag", "screwed", "bugger", "blow job",
  "hand job", "rim job", "buttsex", "orgy", "gangbang", "bukkake", "fisting", "felching",
  "snowballing", "cuckold", "cuck", "incel", "simp", "thot", "e-girl", "onlyfans",
  "sugar daddy", "sugar baby", "stripper", "escort", "hooker", "prostitute",
  "streetwalker", "john", "pimp", "trick", "moll", "madam", "whoremaster", "fuckboy",
  "fuckgirl", "slut shaming", "prude", "frigid", "gold digger", "cougar", "milf",
  "gilf", "dilf", "stepmom", "stepsis", "stepbro", "cunnilingus", "fellatio",
  "sixty nine", "doggy style", "cowgirl", "reverse cowgirl", "missionary",
  "anal", "threesome", "foursome", "gangbang", "double penetration", "deepthroat",
  "handcuff", "dominatrix", "submissive", "sadomasochism", "bdsm", "bondage",
  "fetish", "foot fetish", "pee fetish", "scat fetish", "vore", "necro", "necrophilia",
  "pedophilia", "zoophilia", "bestiality", "beastiality", "inflation fetish",
  "giantess fetish", "vore fetish", "cuckolding", "blackmail", "revenge porn",
  "gore", "snuff", "murder porn", "rape fantasy", "noncon", "dubcon", "ageplay",
  "daddy dom", "mommy dom", "sissy", "femdom", "maledom", "erotic asphyxiation"
];

function ClubChat() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showBadWordAlert, setShowBadWordAlert] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const messagesEndRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Auto-scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setShowDisclaimer(false);
    } catch (error) {
      console.error("Failed to sign in", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setShowDisclaimer(true);
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "messages"), 
        orderBy("timestamp", "desc"), 
        limit(50)
      );
      return onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .reverse();
        setMessages(fetchedMessages);
      });
    }
  }, [user]);

  const sendMessage = async () => {
    if (!user || !newMessage.trim()) return;
    
    const containsBadWord = badWords.some((word) => 
      newMessage.toLowerCase().includes(word)
    );

    if (containsBadWord) {
      setShowBadWordAlert(true);
      setNewMessage("");
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        text: newMessage.trim(),
        timestamp: new Date(),
        user: user.displayName || "Anonymous",
        avatar: user.photoURL || "",
        uid: user.uid
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  const renderChatMessage = (msg) => {
    const isOwnMessage = msg.uid === user.uid;
    const messageTimestamp = formatDistanceToNow(msg.timestamp.toDate(), { addSuffix: true });

    return (
      <Box
        key={msg.id}
        sx={{
          display: "flex",
          alignItems: "flex-end",
          mb: 2,
          flexDirection: isOwnMessage ? "row-reverse" : "row",
        }}
      >
        <Avatar 
          src={msg.avatar || "/default-avatar.png"} 
          sx={{ 
            width: 40, 
            height: 40, 
            mx: 1,
            order: isOwnMessage ? 2 : 0
          }} 
        />
        <Box
          sx={{
            maxWidth: "70%",
            p: 1.5,
            borderRadius: "12px",
            backgroundColor: isOwnMessage ? "primary.main" : "grey.200",
            color: isOwnMessage ? "white" : "text.primary",
            boxShadow: 1,
          }}
        >
          <Typography 
            variant="subtitle2" 
            sx={{ 
              fontWeight: "bold", 
              mb: 0.5,
              color: isOwnMessage ? "white" : "text.secondary"
            }}
          >
            {msg.user}
          </Typography>
          <Typography variant="body2">{msg.text}</Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              display: 'block', 
              textAlign: 'right', 
              fontSize: '0.675rem',
              color: isOwnMessage ? "rgba(255,255,255,0.7)" : "text.disabled"
            }}
          >
            {messageTimestamp}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        py: 4, 
        pt: { xs: 12, sm: 8 },  // Increased top padding to account for navbar
        height: '100vh',  // Full viewport height
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Paper
        elevation={6}
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          flex: 1,  // Take up remaining space
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(145deg, #f5f7fa, #e6e9f0)",
        }}
      >
        {/* Disclaimer and Authentication Screens */}
        {showDisclaimer ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              textAlign: "center",
              p: 4,
              background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
              color: "white"
            }}
          >
            <ChatBubbleOutlineIcon sx={{ fontSize: 80, mb: 3, color: "white" }} />
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
              Welcome to the CS & Cybersecurity Club Chat
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: "600px", mb: 3, opacity: 0.9 }}>
              A collaborative space for meaningful discussions about computer science, 
              cybersecurity, and club-related topics.
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: "yellow" }}>
              ⚠️ Respect, professionalism, and inclusivity are our core values
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<GoogleIcon />}
              size="large"
              onClick={signInWithGoogle}
              sx={{ 
                fontSize: "1rem", 
                fontWeight: "bold", 
                px: 4,
                py: 1.5
              }}
            >
              Sign in with Google
            </Button>
          </Box>
        ) : !user ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              p: 4,
              background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
              color: "white"
            }}
          >
            <GoogleIcon sx={{ fontSize: 80, mb: 3, color: "white" }} />
            <Typography variant="h4" gutterBottom>
              Club Chat Authentication
            </Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              startIcon={<GoogleIcon />}
              size="large"
              onClick={signInWithGoogle}
            >
              Sign in with Google
            </Button>
          </Box>
        ) : (
          // Chat Interface
          <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Chat Header */}
            <Box
              sx={{
                p: 2,
                backgroundColor: "primary.main",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: 2
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ChatBubbleOutlineIcon sx={{ mr: 2 }} />
                <Typography variant="h6">Club Chat Room</Typography>
              </Box>
              <Button
                variant="contained"
                color="error"
                startIcon={<LogoutIcon />}
                onClick={handleSignOut}
                size="small"
              >
                Log Out
              </Button>
            </Box>

            {/* Messages Container */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                p: 2,
                background: "linear-gradient(to bottom, #f5f7fa, #e6e9f0)",
              }}
            >
              {messages.map(renderChatMessage)}
              <div ref={messagesEndRef} />
            </Box>

            {/* Message Input */}
            <Box 
              sx={{ 
                p: 2, 
                backgroundColor: "background.paper", 
                borderTop: "1px solid",
                borderColor: "divider"
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={10}>
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
                    sx={{ 
                      '& .MuiOutlinedInput-root': { 
                        borderRadius: 4 
                      } 
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    color="primary" 
                    onClick={sendMessage} 
                    sx={{ 
                      height: "56px", 
                      borderRadius: 4 
                    }}
                  >
                    {isMobile ? <SendIcon /> : "Send"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}

        {/* Bad Word Alert */}
        <Snackbar
          open={showBadWordAlert}
          autoHideDuration={3000}
          onClose={() => setShowBadWordAlert(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setShowBadWordAlert(false)} 
            severity="error" 
            sx={{ width: '100%' }}
          >
            Please maintain appropriate language in the chat.
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
}

export default ClubChat;