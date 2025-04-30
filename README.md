# E-Commerce Platform (MERN Stack)

A full-featured e-commerce application built with the **MERN** stack (MongoDB, Express, React, Node.js) and TypeScript. Provides a complete backend REST API and a modern frontend with product management, user authentication, shopping cart, and order processing.

## 🚀 Live Demo

> _Coming soon!_

## 📦 Tech Stack

- **Backend**
  - Node.js + Express
  - TypeScript
  - MongoDB with Mongoose ODM
  - Authentication & Security: JWT, CSRF protection, express-rate-limit, express-mongo-sanitize
  - Validation: Joi
  - Caching: Redis (ioredis)
  - Logging: Winston + winston-daily-rotate-file

- **Frontend**
  - React + TypeScript
  - Vite (Fast HMR)
  - CSS Modules
  - Axios for HTTP client

## ✨ Features

- **User Management**: Sign up, login, and profile management (JWT + CSRF)
- **Product CRUD**: Admin can create, read, update, delete products
- **Catalog & Filters**: Browse products with search and category filtering
- **Shopping Cart**: Add/remove items, adjust quantities
- **Order Processing**: Place orders and view order history
- **Security Improvements**: Rate limiting, input sanitization, secure headers
- **Logging & Monitoring**: Request and error logging with daily rotation

## 🛠️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/FayezAlmedani74/E-commerce-using-MERN-stack.git
cd E-commerce-using-MERN-stack
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env  # configure your DB URI, JWT_SECRET, Redis URL, etc.
npm run dev
```
The API server will run on `http://localhost:5000` by default.

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173`.

## 📁 Folder Structure

```
E-commerce-using-MERN-stack/
├── backend/              # Express API and business logic
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # Mongoose schemas
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   ├── utils/        # Validators, error handlers, logger
│   │   └── index.ts      # Server entry point
│   └── .env.example      # Environment variables template

├── frontend/             # React client
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Route views
│   │   ├── services/     # API calls (Axios)
│   │   ├── styles/       # CSS Modules
│   │   └── main.tsx      # React entry point
│   └── vite.config.ts    # Vite config

└── README.md             # Project documentation
```

## 🌟 Usage

1. Register a new user or login as an existing user
2. Browse the product catalog and add items to your cart
3. Checkout and view your order history
4. Login as an admin (see `.env` for default credentials) to manage products

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ✉️ Contact

Created by Fayez Almedani - feel free to reach out via [LinkedIn](www.linkedin.com/in/fayez-almedani-862b30275) or email at `fayezalmedani74@gmail.com`.

