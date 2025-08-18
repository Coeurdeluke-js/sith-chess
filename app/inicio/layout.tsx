'use client'

import { Sidebar } from '@/components/Sidebar'
import { Downbar } from '@/components/Downbar'
import { useGame } from '@/contexts/GameContext'

export default function InicioLayout({
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
      <main className="flex-1 overflow-auto pb-32 md:pb-0">
        {children}
      </main>
      <Downbar 
        onNewGame={startNewGame}
        gameStarted={gameStarted}
        onStopGame={stopGame}
      />
    </div>
  )
}
