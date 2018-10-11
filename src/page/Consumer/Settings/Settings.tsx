import * as React from 'react'
import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core'
import {WithI18n, withI18n} from '../../../core/i18n/withI18n'
import {compose} from 'redux'
import {AnimateList, IconBtn, withGlobalProgress, withToast} from 'react-components'
import {connect} from 'react-redux'
import PageHead from '../../../shared/PageHead/PageHead'
import PageHeadLink from '../../../shared/PageHead/PageHeadLink'
import {Redirect, Route, RouteComponentProps, Switch, withRouter} from 'react-router'
import SettingsConfig from './SettingsConfig'
import SettingsGeneral from './SettingsGeneral'

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
        <PageHead title={t.Users_title}>
          <PageHeadLink to={this.route('/general')} label="general"/>
          <PageHeadLink to={this.route('/config')} label="config"/>
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

  componentDidMount() {
  }
}

export default compose(
  withRouter,
  withI18n,
  withStyles(styles),
  connect(null),
)(Users)
