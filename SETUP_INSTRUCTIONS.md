# Complete Setup & Testing Instructions

## Quick Start (5 minutes)

### 1. Backend Setup

\`\`\`bash
cd waste-segregator-backend
cp .env.example .env
npm install
npm run dev
\`\`\`

Backend runs on: `http://localhost:5000`

### 2. Frontend Setup

\`\`\`bash
cd frontend
npm install
npm start
\`\`\`

Frontend runs on: `http://localhost:3000`

### 3. Access the Application

- **Main Dashboard**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login
- **Admin Credentials**:
  - Email: `b24122@students.iitmandi.ac.in`
  - Password: `gadhaa1136@gmail.com`

---

## Detailed Setup Guide

### Prerequisites

- Node.js v16+ (download from nodejs.org)
- MongoDB (local or MongoDB Atlas cloud)
- Git
- Code editor (VS Code recommended)

### Step 1: Clone Repository

\`\`\`bash
git clone <repository-url>
cd waste-segregator
\`\`\`

### Step 2: Backend Configuration

#### 2.1 Install Dependencies

\`\`\`bash
cd waste-segregator-backend
npm install
\`\`\`

#### 2.2 Create Environment File

\`\`\`bash
cp .env.example .env
\`\`\`

#### 2.3 Edit `.env` File

Open `.env` and configure:

\`\`\`env
# Server
NODE_ENV=development
PORT=5000

# Database - Use local MongoDB or MongoDB Atlas
MONGODB_URI=mongodb://localhost:27017/waste-segregator
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/waste-segregator

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# JWT Secrets (generate random strings)
JWT_ACCESS_SECRET=your_random_secret_key_min_32_chars_long_here
JWT_REFRESH_SECRET=another_random_secret_key_min_32_chars_long_here
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# IoT API Key
IOT_API_KEY=test-api-key-123

# Admin Credentials (Development Only)
ADMIN_EMAIL_1=b24122@students.iitmandi.ac.in
ADMIN_PASSWORD_1=gadhaa1136@gmail.com
ADMIN_EMAIL_2=b24489@students.iitmandi.ac.in
ADMIN_PASSWORD_2=gadhii436@gmail.com

# Cloudinary (optional, for image uploads)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
\`\`\`

#### 2.4 Start MongoDB

**Option A: Local MongoDB**

\`\`\`bash
# macOS with Homebrew
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# Start MongoDB from Services or run: mongod
\`\`\`

**Option B: MongoDB Atlas (Cloud)**

1. Go to mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `MONGODB_URI` in `.env`

#### 2.5 Start Backend Server

\`\`\`bash
npm run dev
\`\`\`

You should see:
\`\`\`
Server running on port 5000 in development mode
\`\`\`

### Step 3: Frontend Configuration

#### 3.1 Install Dependencies

\`\`\`bash
cd ../frontend
npm install
\`\`\`

#### 3.2 Start Frontend Server

\`\`\`bash
npm start
\`\`\`

Browser will open automatically to `http://localhost:3000`

---

## Testing the Application

### Test 1: Main Dashboard

1. Open http://localhost:3000
2. Verify you see:
   - Live Bin Status cards
   - Live Camera Feed
   - Time-Series Charts
   - Anomaly Alerts

**Expected**: All sections load without errors

### Test 2: Admin Login

1. Navigate to http://localhost:3000/admin/login
2. Enter credentials:
   \`\`\`
   Email: b24122@students.iitmandi.ac.in
   Password: gadhaa1136@gmail.com
   \`\`\`
3. Click "Login"

**Expected**: Redirected to admin dashboard

### Test 3: Upload Image

1. On admin dashboard, click "Select Image"
2. Choose an image file (PNG, JPG, GIF)
3. Click "Upload"

**Expected**: 
- Success message appears
- Image appears in gallery below

### Test 4: Update Camera Feed

1. Enter a camera feed URL (or image URL)
2. Click "Update Camera Feed"

**Expected**: 
- Success message appears
- Camera feed updates on main dashboard

### Test 5: API Testing

#### Test Health Check

\`\`\`bash
curl http://localhost:5000/api/health
\`\`\`

**Expected Response**:
\`\`\`json
{
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
\`\`\`

#### Test Get Bins

\`\`\`bash
curl http://localhost:5000/api/bins
\`\`\`

**Expected Response**: Array of bin objects

#### Test Admin Login API

\`\`\`bash
curl -X POST http://localhost:5000/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "b24122@students.iitmandi.ac.in",
    "password": "gadhaa1136@gmail.com"
  }'
\`\`\`

**Expected Response**:
\`\`\`json
{
  "success": true,
  "message": "Admin login successful",
  "data": {
    "accessToken": "eyJhbGc...",
    "admin": {
      "email": "b24122@students.iitmandi.ac.in",
      "role": "admin"
    }
  }
}
\`\`\`

---

## Troubleshooting

### Issue: Backend won't start

**Solution**:
1. Check MongoDB is running: `mongod --version`
2. Verify `.env` file exists
3. Check port 5000 is free: `lsof -i :5000`
4. Clear node_modules: `rm -rf node_modules && npm install`

### Issue: Frontend won't start

**Solution**:
1. Check port 3000 is free: `lsof -i :3000`
2. Clear cache: `npm cache clean --force`
3. Reinstall: `rm -rf node_modules && npm install`

### Issue: CORS errors

**Solution**:
1. Ensure backend `.env` has: `FRONTEND_URL=http://localhost:3000`
2. Restart backend server
3. Clear browser cache

