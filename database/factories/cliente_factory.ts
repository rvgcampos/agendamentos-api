import factory from '@adonisjs/lucid/factories'
import Cliente from '#models/cliente'

export const ClienteFactory = factory
  .define(Cliente, async ({ faker }) => {
    return {
      nome: faker.person.firstName(),
      endereco: faker.location.streetAddress(),
      telefone: gerarCelularBrasileiro(),
    }
  })
  .build()

function gerarCelularBrasileiro() {
  // Lista de DDDs válidos no Brasil (opcional, aqui usei alguns principais)
  const ddds = [
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19', // SP
    '21',
    '22',
    '24', // RJ
    '31',
    '32',
    '33',
    '34',
    '35',
    '37',
    '38', // MG
    '41',
    '47',
    '48', // PR/SC
    '51',
    '53',
    '54',
    '55', // RS
    '61',
    '62',
    '71',
    '81',
    '85',
    '91',
    '92', // Outros
  ]

  // Seleciona um DDD aleatório da lista
  const ddd = ddds[Math.floor(Math.random() * ddds.length)]

  // O primeiro dígito após o DDD em celulares no Brasil é sempre 9
  const prefixo = '9'

  // Gera os 8 dígitos restantes aleatoriamente
  // O número máximo é 99.999.999
  const restante = Math.floor(Math.random() * 100000000)
    .toString()
    .padStart(8, '0')

  return `${ddd}${prefixo}${restante}`
}
