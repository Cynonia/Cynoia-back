import { prisma } from "../config/prisma.js"

export class ReservationService {
  static async getAll() {
    return prisma.reservation.findMany({ include: { espace: true, transaction: true } })
  }

  static async getById(id: number) {
    return prisma.reservation.findUnique({ where: { id }, include: { espace: true, transaction: true } })
  }

  static async getByEntityId(id: number){
    return prisma.reservation.findMany({where: {
        espace: {
          entitiesId: id
        }
    },include:{
      espace: true,
      transaction: {
        include: {
          paymentMode: true
        }
      }
    }})
  }

  static async create(data: any) {
    return prisma.reservation.create({ data, include: { espace: true } })
  }

  static async update(id: number, data: any) {
    return prisma.reservation.update({ where: { id }, data, include: { espace: true } })
  }

  static async delete(id: number) {
    return prisma.reservation.delete({ where: { id } })
  }
}
