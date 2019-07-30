//
import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { PieceContainer } from './Piece'
import * as actionTypes from '../actionTypes'


export class Square extends Component {

  constructor (props) {
    super(props)

    this.onMouseOver = this.onMouseOver.bind(this)
    this.onPieceDragStart = this.onPieceDragStart.bind(this)
    this.onPieceDrop = this.onPieceDrop.bind(this)
  }

  onMouseOver (e) {
    if (!this.props.allowedDropSquareIds) return

    this.props.dispatch({
      type: actionTypes.SQUARE_DRAG_OVER,
      square: this.props.model
    })
  }

  onPieceDragStart () {
    this.props.dispatch({
      type: actionTypes.PIECE_DRAG_STARTED,
      square: this.props.model
    })
  }

  onPieceDrop () {
    this.props.dispatch({
      type: actionTypes.PIECE_DROPPED,
      square: this.props.model
    })
  }

  render () {
    const { props, state } = this
    const { model } = props

    const highlightColor = getHighlightColor(
      props.allowedDropSquareIds,
      props.dragOverSquareId,
      props.dragFromSquareId,
      model.id
    )
    const className = classnames('square', model.black ? 'black' : 'white')

    return (
      <div className={className} onMouseOver={this.onMouseOver}>
        {highlightColor && (
          <div className={classnames('highlight', highlightColor)} />
        )}
        {model.piece && (
          <PieceContainer
            model={model.piece}
            onDragStart={this.onPieceDragStart}
            onDrag={this.onPieceDrag}
            onDrop={this.onPieceDrop}
          />
        )}
      </div>
    )
  }
}


export const SquareContainer = connect(
  (state, ownProps) => {
    return {
      ...ownProps,
      dragOverSquareId: state.dragOverSquareId,
      dragFromSquareId: state.dragFromSquareId,
      allowedDropSquareIds: state.allowedDropSquareIds
    }
  }
)(Square)


const getHighlightColor = (allowedIds, dragOverId, dragFromId, targetId) => {
  if (!allowedIds) return false
  if (allowedIds.includes(targetId)) return dragOverId === targetId ? 'green' : 'blue'
  if (dragOverId === targetId) return dragFromId === targetId ? 'grey' : 'red'
  return false
}
