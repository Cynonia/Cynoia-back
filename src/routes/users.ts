import { Router } from 'express'
import { HTTP_STATUS } from '@/shared/constants'

interface RouteResponse {
  status: (code: number) => RouteResponse
  json: (data: { success: boolean; message: string }) => void
}

const router = Router()

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

export default router
