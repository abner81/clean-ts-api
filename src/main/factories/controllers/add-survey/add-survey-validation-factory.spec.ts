import {
  ValidationComposite,
  RequiredFields
} from '../../../../validation/validators/index'
import { Validation } from '../../../../presentation/protocols/validation'
import { makeAddSurveyValidation } from './add-survey-validation-factory'

jest.mock('../../../../validation/validators/validation-composite')

describe('AddSurvey Validation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFields(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
