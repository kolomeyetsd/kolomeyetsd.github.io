//
import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

const SPRITE_PATH = '/public/chess-sprite.svg'


export class Piece extends Component {

  constructor (props) {
    super(props)

    this.state = {}

    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
  }

  onMouseDown (e) {
    if (this.props.model.color !== this.props.turnColor) return

    e.preventDefault()
    e.stopPropagation()

    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)

    const startX = e.pageX
    const startY = e.pageY

    this.setState({ startX, startY })
    this.props.onDragStart()
  }

  onMouseMove (e) {
    e.stopPropagation()
    e.preventDefault()

    this.setState({
      dragging: true,
      left: e.pageX - this.state.startX,
      top: e.pageY - this.state.startY
    })
  }

  onMouseUp (e) {
    e.stopPropagation()
    e.preventDefault()

    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)

    this.setState({ dragging: false })
    this.props.onDrop()
  }

  render () {
    const { props, state } = this
    const { model } = props

    const className = classnames(
      'piece',
      {'no-user-drag': this.props.model.color !== this.props.turnColor}
    )
    const style = !state.dragging ? {} : {
      pointerEvents: 'none',
      transform: `translate(${state.left}px, ${state.top}px)`,
      zIndex: 1
    }

    return (
      <svg className={className} style={style} onMouseDown={this.onMouseDown}>
        <use xlinkHref={`${SPRITE_PATH}#${model.color}-${model.name}`} />
      </svg>
    )
  }
}

export const PieceContainer = connect(
  (state, ownProps) => {
    return {
      ...ownProps,
      turnColor: state.turnColor
    }
  }
)(Piece)
