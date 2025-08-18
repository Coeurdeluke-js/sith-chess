'use client'

import { Sidebar } from '@/components/Sidebar'
import { useGame } from '@/contexts/GameContext'

export default function ArtGalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { gameStarted, startNewGame, stopGame } = useGame()

  return (
    <div className="flex h-screen bg-primary">
      <Sidebar 
        onNewGame={startNewGame}
        gameStarted={gameStarted}
        onStopGame={stopGame}
      />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
