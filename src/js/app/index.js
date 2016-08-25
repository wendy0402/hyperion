import React from 'react'
import arthurStore from './store/index'
import { render} from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/app'

render(
  <Provider store={arthurStore}>
    <App />
  </Provider>,
  document.getElementById("react-root")
);
