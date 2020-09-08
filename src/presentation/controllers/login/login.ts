import { Controller, HttpRequest, HttpResponse } from '../signup/signup-protocols'
import { badRequest } from '../../../presentation/helpers/http-helper'
import { MissingParamError } from '../../../presentation/errors'

export class LoginController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['email', 'password']
    for (const fields of requiredFields) {
      if (!httpRequest.body[fields]) {
        return badRequest(new MissingParamError(`${fields}`))
      }
    }
  }
}
