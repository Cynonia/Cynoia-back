// src/services/entity.service.ts
import { prisma } from './../config/prisma.js'
import { CreateEntityDTO, UpdateEntityDTO } from './../dtos/entity.dtos.js'
import { cleanUndefined,WrapUpdateField } from './../utils/zodPrismaNormalizer.js'

export class EntityService {
  static async create(data: CreateEntityDTO) {
    return prisma.entity.create({ data })
  }

  static async getAll() {
    return prisma.entity.findMany()
  }

  static async getById(id: number) {
    const entity = await prisma.entity.findUnique({ where: { id } })
    if (!entity) throw new Error('Entity not found')
    return entity
  }

  static async update(id: number, dto: UpdateEntityDTO) {
    const data = cleanUndefined({
      name: WrapUpdateField(dto.name),
      logo: WrapUpdateField(dto.logo),
      couleur: WrapUpdateField(dto.couleur),
      avatar: WrapUpdateField(dto.avatar),
      domaine: WrapUpdateField(dto.domaine),
    })

    return prisma.entity.update({ where: { id }, data })
  }

  static async delete(id: number) {
    return prisma.entity.delete({ where: { id } })
  }
}
