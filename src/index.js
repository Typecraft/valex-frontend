import React from 'react'
import ReactDOM from 'react-dom'
import './normalize.css'
import './valex.css'
import './typecraft.css'
import 'react-select/dist/react-select.css'
import App from './views/app/App'
// import registerServiceWorker from './registerServiceWorker'
import configureStore from './state'
import api from 'api'

import 'util/polyfills'

import users from 'state/users'
import login from 'state/login'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
const store = configureStore()

api.getAndSetApiKey()
.then(loggedIn => {
  if (loggedIn) {
    store.dispatch(users.actions.loadCurrent())
    store.dispatch(login.actions.login())
  }

  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  )

  if (module.hot) {
    module.hot.accept('./views/app/App', () => {
      const NextApp = require('./views/app/App').default
        ReactDOM.render(
          <Provider store={store}>
            <BrowserRouter>
              <NextApp />
            </BrowserRouter>
          </Provider>,
          document.getElementById('root')
        )
    })

    module.hot.accept('./state/rootReducer', () => {
      const nextConfigureStore = require('./state').default
      ReactDOM.render(
        <Provider store={nextConfigureStore()}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>,
        document.getElementById('root')
      )
    })

    module.hot.accept('./state/rootSaga', () => {
        const nextConfigureStore = require('./state').default
        ReactDOM.render(
          <Provider store={nextConfigureStore()}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Provider>,
          document.getElementById('root')
        )
    })
  }
  // registerServiceWorker()
})
