import {IAddress} from './address'
import {mapDateFromApi} from '../core/utils'
import {mapPaginationFromApi} from './paginated'
import {IEntity} from './entity'

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

export interface IUser extends IEntity {
  gender: 'MAN' | 'WOMAN';
  created_at: Date;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address?: IAddress;
  has_been_claimed: boolean;
  investor_type: InvestorType;
  avatar_url: string;
  career: string;
  sector: string;
  birthday: Date;
  birth_place: string;
  linkedin_url: string;
  bio: string;
  status: UserStatus;
  does_pay_taxes: boolean;
  allow_mail_notifications: boolean;
  is_investor: boolean;
  is_entrepreneur: boolean;
  is_partner: boolean;
  custom: UserCustom;
  partner_state: PartnerState;
}

export interface UserCustom {
  max_amount_advised: number;
  cgp_info: CgpInfo;
  is_ID_verified: boolean;
}

export interface CgpInfo {
  orias_number: string;
  enterprise_name: string;
}

export interface PartnerState {
  partner_status: PartnerStatus;
}

export const mapUserFromApi = (apiUser: any): IUser => ({
  ...apiUser,
  created_at: mapDateFromApi(apiUser.created_at),
})

export const mapUsersFromApi = mapPaginationFromApi<IUser>(mapUserFromApi)
