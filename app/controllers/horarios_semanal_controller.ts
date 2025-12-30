import type { HttpContext } from '@adonisjs/core/http'
import { Exception } from '@adonisjs/core/exceptions'
import HorarioSemana from '#models/horarios_semanas'

export default class ConfiguracoesController {
  async getHorarios({}: HttpContext) {
    const configuracoes = await HorarioSemana.all()
    return configuracoes
  }

  async update({ params, request }: HttpContext) {
    const configuracao = await HorarioSemana.find(params.id)

    if (!configuracao) {
      throw new Exception('Horario não encontrado', { status: 404 })
    }
    configuracao.merge({
      horaInicio: request.body().horaInicio,
      horaFinal: request.body().horaFinal,
    })
    configuracao.save()
  }
}
