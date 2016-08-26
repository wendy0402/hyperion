import React from 'react'
import arthurStore from './store/index'
import { render} from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/app'
import { History } from './model/history'
import { initializeHistory } from './actions/producer_history'

History.fetchAll((histories) => { arthurStore.dispatch(initializeHistory()) })
render(
  <Provider store={arthurStore}>
    <App />
  </Provider>,
  document.getElementById("react-root")
);
