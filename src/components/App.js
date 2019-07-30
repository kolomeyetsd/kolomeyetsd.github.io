//
import React, { Component, Fragment } from 'react'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

import { DeskContainer } from './Desk'
import { ToolsContainer } from './Tools'
import reducer from '../reducer'

const store = createStore(reducer)

export const App = props => {
  return (
    <Provider store={store}>
      <DeskContainer />
      <ToolsContainer />
    </Provider>
  )
}
