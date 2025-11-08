# Testing and Verification Guide

## Pre-Testing Setup

### 1. Ensure Backend is Running
\`\`\`bash
cd waste-segregator-backend
npm install
npm start
\`\`\`

Backend should be running on `http://localhost:5000`

### 2. Ensure Frontend is Running
\`\`\`bash
cd frontend
npm install
npm start
\`\`\`

Frontend should be running on `http://localhost:3000`

### 3. Verify Database Connection
- Ensure MongoDB is running
- Check that database is populated with sample data
- Verify all collections exist (bins, feedback, images, etc.)

## API Endpoint Verification

### Health Check
\`\`\`bash
curl http://localhost:5000/api/health
\`\`\`

Expected Response:
\`\`\`json
{
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
\`\`\`

### Get All Bins
\`\`\`bash
curl http://localhost:5000/api/bins
\`\`\`

Expected Response:
\`\`\`json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "_id": "...",
      "binId": "BIN-001",
      "category": "metal",
      "fillLevel": 75,
      "images": [
        {
          "url": "https://...",
          "public_id": "...",
          "caption": "..."
        }
      ]
    }
  ]
}
\`\`\`

### Submit Feedback
\`\`\`bash
curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "subject": "Great app!",
    "message": "This waste management system is very helpful and easy to use.",
    "rating": 5,
    "category": "general"
  }'
\`\`\`

Expected Response:
\`\`\`json
{
  "success": true,
  "message": "Feedback submitted successfully. Thank you for your input!",
  "data": {
    "feedbackId": "..."
  }
}
\`\`\`

### Get Feedback
\`\`\`bash
curl http://localhost:5000/api/feedback
\`\`\`

Expected Response:
\`\`\`json
{
  "success": true,
  "data": {
    "feedback": [
      {
        "_id": "...",
        "email": "user@example.com",
        "subject": "Great app!",
        "message": "This waste management system is very helpful and easy to use.",
        "rating": 5,
        "category": "general"
      }
    ],
    "pagination": {
      "total": 1,
      "limit": 50,
      "skip": 0
    }
  }
}
\`\`\`

## Frontend Feature Testing

### 1. Home Page Testing

#### Test: Bin Display
1. Navigate to `http://localhost:3000`
2. Verify bins are displayed in a grid
3. Check that each bin shows:
   - Fill level percentage
   - Waste category
   - Background image (if available)
   - Gradient overlay on image

**Expected Result**: All bins display correctly with proper styling

#### Test: Feedback Display
1. Scroll to "User Feedback" section
2. Verify feedback items are displayed
3. Check that each feedback shows:
   - User email (first letter as avatar)
   - Subject line
   - Proper styling

**Expected Result**: Feedback displays correctly

#### Test: Feedback Form
1. Scroll to "Send Us Your Feedback" section
2. Fill in all fields:
   - Email: test@example.com
   - Subject: Test feedback
   - Category: General Feedback
   - Rating: 5 stars
   - Message: This is a test feedback message for the system.
3. Click "Submit Feedback"
4. Verify success message appears

**Expected Result**: Form submits successfully and shows confirmation

### 2. Dashboard Page Testing

#### Test: Bin Status Display
1. Navigate to Dashboard
2. Verify "Live Bin Status" section shows all bins
3. Check that bins display with:
   - Correct fill levels
   - Proper background images
   - Gradient overlays
   - Hover effects

**Expected Result**: All bins display correctly

#### Test: Camera Feed
1. Verify camera feed section displays
2. Check that it shows a placeholder image
3. Verify "Detected" item is shown

**Expected Result**: Camera feed displays correctly

#### Test: Chart Display
1. Verify "Weekly Waste Collection" chart displays
2. Check that chart shows:
   - Line chart with data points
   - Legend
   - Axis labels
   - Tooltip on hover

**Expected Result**: Chart displays correctly with all elements

#### Test: Alerts Section
1. Verify "Anomaly Alerts & Maintenance Logs" section displays
2. Check that alerts are shown with proper styling

**Expected Result**: Alerts display correctly

### 3. Admin Dashboard Testing

#### Test: Admin Login
1. Navigate to `http://localhost:3000/admin/login`
2. Enter admin credentials
3. Verify login succeeds and redirects to admin dashboard

**Expected Result**: Admin logs in successfully

#### Test: Image Upload
1. In Admin Dashboard, go to "Upload Website Images" section
2. Click "Select Image"
3. Choose an image file (PNG, JPG, GIF)
4. Verify upload succeeds
5. Check that image appears in "Uploaded Images Gallery"

**Expected Result**: Image uploads and displays correctly

#### Test: Camera Feed Update
1. In "Update Camera Feed" section
2. Enter a valid image URL
3. Click "Update Camera Feed"
4. Verify success message appears

**Expected Result**: Camera feed updates successfully

