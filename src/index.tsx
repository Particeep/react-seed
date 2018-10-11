import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import {muiTheme} from './conf/mui-theme'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core'
import {Provider} from 'react-redux'
import {index} from './core/redux/index'
import {GlobalProgressProvider, ToastProvider} from 'react-components'

ReactDOM.render(
  <MuiThemeProvider theme={createMuiTheme(muiTheme)}>
    <Provider store={index}>
      <GlobalProgressProvider>
        <ToastProvider>
          <App/>
        </ToastProvider>
      </GlobalProgressProvider>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('react-dashboard') as HTMLElement
)
