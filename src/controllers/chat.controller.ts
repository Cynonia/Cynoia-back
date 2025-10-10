import { Request, Response } from 'express'
import { ChatService } from '../services/chat.service.js'
import { getIO } from '../config/socket.js'

export const createPrivateChat = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id
    const { peerUserId } = req.body as { peerUserId: number }
    const conv = await ChatService.createPrivateConversation(userId, Number(peerUserId))
    getIO().to(`user:${userId}`).emit('conversation:created', conv)
    res.status(201).json(conv)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

export const createGroupChat = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id
    const { name, memberIds } = req.body as { name: string; memberIds: number[] }
    const conv = await ChatService.createGroupConversation(userId, name, memberIds.map(Number))
    getIO().to(`conv:${conv.id}`).emit('conversation:created', conv)
    res.status(201).json(conv)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

export const listMyConversations = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id
    const list = await ChatService.listConversations(userId)
    res.json(list)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

export const listConversationMessages = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id
    const conversationId = Number(req.params.id)
    const { limit, cursor } = req.query
    const msgs = await ChatService.listMessages(userId, conversationId, limit ? Number(limit) : 50, cursor ? Number(cursor) : undefined)
    res.json(msgs)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

export const postMessage = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id
    const { conversationId, content } = req.body as { conversationId: number; content: string }
    const msg = await ChatService.sendMessage(userId, Number(conversationId), content)
    getIO().to(`conv:${conversationId}`).emit('message:new', msg)
    res.status(201).json(msg)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}
