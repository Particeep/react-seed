import * as React from 'react'
import {ReactNode} from 'react'
import {messages} from './messages/messages'
import {messages_fr} from './messages/messages_fr'
import {formatDate, formatDateTime, formatTime} from './date'
import {formatAmount} from './amount'
import {IDatatableContext} from '../../shared/Datatable/Datatable'

const I18nContext = React.createContext({})

export enum AppLangs {
  fr = 'fr',
  en = 'en',
}

export type AppLang = keyof typeof AppLangs

interface IProps {
  lang: AppLang
}

export interface WithI18n {
  t: typeof messages;
  availableLangs: Array<AppLang>;
  formatDate: (d: Date) => string;
  formatTime: (d: Date) => string;
  formatDateTime: (d: Date) => string;
  formatAmount: (amount?: number, currency?: string) => ReactNode;
}

export const withI18n = <P extends object>(
  Component: React.ComponentType<P & WithI18n>
): React.SFC<Pick<P, Exclude<keyof P, keyof WithI18n>>> => (props: Pick<P, Exclude<keyof P, keyof WithI18n>>) => (
  <I18nContext.Consumer>
    {(m: typeof messages) => <Component
      {...props}
      t={m}
      availableLangs={Object.keys(AppLangs).map(k => AppLangs[k])}
      formatDate={formatDate}
      formatTime={formatTime}
      formatDateTime={formatDateTime}
      formatAmount={formatAmount}
    />
    }
  </I18nContext.Consumer>
)

export class I18nProvider extends React.Component<IProps, IDatatableContext> {

  render() {
    const {children} = this.props
    return (
      <I18nContext.Provider value={this.getMessages()}>
        {children}
      </I18nContext.Provider>
    )
  }

  private getMessages(): typeof messages {
    const {lang} = this.props
    switch (lang) {
      case AppLangs.fr:
        return messages_fr
      default:
        return messages
    }
  }
}
