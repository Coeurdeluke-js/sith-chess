'use client'

import { useState } from 'react'
import Image from 'next/image'
import { difficultyLevels, DifficultyLevel } from '@/lib/difficultyLevels'

interface DifficultySelectorProps {
  selectedDifficulty: string
  onDifficultyChange: (difficulty: string) => void
  className?: string
}

export const DifficultySelector = ({ 
  selectedDifficulty, 
  onDifficultyChange, 
  className = '' 
}: DifficultySelectorProps) => {
  const [hoveredDifficulty, setHoveredDifficulty] = useState<string | null>(null)

  return (
    <div className={`difficulty-selector ${className}`}>
      <h3 className="text-text font-semibold mb-4 text-center">Sistema de Dificultad de la IA</h3>
      <p className="text-textMuted text-sm text-center mb-6">
        Cada nivel representa una etapa de complejidad en el comportamiento de la Inteligencia Artificial
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {difficultyLevels.map((level) => (
          <div
            key={level.id}
            className={`difficulty-card relative cursor-pointer ${
              selectedDifficulty === level.id 
                ? 'ring-2 ring-[#ec4d58] ring-opacity-80 bg-accent' 
                : 'bg-secondary hover:bg-accent'
            } rounded-lg p-3 border border-board-border`}
            onClick={() => onDifficultyChange(level.id)}
            onMouseEnter={() => setHoveredDifficulty(level.id)}
            onMouseLeave={() => setHoveredDifficulty(null)}
          >
            {/* Insignia con halo energético */}
            <div className="flex justify-center mb-3">
              <div className="relative w-16 h-16">
                <div 
                  className="absolute inset-0 rounded-full nivel-halo"
                  style={{ 
                    backgroundColor: level.color,
                    boxShadow: `0 0 20px ${level.color}40`
                  }}
                ></div>
                <Image
                  src={level.insignia}
                  alt={`Nivel ${level.name}`}
                  width={64}
                  height={64}
                  className="object-contain relative z-10"
                />
              </div>
            </div>

            {/* Nombre con estilo arquetípico */}
            <h4 
              className="text-sm font-bold text-center mb-2 tracking-wide"
              style={{ color: level.color }}
            >
              {level.name}
            </h4>

            {/* Descripción arquetípica */}
            <p className="text-xs text-textMuted text-center leading-tight px-2">
              {level.description}
            </p>

            {/* Indicador de selección */}
            {selectedDifficulty === level.id && (
              <div className="absolute top-2 right-2">
                <div className="w-3 h-3 bg-[#ec4d58] rounded-full animate-pulse"></div>
              </div>
            )}

            {/* Tooltip arquetípico */}
            {hoveredDifficulty === level.id && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
                <div className="nivel-tooltip rounded-lg p-3 min-w-[250px]">
                  <div className="flex items-center justify-center mb-3">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: level.color }}
                    ></div>
                    <h5 className="text-sm font-bold text-text text-center">
                      Nivel {level.name}
                    </h5>
                  </div>
                  
                  {/* Descripción del nivel */}
                  <p className="text-xs text-textMuted mb-3 text-center leading-relaxed">
                    {level.description}
                  </p>
                  
                  {/* Estadísticas de comportamiento */}
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-textMuted">Individuación:</span>
                      <div className="flex-1 mx-2 h-1 bg-board-border rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-300"
                          style={{ 
                            backgroundColor: level.color,
                            width: `${(1 - level.aiBehavior.randomness) * 100}%`
                          }}
                        ></div>
                      </div>
                      <span className="text-text font-mono">{Math.round((1 - level.aiBehavior.randomness) * 100)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-textMuted">Dominio:</span>
                      <div className="flex-1 mx-2 h-1 bg-board-border rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-300"
                          style={{ 
                            backgroundColor: level.color,
                            width: `${level.aiBehavior.tactical * 100}%`
                          }}
                        ></div>
                      </div>
                      <span className="text-text font-mono">{Math.round(level.aiBehavior.tactical * 100)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-textMuted">Poder:</span>
                      <div className="flex-1 mx-2 h-1 bg-board-border rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-300"
                          style={{ 
                            backgroundColor: level.color,
                            width: `${level.aiBehavior.aggression * 100}%`
                          }}
                        ></div>
                      </div>
                      <span className="text-text font-mono">{Math.round(level.aiBehavior.aggression * 100)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Información adicional */}
      <div className="mt-4 text-center">
        <p className="text-xs text-textMuted">
          Cada rango Sith tiene su propia estrategia y nivel de desafío
        </p>
      </div>
    </div>
  )
}
