import {IEntity} from './entity'

export interface IContextLoanequity extends IEntity {
  offline_payment?: boolean
  currency?: string
  sepa_enabled?: boolean
  partner_enabled?: boolean
  allow_indexing?: boolean
  investor_must_fill_form?: boolean
  investor_must_sign_form?: boolean
  investor_auto_validation?: boolean
  entrepreneur_must_fill_form?: boolean
  form_doc_natural?: string
  form_doc_legal?: string
  has_fundraise_equity?: boolean
  has_fundraise_loan?: boolean
  privacy?: boolean
  display_powered_by?: boolean
  pending_transactions_enabled?: boolean
  form_doc_cgp?: string
  cgp_must_fill_form?: boolean
  cgp_must_sign_form?: boolean
}
