import { makeSignUpValidation } from './signup-validation-factory'
import { Validation } from '@/presentation/protocols/validation'
import { EmailValidator } from '@/validation/protocols/emailValidator'
import {
  ValidationComposite,
  RequiredFields,
  CompareFieldsValidation,
  EmailValidation
} from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUp Validation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFields(field))
    }
    validations.push(
      new CompareFieldsValidation('password', 'passwordConfirmation')
    )
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
