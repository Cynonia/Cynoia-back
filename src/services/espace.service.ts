import { prisma } from "../config/prisma.js"

export class EspaceService {
  static async getAll() {
    return prisma.espace.findMany({ include: { entity: true, type: true, reservations: true, equipements: true } })
  }

  static async getById(id: number) {
    return prisma.espace.findUnique({ where: { id }, include: { entity: true, type: true, reservations: true, equipements: true } })
  }

  static async create(data: any) {
    const processed: any = { ...data }
    // Map frontend-friendly ids to Prisma nested connect form
    if (processed.entityId && !processed.entitiesId) {
      processed.entitiesId = processed.entityId
    }
    if (processed.entitiesId) {
      processed.entity = { connect: { id: Number(processed.entitiesId) } }
      delete processed.entitiesId
      delete processed.entityId
    }
    if (processed.typeEspacesId) {
      processed.type = { connect: { id: Number(processed.typeEspacesId) } }
      delete processed.typeEspacesId
    }

    return prisma.espace.create({ data: processed, include: { entity: true, type: true } })
  }

  static async update(id: number, data: any) {
    const processed: any = { ...data }
    if (processed.entityId && !processed.entitiesId) {
      processed.entitiesId = processed.entityId
    }
    if (processed.entitiesId) {
      // For update use connect
      processed.entity = { connect: { id: Number(processed.entitiesId) } }
      delete processed.entitiesId
      delete processed.entityId
    }
    if (processed.typeEspacesId) {
      processed.type = { connect: { id: Number(processed.typeEspacesId) } }
      delete processed.typeEspacesId
    }

    return prisma.espace.update({ where: { id }, data: processed, include: { entity: true, type: true } })
  }

  static async delete(id: number) {
    return prisma.espace.delete({ where: { id } })
  }

  static async findByEntityId(entityId: number) {
    return prisma.espace.findMany({ where: { entitiesId: entityId }, include: { entity: true, type: true, reservations: true, equipements: true } })
  }
}
