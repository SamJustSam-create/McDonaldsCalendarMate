# Railway Deployment Guide for CalendarMate

This guide will walk you through deploying CalendarMate to Railway using your GitHub repository.

## Prerequisites

- Railway account (https://railway.app)
- GitHub account with this repository pushed
- Google Cloud Console project with OAuth 2.0 credentials

## Part 1: Setting Up Google Calendar API

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name it "CalendarMate" and click "Create"

### 2. Enable Google Calendar API

1. In your project, go to **APIs & Services** → **Library**
2. Search for "Google Calendar API"
3. Click on it and press **Enable**

### 3. Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. Select **External** user type, click **Create**
3. Fill in the required fields:
   - **App name**: CalendarMate
   - **User support email**: Your email
   - **Developer contact email**: Your email
4. Click **Save and Continue**
5. On the **Scopes** page, click **Add or Remove Scopes**
6. Add these scopes:
   - `https://www.googleapis.com/auth/calendar`
   - `https://www.googleapis.com/auth/calendar.events`
7. Click **Update** → **Save and Continue**
8. On **Test users**, add your email address
9. Click **Save and Continue**

### 4. Create OAuth 2.0 Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. Choose **Web application**
4. Name it "CalendarMate Web Client"
5. Under **Authorized redirect URIs**, add:
   - `http://localhost:5000/api/auth/callback` (for local testing)
   - `https://your-app-name.up.railway.app/api/auth/callback` (Railway URL - you'll update this later)
6. Click **Create**
7. **IMPORTANT**: Copy the **Client ID** and **Client Secret** - you'll need these!

## Part 2: Push Code to GitHub

1. Initialize git in your project (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - CalendarMate"
   ```

2. Create a new repository on GitHub (don't initialize with README)

3. Add the remote and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/CalendarMate.git
   git branch -M main
   git push -u origin main
   ```

## Part 3: Deploy to Railway

### 1. Create New Railway Project

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **New Project**
3. Select **Deploy from GitHub repo**
4. Authenticate with GitHub if needed
5. Select your **CalendarMate** repository

### 2. Configure Build Settings

Railway should auto-detect your project. If it doesn't:

1. Click on your project
2. Go to **Settings** → **Build**
3. Set **Build Command**: `npm run install-all && npm run build`
4. Set **Start Command**: `npm start`
5. Click **Save**

### 3. Add Environment Variables

1. In your Railway project, click on **Variables**
2. Click **New Variable** and add each of the following:

```
PORT=5000
NODE_ENV=production
GOOGLE_CLIENT_ID=<your_google_client_id_from_step_1>
GOOGLE_CLIENT_SECRET=<your_google_client_secret_from_step_1>
GOOGLE_REDIRECT_URI=https://<your-railway-domain>.up.railway.app/api/auth/callback
FRONTEND_URL=https://<your-railway-domain>.up.railway.app
```

**Note**: Replace `<your-railway-domain>` with your actual Railway domain (found in Settings → Domains)

### 4. Get Your Railway Domain

1. Click on **Settings** → **Domains**
2. Railway will auto-generate a domain like `your-app-name.up.railway.app`
3. Copy this domain

### 5. Update Google OAuth Redirect URI

1. Go back to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID
4. Under **Authorized redirect URIs**, update the Railway URL:
   - `https://your-actual-railway-domain.up.railway.app/api/auth/callback`
5. Click **Save**

### 6. Update Environment Variables in Railway

1. Go back to Railway → **Variables**
2. Update the following variables with your actual Railway domain:
   - `GOOGLE_REDIRECT_URI=https://your-actual-railway-domain.up.railway.app/api/auth/callback`
   - `FRONTEND_URL=https://your-actual-railway-domain.up.railway.app`
3. Click **Save**

### 7. Trigger Deployment

Railway should auto-deploy. If not:
1. Click **Deployments**
2. Click **Deploy** or **Redeploy**

## Part 4: Test Your Deployment

1. Wait for the deployment to complete (check the **Deployments** tab)
2. Once deployed, click on your Railway domain URL
3. You should see the CalendarMate login page
4. Click **Login with Google**
5. Authenticate with your Google account
6. Test creating a calendar event

## Troubleshooting

### "Redirect URI mismatch" error
- Make sure the redirect URI in Google Cloud Console **exactly** matches your Railway domain
- Ensure there are no trailing slashes
- Wait a few minutes after updating Google credentials for changes to propagate

### "Failed to fetch calendars"
- Check that you've enabled the Google Calendar API in Google Cloud Console
- Verify the API scopes are correctly set in the OAuth consent screen

### Build fails
- Check the **Deploy Logs** in Railway for specific errors
- Ensure all dependencies are listed in package.json
- Verify the build and start commands are correct

### Application crashes
- Check the **Logs** tab in Railway
- Verify all environment variables are set correctly
- Ensure `NODE_ENV` is set to `production`

## Updating Your Application

To update your deployed app:

1. Make changes to your code locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
3. Railway will automatically detect the push and redeploy

## Custom Domain (Optional)

To use a custom domain:

1. Go to Railway → **Settings** → **Domains**
2. Click **Custom Domain**
3. Enter your domain name
4. Follow the DNS configuration instructions
5. Update the `GOOGLE_REDIRECT_URI` and `FRONTEND_URL` environment variables
6. Update the authorized redirect URI in Google Cloud Console

## Security Notes

- Never commit `.env` files to GitHub
- Keep your Google Client Secret private
- For production use with multiple users, implement proper token storage (database)
- Consider implementing session management for better security
- Regularly rotate your OAuth credentials

## Cost

Railway offers:
- **Hobby Plan**: $5/month with $5 included usage credit
- Your app should easily run within the free credit allocation

## Support

If you encounter issues:
1. Check Railway logs for errors
2. Verify Google Cloud Console settings
3. Ensure all environment variables are correct
4. Review the troubleshooting section above

---

**Your app is now live! 🎉**

Access it at: `https://your-railway-domain.up.railway.app`
