import * as React from 'react'
import {createStyles, List, ListSubheader, Theme, WithStyles, withStyles} from '@material-ui/core'
import {WithI18n, withI18n} from '../../../../core/i18n/withI18n'
import {compose} from 'redux'
import {AnimateList, IconBtn, withGlobalProgress, withToast} from 'react-components'
import Page from '../../../../shared/Page/Page'
import {connect} from 'react-redux'
import {getContextLoanequity} from '../../../../core/redux/action/contextLoanequityAction'
import {RootState} from '../../../../core/redux/reducer/index'
import {WithGlobalProgress} from '../../../../type/lib/withGlobalProgress'
import {WithToast} from '../../../../type/lib/withToast'
import SettingsConfigItem from './SettingsConfigItem'

const styles = (t: Theme) => createStyles({})

interface IProps extends WithI18n,
  WithGlobalProgress,
  WithToast,
  WithStyles<typeof styles> {
}

class SettingsConfigLoanEquity extends React.Component<IProps & ReturnType<typeof state2props> & ReturnType<typeof dispatch2props>, {}> {

  render() {
    const {t, context, consumer} = this.props
    if (!context) return <></>
    // TODO Missing currency block !!
    return (
      <>
        <List>
          <SettingsConfigItem
            icon="android"
            name="allow_indexing"
            title={t.ContextLoanEquity_title_allow_indexing}
            desc={t.ContextLoanEquity_desc_allow_indexing}
          />
          <SettingsConfigItem
            icon="lock"
            name="privacy"
            title={t.ContextLoanEquity_title_privacy}
            desc={t.ContextLoanEquity_desc_privacy}
          />
          <SettingsConfigItem
            icon="payment"
            name="offline_payment"
            title={t.ContextLoanEquity_title_offline_payment}
            desc={t.ContextLoanEquity_desc_offline_payment}
            disabled={!consumer || !consumer.wallet_service}
            warning={!consumer || !consumer.wallet_service && t.ContextLoanEquity_warning_offline_payment}
          />
          <SettingsConfigItem
            icon="business"
            name="has_fundraise_equity"
            title={t.ContextLoanEquity_title_has_fundraise_equity}
            desc={t.ContextLoanEquity_desc_has_fundraise_equity}
          />
          <SettingsConfigItem
            icon="business"
            name="has_fundraise_loan"
            title={t.ContextLoanEquity_title_has_fundraise_loan}
            desc={t.ContextLoanEquity_desc_has_fundraise_loan}
          />
        </List>

        <List subheader={<ListSubheader>{t.ContextLoanEquity_header_partner}</ListSubheader>}>
          <SettingsConfigItem
            icon="supervisor_account"
            name="partner_enabled"
            title={t.ContextLoanEquity_title_partner_enabled}
            desc={t.ContextLoanEquity_desc_partner_enabled}
          />
          <SettingsConfigItem
            name="cgp_must_fill_form"
            icon="question_answer"
            title={t.ContextLoanEquity_title_must_fill_form}
            desc={t.ContextLoanEquity_desc_must_fill_form}
            disabled={!context.partner_enabled}
          />
          <SettingsConfigItem
            name="cgp_must_sign_form"
            icon="gesture"
            title={t.ContextLoanEquity_title_must_sign_form}
            desc={t.ContextLoanEquity_desc_must_sign_form}
            disabled={!context.partner_enabled}
          />
        </List>

        <List subheader={<ListSubheader>{t.ContextLoanEquity_header_investor}</ListSubheader>}>
          <SettingsConfigItem
            name="investor_must_fill_form"
            icon="question_answer"
            title={t.ContextLoanEquity_title_must_fill_form}
            desc={t.ContextLoanEquity_desc_must_fill_form}
          />
          <SettingsConfigItem
            name="investor_must_sign_form"
            icon="gesture"
            title={t.ContextLoanEquity_title_must_sign_form}
            desc={t.ContextLoanEquity_desc_must_sign_form}
          />
          <SettingsConfigItem
            name="investor_auto_validation"
            icon="check_circle"
            title={t.ContextLoanEquity_title_investor_auto_validation}
            desc={t.ContextLoanEquity_desc_investor_auto_validation}
          />
          <SettingsConfigItem
            name="pending_transactions_enabled"
            icon="schedule"
            title={t.ContextLoanEquity_title_pending_transactions_enabled}
            desc={t.ContextLoanEquity_desc_pending_transactions_enabled}
          />
        </List>

        <List subheader={<ListSubheader>{t.ContextLoanEquity_header_entrepreneur}</ListSubheader>}>
          <SettingsConfigItem
            name="investor_must_fill_form"
            icon="question_answer"
            title={t.ContextLoanEquity_title_must_fill_form}
            desc={t.ContextLoanEquity_desc_must_fill_form}
          />
        </List>
      </>
    )
  }

  async componentDidMount() {
    const {get, promisesWithProgress, toastError} = this.props
    promisesWithProgress(
      get().catch(err => toastError(err.msg))
    )
  }
}

const state2props = (state: RootState, ownProps: IProps) => ({
  isFetching: state.contextLoanEquity.isFetching,
  context: state.contextLoanEquity.entity,
  consumer: state.consumer.entity,
})

const dispatch2props = (dispatch: any, ownProps: any) => ({
  get: () => dispatch(getContextLoanequity()),
})

export default compose(
  withI18n,
  withStyles(styles),
  connect(state2props, dispatch2props),
  withGlobalProgress,
  withToast,
)(SettingsConfigLoanEquity)
