import {
  AuthenticationModel,
  Authentication
} from '../../../domain/usecases/authentication'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'
import { HashComparer } from '@/data/protocols/criptografy/hash-comparer'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmail: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer
  constructor(
    loadAccountByEmail: LoadAccountByEmailRepository,
    hashComparer: HashComparer
  ) {
    this.loadAccountByEmail = loadAccountByEmail
    this.hashComparer = hashComparer
  }

  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmail.load(authentication.email)
    if (account) {
      await this.hashComparer.compare(authentication.password, account.password)
    }
    return null
  }
}
