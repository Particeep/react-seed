import {IEntity} from './entity'

export interface IDoc extends IEntity {
  name: string;
  permalink: string;
}
