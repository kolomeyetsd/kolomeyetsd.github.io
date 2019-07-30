//
const TURN_COLORS = ['black', 'white']
const FIRST_TURN_COLOR = TURN_COLORS[0]

const initialPositionsKeyIndex = {
  'white-rook': [ 0, 7 ],
  'white-knight': [ 1, 6 ],
  'white-bishop': [ 2, 5 ],
  'white-king': [ 3 ],
  'white-queen': [ 4 ],
  'white-pawn': [ 8, 9, 10, 11, 12, 13, 14, 15 ],

  'black-rook': [ 56, 63 ],
  'black-knight': [ 57, 62 ],
  'black-bishop': [ 58, 61 ],
  'black-king': [ 59 ],
  'black-queen': [ 60 ],
  'black-pawn': [ 48, 49, 50, 51, 52, 53, 54, 55 ]
}


export const isTurnLegal = (squareFrom, squareTo, turnColor) => {
  const { name, color } = squareFrom.piece
  const x1 = squareFrom.x
  const y1 = squareFrom.y
  const x2 = squareTo.x
  const y2 = squareTo.y

  switch (name) {
    // пешка
    case 'pawn': {
      if (x1 !== x2) return false

      const maxNumberOfSquares = squareFrom.piece.turnsCount === 0 ? 3 : 2

      if (turnColor === 'black' && (((y1 - y2) > 0) && ((y1 - y2) < maxNumberOfSquares))) return true
      if (turnColor === 'white' && (((y2 - y1) > 0) && ((y2 - y1) < maxNumberOfSquares))) return true
      return false
    }

    // ладья
    case 'rook': return x1 === x2 || y1 === y2

    // конь
    case 'knight': {
      const dx = x1 - x2
      const dy = y1 - y2

      return (Math.abs(dx) === 2 && Math.abs(dy) === 1) || (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    }

    // слон
    case 'bishop': return Math.abs(x1 - x2) === Math.abs(y1 - y2)

    // ферзь
    case 'queen': return (Math.abs(x1 - x2) === Math.abs(y1 - y2)) || (x1 === x2 || y1 === y2)

    // король
    case 'king': return (Math.abs(x1 - x2) < 2) && (Math.abs(y1 - y2) < 2)
  }
}


export const isSquareBusy = (square, turnColor) => {
  return square.piece && (square.piece.color === turnColor)
}


export const initSquares = (turnColor) => {
  const squares = [...Array(64)].map((val, i) => initEmptySquare(i))
  const positionsIndexKey = []

  Object
    .entries(initialPositionsKeyIndex)
    .forEach(([ key, indexes ]) => {
      indexes.forEach(index => {
        const [ color, name ] = key.split('-')
        positionsIndexKey[index] = { color, name, index }
      })
    })

  return squares
    .map((square, i) => {
      if (!positionsIndexKey[i]) return square
      return {
        ...square,
        piece: {
          ...positionsIndexKey[i],
          id: i,
          turnsCount: 0
        }
      }
    })
}


const initEmptySquare = index => {
  const x = index % 8
  const y = Math.floor(index / 8)
  const black = (x + y) % 2 === 1

  return { id: index, x, y, black }
}


export const initGameState = () => {
  return {
    turnsCount: 0,
    turnColor: FIRST_TURN_COLOR,
    squares: initSquares(FIRST_TURN_COLOR)
  }
}


export const switchTurnColor = (turnColor) => {
  return TURN_COLORS[Number(!TURN_COLORS.indexOf(turnColor))]
}
