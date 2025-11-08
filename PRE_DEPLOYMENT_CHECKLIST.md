# PRE-DEPLOYMENT CHECKLIST

## ✅ Before You Deploy - Complete This:

### 1️⃣ GitHub Repository Setup
- [ ] Create a GitHub repository (if not already done)
- [ ] Push your code to GitHub
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git remote add origin https://github.com/yourusername/yourrepo.git
  git push -u origin main
  ```

### 2️⃣ MongoDB Setup (Already Done ✅)
- [x] MongoDB Atlas connection string in `.env`
- [x] Database accessible from anywhere (check MongoDB Network Access)

### 3️⃣ Backend Deployment (Choose One)

#### Option A: Render (Recommended - Easier)
1. Go to https://render.com
2. Sign up with GitHub
3. New → Web Service
4. Connect repository
5. Settings:
   - **Root Directory**: `waste-segregator-backend`
   - **Build**: `npm install`
   - **Start**: `npm start`
6. Add all environment variables from your `.env` file
7. Deploy → Get backend URL

#### Option B: Railway (Alternative)
1. Go to https://railway.app
2. Sign up with GitHub
3. New Project → Deploy from GitHub
4. Select your repo
5. Set root directory and environment variables
6. Deploy → Get backend URL

### 4️⃣ Frontend Deployment (Vercel)
1. Go to https://vercel.com
2. Sign up with GitHub
3. Import your repository
4. Settings:
   - **Root Directory**: `frontend`
   - **Framework**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. Add environment variable:
   - `REACT_APP_API_URL` = `your-backend-url-from-step-3`
6. Deploy → Get frontend URL

### 5️⃣ Final Configuration
- [ ] Update backend `FRONTEND_URL` env variable with your Vercel URL
- [ ] Redeploy backend (automatic in Render/Railway)
- [ ] Test the live application

---

## 🔗 Your Final URLs

After deployment, fill in:

- **Frontend**: `https://_________________.vercel.app`
- **Backend**: `https://_________________.onrender.com` or `.railway.app`
- **Database**: Already on MongoDB Atlas ✅

---

## 🚀 One-Command Deployments

### Using Vercel CLI (Backend Alternative)
```bash
cd waste-segregator-backend
npm i -g vercel
vercel
```

### Using Vercel CLI (Frontend)
```bash
cd frontend
vercel
```

---

## 🎯 After Deployment

1. **Test Authentication**: Try logging in with admin credentials
2. **Test IoT API**: Send test data from IoT devices
3. **Check CORS**: Ensure frontend can communicate with backend
4. **Monitor Logs**: Check Render/Vercel dashboards for errors

---

## 🔄 Future Updates

Once deployed, any push to GitHub will auto-deploy:

```bash
# Make your changes
git add .
git commit -m "Updated feature"
git push
```

**Same URLs, new code automatically!** ✨

---

## ⚠️ Important Notes

1. **Free Tier**: Render sleeps after 15 min inactivity (first request takes ~30s)
2. **Environment Variables**: Never commit `.env` files to GitHub
3. **CORS**: Make sure backend `FRONTEND_URL` matches Vercel URL exactly
4. **MongoDB**: Ensure IP whitelist allows connections (0.0.0.0/0 for all)

---

## 💡 Quick Fixes

**Backend not starting?**
- Check logs in Render dashboard
- Verify all env variables are set
- Check MongoDB connection string

**Frontend can't reach backend?**
- Verify `REACT_APP_API_URL` in Vercel
- Check CORS settings in backend
- Redeploy frontend after env changes

**CORS errors?**
- Update `FRONTEND_URL` in backend env
- Remove trailing slashes from URLs
- Wait for backend to redeploy

---

**Ready to deploy?** Follow the steps above! 🚀
