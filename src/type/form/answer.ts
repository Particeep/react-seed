import {QuestionId} from './question'

export interface IAnswer {
  question_id: QuestionId;
  answer: string[];
}
