'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

interface GameContextType {
  gameStarted: boolean
  selectedDifficulty: string
  startNewGame: () => void
  stopGame: () => void
  setDifficulty: (difficulty: string) => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameStarted, setGameStarted] = useState(false)
  const [selectedDifficulty, setSelectedDifficulty] = useState('warrior') // Default to Warrior

  const startNewGame = useCallback(() => {
    setGameStarted(true)
  }, [])

  const stopGame = useCallback(() => {
    setGameStarted(false)
  }, [])

  const setDifficulty = useCallback((difficulty: string) => {
    setSelectedDifficulty(difficulty)
  }, [])

  return (
    <GameContext.Provider value={{ 
      gameStarted, 
      selectedDifficulty, 
      startNewGame, 
      stopGame, 
      setDifficulty 
    }}>
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
