export interface SurveyModel {
  id: string
  question: string
  answers: SurveyAnswerModel[]
  date: Date
}

export interface SurveyMockModel{
  question: string
  answers: SurveyAnswerModel[]
}

export interface SurveyAnswerModel {
  image?: string
  answer: string
}