# Event Registration Platform - Complete Full Stack Application

A production-ready Event Registration Platform with React frontend and Spring Boot backend.

## 🚀 Features

### Frontend (React)

- User Authentication (Login/Signup)
- Event Browsing (Public)
- Event Registration (Protected)
- Ticket Confirmation
- Admin Dashboard (CRUD operations)
- Role-Based UI
- Responsive Design
- JWT Token Management

### Backend (Spring Boot)

- RESTful APIs
- JWT Authentication
- Role-Based Access Control (User/Admin)
- MySQL / H2 Database Support
- Input Validation
- Global Exception Handling
- CORS Enabled
- Deployment Ready

## 📋 Quick Start

### Prerequisites

- **Node.js 16+** - For frontend
- **Java 17+** - For backend (REQUIRED)
- **Maven 3.6+** - For backend build
- **MySQL 8+** - Optional (H2 embedded available)

### Installation

```bash
# 1. Frontend Setup
cd event-registration-app
npm install
npm start
# Runs on http://localhost:3000

# 2. Backend Setup (in new terminal)
cd ../event-registration-backend
mvn clean install -DskipTests
java -Dspring.profiles.active=h2 -jar target/event-registration-backend-1.0.0.jar
# Runs on http://localhost:8080
```

## 📁 Project Structure

```
HackathonHcl/
├── event-registration-app/              # React Frontend
│   ├── src/
│   │   ├── components/                  # Reusable components
│   │   ├── pages/                       # Page components
│   │   ├── context/                     # Auth context
│   │   ├── services/                    # API services
│   │   └── App.js                       # Main app
│   └── package.json
│
├── event-registration-backend/          # Spring Boot Backend
│   ├── src/main/java/com/eventregistration/
│   │   ├── entity/                      # Database entities
│   │   ├── repository/                  # Data access
│   │   ├── service/                     # Business logic
│   │   ├── controller/                  # REST endpoints
│   │   ├── security/                    # JWT & Security
│   │   ├── config/                      # Configuration
│   │   └── dto/                         # Data transfer objects
│   ├── src/main/resources/
│   │   ├── application.properties       # MySQL config
│   │   └── application-h2.properties    # H2 config
│   └── pom.xml
│
├── SETUP_GUIDE.md                       # Setup instructions
└── README.md                            # This file
```

## 🔐 Authentication Flow

1. User signs up/logs in
2. Backend returns JWT token + user data (with role)
3. Frontend stores token in localStorage
4. Token sent in Authorization header for all API calls
5. Backend validates token and role for protected routes

## 📡 API Endpoints

### Base URL: `http://localhost:8080/api`

#### Authentication (Public)

```
POST /auth/signup    - Register user
POST /auth/login     - Login user
```

#### Events

```
GET    /events       - List all events (public)
GET    /events/{id}  - Get event details (public)
POST   /events       - Create event (admin only)
PUT    /events/{id}  - Update event (admin only)
DELETE /events/{id}  - Delete event (admin only)
```

#### Tickets

```
POST /tickets/book         - Book ticket (authenticated)
GET  /tickets/{ticketId}   - Get ticket (authenticated)
GET  /tickets/my-tickets   - Get user's tickets (authenticated)
GET  /tickets              - Get all tickets (admin only)
```

## 🗄️ Database Configuration

### Option 1: H2 Embedded (Recommended for Quick Start)

```bash
java -Dspring.profiles.active=h2 -jar target/event-registration-backend-1.0.0.jar
```

- No MySQL installation needed
- Data stored in `./data/eventdb.mv.db`
- H2 Console: http://localhost:8080/h2-console

### Option 2: MySQL

```properties
# application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/event_registration
spring.datasource.username=root
spring.datasource.password=root
```

## 🧪 Testing

### Create Test Users

**Admin User:**

```json
POST http://localhost:8080/api/auth/signup
{
  "name": "Admin User",
  "email": "admin@test.com",
  "password": "admin123",
  "role": "admin"
}
```

**Regular User:**

```json
POST http://localhost:8080/api/auth/signup
{
  "name": "John Doe",
  "email": "user@test.com",
  "password": "password123",
  "role": "user"
}
```

### Test Flow

