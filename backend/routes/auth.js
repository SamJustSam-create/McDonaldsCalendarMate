const express = require('express');
const router = express.Router();
const GoogleCalendarClient = require('../utils/googleClient');

// Store tokens in memory (for single user)
// In production with multiple users, use a database
let userTokens = null;

// Get auth URL
router.get('/url', (req, res) => {
  try {
    const client = new GoogleCalendarClient();
    const authUrl = client.getAuthUrl();
    res.json({ url: authUrl });
  } catch (error) {
    console.error('Error generating auth URL:', error);
    res.status(500).json({ error: 'Failed to generate auth URL' });
  }
});

// Handle OAuth callback
router.get('/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Missing authorization code');
  }

  try {
    const client = new GoogleCalendarClient();
    const tokens = await client.getTokenFromCode(code);
    userTokens = tokens;

    // Redirect to frontend with success
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}?auth=success`);
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}?auth=error`);
  }
});

// Check auth status
router.get('/status', (req, res) => {
  res.json({ authenticated: !!userTokens });
});

// Logout
router.post('/logout', (req, res) => {
  userTokens = null;
  res.json({ success: true });
});

// Get tokens (for internal use by other routes)
router.getTokens = () => userTokens;
router.setTokens = (tokens) => { userTokens = tokens; };

module.exports = router;
