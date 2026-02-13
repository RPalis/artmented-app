# Artmented App - Deployment Checklist

## ✅ Pre-Deployment Checklist

- [x] Backend structure organized (`backend/` folder)
- [x] Frontend structure organized (`frontend/` folder)
- [x] Render Blueprint added (`render.yaml`)
- [x] Database schema ready (`backend/schema.sql`)

---

## Option A: One-Click Deploy with Blueprint (Recommended)

1. **Push your code** (if not already pushed):
   ```bash
   cd /Users/raquelsantospalis/Documents/artmented-app
   git push origin main
   ```

2. **In Render Dashboard**:
   - Go to [dashboard.render.com](https://dashboard.render.com)
   - Click **New +** → **Blueprint**
   - Connect the repo **RPalis/artmented-app** (or paste `https://github.com/RPalis/artmented-app`)
   - Render will read `render.yaml` and create:
     - **PostgreSQL** database: `artmented-db`
     - **Web Service** (backend): `artmented-backend`
     - **Static Site** (frontend): `artmented-frontend`
   - Click **Apply**

3. **Run the database schema** (once the database is live):
   - In Render Dashboard → **artmented-db** → **Connect** → **External Connection**
   - Use **psql** or the **Shell** tab; paste and run the contents of `backend/schema.sql`

4. **Done.** Frontend: `https://artmented-frontend.onrender.app` · Backend: `https://artmented-backend.onrender.com`

---

## Option B: Manual Setup (Step by Step)

## Step 1: Push to GitHub

**The latest changes are already committed.** You only need to push:

```bash
cd /Users/raquelsantospalis/Documents/artmented-app
git push origin main
```

**If you don't have a GitHub repo yet:**
1. Go to GitHub.com → Create new repository
2. Name it `artmented-app`
3. Don't initialize with README
4. Copy the commands GitHub shows you and run them

## Step 2: Setup PostgreSQL Database on Render

1. **Login to Render**: https://render.com
2. **Create Database**:
   - Click "New +" → "PostgreSQL"
   - Name: `artmented-db`
   - Database: `artmented_db`
   - User: `artmented_user`
   - Region: Choose closest to you
   - Instance Type: **Free**
   - Click "Create Database"

3. **Get Connection String**:
   - Wait ~2 minutes for provisioning
   - Scroll to "Connections" section
   - Copy the **External Database URL** (starts with `postgresql://`)
   - **SAVE THIS** - you'll need it!

4. **Run Schema**:
   - Click "Connect" → "psql Command"
   - Copy the command and run in terminal
   - Once connected, paste the contents of `backend/schema.sql`
   - Or use Render's Query tab if available

## Step 3: Deploy Backend

1. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect GitHub account if needed
   - Select `artmented-app` repository
   - Fill in:
     - **Name**: `artmented-backend`
     - **Region**: Same as database
     - **Branch**: `main`
     - **Root Directory**: `backend`
     - **Runtime**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Instance Type**: Free

2. **Add Environment Variables** (Click "Advanced" → "Add Environment Variable"):
   - `DATABASE_URL` = [Paste External Database URL from Step 2]
   - `NODE_ENV` = `production`
   - `PORT` = `3000`

3. **Deploy**:
   - Click "Create Web Service"
   - Wait 3-5 minutes for build
   - Check "Logs" tab for errors
   - Once deployed, you'll get a URL like: `https://artmented-backend.onrender.com`

4. **Test Backend**:
   - Open: `https://artmented-backend.onrender.com/health`
   - Should see: `{"status":"OK","message":"Server is running"}`
   - **Copy your backend URL** - you'll need it!

## Step 4: Setup Cloudinary (Optional but Recommended)

1. **Create Account**: https://cloudinary.com (free tier)
2. **Get Credentials**:
   - Cloud Name
   - API Key
   - API Secret
3. **Create Upload Presets**:
   - Settings → Upload → Upload presets
   - Create presets for: `artmented_models`, `artmented_images`, `artmented_markers`
4. **Upload 3D Models**:
   - Upload GLB/GLTF files
   - Copy URLs
   - Update database with Cloudinary URLs

## Step 5: Deploy Frontend

1. **Update Production Environment**:
   - Edit `frontend/.env.production`
   - Set `VITE_API_URL=https://your-backend-url.onrender.com/api`
   - Commit and push:
     ```bash
     git add frontend/.env.production
     git commit -m "Update production API URL"
     git push
     ```

2. **Create Static Site**:
   - Click "New +" → "Static Site"
   - Select `artmented-app` repository
   - Fill in:
     - **Name**: `artmented-frontend`
     - **Branch**: `main`
     - **Root Directory**: `frontend`
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `dist`

3. **Add Environment Variable**:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.onrender.com/api`

4. **Deploy**:
   - Click "Create Static Site"
   - Wait 3-5 minutes
   - Your app will be live at: `https://artmented-frontend.onrender.app`

## Step 6: Test Deployment

1. **Open Frontend**: `https://artmented-frontend.onrender.app`
2. **Test Flow**:
   - Should see splash screen
   - Should load artists
   - Click artist → see artworks
   - Click artwork → AR view (allow camera)

## Troubleshooting

### Backend Issues
- **"Cannot connect to database"**: Check DATABASE_URL in environment variables
- **"Service Unavailable"**: Free tier sleeps after 15 min - wait 30-60 seconds
- **CORS errors**: Verify frontend URL is in CORS origins in `backend/server.js`

### Frontend Issues
- **API calls failing**: Check `VITE_API_URL` environment variable
- **3D models not loading**: Verify Cloudinary URLs are correct and public
- **Camera not working**: Requires HTTPS (Render provides this automatically)

### Database Issues
- **Schema errors**: Make sure you ran `backend/schema.sql` completely
- **Connection errors**: Verify External Database URL is correct

## Quick Commands Reference

```bash
# Local Development
cd backend && npm run dev    # Start backend
cd frontend && npm run dev   # Start frontend

# Git Commands
git add .
git commit -m "Your message"
git push origin main

# Check Logs (on Render Dashboard)
# Go to service → Logs tab
```

## Your URLs (After Deployment)

- **Frontend**: `https://artmented-frontend.onrender.app`
- **Backend**: `https://artmented-backend.onrender.com`
- **Database**: [Connection string from Render dashboard]

---

**Need Help?**
- Render Docs: https://render.com/docs
- Check Render dashboard logs for detailed error messages
- Verify all environment variables are set correctly
