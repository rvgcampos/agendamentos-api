import vine from '@vinejs/vine'

export const createServicoValidator = vine.compile(
  vine.object({
    nome: vine.string(),
    valor: vine.number(),
    duracao: vine.number(),
  })
)

export const updateServicoValidator = vine.compile(
  vine.object({
    nome: vine.string().optional(),
    valor: vine.number().optional(),
    duracao: vine.number().optional(),
  })
)