### Issue: Database connection error

**Solution**:
1. Verify MongoDB is running
2. Check `MONGODB_URI` in `.env`
3. For MongoDB Atlas, whitelist your IP address

### Issue: Admin login fails

**Solution**:
1. Verify credentials in `.env`:
   - `ADMIN_EMAIL_1=b24122@students.iitmandi.ac.in`
   - `ADMIN_PASSWORD_1=gadhaa1136@gmail.com`
2. Restart backend server
3. Clear browser localStorage: DevTools → Application → Local Storage → Clear All

---

## Project Structure

\`\`\`
waste-segregator/
├── waste-segregator-backend/
│   ├── src/
│   │   ├── routes/           # API routes
│   │   ├── controllers/      # Business logic
│   │   ├── models/           # Database schemas
│   │   ├── middlewares/      # Auth, validation, etc.
│   │   ├── config/           # Configuration files
│   │   └── utils/            # Utility functions
│   ├── .env.example          # Environment template
│   ├── server.js             # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/            # Page components
│   │   ├── components/       # Reusable components
│   │   ├── hooks/            # Custom hooks
│   │   ├── App.js            # Main app component
│   │   └── index.js          # Entry point
│   ├── public/               # Static files
│   └── package.json
│
├── README.md                 # Project overview
├── SETUP_INSTRUCTIONS.md     # This file
├── TESTING.md                # Testing guide
└── DEPLOYMENT.md             # Deployment guide
\`\`\`

---

## Key Features

### Frontend Features
- Real-time bin status monitoring
- Live camera feed display
- Analytics dashboard with charts
- Admin panel for content management
- Responsive design (mobile, tablet, desktop)

### Backend Features
- RESTful API with Express.js
- MongoDB database integration
- JWT authentication
- Admin credential validation
- Image upload and management
- Analytics calculations
- IoT device API key authentication
- CORS security
- Rate limiting
- Error handling

### Admin Panel Features
- Secure login with hardcoded credentials (dev mode)
- Image upload functionality
- Camera feed URL management
- Image gallery with delete option
- Real-time updates to main dashboard

---

## API Endpoints Summary

### Authentication
- `POST /api/admin/auth/login` - Admin login

### Bins
- `GET /api/bins` - Get all bins
- `GET /api/bins/:id` - Get specific bin
- `POST /api/bins` - Create bin
- `PUT /api/bins/:id` - Update bin
- `DELETE /api/bins/:id` - Delete bin

### Images
- `POST /api/images/upload` - Upload image
- `GET /api/images` - Get all images
- `GET /api/images/:binId` - Get bin images
- `DELETE /api/images/:imageId` - Delete image

### Analytics
- `GET /api/analytics/dashboard/summary` - Dashboard summary
- `GET /api/analytics/waste-by-category` - Waste breakdown

### Health
- `GET /api/health` - Server health check

---

## Development Tips

### Hot Reload
- Backend: Changes auto-reload with nodemon
- Frontend: Changes auto-reload with React dev server

### Debugging
- Backend: Check console logs in terminal
- Frontend: Use browser DevTools (F12)
- Database: Use MongoDB Compass for visual inspection

### Code Organization
- Keep routes in `routes/` directory
- Keep business logic in `controllers/`
- Keep database models in `models/`
- Keep reusable components in `components/`

---

## Next Steps

1. **Customize Admin Credentials**: Update `.env` with your own credentials
2. **Configure Database**: Set up MongoDB Atlas for production
3. **Add More Features**: Extend API and frontend as needed
4. **Deploy**: Follow DEPLOYMENT.md for production setup
5. **Monitor**: Set up logging and monitoring

---

## Support & Resources

- **Backend Docs**: Express.js (expressjs.com)
- **Frontend Docs**: React (react.dev)
- **Database Docs**: MongoDB (mongodb.com/docs)
- **Styling**: Tailwind CSS (tailwindcss.com)
- **UI Components**: shadcn/ui (ui.shadcn.com)

---

## Security Reminders

⚠️ **Development Only**:
- Hardcoded admin credentials are for development
- JWT secrets should be strong random strings
- Never commit `.env` file to version control

✅ **Production**:
- Use environment variables from secure vaults
- Implement proper user management
- Use HTTPS/SSL
- Enable database authentication
- Set up rate limiting
- Configure CORS properly
- Use strong JWT secrets

---

## Quick Reference

| Task | Command |
|------|---------|
| Start backend | `cd waste-segregator-backend && npm run dev` |
| Start frontend | `cd frontend && npm start` |
| Run tests | `npm test` |
| Build frontend | `cd frontend && npm run build` |
| Check health | `curl http://localhost:5000/api/health` |
| View logs | Check terminal where server is running |

---

**Last Updated**: January 2024
**Version**: 1.0.0
