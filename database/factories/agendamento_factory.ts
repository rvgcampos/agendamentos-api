import factory from '@adonisjs/lucid/factories'
import Agendamento from '#models/agendamento'
import { ClienteFactory } from './cliente_factory.js'
import { DateTime } from 'luxon'
import { ServicoFactory } from './servico_factory.js'

export const AgendamentoFactory = factory
  .define(Agendamento, async ({}) => {
    const clienteFactory = await ClienteFactory.create()
    return {
      clienteId: clienteFactory.id,
      diaAgendamento: DateTime.fromFormat('2026-08-18 09:59:00', 'yyyy-MM-dd HH:mm:ss'),
      horaInicio: '10:00:00',
      horaFinal: '12:00:00',
      duracao: 120,
    }
  })
  .relation('servicos', () => ServicoFactory)
  .build()
