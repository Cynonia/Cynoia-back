import { prisma } from "../config/prisma.js"

function computeTotalAmount(reservation: any): number {
  if (!reservation) return 0
  // Calculate duration in hours
  let hours = 0
  if (reservation.startTime && reservation.endTime) {
    const start = new Date(reservation.startTime)
    const end = new Date(reservation.endTime)
    hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
    if (hours < 0) hours = 0
  }
  // Espace price
  const espacePrice = reservation.espace?.pricePerHour ?? 0
  const espaceTotal = espacePrice * hours
  // Equipements
  const equipementsTotal = (reservation.reservationEquipements || []).reduce((sum: number, eq: any) => {
    const price = eq.price ?? eq.equipement?.price ?? 0
    return sum + price * (eq.quantity ?? 1)
  }, 0)
  return espaceTotal + equipementsTotal
}

export class TransactionService {
  static async getAll() {
    const txs = await prisma.transaction.findMany({
      include: {
        reservation: {
          include: {
            espace: true,
            reservationEquipements: { include: { equipement: true } }
          }
        },
        paymentMode: true
      }
    })
    return txs.map(tx => ({
      ...tx,
      totalAmount: computeTotalAmount(tx.reservation)
    }))
  }

  static async getById(id: number) {
    const tx = await prisma.transaction.findUnique({
      where: { id },
      include: {
        reservation: {
          include: {
            espace: true,
            reservationEquipements: { include: { equipement: true } }
          }
        },
        paymentMode: true
      }
    })
    if (!tx) return null
    return { ...tx, totalAmount: computeTotalAmount(tx.reservation) }
  }

  static async create(data: any) {
    const tx = await prisma.transaction.create({
      data,
      include: {
        reservation: {
          include: {
            espace: true,
            reservationEquipements: { include: { equipement: true } }
          }
        },
        paymentMode: true
      }
    })
    return { ...tx, totalAmount: computeTotalAmount(tx.reservation) }
  }

  static async update(id: number, data: any) {
    const tx = await prisma.transaction.update({
      where: { id },
      data,
      include: {
        reservation: {
          include: {
            espace: true,
            reservationEquipements: { include: { equipement: true } }
          }
        },
        paymentMode: true
      }
    })
    return { ...tx, totalAmount: computeTotalAmount(tx.reservation) }
  }

  static async delete(id: number) {
    return prisma.transaction.delete({ where: { id } })
  }

  static async findByEntityId(entityId: number) {
    const txs = await prisma.transaction.findMany({
      where: { reservation: { espace: { entitiesId: entityId } } },
      include: {
        reservation: {
          include: {
            espace: true,
            reservationEquipements: { include: { equipement: true } }
          }
        },
        paymentMode: true
      }
    })
    return txs.map(tx => ({
      ...tx,
      totalAmount: computeTotalAmount(tx.reservation)
    }))
  }

  static async findByUserId(userId: number) {
    const txs = await prisma.transaction.findMany({
      where: { reservation: { userId } },
      include: {
        reservation: {
          include: {
            espace: true,
            reservationEquipements: { include: { equipement: true } }
          }
        },
        paymentMode: true
      }
    })
    return txs.map(tx => ({
      ...tx,
      totalAmount: computeTotalAmount(tx.reservation)
    }))
  }
}
