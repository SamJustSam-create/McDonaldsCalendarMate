# Local Testing Guide

## Quick Start for Local Development

### 1. Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Set Up Google Calendar API Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google Calendar API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:5000/api/auth/callback`
6. Copy your Client ID and Client Secret

### 3. Configure Environment Variables

Edit the `.env` file in the root directory and add your credentials:

```env
PORT=5000
NODE_ENV=development
GOOGLE_CLIENT_ID=your_actual_client_id_here
GOOGLE_CLIENT_SECRET=your_actual_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/callback
FRONTEND_URL=http://localhost:3000
```

### 4. Start Development Servers

**Option A: Run both servers with one command**
```bash
npm run dev
```

**Option B: Run servers separately**

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm run client
```

### 5. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## Testing the Flow

### Step 1: Login
- Click "Login with Google"
- Authenticate with your Google account
- Grant calendar permissions

### Step 2: Parse a Shift Schedule

Use this example:
```
Thursday 01/Jan/2026
STRATH VILLAGE VIC
Start 7:30 AM Thursday 01/Jan/2026
Finish 3:30 PM Thursday 01/Jan/2026
Break time 11:30 AM - 12:00 PM
7:30hrs +0:30hrs Break
DT2:DT Intermediate - OTC
```

### Step 3: Create Event
- Select your calendar
- Optionally add guest emails
- Click "Create Event"

### Step 4: Verify
- Check your Google Calendar
- Event should appear with:
  - Title: "Sam - Work"
  - Correct date and time
  - Location and description filled
  - Status: Free (not Busy)

## Test Cases to Try

### Test 1: Basic Shift (All Fields)
```
Thursday 01/Jan/2026
STORE LOCATION
Start 9:00 AM Thursday 01/Jan/2026
Finish 5:00 PM Thursday 01/Jan/2026
Break time 12:00 PM - 12:30 PM
8:00hrs +0:30hrs Break
Area: Main Floor
```

### Test 2: No Break Time
```
Friday 02/Jan/2026
DOWNTOWN STORE
Start 8:00 AM Friday 02/Jan/2026
Finish 4:00 PM Friday 02/Jan/2026
8:00hrs
Sales Department
```

### Test 3: Minimal Information
```
Saturday 03/Jan/2026
WEST BRANCH
Start 10:00 AM Saturday 03/Jan/2026
Finish 6:00 PM Saturday 03/Jan/2026
```

### Test 4: Different Time Formats
```
Sunday 04/Jan/2026
EAST LOCATION
Start 7:30 AM Sunday 04/Jan/2026
Finish 3:30 PM Sunday 04/Jan/2026
Break time 11:00 AM - 11:30 AM
8:00hrs +0:30hrs Break
Customer Service
```

## Troubleshooting

### Backend won't start
- Check that port 5000 is not in use
- Verify `.env` file exists and has correct values
- Check that all dependencies are installed: `npm install`

### Frontend won't start
- Check that port 3000 is not in use
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Can't login
- Verify Google OAuth credentials are correct
- Check redirect URI matches exactly: `http://localhost:5000/api/auth/callback`
- Make sure you're testing with an email added to "Test users" in Google Console

### Parse fails
- Check the format matches examples
- Look at browser console for specific errors
- Verify backend logs for parsing errors

### Event creation fails
- Check you have write access to the selected calendar
- Verify you granted calendar permissions during OAuth
- Check backend logs for API errors

## API Endpoints (for manual testing)

### Check auth status
```bash
curl http://localhost:5000/api/auth/status
```

### Get auth URL
```bash
curl http://localhost:5000/api/auth/url
```

### Parse shift (requires authentication)
```bash
curl -X POST http://localhost:5000/api/calendar/parse \
  -H "Content-Type: application/json" \
  -d '{"text":"Thursday 01/Jan/2026\nSTORE\nStart 9:00 AM Thursday 01/Jan/2026\nFinish 5:00 PM Thursday 01/Jan/2026"}'
```

## Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- Frontend: Changes to React files reload automatically
- Backend: Using nodemon, changes to `.js` files restart the server

### Debugging
- Backend logs appear in the terminal running `npm run server`
- Frontend logs appear in browser console (F12)
- Add `console.log()` statements as needed

### Testing Different Users
- Clear localStorage in browser to reset saved emails
- Use incognito/private mode for fresh sessions
- Logout and login with different Google accounts

## Next Steps

Once local testing is successful:
1. Commit your code (don't commit `.env`!)
2. Push to GitHub
3. Follow [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md) for deployment

## Common Issues

### "Redirect URI mismatch"
- Double-check the redirect URI in Google Console
- Ensure no trailing slashes
- Must be exactly: `http://localhost:5000/api/auth/callback`

### CORS errors
- Verify `FRONTEND_URL` in `.env` is `http://localhost:3000`
- Check backend CORS configuration allows your frontend origin

### Token expired
- Tokens are stored in memory (lost on server restart)
- Just login again after restarting backend

---

Happy testing! 🎉
