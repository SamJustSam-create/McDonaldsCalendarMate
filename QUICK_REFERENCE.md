# CalendarMate - Quick Command Reference

## 🚀 Installation & Setup

```bash
# Install all dependencies (root + frontend)
npm run install-all

# Or install separately
npm install                    # Backend dependencies
cd frontend && npm install     # Frontend dependencies
```

## 💻 Development

```bash
# Run both frontend and backend together
npm run dev

# Run backend only (port 5000)
npm run server

# Run frontend only (port 3000)
npm run client
```

## 🏗️ Production Build

```bash
# Build frontend for production
npm run build

# Start production server
npm start
```

## 📦 Git Commands

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/CalendarMate.git

# Push to GitHub
git branch -M main
git push -u origin main

# Future updates
git add .
git commit -m "Your message"
git push
```

## 🌍 Environment Variables

### Local Development (.env)
```env
PORT=5000
NODE_ENV=development
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/callback
FRONTEND_URL=http://localhost:3000
```

### Production (Railway)
```env
PORT=5000
NODE_ENV=production
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=https://your-app.railway.app/api/auth/callback
FRONTEND_URL=https://your-app.railway.app
```

## 🧪 Test Shift Example

```
Thursday 01/Jan/2026
STRATH VILLAGE VIC
Start 7:30 AM Thursday 01/Jan/2026
Finish 3:30 PM Thursday 01/Jan/2026
Break time 11:30 AM - 12:00 PM
7:30hrs +0:30hrs Break
DT2:DT Intermediate - OTC
```

## 🔧 Troubleshooting Commands

```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check for errors
npm run build

# View backend logs
npm run server

# Check port usage (Windows)
netstat -ano | findstr :5000
netstat -ano | findstr :3000
```

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| README.md | Main documentation |
| RAILWAY_DEPLOYMENT.md | Deploy to Railway |
| LOCAL_TESTING.md | Test locally |
| PROJECT_SUMMARY.md | Complete overview |
| GIT_SETUP.md | Git and GitHub setup |
| SETUP_CHECKLIST.md | Quick checklist |

## 🌐 Important URLs

### Development
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API Status: http://localhost:5000/api/auth/status

### Production
- App: https://your-app.railway.app
- Railway Dashboard: https://railway.app/dashboard
- Google Console: https://console.cloud.google.com

## ⚡ Quick Start Steps

1. **Set up Google Calendar API**
   - Create project in Google Cloud Console
   - Enable Calendar API
   - Create OAuth credentials

2. **Configure .env file**
   - Copy your Google credentials
   - Set local URLs

3. **Install & Run**
   ```bash
   npm run install-all
   npm run dev
   ```

4. **Test**
   - Open http://localhost:3000
   - Login with Google
   - Paste shift schedule
   - Create event

5. **Deploy**
   - Push to GitHub
   - Create Railway project
   - Add environment variables
   - Deploy!

## 🎯 Common Tasks

### Add a new email to saved list
1. Open app
2. Go to email section
3. Type email
4. Click "Add Email"
5. Email saved in localStorage

### Change event title
Edit: `backend/utils/parser.js`
Find: `summary: 'Sam - Work'`

### Change time zone
Edit: `backend/utils/googleClient.js`
Find: `timeZone: 'Australia/Melbourne'`

### Update after code changes
```bash
git add .
git commit -m "Description"
git push
# Railway auto-deploys
```

## 🐛 Debug Checklist

- [ ] Google Calendar API enabled?
- [ ] OAuth credentials correct?
- [ ] Redirect URI matches exactly?
- [ ] Environment variables set?
- [ ] Ports 3000 and 5000 available?
- [ ] Dependencies installed?
- [ ] Logged in to correct Google account?
- [ ] Test user added in Google Console?

## 📞 Quick Links

- Railway Docs: https://docs.railway.app
- Google Calendar API: https://developers.google.com/calendar/api
- React Docs: https://react.dev
- Express Docs: https://expressjs.com

---

**Keep this file handy for quick reference!** 🚀
