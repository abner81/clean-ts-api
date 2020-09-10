import {
  AuthenticationModel,
  Authentication
} from '../../../domain/usecases/authentication'
import { LoadAccountByEmailRepository } from '../../../data/protocols/db/load-account-by-email-repository'
import { HashComparer } from '../../../data/protocols/criptografy/hash-comparer'
import { TokenGenerator } from '../../../data/protocols/criptografy/token-generator'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmail: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer
  private readonly tokenGenerator: TokenGenerator
  constructor(
    loadAccountByEmail: LoadAccountByEmailRepository,
    hashComparer: HashComparer,
    tokenGenerator: TokenGenerator
  ) {
    this.loadAccountByEmail = loadAccountByEmail
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
  }

  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmail.load(authentication.email)
    if (account) {
      await this.hashComparer.compare(authentication.password, account.password)
      await this.tokenGenerator.generate(account.id)
    }
    return null
  }
}
