import * as React from 'react'
import {ReactNode} from 'react'
import FormattedAmount from 'react-formatted-amount'

export const formatAmount = (amount?: number, currency?: string): ReactNode => {
  if (amount === undefined || amount === null) return '-';
  return <FormattedAmount amount={amount} currency={currencyCodeToSymbol(currency)}/>;
};

const currencyCodeToSymbol = (code?: string): string => {
  switch (code) {
    case 'EUR':
      return '€';
    case 'USD':
      return '$';
    default:
      return '€'
  }
};
