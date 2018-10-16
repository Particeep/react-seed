import * as React from 'react'
import App from './App'
import {muiTheme} from './conf/mui-theme'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core'
import {connect} from 'react-redux'
import {GlobalProgressProvider, ToastProvider} from 'react-components'
import {RootState} from './core/redux/reducer'
import {I18nProvider} from './core/i18n/I18n'

class Main extends React.Component<ReturnType<typeof state2props>, {}> {

  render() {
    const {isDarkTheme, lang} = this.props
    return (
      <MuiThemeProvider theme={createMuiTheme(muiTheme(isDarkTheme))}>
        <I18nProvider lang={lang}>
          <GlobalProgressProvider>
            <ToastProvider>
              <App/>
            </ToastProvider>
          </GlobalProgressProvider>
        </I18nProvider>
      </MuiThemeProvider>
    )
  }
}

const state2props = (state: RootState) => ({
  isDarkTheme: state.ui.theme.isDark,
  lang: state.ui.i18n.lang,
})

export default connect(state2props)(Main)
