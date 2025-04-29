# Subscription Management System

A web application to manage user subscriptions with authentication using Passport.js.

## Features

- User authentication (register, login, logout)
- Create, read, update, and delete subscriptions
- Client-side form validation
- Responsive design with Bootstrap

## Requirements

- Node.js
- MongoDB

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the following variables:
   - PORT=3000
   - MONGO_URI=mongodb://localhost:27017/subscription-management
   - SESSION_SECRET=your_session_secret_here
4. Start the application: `npm start` or `npm run dev` for development

## Project Structure

- `models/`: Database schemas
- `views/`: EJS templates
- `routes/`: API routes
- `middleware/`: Custom middleware functions
- `public/`: Static assets (CSS, JavaScript)
- `config/`: Configuration files

## Schema

### User
- phoneNumber: String (required, unique)
- age: Number (required)
- monthlyIncome: Number
- subscriptions: Array of Subscription references

### Subscription
- plan: String (required, cannot be changed)
- cost: Number (required)
- startDate: Date (required)
- endDate: Date (required)
- user: Reference to User

## Routes

### Authentication
- GET /register - Registration form
- POST /register - Create new account
- GET /login - Login form
- POST /login - Authenticate user
- GET /logout - Logout user

### Subscriptions
- GET /subscriptions - List all user subscriptions
- GET /subscriptions/new - Form to create new subscription
- POST /subscriptions - Create new subscription
- GET /subscriptions/:id - View specific subscription
- GET /subscriptions/:id/edit - Form to edit subscription
- PUT /subscriptions/:id - Update subscription
- DELETE /subscriptions/:id - Delete subscription
# Subscription-Management-Express-EJS
# Subscription-Management-Express-EJS
