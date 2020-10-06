import { SurveyModel } from '../models/surveys'

export interface LoadSurveys {
  load(): Promise<SurveyModel[]>
}
