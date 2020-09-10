import { InvalidParamError } from '../../errors'
import { HttpRequest } from '../../protocols'
import { EmailValidation } from './email-validation'
import { EmailValidator } from '../../../presentation/protocols/emailValidator'

interface SutTypes {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new EmailValidation('email', emailValidatorStub)
  return {
    sut,
    emailValidatorStub
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

describe('Email Validation', () => {
  test('should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ email: 'any_email@gmail.com' })
    expect(error).toEqual(new InvalidParamError('email'))
  })

  test('should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.validate({ email: 'any_email@gmail.com' })
    expect(isValidSpy).toHaveBeenCalledWith('any_email@gmail.com')
  })

  test('should throw 500 if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
