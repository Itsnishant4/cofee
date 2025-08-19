# Coffee Shop Website (MERN Stack)

This is a complete Coffee Shop Website built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with Tailwind CSS for styling.

## Features

### Frontend (React + Tailwind CSS)
- **Landing Page**: Hero section with coffee shop branding, featured coffee image, and CTA buttons (Order Now, View Menu).
- **Menu Page**: Displays coffee categories with product cards (image, name, price, description, Add to Cart).
- **Cart & Checkout Page**: Shows selected items, total price, and checkout button.
- **About Page**: Coffee shop story, mission, and high-quality images.
- **Contact Page**: Form with name, email, message, and location map integration.
- **Authentication Pages**: Signup, Login, Forgot Password.
- **Responsive Design**: Modern UI with dark & light theme toggle.
- **State Management**: Redux Toolkit.
- **Notifications**: React Hot Toast.
- **SEO Optimization**: React Helmet Async for meta tags.

### Backend (Node.js + Express.js)
- **RESTful APIs**:
    - User Authentication (JWT-based login & signup)
    - Product Management (CRUD for coffee items)
    - Cart & Orders Management
    - Contact form submissions
- **Middleware**: For authentication & error handling.

### Database (MongoDB)
- **Collections**:
    - `Users`: (name, email, password, role [admin/user])
    - `Products`: (name, description, price, category, image)
    - `Orders`: (userId, items, totalAmount, status)
    - `Messages`: (name, email, message, createdAt)

### Admin Dashboard
- Manage Products (Add, Edit, Delete)
- View Orders with statuses (Pending, Completed, Canceled)
- View Contact Form Submissions

### Extra Features
- **Payment Integration**: Stripe (backend only, frontend integration would require a payment gateway specific UI).
- **JWT Authentication**: Protected routes.
- **Toast notifications**: Success/error messages.
- **SEO optimized meta tags**.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Axios, React Router, Redux Toolkit, React Hot Toast, React Helmet Async.
- **Backend**: Node.js, Express.js, JWT, bcryptjs, Mongoose, express-async-handler, Stripe.
- **Database**: MongoDB (via MongoDB Atlas for deployment).

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/coffee-shop-mern.git
cd coffee-shop-mern
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add the following environment variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
STRIPE_SECRET_KEY=your_stripe_secret_key
```

- `MONGO_URI`: Your MongoDB connection string (e.g., from MongoDB Atlas).
- `JWT_SECRET`: A strong, random string for JWT signing.
- `JWT_EXPIRE`: Token expiration time (e.g., `30d` for 30 days).
- `STRIPE_SECRET_KEY`: Your secret key from Stripe.

Run the backend server:

```bash
npm start
```

The backend server will run on `http://localhost:5000`.

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory and add the following environment variables:

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

- `REACT_APP_API_URL`: The URL of your backend API.
- `REACT_APP_STRIPE_PUBLISHABLE_KEY`: Your publishable key from Stripe.

Run the frontend development server:

```bash
npm start
```

The frontend application will open in your browser at `http://localhost:3000`.

## Project Structure

```
.
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/ (images, etc.)
│   │   ├── components/ (reusable React components like Header, Footer, SEO)
│   │   ├── contexts/ (ThemeContext)
│   │   ├── pages/ (main application pages like Home, Menu, Cart, Checkout, Auth)
│   │   ├── redux/
│   │   │   ├── slices/ (authSlice, productSlice, cartSlice, orderSlice, messageSlice)
│   │   │   └── store.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── index.js
│   ├── package.json
│   ├── postcss.config.js
│   └── tailwind.config.js
└── server/
    ├── config/ (db connection)
    ├── controllers/ (auth, product, order, message, payment logic)
    ├── middleware/ (authMiddleware, errorMiddleware)
    ├── models/ (Mongoose schemas for User, Product, Order, Message)
    ├── routes/ (API routes for auth, products, orders, messages, payment)
    ├── .env
    ├── package.json
    └── server.js
```

## Deployment

### Frontend
The frontend (React app) can be deployed to platforms like Vercel or Netlify.
- Build the React app: `cd client && npm run build`
- Deploy the `build` folder.

### Backend
The backend (Node.js/Express.js) can be deployed to platforms like Render or Heroku.
- Ensure your `MONGO_URI`, `JWT_SECRET`, `STRIPE_SECRET_KEY` environment variables are configured on the hosting platform.

### Database
MongoDB Atlas is recommended for hosting your MongoDB database.

## Contributing

Feel free to fork the repository and contribute!

## License

This project is licensed under the MIT License.
