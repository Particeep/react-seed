import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {GlobalProgressProvider, ToastProvider} from 'react-components'
import Main from './Main'
import {store} from './core/redux/reducer'
import {Provider} from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <Main/>
  </Provider>,
  document.getElementById('react-dashboard') as HTMLElement
)
