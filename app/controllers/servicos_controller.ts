import Servico from '#models/servico'
import type { HttpContext } from '@adonisjs/core/http'
import { createServicoValidator, updateServicoValidator } from '#validators/servico'
import { Exception } from '@adonisjs/core/exceptions'

export default class ServicosController {
  async index({}: HttpContext) {
    return Servico.all()
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createServicoValidator)
    const servico = await Servico.create({ ...payload })

    return servico
  }

  async show({ params }: HttpContext) {
    const servico = await Servico.find(params.id)
    if (!servico) {
      throw new Exception('Cliente não encontrado', { status: 404 })
    }
    return servico
  }

  async update({ params, request }: HttpContext) {
    const servico = await Servico.find(params.id)

    if (!servico) {
      throw new Exception('Cliente não encontrado', { status: 404 })
    }
    const payload = await request.validateUsing(updateServicoValidator)
    servico.merge(payload)

    return await servico.save()
  }

  async destroy({ params }: HttpContext) {
    const servico = await Servico.find(params.id)

    if (!servico) {
      throw new Exception('Servico não encontrado')
    }

    await servico.delete()
    return { msg: 'Deletado' }
  }
}
