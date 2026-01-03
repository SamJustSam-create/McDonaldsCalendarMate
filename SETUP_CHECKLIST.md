# CalendarMate - Quick Setup Checklist

## ✅ Before Deployment

- [ ] Create Google Cloud Project
- [ ] Enable Google Calendar API
- [ ] Configure OAuth Consent Screen
- [ ] Create OAuth 2.0 Client ID & Secret
- [ ] Note down Client ID and Client Secret
- [ ] Create GitHub repository
- [ ] Push code to GitHub

## ✅ Railway Setup

- [ ] Create Railway account
- [ ] Create new project from GitHub repo
- [ ] Note Railway domain URL
- [ ] Add environment variables:
  - [ ] PORT=5000
  - [ ] NODE_ENV=production
  - [ ] GOOGLE_CLIENT_ID
  - [ ] GOOGLE_CLIENT_SECRET
  - [ ] GOOGLE_REDIRECT_URI (with Railway domain)
  - [ ] FRONTEND_URL (with Railway domain)

## ✅ Google OAuth Update

- [ ] Add Railway callback URL to Google Console
- [ ] Verify redirect URI matches exactly
- [ ] Test OAuth flow

## ✅ Testing

- [ ] App loads without errors
- [ ] Login with Google works
- [ ] Can fetch calendars
- [ ] Can parse shift schedule
- [ ] Can create calendar event
- [ ] Event appears in Google Calendar
- [ ] Email guests feature works
- [ ] Event shows as "Free" not "Busy"

## 🎉 Done!

Your CalendarMate app is ready to use!
