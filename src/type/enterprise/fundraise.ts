import {Id} from '../basics'
import {mapAmountFromApi, mapDateFromApi} from '../../core/utils'
import {mapPaginationFromApi} from '../paginated'

export interface IFundraise {
  id: Id;
  created_at: Date;
  fundraise_type: FundraiseType;
  fundraise_id: string;
  currency: string;
  website_url: string;
  name: string;
  end_at: Date;
  category: string;
  city: FundraiseStatus;
  status: string;
  amount_target: number;
  amount_engaged: number;
  amount_percent: number;
  transaction_count: number;
  description_short: string;
  logo_url: string;
  image_cover_url: string;
  private_group_id: string;
  amount_target_max: number;
  equity: Equity;
  loan: Loan;
}


interface Loan {
  start_at: Date;
  term: number;
  rate: number;
  tax_rate: number;
  amount_min: number;
  method: ReimbursementMethod;
  repayment_frequency: number;
  repayment_start_date: Date;
  deferred_period: number;
  score: string;
  bond_price: number;
  amount_max: number;
}

interface Equity {
  start_at: Date;
  financial_instrument: string;
  fees_in: number;
  fees_out: number;
  tax_rate: number;
  price_per_share: number;
  total_shares: number;
  num_of_shares: number;
  round: string;
  valuation_pre_money: string;
  min_commitment: number;
  max_commitment: number;
}

export type ReimbursementMethod = 'Constant' | 'InFine';

export enum FundraiseType {
  EQUITY = 'EQUITY',
  LOAN = 'LOAN'
}

export enum FundraiseStatus {
  INIT = 'INIT',
  UNDER_REVIEW = 'UNDER_REVIEW',
  RUNNING = 'RUNNING',
  SUCCEEDED = 'SUCCEEDED',
  REFUNDED = 'REFUNDED',
  DELETED = 'DELETED',
}

export const mapFundraisesPaginationFromApi = mapPaginationFromApi<IFundraise>(mapFundraiseFromApi)

export function mapFundraiseFromApi(p: any): IFundraise {
  const amount_engaged = mapAmountFromApi(p.amount_engaged) || 0
  const amount_target = mapAmountFromApi(p.amount_target) || 0
  return {
    ...p,
    created_at: mapDateFromApi(p.end_at),
    end_at: mapDateFromApi(p.end_at),
    amount_engaged,
    amount_target,
    amount_percent: amount_target === 0 ? 100 : Math.round(amount_engaged / amount_target * 100),
    amount_target_max: mapAmountFromApi(p.amount_target_max),
    equity: p.fundraise_equity ? mapEquityFromApi(p.fundraise_equity) : null,
    loan: p.fundraise_loan ? mapLoanFromApi(p.fundraise_loan) : null,
  }
}

const mapLoanFromApi = (loan: any): Loan => ({
  ...loan,
  ...loan.offer,
  amount_min: mapAmountFromApi(loan.offer.amount_min),
  bond_price: mapAmountFromApi(loan.offer.bond_price),
  amount_max: mapAmountFromApi(loan.offer.amount_max),
  start_at: new Date()
})

const mapEquityFromApi = (equity: any): Equity => ({
  ...equity,
  ...equity.offer,
  price_per_share: mapAmountFromApi(equity.offer.price_per_share),
  min_commitment: mapAmountFromApi(equity.offer.min_commitment),
  valuation_pre_money: mapAmountFromApi(equity.offer.valuation_pre_money),
})
