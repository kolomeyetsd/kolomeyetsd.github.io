//
import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actionTypes from '../actionTypes'

const LOCAL_STORAGE_KEY = 'chess_state'


class Tools extends Component {

  constructor (props) {
    super(props)

    this.state = {
      canLoad: localStorage.getItem(LOCAL_STORAGE_KEY)
    }

    this.onButtonClick = this.onButtonClick.bind(this)
  }

  onButtonClick (action) {
    switch (action) {

      case 'save': {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.props, null, 2))
        this.setState({ canLoad: true })
      }
      break

      case 'load': {
        this.props.dispatch({
          type: actionTypes.STATE_LOADED,
          state: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        })
      }
      break

      case 'reset': {
        this.props.dispatch({ type: actionTypes.STATE_RESET })
      }
      break
    }
  }

  render () {
    return (
      <div className="app-tools">
        <span>{`Turn color: ${this.props.turnColor}`}</span>
        <Button
          onClick={this.onButtonClick}
          action="save"
          disabled={this.props.turnsCount === 0}
        />
        <Button
          onClick={this.onButtonClick}
          action="load"
          disabled={!this.state.canLoad}
        />
        <Button
          onClick={this.onButtonClick}
          action="reset"
          disabled={this.props.turnsCount === 0}
        />
      </div>
    )
  }
}

const Button = props => {
  if (props.disabled) {
    return (
      <span>
        {props.action}
      </span>
    )
  }

  return (
    <a href="#" onClick={() => props.onClick(props.action)}>
      {props.action}
    </a>
  )
}


export const ToolsContainer = connect(state => state)(Tools)
