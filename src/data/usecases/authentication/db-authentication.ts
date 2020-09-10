import {
  AuthenticationModel,
  Authentication
} from '../../../domain/usecases/authentication'
import { LoadAccountByEmailRepository } from '../../../data/protocols/db/load-account-by-email-repository'
import { HashComparer } from '../../../data/protocols/criptografy/hash-comparer'
import { TokenGenerator } from '../../../data/protocols/criptografy/token-generator'
import { UpdateAccessTokenRepository } from '../../../data/protocols/db/update-access-token-repository'
import { access } from 'fs'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmail: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer
  private readonly tokenGenerator: TokenGenerator
  private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  constructor(
    loadAccountByEmail: LoadAccountByEmailRepository,
    hashComparer: HashComparer,
    tokenGenerator: TokenGenerator,
    updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {
    this.loadAccountByEmail = loadAccountByEmail
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmail.load(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(
        authentication.password,
        account.password
      )
      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id)
        await this.updateAccessTokenRepository.update(account.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
