import { prisma } from "../config/prisma.js"

export class TransactionService {
  static async getAll() {
    return prisma.transaction.findMany({ include: { reservation: true, paymentMode: true } })
  }

  static async getById(id: number) {
    return prisma.transaction.findUnique({ where: { id }, include: { reservation: true, paymentMode: true } })
  }

  static async create(data: any) {
    return prisma.transaction.create({ data, include: { reservation: true, paymentMode: true } })
  }

  static async update(id: number, data: any) {
    return prisma.transaction.update({ where: { id }, data, include: { reservation: true, paymentMode: true } })
  }

  static async delete(id: number) {
    return prisma.transaction.delete({ where: { id } })
  }

  static async findByEntityId(entityId: number) {
    return prisma.transaction.findMany({
      where: { reservation: { espace: { entitiesId: entityId } } },
      include: { reservation: true, paymentMode: true },
    })
  }
}
