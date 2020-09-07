import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return await new Promise((resolve) => resolve('hash'))
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct value', async () => {
    const sut = makeSut()
    const bcryptSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(bcryptSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('should return a hash on sucess', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })

  test('should throw if bcyrpt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce(
      new Promise((resolve, reject) => {
        reject(new Error())
      })
    )
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
