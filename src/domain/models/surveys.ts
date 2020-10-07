export type SurveyModel = {
  id: string
  question: string
  answers: SurveyAnswerModel[]
  date: Date
}

export type SurveyMockModel = {
  question: string
  answers: SurveyAnswerModel[]
}

export type SurveyAnswerModel = {
  image?: string
  answer: string
}