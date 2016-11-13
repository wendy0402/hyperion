import React from 'react'
import hyperionStore from './store/index'
import { render} from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/app'
import { History } from './model/history'
import { initializeHistory } from './actions/producer_history'

render(
  <Provider store={hyperionStore}>
    <App />
  </Provider>,
  document.getElementById("react-root")
);
