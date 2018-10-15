import * as React from 'react'
import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core'
import {WithI18n, withI18n} from '../../../core/i18n/withI18n'
import {compose} from 'redux'
import {AnimateList, IconBtn, withGlobalProgress, withToast} from 'react-components'
import {connect} from 'react-redux'
import PageHead from '../../../shared/PageHead/PageHead'
import PageHeadLink from '../../../shared/PageHead/PageHeadLink'
import {Redirect, Route, RouteComponentProps, Switch, withRouter} from 'react-router'
import SettingsConfig from './Config/SettingsConfig'
import SettingsGeneral from './General/SettingsGeneral'

const styles = (t: Theme) => createStyles({})

interface IProps extends WithI18n,
  RouteComponentProps<any>,
  WithStyles<typeof styles> {
}

class Users extends React.Component<IProps, {}> {

  render() {
    const {t} = this.props
    return (
      <>
        <PageHead title={t.settings}>
          <PageHeadLink to={this.route('/general')} label={t.general}/>
          <PageHeadLink to={this.route('/config')} label={t.configuration}/>
        </PageHead>
        <Switch>
          <Route path={this.route('/general')} component={SettingsGeneral}/>
          <Route path={this.route('/config')} component={SettingsConfig}/>
          <Redirect exact from={this.route('')} to={this.route('/general')}/>
        </Switch>
      </>
    )
  }

  private route(path: string = '') {
    return this.props.match.url + path
  }
}

export default compose(
  withRouter,
  withI18n,
  withStyles(styles),
  connect(null),
)(Users)
