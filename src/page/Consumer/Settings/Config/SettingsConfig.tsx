import * as React from 'react'
import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core'
import {WithI18n, withI18n} from '../../../../core/i18n/withI18n'
import {compose} from 'redux'
import {AnimateList, IconBtn, withGlobalProgress, withToast} from 'react-components'
import Page from '../../../../shared/Page/Page'
import {connect} from 'react-redux'
import {RootState} from '../../../../core/redux/reducer/index'
import {WithGlobalProgress} from '../../../../type/lib/withGlobalProgress'
import {WithToast} from '../../../../type/lib/withToast'
import {Template} from '../../../../type/consumer'
import SettingsConfigLoanEquity from './SettingsConfigLoanEquity'

const styles = (t: Theme) => createStyles({})

interface IProps extends WithI18n,
  WithGlobalProgress,
  WithToast,
  WithStyles<typeof styles> {
}

class SettingsConfig extends React.Component<IProps & ReturnType<typeof state2props> & ReturnType<typeof dispatch2props>, {}> {

  render() {
    const {t, consumer} = this.props
    return (
      <Page>
        {consumer!.template === Template.LOAN_EQUITY &&
        <SettingsConfigLoanEquity/>
        }
      </Page>
    )
  }
}

const state2props = (state: RootState, ownProps: IProps) => ({
  consumer: state.consumer.entity,
})

const dispatch2props = (dispatch: any, ownProps: any) => ({})

export default compose(
  withI18n,
  withStyles(styles),
  connect(state2props, dispatch2props),
  withGlobalProgress,
  withToast,
)(SettingsConfig)
