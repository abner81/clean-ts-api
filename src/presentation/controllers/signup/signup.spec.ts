import { SignUpController } from './signup'
import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  Validation
} from './signup-protocols'
import { MissingParamError, ServerError } from '../../errors'
import { HttpRequest } from '../../../presentation/protocols'
import {
  ok,
  serverError,
  badRequest
} from '../../helpers/http/http-helper'

interface SutTypes {
  sut: SignUpController
  addAccountStub: AddAccount
  validationStub: Validation
}

const makeValidtion = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountModel): Promise<AccountModel> {
      return await new Promise((resolve) => resolve(makeFakeAccount()))
    }
  }
  return new AddAccountStub()
}

const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount()
  const validationStub = makeValidtion()

  const sut = new SignUpController(
    addAccountStub,
    validationStub
  )
  return {
    sut,
    addAccountStub,
    validationStub
  }
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'johndoe',
    email: 'any_email@gmail.com',
    password: 'anypassword',
    passwordConfirmation: 'anypassword'
  }
})

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password'
})

describe('SignUp Controller', () => {
  test('should call addAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'johndoe',
      email: 'any_email@gmail.com',
      password: 'anypassword'
    })
  })

  test('should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  })

  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const authSpy = jest.spyOn(validationStub, 'validate')
    const httpResponse = makeFakeRequest()
    await sut.handle(httpResponse)
    expect(authSpy).toHaveBeenCalledWith(httpResponse.body)
  })

  test('should return 200 if Validation returns', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_error'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_error')))
  })
})
