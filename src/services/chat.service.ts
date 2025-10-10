import { prisma } from '../config/prisma.js'

export class ChatService {
  static async ensureSameEntity(userId: number, otherUserIds: number[]) {
    const users = await prisma.user.findMany({
      where: { id: { in: [userId, ...otherUserIds] } },
      select: { id: true, entitiesId: true },
    })
    if (users.length !== (1 + otherUserIds.length)) throw new Error('User not found')
    const entityIds = new Set(users.map(u => u.entitiesId))
    if (entityIds.size > 1) throw new Error('Users must belong to the same entity')
    const [first] = [...entityIds]
    if (first == null) throw new Error('Users must belong to an entity')
    return first as number
  }

  static async createPrivateConversation(creatorId: number, peerUserId: number) {
    const entitiesId = await ChatService.ensureSameEntity(creatorId, [peerUserId])
    // Check if a private conversation already exists between these two users
    const existing = await prisma.conversation.findFirst({
      where: {
        type: 'PRIVATE',
        entitiesId,
        participants: {
          every: { userId: { in: [creatorId, peerUserId] } },
          some: {},
        },
      },
      include: { participants: true },
    })
    if (existing) return existing

    const conv = await prisma.conversation.create({
      data: {
        type: 'PRIVATE',
        entitiesId,
        createdById: creatorId,
        participants: {
          createMany: { data: [{ userId: creatorId }, { userId: peerUserId }] },
        },
      },
      include: { participants: true },
    })
    return conv
  }

  static async createGroupConversation(creatorId: number, name: string, memberIds: number[]) {
    const uniqueMemberIds = Array.from(new Set([creatorId, ...memberIds]))
    const entitiesId = await ChatService.ensureSameEntity(creatorId, uniqueMemberIds.filter(id => id !== creatorId))
    const conv = await prisma.conversation.create({
      data: {
        type: 'GROUP',
        name,
        entitiesId,
        createdById: creatorId,
        participants: {
          createMany: { data: uniqueMemberIds.map((id) => ({ userId: id })) },
        },
      },
      include: { participants: true },
    })
    return conv
  }

  static async listConversations(userId: number) {
    return prisma.conversation.findMany({
      where: { participants: { some: { userId } } },
      include: {
        participants: { include: { user: { select: { id: true, firstName: true, lastName: true } } } },
        messages: { take: 1, orderBy: { createdAt: 'desc' } },
      },
      orderBy: { updatedAt: 'desc' },
    })
  }

  static async listMessages(userId: number, conversationId: number, limit = 50, cursor?: number) {
    // membership check
    const member = await prisma.conversationParticipant.findUnique({
      where: { userId_conversationId: { userId, conversationId } },
    })
    if (!member) throw new Error('Forbidden')

    return prisma.message.findMany({
      where: { conversationId },
      take: limit,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      orderBy: { id: 'desc' },
      include: { sender: { select: { id: true, firstName: true, lastName: true } } },
    })
  }

  static async sendMessage(userId: number, conversationId: number, content: string) {
    const member = await prisma.conversationParticipant.findUnique({
      where: { userId_conversationId: { userId, conversationId } },
    })
    if (!member) throw new Error('Forbidden')

    const message = await prisma.message.create({
      data: { conversationId, senderId: userId, content },
    })
    await prisma.conversation.update({ where: { id: conversationId }, data: { updatedAt: new Date() } })
    return message
  }
}
