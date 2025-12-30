import type { HttpContext } from '@adonisjs/core/http'
import { Exception } from '@adonisjs/core/exceptions'
import Agendamento from '#models/agendamento'
import Servico from '#models/servico'
import { DateTime } from 'luxon'

export default class AgendamentosController {
  async index({}: HttpContext) {
    return Agendamento.query().preload('servicos')
  }

  async store({ request }: HttpContext) {
    const body = request.body()
    const servicosId = body.servicosId

    let servicos: Servico[] = []

    for (const id of servicosId) {
      const servico = await Servico.findOrFail(id)
      servicos.push(servico)
    }

    let duracaoTotal = 0

    servicos.forEach((servico) => {
      duracaoTotal = duracaoTotal + Number(servico.duracao)
    })

    let horaInicioDate = DateTime.fromFormat(body.horaInicio, 'HH:mm')
    let horaFinal = horaInicioDate.plus({ minutes: duracaoTotal })

    const agendamento = await Agendamento.create({
      clienteId: body.clienteId,
      diaAgendamento: body.diaAgendamento,
      horaInicio: body.horaInicio,
      horaFinal: horaFinal.toFormat('HH:mm'),
      duracao: duracaoTotal,
    })

    agendamento.related('servicos').attach(servicosId)
    return agendamento
  }

  async show({ params }: HttpContext) {
    const agendamento = await Agendamento.find(params.id)
    if (!agendamento) {
      throw new Exception('Agendamento não encontrado', { status: 404 })
    }
    await agendamento.load('servicos')
    return agendamento
  }

  async update({ params, request }: HttpContext) {
    let agendamento = await Agendamento.find(params.id)

    if (!agendamento) {
      throw new Exception('Agendamento não encontrado', { status: 404 })
    }

    await agendamento.load('servicos')

    const servicosIdOriginal = agendamento.servicos.map((servico) => servico.id)

    const body = request.body()
    const servicosId = body.servicosId

    let servicos: Servico[] = []

    for (const id of servicosId) {
      const servico = await Servico.findOrFail(id)
      servicos.push(servico)
    }

    let duracaoTotal = 0

    let horaInicioDate = DateTime.fromFormat(body.horaInicio, 'HH:mm')
    let horaFinal = horaInicioDate.plus({ minutes: duracaoTotal })

    servicos.forEach((servico) => {
      duracaoTotal = duracaoTotal + Number(servico.duracao)
    })

    agendamento.merge({
      clienteId: body.clienteId,
      diaAgendamento: body.diaAgendamento,
      horaInicio: body.horaInicio,
      horaFinal: horaFinal.toFormat('HH:mm'),
      duracao: duracaoTotal,
    })

    await agendamento.related('servicos').detach(servicosIdOriginal)
    await agendamento.related('servicos').attach(servicosId)
    await agendamento.save()
    return await Agendamento.query().preload('servicos').where('id', params.id)
  }

  async destroy({ params }: HttpContext) {
    const agendamento = await Agendamento.find(params.id)

    if (!agendamento) {
      throw new Exception('Agendamento não encontrado')
    }

    await agendamento.delete()
    return { msg: 'Deletado' }
  }
}
