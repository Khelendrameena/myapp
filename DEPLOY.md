# Deployment Guide

## Vercel Deployment (Frontend)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Add Environment Variable:
   - `NEXT_PUBLIC_SOCKET_URL` = Your Socket.io server URL (from Railway/Render)
6. Click "Deploy"

## Socket.io Server Deployment (Railway/Render)

### Option 1: Railway (Recommended)
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add a new service → "Empty Service"
6. Upload `server.js` file
7. Set Environment Variables:
   - `PORT` = 3001 (or Railway's assigned port)
   - `CLIENT_URL` = Your Vercel app URL
8. Deploy

### Option 2: Render
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repo
5. Settings:
   - Build Command: (leave empty)
   - Start Command: `node server.js`
   - Environment: Node
6. Add Environment Variables:
   - `PORT` = 3001
   - `CLIENT_URL` = Your Vercel app URL
7. Deploy

### After Server Deployment:
1. Copy your server URL (e.g., `https://your-app.railway.app`)
2. Go back to Vercel
3. Update Environment Variable:
   - `NEXT_PUBLIC_SOCKET_URL` = Your server URL
4. Redeploy Vercel app

## Quick Deploy Commands

### Install Vercel CLI
```bash
npm i -g vercel
```

### Deploy to Vercel
```bash
vercel
```

### Production Deploy
```bash
vercel --prod
```

## Environment Variables Needed

### Vercel (Frontend):
- `NEXT_PUBLIC_SOCKET_URL` = Socket.io server URL

### Server (Railway/Render):
- `PORT` = Server port (usually auto-assigned)
- `CLIENT_URL` = Your Vercel frontend URL


