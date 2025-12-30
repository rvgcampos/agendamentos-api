import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Agendamento from './agendamento.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Servico extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare valor: Number

  @column()
  declare duracao: Number

  @manyToMany(() => Agendamento, {
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'servico_id',
    pivotRelatedForeignKey: 'agendamento_id',
    pivotTable: 'agendamentos_servicos',
  })
  declare agendamentos: ManyToMany<typeof Agendamento>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
