import React from 'react'
import ReactDOM from 'react-dom'

import * as serviceWorker from './serviceWorker'

import App from './App'

import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'nprogress/nprogress.css'

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.register()
