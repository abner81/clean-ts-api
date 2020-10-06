import { SurveyAnswer } from '../models/surveys'

export interface AddSurveyModel {
  question: string
  answers: SurveyAnswer[]
  date: Date
}

export interface AddSurvey {
  add(data: AddSurveyModel): Promise<void>
}
