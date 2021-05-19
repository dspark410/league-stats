import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'tippy.js/dist/tippy.css'
import { store } from './redux/store'
import { Provider } from 'react-redux'
//import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <Router>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <App />
      {/* </PersistGate> */}
    </Provider>
  </Router>,
  document.getElementById('root')
)
