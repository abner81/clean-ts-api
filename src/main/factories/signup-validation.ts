import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { RequiredFields } from '../../presentation/helpers/validators/required-fields-validation'
import { Validation } from '@/presentation/helpers/validators/validation'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFields(field))
  }
  return new ValidationComposite(validations)
}
