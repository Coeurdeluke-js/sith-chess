'use client'

import Image from 'next/image'

interface ChessPieceMiniProps {
  type: 'k' | 'q' | 'r' | 'b' | 'n' | 'p'
  color: 'w' | 'b'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const ChessPieceMini = ({ type, color, size = 'md' }: ChessPieceMiniProps) => {
  // Mapear tipos de piezas a nombres de archivo
  const getPieceImage = (type: string, color: string) => {
    // Mapeo completo de tipos de piezas a nombres de archivo
    const pieceTypeMap: { [key: string]: string } = {
      'p': 'pawn',      // Peón
      'r': 'rock',      // Torre (rook)
      'n': 'knight',    // Caballo (knight)
      'b': 'bishop',    // Alfil (bishop)
      'q': 'queen',     // Reina (queen)
      'k': 'king'       // Rey (king)
    }
    
    const pieceType = pieceTypeMap[type] || type
    const colorFolder = color === 'w' ? 'white_pieces' : 'black_pieces'
    return `/pieces/${colorFolder}/${pieceType}.png`
  }

  // Tamaños para diferentes escalas
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10'
  }

  const imageSrc = getPieceImage(type, color)
  
  return (
    <div className={`relative flex items-center justify-center ${sizeClasses[size]}`}>
      <Image
        src={imageSrc}
        alt={`${color === 'w' ? 'Blanca' : 'Negra'} ${type === 'p' ? 'peón' : type === 'r' ? 'torre' : type === 'n' ? 'caballo' : type === 'b' ? 'alfil' : type === 'q' ? 'reina' : 'rey'}`}
        width={size === 'sm' ? 16 : size === 'md' ? 24 : size === 'lg' ? 32 : 40}
        height={size === 'sm' ? 16 : size === 'md' ? 24 : size === 'lg' ? 32 : 40}
        className="w-full h-full object-contain"
        priority={false}
        onError={(e) => {
          // Fallback a Unicode si la imagen falla
          const target = e.target as HTMLImageElement
          target.style.display = 'none'
          const fallback = document.createElement('div')
          fallback.className = `text-${size === 'sm' ? 'sm' : size === 'md' ? 'base' : size === 'lg' ? 'lg' : 'xl'} font-bold flex items-center justify-center w-full h-full`
          fallback.textContent = getUnicodePiece(type, color)
          target.parentNode?.appendChild(fallback)
        }}
      />
    </div>
  )
}

// Función de fallback para Unicode (por si las imágenes fallan)
const getUnicodePiece = (type: string, color: string) => {
  const isWhite = color === 'w'
  switch (type) {
    case 'p': return isWhite ? '♙' : '♟' // Peón
    case 'r': return isWhite ? '♖' : '♜' // Torre
    case 'n': return isWhite ? '♘' : '♞' // Caballo
    case 'b': return isWhite ? '♗' : '♝' // Alfil
    case 'q': return isWhite ? '♕' : '♛' // Reina
    case 'k': return isWhite ? '♔' : '♚' // Rey
    default: return '?'
  }
}
