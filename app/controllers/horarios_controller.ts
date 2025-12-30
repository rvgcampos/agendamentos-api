import type { HttpContext } from '@adonisjs/core/http'
import Agendamento from '#models/agendamento'
import { DateTime } from 'luxon'
import Configuracoes from '#models/configuracoes'
import HorarioSemana from '#models/horarios_semanas'

export default class HorariosController {
  async getAgendamentosByDate({ request }: HttpContext) {
    const dataBusca = request.body().data
    const agendamentos = await Agendamento.query().where('dia_agendamento', dataBusca)
    return agendamentos
  }

  async verHorarios({ request }: HttpContext) {
    const configuracaoValor = await Configuracoes.query().where('nome', 'intervalo').firstOrFail()
    const intervaloHorario = Number(configuracaoValor.valor)

    const dataBusca = request.body().data

    const dataBuscaLuxon = DateTime.fromISO(dataBusca)
    const dataBuscaLuxonId = dataBuscaLuxon.weekday
    const horarioSemanal = await HorarioSemana.query()
      .where('dia_semana_numero', dataBuscaLuxonId)
      .firstOrFail()
    console.log(horarioSemanal)

    const horaInicio = horarioSemanal.horaInicio
    const horaFim = horarioSemanal.horaFinal

    const horarios = this.gerarHorarios(horaInicio, horaFim, intervaloHorario)
    const agendamentos = await Agendamento.query().where('dia_agendamento', dataBusca)
    const horariosAgendamentos = agendamentos.map((agendamento) => {
      return {
        horaInicio: agendamento.horaInicio,
        horaFinal: agendamento.horaFinal,
      }
    })

    const horariosFinal: any[] = []
    horarios.forEach((horario) => {
      const alvo = DateTime.fromFormat(horario, 'HH:mm')

      const estaIncluso = horariosAgendamentos.some((hor) => {
        const inicioDt = DateTime.fromFormat(hor.horaInicio, 'HH:mm:ss')
        const fimDt = DateTime.fromFormat(hor.horaFinal, 'HH:mm:ss')
        return alvo >= inicioDt && alvo < fimDt
      })

      horariosFinal.push({
        hora: horario,
        disponivel: !estaIncluso,
      })
    })

    return horariosFinal
  }

  gerarHorarios(inicioStr: string, fimStr: string, intervaloMinutos: number) {
    const horarios = []

    // 1. Criamos objetos DateTime base (a data hoje não importa, apenas o horário)
    let atual = DateTime.fromFormat(inicioStr, 'HH:mm:ss')
    const fim = DateTime.fromFormat(fimStr, 'HH:mm:ss')

    // 2. Loop enquanto o horário atual for menor ou igual ao fim
    while (atual <= fim) {
      horarios.push(atual.toFormat('HH:mm')) // Formata para '07:00', '07:15', etc.

      // 3. Adiciona o intervalo para a próxima iteração
      atual = atual.plus({ minutes: intervaloMinutos })
    }

    return horarios
  }
}
