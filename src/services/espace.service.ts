import { prisma } from "../config/prisma.js"

export class EspaceService {
  static async getAll() {
    return prisma.espace.findMany({ include: { entity: true, type: true, reservations: true, equipements: true } })
  }

  static async getById(id: number) {
    return prisma.espace.findUnique({ where: { id }, include: { entity: true, type: true, reservations: true, equipements: true } })
  }

  static async create(data: any) {
    return prisma.espace.create({ data, include: { entity: true, type: true } })
  }

  static async update(id: number, data: any) {
    return prisma.espace.update({ where: { id }, data, include: { entity: true, type: true } })
  }

  static async delete(id: number) {
    return prisma.espace.delete({ where: { id } })
  }
}
