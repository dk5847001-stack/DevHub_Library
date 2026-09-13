# Zerodha Clone

A full-stack stock trading platform inspired by Zerodha, built with React, Node.js, Express, MongoDB, and JWT-based authentication.

The project demonstrates a modern trading dashboard with user authentication, portfolio holdings, positions, watchlist, and order management.

---

## 🚀 Live Demo

- **Frontend:** https://zerodha-frontend-5h7s.onrender.com
- **Dashboard:** https://devhub-library.onrender.com
- **Backend API:** https://zerodha-backend-gpaq.onrender.com

> Replace the above URLs with your actual deployed Render URLs.

---

## 📌 Features

### 🔐 Authentication

- User Signup
- User Login
- JWT-based authentication
- HTTP-only authentication cookies
- Protected routes
- Logout functionality
- Role-based authentication support
- Password hashing using bcrypt

### 📊 Trading Dashboard

- Trading dashboard interface
- Watchlist
- Portfolio summary
- Holdings
- Positions
- Order management
- Buy/Sell action interface
- User-specific dashboard access

### 🗄️ Backend

- RESTful API using Express.js
- MongoDB database integration
- Mongoose ODM
- Authentication middleware
- Admin middleware
- Rate limiting
- CORS configuration
- Helmet security middleware
- Cookie-based authentication

### 🎨 Frontend

- React.js
- React Router
- Vite
- Tailwind CSS
- Material UI
- Responsive user interface
- Separate Login/Signup application
- Separate Trading Dashboard application

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Tailwind CSS
- Material UI

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Cookie Parser
- Helmet
- CORS
- Express Rate Limit

### Deployment

- GitHub
- Render
- MongoDB Atlas

---

## 📂 Project Structure

```text
ZERODHA/
│
├── Backend/
│   ├── config/
│   │   └── dbConfig.js
│   │
│   ├── middleware/
│   │   ├── adminMiddleware.js
│   │   ├── authMiddleware.js
│   │   ├── loginRateLimiter.js
│   │   └── signupRateLimiter.js
│   │
│   ├── models/
│   │   ├── Holdings.js
│   │   ├── Order.js
│   │   ├── Positions.js
│   │   └── User.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── Frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
├── Dashboard/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
└── README.md
