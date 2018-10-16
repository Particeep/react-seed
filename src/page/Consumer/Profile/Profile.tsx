import * as React from 'react'
import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core'
import {WithI18n, withI18n} from '../../../core/i18n/I18n'
import {compose} from 'redux'
import {Animate, AnimateList, IconBtn, TableSortCell, withGlobalProgress, withToast} from 'react-components'
import {connect} from 'react-redux'
import PageHead from '../../../shared/PageHead/PageHead'
import {RouteComponentProps, withRouter} from 'react-router'
import Page from '../../../shared/Page/Page'
import {Panel} from '../../../shared/Panel'
import {RootState} from '../../../core/redux/reducer'
import PanelContent from '../../../shared/Panel/PanelContent'

const styles = (t: Theme) => createStyles({})

interface IProps extends WithI18n,
  RouteComponentProps<any>,
  WithStyles<typeof styles> {
  dispatch: any;
}

class Profile extends React.Component<IProps & ReturnType<typeof state2props> & ReturnType<typeof dispatch2props>, {}> {

  render() {
    const {t, connectedUser} = this.props
    return (
      <>
        <PageHead title={t.Profile_title}/>
        <Page>
          <Panel>
            <PanelContent>
              {JSON.stringify(connectedUser)}
            </PanelContent>
          </Panel>
        </Page>
      </>
    )
  }
}

const state2props = (state: RootState) => ({
  connectedUser: state.connectedUser.entity,
})

const dispatch2props = (dispatch: any) => ({})

export default compose(
  withRouter,
  withI18n,
  withStyles(styles),
  connect(state2props, dispatch2props),
)(Profile)
