//
import * as actionTypes from './actionTypes'
import {
  isTurnLegal,
  isSquareBusy,
  initGameState,
  switchTurnColor
} from './gameLogicHelpers'



export default (state = initGameState(), action) => {

  switch (action.type) {

    case actionTypes.STATE_RESET: {
      return initGameState()
    }

    case actionTypes.STATE_LOADED: {
      return action.state
    }

    case actionTypes.PIECE_DRAG_STARTED: {
      return {
        ...state,
        dragFromSquareId: action.square.id,
        dragOverSquareId: action.square.id,
        allowedDropSquareIds: state.squares
          .filter(square => isTurnLegal(action.square, square, state.turnColor))
          .filter(square => !isSquareBusy(square, state.turnColor))
          .map(square => square.id),
      }
    }

    case actionTypes.SQUARE_DRAG_OVER: {
      return {
        ...state,
        dragOverSquareId: action.square.id
      }
    }

    case actionTypes.PIECE_DROPPED: {
      const { dragOverSquareId, allowedDropSquareIds } = state

      if ((action.square.id === dragOverSquareId) || !allowedDropSquareIds.includes(dragOverSquareId)) {
        return {
          ...state,
          allowedDropSquareIds: null
        }
      }

      const turnColor = switchTurnColor(state.turnColor)
      const { piece } = state.squares.find(square => square.id === state.dragFromSquareId)

      return {
        turnsCount: state.turnsCount + 1,
        turnColor,
        allowedDropSquareIds: null,
        dragOverSquareId: null,
        dragOverSquareId: null,
        squares: state.squares.map(square => {
          if (square.id === state.dragOverSquareId) {
            return {
              ...square,
              piece: {
                ...piece,
                turnsCount: piece.turnsCount + 1
              }
            }
          }
          if (square.id === state.dragFromSquareId) return { ...square, piece: null }
          return square
        })
      }
    }

    default: return state
  }
}