1. Login as admin → Create events in dashboard
2. Login as user → Browse events → Register for event
3. View ticket confirmation

## 🌐 Deployment

### Frontend Deployment Options

- **Netlify** - `npm run build` → drag & drop
- **Vercel** - Connect GitHub repo
- **GitHub Pages** - `npm run build` → gh-pages

Update `.env`:

```
REACT_APP_API_BASE_URL=https://your-backend-url.com/api
```

### Backend Deployment Options

#### Heroku (Easiest)

```bash
heroku create your-app-name
heroku config:set SPRING_PROFILES_ACTIVE=h2
git push heroku main
```

#### Railway.app

1. Connect GitHub repo
2. Set environment: `SPRING_PROFILES_ACTIVE=h2`
3. Auto-deploy

#### Render.com

1. New Web Service → Connect repo
2. Build: `mvn clean package -DskipTests`
3. Start: `java -jar target/event-registration-backend-1.0.0.jar`

#### AWS/Azure/GCP

See `backend/DEPLOYMENT.md` for detailed guides

## 🔧 Environment Variables

### Backend

```bash
SPRING_PROFILES_ACTIVE=h2              # Use H2 or omit for MySQL
JWT_SECRET=your-secret-key             # Generate secure key
CORS_ALLOWED_ORIGINS=https://your-frontend-url.com

# For MySQL
SPRING_DATASOURCE_URL=jdbc:mysql://host:3306/dbname
SPRING_DATASOURCE_USERNAME=username
SPRING_DATASOURCE_PASSWORD=password
```

### Frontend

```bash
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

## 📊 Database Schema

### Users

- id, name, email, password (hashed), role (USER/ADMIN), created_at

### Events

- id, name, description, date, location, available_seats, ticket_price, image_url, created_at, updated_at

### Tickets

- id, user_id (FK), event_id (FK), attendee_name, attendee_email, phone_number, number_of_tickets, total_amount, booking_status, booking_date

## ✅ Deployment Checklist

### Frontend

- [ ] Build: `npm run build`
- [ ] Update API URL in `.env`
- [ ] Deploy to hosting platform
- [ ] Configure CORS in backend

### Backend

- [ ] Set SPRING_PROFILES_ACTIVE (h2 or mysql)
- [ ] Generate secure JWT_SECRET
- [ ] Set CORS_ALLOWED_ORIGINS
- [ ] Build: `mvn clean package -DskipTests`
- [ ] Deploy JAR or connect to cloud platform
- [ ] Verify health endpoint

## 🚨 Troubleshooting

### Java Version Error

**Problem**: "UnsupportedClassVersionError"
**Solution**: Install Java 17+ from https://adoptium.net/

### Port Already in Use

**Frontend**: Change port in package.json scripts
**Backend**: Add `server.port=8081` to application.properties

### Network Error in Frontend

**Solution**: Ensure backend is running on port 8080

### CORS Error

**Solution**: Add frontend URL to `cors.allowed.origins` in backend

## 📖 Documentation

- `/backend/README.md` - Backend documentation
- `/backend/DEPLOYMENT.md` - Deployment guides
- `/frontend/README.md` - Frontend documentation
- `/SETUP_GUIDE.md` - Complete setup instructions

## 🎯 Features Implemented

✅ User Authentication (JWT)
✅ Role-Based Access Control
✅ Event CRUD Operations
✅ Ticket Booking System
✅ Admin Dashboard
✅ Protected Routes
✅ Form Validation
✅ Error Handling
✅ CORS Configuration
✅ Database Integration (MySQL/H2)
✅ Deployment Ready

## 📦 Technology Stack

**Frontend:**

- React 18
- React Router v6
- Axios
- Context API
- CSS3

**Backend:**

- Spring Boot 3.2.0
- Spring Security
- Spring Data JPA
- JWT (jjwt 0.11.5)
- MySQL / H2 Database
- Maven

## 🤝 Contributing

This is a complete full-stack application ready for:

- Academic projects
- Portfolio demonstrations
- Event management systems
- Learning Spring Boot + React integration

## 📄 License

Created for educational purposes.

---

**Complete Full Stack Application** | React + Spring Boot + MySQL/H2 | JWT Auth | Role-Based Access | Deployment Ready
