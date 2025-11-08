# Backend Schema and Fields Guide

## Overview
This document outlines all backend schemas, required fields, and how they map to the frontend.

---

## 1. Feedback Schema

**Model Location**: `/waste-segregator-backend/src/models/Feedback.js`

### Required Fields:
- **userId** (String, required): User identifier - can be "anonymous" for public feedback
- **email** (String, required): User email address (validated format)
- **subject** (String, required): Feedback subject (5-100 characters)
- **message** (String, required): Feedback message (10-2000 characters)

### Optional Fields:
- **rating** (Number): 1-5 star rating
- **category** (String): "bug", "feature-request", "general", "complaint"
- **status** (String): "new", "reviewed", "resolved" (default: "new")
- **attachments** (Array): File attachments
- **reviewedBy** (ObjectId): Admin user who reviewed
- **reviewNotes** (String): Admin review notes

### Frontend Implementation:
\`\`\`jsx
// FeedbackForm.jsx sends:
{
  userId: "anonymous",
  email: "user@example.com",
  subject: "Subject here",
  message: "Message here",
  rating: 5,
  category: "general"
}
\`\`\`

### API Endpoint:
- **POST** `/api/feedback` - Submit feedback (no auth required)
- **GET** `/api/feedback` - Get all feedback (admin only)
- **PATCH** `/api/feedback/:feedbackId` - Review feedback (admin only)
- **DELETE** `/api/feedback/:feedbackId` - Delete feedback (admin only)

---

## 2. PendingAction Schema

**Model Location**: `/waste-segregator-backend/src/models/PendingAction.js`

### Required Fields:
- **title** (String, required): Action title (max 100 characters)
- **description** (String, required): Action description (max 500 characters)
- **dueDate** (Date, required): When action is due
- **createdBy** (ObjectId, required): Admin user who created the action

### Optional Fields:
- **priority** (String): "low", "medium", "high" (default: "medium")
- **status** (String): "pending", "in-progress", "completed" (default: "pending")
- **assignedTo** (String): Who the action is assigned to (default: "General")
- **completedAt** (Date): When action was completed

### Frontend Implementation:
\`\`\`jsx
// AdminDashboard.jsx sends:
{
  title: "Action title",
  description: "Action description",
  dueDate: "2024-12-31",
  priority: "medium",
  createdBy: "admin-id" // Now included!
}
\`\`\`

### API Endpoint:
- **POST** `/api/pending-actions` - Create action (admin only)
- **GET** `/api/pending-actions` - Get all actions
- **PATCH** `/api/pending-actions/:actionId` - Update action
- **DELETE** `/api/pending-actions/:actionId` - Delete action

---

## 3. Bin Schema

**Model Location**: `/waste-segregator-backend/src/models/Bin.js`

### Required Fields:
- **imageUrl** (String, required): Bin image URL
- **cloudinaryId** (String, required): Cloudinary public ID
- **binId** (String, required): Unique bin identifier
- **category** (String, required): Waste category
- **location.latitude** (Number, required): GPS latitude
- **location.longitude** (Number, required): GPS longitude
- **address** (String, required): Bin location address
- **capacity** (Number, required): Bin capacity in kg

### Optional Fields:
- **fillLevel** (Number): Current fill percentage
- **lastEmptied** (Date): Last emptying date
- **status** (String): "active", "inactive", "maintenance"

### Frontend Implementation:
\`\`\`jsx
// BinCard.jsx displays:
{
  _id: "mongo-id",
  binId: "bin-001",
  category: "organic",
  imageUrl: "https://...",
  fillLevel: 75,
  address: "Location address"
}
\`\`\`

### API Endpoint:
- **GET** `/api/bins` - Get all bins
- **POST** `/api/bins` - Create bin (admin only)
- **PATCH** `/api/bins/:binId` - Update bin
- **DELETE** `/api/bins/:binId` - Delete bin

---

## 4. ImageRecord Schema

**Model Location**: `/waste-segregator-backend/src/models/ImageRecord.js`

### Required Fields:
- **binId** (ObjectId, required): Reference to Bin
- **imageUrl** (String, required): Image URL

### Optional Fields:
- **cloudinaryId** (String): Cloudinary ID
- **predictedCategory** (String): ML predicted category
- **confidence** (Number): Prediction confidence
- **actualCategory** (String): Verified category
- **isVerified** (Boolean): Verification status

### Frontend Implementation:
\`\`\`jsx
// Image upload in AdminDashboard:
{
  binId: "bin-001", // Now creates bin if not found!
  predictedCategory: "organic"
}
\`\`\`

### API Endpoint:
- **POST** `/api/images/upload` - Upload image
- **GET** `/api/images/:binId` - Get bin images
- **DELETE** `/api/images/:imageId` - Delete image

---

## 5. WasteData Schema

**Model Location**: `/waste-segregator-backend/src/models/WasteData.js`

### Required Fields:
- **date** (Date, required): Data collection date
- **binId** (ObjectId, required): Reference to Bin
- **wasteAmount** (Number, required): Amount in kg

### Optional Fields:
- **category** (String): Waste category
- **notes** (String): Additional notes

### API Endpoint:
- **GET** `/api/waste-data/date/:date` - Get waste data for date
- **POST** `/api/waste-data` - Create waste data entry

---

## Frontend to Backend Mapping

### Home Page (Public)
- Displays bins from `/api/bins`
- Shows feedback from `/api/feedback`
- Submits feedback to `/api/feedback` (POST)

### Admin Dashboard
- Uploads images to `/api/images/upload`
- Creates actions at `/api/pending-actions` (POST)
- Fetches actions from `/api/pending-actions` (GET)
- Deletes actions at `/api/pending-actions/:id` (DELETE)
- Manages feedback at `/api/feedback`

---

## Common Issues and Fixes

### Issue 1: "createdBy is required"
**Cause**: Frontend not sending createdBy field
**Fix**: Backend now generates default ID if not provided

### Issue 2: "Bin not found"
**Cause**: Image upload references non-existent bin
**Fix**: Backend now creates default bin if not found

### Issue 3: Feedback form not visible
**Cause**: Component not properly displayed
**Fix**: Moved to dedicated section in Home.jsx with scroll anchor

---

## Testing the APIs

### Test Feedback Submission
\`\`\`bash
curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "anonymous",
    "email": "test@example.com",
    "subject": "Test feedback",
    "message": "This is a test message",
    "rating": 5,
    "category": "general"
  }'
\`\`\`

### Test Action Creation
\`\`\`bash
curl -X POST http://localhost:5000/api/pending-actions \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test action",
    "description": "Test description",
    "dueDate": "2024-12-31",
    "priority": "high"
  }'
\`\`\`

### Test Image Upload
\`\`\`bash
curl -X POST http://localhost:5000/api/images/upload \
  -F "image=@/path/to/image.jpg" \
  -F "binId=bin-001"
