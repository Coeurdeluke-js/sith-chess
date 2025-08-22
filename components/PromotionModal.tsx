'use client'

import { useState } from 'react'
import { ChessPiece } from './ChessPiece'

interface PromotionModalProps {
  isVisible: boolean
  playerColor: 'w' | 'b'
  onSelectPiece: (pieceType: 'q' | 'r' | 'b' | 'n') => void
}

export const PromotionModal = ({ isVisible, playerColor, onSelectPiece }: PromotionModalProps) => {
  const [selectedPiece, setSelectedPiece] = useState<'q' | 'r' | 'b' | 'n' | null>(null)

  if (!isVisible) return null

  const promotionPieces = [
    { type: 'q', name: 'Reina', symbol: '♕' },
    { type: 'r', name: 'Torre', symbol: '♖' },
    { type: 'b', name: 'Alfil', symbol: '♗' },
    { type: 'n', name: 'Caballo', symbol: '♘' }
  ] as const

  const handlePieceSelect = (pieceType: 'q' | 'r' | 'b' | 'n') => {
    setSelectedPiece(pieceType)
    onSelectPiece(pieceType)
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-secondary border border-board-border rounded-lg p-6 max-w-sm w-full mx-4">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-text mb-2">
            ¡Tu peón ha llegado al final!
          </h3>
          <p className="text-textMuted text-sm">
            Elige la pieza con la que quieres promocionar tu peón
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {promotionPieces.map((piece) => (
            <button
              key={piece.type}
              onClick={() => handlePieceSelect(piece.type)}
              className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                selectedPiece === piece.type
                  ? 'border-[#ec4d58] bg-[#ec4d58]/10 shadow-lg'
                  : 'border-board-border hover:border-[#ec4d58]/50'
              }`}
            >
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <div className={`w-12 h-12 flex items-center justify-center text-3xl ${
                    playerColor === 'w' ? 'text-white' : 'text-gray-800'
                  }`}>
                    {piece.symbol}
                  </div>
                </div>
                <div className="text-sm font-medium text-text">
                  {piece.name}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center">
          <p className="text-xs text-textMuted">
            La reina es la opción más poderosa, pero cada pieza tiene sus ventajas estratégicas
          </p>
        </div>
      </div>
    </div>
  )
}
