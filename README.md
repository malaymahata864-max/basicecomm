# Ecom

A full-stack e-commerce application built with a Node/Express backend, MongoDB, React, Redux Toolkit, and Vite. The app supports product browsing, cart and checkout flows, user authentication with HTTP-only cookies, admin product management, order management, analytics, image uploads through Cloudinary, and product ratings.
LIVE:-https://basicecomm.onrender.com/
## Features

- Product catalog with category browsing and featured products
- Product details, cart, checkout, and order history
- User registration, login, logout, and profile access
- Admin dashboard for analytics and product CRUD
- Product image uploads with Cloudinary and Multer
- Order creation and status management
- Product ratings with average rating display
- Production-ready backend that can serve the frontend build

## Tech Stack

- Frontend: React, React Router, Redux Toolkit, Axios, Vite, Tailwind CSS
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, CORS, cookie-parser
- Integrations: Cloudinary, Nodemailer

## Project Structure

```text
.
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   └── utilities
└── frontend
    ├── src
    │   ├── api
    │   ├── components
    │   ├── pages
    │   ├── routes
    │   └── store
    └── public
```

## Prerequisites

- Node.js 18+ recommended
- MongoDB connection string
- Cloudinary account for image uploads

## Setup

1. Install dependencies from the project root:

   ```bash
   npm run install-all
   ```

2. Create a backend `.env` file in `backend/` with the required values:

   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=http://localhost:5173

   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   EMAIL_USER=your_email_user
   EMAIL_PASS=your_email_password
   ```

3. Start the app in development:

   ```bash
   npm run dev
   ```

   The backend runs on `http://localhost:5000` and the frontend runs on the Vite dev server.

## Available Scripts

From the project root:

- `npm run install-all` installs root, backend, and frontend dependencies
- `npm run dev` starts the backend and frontend together
- `npm run start` starts the backend only
- `npm run start:backend` starts the backend in dev mode
- `npm run start:frontend` starts the frontend in dev mode
- `npm run build` installs dependencies and builds the frontend
- `npm run seed` seeds the database with demo users and sample products

From `backend/`:

- `npm run dev` starts the API with nodemon
- `npm start` starts the API with node
- `npm run seed` seeds demo data

From `frontend/`:

- `npm run dev` starts Vite
- `npm run build` builds the frontend for production
- `npm run preview` previews the production build

## API Overview

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/users`  
  Admin only

### Products

- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`  
  Admin only, with image upload
- `PUT /api/products/:id`  
  Admin only, with image upload
- `PUT /api/products/:id/rating`  
  Logged-in users can rate products
- `DELETE /api/products/:id`  
  Admin only

### Orders

- `GET /api/orders`  
  Admin only
- `GET /api/orders/:id`
- `GET /api/orders/user/:userId`
- `POST /api/orders`
- `PUT /api/orders/:id`  
  Admin only
- `DELETE /api/orders/:id`

### Analytics

- `GET /api/analytics`  
  Admin only

## Demo Data

Run `npm run seed` to load sample products and users. The seed script creates these demo accounts:

- Admin: `admin@example.com` / `Admin@123`
- User: `user1@example.com` / `User@123`
- User: `user2@example.com` / `User@123`

## Notes

- The backend uses HTTP-only cookies for auth sessions.
- Product ratings are stored as individual votes and displayed using the average rating value.
- In production, the backend serves the frontend build from `frontend/dist`.
