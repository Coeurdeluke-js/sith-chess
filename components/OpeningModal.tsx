'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface OpeningModalProps {
  onClose: () => void
}

export const OpeningModal = ({ onClose }: OpeningModalProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isClosing, setIsClosing] = useState(false)
  const [logoVisible, setLogoVisible] = useState(false)
  const [logoClosing, setLogoClosing] = useState(false)
  const [showSithLogo, setShowSithLogo] = useState(false)
  const [sithLogoClosing, setSithLogoClosing] = useState(false)

  useEffect(() => {
    // Logo principal aparece con fade-in después de 200ms
    const logoTimer = setTimeout(() => {
      setLogoVisible(true)
    }, 200)

    // Logo principal comienza a desaparecer después de 2.5 segundos
    const logoCloseTimer = setTimeout(() => {
      setLogoClosing(true)
    }, 2500)

    // Logo Sith aparece después de que el principal desaparece (3.5 segundos)
    const sithLogoTimer = setTimeout(() => {
      setShowSithLogo(true)
    }, 3500)

    // Logo Sith comienza a desaparecer después de 2 segundos más
    const sithLogoCloseTimer = setTimeout(() => {
      setSithLogoClosing(true)
    }, 5500)

    // Modal completo se cierra después de 6.5 segundos
    const closeTimer = setTimeout(() => {
      setIsClosing(true)
      // Después de la animación de fade out del fondo, cerrar
      setTimeout(() => {
        setIsVisible(false)
        onClose()
      }, 1000)
    }, 6500)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(logoCloseTimer)
      clearTimeout(sithLogoTimer)
      clearTimeout(sithLogoCloseTimer)
      clearTimeout(closeTimer)
    }
  }, [onClose])

  if (!isVisible) return null

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000 ease-in-out ${
        isClosing 
          ? 'bg-[#121212] opacity-0' 
          : 'bg-[#121212] opacity-100'
      }`}
    >
      {/* Logo principal con fade-in y fade-out */}
      <div 
        className={`absolute transition-all duration-1000 ease-in-out ${
          logoVisible && !logoClosing
            ? 'opacity-100' 
            : 'opacity-0'
        }`}
      >
                            <Image 
                      src="/logo.png" 
                      alt="Crypto Force" 
                      width={300} 
                      height={300}
                      className="rounded-2xl logo-image"
                      priority
                    />
      </div>

      {/* Logo Sith Chess con fade-in y fade-out */}
      <div 
        className={`absolute transition-all duration-1000 ease-in-out ${
          showSithLogo && !sithLogoClosing
            ? 'opacity-100' 
            : 'opacity-0'
        }`}
      >
                            <Image 
                      src="/logo-sith-chess.png" 
                      alt="Sith Chess" 
                      width={300} 
                      height={300}
                      className="rounded-2xl logo-image"
                      priority
                    />
      </div>
    </div>
  )
}
