import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'
/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new BadRequestException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class BadRequestException extends Exception {
  public code = 'BAD_REQUEST'

  public async handle(error: this, ctx: HttpContext) {
    return ctx.response
      .status(error.status)
      .send({ code: error.code, message: error.message, status: error.status })
  }
}
