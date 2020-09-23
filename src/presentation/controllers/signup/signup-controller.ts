import {
  Controller,
  HttpRequest,
  HttpResponse,
  AddAccount
} from './signup-protocols-controller'
import { badRequest, serverError, ok } from '../../helpers/http/http-helper'
import { Validation } from '../../protocols/validation'
import { Authentication } from '../login/login-protocols-controller'

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
      await this.addAccount.add({
        name,
        email,
        password
      })
      const auth = await this.authentication.auth({
        email,
        password
      })
      return ok(auth)
    } catch (error) {
      return serverError(error)
    }
  }
}
