import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Agendamento from './agendamento.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare telefone: string

  @column()
  declare endereco: string

  @hasMany(() => Agendamento, {
    localKey: 'id',
    foreignKey: 'cliente_id',
  })
  declare posts: HasMany<typeof Agendamento>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
