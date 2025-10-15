import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { sendInvitation } from '../controllers/invitation.controller.js'

const router = Router()
router.use(authMiddleware)

/**
 * @swagger
 * tags:
 *   name: Invitations
 *   description: Manage invitation emails for entity registration
 */
/**
 * @swagger
 * /api/v1/invitations:
 *   post:
 *     tags: [Invitations]
 *     summary: Send an invitation email to join an entity
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [entityId, email]
 *             properties:
 *               entityId:
 *                 type: integer
 *               email:
 *                 type: string
 *                 format: email
 *               roleId:
 *                 type: integer
 *                 description: Optional role id to assign to the invited user (defaults to client)
 *     responses:
 *       201:
 *         description: Invitation sent
 *       400:
 *         description: Validation error
 */
router.post('/', sendInvitation)

export default router
