/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const ClientesController = () => import('#controllers/clientes_controller')
const ServicosController = () => import('#controllers/servicos_controller')

router.get('/', async () => {
  return 'Servidor OK'
})

router.resource('clientes', ClientesController).apiOnly()
router.resource('servicos', ServicosController).apiOnly()
