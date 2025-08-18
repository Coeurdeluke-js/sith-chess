'use client'

interface ChessPieceProps {
  type: 'k' | 'q' | 'r' | 'b' | 'n' | 'p'
  color: 'w' | 'b'
  isSelected?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const ChessPiece = ({ type, color, isSelected }: ChessPieceProps) => {
  const getSelectionEffect = () => {
    if (isSelected) {
      return 'scale-110'
    }
    return ''
  }

  const getPieceColor = () => {
    return color === 'w' ? '#fafafa' : '#8a8a8a'
  }

  // Piezas Unicode
  const getUnicodePiece = () => {
    const pieces = {
      'k': color === 'w' ? '♔' : '♚',
      'q': color === 'w' ? '♕' : '♛',
      'r': color === 'w' ? '♖' : '♜',
      'b': color === 'w' ? '♗' : '♝',
      'n': color === 'w' ? '♘' : '♞',
      'p': color === 'w' ? '♙' : '♟'
    }
    return pieces[type]
  }

  return (
    <div 
      className={`flex items-center justify-center w-full h-full transition-all duration-300 ease-out ${getSelectionEffect()}`}
      data-selected={isSelected}
    >
      <span 
        className="text-6xl font-bold"
        style={{
          color: getPieceColor()
        }}
      >
        {getUnicodePiece()}
      </span>
    </div>
  )
}
