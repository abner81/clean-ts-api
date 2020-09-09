import { RequiredFields } from './required-fields-validation'
import { MissingParamError } from '../../../presentation/errors'

const makeSut = (): RequiredFields => {
  return new RequiredFields('field')
}

describe('Required Field Validation', () => {
  test('should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('should not return if validation sucess', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_name' })
    expect(error).toBeFalsy()
  })
})
