import { RequiredFields } from './required-fields-validation'
import { MissingParamError } from '../../../presentation/errors'

describe('Required Field Validation', () => {
  test('should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFields('field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
