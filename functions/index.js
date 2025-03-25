// functions/index.js

const {onCall, HttpsError} = require("firebase-functions/v2/https");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

// Initialize Firebase Admin
initializeApp();
const db = getFirestore();

// Cloud function for message moderation
exports.moderateMessage = onCall(async (request) => {
  try {
    const {text, user, timestamp, avatar} = request.data;
    
    if (!text || typeof text !== 'string') {
      throw new HttpsError('invalid-argument', 'Message text is required');
    }

    if (!user || !timestamp) {
      throw new HttpsError('invalid-argument', 'User and timestamp are required');
    }

    // Create a reference to your bad words collection in Firestore
    const badWordsSnapshot = await db.collection('badWords').get();
    const badWords = badWordsSnapshot.docs.map(doc => doc.data().word);

    // Check if the message contains any bad words
    const lowerCaseText = text.toLowerCase();
    const containsBadWord = badWords.some(word => lowerCaseText.includes(word.toLowerCase()));

    if (containsBadWord) {
      return {
        success: false,
        reason: 'Message contains inappropriate content',
      };
    }

    // If no bad words, add the message to Firestore
    const messagesRef = db.collection('messages');
    await messagesRef.add({
      text,
      user,
      timestamp,
      avatar: avatar || ''
    });

    return {
      success: true
    };
  } catch (error) {
    console.error('Error in moderateMessage:', error);
    throw new HttpsError('internal', 'An error occurred processing the message');
  }
});

// Optional: Function to populate initial bad words (run once)
exports.initializeBadWords = onCall(async (request) => {
  // This should be protected by admin authentication
  if (!request.auth || !request.auth.token.admin) {
    throw new HttpsError('permission-denied', 'Only admins can initialize bad words');
  }

  const badWords = [
    "badword1",
    "badword2",
    // Add a reasonable starting set here, but the full list would be in Firestore
  ];

  const batch = db.batch();
  const badWordsRef = db.collection('badWords');

  badWords.forEach((word) => {
    const docRef = badWordsRef.doc();
    batch.set(docRef, { word });
  });

  await batch.commit();
  return { success: true };
});

// Function to add a new bad word
exports.addBadWord = onCall(async (request) => {
  // This should be protected by admin authentication
  if (!request.auth || !request.auth.token.admin) {
    throw new HttpsError('permission-denied', 'Only admins can add bad words');
  }

  const { word } = request.data;
  if (!word) {
    throw new HttpsError('invalid-argument', 'Word is required');
  }

  await db.collection('badWords').add({ word: word.toLowerCase() });
  return { success: true };
});

// Function to remove a bad word
exports.removeBadWord = onCall(async (request) => {
  // This should be protected by admin authentication
  if (!request.auth || !request.auth.token.admin) {
    throw new HttpsError('permission-denied', 'Only admins can remove bad words');
  }

  const { id } = request.data;
  if (!id) {
    throw new HttpsError('invalid-argument', 'Word ID is required');
  }

  await db.collection('badWords').doc(id).delete();
  return { success: true };
});