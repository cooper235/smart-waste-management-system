# Testing Guide - Smart Waste Segregator

This guide provides comprehensive testing procedures for the fullstack application.

## Prerequisites

- Backend running on `http://localhost:5000`
- Frontend running on `http://localhost:3000`
- MongoDB running and accessible
- Postman or curl installed (for API testing)

## Unit Testing

### Backend Tests

\`\`\`bash
cd waste-segregator-backend
npm test
\`\`\`

Tests are located in `src/__tests__/` directory and cover:
- Authentication flows
- Bin management
- IoT device communication
- Analytics calculations

### Frontend Tests

\`\`\`bash
cd frontend
npm test
\`\`\`

## Integration Testing

### 1. Admin Authentication Flow

#### Step 1: Login to Admin Panel

1. Navigate to `http://localhost:3000/admin/login`
2. Enter credentials:
   - Email: `b24122@students.iitmandi.ac.in`
   - Password: `gadhaa1136@gmail.com`
3. Click "Login"

**Expected Result**: Redirected to `/admin/dashboard` with token stored in localStorage

#### Step 2: Verify Token Storage

Open browser DevTools → Application → Local Storage:
- `adminToken` should contain JWT token
- `adminEmail` should contain admin email

### 2. Image Upload Flow

#### Step 1: Upload Image

1. On admin dashboard, click "Select Image"
2. Choose an image file (PNG, JPG, GIF, max 5MB)
3. Click "Upload"

**Expected Result**: 
- Success message appears
- Image appears in "Uploaded Images" gallery
- Image is stored in backend

#### Step 2: Verify Image in Database

\`\`\`bash
curl http://localhost:5000/api/images
\`\`\`

**Expected Result**: Response includes uploaded image with URL

### 3. Camera Feed Update Flow

#### Step 1: Update Camera Feed

1. On admin dashboard, enter camera feed URL
2. Click "Update Camera Feed"

**Expected Result**: 
- Success message appears
- URL stored in localStorage

#### Step 2: Verify on Main Dashboard

1. Navigate to `http://localhost:3000/dashboard`
2. Check "Live Camera Feed" section

**Expected Result**: Camera feed displays the updated image/URL

### 4. Dashboard Data Flow

#### Step 1: Verify Bin Data

1. Navigate to `http://localhost:3000/dashboard`
2. Check "Live Bin Status" section

**Expected Result**: 
- Bins display with fill levels
- Waste type labels visible
- Cards are interactive (hover effects)

#### Step 2: Verify Analytics

1. Check "Time-Series Charts" section
2. Verify line chart and bar chart render

**Expected Result**: 
- Charts display data
- Legend visible
- Responsive on different screen sizes

#### Step 3: Verify Alerts

1. Check "Anomaly Alerts & Maintenance Logs" section

**Expected Result**: 
- Alerts display correctly
- Styling matches design

### 5. API Endpoint Testing

#### Health Check

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

#### Get All Bins

\`\`\`bash
curl http://localhost:5000/api/bins
\`\`\`

**Expected Response**:
\`\`\`json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "Bin A01",
      "wasteType": "Plastic",
      "fill_level": 75,
      "location": "Zone 1",
      "images": []
    }
  ]
}
\`\`\`

#### Admin Login

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

#### Upload Image

\`\`\`bash
curl -X POST http://localhost:5000/api/images/upload \
  -F "image=@/path/to/image.jpg"
\`\`\`

**Expected Response**:
\`\`\`json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "_id": "...",
    "url": "https://...",
    "uploadedAt": "2024-01-15T10:30:00.000Z"
  }
}
\`\`\`

## Performance Testing

### Load Testing

Use Apache Bench or similar tool:

\`\`\`bash
ab -n 1000 -c 10 http://localhost:5000/api/health
\`\`\`

**Expected Result**: Server handles 1000 requests with minimal latency

### Response Time Testing

\`\`\`bash
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:5000/api/bins
\`\`\`

**Expected Result**: Response time < 500ms

## Security Testing

### 1. CORS Testing

\`\`\`bash
curl -H "Origin: http://invalid-origin.com" \
  -H "Access-Control-Request-Method: GET" \
  http://localhost:5000/api/bins
\`\`\`

**Expected Result**: CORS error or rejection

### 2. Invalid Admin Credentials

\`\`\`bash
curl -X POST http://localhost:5000/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "invalid@example.com",
    "password": "wrongpassword"
  }'
\`\`\`

**Expected Response**:
\`\`\`json
{
  "success": false,
  "message": "Invalid admin credentials"
}
\`\`\`

### 3. Missing Required Fields

\`\`\`bash
curl -X POST http://localhost:5000/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "b24122@students.iitmandi.ac.in"
  }'
\`\`\`

**Expected Response**:
\`\`\`json
{
  "success": false,
  "message": "Email and password are required"
}
\`\`\`

## Browser Compatibility Testing

Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

**Expected Result**: All features work consistently across browsers

## Responsive Design Testing

Test on screen sizes:
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

**Expected Result**: Layout adapts properly, no horizontal scrolling

## Regression Testing Checklist

- [ ] Admin login works
- [ ] Image upload works
- [ ] Camera feed updates
- [ ] Dashboard displays data
- [ ] Charts render correctly
- [ ] Alerts display
- [ ] Responsive design works
- [ ] API endpoints respond correctly
- [ ] Error handling works
- [ ] CORS is configured correctly

## Continuous Integration

### GitHub Actions (Optional)

Create `.github/workflows/test.yml`:

\`\`\`yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: cd waste-segregator-backend && npm install && npm test
      - run: cd frontend && npm install && npm test
\`\`\`

## Reporting Issues

When reporting issues, include:
1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Browser/OS information
5. Console errors (if any)
6. Screenshots/videos (if applicable)
