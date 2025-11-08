# Troubleshooting Guide

## Common Issues and Solutions

### 1. "createdBy: Path `createdBy` is required" Error

**Problem**: When adding a pending action in the admin dashboard, you get this error.

**Root Cause**: The PendingAction schema requires a `createdBy` field (admin user ID), but the frontend wasn't sending it.

**Solution**:
- The backend controller now generates a default ID if not provided
- The frontend now includes `createdBy` in the request
- Make sure you're using the updated `AdminDashboard.jsx`

**Test**:
\`\`\`bash
curl -X POST http://localhost:5000/api/pending-actions \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test",
    "description": "Test description",
    "dueDate": "2024-12-31",
    "priority": "medium"
  }'
\`\`\`

---

### 2. "Error uploading image: Bin not found" Error

**Problem**: Image upload fails with "Bin not found" message.

**Root Cause**: The image controller was looking for an existing bin with the provided `binId`, but the bin didn't exist in the database.

**Solution**:
- The backend now automatically creates a default bin if it doesn't exist
- The frontend sends `binId: "default-bin"` which will be created automatically
- No need to pre-create bins before uploading images

**Test**:
1. Go to Admin Dashboard
2. Upload an image
3. Check the success message
4. Verify the image appears in the gallery

---

### 3. Feedback Form Not Visible

**Problem**: Can't find the feedback form on the home page.

**Root Cause**: The feedback form was at the bottom of the page but not clearly visible or accessible.

**Solution**:
- Moved FeedbackForm to a dedicated section with scroll anchor
- Added `id="feedback-section"` for direct linking
- Form is now clearly visible at the bottom of the home page

**Test**:
1. Go to Home page
2. Scroll to the bottom
3. You should see "Send Us Your Feedback" section
4. Try submitting feedback

---

### 4. Feedback Not Submitting

**Problem**: Feedback form shows error when submitting.

**Possible Causes**:

#### a) Missing Required Fields
- Email must be valid format
- Subject must be 5+ characters
- Message must be 10+ characters

**Solution**: Check all fields are filled correctly

#### b) Backend Not Running
- Make sure backend server is running on `http://localhost:5000`

**Solution**: Start backend with `npm start` in the backend directory

#### c) CORS Issues
- Frontend and backend on different ports

**Solution**: Backend should have CORS enabled for `http://localhost:3000`

**Test**:
\`\`\`bash
# Check if backend is running
curl http://localhost:5000/api/feedback

# Should return feedback list (may be empty)
\`\`\`

---

### 5. Images Not Displaying in Admin Dashboard

**Problem**: Image gallery shows empty or broken images.

**Possible Causes**:

#### a) Cloudinary Not Configured
- Image upload service not set up

**Solution**: Check `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` in `.env`

#### b) Images Not Uploaded
- No images in database yet

**Solution**: Upload an image first using the upload form

#### c) Wrong Image URL
- Image URL is broken or inaccessible

**Solution**: Check browser console for 404 errors

**Test**:
1. Upload an image in Admin Dashboard
2. Check browser console for errors
3. Verify image appears in gallery

---

### 6. Admin Dashboard Data Not Loading

**Problem**: Admin dashboard shows "Loading..." but never loads data.

**Possible Causes**:

#### a) Backend Not Running
- API endpoints not accessible

**Solution**: Start backend server

#### b) Wrong API Endpoints
- Frontend calling wrong URLs

**Solution**: Check all API URLs in AdminDashboard.jsx match backend routes

#### c) Network Error
- CORS or connection issue

**Solution**: Check browser Network tab for failed requests

**Test**:
\`\`\`bash
# Test each endpoint
curl http://localhost:5000/api/pending-actions
curl http://localhost:5000/api/feedback
curl http://localhost:5000/api/bins
curl http://localhost:5000/api/images
\`\`\`

---

### 7. Bins Not Displaying on Home Page

**Problem**: "No bins available" message on home page.

**Possible Causes**:

#### a) No Bins in Database
- Database is empty

**Solution**: Create bins via admin dashboard or seed database

#### b) API Not Returning Data
- `/api/bins` endpoint not working

**Solution**: Test endpoint directly:
\`\`\`bash
curl http://localhost:5000/api/bins
\`\`\`

#### c) Image URLs Broken
- Bin images not loading

**Solution**: Check image URLs are valid and accessible

**Test**:
1. Upload an image in Admin Dashboard
2. Go to Home page
3. Refresh page
4. Bins should appear

---

## Database Verification

### Check if Collections Exist

\`\`\`bash
# Connect to MongoDB
mongo

# Use your database
use waste_management

# Check collections
show collections

# Should see:
# - bins
# - feedbacks
# - pendingactions
# - imagerecords
# - wastedata
\`\`\`

### Check Bin Data

\`\`\`bash
db.bins.find().pretty()

# Should return bin documents with:
# - binId
# - category
# - imageUrl
# - location
# - address
# - capacity
\`\`\`

### Check Feedback Data

\`\`\`bash
db.feedbacks.find().pretty()

# Should return feedback documents with:
# - userId
# - email
# - subject
# - message
# - rating
# - category
\`\`\`

---

## API Response Format

### Successful Response
\`\`\`json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data here
  }
}
\`\`\`

### Error Response
\`\`\`json
{
  "success": false,
  "message": "Error description"
}
\`\`\`

---

## Environment Variables Checklist

Make sure these are set in `.env`:

\`\`\`
# Backend
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/waste_management

# Cloudinary (for image uploads)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (for feedback notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
ADMIN_EMAIL=admin@example.com

# Frontend
REACT_APP_API_URL=http://localhost:5000
\`\`\`

---

## Quick Restart Guide

### 1. Restart Backend
\`\`\`bash
cd waste-segregator-backend
npm install
npm start
\`\`\`

### 2. Restart Frontend
\`\`\`bash
cd frontend
npm install
npm start
\`\`\`

### 3. Clear Browser Cache
- Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
- Clear all cache
- Refresh page

### 4. Check Logs
- Backend: Check terminal for error messages
- Frontend: Check browser console (F12)
- Database: Check MongoDB logs

---

## Getting Help

If you encounter issues:

1. Check this troubleshooting guide
2. Check browser console for errors (F12)
3. Check backend terminal for error messages
4. Check MongoDB connection
5. Verify all environment variables are set
6. Try restarting both frontend and backend
7. Clear browser cache and refresh

---

## Performance Tips

1. **Limit API Responses**: Use pagination for large datasets
2. **Cache Images**: Use browser caching for images
3. **Optimize Database**: Add indexes for frequently queried fields
4. **Lazy Load**: Load images only when visible
5. **Compress Images**: Reduce image file sizes before upload
