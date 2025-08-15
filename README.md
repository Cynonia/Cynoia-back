# Cynoia Backend

Backend API for Cynoia workspace management system, built with **Express.js**, **TypeScript**, **Prisma**, and **PostgreSQL**.

## 🚀 Features

- **TypeScript** (strict, ES2022 target)
- **Express.js** with security middlewares (helmet, cors, rate limiting)
- **Prisma ORM** with PostgreSQL (Docker/Podman ready)
- **JWT Authentication** with bcrypt password hashing
- **Input Validation** using Zod schemas
- **Error Handling** with custom middleware
- **OpenAPI/Swagger** docs at `/api-docs`
- **Code Quality**: ESLint, Prettier
- **Hot Reload** dev environment

## 📁 Project Structure

```bash
src/
├── config/           # DB, JWT, Swagger config
├── middlewares/      # Express middlewares (auth, validation, errors)
├── models/           # Prisma models (see prisma/schema.prisma)
├── routes/           # API route handlers
├── schemas/          # Zod validation schemas
├── shared/           # Constants and utilities
│   ├── constants/    # HTTP status, user roles, etc.
│   └── utils/        # Helper functions
└── types/            # TypeScript type definitions
prisma/
└── schema.prisma     # Prisma schema
```

## 🛠️ Development

### Prerequisites

- Node.js 20+
- Docker or Podman (for PostgreSQL)
- PostgreSQL (local or cloud, see `.env`)

### Setup

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations (if needed)
npx prisma migrate dev
```

#### Using Docker (PostgreSQL)

```bash
docker-compose up -d
```

#### Using Podman (PostgreSQL)

```bash
sudo podman run -d --name cynoia-postgres -p 5432:5432 \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=cynoia_db \
  docker.io/library/postgres:16
```

#### Start development server

```bash
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Lint code with ESLint
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # TypeScript type checking
npm run test         # Run tests
```

## 🌐 API Endpoints

- `GET /health` - Health check
- `GET /api-docs` - Swagger docs
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/users/profile` - Get user profile (protected)
- `CRUD /api/v1/entities` - Entity management (protected, role-based)

## 🎯 TypeScript Best Practices

- **Strict type checking** (`tsconfig.json`)
- **Type inference** preferred
- **Consistent type imports** (`import type`)
- **Nullish coalescing** (`??`) and optional chaining (`?.`)
- **Immutable data** (`const`, `readonly`)
- **Modern ES2022** features
- **No explicit any** types
- **Functional programming** principles

## 🔧 Configuration

### Environment Variables (`.env`)

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/cynoia_db
JWT_SECRET=your-secret-key
API_VERSION=v1
CORS_ORIGIN=http://localhost:3000
```

## 📦 Dependencies

### Production

- express
- prisma / @prisma/client
- bcryptjs
- jsonwebtoken
- zod
- helmet
- cors
- morgan
- swagger-ui-express
- swagger-jsdoc

### Development

- typescript
- tsx
- eslint
- prettier
- module-alias
- @types/*

## 🎨 Code Style

- **No semicolons** (Prettier)
- **Single quotes** for strings
- **2 spaces** indentation
- **Trailing commas** for ES5 compatibility
- **Arrow functions** with minimal parentheses
- **Simple and clean** - no over-engineering

---

This project follows functional programming principles and keeps things simple without over-engineering.
