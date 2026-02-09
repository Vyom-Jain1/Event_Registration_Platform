# Event Registration Platform - Render Deployment Guide

## 🚀 Quick Deploy to Render

### Step 1: Push to GitHub

```bash
cd e:\HackathonHcl
git init
git add .
git commit -m "Event Registration Platform - Ready for deployment"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

### Step 2: Deploy Backend

1. Go to **https://render.com** → Sign Up/Login
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. **Configuration:**
   - **Name:** `event-registration-backend`
   - **Root Directory:** `event-registration-backend`
   - **Environment:** Docker
   - **Region:** Choose closest to you
   - **Branch:** main
   - **Plan:** Free
5. **Environment Variables** (Add these):
   ```
   SPRING_PROFILES_ACTIVE=h2
   SERVER_PORT=8080
   ```
6. Click **Create Web Service**
7. Wait 5-10 minutes for build to complete
8. **Copy your backend URL** (e.g., `https://event-registration-backend-xxxx.onrender.com`)

### Step 3: Update Frontend Configuration

1. Open `event-registration-app/.env.production`
2. Replace `YOUR-BACKEND-URL` with your actual backend URL:
   ```
   REACT_APP_API_BASE_URL=https://event-registration-backend-xxxx.onrender.com/api
   ```
3. Commit and push:
   ```bash
   git add .
   git commit -m "Update production API URL"
   git push
   ```

### Step 4: Deploy Frontend

1. In Render dashboard, click **New +** → **Static Site**
2. Select the same GitHub repository
3. **Configuration:**
   - **Name:** `event-registration-app`
   - **Root Directory:** `event-registration-app`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build`
4. **Environment Variables:**
   ```
   REACT_APP_API_BASE_URL=https://YOUR-BACKEND-URL.onrender.com/api
   ```
   (Use the backend URL from Step 2)
5. Click **Create Static Site**
6. Wait 3-5 minutes for build

### Step 5: Update Backend CORS

1. Go to your backend service in Render
2. Go to **Environment** tab
3. Add new variable:
   ```
   CORS_ALLOWED_ORIGINS=https://YOUR-FRONTEND-URL.onrender.com,https://event-registration-app-xxxx.onrender.com
   ```
4. Click **Save Changes** (backend will redeploy)

### Step 6: Test Your App

1. Open your frontend URL
2. Login with default admin:
   - **Email:** `admin@demo.com`
   - **Password:** `admin123`
3. Create events and test all features

---

## 📋 Configuration Files Created

- ✅ `Dockerfile` - Updated to use Java 21
- ✅ `.env.production` - Frontend production API URL
- ✅ `DEPLOYMENT.md` - This guide

## ⚠️ Important Notes

### Free Tier Limitations

- **Auto-sleep:** Services sleep after 15 minutes of inactivity
- **Cold start:** First request after sleep takes ~30-50 seconds
- **Database:** H2 database resets on service restart (use Render Disk to persist)

### Database Persistence (Optional - $1/month)

To persist H2 database data:

1. Create `render.yaml` in backend root:

```yaml
services:
  - type: web
    name: event-registration-backend
    env: docker
    disk:
      name: event-data
      mountPath: /app/data
      sizeGB: 1
```

2. Update `application-h2.properties`:

```properties
spring.datasource.url=jdbc:h2:file:/app/data/eventdb
```

3. Commit and push - Render will auto-deploy with persistent storage

### Upgrade to Paid Plan ($7/month per service)

- No auto-sleep
- Faster performance
- Custom domains
- More resources

## 🔧 Troubleshooting

### Backend Issues

**Build fails:**

- Check Render logs
- Verify Dockerfile uses Java 21
- Ensure pom.xml has correct Java version

**Service crashes:**

- Check environment variables
- Review application logs in Render dashboard

### Frontend Issues

**Can't connect to backend:**

- Verify `REACT_APP_API_BASE_URL` is correct
- Check backend CORS settings include frontend URL
- Use browser DevTools → Network tab to debug

**Build fails:**

- Check if all dependencies are in package.json
- Try building locally: `npm run build`

### CORS Errors

Add to backend environment variables:

```
CORS_ALLOWED_ORIGINS=https://frontend-url.onrender.com,https://another-url.com
```

## 🎯 Post-Deployment Checklist

- [ ] Backend deployed and running
- [ ] Frontend deployed and accessible
- [ ] CORS configured correctly
- [ ] Can login with admin credentials
- [ ] Can create events
- [ ] Can book tickets
- [ ] All navigation links work

## 🌐 Alternative: Deploy Frontend to Netlify

If you prefer Netlify for frontend:

1. Build locally:

   ```bash
   cd event-registration-app
   npm run build
   ```

2. Deploy:
   - Go to https://netlify.com
   - Drag & drop `build` folder
   - Add environment variable: `REACT_APP_API_BASE_URL`

3. Update backend CORS with Netlify URL

## 📊 Monitoring

- **Render Dashboard:** Monitor logs, metrics, deploy history
- **H2 Console:** Access at `https://YOUR-BACKEND.onrender.com/h2-console`
  - JDBC URL: `jdbc:h2:file:./data/eventdb`
  - Username: `sa`
  - Password: (empty)

## 🔐 Security Recommendations

For production:

1. Change default admin password
2. Use PostgreSQL instead of H2
3. Add rate limiting
4. Enable HTTPS (Render provides free SSL)
5. Use secrets manager for sensitive data

---

## 💰 Cost Summary

**Free Tier:**

- Backend: Free (750 hrs/month, sleeps after 15 min)
- Frontend: Free (100 GB bandwidth/month)
- Total: **$0/month**

**With Persistence:**

- Backend: Free
- Frontend: Free
- Disk (1GB): $1/month
- Total: **$1/month**

**Paid Plan:**

- Backend: $7/month (always on)
- Frontend: Free
- Disk: $1/month
- Total: **$8/month**

---

Your app is ready to deploy! 🚀
