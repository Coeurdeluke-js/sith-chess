'use client'

import { Sidebar } from '@/components/Sidebar'
import { Downbar } from '@/components/Downbar'
import { useGame } from '@/contexts/GameContext'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export default function ChessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { gameStarted, startNewGame, stopGame } = useGame()
  const router = useRouter()

  const handleStopGame = useCallback(() => {
    stopGame()
    // Navegar de vuelta a inicio después de detener el juego
    setTimeout(() => {
      router.push('/inicio')
    }, 300)
  }, [stopGame, router])

  return (
    <div className="flex h-screen bg-primary">
      <Sidebar 
        onNewGame={startNewGame}
        gameStarted={gameStarted}
        onStopGame={handleStopGame}
      />
      <main className="flex-1 overflow-auto pb-32 md:pb-0">
        {children}
      </main>
      <Downbar 
        onNewGame={startNewGame}
        gameStarted={gameStarted}
        onStopGame={handleStopGame}
      />
    </div>
  )
}
