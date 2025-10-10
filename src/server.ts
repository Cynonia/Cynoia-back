import 'module-alias/register.js';
import 'dotenv/config';
import app from './app.js';
import { createServer } from 'http';
import { prisma } from './config/prisma.js';
import { initSocket } from './config/socket.js';

const PORT = Number(process.env.PORT) || 3000;

const startServer = async () => {
  try {    
    const httpServer = createServer(app);
    const io = initSocket(httpServer, process.env.CORS_ORIGIN ?? 'http://localhost:4200');

    io.on('connection', (socket) => {
      const userId = (socket as any).userId as number;
      // Join a personal room for direct emits
      socket.join(`user:${userId}`);

      socket.on('conversation:join', async (conversationId: number) => {
        // Check membership
        const membership = await prisma.conversationParticipant.findUnique({
          where: { userId_conversationId: { userId, conversationId } },
        });
        if (!membership) return;
        socket.join(`conv:${conversationId}`);
      });

      socket.on('message:send', async (data: { conversationId: number; content: string }) => {
        const { conversationId, content } = data;
        // Verify user is participant
        const membership = await prisma.conversationParticipant.findUnique({
          where: { userId_conversationId: { userId, conversationId } },
        });
        if (!membership) return;
        const message = await prisma.message.create({
          data: { conversationId, senderId: userId, content },
          include: { sender: true },
        });
        io.to(`conv:${conversationId}`).emit('message:new', {
          id: message.id,
          conversationId,
          senderId: message.senderId,
          content: message.content,
          createdAt: message.createdAt,
        });
      });

      socket.on('disconnect', () => {
        // cleanup if needed
      });
    });

    httpServer.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
