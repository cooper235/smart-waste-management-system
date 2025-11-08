# Smart Waste Management System - Complete Setup Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Environment Configuration](#environment-configuration)
5. [Running the Application](#running-the-application)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** (optional) - [Download](https://git-scm.com/)

### Verify Installation
\`\`\`bash
node --version
npm --version
mongod --version
\`\`\`

---

## Backend Setup

### Step 1: Navigate to Backend Directory
\`\`\`bash
cd waste-segregator-backend
\`\`\`

### Step 2: Install Dependencies
\`\`\`bash
npm install
\`\`\`

### Step 3: Create Environment File
Copy `.env.example` to `.env` and update with your configuration:
\`\`\`bash
cp .env.example .env
\`\`\`

**Important:** Edit `.env` and set:
\`\`\`env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/waste-segregator
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=b24122@students.iitmandi.ac.in
ADMIN_PASSWORD=gadhaa1136@gmail.com
\`\`\`

### Step 4: Start MongoDB
\`\`\`bash
# On Windows
mongod

# On macOS/Linux
brew services start mongodb-community
# or
mongod
\`\`\`

### Step 5: Start Backend Server
\`\`\`bash
npm run dev
\`\`\`

You should see:
\`\`\`
Server is running on port 5000
Connected to MongoDB
\`\`\`

---

## Frontend Setup

### Step 1: Navigate to Frontend Directory
\`\`\`bash
cd frontend
\`\`\`

### Step 2: Install Dependencies
\`\`\`bash
npm install
\`\`\`

### Step 3: Create Environment File
Copy `.env.example` to `.env`:
\`\`\`bash
cp .env.example .env
\`\`\`

**Important:** Ensure `.env` contains:
\`\`\`env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ADMIN_EMAIL=b24122@students.iitmandi.ac.in
REACT_APP_ADMIN_PASSWORD=gadhaa1136@gmail.com
\`\`\`

### Step 4: Start Frontend Development Server
\`\`\`bash
npm start
\`\`\`

The app will open at `http://localhost:3000`

---

## Environment Configuration

### Backend `.env` File
\`\`\`env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/waste-segregator

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:3000

# Cloudinary (Optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin
ADMIN_EMAIL=b24122@students.iitmandi.ac.in
ADMIN_PASSWORD=gadhaa1136@gmail.com
\`\`\`

### Frontend `.env` File
\`\`\`env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ADMIN_EMAIL=b24122@students.iitmandi.ac.in
REACT_APP_ADMIN_PASSWORD=gadhaa1136@gmail.com
\`\`\`

---

## Running the Application

### Terminal 1: Start MongoDB
\`\`\`bash
mongod
\`\`\`

### Terminal 2: Start Backend
\`\`\`bash
cd waste-segregator-backend
npm run dev
\`\`\`

### Terminal 3: Start Frontend
\`\`\`bash
cd frontend
npm start
\`\`\`

### Access the Application
- **User Dashboard**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **Backend API**: http://localhost:5000/api

---

## Testing

### Admin Login Credentials
- **Email**: `b24122@students.iitmandi.ac.in`
- **Password**: `gadhaa1136@gmail.com`

### Test Scenarios

#### 1. User Dashboard
1. Navigate to http://localhost:3000
2. View current bin status with images
3. Check user feedback section
4. Verify "For You" cards display correctly

#### 2. Admin Login
1. Navigate to http://localhost:3000/admin/login
2. Enter admin credentials
3. Click "Login"
4. Should redirect to admin dashboard

#### 3. Admin Dashboard Features

**Image Upload:**
1. Click "Select Image" button
2. Choose an image file (PNG, JPG, GIF - max 5MB)
3. Verify success message
4. Check image appears in gallery

**Camera Feed:**
1. Enter a camera feed URL
2. Click "Update Camera Feed"
3. Verify success message

**Pending Actions:**
1. Click "+ Add Action" button
2. Fill in title, description, due date, priority
3. Click "Add"
4. Verify action appears in list
5. Click trash icon to delete

**Date Selection:**
1. Select a date from calendar
2. View waste data for that date
3. Check pending actions for that date

**Recent Feedback:**
1. View user feedback submissions
2. Click trash icon to delete feedback

**Team Management:**
1. View team members
2. See member names, roles, and emails

#### 4. API Testing

**Health Check:**
\`\`\`bash
curl http://localhost:5000/api/health
\`\`\`

**Get Pending Actions:**
\`\`\`bash
curl http://localhost:5000/api/pending-actions
\`\`\`

**Get Team Members:**
\`\`\`bash
curl http://localhost:5000/api/team
\`\`\`

**Get Feedback:**
\`\`\`bash
curl http://localhost:5000/api/feedback
\`\`\`

---

## Troubleshooting

### Issue: "Cannot connect to MongoDB"
**Solution:**
- Ensure MongoDB is running: `mongod`
- Check MONGO_URI in `.env` is correct
- Verify MongoDB is installed: `mongod --version`

### Issue: "JWT_SECRET must have a value"
**Solution:**
- Ensure `.env` file exists in backend directory
- Verify JWT_SECRET is set in `.env`
- Restart backend server after updating `.env`

### Issue: "CORS policy: This origin is not allowed"
**Solution:**
- Check FRONTEND_URL in backend `.env` matches your frontend URL
- Ensure frontend is running on http://localhost:3000
- Restart backend server

### Issue: "Port 5000 already in use"
**Solution:**
\`\`\`bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=5001 npm run dev
\`\`\`

### Issue: "Port 3000 already in use"
**Solution:**
\`\`\`bash
# Use a different port
PORT=3001 npm start
\`\`\`

### Issue: "Image upload fails with 'binId is required'"
**Solution:**
- The system now uses a default binId
- Ensure backend is running
- Check network tab in browser DevTools for error details

### Issue: "Cannot find module" errors
**Solution:**
\`\`\`bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
\`\`\`

---

## API Endpoints

### Authentication
- `POST /api/admin/auth/login` - Admin login

### Pending Actions
- `GET /api/pending-actions` - Get all actions
- `GET /api/pending-actions/date/:date` - Get actions by date
- `POST /api/pending-actions` - Create action
- `PATCH /api/pending-actions/:actionId` - Update action
- `DELETE /api/pending-actions/:actionId` - Delete action

### Team Management
- `GET /api/team` - Get all team members
- `POST /api/team` - Create team member
- `PATCH /api/team/:memberId` - Update team member
- `DELETE /api/team/:memberId` - Delete team member
- `POST /api/team/:memberId/upload-image` - Upload team member image

### Waste Data
- `GET /api/waste-data/date/:date` - Get waste data by date
- `POST /api/waste-data` - Create waste data
- `GET /api/waste-data/stats/:date` - Get waste statistics

### Feedback
- `GET /api/feedback` - Get all feedback
- `POST /api/feedback` - Submit feedback
- `DELETE /api/feedback/:feedbackId` - Delete feedback

### Images
- `POST /api/images/upload` - Upload image
- `GET /api/images/:binId` - Get bin images
- `DELETE /api/images/:imageId` - Delete image

---

## Production Deployment

### Before Deploying:
1. Change `JWT_SECRET` to a strong random string
2. Set `NODE_ENV=production`
3. Update `FRONTEND_URL` to your production domain
4. Set up a production MongoDB instance
5. Configure Cloudinary for image uploads
6. Update CORS origins

### Deployment Platforms:
- **Backend**: Vercel, Heroku, Railway, Render
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Database**: MongoDB Atlas, AWS, Azure

---

## Support

For issues or questions:
1. Check the Troubleshooting section
2. Review API endpoint documentation
3. Check browser console for errors
4. Check backend logs for server errors

---

**Last Updated**: October 2025
**Version**: 1.0.0
