import {Id} from '../basics'
import {ISection} from './section'

export type FormId = Id;

export interface IForm {
  id: FormId;
  name: string;
  description: string;
  created_at: Date;
  sections: ISection[];
}
