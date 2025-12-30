/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import { DateTime } from 'luxon'
import { middleware } from './kernel.js'
import router from '@adonisjs/core/services/router'

// CONTROLLERS
const ClientesController = () => import('#controllers/clientes_controller')
const ServicosController = () => import('#controllers/servicos_controller')
const AgendamentosController = () => import('#controllers/agendamentos_controller')
const HorariosController = () => import('#controllers/horarios_controller')
const ConfiguracoesController = () => import('#controllers/configuracoes_controller')
const HorariosSemanasController = () => import('#controllers/horarios_semanal_controller')
const UsersController = () => import('#controllers/users_controller')

// SERVIDOR OK
router.get('/', async () => {
  return 'Servidor OK'
})

// Entidades
router.resource('clientes', ClientesController).apiOnly()
router.resource('servicos', ServicosController).apiOnly()
router.resource('agendamentos', AgendamentosController).apiOnly()

// HORARIOS
router.post('/horarios-disponiveis', [HorariosController, 'verHorarios']).use(middleware.auth())
router.post('/agendamentos-dia', [HorariosController, 'getAgendamentosByDate'])

// CONFIGURACOES
router.get('/configuracoes', [ConfiguracoesController, 'getConfiguracoes'])
router.put('/configuracoes/:id', [ConfiguracoesController, 'update'])

// HORARIOS-SEMANAL
router.get('/horario-semana', [HorariosSemanasController, 'getHorarios'])
router.put('/horario-semana/:id', [HorariosSemanasController, 'update'])

// USUARIOS
router.post('/users', [UsersController, 'store'])
router.post('/login', [UsersController, 'login'])
router.post('/logout', [UsersController, 'logout'])
router.get('/me', [UsersController, 'me'])

// TESTE
router.get('/teste', async () => {
  const semana = gerarSemanaCompleta()
  semana.forEach((dia) => {
    console.log(dia.weekdayLong, dia.weekday)
  })

  function gerarSemanaCompleta() {
    let dataInicial = DateTime.now().startOf('week')

    const diasDaSemana = []

    for (let i = 0; i < 7; i++) {
      diasDaSemana.push(dataInicial.plus({ days: i }))
    }

    return diasDaSemana
  }
})
