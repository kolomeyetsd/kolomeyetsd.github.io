//
import React from 'react'
import renderer from 'react-test-renderer'

import { App } from '../components/App'
import reducer from '../reducer'
import * as actionTypes from '../actionTypes'


describe('test just one render case', () => {

  it('should render app tree', () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})


describe('test some reducer cases', () => {
  const state = reducer(undefined, { type: actionTypes.STATE_RESET })
  const squareId = 'squareId'
  const square = {
    id: squareId,
    x: 1,
    y: 7,
    piece: { id: 'pieceId', name: 'knight', color: 'black' }
  }
  const pieceDragStartedAction = { type: actionTypes.PIECE_DRAG_STARTED, square }
  const pieceDropAction = { type: actionTypes.PIECE_DROPPED, square }

  it('should set proper square ids: fromId, toId, allowedToDropIds - when black knight drag started', () => {
    const nextState = reducer(state, pieceDragStartedAction)

    expect(nextState.dragFromSquareId).toBe(squareId)
    expect(nextState.dragFromSquareId).toBe(squareId)
    expect(nextState.allowedDropSquareIds).toEqual([ 40, 42 ])
  })

  it('should not consider as turn, when drop piece on square from which turn started', () => {
    const nextState = reducer(reducer(state, pieceDragStartedAction), pieceDropAction)

    expect(nextState.turnsCount).toBe(0)
  })
})
