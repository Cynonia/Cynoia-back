import { prisma } from "../config/prisma.js"

export class RoleService {
  static async getAll() {
    return prisma.role.findMany({ include: { entities: true, users: true } })
  }

  static async getById(id: number) {
    return prisma.role.findUnique({ where: { id }, include: { entities: true, users: true } })
  }

  static async create(data: any) {
    return prisma.role.create({ data, include: { entities: true } })
  }

  static async update(id: number, data: any) {
    return prisma.role.update({ where: { id }, data, include: { entities: true } })
  }

  static async delete(id: number) {
    return prisma.role.delete({ where: { id } })
  }
}