#### Test: Pending Actions
1. Click "Add Action" button
2. Fill in:
   - Title: Test Action
   - Description: This is a test action
   - Due Date: Select a future date
   - Priority: High
3. Click "Add"
4. Verify action appears in the list

**Expected Result**: Action is created and displayed

#### Test: Delete Action
1. Find the action you just created
2. Click the delete button
3. Verify action is removed from the list

**Expected Result**: Action is deleted successfully

#### Test: Feedback Management
1. Scroll to "Recent Feedback" section
2. Verify feedback items are displayed
3. Click delete button on a feedback item
4. Verify feedback is removed

**Expected Result**: Feedback is deleted successfully

#### Test: Date Selection
1. In the calendar section, select a different date
2. Verify waste data updates for that date
3. Check that total waste amount is displayed

**Expected Result**: Date selection works and data updates

## Data Validation Testing

### 1. Feedback Form Validation

#### Test: Empty Fields
1. Try to submit feedback with empty email
2. Verify error message appears

**Expected Result**: Error message: "Please fill in all required fields"

#### Test: Invalid Email
1. Enter invalid email format
2. Try to submit
3. Verify error message appears

**Expected Result**: Error message about invalid email

#### Test: Short Message
1. Enter message with less than 10 characters
2. Try to submit
3. Verify error message appears

**Expected Result**: Error message: "Message must be at least 10 characters long"

#### Test: Long Message
1. Try to enter more than 2000 characters
2. Verify character counter shows limit

**Expected Result**: Input is limited to 2000 characters

### 2. Admin Form Validation

#### Test: Action Title Validation
1. Try to create action with empty title
2. Verify error message appears

**Expected Result**: Error message appears

#### Test: File Upload Validation
1. Try to upload a non-image file
2. Verify error message appears

**Expected Result**: Error message: "Please select a valid image file"

#### Test: File Size Validation
1. Try to upload an image larger than 5MB
2. Verify error message appears

**Expected Result**: Error message: "File size must be less than 5MB"

## Error Handling Testing

### 1. Backend Connection Error
1. Stop the backend server
2. Try to load the dashboard
3. Verify error message appears
4. Check that fallback data is displayed

**Expected Result**: Error message and fallback data displayed

### 2. API Error Response
1. Manually trigger an API error (e.g., invalid ID)
2. Verify error is caught and displayed to user

**Expected Result**: User-friendly error message displayed

### 3. Network Error
1. Disconnect internet
2. Try to submit feedback
3. Verify error message appears

**Expected Result**: Error message: "No response from server..."

## Performance Testing

### 1. Page Load Time
1. Open DevTools (F12)
2. Go to Network tab
3. Load Dashboard page
4. Check total load time

**Expected Result**: Page loads in under 3 seconds

### 2. Image Loading
1. Verify bin images load quickly
2. Check that images don't block page rendering

**Expected Result**: Images load without blocking UI

### 3. Chart Rendering
1. Verify chart renders smoothly
2. Check that chart is responsive

**Expected Result**: Chart renders without lag

## Browser Compatibility Testing

Test on the following browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Test Cases
1. All pages load correctly
2. Forms work properly
3. Charts display correctly
4. Images display correctly
5. Responsive design works on mobile

## Accessibility Testing

### Test Cases
1. All form inputs have labels
2. Images have alt text
3. Color contrast is sufficient
4. Keyboard navigation works
5. Screen reader compatibility

## Final Verification Checklist

- [ ] Backend server is running
- [ ] Frontend server is running
- [ ] Database is connected
- [ ] All API endpoints respond correctly
- [ ] Home page displays bins and feedback
- [ ] Dashboard displays all sections
- [ ] Admin dashboard loads all data
- [ ] Feedback form submits successfully
- [ ] Image upload works
- [ ] Chart displays correctly
- [ ] Error handling works properly
- [ ] Validation works on all forms
- [ ] Responsive design works
- [ ] No console errors
- [ ] All features work as expected

## Troubleshooting

### Issue: Bins not displaying
**Solution**: 
1. Check backend is running
2. Verify database has bin data
3. Check browser console for errors
4. Verify API response format

### Issue: Images not loading
**Solution**:
1. Check image URLs are valid
2. Verify CORS is configured
3. Check image file sizes
4. Verify Cloudinary is configured (if using)

### Issue: Feedback form not submitting
**Solution**:
1. Check all fields are filled
2. Verify email format is correct
3. Check backend is running
4. Check browser console for errors

### Issue: Admin dashboard not loading
**Solution**:
1. Verify admin is logged in
2. Check backend is running
3. Verify all API endpoints are working
4. Check browser console for errors

## Support

For issues or questions:
1. Check the console for error messages
2. Verify all services are running
3. Check network tab in DevTools
4. Review backend logs
5. Contact development team
