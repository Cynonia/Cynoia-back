import { prisma } from "../config/prisma.js"

export class PaymentModeService {
  static async getAll() {
    return prisma.paymentMode.findMany({ include: { transactions: true } })
  }

  static async getById(id: number) {
    return prisma.paymentMode.findUnique({ where: { id }, include: { transactions: true } })
  }

  static async create(data: any) {
    return prisma.paymentMode.create({ data })
  }

  static async update(id: number, data: any) {
    return prisma.paymentMode.update({ where: { id }, data })
  }

  static async delete(id: number) {
    return prisma.paymentMode.delete({ where: { id } })
  }
}
