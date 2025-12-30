import type { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import Cliente from './cliente.js'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Servico from './servico.js'

export default class Agendamento extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @belongsTo(() => Cliente, {
    localKey: 'id',
    foreignKey: 'clienteId',
  })
  declare cliente: BelongsTo<typeof Cliente>

  @column()
  declare clienteId: number

  @column.date()
  declare diaAgendamento: DateTime

  @column()
  declare horaInicio: string

  @column()
  declare horaFinal: string

  @column()
  declare duracao: number

  @manyToMany(() => Servico, {
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'agendamento_id',
    pivotRelatedForeignKey: 'servico_id',
    pivotTable: 'agendamentos_servicos',
  })
  declare servicos: ManyToMany<typeof Servico>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
