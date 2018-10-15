import * as React from 'react'
import App from './App'
import {muiTheme} from './conf/mui-theme'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core'
import {connect} from 'react-redux'
import {GlobalProgressProvider, ToastProvider} from 'react-components'
import {RootState} from './core/redux/reducer'

class Main extends React.Component<ReturnType<typeof state2props>, {}> {

  render() {
    const {isDarkTheme} = this.props
    return (
      <MuiThemeProvider theme={createMuiTheme(muiTheme(isDarkTheme))}>
        <GlobalProgressProvider>
          <ToastProvider>
            <App/>
          </ToastProvider>
        </GlobalProgressProvider>
      </MuiThemeProvider>
    )
  }
}

const state2props = (state: RootState) => ({
  isDarkTheme: state.ui.theme.isDark,
})

export default connect(state2props)(Main)
