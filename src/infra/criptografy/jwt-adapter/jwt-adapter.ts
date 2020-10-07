import jwt from 'jsonwebtoken'
import { Decrypter } from '@/data/protocols/criptografy/decrypter'
import { Encrypter } from '@/data/protocols/criptografy/encrypter'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secretKey: string) {}

  async encrypt(value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secretKey)
    return accessToken
  }

  async decrypt(token: string): Promise<string> {
    const value: any = await jwt.verify(token, this.secretKey)
    return value
  }
}
