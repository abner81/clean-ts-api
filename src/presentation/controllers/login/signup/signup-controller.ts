import {
  Controller,
  HttpRequest,
  HttpResponse,
  AddAccount
} from './signup-protocols-controller'
import {
  badRequest,
  serverError,
  ok,
  forbidden
} from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '../login/login-protocols-controller'
import { EmailInUseError } from '@/presentation/errors'

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, name, password } = httpRequest.body
      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      if (!account) {
        return forbidden(new EmailInUseError())
      }
      const auth = await this.authentication.auth({
        email,
        password
      })
      return ok({ auth })
    } catch (error) {
      return serverError(error)
    }
  }
}
