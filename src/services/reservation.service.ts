import { prisma } from "../config/prisma.js"
import { CreateReservationDTO, UpdateReservationDTO } from "../dtos/reservation.dtos.js"

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
      user: true,
      transaction: {
        include: {
          paymentMode: true
        }
      }
    }})
  }

  static async getByUserId(userId: number){
    return prisma.reservation.findMany({
      where: { userId },
      include: {
        espace: true,
        user: true,
        reservationEquipements: { include: { equipement: true } },
        transaction: { include: { paymentMode: true } }
      }
    })
  }

  /**
   * Create a new reservation with separate date and time fields
   * @param data - Reservation data with reservationDate (YYYY-MM-DD), startTime (HH:MM), and endTime (HH:MM)
   * @returns Created reservation with related espace data
   */
  static async create(data: CreateReservationDTO) {
    // Convert the separate date and time fields to DateTime objects
    const processedData: any = {
      reservationDate: new Date(data.reservationDate),
      startTime: new Date(`1970-01-01T${data.startTime}`),
      endTime: new Date(`1970-01-01T${data.endTime}`),
      status: data.status,
      espacesId: data.espacesId,
      userId: data.userId,
    }
    // Create reservation
    const reservation = await prisma.reservation.create({ data: processedData })

    // If equipements provided, create join records
    if (data.equipements && data.equipements.length > 0) {
      const toCreate = data.equipements.map((eq: any) => ({
        reservationId: reservation.id,
        equipementId: eq.equipementId,
        quantity: eq.quantity ?? 1,
        price: eq.price ?? undefined,
        state: eq.state ?? undefined,
      }))

      await prisma.reservationEquipement.createMany({ data: toCreate })
    }

    return prisma.reservation.findUnique({ where: { id: reservation.id }, include: { espace: true, reservationEquipements: { include: { equipement: true } } } })
  }

  /**
   * Update an existing reservation with separate date and time fields
   * @param id - Reservation ID to update
   * @param data - Partial reservation data with reservationDate (YYYY-MM-DD), startTime (HH:MM), and endTime (HH:MM)
   * @returns Updated reservation with related espace data
   */
  static async update(id: number, data: UpdateReservationDTO) {
    // Convert the separate date and time fields to DateTime objects if they exist
    const processedData: any = {}
    
    if (data.reservationDate) {
      processedData.reservationDate = new Date(data.reservationDate)
    }
    if (data.startTime) {
      processedData.startTime = new Date(`1970-01-01T${data.startTime}`)
    }
    if (data.endTime) {
      processedData.endTime = new Date(`1970-01-01T${data.endTime}`)
    }
    if (data.status) {
      processedData.status = data.status
    }
    if (data.espacesId) {
      processedData.espacesId = data.espacesId
    }
    
    return prisma.reservation.update({ where: { id }, data: processedData, include: { espace: true } })
  }

  static async delete(id: number) {
    // remove related reservationEquipements first
    await prisma.reservationEquipement.deleteMany({ where: { reservationId: id } })
    return prisma.reservation.delete({ where: { id } })
  }

  static async validateReservation(id: number) {
    // set status to CONFIRMEE
    return prisma.reservation.update({ where: { id }, data: { status: 'CONFIRMEE' } })
  }

  static async refuseReservation(id: number) {
    // set status to REJETEE
    return prisma.reservation.update({ where: { id }, data: { status: 'REJETEE' } })
  }
}
