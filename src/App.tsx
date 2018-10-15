import * as React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core'
import {Redirect, Route, Switch} from 'react-router'
import {config} from './conf/config'
import Consumers from './page/Consumers/Consumers'
import Consumer from './page/Consumer/Consumer'
import {GlobalProgressBar} from 'react-components'

const paddingTop = (t: Theme) => 0

const styles = (t: Theme) => createStyles({
  body: {
    color: t.palette.text.primary,
    background: t.palette.background.paper,
    minHeight: `calc(100vh - ${paddingTop(t)}px)`,
    paddingTop: paddingTop(t),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  }
})

interface IProps extends WithStyles<typeof styles> {

}

class App extends React.Component<IProps, {}> {

  render() {
    const {classes} = this.props
    return (
      <BrowserRouter basename={config.basePath}>
        <div className={classes.body}>
        <GlobalProgressBar/>
          <Switch>
            <Route path="/consumers" component={Consumers}/>
            <Route path="/consumer/:key" component={Consumer}/>
            <Redirect exact from="/" to="/consumers"/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default withStyles(styles)(App)
