# Event Registration Platform

A complete React-based event registration platform with user authentication, event browsing, and ticket booking.

##  Features

- **User Authentication**: Sign up and login system with JWT tokens
- **Event Listing**: Browse all available events
- **Event Details**: View detailed event information
- **Protected Registration**: Users must login to register for events
- **Ticket Confirmation**: Instant confirmation with ticket details
- **Responsive Design**: Mobile and desktop friendly
- **Form Validation**: Client-side validation with error handling
- **Auto-fill Forms**: User information pre-filled in registration

##  Project Structure

```
src/
 components/
    EventCard.jsx          # Event card component
    Navbar.jsx             # Navigation with auth
    Loader.jsx             # Loading spinner
    ProtectedRoute.jsx     # Route protection
 pages/
    Home.jsx               # Event listing
    EventDetails.jsx       # Event details
    Register.jsx           # Registration form
    Ticket.jsx             # Ticket confirmation
    Login.jsx              # Login page
    SignUp.jsx             # Sign up page
 context/
    AuthContext.jsx        # Auth state management
 services/
    api.js                 # API configuration
 App.js                     # Main app with routing
 index.js                   # Entry point
```

##  Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Backend API
Edit `.env` file:
```env
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

### 3. Start Application
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

##  Backend API Requirements

Your backend must provide these endpoints:

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Authenticate user

Response format:
```json
{
  "user": { "id": 1, "name": "John", "email": "john@example.com" },
  "token": "jwt_token_here"
}
```

### Events
- `GET /api/events` - List all events
- `GET /api/events/:id` - Get single event

### Tickets
- `POST /api/tickets/book` - Book ticket (requires auth)
- `GET /api/tickets/:ticketId` - Get ticket details (requires auth)

##  Routes

| Route | Page | Protection |
|-------|------|-----------|
| `/` | Home | Public |
| `/login` | Login | Public |
| `/signup` | Sign Up | Public |
| `/event/:id` | Event Details | Public |
| `/register/:id` | Registration Form | **Protected** |
| `/ticket/:ticketId` | Ticket Confirmation | **Protected** |

##  Authentication Flow

1. User signs up or logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token sent with all API requests
5. Protected routes check authentication
6. Unauthorized users redirected to login

##  Technology Stack

- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Styling
- **LocalStorage** - Token persistence

##  Build for Production

```bash
npm run build
```

Creates optimized build in `build/` folder.

##  Testing

### Sign Up Flow
1. Click "Sign Up"
2. Fill form with name, email, password
3. Submit  Auto logged in

### Login Flow
1. Click "Login"
2. Enter email and password
3. Submit  Redirected to home

### Event Registration (Protected)
1. Must be logged in
2. Click event  "Register"
3. Form pre-filled with user info
4. Submit  Get ticket confirmation

### Logout
Click "Logout" button  Logged out and redirected

##  Troubleshooting

**Events not loading?**
- Check backend is running on port 8080
- Verify `.env` file has correct URL
- Check browser console for errors

**Can't login?**
- Verify backend `/api/auth/login` endpoint exists
- Check credentials are correct
- Check Network tab in DevTools

**Protected routes not working?**
- Clear localStorage and login again
- Check token is stored in localStorage
- Verify backend sends valid JWT token

##  License

Created for educational purposes.

---

**Tech Stack**: React  React Router  Axios  Context API  CSS3
