import type { HttpContext } from '@adonisjs/core/http'
import Configuracoes from '#models/configuracoes'
import { Exception } from '@adonisjs/core/exceptions'

export default class ConfiguracoesController {
  async getConfiguracoes({}: HttpContext) {
    const configuracoes = await Configuracoes.all()
    return configuracoes
  }

  async update({ params, request }: HttpContext) {
    const configuracao = await Configuracoes.find(params.id)

    if (!configuracao) {
      throw new Exception('Configuração não encontrada', { status: 404 })
    }
    configuracao.merge({ valor: request.body().valor })
    configuracao.save()
  }
}
