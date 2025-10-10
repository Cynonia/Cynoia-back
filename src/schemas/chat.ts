import { z } from 'zod'

export const createPrivateChatSchema = z.object({
  peerUserId: z.number().int().positive(),
})

export const createGroupChatSchema = z.object({
  name: z.string().min(1),
  memberIds: z.array(z.number().int().positive()).min(1),
})

export const postMessageSchema = z.object({
  conversationId: z.number().int().positive(),
  content: z.string().min(1),
})
