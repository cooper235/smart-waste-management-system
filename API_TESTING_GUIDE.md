# API Testing Guide

## Using cURL

### 1. Admin Login
\`\`\`bash
curl -X POST http://localhost:5000/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "b24122@students.iitmandi.ac.in",
    "password": "gadhaa1136@gmail.com"
  }'
\`\`\`

### 2. Create Pending Action
\`\`\`bash
curl -X POST http://localhost:5000/api/pending-actions \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Review bin status",
    "description": "Check all bins for maintenance",
    "dueDate": "2025-10-30",
    "priority": "high",
    "assignedTo": "Operations Team"
  }'
\`\`\`

### 3. Get All Pending Actions
\`\`\`bash
curl http://localhost:5000/api/pending-actions
\`\`\`

### 4. Get Actions by Date
\`\`\`bash
curl http://localhost:5000/api/pending-actions/date/2025-10-25
\`\`\`

### 5. Update Pending Action
\`\`\`bash
curl -X PATCH http://localhost:5000/api/pending-actions/{actionId} \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed",
    "title": "Updated title"
  }'
\`\`\`

### 6. Delete Pending Action
\`\`\`bash
curl -X DELETE http://localhost:5000/api/pending-actions/{actionId}
\`\`\`

### 7. Create Team Member
\`\`\`bash
curl -X POST http://localhost:5000/api/team \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "role": "Operations Manager",
    "email": "john@example.com",
    "department": "Operations"
  }'
\`\`\`

### 8. Get All Team Members
\`\`\`bash
curl http://localhost:5000/api/team
\`\`\`

### 9. Get Waste Data by Date
\`\`\`bash
curl http://localhost:5000/api/waste-data/date/2025-10-25
\`\`\`

### 10. Create Waste Data
\`\`\`bash
curl -X POST http://localhost:5000/api/waste-data \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2025-10-25",
    "binId": "bin-001",
    "wasteAmount": 50,
    "category": "dry",
    "notes": "Regular collection"
  }'
\`\`\`

### 11. Get Feedback
\`\`\`bash
curl http://localhost:5000/api/feedback
\`\`\`

### 12. Submit Feedback
\`\`\`bash
curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-001",
    "email": "user@example.com",
    "subject": "Great system",
    "message": "The waste management system is working great!",
    "rating": 5,
    "category": "general"
  }'
\`\`\`

## Using Postman

1. Import the collection from `waste-segregator-backend/docs/postman-collection.json`
2. Set environment variables:
   - `base_url`: http://localhost:5000
   - `admin_token`: (obtained from login response)
3. Run requests from the collection

## Using Thunder Client (VS Code)

1. Install Thunder Client extension
2. Create a new request
3. Set method and URL
4. Add headers and body as needed
5. Send request

## Response Examples

### Success Response
\`\`\`json
{
  "success": true,
  "message": "Action created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Review bin status",
    "description": "Check all bins for maintenance",
    "dueDate": "2025-10-30T00:00:00.000Z",
    "priority": "high",
    "status": "pending",
    "createdAt": "2025-10-25T10:30:00.000Z"
  }
}
\`\`\`

### Error Response
\`\`\`json
{
  "success": false,
  "message": "Title, description, and dueDate are required"
}
\`\`\`

---

**Last Updated**: October 2025
