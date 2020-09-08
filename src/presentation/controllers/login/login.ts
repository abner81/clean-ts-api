import {
  Controller,
  HttpRequest,
  HttpResponse,
  EmailValidator
} from '../signup/signup-protocols'
import { badRequest } from '../../../presentation/helpers/http-helper'
import { MissingParamError } from '../../../presentation/errors'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['email', 'password']
    for (const fields of requiredFields) {
      if (!httpRequest.body[fields]) {
        return badRequest(new MissingParamError(`${fields}`))
      }
    }

    const { email, password } = httpRequest.body
    const isValid = this.emailValidator.isValid(email)
  }
}
