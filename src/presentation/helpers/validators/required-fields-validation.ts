import { Validation } from '../../protocols/validation'
import { MissingParamError } from '../../../presentation/errors'

export class RequiredFields implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
