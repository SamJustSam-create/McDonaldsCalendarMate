# Git Setup and GitHub Push Guide

## Initial Git Setup

### 1. Initialize Git Repository

```bash
git init
```

### 2. Add All Files

```bash
git add .
```

### 3. Create Initial Commit

```bash
git commit -m "Initial commit: CalendarMate - Work shift calendar automation"
```

## Push to GitHub

### 1. Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `CalendarMate`
3. Description: "Automatically create Google Calendar events from work shift schedules"
4. Make it **Private** or **Public** (your choice)
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### 2. Add GitHub Remote

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/CalendarMate.git
```

### 3. Rename Branch to Main

```bash
git branch -M main
```

### 4. Push to GitHub

```bash
git push -u origin main
```

## Verify Everything is Pushed

Check your GitHub repository page. You should see:

- ✅ backend/ directory
- ✅ frontend/ directory
- ✅ All documentation files (README.md, etc.)
- ✅ package.json files
- ✅ .gitignore
- ❌ .env file (should NOT be there - it's gitignored)
- ❌ node_modules/ (should NOT be there - it's gitignored)

## Future Updates

When you make changes:

```bash
# Check what changed
git status

# Add all changes
git add .

# Commit with a message
git commit -m "Description of your changes"

# Push to GitHub
git push
```

## Useful Git Commands

```bash
# Check current status
git status

# See commit history
git log --oneline

# See what files are tracked
git ls-files

# See what's ignored
git status --ignored

# Undo uncommitted changes
git checkout -- .

# View remote URL
git remote -v
```

## Troubleshooting

### "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/CalendarMate.git
```

### ".env file appeared in git"
Make sure it's in .gitignore, then:
```bash
git rm --cached .env
git commit -m "Remove .env from git"
git push
```

### Large files error
Make sure node_modules is gitignored:
```bash
git rm -r --cached node_modules
git commit -m "Remove node_modules"
git push
```

## Ready for Railway

Once your code is on GitHub:
1. Go to Railway
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your CalendarMate repository
5. Follow RAILWAY_DEPLOYMENT.md for the rest

---

**Your code is now safely backed up on GitHub and ready for deployment!**
