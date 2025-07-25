# Cynoia Backend

Simple and clean backend API for Cynoia user management system, built with **Express.js**, **TypeScript**, and **MongoDB**.

## 🚀 Features

- **TypeScript** with strict configuration and ES2022 target
- **Express.js** with security middlewares (helmet, cors, rate limiting)
- **MongoDB** with Mongoose ODM and Docker container
- **JWT Authentication** with bcrypt password hashing
- **Input Validation** using Zod schemas
- **Error Handling** with custom middleware
- **Code Quality** with ESLint and Prettier
- **Hot Reload** development environment

## 📁 Project Structure

```
src/
├── config/           # Database and JWT configuration
├── middlewares/      # Express middlewares (auth, validation, errors)
├── models/          # Mongoose models
├── routes/          # API route handlers
├── schemas/         # Zod validation schemas
├── shared/          # Constants and utilities
│   ├── constants/   # Application constants
│   └── utils/       # Helper functions
└── types/           # TypeScript type definitions
```

## 🛠️ Development

### Prerequisites
- Node.js 18+
- Docker/Podman for MongoDB

### Setup
```bash
# Install dependencies
npm install

# Start MongoDB container
sudo podman run -d --name cynoia-mongo -p 27017:27017 \\
  -e MONGO_INITDB_ROOT_USERNAME=admin \\
  -e MONGO_INITDB_ROOT_PASSWORD=password \\
  -e MONGO_INITDB_DATABASE=cynoia_db \\
  -v $(pwd)/mongo-init:/docker-entrypoint-initdb.d \\
  docker.io/library/mongo:7.0

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Lint code with ESLint
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # TypeScript type checking
```

## 🌐 API Endpoints

- `GET /health` - Health check
- `POST /api/v1/auth/register` - User registration (placeholder)
- `POST /api/v1/auth/login` - User login (placeholder)
- `GET /api/v1/users/profile` - Get user profile (placeholder)

## 🎯 TypeScript Best Practices Applied

- **Strict type checking** with comprehensive TypeScript configuration
- **Type inference** preferred over explicit typing where obvious
- **Consistent type imports** using `import type`
- **Nullish coalescing** (`??`) and optional chaining (`?.`)
- **Immutable data** with `const` and `readonly` where appropriate
- **Modern ES2022** features for better performance and readability
- **No explicit any** types - everything properly typed

## 🔧 Configuration

### Environment Variables
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://cynoia_user:cynoia_password@localhost:27017/cynoia_db
JWT_SECRET=your-secret-key
API_VERSION=v1
CORS_ORIGIN=http://localhost:3000
```

### Why ES2022?
ES2022 provides modern JavaScript features:
- Top-level await
- Private class fields
- Static class blocks
- Error.cause
- Array.at() method
- Object.hasOwn()
- Better performance and cleaner syntax

## 📦 Dependencies

### Production
- express - Web framework
- mongoose - MongoDB ODM
- bcryptjs - Password hashing
- jsonwebtoken - JWT implementation
- zod - Runtime validation
- helmet - Security headers
- cors - CORS handling
- morgan - Request logging

### Development
- typescript - Type checking
- tsx - TypeScript runtime
- eslint - Code linting
- prettier - Code formatting
- @types/* - TypeScript definitions

## 🎨 Code Style

- **No semicolons** (Prettier configuration)
- **Single quotes** for strings
- **2 spaces** indentation
- **Trailing commas** for ES5 compatibility
- **Arrow functions** with minimal parentheses

This project follows functional programming principles and keeps things simple without over-engineering.
