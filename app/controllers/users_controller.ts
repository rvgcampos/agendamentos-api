import BadRequestException from '#exceptions/bad_request_exception'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  public async store({ request, response }: HttpContext) {
    const body = request.body()
    const userByEmail = await User.findBy('email', body.email)

    if (userByEmail) throw new BadRequestException('email already in use', { status: 409 })

    const user = await User.create({
      email: body.email,
      password: body.password,
    })
    return response.created({ user })
  }

  public async login({ request, auth }: HttpContext) {
    const body = request.body()
    const user = await User.verifyCredentials(body.email, body.password)

    return await auth.use('api').createToken(user)
  }

  async logout({ auth }: HttpContext) {
    await auth.use('api').invalidateToken()
    return 'Deletado'
  }

  public async me({ auth }: HttpContext) {
    const user = await auth.use('api').authenticate()
    return user
  }
}
