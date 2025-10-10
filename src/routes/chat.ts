import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { createGroupChat, createPrivateChat, listConversationMessages, listMyConversations, postMessage } from '../controllers/chat.controller.js'
import validate from '../middlewares/validate.js'
import { createGroupChatSchema, createPrivateChatSchema, postMessageSchema } from '../schemas/chat.js'

const router = Router()

router.use(authMiddleware)

/**
 * @swagger
 * tags:
 *   name: Chats
 *   description: Private and group chat within same entity
 */
/**
 * @swagger
 * /api/v1/chats:
 *   get:
 *     tags: [Chats]
 *     summary: List my conversations
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of conversations with last message
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Conversation'
 */
router.get('/', listMyConversations)
/**
 * @swagger
 * /api/v1/chats/{id}/messages:
 *   get:
 *     tags: [Chats]
 *     summary: List messages in a conversation
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Array of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 */
router.get('/:id/messages', listConversationMessages)
/**
 * @swagger
 * /api/v1/chats/private:
 *   post:
 *     tags: [Chats]
 *     summary: Create or get a private conversation with another user in my entity
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [peerUserId]
 *             properties:
 *               peerUserId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: The created or existing conversation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conversation'
 */
router.post('/private', validate(createPrivateChatSchema), createPrivateChat)
/**
 * @swagger
 * /api/v1/chats/group:
 *   post:
 *     tags: [Chats]
 *     summary: Create a group conversation within my entity
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, memberIds]
 *             properties:
 *               name:
 *                 type: string
 *               memberIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: The created group conversation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conversation'
 */
router.post('/group', validate(createGroupChatSchema), createGroupChat)
/**
 * @swagger
 * /api/v1/chats/message:
 *   post:
 *     tags: [Chats]
 *     summary: Send a message in a conversation I belong to
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [conversationId, content]
 *             properties:
 *               conversationId:
 *                 type: integer
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
router.post('/message', validate(postMessageSchema), postMessage)

export default router
