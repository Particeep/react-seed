import {Id} from './basics'
import {mapDateFromApi} from '../core/utils'

export enum PaymentProvider {
  HIPAY = 'HIPAY',
  LEMONWAY = 'LEMONWAY',
  FAKE = 'FAKE',
}

export enum Template {
  REWARD = 'REWARD',
  LOAN_EQUITY = 'LOAN_EQUITY',
  AAP = 'AAP',
}

export type ConsumerId = Id;

export type ConsumerKey = Id;

export interface IConsumer {
  id?: ConsumerId;
  name: string;
  email: string;
  key: ConsumerKey;
  secret: string;
  debugEnable: boolean;
  metaEnable: boolean;
  accessEnable: boolean;
  kyc_service?: object;
  signature_service?: string;
  wallet_service?: PaymentProvider;
  wallet_payment_currency?: string;
  fees_cashin?: number;
  fees_cashout?: number;
  scoring_service?: object;
  template?: Template;
  wallet_service_access?: string;
  created_at: Date;
}

export const mapConsumerFromApi = (consumerApi: any): IConsumer => ({
  ...consumerApi,
  created_at: mapDateFromApi(consumerApi.created_at),
})

export const mapConsumersFromApi = (consumersApi: any[]): IConsumer[] => consumersApi.map(mapConsumerFromApi)
