# Frontend Setup Guide

## Prerequisites
- Node.js 16+ and npm/yarn installed
- Backend running on `http://localhost:5000`

## Installation Steps

### 1. Install Dependencies
\`\`\`bash
cd frontend
yarn install
# or
npm install
\`\`\`

### 2. Environment Configuration
Create a `.env` file in the frontend directory:
\`\`\`bash
cp .env.example .env
\`\`\`

Update the `.env` file with your backend URL:
\`\`\`
REACT_APP_API_URL=http://localhost:5000
\`\`\`

### 3. Start Development Server
\`\`\`bash
yarn start
# or
npm start
\`\`\`

The app will open at `http://localhost:3000`

## Common Issues & Solutions

### Issue: "Cannot find module '@/...'"
**Solution**: The path alias is configured in `craco.config.js`. Make sure you're using relative imports or the alias is properly set up.

### Issue: "Backend connection refused"
**Solution**: 
1. Ensure backend is running: `cd waste-segregator-backend && npm run dev`
2. Check backend is on port 5000
3. Verify `REACT_APP_API_URL` in `.env` is correct

### Issue: "Module not found: use-toast"
**Solution**: This is already included. If you see this error, clear node_modules and reinstall:
\`\`\`bash
rm -rf node_modules yarn.lock
yarn install
\`\`\`

### Issue: "Tailwind CSS not loading"
**Solution**: Make sure `index.css` is imported in `index.js` and PostCSS is configured correctly.

## Project Structure
\`\`\`
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn UI components
│   │   └── layout/          # Layout components (Navbar, Sidebar)
│   ├── pages/               # Page components
│   ├── config/              # API configuration
│   ├── lib/                 # Utilities
│   ├── hooks/               # Custom hooks
│   ├── App.js               # Main app component
│   ├── index.js             # Entry point
│   └── index.css            # Global styles
├── craco.config.js          # Create React App config
├── tailwind.config.js       # Tailwind CSS config
└── package.json
\`\`\`

## Available Routes
- `/` - Dashboard (default)
- `/dashboard` - Dashboard page
- `/home` - Home page
- `/reports` - Reports page
- `/settings` - Settings page
- `/admin/login` - Admin login
- `/admin/dashboard` - Admin dashboard

## Testing the Frontend

### 1. Test Dashboard
- Navigate to `http://localhost:3000/dashboard`
- Should display bin status, camera feed, and analytics charts
- If backend is running, data will be fetched from API

### 2. Test Admin Panel
- Navigate to `http://localhost:3000/admin/login`
- Use credentials:
  - Email: `b24122@students.iitmandi.ac.in`
  - Password: `gadhaa1136@gmail.com`
- Upload images and manage camera feed

### 3. Test Navigation
- Click sidebar items to navigate between pages
- All pages should load without errors

## Development Tips

### Hot Reload
The app supports hot reload. Changes to files will automatically refresh the browser.

### Debugging
- Open browser DevTools (F12)
- Check Console tab for errors
- Use React DevTools extension for component inspection

### Building for Production
\`\`\`bash
yarn build
# or
npm run build
\`\`\`

This creates an optimized production build in the `build/` directory.

## Troubleshooting

If you encounter any issues:

1. **Clear cache and reinstall**:
   \`\`\`bash
   rm -rf node_modules yarn.lock
   yarn install
   \`\`\`

2. **Check Node version**:
   \`\`\`bash
   node --version  # Should be 16+
   \`\`\`

3. **Verify backend is running**:
   \`\`\`bash
   curl http://localhost:5000/api/health
   \`\`\`

4. **Check port availability**:
   - Frontend: 3000
   - Backend: 5000

For more help, check the main README.md or SETUP_INSTRUCTIONS.md
