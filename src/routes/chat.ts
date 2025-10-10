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
 */
router.get('/', listMyConversations)
/**
 * @swagger
 * /api/v1/chats/{id}/messages:
 *   get:
 *     tags: [Chats]
 *     summary: List messages in a conversation
 */
router.get('/:id/messages', listConversationMessages)
/**
 * @swagger
 * /api/v1/chats/private:
 *   post:
 *     tags: [Chats]
 *     summary: Create or get a private conversation with another user in my entity
 */
router.post('/private', validate(createPrivateChatSchema), createPrivateChat)
/**
 * @swagger
 * /api/v1/chats/group:
 *   post:
 *     tags: [Chats]
 *     summary: Create a group conversation within my entity
 */
router.post('/group', validate(createGroupChatSchema), createGroupChat)
/**
 * @swagger
 * /api/v1/chats/message:
 *   post:
 *     tags: [Chats]
 *     summary: Send a message in a conversation I belong to
 */
router.post('/message', validate(postMessageSchema), postMessage)

export default router
