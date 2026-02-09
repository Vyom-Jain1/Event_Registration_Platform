# Event Registration Backend

A production-ready Spring Boot backend with MySQL/H2 database integration for the Event Registration Platform.

## 🚀 Features

- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access Control** - User and Admin roles
- **RESTful APIs** - Complete CRUD operations
- **MySQL Integration** - Production database support
- **H2 Embedded Database** - Development/deployment fallback
- **CORS Enabled** - Frontend integration ready
- **Input Validation** - Request validation with error handling
- **Exception Handling** - Global exception management
- **Deployment Ready** - Cloud-ready configuration

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+ (optional - H2 embedded available)
- Git

## 🛠️ Technologies

- Spring Boot 3.2.0
- Spring Security with JWT
- Spring Data JPA
- MySQL / H2 Database
- Lombok
- Maven

## ⚙️ Configuration

### Option 1: MySQL Database (Production)

1. Install MySQL and create database:

```sql
CREATE DATABASE event_registration;
```

2. Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/event_registration
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Option 2: H2 Embedded Database (Development/Deployment)

Run with H2 profile (no MySQL needed):

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=h2
```

## 🏃 Running the Application

### Using Maven

```bash
# Navigate to backend directory
cd event-registration-backend

# Run with MySQL
mvn spring-boot:run

# OR run with H2 (embedded database)
mvn spring-boot:run -Dspring-boot.run.profiles=h2
```

### Using JAR

```bash
# Build
mvn clean package

# Run with MySQL
java -jar target/event-registration-backend-1.0.0.jar

# Run with H2
java -jar -Dspring.profiles.active=h2 target/event-registration-backend-1.0.0.jar
```

Server runs on: **http://localhost:8080**

## 📡 API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login

### Events (Public: GET, Admin: POST/PUT/DELETE)

- `GET /api/events` - Get all events
- `GET /api/events/{id}` - Get event by ID
- `POST /api/events` - Create event (Admin only)
- `PUT /api/events/{id}` - Update event (Admin only)
- `DELETE /api/events/{id}` - Delete event (Admin only)

### Tickets (Authenticated Users)

- `POST /api/tickets/book` - Book a ticket
- `GET /api/tickets/{ticketId}` - Get ticket details
- `GET /api/tickets/my-tickets` - Get user's tickets
- `GET /api/tickets` - Get all tickets (Admin only)

## 🔐 Authentication

Include JWT token in requests:

```
Authorization: Bearer <your_jwt_token>
```

## 📝 Sample API Requests

### Sign Up

```json
POST /api/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

### Login

```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

### Create Event (Admin)

```json
POST /api/events
Authorization: Bearer <admin_token>
{
  "name": "Tech Conference 2024",
  "description": "Annual tech conference",
  "date": "2024-12-15T10:00:00",
  "location": "San Francisco, CA",
  "availableSeats": 500,
  "ticketPrice": 99.99,
  "imageUrl": "https://example.com/image.jpg"
}
```

### Book Ticket

```json
POST /api/tickets/book
Authorization: Bearer <user_token>
{
  "eventId": 1,
  "attendeeName": "John Doe",
  "attendeeEmail": "john@example.com",
  "phoneNumber": "+1234567890",
  "numberOfTickets": 2
}
```

## 🌐 Deployment Options

### 1. Deploy to Heroku

```bash
# Add Heroku remote
heroku create your-app-name

# Add MySQL addon or use H2
heroku addons:create jawsdb:kitefin

# Deploy
git push heroku main
```

### 2. Deploy to AWS Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init -p java-17 event-registration

# Create environment
eb create production-env

# Deploy
eb deploy
```

### 3. Deploy to Azure App Service

```bash
# Login to Azure
az login

# Create resource group
az group create --name EventRegistrationRG --location eastus

# Create app service
az webapp up --name event-registration-backend --runtime "JAVA:17-java17" --sku B1
```

### 4. Deploy with Docker

```bash
# Build
docker build -t event-registration-backend .

# Run
docker run -p 8080:8080 -e SPRING_PROFILES_ACTIVE=h2 event-registration-backend
```

## 🔧 Environment Variables

For cloud deployment, set these environment variables:

```bash
# Database (MySQL)
SPRING_DATASOURCE_URL=jdbc:mysql://your-db-host:3306/event_registration
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password

# JWT Secret (generate new one for production)
JWT_SECRET=your-secret-key-min-256-bits

# CORS Origins
CORS_ALLOWED_ORIGINS=https://your-frontend-url.com

# Or use H2 embedded
SPRING_PROFILES_ACTIVE=h2
```

## 🗄️ Database Schema

### Users Table

- id (PK), name, email, password, role, created_at

### Events Table

- id (PK), name, description, date, location, available_seats, ticket_price, image_url, created_at, updated_at

### Tickets Table

- id (PK), user_id (FK), event_id (FK), attendee_name, attendee_email, phone_number, number_of_tickets, total_amount, booking_status, booking_date

## 🧪 Testing

```bash
# Run tests
mvn test

# Run with coverage
mvn clean test jacoco:report
```

## 📦 Build for Production

```bash
# Create executable JAR
mvn clean package -DskipTests

# JAR location
target/event-registration-backend-1.0.0.jar
```

## 🔍 H2 Console (Development)

When running with H2 profile:

- URL: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:file:./data/eventdb`
- Username: `sa`
- Password: (empty)

## 📊 Monitoring

Access Spring Boot Actuator endpoints (if enabled):

- `/actuator/health` - Health check
- `/actuator/info` - Application info

## 🤝 Integration with Frontend

Frontend should:

1. Point to `http://localhost:8080/api` (development)
2. Store JWT token after login
3. Include token in Authorization header
4. Handle 401/403 responses

## 🐛 Troubleshooting

**MySQL Connection Error:**

- Check MySQL is running
- Verify credentials in application.properties
- Or switch to H2 profile

**Port 8080 already in use:**

```bash
# Change port in application.properties
server.port=8081
```

**CORS errors:**

- Add your frontend URL to `cors.allowed.origins`

## 📄 License

Created for educational purposes.

---

**Backend Stack**: Spring Boot 3 • Spring Security • JWT • MySQL • H2 • Maven
