import vine from '@vinejs/vine'

const telefoneRegex = /\D/g

export const createClienteValidator = vine.compile(
  vine.object({
    nome: vine.string(),
    endereco: vine.string().optional(),
    telefone: vine.string().minLength(11).maxLength(15).trim(),
  })
)

export const updateClienteValidator = vine.compile(
  vine.object({
    nome: vine.string().optional(),
    endereco: vine.string().optional(),
    telefone: vine
      .string()
      .minLength(14)
      .maxLength(15)
      .trim()
      .transform((value) => {
        return value.replace(telefoneRegex, '')
      })
      .optional(),
  })
)
