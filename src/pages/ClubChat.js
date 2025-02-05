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
} from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { db, auth } from "../firebaseConfig"; // Import shared Firebase config
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LogoutIcon from "@mui/icons-material/Logout";

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
  const [showDisclaimer, setShowDisclaimer] = useState(true); // New disclaimer state
  const messagesEndRef = useRef(null); // Auto-scroll ref

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
    } catch (error) {
      alert("Failed to sign in. Please try again.");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      alert("Failed to sign out.");
    }
  };

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "messages"), orderBy("timestamp"));
      return onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
    }
  }, [user]);

  const sendMessage = async () => {
    if (!user || !newMessage.trim()) return;
    const containsBadWord = badWords.some((word) => newMessage.toLowerCase().includes(word));
    if (containsBadWord) {
      setShowBadWordAlert(true);
      setNewMessage("");
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        timestamp: new Date(),
        user: user.displayName || "Anonymous",
        avatar: user.photoURL || "",
      });
      setNewMessage("");
    } catch (error) {
      alert("Error sending message.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, pt: { xs: 8, sm: 4 } }}>
      <Paper
        elevation={3}
        sx={{
          borderRadius: "12px",
          overflow: "hidden",
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(145deg, #f5f5f5, #e0e0e0)",
        }}
      >
        {/* Disclaimer Screen */}
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
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
              Welcome to the CS & Cybersecurity Club Chat! 💻
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: "600px", mb: 3 }}>
              This chat is a safe and welcoming space for discussions about computer science, cybersecurity, and club-related topics.  
              Please be **respectful** to others, keep discussions appropriate, and avoid any offensive language.
            </Typography>
            <Typography variant="body2" color="error" sx={{ mb: 3 }}>
              ⚠️ No hate speech, offensive words, or inappropriate behavior will be tolerated.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ fontSize: "1rem", fontWeight: "bold", px: 4 }}
              onClick={() => setShowDisclaimer(false)}
            >
              Jump In 🚀
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
            }}
          >
            <ChatBubbleOutlineIcon sx={{ fontSize: 50, color: "#3f51b5", mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Welcome to the Club Chat Room
            </Typography>
            <Button variant="contained" onClick={signInWithGoogle}>
              Sign in with Google
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Header */}
            <Box
              sx={{
                p: 2,
                backgroundColor: "#3f51b5",
                color: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Club Chat Room</Typography>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<LogoutIcon />}
                onClick={handleSignOut}
                sx={{ backgroundColor: "#d32f2f", "&:hover": { backgroundColor: "#b71c1c" } }}
              >
                Log Out
              </Button>
            </Box>

            {/* Chat Messages */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                p: 2,
                backgroundColor: "#fafafa",
              }}
            >
              {messages.map((msg) => (
                <Box
                  key={msg.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    flexDirection: msg.user === user.displayName ? "row-reverse" : "row",
                  }}
                >
                  <Avatar src={msg.avatar || "/default-avatar.png"} sx={{ mx: 2 }} />
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "12px",
                      backgroundColor: msg.user === user.displayName ? "#3f51b5" : "#e0e0e0",
                      color: msg.user === user.displayName ? "#fff" : "#000",
                      maxWidth: "70%",
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {msg.user}
                    </Typography>
                    <Typography variant="body2">{msg.text}</Typography>
                  </Box>
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Box>

            {/* Message Input */}
            <Box sx={{ p: 2, backgroundColor: "#fff", borderTop: "1px solid #e0e0e0" }}>
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
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button fullWidth variant="contained" color="primary" onClick={sendMessage} sx={{ height: "56px" }}>
                    Send
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default ClubChat;
