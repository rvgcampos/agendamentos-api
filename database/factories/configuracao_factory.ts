import factory from '@adonisjs/lucid/factories'
import Configuracoes from '#models/configuracoes'

export const ConfiguracaoFactory = factory
  .define(Configuracoes, async ({}) => {
    return {
      nome: 'intervalo',
      valor: '15',
    }
  })
  .build()
