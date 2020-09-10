import {
  AuthenticationModel,
  Authentication
} from '../../../domain/usecases/authentication'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmail: LoadAccountByEmailRepository
  constructor(loadAccountByEmail: LoadAccountByEmailRepository) {
    this.loadAccountByEmail = loadAccountByEmail
  }

  async auth(authentication: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmail.load(authentication.email)
    return null
  }
}
