# Artmented App

AR-powered art gallery application built with React, Three.js, Express, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- PostgreSQL (local or Render)
- Git

### Local Development

1. **Install dependencies:**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

2. **Setup environment variables:**
   - Backend: Copy `backend/.env.example` to `backend/.env` and configure
   - Frontend: Copy `frontend/.env.example` to `frontend/.env` and configure

3. **Start development servers:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

4. **Access the app:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 📁 Project Structure

```
artmented-app/
├── backend/              # Express API server
│   ├── routes/          # API routes
│   ├── server.js        # Main server file
│   ├── database.js      # PostgreSQL connection
│   ├── schema.sql       # Database schema
│   └── package.json
├── frontend/            # React + Vite app
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── services/   # API service
│   │   └── contexts/    # React contexts
│   └── package.json
└── README.md
```

## 🗄️ Database Setup

1. Create PostgreSQL database (local or Render)
2. Run `backend/schema.sql` to create tables
3. Update `backend/.env` with your `DATABASE_URL`

## 📦 Deployment

See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for detailed Render deployment instructions.

### Quick Deploy Steps:
1. Push code to GitHub
2. Create PostgreSQL database on Render
3. Deploy backend as Web Service
4. Deploy frontend as Static Site
5. Configure environment variables

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Three.js, Framer Motion, Tailwind CSS
- **Backend**: Node.js, Express, PostgreSQL
- **Deployment**: Render (PostgreSQL + Web Service + Static Site)
- **Storage**: Cloudinary (for 3D models and images)

## 📝 Environment Variables

### Backend (`backend/.env`)
```
PORT=3000
DATABASE_URL=postgresql://localhost:5432/artmented_db
NODE_ENV=development
```

### Frontend (`frontend/.env`)
```
VITE_API_URL=http://localhost:3000/api
```

### Frontend Production (`frontend/.env.production`)
```
VITE_API_URL=https://your-backend.onrender.com/api
```

## 🧪 Testing

```bash
# Test backend health endpoint
curl http://localhost:3000/health

# Should return: {"status":"OK","message":"Server is running"}
```

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT_CHECKLIST.md)
- [Render Deployment Guide](../Downloads/artmented-render-deployment-guide%20(1).md)

## 🐛 Troubleshooting

### Backend won't start
- Check PostgreSQL is running
- Verify `DATABASE_URL` in `.env`
- Check port 3000 is available

### Frontend can't connect to API
- Verify backend is running
- Check `VITE_API_URL` in `.env`
- Check CORS settings in `backend/server.js`

### 3D models not loading
- Verify Cloudinary URLs are correct
- Check CORS settings on Cloudinary
- Ensure GLB/GLTF files are accessible

## 📄 License

ISC
