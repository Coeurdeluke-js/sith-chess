'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

export default function ArtGalleryPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Imágenes reales de la carpeta art-gallery
  const galleryImages = [
    { id: '1', src: '/art-gallery/Image_fx (94).svg' },
    { id: '2', src: '/art-gallery/Image_fx (95).svg' },
    { id: '3', src: '/art-gallery/Image_fx (93) (1).svg' },
    { id: '4', src: '/art-gallery/Image_fx (56) (1).svg' },
    { id: '5', src: '/art-gallery/Image_fx (55) (1).svg' },
    { id: '6', src: '/art-gallery/Image_fx (54) (1).svg' }
  ]

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000) // Cambia cada 4 segundos

    return () => clearInterval(interval)
  }, [galleryImages.length])

  // Controles manuales eliminados según requerimiento (flechas)

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <div className="min-h-screen bg-primary text-text">
      <div className="flex-1">
        {/* Header simple */}
        <div className="bg-secondary border-b border-board-border p-6">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/inicio" className="text-textMuted hover:text-text transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-3xl font-light text-[#ec4d58]">Galería de Arte Sith</h1>
            </div>
          </div>
        </div>

        {/* Carrusel principal */}
        <div className="max-w-4xl mx-auto p-6">
          <div className="relative">
            {/* Imagen principal */}
            <div className="aspect-video bg-secondary rounded-lg border border-board-border overflow-hidden relative">
              <Image
                src={galleryImages[currentImageIndex].src}
                alt={`Arte Sith ${currentImageIndex + 1}`}
                width={800}
                height={600}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Indicadores de posición */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'bg-[#ec4d58] scale-125'
                      : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Información simple */}
          <div className="mt-6 text-center">
            <p className="text-textMuted">
              {currentImageIndex + 1} de {galleryImages.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
