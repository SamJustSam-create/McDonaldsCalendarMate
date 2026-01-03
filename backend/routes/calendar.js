const express = require('express');
const router = express.Router();
const GoogleCalendarClient = require('../utils/googleClient');
const { parseShiftSchedule, createEventFromShift } = require('../utils/parser');
const authRoutes = require('./auth');

// Middleware to check authentication
function requireAuth(req, res, next) {
  const tokens = authRoutes.getTokens();
  if (!tokens) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  req.tokens = tokens;
  next();
}

// Get list of calendars
router.get('/list', requireAuth, async (req, res) => {
  try {
    const client = new GoogleCalendarClient();
    client.setCredentials(req.tokens);
    
    const calendars = await client.getCalendars();
    res.json({ calendars });
  } catch (error) {
    console.error('Error fetching calendars:', error);
    res.status(500).json({ error: 'Failed to fetch calendars' });
  }
});

// Parse shift text
router.post('/parse', requireAuth, async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'No text provided' });
    }

    const parsed = parseShiftSchedule(text);
    const eventData = createEventFromShift(parsed);
    
    res.json({ 
      parsed,
      eventData 
    });
  } catch (error) {
    console.error('Error parsing shift:', error);
    res.status(400).json({ error: error.message || 'Failed to parse shift data' });
  }
});

// Create calendar event
router.post('/create', requireAuth, async (req, res) => {
  try {
    const { calendarId, eventDetails, attendees } = req.body;
    
    if (!calendarId || !eventDetails) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const client = new GoogleCalendarClient();
    client.setCredentials(req.tokens);

    // Add attendees to event details
    if (attendees && attendees.length > 0) {
      eventDetails.attendees = attendees.map(email => ({ email }));
    }

    const event = await client.createEvent(calendarId, eventDetails);
    
    res.json({ 
      success: true,
      event,
      eventLink: event.htmlLink
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: error.message || 'Failed to create event' });
  }
});

module.exports = router;
