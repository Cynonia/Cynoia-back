import type { Server as HTTPServer } from 'http'
import { Server as SocketIOServer, type Socket } from 'socket.io'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../shared/constants/index.js'

let ioInstance: SocketIOServer | null = null

export const initSocket = (server: HTTPServer, origin: string) => {
  const io = new SocketIOServer(server, {
    cors: { origin, credentials: true },
  })

  io.use((socket: Socket, next) => {
    try {
      const token = (socket.handshake.auth as any)?.token || socket.handshake.headers.authorization?.toString().split(' ')[1]
      if (!token) return next(new Error('Unauthorized'))
      const payload = jwt.verify(token, JWT_SECRET) as { id: number }
      ;(socket as any).userId = payload.id
      next()
    } catch (e) {
      next(new Error('Invalid token'))
    }
  })

  ioInstance = io
  return io
}

export const getIO = () => {
  if (!ioInstance) throw new Error('Socket.io not initialized')
  return ioInstance
}
