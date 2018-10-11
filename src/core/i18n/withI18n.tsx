import * as React from 'react'
import {ReactNode} from 'react'
import {messages} from './messages/messages'
import {messagesFr} from './messages/messages.fr'
import {formatDate, formatDateTime, formatTime} from './date'
import {formatAmount} from './amount'

export interface WithI18n {
  t: typeof messages;
  formatDate: (d: Date) => string;
  formatTime: (d: Date) => string;
  formatDateTime: (d: Date) => string;
  formatAmount: (amount?: number, currency?: string) => ReactNode;
}

// TODO Issue with React.SFC<Pick<P, Exclude<keyof P, keyof WithI18n>>> when using compose(message, ...)
export const withI18n = <P extends object>(
  Component: React.ComponentType<P & WithI18n>
): React.SFC<any> => (props: Pick<P, Exclude<keyof P, keyof WithI18n>>) => {

  return <Component
    {...props}
    t={messagesFr}
    formatDate={formatDate}
    formatTime={formatTime}
    formatDateTime={formatDateTime}
    formatAmount={formatAmount}
  />
}
// export const message = <P extends object>(
//     Component: React.ComponentType<P & WithI18n>
// ): React.SFC<Pick<P, Exclude<keyof P, keyof WithI18n>>> => (props: Pick<P, Exclude<keyof P, keyof WithI18n>>) => {
//
//   return <Component
//     {...props}
//     t={messagesFr}
//     formatDate={formatDate}
//     formatTime={formatTime}
//     formatDateTime={formatDateTime}
//     formatAmount={formatAmount}
//   />
// };
