//
import React from 'react'
import { connect } from 'react-redux'

import { SquareContainer } from './Square'


const Desk = props => {
  return (
    <div className="desk">
      {props.squares.map((square, i) => (
        <SquareContainer key={i} index={i} model={square} />
      ))}
    </div>
  )
}

export const DeskContainer = connect(
  (state) => {
    return {
      squares: state.squares
    }
  }
)(Desk)
