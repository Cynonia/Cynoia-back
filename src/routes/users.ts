import { Router } from 'express'
import { HTTP_STATUS } from './../shared/constants/index.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { UserService } from '../services/user.service.js'

interface RouteResponse {
  status: (code: number) => RouteResponse
  json: (data: { success: boolean; message: string }) => void
}

const router = Router()
router.use(authMiddleware)

/**
 * @swagger
 * /api/v1/users/profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve the authenticated user's profile information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/profile', (_req: unknown, res: unknown) => {
  return (res as RouteResponse).status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: 'Get profile endpoint not implemented yet',
  })
})

/**
 * @swagger
 * /api/v1/users/entity/{entityId}:
 *   get:
 *     tags: [Users]
 *     summary: Get users by entity id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: entityId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/entity/:entityId', async (req, res) => {
  try {
    const users = await UserService.findByEntityId(Number((req.params as any).entityId))
    return res.status(200).json({ success: true, data: users })
  } catch (e: any) {
    return res.status(400).json({ success: false, message: e.message })
  }
})

export default router
