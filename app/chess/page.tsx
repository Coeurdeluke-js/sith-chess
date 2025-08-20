'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { Chess } from 'chess.js'
import { ChessPiece } from '@/components/ChessPiece'
import { GameSidebar } from '@/components/GameSidebar'
import { OpeningModal } from '@/components/OpeningModal'
import { useGame } from '@/contexts/GameContext'
import { useAudioContext } from '@/contexts/AudioContext'
import { AIEngine } from '@/lib/aiEngine'
import { getDifficultyLevel } from '@/lib/difficultyLevels'
import { Timer } from 'lucide-react'

export default function ChessGame() {
  const { gameStarted, startNewGame, stopGame, selectedDifficulty } = useGame()
  const { 
    playMove, 
    playCapture, 
    playCheck, 
    playCheckmate, 
    playTimerWarning, 
    playTimerCritical, 
    playTimeUp,
    playPieceSelect,
    playButtonClick,
    playGameStart
  } = useAudioContext()
  const [chess] = useState(() => new Chess())
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null)
  const [gameOver, setGameOver] = useState(false)
  const [moves, setMoves] = useState<string[]>([])
  const [showOpeningModal, setShowOpeningModal] = useState(true)
  const [modalShown, setModalShown] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [lastMove, setLastMove] = useState<string | null>(null)
  const [validMoves, setValidMoves] = useState<Set<string>>(new Set())
  const [capturedPieces, setCapturedPieces] = useState<{ white: string[], black: string[] }>({ white: [], black: [] })
  const [playerColor, setPlayerColor] = useState<'w' | 'b'>(() => Math.random() < 0.5 ? 'w' : 'b')
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [isMessageTransitioning, setIsMessageTransitioning] = useState(false)
  const [animatingPiece, setAnimatingPiece] = useState<{ from: string, to: string, piece: any } | null>(null)
  const [gameTime, setGameTime] = useState<number>(0) // Tiempo transcurrido en segundos
  const [selectedTimeOption, setSelectedTimeOption] = useState<number>(10) // Tiempo seleccionado en minutos
  const [timerActive, setTimerActive] = useState<boolean>(false)
  const [showGameInterface, setShowGameInterface] = useState<boolean>(true) // Controla si mostrar interfaz de juego o sabiduría Sith

  // Obtener el nivel de dificultad actual
  const currentDifficulty = getDifficultyLevel(selectedDifficulty)

  // Mensajes filosóficos Sith
  const sithMessages = [
    "El ajedrez es como el mercado: cada movimiento revela tu verdadera naturaleza. Los débiles temen la pérdida, los fuertes buscan la victoria total.",
    "En el tablero como en el trading, la paciencia es tu arma más poderosa. El Sith que actúa por impulso, muere por impulso.",
    "Las piezas son tus soldados, el tablero tu campo de batalla. Pero recuerda: el verdadero poder no está en las piezas, sino en la mente que las dirige.",
    "El trading y el ajedrez comparten una verdad fundamental: el que controla el centro, controla el juego. El que controla sus emociones, controla su destino.",
    "Cada captura es una lección, cada jaque una advertencia. En la guerra del mercado como en la guerra del tablero, solo los adaptables sobreviven.",
    "El jaque mate no es el fin, es el comienzo de una nueva comprensión. Cada derrota te hace más fuerte, cada victoria te hace más sabio."
  ]

  // Opciones de tiempo predefinidas (en minutos)
  const timeOptions = [
    { value: 1, label: '1 min' },
    { value: 3, label: '3 min' },
    { value: 5, label: '5 min' },
    { value: 10, label: '10 min' },
    { value: 15, label: '15 min' },
    { value: 30, label: '30 min' },
    { value: 60, label: '1 hora' }
  ]

  // Crear instancia del motor de IA
  const aiEngine = useMemo(() => new AIEngine(chess, currentDifficulty), [chess, currentDifficulty])

  // Memoizar movimientos válidos para mejor rendimiento
  const currentValidMoves = useMemo(() => {
    if (!selectedSquare || !gameStarted) return new Set()
    try {
      const moves = chess.moves({ square: selectedSquare as any, verbose: true })
      return new Set(moves.map((move: any) => move.to))
    } catch {
      return new Set()
    }
  }, [selectedSquare, chess, gameStarted])

  // Actualizar movimientos válidos cuando cambie la selección
  useEffect(() => {
    setValidMoves(currentValidMoves)
  }, [currentValidMoves])

  // Función optimizada para manejar clics en casillas
  const handleSquareClick = useCallback((square: string) => {
    if (gameOver || !gameStarted || isThinking) return

    const piece = chess.get(square as any)
    
    // Si no hay casilla seleccionada, seleccionar una pieza del color del jugador
    if (selectedSquare === null) {
      if (piece && piece.color === playerColor) {
        setSelectedSquare(square)
        playPieceSelect() // Sonido de selección de pieza
      }
      return
    }

    // Si se hace clic en la misma casilla, deseleccionar
    if (selectedSquare === square) {
      setSelectedSquare(null)
      return
    }

    // Si se hace clic en una casilla válida, hacer el movimiento
    if (validMoves.has(square)) {
      makeMove(selectedSquare, square)
      return
    }

    // Si se hace clic en otra pieza del color del jugador, cambiar la selección
    if (piece && piece.color === playerColor) {
      setSelectedSquare(square)
      playPieceSelect() // Sonido de selección de pieza
    }
  }, [selectedSquare, validMoves, gameOver, gameStarted, isThinking, chess, playerColor, playPieceSelect])

  // Función optimizada para hacer movimientos
  const makeMove = useCallback((from: string, to: string) => {
    try {
      const piece = chess.get(from as any)
      if (!piece) return

      // Iniciar animación
      setAnimatingPiece({ from, to, piece })
      
      // Esperar a que termine la animación antes de hacer el movimiento real
      setTimeout(() => {
        const move = {
          from,
          to,
          promotion: 'q' // Siempre promover a reina para simplicidad
        }

        // Verificar si hay una pieza en la casilla de destino (captura)
        const capturedPiece = chess.get(to as any)
        
        const result = chess.move(move)
        if (result) {
          setLastMove(`${from}-${to}`)
          setMoves(prev => [...prev, result.san || ''])
          setSelectedSquare(null)
          setAnimatingPiece(null)

          // Reproducir sonidos según el tipo de movimiento
          if (capturedPiece) {
            playCapture() // Sonido de captura
          } else {
            playMove() // Sonido de movimiento normal
          }

          // Verificar jaque y jaque mate
          if (chess.isCheckmate()) {
            playCheckmate() // Sonido de jaque mate
          } else if (chess.isCheck()) {
            playCheck() // Sonido de jaque
          }

          // Actualizar piezas capturadas
          if (capturedPiece) {
            setCapturedPieces(prev => ({
              ...prev,
              [capturedPiece.color === 'w' ? 'white' : 'black']: [
                ...prev[capturedPiece.color === 'w' ? 'white' : 'black'],
                capturedPiece.type
              ]
            }))
          }

          // Verificar fin del juego
          if (chess.isGameOver()) {
            setGameOver(true)
            return
          }

          // Si es turno de la IA, hacer su movimiento usando el nuevo motor
          if (chess.turn() !== playerColor) {
            setTimeout(() => {
              const aiColor = playerColor === 'w' ? 'b' : 'w'
              if (gameOver || chess.turn() !== aiColor || !gameStarted) return

              setIsThinking(true)
              
              // Usar el nuevo motor de IA
              const aiMove = aiEngine.selectMove(aiColor)
              
              if (aiMove) {
                setTimeout(() => {
                  const aiPiece = chess.get(aiMove.from as any)
                  if (aiPiece) {
                    // Animar movimiento de la IA
                    setAnimatingPiece({ from: aiMove.from, to: aiMove.to, piece: aiPiece })
                    
                    setTimeout(() => {
                      const capturedPiece = chess.get(aiMove.to as any)
                      
                      const result = chess.move(aiMove)
                      if (result) {
                        setLastMove(`${aiMove.from}-${aiMove.to}`)
                        setMoves(prev => [...prev, result.san || ''])
                        setAnimatingPiece(null)

                        // Reproducir sonidos para movimientos de la IA
                        if (capturedPiece) {
                          playCapture() // Sonido de captura
                        } else {
                          playMove() // Sonido de movimiento normal
                        }

                        // Verificar jaque y jaque mate
                        if (chess.isCheckmate()) {
                          playCheckmate() // Sonido de jaque mate
                        } else if (chess.isCheck()) {
                          playCheck() // Sonido de jaque
                        }

                        if (capturedPiece) {
                          setCapturedPieces(prev => ({
                            ...prev,
                            [capturedPiece.color === 'w' ? 'white' : 'black']: [
                              ...prev[capturedPiece.color === 'w' ? 'white' : 'black'],
                              capturedPiece.type
                            ]
                          }))
                        }

                        if (chess.isGameOver()) {
                          setGameOver(true)
                        }
                      }
                    }, 300) // Duración de la animación de la IA
                  }
                }, aiEngine.getMoveDelay()) // Usar el delay específico del nivel
              }
              
              setIsThinking(false)
            }, 600)
          }
        }
      }, 300) // Duración de la animación del jugador
    } catch (error) {
      console.error('Movimiento inválido:', error)
      setSelectedSquare(null)
      setAnimatingPiece(null)
    }
  }, [chess, playerColor, gameOver, gameStarted, aiEngine])

  // Efecto para carrusel automático de mensajes de Sabiduría Sith
  useEffect(() => {
    if (!gameStarted) {
      const interval = setInterval(() => {
        setIsMessageTransitioning(true)
        
        setTimeout(() => {
          setCurrentMessageIndex((prevIndex) => 
            prevIndex === sithMessages.length - 1 ? 0 : prevIndex + 1
          )
          
          setTimeout(() => {
            setIsMessageTransitioning(false)
          }, 500) // Tiempo para que aparezca el nuevo mensaje
        }, 500) // Tiempo para que desaparezca el mensaje actual
      }, 4000) // 4 segundos entre cada mensaje

      return () => clearInterval(interval)
    }
  }, [gameStarted, sithMessages.length])



  // Función para formatear el tiempo en formato MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // Tiempo restante en segundos (cuenta regresiva)
  const remainingSeconds = useMemo(() => {
    const total = selectedTimeOption * 60
    const left = total - gameTime
    return left > 0 ? left : 0
  }, [selectedTimeOption, gameTime])

  // Estado para alertas visuales del countdown
  const [showTimeWarning, setShowTimeWarning] = useState(false)
  const [showTimeCritical, setShowTimeCritical] = useState(false)

  // Función para iniciar el temporizador
  const startTimer = useCallback(() => {
    setTimerActive(true)
    setGameTime(0)
  }, [])

  // Función para detener el temporizador
  const stopTimer = useCallback(() => {
    setTimerActive(false)
  }, [])

  // Función para reiniciar el temporizador
  const resetTimer = useCallback(() => {
    setGameTime(0)
    setTimerActive(false)
  }, [])

  // Efecto para el temporizador
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (timerActive && gameStarted && !gameOver) {
      interval = setInterval(() => {
        setGameTime(prev => prev + 1)
      }, 1000)
    }
    
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [timerActive, gameStarted, gameOver])

  // Efecto para iniciar el temporizador cuando comienza el juego
  useEffect(() => {
    if (gameStarted && !timerActive) {
      startTimer()
    }
  }, [gameStarted, timerActive, startTimer])

  // Efecto para detener el temporizador cuando termina el juego
  useEffect(() => {
    if (gameOver) {
      stopTimer()
    }
  }, [gameOver, stopTimer])

  // Finalizar la partida cuando el tiempo llegue a cero
  useEffect(() => {
    if (gameStarted && timerActive && remainingSeconds === 0 && !gameOver) {
      playTimeUp() // Sonido de tiempo agotado
      setGameOver(true)
      stopTimer()
    }
  }, [remainingSeconds, gameStarted, timerActive, gameOver, stopTimer, playTimeUp])

  // Efecto para alertas visuales y sonoras del countdown
  useEffect(() => {
    if (gameStarted && timerActive && !gameOver) {
      if (remainingSeconds <= 10 && remainingSeconds > 0) {
        setShowTimeCritical(true)
        setShowTimeWarning(false)
        // Sonido crítico solo una vez cuando llega a 10 segundos
        if (remainingSeconds === 10) {
          playTimerCritical()
        }
      } else if (remainingSeconds <= 30 && remainingSeconds > 10) {
        setShowTimeWarning(true)
        setShowTimeCritical(false)
        // Sonido de advertencia solo una vez cuando llega a 30 segundos
        if (remainingSeconds === 30) {
          playTimerWarning()
        }
      } else {
        setShowTimeWarning(false)
        setShowTimeCritical(false)
      }
    } else {
      setShowTimeWarning(false)
      setShowTimeCritical(false)
    }
  }, [remainingSeconds, gameStarted, timerActive, gameOver, playTimerWarning, playTimerCritical])



  // Función para reiniciar el juego
  const resetGame = useCallback(() => {
    playGameStart() // Sonido de inicio de partida
    chess.reset() // Esto siempre pone las blancas para empezar
    setSelectedSquare(null)
    setGameOver(false)
    setMoves([])
    setLastMove(null)
    setValidMoves(new Set())
    setIsThinking(false)
    setCapturedPieces({ white: [], black: [] })
    setAnimatingPiece(null)
    resetTimer() // Reiniciar también el temporizador
    
    // Asignar color aleatorio al jugador (w = blancas, b = negras)
    const randomPlayerColor = Math.random() < 0.5 ? 'w' : 'b'
    setPlayerColor(randomPlayerColor)
    
    // NO hacer el primer movimiento de la IA automáticamente
    // El juego debe esperar a que el usuario presione Play
    startTimer()
  }, [chess, resetTimer, playGameStart, aiEngine, currentDifficulty, playMove, playCheck, startTimer])

  // Función para detener el juego sin reiniciar
  const handleStopGame = useCallback(() => {
    setIsThinking(false)
    setAnimatingPiece(null)
    stopTimer()
    stopGame()
  }, [stopGame, stopTimer])

  // Efecto para el primer movimiento de la IA cuando el jugador es negro
  useEffect(() => {
    if (gameStarted && playerColor === 'b' && chess.turn() === 'w' && moves.length === 0 && !isThinking) {
      // La IA debe hacer el primer movimiento (juega como blancas)
      setIsThinking(true)
      
      setTimeout(() => {
        const aiMove = aiEngine.selectMove('w')
        if (aiMove) {
          const result = chess.move(aiMove)
          if (result) {
            setLastMove(`${aiMove.from}-${aiMove.to}`)
            setMoves(prev => [...prev, result.san || ''])
            
            // Reproducir sonidos para movimientos de la IA
            playMove()
            
            // Verificar jaque
            if (chess.isCheck()) {
              playCheck()
            }
          }
        }
        setIsThinking(false)
      }, aiEngine.getMoveDelay())
    }
  }, [gameStarted, playerColor, chess, moves.length, isThinking, aiEngine, playMove, playCheck])




  // Función para obtener el símbolo de una pieza
  const getPieceSymbol = (pieceType: string) => {
    const symbols = {
      'k': '♔',
      'q': '♕',
      'r': '♖',
      'b': '♗',
      'n': '♘',
      'p': '♙'
    }
    return symbols[pieceType as keyof typeof symbols] || pieceType
  }

  // Función para obtener el símbolo de la pieza que realizó el movimiento
  const getMovePieceSymbol = (move: string, isWhiteMove: boolean) => {
    // Determinar qué pieza se movió basándose en la notación algebraica
    if (move.startsWith('O-O')) {
      return '♔' // Enroque corto
    }
    if (move.startsWith('O-O-O')) {
      return '♔' // Enroque largo
    }
    
    // Para movimientos normales, el primer carácter indica la pieza
    const firstChar = move.charAt(0)
    if (firstChar === firstChar.toUpperCase() && firstChar !== firstChar.toLowerCase()) {
      // Es una letra mayúscula, indica una pieza específica
      const pieceMap: { [key: string]: string } = {
        'K': '♔', // Rey
        'Q': '♕', // Reina
        'R': '♖', // Torre
        'B': '♗', // Alfil
        'N': '♘'  // Caballo
      }
      return pieceMap[firstChar] || '♙'
    }
    
    // Si no hay letra mayúscula al inicio, es un peón
    return '♙'
  }

  // Función para cambiar mensaje manualmente
  const changeMessage = (index: number) => {
    setIsMessageTransitioning(true)
    
    setTimeout(() => {
      setCurrentMessageIndex(index)
      
      setTimeout(() => {
        setIsMessageTransitioning(false)
      }, 300)
    }, 300)
  }

  // Función para cerrar modal de apertura
  const handleOpeningModalClose = useCallback(() => {
    setShowOpeningModal(false)
    setModalShown(true)
  }, [])

  // Función para obtener la coordenada real del tablero según el color del jugador
  const getRealSquare = useCallback((file: string, rank: string) => {
    // Para el jugador negro, mantenemos las coordenadas normales
    // pero rotamos visualmente el tablero
    return `${file}${rank}`
  }, [playerColor])



  // Función optimizada para renderizar casillas
  const renderSquare = useCallback((file: string, rank: string) => {
    const square = `${file}${rank}`
    const piece = chess.get(square as any)
    
    // Calcular el color de fondo correctamente
    const isLight = (file.charCodeAt(0) - 97 + parseInt(rank)) % 2 === 0
    
    const isSelected = selectedSquare === square
    const isValidMove = validMoves.has(square)
    const isCapture = isValidMove && piece !== null
    const isLastMove = lastMove && lastMove.includes(square)
    const isPlayerTurn = chess.turn() === playerColor && gameStarted && !gameOver && !isThinking
    
    // Verificar si esta casilla tiene una pieza animada
    const isAnimatingFrom = animatingPiece && animatingPiece.from === square
    const isAnimatingTo = animatingPiece && animatingPiece.to === square

    let bgColor = isLight ? 'bg-board-light' : 'bg-board-dark'
    if (isSelected) bgColor = 'bg-board-selected'
    else if (isLastMove) bgColor = 'bg-board-highlight'
    else if (isValidMove) bgColor = 'bg-board-highlight'

    return (
      <div
        key={square}
        data-square={square}
        className={`chess-square ${bgColor} flex items-center justify-center cursor-pointer relative transition-all duration-300 ease-out hover:scale-105 select-none ${
          isLastMove ? 'animate-pulse' : ''
        }`}
        onClick={() => handleSquareClick(square)}
        onDragOver={(e) => {
          e.preventDefault()
          e.dataTransfer.dropEffect = 'move'
        }}
        onDrop={(e) => {
          e.preventDefault()
          try {
            const data = JSON.parse(e.dataTransfer.getData('text/plain'))
            if (data.from && data.color === playerColor) {
              handleSquareClick(data.from) // Seleccionar pieza
              setTimeout(() => handleSquareClick(square), 50) // Hacer movimiento
            }
          } catch (error) {
            console.error('Error parsing drag data:', error)
          }
        }}
        data-selected={isSelected}
        data-valid-move={isValidMove && !isCapture}
        data-capture={isCapture}
        data-last-move={isLastMove}
      >

        
        {/* Mostrar pieza animada */}
        {animatingPiece && (isAnimatingFrom || isAnimatingTo) && (
          <div className={`absolute inset-0 flex items-center justify-center ${
            isAnimatingFrom ? 'animate-slide-out' : 'animate-slide-in'
          }`}>
            <ChessPiece
              piece={animatingPiece.piece}
              isSelected={false}
              isPlayerTurn={false}
              square={square}
            />
          </div>
        )}
        
        {/* Mostrar pieza normal con animación de movimiento */}
        {piece && !isAnimatingFrom && (
          <div className={animatingPiece && isAnimatingTo ? 'chess-piece-moving' : ''}>
            <ChessPiece
              piece={piece}
              isSelected={isSelected}
              isPlayerTurn={isPlayerTurn}
              square={square}
              onDragStart={(e, piece) => {
                // El data-square ya se pasa como prop
              }}
            />
          </div>
        )}
        
        {/* Etiquetas de coordenadas */}
        {file === 'a' && (
          <span className={`absolute text-xs text-textMuted opacity-50 select-none font-mono ${
            playerColor === 'b' ? 'bottom-1 right-1' : 'left-1 top-0'
          }`}>
            {rank}
          </span>
        )}
        {rank === (playerColor === 'b' ? '8' : '1') && (
          <span className={`absolute text-xs text-textMuted opacity-50 select-none font-mono ${
            playerColor === 'b' ? 'top-1 left-1' : 'bottom-0 right-1'
          }`}>
            {file}
          </span>
        )}
      </div>
    )
  }, [selectedSquare, validMoves, lastMove, chess, handleSquareClick, animatingPiece, playerColor, gameStarted, gameOver, isThinking])

  // Función optimizada para renderizar el tablero
  const renderBoard = useCallback(() => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    // Si el jugador es negro, invertir el orden de las filas para que vea las negras abajo
    const ranks = playerColor === 'b' ? ['1', '2', '3', '4', '5', '6', '7', '8'] : ['8', '7', '6', '5', '4', '3', '2', '1']

    return (
      <div className="chess-board grid grid-cols-8 grid-rows-8 w-full h-full border-2 border-board-border shadow-2xl">
        {ranks.map(rank =>
          files.map(file => renderSquare(file, rank))
        )}
      </div>
    )
  }, [renderSquare, playerColor])

  return (
    <div className="chess-game-container bg-primary select-none mobile-content">
      {/* Modal de apertura - solo se muestra una vez */}
      {showOpeningModal && !modalShown && (
        <OpeningModal onClose={handleOpeningModalClose} />
      )}

      <div className="flex h-full flex-col md:flex-row">
        {/* Contenido principal - Tablero centrado */}
        <div className="chess-board-area p-3 md:p-6">
          <div className="board-container relative">
            {renderBoard()}
            
            {/* Indicador de pensamiento de la IA - solo spinner sutil */}
            {isThinking && (
              <div className="absolute top-4 right-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ec4d58]"></div>
              </div>
            )}
          </div>
        </div>

        {/* Panel derecho - Nueva Sidebar Rediseñada */}
        {!gameStarted ? (
          /* Pantalla de inicio - Configuración y Filosofía Sith */
          <div className="chess-sidebar w-full md:w-80 bg-secondary border-t md:border-t-0 md:border-l border-board-border p-4 md:p-6 flex flex-col mt-4 md:mt-0">
            <div className="text-center space-y-6">
              <h3 className="text-text font-semibold mb-6 text-center text-[#ec4d58]">Configuración de Partida</h3>
              
              {/* Selector de Tiempo */}
              <div className="mb-6">
                <div className="flex items-center justify-center mb-3">
                  <Timer className="w-5 h-5 text-[#ec4d58] mr-2" />
                  <span className="text-text font-medium">Duración de la Partida</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {timeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedTimeOption(option.value)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-all duration-300 ${
                        selectedTimeOption === option.value
                          ? 'bg-[#ec4d58] text-white'
                          : 'bg-accent text-textMuted hover:text-text hover:bg-board-highlight'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <div className="mt-2 text-textMuted text-xs">
                  Tiempo seleccionado: {selectedTimeOption} {selectedTimeOption >= 60 ? 'minutos' : 'segundos'}
                </div>
              </div>

              <div className="border-t border-board-border pt-4">
                <h4 className="text-text font-semibold mb-4 text-center text-[#ec4d58]">Sabiduría Sith</h4>

                <div className="wisdom-carousel flex items-center justify-center">
                  <div className={`text-center p-4 md:p-6 bg-accent rounded-lg border border-board-border w-full max-w-sm mx-auto ${
                    isMessageTransitioning ? 'message-fade-out' : 'message-fade-in'
                  }`}>
                    <p className="text-text font-medium mb-4 leading-relaxed text-sm md:text-base">
                      {sithMessages[currentMessageIndex]}
                    </p>
                    <div className="carousel-indicators">
                      {sithMessages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => changeMessage(index)}
                          className={`carousel-dot ${
                            index === currentMessageIndex ? 'active' : 'inactive'
                          }`}
                          aria-label={`Ir al mensaje ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Nueva Sidebar de Juego Rediseñada */
          <GameSidebar
            gameStarted={gameStarted}
            remainingSeconds={remainingSeconds}
            selectedTimeOption={selectedTimeOption}
            capturedPieces={capturedPieces}
            playerColor={playerColor}
            currentTurn={chess.turn()}
            isThinking={isThinking}
            gameOver={gameOver}
          />
        )}
      </div>
    </div>
  )
}
