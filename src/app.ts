import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { logger } from '@sonatel-os/juf-xpress-logger-edge';

import { errorHandlerMiddleware } from './middlewares/errors.middleware.js';
import { logRequestMiddleware } from './middlewares/logger.middleware.js';
import { notFound } from './middlewares/notFound.js'
import { setupSwagger } from './config/swagger.js'

import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import entityRoutes from './routes/entity.js'

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:4200',
    credentials: true,
  })
)

// Setting up the logger middleware

logger.bootstrap({
  // appName: 'cynoia-spaces-backend',
  crypt: ['password', 'authorization'],
  logLevel: 'info',
  startApmAgent: false,
  // logDir: ""
});

app.use(logRequestMiddleware);



const limiter = rateLimit({
  windowMs:  15 * 60 * 1000,
  max:  100,
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
})
app.use('/api', limiter)


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
  (res as { status: (code: number) => { json: (data: unknown) => void } }).status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

const apiVersion = process.env.API_VERSION ?? 'v1'

app.use(`/api/${apiVersion}/auth`, authRoutes)
app.use(`/api/${apiVersion}/users`, userRoutes)
app.use(`/api/${apiVersion}/entities`, entityRoutes)



app.use(errorHandlerMiddleware);


app.use(notFound)

export default app
