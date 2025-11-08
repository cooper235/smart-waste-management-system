# Quick Start Guide - Smart Waste Management System

## 🚀 Get Running in 5 Minutes

### Prerequisites
- Node.js v14+
- MongoDB running locally
- npm

### Step 1: Backend Setup (Terminal 1)
\`\`\`bash
cd waste-segregator-backend
cp .env.example .env
npm install
npm run dev
\`\`\`
✅ Backend running on http://localhost:5000

### Step 2: Frontend Setup (Terminal 2)
\`\`\`bash
cd frontend
cp .env.example .env
npm install
npm start
\`\`\`
✅ Frontend running on http://localhost:3000

### Step 3: Access the App
- **User Dashboard**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login

---

## 🔐 Admin Credentials
\`\`\`
Email: b24122@students.iitmandi.ac.in
Password: gadhaa1136@gmail.com
\`\`\`

---

## 📁 Project Structure

\`\`\`
waste-segregator-backend/
├── src/
│   ├── models/          # Database schemas
│   ├── controllers/     # Business logic
│   ├── routes/          # API endpoints
│   ├── middlewares/     # Auth, validation
│   └── config/          # Configuration
├── .env.example         # Environment template
└── server.js            # Entry point

frontend/
├── src/
│   ├── pages/           # Page components
│   ├── components/      # Reusable components
│   ├── config/          # API configuration
│   └── App.js           # Main app
├── .env.example         # Environment template
└── package.json         # Dependencies
\`\`\`

---

## 🎯 Key Features

### User Dashboard
- ✅ View bin status with images
- ✅ See user feedback
- ✅ Monitor waste collection

### Admin Panel
- ✅ Upload and manage images
- ✅ Update camera feed
- ✅ Add/remove pending actions
- ✅ View waste data by date
- ✅ Manage team members
- ✅ View and delete feedback
- ✅ Manage alerts

---

## 🔧 Environment Variables

### Backend `.env`
\`\`\`env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/waste-segregator
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=b24122@students.iitmandi.ac.in
ADMIN_PASSWORD=gadhaa1136@gmail.com
\`\`\`

### Frontend `.env`
\`\`\`env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ADMIN_EMAIL=b24122@students.iitmandi.ac.in
REACT_APP_ADMIN_PASSWORD=gadhaa1136@gmail.com
\`\`\`

---

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/auth/login` | Admin login |
| GET | `/api/pending-actions` | Get all actions |
| POST | `/api/pending-actions` | Create action |
| DELETE | `/api/pending-actions/:id` | Delete action |
| GET | `/api/team` | Get team members |
| POST | `/api/team` | Add team member |
| GET | `/api/waste-data/date/:date` | Get waste data |
| GET | `/api/feedback` | Get feedback |
| POST | `/api/feedback` | Submit feedback |
| POST | `/api/images/upload` | Upload image |

---

## ❌ Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Ensure `mongod` is running |
| JWT_SECRET error | Check `.env` file exists and has JWT_SECRET |
| CORS error | Verify FRONTEND_URL in backend `.env` |
| Port already in use | Kill process or use different port |
| Module not found | Run `npm install` again |

---

## 📝 Testing Checklist

- [ ] Backend starts without errors
- [ ] Frontend loads at localhost:3000
- [ ] Admin login works with provided credentials
- [ ] Can upload images in admin panel
- [ ] Can add pending actions
- [ ] Can view waste data by date
- [ ] Can see team members
- [ ] Can view user feedback
- [ ] Can delete actions/feedback
- [ ] All API endpoints respond correctly

---

## 🚀 Next Steps

1. **Customize Admin Credentials**: Update in backend `.env`
2. **Setup Cloudinary**: For production image uploads
3. **Configure MongoDB Atlas**: For cloud database
4. **Deploy**: Use Vercel, Heroku, or your preferred platform
5. **Add More Features**: Extend with additional functionality

---

## 📚 Documentation

- [Complete Setup Guide](./COMPLETE_SETUP_GUIDE.md)
- [API Testing Guide](./API_TESTING_GUIDE.md)
- [Setup Instructions](./SETUP_INSTRUCTIONS.md)

---

**Version**: 1.0.0  
**Last Updated**: October 2025
