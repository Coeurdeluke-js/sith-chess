'use client'

import { useState, useEffect, useCallback } from 'react'
import { Clock, Lightbulb, Trophy } from 'lucide-react'
import { useGame } from '@/contexts/GameContext'
import { getDifficultyLevel } from '@/lib/difficultyLevels'
import { ChessPieceMini } from './ChessPieceMini'
import Image from 'next/image'

interface GameSidebarProps {
  gameStarted: boolean
  whiteTime: number
  blackTime: number
  selectedTimeOption: number
  capturedPieces: { white: string[], black: string[] }
  playerColor: 'w' | 'b'
  currentTurn: 'w' | 'b'
  isThinking: boolean
  gameOver: boolean
}

export const GameSidebar = ({
  gameStarted,
  whiteTime,
  blackTime,
  selectedTimeOption,
  capturedPieces,
  playerColor,
  currentTurn,
  isThinking,
  gameOver
}: GameSidebarProps) => {
  const { selectedDifficulty } = useGame()
  const [activeTab, setActiveTab] = useState<'game' | 'philosophy' | 'difficulty'>('game')
  const [currentTipIndex, setCurrentTipIndex] = useState(0)

  const difficultyLevel = getDifficultyLevel(selectedDifficulty)

  // Función para obtener el turno actual con lógica mejorada
  const getCurrentTurn = () => {
    if (gameOver) return currentTurn // Mostrar el último turno si el juego terminó
    return currentTurn
  }

  // Función para obtener el texto del estado del turno
  const getTurnStatus = () => {
    if (gameOver) return 'Juego terminado'
    if (isThinking) return 'IA pensando...'
    
    const turn = getCurrentTurn()
    if (turn === playerColor) {
      return 'Tu turno'
    } else {
      return 'Turno de IA'
    }
  }

  // Filosofía Sith unificada para ajedrez y trading
  const sithPhilosophy = [
    "El ajedrez es como el mercado: cada movimiento revela tu verdadera naturaleza. Los débiles temen la pérdida, los fuertes buscan la victoria total.",
    "La agresión controlada es tu arma más poderosa. Ataca cuando sea tu momento, no cuando la emoción te domine.",
    "No te dejes llevar por la codicia o el miedo. La calma es tu aliada tanto en el tablero como en el trading.",
    "Estudia cada movimiento de tu oponente. Sus debilidades son tus oportunidades de ganancia.",
    "La paciencia es una virtud Sith. Espera el momento perfecto para ejecutar tu estrategia.",
    "Usa la fuerza de tu oponente contra él. Convierte su ataque en tu ventaja estratégica.",
    "Cada pieza tiene su propósito. No desperdicies recursos innecesariamente en el juego ni en el mercado.",
    "La sorpresa es tu aliada. Mantén a tu oponente adivinando tus intenciones.",
    "La precisión es más importante que la velocidad. Cada movimiento debe ser calculado y estratégico.",
    "El poder del lado oscuro te guiará hacia la victoria. Domina tus emociones para dominar el juego.",
    "El ajedrez enseña que cada movimiento debe tener un propósito estratégico, igual que en trading.",
    "La gestión de riesgo es como proteger tu rey: nunca lo expongas innecesariamente.",
    "Cada pérdida es una lección que te hace más fuerte para la próxima partida o trade.",
    "La consistencia en tu estrategia es más importante que ganar cada movimiento individual.",
    "Observa a los grandes maestros como observas a los grandes traders: aprende de sus patrones."
  ]

  // Rotación automática de filosofía Sith
  useEffect(() => {
    if (activeTab === 'philosophy' && gameStarted) {
      const interval = setInterval(() => {
        setCurrentTipIndex((prev) => (prev + 1) % sithPhilosophy.length)
      }, 8000) // 8 segundos para dar más tiempo a leer cada consejo
      return () => clearInterval(interval)
    }
  }, [activeTab, gameStarted, sithPhilosophy.length])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getTimeLabel = (seconds: number) => {
    if (seconds >= 60) return `${Math.floor(seconds / 60)} min`
    return `${seconds}s`
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'game':
        return (
          <div className="space-y-3 md:space-y-4">
            {/* Contadores de Tiempo Individuales */}
            <div className="space-y-2">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-4 h-4 md:w-5 md:h-5 text-[#ec4d58] mr-2" />
                <span className="text-xs font-medium text-text">Tiempo por Jugador</span>
              </div>
              
              {/* Tiempo de las Blancas */}
              <div className={`bg-white border-2 rounded-lg p-2 transition-all duration-300 ${
                currentTurn === 'w' && !gameOver && !isThinking ? 'border-[#ec4d58] shadow-lg' : 'border-gray-300'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-white border-2 border-gray-400 rounded-full"></div>
                    <span className="text-xs font-medium text-gray-700">Blancas</span>
                  </div>
                  <span className={`text-xs px-1 py-0.5 rounded ${
                    currentTurn === 'w' && !gameOver && !isThinking ? 'bg-[#ec4d58] text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentTurn === 'w' && !gameOver && !isThinking ? 'TURNO' : 'ESPERA'}
                  </span>
                </div>
                <div className={`text-base font-bold text-center ${
                  currentTurn === 'w' && !gameOver && !isThinking ? 'text-[#ec4d58]' : 'text-gray-700'
                }`}>
                  {formatTime(whiteTime)}
                </div>
              </div>

              {/* Tiempo de las Negras */}
              <div className={`bg-gray-800 border-2 rounded-lg p-2 transition-all duration-300 ${
                currentTurn === 'b' && !gameOver && !isThinking ? 'border-[#ec4d58] shadow-lg' : 'border-gray-600'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-gray-800 border-2 border-gray-400 rounded-full"></div>
                    <span className="text-xs font-medium text-white">Negras</span>
                  </div>
                  <span className={`text-xs px-1 py-0.5 rounded ${
                    currentTurn === 'b' && !gameOver && !isThinking ? 'bg-[#ec4d58] text-white' : 'bg-gray-600 text-gray-300'
                  }`}>
                    {currentTurn === 'b' && !gameOver && !isThinking ? 'TURNO' : 'ESPERA'}
                  </span>
                </div>
                <div className={`text-base font-bold text-center ${
                  currentTurn === 'b' && !gameOver && !isThinking ? 'text-[#ec4d58]' : 'text-gray-300'
                }`}>
                  {formatTime(blackTime)}
                </div>
              </div>

              {/* Límite de Tiempo */}
              <div className="text-center">
                <div className="text-xs text-textMuted">
                  Límite: {getTimeLabel(selectedTimeOption)}
                </div>
              </div>
            </div>

            {/* Indicador de Turno */}
            <div className="text-center mb-3">
              <div className="flex items-center justify-center space-x-2 mb-2">
                {/* Tu Color */}
                <div className={`flex flex-col items-center space-y-1 transition-all duration-300 ${
                  getCurrentTurn() === playerColor && !gameOver && !isThinking ? 'scale-105' : ''
                }`}>
                  <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    playerColor === 'w' ? 'bg-white border-2 border-gray-400' : 'bg-gray-800 border-2 border-gray-400'
                  } ${
                    getCurrentTurn() === playerColor && !gameOver && !isThinking ? 'ring-2 ring-[#ec4d58] ring-opacity-50' : ''
                  }`}></div>
                  <span className={`text-xs transition-all duration-300 ${
                    getCurrentTurn() === playerColor && !gameOver && !isThinking ? 'text-[#ec4d58] font-medium' : 'text-textMuted'
                  }`}>
                    Tú
                  </span>
                </div>
                
                {/* Indicador de Turno Actual */}
                <div className="flex flex-col items-center space-y-1">
                  <div className={`text-xl transition-all duration-500 ${
                    isThinking ? 'animate-pulse opacity-60' : 
                    gameOver ? 'opacity-50' : 'animate-pulse scale-110 drop-shadow-lg'
                  }`}>
                    <span className={getCurrentTurn() === 'w' ? 'text-white' : 'text-gray-800'}>
                      {getCurrentTurn() === 'w' ? '♕' : '♛'}
                    </span>
                  </div>
                  <span className="text-text text-xs font-medium">
                    {getTurnStatus()}
                  </span>
                  {/* Color del turno actual */}
                  <div className={`w-2 h-2 rounded-full ${
                    getCurrentTurn() === 'w' ? 'bg-white border border-gray-400' : 'bg-gray-800 border border-gray-400'
                  }`}></div>
                </div>

                {/* Color de la IA */}
                <div className={`flex flex-col items-center space-y-1 transition-all duration-300 ${
                  getCurrentTurn() !== playerColor && !gameOver && !isThinking ? 'scale-105' : ''
                }`}>
                  <div className={`w-6 h-6 rounded-full transition-all duration-300 ${
                    playerColor === 'w' ? 'bg-gray-800 border-2 border-gray-400' : 'bg-white border-2 border-gray-400'
                  } ${
                    getCurrentTurn() !== playerColor && !gameOver && !isThinking ? 'ring-2 ring-[#ec4d58] ring-opacity-50' : ''
                  }`}></div>
                  <span className={`text-xs transition-all duration-300 ${
                    getCurrentTurn() !== playerColor && !gameOver && !isThinking ? 'text-[#ec4d58] font-medium' : 'text-textMuted'
                  }`}>
                    IA
                  </span>
                </div>
              </div>
            </div>

            {/* Piezas Capturadas - Compacto */}
            <div className="space-y-2">
              <h4 className="text-text font-semibold text-center text-xs">Piezas Capturadas</h4>
              
              <div className="grid grid-cols-2 gap-1">
                {/* Tus Capturas */}
                <div className="bg-accent rounded p-1.5">
                  <h5 className="text-xs font-medium text-textMuted mb-1">Tus capturas</h5>
                  <div className="flex flex-wrap gap-0.5 justify-center">
                    {capturedPieces[playerColor === 'w' ? 'black' : 'white'].map((piece, index) => (
                      <ChessPieceMini
                        key={index}
                        type={piece as any}
                        color={playerColor === 'w' ? 'b' : 'w'}
                        size="sm"
                      />
                    ))}
                    {capturedPieces[playerColor === 'w' ? 'black' : 'white'].length === 0 && (
                      <span className="text-textMuted text-xs">Ninguna</span>
                    )}
                  </div>
                </div>

                {/* Capturas de la IA */}
                <div className="bg-accent rounded p-1.5">
                  <h5 className="text-xs font-medium text-textMuted mb-1">Capturas de la IA</h5>
                  <div className="flex flex-wrap gap-0.5 justify-center">
                    {capturedPieces[playerColor === 'w' ? 'white' : 'black'].map((piece, index) => (
                      <ChessPieceMini
                        key={index}
                        type={piece as any}
                        color={playerColor === 'w' ? 'w' : 'b'}
                        size="sm"
                      />
                    ))}
                    {capturedPieces[playerColor === 'w' ? 'white' : 'black'].length === 0 && (
                      <span className="text-textMuted text-xs">Ninguna</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'philosophy':
        return (
          <div className="text-center space-y-3 md:space-y-4">
            <div className="flex items-center justify-center mb-2">
              <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-[#ec4d58]" />
            </div>
            <h3 className="text-base md:text-lg font-semibold text-text mb-2 md:mb-3">Filosofía Sith</h3>
            
            {/* Card principal de filosofía - Ocupa más espacio */}
            <div className="bg-accent rounded-lg p-3 md:p-4 min-h-[140px] md:min-h-[180px] flex flex-col items-center justify-center border border-board-border">
              <div className="mb-2 md:mb-3">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-[#ec4d58] rounded-full mx-auto mb-1 md:mb-2"></div>
              </div>
              <p className="text-text leading-relaxed text-xs md:text-sm font-medium px-1 md:px-2">
                {sithPhilosophy[currentTipIndex]}
              </p>
            </div>
            
            {/* Indicadores del carrusel mejorados */}
            <div className="flex justify-center space-x-2 md:space-x-3">
              {sithPhilosophy.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    index === currentTipIndex 
                      ? 'bg-[#ec4d58] scale-125 shadow-lg shadow-[#ec4d58]/30' 
                      : 'bg-accent hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            {/* Contador de consejos */}
            <div className="text-xs text-textMuted">
              Consejo {currentTipIndex + 1} de {sithPhilosophy.length}
            </div>
          </div>
        )

      case 'difficulty':
        return (
          <div className="text-center space-y-3 md:space-y-4">
            <div className="flex items-center justify-center mb-2 md:mb-3">
              <Trophy className="w-5 h-5 md:w-6 md:h-6 text-[#ec4d58]" />
            </div>
            <h3 className="text-sm md:text-base font-semibold text-text mb-2 md:mb-3">Dificultad de la IA</h3>
            
            {/* Insignia */}
            <div className="flex justify-center mb-3 md:mb-4">
              <div className="relative">
                <Image
                  src={difficultyLevel.insignia}
                  alt={difficultyLevel.name}
                  width={60}
                  height={60}
                  className="rounded-full md:w-20 md:h-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full" />
              </div>
            </div>

            {/* Información del Nivel */}
            <div className="bg-accent rounded-lg p-3 md:p-4">
              <h4 className="text-base md:text-lg font-bold text-[#ec4d58] mb-1 md:mb-2">
                {difficultyLevel.name}
              </h4>
              <p className="text-textMuted text-xs md:text-sm leading-relaxed">
                {difficultyLevel.description}
              </p>
            </div>

            {/* Estadísticas de IA */}
            <div className="grid grid-cols-2 gap-2 md:gap-3 text-xs">
              <div className="bg-accent rounded p-1.5 md:p-2">
                <div className="text-textMuted">Agresividad</div>
                <div className="text-text font-semibold">
                  {Math.round(difficultyLevel.aiBehavior.aggression * 100)}%
                </div>
              </div>
              <div className="bg-accent rounded p-1.5 md:p-2">
                <div className="text-textMuted">Defensiva</div>
                <div className="text-text font-semibold">
                  {Math.round(difficultyLevel.aiBehavior.defensive * 100)}%
                </div>
              </div>
              <div className="bg-accent rounded p-1.5 md:p-2">
                <div className="text-textMuted">Táctica</div>
                <div className="text-text font-semibold">
                  {Math.round(difficultyLevel.aiBehavior.tactical * 100)}%
                </div>
              </div>
              <div className="bg-accent rounded p-1.5 md:p-2">
                <div className="text-textMuted">Aleatoriedad</div>
                <div className="text-text font-semibold">
                  {Math.round(difficultyLevel.aiBehavior.randomness * 100)}%
                </div>
              </div>
            </div>

            {/* Información adicional */}
            <div className="bg-accent rounded-lg p-2 md:p-3">
              <h5 className="text-text font-medium mb-1 md:mb-2 text-sm">Comportamiento de la IA</h5>
              <p className="text-textMuted text-xs">
                Esta IA juega con un nivel de búsqueda de {difficultyLevel.aiBehavior.searchDepth} movimientos adelante.
                {difficultyLevel.aiBehavior.moveDelay.min > 0 && (
                  <span> Tarda entre {difficultyLevel.aiBehavior.moveDelay.min}ms y {difficultyLevel.aiBehavior.moveDelay.max}ms en mover.</span>
                )}
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="chess-sidebar w-full md:w-80 bg-secondary border-t md:border-t-0 md:border-l border-board-border p-2 md:p-6 flex flex-col mt-2 md:mt-0">
      {/* Tabs con Iconos - Solo 3 - Compactos */}
      <div className="flex justify-center space-x-1 mb-3 md:mb-6">
        <button
          onClick={() => setActiveTab('game')}
          className={`p-1.5 md:p-3 rounded-lg transition-all duration-300 ${
            activeTab === 'game'
              ? 'bg-[#ec4d58] text-white'
              : 'bg-accent text-textMuted hover:text-text hover:bg-board-highlight'
          }`}
          title="Juego"
        >
          <Clock className="w-3 h-3 md:w-5 md:h-5" />
        </button>
        <button
          onClick={() => setActiveTab('philosophy')}
          className={`p-1.5 md:p-3 rounded-lg transition-all duration-300 ${
            activeTab === 'philosophy'
              ? 'bg-[#ec4d58] text-white'
              : 'bg-accent text-textMuted hover:text-text hover:bg-board-highlight'
          }`}
          title="Filosofía Sith"
        >
          <Lightbulb className="w-3 h-3 md:w-5 md:h-5" />
        </button>
        <button
          onClick={() => setActiveTab('difficulty')}
          className={`p-2 md:p-3 rounded-lg transition-all duration-300 ${
            activeTab === 'difficulty'
              ? 'bg-[#ec4d58] text-white'
              : 'bg-accent text-textMuted hover:text-text hover:bg-board-highlight'
          }`}
          title="Dificultad de la IA"
        >
          <Trophy className="w-3 h-3 md:w-5 md:h-5" />
        </button>
      </div>

      {/* Contenido del Tab */}
      <div className="flex-1 overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  )
}
