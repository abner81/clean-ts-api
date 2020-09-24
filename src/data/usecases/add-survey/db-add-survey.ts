import { AddSurveyRepository } from '../../protocols/db/survey/add-survey-repository'
import { AddSurvey, AddSurveyModel } from './db-add-survey-account-protocols'

export class DbAddSurvey implements AddSurvey {
  constructor(private readonly addSurveyRepository: AddSurveyRepository) {}
  async add(data: AddSurveyModel): Promise<void> {
    await this.addSurveyRepository.add(data)
  }
}
