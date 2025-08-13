# Project Description

This repository contains a TypeScript-based MERN e‑commerce platform split into a backend API and a React frontend.

## Architecture Overview

- Backend (Express + TypeScript)
  - Routes: `user`, `product`, `cart`
  - Controllers delegate to Services for business logic
  - Models: `User`, `Product`, `Cart`, `Order` (Mongoose)
  - Utilities: `logger` (winston daily rotate), `rateLimiter`, `redisClient`, error handler, response helper
  - Security: JWT auth, rate limiting, input sanitization, CORS
  - Caching: Redis for product list and room to extend
- Frontend (React + Vite + TypeScript + MUI)
  - Pages: Home, Register, Login, Cart, Checkout, My Orders, Order Success, Forgot Password
  - Context providers for Auth and Cart
  - React Router for navigation

## Backend Highlights

- `src/index.ts` wires up Express, Mongo, Redis, routes, sanitization, and error handling
- `services/productService.ts` handles product queries and includes a seed function with Redis caching
- `middlewares/validateJWT.ts` validates JWT and attaches the user to the request
- Rate limiting via `utils/rateLimiter.ts` for API and auth endpoints

## Frontend Highlights

- `src/App.tsx` defines routes and guards (`ProtectedRoute`)
- MUI theme foundation in `main.tsx` with palette and typography
- Components like `Navbar` and `ProductCard` provide a baseline UX

## Local Development

- Backend dev command: `npm run dev` (nodemon + ts-node)
- Frontend dev command: `npm run dev` (Vite HMR)
- Default ports: backend `5000`, frontend `5173`

## Testing Ideas (not yet implemented)

- Unit tests for services (Jest + ts-jest)
- Supertest API tests for controllers/routes
- React component tests (Vitest + Testing Library)

## Deployment Notes

- Configure environment variables (see `backend/.env.example`)
- Serve frontend separately (e.g., Vercel/Netlify) or behind a reverse proxy
- Use a managed MongoDB and Redis (MongoDB Atlas, Upstash/Redis Cloud)
- Configure log rotation retention and shipping if needed (e.g., to CloudWatch)

---

# AI Integration Plan

This app can benefit from AI in several incremental steps. Below are practical proposals with effort/impact and implementation notes.

## 1) Semantic Product Search (Embeddings)

- Impact: High; improves discovery beyond keyword search
- Effort: Medium
- Approach:
  - Generate embeddings for product titles/descriptions using an embedding model
  - Store vectors in a vector DB (Pinecone, Weaviate, pgvector, or Redis vectors)
  - Add endpoint `GET /search?query=` that returns nearest neighbors
  - UI: search box on HomePage; fallback to keyword search

## 2) Related Products / Recommendations

- Impact: Medium-High; boosts AOV and UX
- Effort: Medium
- Approach:
  - Content-based similarity using the same product embeddings
  - For collaborative filtering, compute "users who bought X also bought Y" periodically (batch job)
  - Cache recommendations per product in Redis for quick retrieval

## 3) Conversational Assistant

- Impact: Medium; improves support and onboarding
- Effort: Medium
- Approach:
  - Add `/assistant/chat` endpoint that forwards user messages to an LLM with tools: product search, order status lookup (auth required)
  - Guardrails with rate limits and safety filters
  - UI: floating chat widget on the frontend

## 4) Basic Fraud / Anomaly Detection

- Impact: Medium; mitigates abuse
- Effort: Low-Medium
- Approach:
  - Simple rules: velocity limits, unusual quantities, mismatched shipping vs billing
  - Optionally train a small anomaly detector offline and flag risk during `/cart/checkout`

## 5) Demand Forecasting (Offline)

- Impact: Medium; inventory planning
- Effort: Medium-High
- Approach:
  - Export orders to a data store
  - Run a scheduled job to fit a forecasting model (e.g., Prophet, ARIMA, or lightweight ML)
  - Surface a dashboard for suggested restocks

## Minimal Viable AI Stack

- Embeddings: hosted service (ensure privacy) or open-source models
- Vector DB: Redis with vector similarity or pgvector
- LLM: hosted API with strict token and cost limits; implement retries/timeouts
- Observability: log inference latency and cache results where possible

## Security and Privacy

- Do not send PII to external AI services
- Mask emails, addresses, etc. if used for recommendations
- Provide opt-out in the UI and document data usage

## Milestone Sequence

1. Add keyword search to Products API (baseline)
2. Add embeddings and semantic search endpoint
3. Add related products endpoint and UI modules
4. Add assistant endpoint and chat widget
5. Introduce offline jobs for recommendations/demand forecasting