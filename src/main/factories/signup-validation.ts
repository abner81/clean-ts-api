import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { RequiredFields } from '../../presentation/helpers/validators/required-fields-validation'

export const makeSignUpValidation = (): ValidationComposite => {
  return new ValidationComposite([new RequiredFields('name')])
}
