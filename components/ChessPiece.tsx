'use client'

import Image from 'next/image'
import { Piece } from 'chess.js'

interface ChessPieceProps {
  piece: Piece
  isSelected?: boolean
  isValidMove?: boolean
  isLastMove?: boolean
  isAnimating?: boolean
  className?: string
  isPlayerTurn?: boolean
  square: string // Agregar la coordenada de la casilla
  onDragStart?: (e: React.DragEvent, piece: Piece) => void
}

export const ChessPiece = ({ 
  piece, 
  isSelected, 
  isValidMove, 
  isLastMove, 
  isAnimating,
  className = '',
  isPlayerTurn = false,
  square,
  onDragStart
}: ChessPieceProps) => {
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
    const imagePath = `/pieces/${colorFolder}/${pieceType}.png`
    return imagePath
  }

  const imageSrc = getPieceImage(piece.type, piece.color)
  
  // Clases CSS para diferentes estados
  const pieceClasses = [
    'w-full h-full object-contain transition-all duration-300',
    isSelected && 'scale-110 drop-shadow-lg',
    isValidMove && 'animate-pulse',
    isLastMove && 'ring-2 ring-[#ec4d58] ring-opacity-75',
    isAnimating && 'animate-ping',
    isPlayerTurn && 'cursor-grab active:cursor-grabbing',
    !isPlayerTurn && 'cursor-not-allowed',
    className
  ].filter(Boolean).join(' ')

  const handleDragStart = (e: React.DragEvent) => {
    if (!isPlayerTurn) {
      e.preventDefault()
      return
    }
    
    if (onDragStart) {
      onDragStart(e, piece)
    }
    
    // Establecer datos del drag
    e.dataTransfer.setData('text/plain', JSON.stringify({
      type: piece.type,
      color: piece.color,
      from: square
    }))
    
    // Efecto visual durante el drag
    e.dataTransfer.effectAllowed = 'move'
    
    // Hacer la pieza semi-transparente durante el drag
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.6'
    }
  }

  const handleDragEnd = (e: React.DragEvent) => {
    // Restaurar opacidad
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1'
    }
  }

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center"
      draggable={isPlayerTurn}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Image
        src={imageSrc}
        alt={`${piece.color === 'w' ? 'Blanca' : 'Negra'} ${piece.type === 'p' ? 'peón' : piece.type === 'r' ? 'torre' : piece.type === 'n' ? 'caballo' : piece.type === 'b' ? 'alfil' : piece.type === 'q' ? 'reina' : 'rey'}`}
        width={64}
        height={64}
        className={pieceClasses}
        priority={true}
        onError={(e) => {
          // Fallback a Unicode si la imagen falla
          const target = e.target as HTMLImageElement
          target.style.display = 'none'
          const fallback = document.createElement('div')
          fallback.className = `text-4xl font-bold ${pieceClasses} flex items-center justify-center`
          fallback.textContent = getUnicodePiece(piece.type, piece.color)
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
