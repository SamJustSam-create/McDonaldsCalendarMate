const { google } = require('googleapis');

class GoogleCalendarClient {
  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
  }

  getAuthUrl() {
    const scopes = [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events'
    ];

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    });
  }

  async getTokenFromCode(code) {
    const { tokens } = await this.oauth2Client.getToken(code);
    return tokens;
  }

  setCredentials(tokens) {
    this.oauth2Client.setCredentials(tokens);
  }

  async getCalendars() {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
    const response = await calendar.calendarList.list();
    return response.data.items;
  }

  async createEvent(calendarId, eventDetails) {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
    
    const event = {
      summary: eventDetails.summary,
      location: eventDetails.location,
      description: eventDetails.description,
      start: {
        dateTime: eventDetails.startDateTime,
        timeZone: eventDetails.timeZone || 'Australia/Melbourne',
      },
      end: {
        dateTime: eventDetails.endDateTime,
        timeZone: eventDetails.timeZone || 'Australia/Melbourne',
      },
      attendees: eventDetails.attendees || [],
      transparency: 'transparent', // 'transparent' = Free, 'opaque' = Busy
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 30 },
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: calendarId,
      resource: event,
    });

    return response.data;
  }

  async refreshTokenIfNeeded(tokens) {
    this.oauth2Client.setCredentials(tokens);
    
    // Check if token is expired
    const tokenInfo = await this.oauth2Client.getTokenInfo(tokens.access_token);
    const expiryDate = tokenInfo.expiry_date;
    
    if (expiryDate < Date.now()) {
      const { credentials } = await this.oauth2Client.refreshAccessToken();
      return credentials;
    }
    
    return tokens;
  }
}

module.exports = GoogleCalendarClient;
