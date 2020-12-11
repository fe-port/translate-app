import React from 'react'
import ReactDOM from 'react-dom'
import DefaultLayout from './layout/DefaultLayout'
import App from './App'

import 'tailwindcss/tailwind.css'
import './styles/index.css'

ReactDOM.render(<DefaultLayout><App /></DefaultLayout>, document.getElementById('root'))
