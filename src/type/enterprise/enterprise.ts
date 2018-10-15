import {Address} from 'cluster'
import {IEntity} from '../entity'

export interface Enterprise extends IEntity {
  created_at: Date;
  name: string;
  activity_domain: string;
  legal_status: string;
  description_short: string;
  description_long: string;
  url: string;
  logo_url: string;
  video_url: string;
  website_url: string;
  tag: string;
  address: Address;
}
