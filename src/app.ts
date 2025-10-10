import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { logger } from '@sonatel-os/juf-xpress-logger-edge'

import { errorHandlerMiddleware } from './middlewares/errors.middleware.js'
import { logRequestMiddleware } from './middlewares/logger.middleware.js'
import { notFound } from './middlewares/notFound.js'
import { setupSwagger } from './config/swagger.js'

import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import entityRoutes from './routes/entity.js'
import roleRoutes from './routes/role.js'
import espaceRoutes from './routes/espace.js'
import equipementRoutes from './routes/equipement.js'
import reservationRoutes from './routes/reservation.js'
import transactionRoutes from './routes/transaction.js'
import paymentModeRoutes from './routes/paymentmode.js'
import chatRoutes from './routes/chat.js'
import invitationRoutes from './routes/invitation.js'

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:4200',
    credentials: true,
  })
)

logger.bootstrap({
  // appName: 'cynoia-spaces-backend',
  crypt: ['password', 'authorization'],
  logLevel: 'info',
  startApmAgent: false,
  // logDir: ""
})
app.use(logRequestMiddleware)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
})
app.use('/api', limiter)

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

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
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

app.get('/', (_req, res) => {
  res.status(200).json({
    message: '🚀 Cynoia backend is running',
    health: '/health',
    docs: process.env.NODE_ENV !== 'production' ? '/docs' : undefined,
    version: process.env.API_VERSION ?? 'v1'
  })
})

const apiVersion = process.env.API_VERSION ?? 'v1'

app.use(`/api/${apiVersion}/auth`, authRoutes)
app.use(`/api/${apiVersion}/users`, userRoutes)
app.use(`/api/${apiVersion}/entities`, entityRoutes)
app.use(`/api/${apiVersion}/roles`, roleRoutes)
app.use(`/api/${apiVersion}/espaces`, espaceRoutes)
app.use(`/api/${apiVersion}/equipements`, equipementRoutes)
app.use(`/api/${apiVersion}/reservations`, reservationRoutes)
app.use(`/api/${apiVersion}/transactions`, transactionRoutes)
app.use(`/api/${apiVersion}/paymentmodes`, paymentModeRoutes)
app.use(`/api/${apiVersion}/chats`, chatRoutes)
app.use(`/api/${apiVersion}/invitations`, invitationRoutes)

app.use(errorHandlerMiddleware)
app.use(notFound)

export default app
