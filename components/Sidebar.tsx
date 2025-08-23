'use client'

import { Home, RefreshCw, Settings, HelpCircle, Play, Square, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useLogoTransition } from '@/contexts/LogoTransitionContext'
import { useRouter, usePathname } from 'next/navigation'

interface SidebarProps {
  onNewGame: () => void
  gameStarted?: boolean
  onStopGame?: () => void
}

export const Sidebar = ({ onNewGame, gameStarted = false, onStopGame }: SidebarProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { startLogoTransition } = useLogoTransition()

  const sidebarItems = [
    { icon: Home, label: 'Inicio', description: 'Página principal del ecosistema', href: '/inicio' },
    { icon: ImageIcon, label: 'Galería', description: 'Arte Sith en su máximo esplendor', href: '/art-gallery' },
    { icon: Settings, label: 'Configuración', description: 'Ajustes del juego', href: '/configuracion' },
    { icon: HelpCircle, label: 'Ayuda', description: 'Reglas y tutorial del ajedrez', href: '/ayuda' }
  ]

  const handlePlayClick = () => {
    // Si estamos en la página de inicio, hacer transición de logos y navegar
    if (pathname === '/inicio') {
      startLogoTransition()
      // Simular transición de logos
      setTimeout(() => {
        router.push('/chess')
      }, 1500) // 1.5 segundos para la transición
    } else {
      // Si estamos en /chess, iniciar la partida
      onNewGame()
    }
  }

  return (
    <div className="hidden md:flex sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <Image 
          src="/logo-sith-chess.png" 
          alt="Crypto Force Logo" 
          width={40} 
          height={40}
        />
      </div>

      {/* Botón Nueva Partida/Stop - Destacado */}
      {gameStarted ? (
        <button
          onClick={onStopGame}
          className="sidebar-action-button"
          title="Finalizar Partida"
        >
          <Square className="w-6 h-6" />
        </button>
      ) : (
        <button
          onClick={handlePlayClick}
          className={`sidebar-action-button ${
            pathname === '/chess' ? 'animate-pulse-slow' : ''
          }`}
          title={pathname === '/chess' ? 'Haz click para iniciar la partida' : 'Jugar Ajedrez'}
        >
          <Play className="w-6 h-6" />
        </button>
      )}

      {/* Separador */}
      <div className="w-8 h-px bg-board-border my-4" />

      {/* Iconos de navegación */}
      <div className="sidebar-nav">
        {sidebarItems.map((item) => (
          <Link 
            key={item.label} 
            href={item.href} 
            className={`sidebar-nav-item ${pathname === item.href ? 'active' : ''}`}
            title={item.description}
          >
            <item.icon className="sidebar-nav-icon" />
          </Link>
        ))}
      </div>

      {/* Estado online */}
      <div className="sidebar-status">
        <div className="status-indicator"></div>
      </div>
    </div>
  )
}
