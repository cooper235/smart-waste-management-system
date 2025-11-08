# 🎯 DEPLOYMENT QUICK REFERENCE CARD

## ✅ YES! URLs Stay Forever - Update Anytime!

```
┌─────────────────────────────────────────────────────────┐
│  Frontend: https://your-app.vercel.app    ← PERMANENT   │
│  Backend:  https://your-api.onrender.com  ← PERMANENT   │
│                                                          │
│  Push to GitHub → Auto-deploys → Same URLs! ✨          │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Deploy in 3 Steps

### 1️⃣ Deploy Backend (Render.com)
```
→ Sign up with GitHub
→ New Web Service → Connect repo
→ Root: waste-segregator-backend
→ Add environment variables (from .env)
→ Deploy → Copy URL
```

### 2️⃣ Deploy Frontend (Vercel.com)
```
→ Sign up with GitHub
→ Import repo
→ Root: frontend
→ Add: REACT_APP_API_URL = backend-url
→ Deploy → Copy URL
```

### 3️⃣ Update CORS
```
→ Render → Environment → FRONTEND_URL = frontend-url
→ Save → Auto-redeploys
```

---

## 🔄 How to Update (After First Deploy)

```bash
# Make changes to your code
git add .
git commit -m "Updated X"
git push

# That's it! Auto-deploys to same URLs ✅
```

---

## 📋 Environment Variables to Add

### Backend (Render):
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://divyansh4078233:Mayanegi@cluster0.spb1r.mongodb.net/
JWT_SECRET=negiNegi336911#4$1as
JWT_ACCESS_SECRET=3pFZ9K7rUwD1sLqE8yJbV0nGxHtQzRcM2aNdWfXiP4oT
JWT_REFRESH_SECRET=X1uQ9mWzV0rK5nF8bJcE7tH2yL6pS3gT4oAqN9vR5dUjY
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
IOT_API_KEY=test-api-key-123
CLOUDINARY_CLOUD_NAME=deqzetctp
CLOUDINARY_API_KEY=251755738777254
CLOUDINARY_API_SECRET=he5zK0UWxWNA2sCQr1J0RK5P3pM
ADMIN_EMAIL_1=b24122@students.iitmandi.ac.in
ADMIN_PASSWORD_1=gadhaa1136@gmail.com
ADMIN_EMAIL_2=b24489@students.iitmandi.ac.in
ADMIN_PASSWORD_2=gadhii436@gmail.com
FRONTEND_URL=<will-update-after-frontend-deploy>
```

### Frontend (Vercel):
```
REACT_APP_API_URL=<your-backend-url-from-render>
```

---

## ⚡ Platform Comparison

| Feature | Vercel (Frontend) | Render (Backend) | Railway (Backend Alt) |
|---------|-------------------|------------------|----------------------|
| **Free Tier** | 100GB/month | 750 hrs/month | $5 credit/month |
| **Sleeping** | Never | After 15 min | Never (paid) |
| **Speed** | Instant | Wakes in 30s | Fast |
| **Best For** | React/Next.js | Node.js APIs | Node.js APIs |
| **Auto-deploy** | ✅ | ✅ | ✅ |
| **HTTPS** | ✅ Free | ✅ Free | ✅ Free |

---

## 💡 Quick Fixes

| Problem | Solution |
|---------|----------|
| Frontend can't connect to backend | Check `REACT_APP_API_URL` in Vercel, redeploy frontend |
| CORS error | Update `FRONTEND_URL` in Render backend env vars |
| Backend slow first time | Normal! Render free tier sleeps, wakes in 30s |
| MongoDB connection error | Check Network Access allows 0.0.0.0/0 in MongoDB Atlas |
| Build failed | Check logs in Render/Vercel dashboard |

---

## 📱 Mobile Quick Deploy

**On Phone:**
1. Download GitHub mobile app
2. Push code from phone
3. Auto-deploys! ✨

---

## 🎯 Your Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] CORS updated in backend
- [ ] Tested live app
- [ ] Saved URLs somewhere safe

---

## 🔗 Important Links

- **Render**: https://render.com
- **Vercel**: https://vercel.com  
- **Railway**: https://railway.app (alternative)
- **MongoDB**: https://mongodb.com/cloud/atlas

---

## 📚 Full Guides in Your Project

- `PERMANENT_HOSTING_GUIDE.md` - Complete step-by-step
- `PRE_DEPLOYMENT_CHECKLIST.md` - Pre-flight checklist
- `DEPLOYMENT_STEPS.md` - Detailed instructions

---

**Questions?** Check the full guides or deployment logs! 🚀
