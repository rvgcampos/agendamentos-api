import { ClienteFactory } from '#database/factories/cliente_factory'
import { ServicoFactory } from '#database/factories/servico_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await ClienteFactory.createMany(5)
    await ServicoFactory.createMany(5)
  }
}
