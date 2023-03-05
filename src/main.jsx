import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './css/styles.css'
import { BrowserRouter } from 'react-router-dom'
import ContactAppStore from './redux/store'
import { Provider as ReduxProvider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReduxProvider store={ContactAppStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>,
)
