//
import React from 'react'
import { render } from 'react-dom'

import App from './App'
import style from './style.css'


document.addEventListener('DOMContentLoaded', () => {
  render(<App />, document.getElementById('app'))
})
