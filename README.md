# 📅 CalendarMate

Automatically create Google Calendar events from your work shift schedules. Simply paste your shift information, and CalendarMate will parse it and create a beautifully formatted calendar event with all the details.

## ✨ Features

- **Smart Parsing**: Automatically extracts date, time, location, and break information from shift schedules
- **Google Calendar Integration**: Seamlessly creates events in your selected Google Calendar
- **Flexible Format**: Handles variations in shift schedule formats gracefully
- **Email Guests**: Save frequently used email addresses and easily add guests to events
- **Calendar Selection**: Choose which calendar to add events to
- **Free/Busy Toggle**: Events are automatically set to "Free" instead of "Busy"
- **Break Time Tracking**: Automatically includes break times in event description
- **Clean UI**: Beautiful, modern interface built with React

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Cloud Console account
- Railway account (for deployment)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/CalendarMate.git
   cd CalendarMate
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up Google Calendar API**
   
   Follow the detailed instructions in [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md) Part 1 to:
   - Create a Google Cloud project
   - Enable Google Calendar API
   - Configure OAuth consent screen
   - Create OAuth 2.0 credentials

4. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   NODE_ENV=development
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/callback
   FRONTEND_URL=http://localhost:3000
   ```

5. **Start the development servers**
   
   In one terminal (backend):
   ```bash
   npm run server
   ```
   
   In another terminal (frontend):
   ```bash
   npm run client
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 📝 Usage

1. **Login**: Click "Login with Google" and authenticate
2. **Paste Schedule**: Copy your shift schedule and paste it into the textarea
3. **Parse**: Click "Parse Schedule" to extract the information
4. **Review**: Check the parsed information is correct
5. **Select Calendar**: Choose which calendar to add the event to
6. **Add Guests (Optional)**: Select from saved emails or add new ones
7. **Create Event**: Click "Create Event" to add it to your calendar

### Example Input Format

```
Thursday 01/Jan/2026
STRATH VILLAGE VIC
Start 7:30 AM Thursday 01/Jan/2026
Finish 3:30 PM Thursday 01/Jan/2026
Break time 11:30 AM - 12:00 PM
7:30hrs +0:30hrs Break
DT2:DT Intermediate - OTC
```

## 🏗️ Project Structure

```
CalendarMate/
├── backend/
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   └── calendar.js      # Calendar event routes
│   ├── utils/
│   │   ├── googleClient.js  # Google Calendar API client
│   │   └── parser.js        # Shift schedule parser
│   └── server.js            # Express server
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ShiftInput.js
│   │   │   ├── CalendarSelector.js
│   │   │   ├── EmailManager.js
│   │   │   └── CreateEvent.js
│   │   ├── services/
│   │   │   └── api.js       # API service layer
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
├── package.json
├── .env.example
├── README.md
└── RAILWAY_DEPLOYMENT.md    # Deployment guide
```

## 🚢 Deployment

For detailed deployment instructions to Railway, see [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md).

Quick steps:
1. Push code to GitHub
2. Create new Railway project from GitHub repo
3. Add environment variables
4. Deploy!

## 🔧 Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `production` or `development` |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | From Google Cloud Console |
| `GOOGLE_REDIRECT_URI` | OAuth callback URL | `https://your-app.railway.app/api/auth/callback` |
| `FRONTEND_URL` | Frontend URL for CORS | `https://your-app.railway.app` |

### Supported Date/Time Formats

- Date: `DD/MMM/YYYY` (e.g., `01/Jan/2026`)
- Time: `H:MM AM/PM` (e.g., `7:30 AM`, `3:30 PM`)
- Day: Full day names (e.g., `Thursday`, `Friday`)

## 🎨 Customization

### Change Event Title

Edit [backend/utils/parser.js](backend/utils/parser.js):
```javascript
return {
  summary: 'Your Custom Title',  // Change this line
  location: shiftData.storeLocation || '',
  // ...
};
```

### Change Time Zone

Edit [backend/utils/googleClient.js](backend/utils/googleClient.js):
```javascript
start: {
  dateTime: eventDetails.startDateTime,
  timeZone: 'Your/Timezone',  // Change from 'Australia/Melbourne'
},
```

### Modify Event Transparency

Edit [backend/utils/googleClient.js](backend/utils/googleClient.js):
```javascript
transparency: 'opaque',  // Change to 'opaque' for Busy instead of Free
```

## 🐛 Troubleshooting

### Authentication Issues

- Ensure redirect URIs in Google Cloud Console match exactly
- Check that Google Calendar API is enabled
- Verify OAuth consent screen is configured correctly

### Parsing Issues

- Check that your input format matches the expected format
- The parser handles optional fields gracefully
- Check browser console for specific error messages

### Event Creation Fails

- Verify you have write access to the selected calendar
- Check that all required fields are present (start time, end time)
- Ensure the selected calendar exists

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with React and Express
- Uses Google Calendar API
- Deployed on Railway

## 📞 Support

For issues and questions:
- Check the troubleshooting section
- Review deployment documentation
- Open an issue on GitHub

---

**Made with ❤️ for automating work schedules**
