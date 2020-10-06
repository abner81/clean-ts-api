import { DbAddAccount } from '../../../../../data/usecases/add-account/db-add-account'
import { DbAddSurvey } from '../../../../../data/usecases/add-survey/db-add-survey'
import { DbLoadSurveys } from '../../../../../data/usecases/load-surveys/db-load-surveys'
import { AddAccount } from '../../../../../domain/usecases/add-account'
import { AddSurvey } from '../../../../../domain/usecases/add-survey'
import { LoadSurveys } from '../../../../../domain/usecases/load-surveys'
import { SurveyMongoRepository } from '../../../../../infra/db/mongodb/survey/survey-repository'

export const makeDbLoadSurvey = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(surveyMongoRepository)
}
