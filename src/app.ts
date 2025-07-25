import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'

import { errorHandler } from '@/middlewares/errorHandler'
import { notFound } from '@/middlewares/notFound'
import { setupSwagger } from '@/config/swagger'

import authRoutes from '@/routes/auth'
import userRoutes from '@/routes/users'

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
    credentials: true,
  })
)

const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) ?? 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) ?? 100,
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
})
app.use('/api', limiter)

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Setup Swagger documentation
if (process.env.NODE_ENV !== 'production') {
  setupSwagger(app)
}

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the current status of the API server
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthCheck'
 */
// Health check endpoint
app.get('/health', (_req: unknown, res: unknown) => {
  ;(res as { status: (code: number) => { json: (data: unknown) => void } }).status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

const apiVersion = process.env.API_VERSION ?? 'v1'

app.use(`/api/${apiVersion}/auth`, authRoutes)
app.use(`/api/${apiVersion}/users`, userRoutes)

app.use(notFound)
app.use(errorHandler as unknown as express.ErrorRequestHandler)

export default app
