'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface LogoTransitionProps {
  isVisible: boolean
  onComplete: () => void
}

export const LogoTransition = ({ isVisible, onComplete }: LogoTransitionProps) => {
  const [currentLogo, setCurrentLogo] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const logos = [
    { src: '/logo.png', alt: 'Logo Original', duration: 500 },
    { src: '/logo.png', alt: 'Logo Transición', duration: 400, className: 'scale-110 rotate-12' },
    { src: '/logo.png', alt: 'Logo Final', duration: 300, className: 'scale-125 rotate-0' },
    { src: '/logo.png', alt: 'Logo CF', duration: 200, className: 'scale-100' }
  ]

  useEffect(() => {
    if (isVisible && !isAnimating) {
      setIsAnimating(true)
      let totalDelay = 0

      logos.forEach((logo, index) => {
        setTimeout(() => {
          setCurrentLogo(index)
          
          if (index === logos.length - 1) {
            setTimeout(() => {
              onComplete()
            }, logo.duration)
          }
        }, totalDelay)
        
        totalDelay += logo.duration
      })
    }
  }, [isVisible, isAnimating, onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="text-center space-y-8">
        {/* Logo animado */}
        <div className="relative">
          <Image 
            src={logos[currentLogo].src}
            alt={logos[currentLogo].alt}
            width={120}
            height={120}
            className={`rounded-2xl transition-all duration-300 ${
              logos[currentLogo].className || ''
            }`}
          />
        </div>
        
        {/* Texto de transición */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">
            {currentLogo === 0 && 'Preparando...'}
            {currentLogo === 1 && 'Cargando...'}
            {currentLogo === 2 && 'Iniciando...'}
            {currentLogo === 3 && '¡Listo!'}
          </h2>
          
          {/* Barra de progreso */}
          <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#ec4d58] to-[#d13d48] transition-all duration-300"
              style={{ 
                width: `${((currentLogo + 1) / logos.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
