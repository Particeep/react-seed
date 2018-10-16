import * as React from 'react'
import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core'
import {WithI18n, withI18n} from '../../../core/i18n/withI18n'
import {compose} from 'redux'
import {Animate, AnimateList, IconBtn, TableSortCell, withGlobalProgress, withToast} from 'react-components'
import {connect} from 'react-redux'
import PageHead from '../../../shared/PageHead/PageHead'
import {RouteComponentProps, withRouter} from 'react-router'
import Page from '../../../shared/Page/Page'
import {Panel} from '../../../shared/Panel'
import {RootState} from '../../../core/redux/reducer'

const styles = (t: Theme) => createStyles({})

interface IProps extends WithI18n,
  RouteComponentProps<any>,
  WithStyles<typeof styles> {
  dispatch: any;
}

class User extends React.Component<IProps & ReturnType<typeof dispatch2props>, {}> {

  render() {
    const {t} = this.props
    return (
      <>
        <PageHead title={t.Users_title}/>
        <Page>
          <Panel>
          </Panel>
        </Page>
      </>
    )
  }
}

const state2props = (state: RootState) => ({})

const dispatch2props = (dispatch: any) => ({})

export default compose(
  withRouter,
  withI18n,
  withStyles(styles),
  connect(null, dispatch2props),
)(User)
