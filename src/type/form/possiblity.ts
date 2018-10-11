import {Id} from '../basics'
import {QuestionId} from './question'

export type PossiblityId = Id;

export interface IPossibility {
  id: PossiblityId;
  question_id: QuestionId;
  label: string;
  weight: number;
  index: number;
}
