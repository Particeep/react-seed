import {Id} from '../basics'
import {FormId} from './form'
import {IQuestion} from './question'

export type SectionId = Id;

export interface ISection {
  id: SectionId;
  name: string;
  form_id: FormId;
  description: string;
  index: number;
  questions: IQuestion[];
}
