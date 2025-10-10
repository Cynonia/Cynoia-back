import { prisma } from '../config/prisma.js'

export class UserService {
  static async findByEntityId(entityId: number) {
    return prisma.user.findMany({ where: { entitiesId: entityId }, include: { role: true, entity: true } })
  }
}
