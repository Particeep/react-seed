import {IAddress} from './address'
import {Id} from './basics'
import {mapDateFromApi} from '../core/utils'
import {mapPaginationFromApi} from './paginated'

export enum UserStatus {
  VALIDATED = 'VALIDATED',
  INIT = 'INIT',
  WAITING = 'WAITING',
}

export enum InvestorType {
  LEGAL = 'LEGAL',
  NATURAL = 'NATURAL',
}

export enum PartnerStatus {
  INIT = 'INIT',
  WAITING = 'WAITING',
  VALIDATED = 'VALIDATED',
}

export interface IUser {
  id: Id;
  gender: 'MAN' | 'WOMAN';
  created_at: Date;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address?: IAddress;
  has_been_claimed: boolean;
  investor_type: InvestorType;
}

export const mapUserFromApi = (apiUser: any): IUser => ({
  ...apiUser,
  created_at: mapDateFromApi(apiUser.created_at),
})

export const mapUsersFromApi = mapPaginationFromApi<IUser>(mapUserFromApi)
