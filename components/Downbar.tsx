'use client'

import { Home, RefreshCw, Settings, HelpCircle, Play, Square, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface DownbarProps {
  onNewGame: () => void
  gameStarted?: boolean
  onStopGame?: () => void
}

export const Downbar = ({ onNewGame, gameStarted = false, onStopGame }: DownbarProps) => {
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const router = useRouter()

  const downbarItems = [
    { icon: Home, label: 'Inicio', description: 'Página principal', href: '/inicio' },
    { icon: ImageIcon, label: 'Galería', description: 'Arte Sith', href: '/art-gallery' },
    { icon: Settings, label: 'Config', description: 'Ajustes', href: '/configuracion' },
    { icon: HelpCircle, label: 'Ayuda', description: 'Reglas', href: '/ayuda' }
  ]

  const handlePlayClick = () => {
    onNewGame()
    router.push('/chess')
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-secondary border-t border-board-border z-50 downbar-container">
      {/* Barra principal */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo pequeño */}
        <div className="flex-shrink-0">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={32} 
            height={32}
            className="rounded-lg logo-image"
          />
        </div>

        {/* Botón Nueva Partida/Stop - Centrado y destacado */}
        <div className="flex-1 flex justify-center">
          {gameStarted ? (
            <button
              onClick={onStopGame}
              className="w-14 h-14 bg-[#ec4d58] hover:bg-[#d13d48] rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
              title="Finalizar Partida"
            >
              <Square className="w-7 h-7 text-white" />
            </button>
          ) : (
            <button
              onClick={handlePlayClick}
              className="w-14 h-14 bg-[#ec4d58] hover:bg-[#d13d48] rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
              title="Jugar Ajedrez"
            >
              <Play className="w-7 h-7 text-white" />
            </button>
          )}
        </div>

        {/* Estado online */}
        <div className="flex-shrink-0 flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs text-textMuted">Online</span>
        </div>
      </div>

      {/* Barra de navegación */}
      <div className="flex items-center justify-around px-2 py-2 border-t border-board-border bg-accent">
        {downbarItems.map((item) => (
          <Link 
            key={item.label} 
            href={item.href}
            className="flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-300 hover:bg-board-highlight group"
            onClick={() => setActiveItem(item.label)}
          >
            <item.icon className="w-5 h-5 text-textMuted group-hover:text-text transition-colors duration-300" />
            <span className="text-xs text-textMuted group-hover:text-text transition-colors duration-300 font-medium">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
