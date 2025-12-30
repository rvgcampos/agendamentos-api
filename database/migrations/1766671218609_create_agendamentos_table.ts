import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'agendamentos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('cliente_id').unsigned().references('id').inTable('clientes').notNullable
      table.date('dia_agendamento').notNullable()
      table.time('hora_inicio').notNullable()
      table.time('hora_final').notNullable()
      table.integer('duracao')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
