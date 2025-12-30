import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'agendamentos_servicos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('agendamento_id').unsigned().references('id').inTable('agendamentos')
        .notNullable
      table.integer('servico_id').unsigned().references('id').inTable('servicos').notNullable
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
