# E‑Commerce Platform (MERN + TypeScript)

A full-featured e‑commerce application built with MongoDB, Express, React, and Node.js using TypeScript. It includes authentication, product catalog, shopping cart, checkout, and order history. The codebase is structured as a small monorepo with separate `backend` and `frontend` workspaces.

## Tech Stack

- Backend
  - Node.js + Express, TypeScript
  - MongoDB (Mongoose ODM)
  - Auth: JWT
  - Security: express-rate-limit, express-mongo-sanitize, CORS
  - Caching: Redis (ioredis)
  - Logging: winston + daily rotate
- Frontend
  - React + TypeScript (Vite)
  - React Router
  - Material UI (MUI v5)

## Features

- User registration and login (JWT)
- Product listing with seed data and Redis caching
- Shopping cart: add, update, delete items; clear cart
- Checkout to create orders; view order history
- Rate limiting and input sanitization
- Centralized error handling and structured logging

## Monorepo Structure

```
./
├── backend/                  # Express API and business logic (TypeScript)
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Logger, rate limiter, redis
│   │   └── index.ts         # Server entry point
│   ├── public/              # Static assets if any
│   └── nodemon.json         # Dev runner (ts-node)
├── frontend/                 # React client (Vite + MUI)
│   └── src/
│       ├── components/      # Reusable components
│       ├── pages/           # Route views
│       ├── context/         # Auth/Cart providers
│       └── App.tsx          # Routes
└── README.md
```

## Prerequisites

- Node.js 18+
- MongoDB 6+ running locally or in the cloud
- Redis 6+ running locally or in the cloud

## Quickstart

1) Clone

```bash
git clone <your-fork-or-repo-url>
cd E-commerce-using-MERN-stack
```

2) Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env to match your environment
npm run dev
```

By default the server listens on PORT (e.g., 5000). On first start it will seed example products if the database is empty.

3) Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend will be available at http://localhost:5173.

## Environment Variables (backend/.env)

- PORT=5000
- DATABASE_URL=mongodb://localhost:27017/ecommerce
- JWT_SECRET=your_jwt_secret
- REDIS_PASSWORD=            # leave empty if Redis has no password
- REDIS_HOST=127.0.0.1       # optional, current code defaults to 127.0.0.1
- REDIS_PORT=6379            # optional, current code defaults to 6379

Note: `redisClient` currently uses host/port defaults and reads only `REDIS_PASSWORD`. If you change host/port, update the client accordingly.

## API Reference

Base URL: http://localhost:<PORT>

- Auth
  - POST /user/register
  - POST /user/login
  - GET  /user/my-orders        (requires Authorization: Bearer <token>)
- Products
  - GET  /product               (rate limited, cached)
- Cart (requires Authorization: Bearer <token>)
  - GET    /cart
  - DELETE /cart
  - POST   /cart/items          { productId, quantity }
  - PUT    /cart/items          { productId, quantity }
  - DELETE /cart/items/:productId
  - POST   /cart/checkout       { address }

Responses are consistently sent via a response helper with appropriate HTTP status codes. Rate limits protect auth and general APIs.

## Development

- Backend: `npm run dev` (nodemon + ts-node, watches `src/`)
- Frontend: `npm run dev` (Vite HMR)
- Logging: view rotating files under `backend/logs/`
- Data: MongoDB collections for Users, Products, Carts, Orders
- Caching: Redis key `products` caches product list for 60s

## Security

- JWT verification middleware (`validateJWT`)
- Rate limiting for auth and general routes
- `express-mongo-sanitize` to prevent operator injection
- CORS enabled; configure allowed origins as needed

## Introducing AI (ideas and integration points)

- Semantic product search: index product titles/images in a vector DB (e.g., Pinecone, pgvector). Add a `/search` endpoint using embeddings.
- Recommendations: "related items" via content similarity or collaborative filtering. Cache per-product vectors in Redis.
- Conversational shopping assistant: expose `/assistant/chat` backed by an LLM to answer product and order questions.
- Fraud and anomaly detection: simple heuristic or model on cart/checkout patterns.
- Demand forecasting: offline job to predict stock needs and assist restocking.

See `docs/PROJECT_DESCRIPTION.md` for architecture details and an AI roadmap.

## License

MIT

