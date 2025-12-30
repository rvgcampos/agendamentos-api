import { ClienteFactory } from '#database/factories/cliente_factory'
import { ConfiguracaoFactory } from '#database/factories/configuracao_factory'
import { ServicoFactory } from '#database/factories/servico_factory'
import Agendamento from '#models/agendamento'
import HorarioSemana from '#models/horarios_semanas'
import Servico from '#models/servico'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await ClienteFactory.createMany(5)
    const servicos = await ServicoFactory.createMany(5)

    // Fazer um agendamento
    const cliente1Factory = await ClienteFactory.create()
    const cliente2Factory = await ClienteFactory.create()
    gerarAgendamento('10:00:00', '12:00:00', '2026-08-18 00:00:00', servicos, cliente1Factory.id)
    gerarAgendamento('13:00:00', '14:00:00', '2026-08-18 00:00:00', servicos, cliente1Factory.id)
    gerarAgendamento('16:00:00', '18:00:00', '2026-08-18 00:00:00', servicos, cliente1Factory.id)
    gerarAgendamento('16:00:00', '17:00:00', '2026-08-20 00:00:00', servicos, cliente2Factory.id)
    gerarAgendamento('10:00:00', '11:00:00', '2026-08-20 00:00:00', servicos, cliente2Factory.id)

    await ConfiguracaoFactory.create()

    const semana = gerarSemanaCompleta()
    for (const dia of semana) {
      await HorarioSemana.create({
        diaSemanaNumero: dia.weekday,
        diaSemanaTexto: dia.weekdayLong,
        horaInicio: '10:00',
        horaFinal: '17:00',
      })
    }
  }
}

async function gerarAgendamento(
  horaInicio: string,
  horaFinal: string,
  diaAgendamento: string,
  listaServicos: Servico[],
  clienteId: number
) {
  const agendamento = await Agendamento.create({
    clienteId: Number(clienteId),
    diaAgendamento: DateTime.fromFormat(diaAgendamento, 'yyyy-MM-dd HH:mm:ss'),
    horaInicio: horaInicio,
    horaFinal: horaFinal,
    duracao: 120,
  })
  // 1. Gera um índice aleatório entre 0 e o tamanho da lista
  const indiceAleatorio = Math.floor(Math.random() * listaServicos.length)

  // 2. Acessa o objeto usando esse índice
  const itemSorteado = listaServicos[indiceAleatorio]
  agendamento.related('servicos').attach([itemSorteado.id])
}

function gerarSemanaCompleta() {
  let dataInicial = DateTime.now().startOf('week')

  const diasDaSemana = []

  for (let i = 0; i < 7; i++) {
    diasDaSemana.push(dataInicial.plus({ days: i }))
  }

  return diasDaSemana
}
