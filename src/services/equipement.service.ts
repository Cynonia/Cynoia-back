import { prisma } from "../config/prisma.js"

export class EquipementService {
  static async getAll() {
    return prisma.equipement.findMany({ include: { entity: true, espaces: true } })
  }

  static async getById(id: number) {
    return prisma.equipement.findUnique({ where: { id }, include: { entity: true, espaces: true } })
  }

  static async create(data: any) {
    return prisma.equipement.create({ data, include: { entity: true } })
  }

  static async update(id: number, data: any) {
    return prisma.equipement.update({ where: { id }, data, include: { entity: true } })
  }

  static async delete(id: number) {
    return prisma.equipement.delete({ where: { id } })
  }

  static async findByEntityId(entityId: number) {
    return prisma.equipement.findMany({ where: { entitiesId: entityId }, include: { entity: true, espaces: true } })
  }
}
