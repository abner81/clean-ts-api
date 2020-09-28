import { AccountModel } from '../models/account'

export interface LoadAccountByToken {
  load(accessToken: string, rule?: string): Promise<AccountModel>
}
