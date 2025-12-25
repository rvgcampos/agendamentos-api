import factory from '@adonisjs/lucid/factories'
import Servico from '#models/servico'

export const ServicoFactory = factory
  .define(Servico, async ({ faker }) => {
    return {
      nome: faker.word.words(),
      duracao: faker.number.float({ min: 10, max: 30 }),
      valor: faker.number.float({ min: 10, max: 30 }),
    }
  })
  .build()
