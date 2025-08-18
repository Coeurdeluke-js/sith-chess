'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

interface GameContextType {
  gameStarted: boolean
  startNewGame: () => void
  stopGame: () => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameStarted, setGameStarted] = useState(false)

  const startNewGame = useCallback(() => {
    setGameStarted(true)
  }, [])

  const stopGame = useCallback(() => {
    setGameStarted(false)
  }, [])

  return (
    <GameContext.Provider value={{ gameStarted, startNewGame, stopGame }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
