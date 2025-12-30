import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class HorarioSemana extends BaseModel {
  static table = 'horarios_semanas'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare diaSemanaNumero: number

  @column()
  declare diaSemanaTexto: string

  @column()
  declare horaInicio: string

  @column()
  declare horaFinal: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
