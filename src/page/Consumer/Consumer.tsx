import * as React from 'react'
import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core'
import {WithI18n, withI18n} from '../../core/i18n/withI18n'
import {connect} from 'react-redux'
import {RootState} from '../../core/redux'
import {compose} from 'redux'
import {loadConsumer} from '../../core/action/consumerAction'
import {Sidebar} from '../../core/component/Sidebar'
import SidebarLayout from '../../core/component/Sidebar/SidebarLayout'
import {Redirect, Route, RouteComponentProps, Switch, withRouter} from 'react-router'
import {WithGlobalProgress} from '../../type/lib/withGlobalProgress'
import {WithToast} from '../../type/lib/withToast'
import {AnimateList, withGlobalProgress, withToast} from 'react-components'
import Users from './Users/Users'
import Fundraises from './Fundraises/Fundraises'
import Settings from './Settings/Settings'
import Dashboard from './Dashboard/Dashboard'

const styles = (t: Theme) => createStyles({})

interface IProps extends WithI18n,
  WithGlobalProgress,
  WithToast,
  RouteComponentProps<any>,
  WithStyles<typeof styles>,
  ReturnType<typeof state2props>,
  ReturnType<typeof dispatch2props> {
}

class Consumer extends React.Component<IProps, any> {

  render() {
    const {consumer, match} = this.props
    return (
      <SidebarLayout>
        <Sidebar basePath={match.url}/>
        {consumer &&
          <Switch>
            <Route path={this.route('/dashboard')} component={Dashboard}/>
            <Route path={this.route('/users')} component={Users}/>
            <Route path={this.route('/fundraises')} component={Fundraises}/>
            <Route path={this.route('/settings')} component={Settings}/>
            <Redirect exact from={this.route('')} to={this.route('/dashboard')}/>
          </Switch>
        }
      </SidebarLayout>
    )
  }

  async componentDidMount() {
    const {getConsumer, progressEnd, progressStop, toastError, progressStart} = this.props
    progressStart()
    try {
      await getConsumer()
      progressEnd()
    } catch (error) {
      toastError(error.msg)
      progressStop()
    }
  }

  private route(path: string = '') {
    return this.props.match.url + path
  }
}

const state2props = (state: RootState) => ({
  isFetching: state.consumer.isFetching,
  consumer: state.consumer.entity,
  error: state.consumer.error,
})

const dispatch2props = (dispatch: any, ownProps: any) => ({
  getConsumer: () => dispatch(loadConsumer(ownProps!.match!.params.key)),
})

export default compose(
  withI18n,
  withStyles(styles),
  withRouter,
  withGlobalProgress,
  withToast,
  connect(state2props, dispatch2props),
)(Consumer)
