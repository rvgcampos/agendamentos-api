import { ClienteFactory } from '#database/factories/cliente_factory'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('cliente', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('Create cliente', async ({ client, assert }) => {
    const cliente = await ClienteFactory.create()
    const response = await client.get('/clientes')

    assert.exists(response.body()[0].nome, cliente.nome)
  })
})
