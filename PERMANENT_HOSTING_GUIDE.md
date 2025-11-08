# 🌐 PERMANENT HOSTING GUIDE

## ✅ YES! Your URLs Will Stay Forever

Once you deploy to **Vercel** (frontend) and **Render/Railway** (backend), you get **permanent URLs** that never change!

### What You'll Get:
```
Frontend: https://your-app-name.vercel.app  ← This URL stays FOREVER
Backend:  https://your-backend.onrender.com  ← This URL stays FOREVER
```

### 🎯 The Magic Part:
- You can update your code ANYTIME
- Push changes to GitHub
- It automatically deploys to the SAME URLs
- No need to change anything!

---

## 🚀 QUICK START - Deploy in 15 Minutes

### Step 1: Push to GitHub (5 min)

```bash
# If you haven't already:
git init
git add .
git commit -m "Ready for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Deploy Backend to Render (5 min)

1. **Visit**: https://render.com
2. **Sign up** with GitHub (free)
3. Click **"New +"** → **"Web Service"**
4. **Connect your repository**
5. **Configure**:
   ```
   Name: waste-backend (or any name you like)
   Root Directory: waste-segregator-backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

6. **Add Environment Variables** (click "Advanced"):
   - Copy these from your current `.env` file:
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
   FRONTEND_URL=https://temporary-will-update-later.com
   ```

7. Click **"Create Web Service"**
8. **Wait 3-5 minutes** for deployment
9. **Copy your backend URL**: `https://waste-backend-xxxx.onrender.com`

### Step 3: Deploy Frontend to Vercel (5 min)

1. **Visit**: https://vercel.com
2. **Sign up** with GitHub (free)
3. Click **"Add New Project"** → **"Import"**
4. **Select your repository**
5. **Configure**:
   ```
   Framework Preset: Create React App
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: build
   ```

6. **Add Environment Variable**:
   - Click **"Environment Variables"** section
   - Name: `REACT_APP_API_URL`
   - Value: `https://your-backend-url.onrender.com` (from Step 2)
   - Click "Add"

7. Click **"Deploy"**
8. **Wait 2-3 minutes**
9. **Copy your frontend URL**: `https://your-app-name.vercel.app`

### Step 4: Update CORS (2 min)

1. Go back to **Render dashboard**
2. Open your **backend service**
3. Click **"Environment"** tab
4. Find `FRONTEND_URL` variable
5. Update it to your **Vercel URL** from Step 3
6. Click **"Save Changes"**
7. Backend will auto-redeploy (takes 2-3 min)

---

## ✨ DONE! Your App is Live!

**Frontend**: `https://your-app-name.vercel.app`
**Backend**: `https://your-backend-name.onrender.com`

### 🎉 Test Your App:
1. Open your frontend URL
2. Try logging in with admin credentials
3. Check if dashboard loads
4. Verify IoT data can be sent

---

## 🔄 How to Update Your Website

### The URLs NEVER Change!

```bash
# 1. Make changes to your code locally
# Edit any file you want...

# 2. Commit and push
git add .
git commit -m "Updated feature X"
git push

# 3. Automatic deployment happens!
# Vercel deploys frontend (2-3 min)
# Render deploys backend (3-5 min)

# 4. Same URLs, updated code! ✅
```

### That's it! No configuration needed after first setup.

---

## 🎯 Alternative: Railway for Backend

If you prefer **Railway** over Render:

1. **Visit**: https://railway.app
2. **Login** with GitHub
3. **"New Project"** → **"Deploy from GitHub repo"**
4. Select your repository
5. **"Add variables"** → Copy all environment variables
6. **Settings** → Set Root Directory: `/waste-segregator-backend`
7. Deploy → Get URL: `https://your-backend.up.railway.app`

**Pros of Railway**:
- Faster than Render
- Better free tier
- Doesn't sleep

**Pros of Render**:
- More generous free tier hours
- Better UI
- Easier to use

---

## 📊 What You Get (Free Tier)

### Vercel (Frontend):
- ✅ Unlimited projects
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domain support
- ✅ Instant deployments
- ✅ **No sleeping!**

