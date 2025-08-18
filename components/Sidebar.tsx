'use client'

import { Home, RefreshCw, Settings, HelpCircle, Play, Square, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface SidebarProps {
  onNewGame: () => void
  gameStarted?: boolean
  onStopGame?: () => void
}

export const Sidebar = ({ onNewGame, gameStarted = false, onStopGame }: SidebarProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const router = useRouter()

  const sidebarItems = [
    { icon: Home, label: 'Inicio', description: 'Página principal del ecosistema', href: '/inicio' },
    { icon: ImageIcon, label: 'Galería', description: 'Arte Sith en su máximo esplendor', href: '/art-gallery' },
    { icon: Settings, label: 'Configuración', description: 'Ajustes del juego', href: '/configuracion' },
    { icon: HelpCircle, label: 'Ayuda', description: 'Reglas y tutorial del ajedrez', href: '/ayuda' }
  ]

  const handlePlayClick = () => {
    onNewGame()
    router.push('/chess')
  }

  return (
    <div className="w-20 bg-secondary h-full flex flex-col items-center py-6 border-r border-board-border min-h-screen">
      {/* Logo */}
      <div className="mb-8">
        <Image 
          src="/logo.png" 
          alt="Logo" 
          width={40} 
          height={40}
          className="rounded-lg logo-image"
        />
      </div>

      {/* Botón Nueva Partida/Stop - Destacado */}
      <div className="mb-8">
        {gameStarted ? (
          <button
            onClick={onStopGame}
            className="w-12 h-12 bg-[#ec4d58] hover:bg-[#d13d48] rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
            title="Finalizar Partida"
          >
            <Square className="w-6 h-6 text-white" />
          </button>
        ) : (
          <button
            onClick={handlePlayClick}
            className="w-12 h-12 bg-[#ec4d58] hover:bg-[#d13d48] rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
            title="Jugar Ajedrez"
          >
            <Play className="w-6 h-6 text-white" />
          </button>
        )}
      </div>

      {/* Separador */}
      <div className="w-8 h-px bg-board-border my-4" />

      {/* Iconos de navegación */}
      <div className="flex flex-col items-center space-y-6 flex-1">
        {sidebarItems.map((item) => (
          <div 
            key={item.label} 
            className="group relative"
            onMouseEnter={() => setHoveredItem(item.label)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Link href={item.href} className="sidebar-icon">
              <item.icon className="w-5 h-5" />
            </Link>
            {hoveredItem === item.label && (
              <div className="tooltip show">
                <div className="font-semibold text-text mb-1">{item.label}</div>
                <div className="text-xs text-textMuted leading-tight">{item.description}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Estado online */}
      <div className="flex flex-col items-center space-y-1">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-xs text-textMuted">Online</span>
      </div>
    </div>
  )
}
