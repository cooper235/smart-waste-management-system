# Deployment Guide

## Backend Deployment

### Option 1: Vercel

1. Install Vercel CLI:
\`\`\`bash
npm i -g vercel
\`\`\`

2. Deploy:
\`\`\`bash
cd waste-segregator-backend
vercel
\`\`\`

3. Set environment variables in Vercel dashboard

### Option 2: Heroku

1. Install Heroku CLI
2. Create app:
\`\`\`bash
heroku create your-app-name
\`\`\`

3. Set environment variables:
\`\`\`bash
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
\`\`\`

4. Deploy:
\`\`\`bash
git push heroku main
\`\`\`

### Option 3: AWS/DigitalOcean

1. Set up server with Node.js
2. Clone repository
3. Install dependencies
4. Set environment variables
5. Use PM2 for process management:
\`\`\`bash
npm install -g pm2
pm2 start server.js --name "waste-backend"
\`\`\`

## Frontend Deployment

### Option 1: Vercel

1. Connect GitHub repository to Vercel
2. Set environment variables:
   - `REACT_APP_API_URL=https://your-backend-url`
3. Deploy automatically on push

### Option 2: Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `build`
4. Set environment variables
5. Deploy

### Option 3: GitHub Pages

1. Update `package.json`:
\`\`\`json
{
  "homepage": "https://yourusername.github.io/repo-name"
}
\`\`\`

2. Deploy:
\`\`\`bash
npm run build
npm run deploy
\`\`\`

## Database Setup

### MongoDB Atlas (Recommended)

1. Create account at mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update `MONGODB_URI` in backend environment variables

### Self-Hosted MongoDB

1. Install MongoDB on server
2. Configure authentication
3. Update `MONGODB_URI` with connection string

## SSL/HTTPS

### Let's Encrypt (Free)

\`\`\`bash
sudo apt-get install certbot
sudo certbot certonly --standalone -d yourdomain.com
\`\`\`

### Nginx Configuration

\`\`\`nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    location / {
        proxy_pass http://localhost:5000;
    }
}
\`\`\`

## Monitoring & Logging

### PM2 Monitoring

\`\`\`bash
pm2 monit
pm2 logs
\`\`\`

### Application Insights (Azure)

1. Create Application Insights resource
2. Add instrumentation key to backend
3. Monitor performance and errors

## Backup Strategy

### Database Backups

\`\`\`bash
# MongoDB backup
mongodump --uri "mongodb+srv://user:pass@cluster.mongodb.net/db"

# Restore
mongorestore --uri "mongodb+srv://user:pass@cluster.mongodb.net/db" dump/
\`\`\`

### File Backups

- Store uploaded images in cloud storage (AWS S3, Azure Blob)
- Regular automated backups

## Performance Optimization

### Backend

- Enable gzip compression
- Use caching headers
- Optimize database queries
- Use CDN for static assets

### Frontend

- Code splitting
- Lazy loading
- Image optimization
- Minification

## Scaling

### Horizontal Scaling

- Load balancer (Nginx, HAProxy)
- Multiple backend instances
- Database replication

### Vertical Scaling

- Increase server resources
- Optimize code
- Database indexing
