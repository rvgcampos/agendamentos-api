import Cliente from '#models/cliente'
import type { HttpContext } from '@adonisjs/core/http'
import { createClienteValidator, updateClienteValidator } from '#validators/cliente'
import { Exception } from '@adonisjs/core/exceptions'
import db from '@adonisjs/lucid/services/db'

export default class ClientesController {
  async index({}: HttpContext) {
    const clientes = await Cliente.all()
    return clientes
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createClienteValidator)
    const cliente = await Cliente.create({ nome: payload.nome, telefone: payload.telefone })

    return cliente
  }

  async show({ params }: HttpContext) {
    const cliente = await Cliente.find(params.id)
    if (!cliente) {
      throw new Exception('Cliente não encontradooooo', { status: 404 })
    }
    return cliente
  }

  async update({ params, request }: HttpContext) {
    const cliente = await Cliente.find(params.id)

    if (!cliente) {
      throw new Exception('Cliente não encontrado', { status: 404 })
    }
    const payload = await request.validateUsing(updateClienteValidator)
    cliente.merge(payload)

    return await cliente.save()
  }

  async destroy({ params }: HttpContext) {
    const cliente = await Cliente.find(params.id)

    if (!cliente) {
      throw new Exception('Cliente não encontrado')
    }

    await cliente.delete()
    return { msg: 'Deletado' }
  }
}