### Render (Backend):
- ✅ 750 hours/month free
- ✅ Automatic HTTPS
- ✅ Custom domain support
- ⚠️ Sleeps after 15 min inactivity
- ⚠️ First request takes ~30s to wake

### Railway (Backend Alternative):
- ✅ $5 free credit/month
- ✅ Fast deployments
- ✅ **No sleeping on paid plan**
- ✅ Better performance

### MongoDB Atlas (Database):
- ✅ 512MB storage (enough for your app)
- ✅ Automatic backups
- ✅ **Already configured!** ✅

---

## 🔒 Security Best Practices

### Before Going Public:

1. **Change secrets** in production:
   ```bash
   # Generate new JWT secrets
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

2. **Update admin passwords** to strong ones

3. **Limit CORS** to only your frontend domain:
   ```javascript
   FRONTEND_URL=https://your-exact-vercel-url.vercel.app
   ```

4. **Enable MongoDB IP whitelist** (optional):
   - Go to MongoDB Atlas
   - Network Access → Add IP
   - Or keep 0.0.0.0/0 for anywhere access

---

## 💡 Common Issues & Fixes

### ❌ "Cannot connect to backend"
**Fix**: 
- Check `REACT_APP_API_URL` in Vercel env vars
- Redeploy frontend after changing env vars
- Verify backend is running (visit backend URL directly)

### ❌ "CORS policy error"
**Fix**:
- Update `FRONTEND_URL` in Render to match Vercel URL exactly
- No trailing slashes!
- Wait for backend to redeploy

### ❌ "Backend is slow to respond"
**Cause**: Render free tier sleeps after 15 min
**Fix**: 
- First request takes 30s to wake up (normal)
- Upgrade to paid tier ($7/month) for no sleeping
- Or use Railway instead

### ❌ "MongoDB connection failed"
**Fix**:
- Check MongoDB Atlas is running
- Verify `MONGODB_URI` is correct in Render
- Check Network Access in MongoDB (allow 0.0.0.0/0)

---

## 🎨 Custom Domain (Optional)

### Add Your Own Domain:

**For Frontend (Vercel):**
1. Go to Vercel project → Settings → Domains
2. Add your domain: `yourapp.com`
3. Update DNS records as instructed
4. Wait 24-48 hours for propagation

**For Backend (Render):**
1. Go to Render service → Settings → Custom Domain
2. Add your API domain: `api.yourapp.com`
3. Update DNS CNAME record
4. Update `REACT_APP_API_URL` in Vercel to new domain

---

## 📈 Monitoring Your App

### Vercel Analytics:
- Dashboard → Analytics
- See page views, performance, errors

### Render Logs:
- Dashboard → Logs
- Real-time backend logs
- Check errors and requests

### MongoDB Atlas:
- Dashboard → Metrics
- Monitor database performance
- Connection stats

---

## 🚀 Upgrade Options

### When Your App Grows:

**Vercel Pro** ($20/month):
- More bandwidth
- Team collaboration
- Advanced analytics

**Render Starter** ($7/month):
- **No sleeping** (most important!)
- Better performance
- More resources

**Railway Pro** ($5/month):
- No sleeping
- Better support
- More resources

**MongoDB Atlas M10** ($57/month):
- More storage
- Better performance
- Advanced features

---

## 📝 Summary

### URLs Are Permanent! ✅

1. **Deploy once** → Get URLs
2. **URLs never change**
3. **Update code anytime** → Just push to GitHub
4. **Auto-deploy** → Same URLs, new code!

### Your Setup:
```
Code (GitHub) → Push → Auto-Deploy
    ↓                      ↓
Frontend (Vercel)    Backend (Render)
    ↓                      ↓
Same URL Forever!    Same URL Forever!
```

---

## 🎯 Next Steps

1. ✅ Deploy backend to Render
2. ✅ Deploy frontend to Vercel  
3. ✅ Update CORS settings
4. ✅ Test your live app
5. ✅ Share your URL with the world! 🌍

**Need help?** Check deployment logs in your hosting dashboards!

---

**Ready to deploy?** Follow **QUICK START** above! 🚀
