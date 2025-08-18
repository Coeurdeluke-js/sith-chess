'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { Chess } from 'chess.js'
import { ChessPiece } from '@/components/ChessPiece'
import { OpeningModal } from '@/components/OpeningModal'
import { useGame } from '@/contexts/GameContext'
import { AIEngine } from '@/lib/aiEngine'
import { getDifficultyLevel } from '@/lib/difficultyLevels'

export default function ChessGame() {
  const { gameStarted, startNewGame, stopGame, selectedDifficulty } = useGame()
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
    }
  }, [selectedSquare, validMoves, gameOver, gameStarted, isThinking, chess, playerColor])

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
                        setLastMove(`ai-${result.san}`)
                        setMoves(prev => [...prev, result.san || ''])
                        setAnimatingPiece(null)

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

  // Efecto para cambiar automáticamente los mensajes de Sabiduría Sith
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
          }, 300) // Tiempo para que aparezca el nuevo mensaje
        }, 300) // Tiempo para que desaparezca el mensaje actual
      }, 90000) // 90 segundos

      return () => clearInterval(interval)
    }
  }, [gameStarted, sithMessages.length])

  // Efecto para el primer movimiento de la IA si el jugador juega con negras
  useEffect(() => {
    if (gameStarted && playerColor === 'b' && chess.turn() === 'b' && !gameOver && !isThinking && !animatingPiece && moves.length === 0) {
      // Solo hacer el primer movimiento de la IA, no continuar automáticamente
      setTimeout(() => {
        setIsThinking(true)
        
        // Usar el nuevo motor de IA para el primer movimiento
        const aiMove = aiEngine.selectMove('b')
        
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
                  setLastMove(`ai-${result.san}`)
                  setMoves(prev => [...prev, result.san || ''])
                  setAnimatingPiece(null)

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
              }, 300) // Duración de la animación
            }
          }, aiEngine.getMoveDelay()) // Usar el delay específico del nivel
        }
        
        setIsThinking(false)
      }, 800)
    }
  }, [gameStarted, playerColor, chess.turn(), gameOver, isThinking, chess, animatingPiece, moves.length, aiEngine])

  // Función para formatear el tiempo en formato MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

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

  // Función para reiniciar el juego
  const resetGame = useCallback(() => {
    chess.reset()
    setSelectedSquare(null)
    setGameOver(false)
    setMoves([])
    stopGame()
    setLastMove(null)
    setValidMoves(new Set())
    setIsThinking(false)
    setCapturedPieces({ white: [], black: [] })
    setAnimatingPiece(null)
    resetTimer() // Reiniciar también el temporizador
    // Asignar color aleatorio al jugador
    setPlayerColor(Math.random() < 0.5 ? 'w' : 'b')
  }, [chess, stopGame, resetTimer])

  // Función para detener el juego sin reiniciar
  const handleStopGame = useCallback(() => {
    setIsThinking(false)
    setAnimatingPiece(null)
    stopTimer()
    stopGame()
  }, [stopGame, stopTimer])


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

  // Función optimizada para renderizar casillas
  const renderSquare = useCallback((file: string, rank: string) => {
    const square = `${file}${rank}`
    const piece = chess.get(square as any)
    const isLight = (file.charCodeAt(0) - 97 + parseInt(rank)) % 2 === 0
    const isSelected = selectedSquare === square
    const isValidMove = validMoves.has(square)
    const isCapture = isValidMove && piece !== null
    const isLastMove = lastMove && (lastMove.includes(square) || lastMove.includes(`ai-${square}`))
    
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
        className={`chess-square ${bgColor} flex items-center justify-center cursor-pointer relative transition-all duration-300 ease-out hover:scale-105 select-none ${
          isLastMove ? 'animate-pulse' : ''
        }`}
        onClick={() => handleSquareClick(square)}
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
              type={animatingPiece.piece.type}
              color={animatingPiece.piece.color}
              isSelected={false}
              size="xl"
            />
          </div>
        )}
        
        {/* Mostrar pieza normal con animación de movimiento */}
        {piece && !isAnimatingFrom && (
          <div className={animatingPiece && isAnimatingTo ? 'chess-piece-moving' : ''}>
            <ChessPiece
              type={piece.type}
              color={piece.color}
              isSelected={isSelected}
              size="xl"
            />
          </div>
        )}
        
        {/* Etiquetas de coordenadas */}
        {file === 'a' && (
          <span className="absolute left-1 top-0 text-xs text-textMuted opacity-50 select-none font-mono">
            {rank}
          </span>
        )}
        {rank === '1' && (
          <span className="absolute bottom-0 right-1 text-xs text-textMuted opacity-50 select-none font-mono">
            {file}
          </span>
        )}
      </div>
    )
  }, [selectedSquare, validMoves, lastMove, chess, handleSquareClick, animatingPiece])

  // Función optimizada para renderizar el tablero
  const renderBoard = useCallback(() => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1']

    return (
      <div className="chess-board grid grid-cols-8 grid-rows-8 w-full h-full border-2 border-board-border shadow-2xl">
        {ranks.map(rank =>
          files.map(file => renderSquare(file, rank))
        )}
      </div>
    )
  }, [renderSquare])

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

        {/* Panel derecho - Filosofía Sith o Interfaz de Juego */}
        <div className="chess-sidebar w-full md:w-80 bg-secondary border-t md:border-t-0 md:border-l border-board-border p-4 md:p-6 flex flex-col mt-4 md:mt-0">
                     {!gameStarted ? (
             /* Filosofía Sith - Pantalla completa cuando no hay juego */
             <div className="game-interface-content">
              <h3 className="text-text font-semibold mb-6 text-center text-[#ec4d58]">Sabiduría Sith</h3>
                
              {/* Selector de Tiempo */}
              <div className="mb-6">
                <h4 className="text-text font-medium mb-3 text-center">Tiempo de Referencia</h4>
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
              </div>

              <div className="game-interface-scrollable flex items-start justify-center">
                <div className={`text-center p-4 md:p-6 bg-accent rounded-lg border border-board-border w-full max-w-sm mx-auto ${
                  isMessageTransitioning ? 'message-fade-out' : 'message-fade-in'
                }`}>
                  <p className="text-text font-medium mb-4 leading-relaxed text-sm md:text-base">
                    {sithMessages[currentMessageIndex]}
                  </p>
                  <div className="flex justify-center space-x-2">
                    {sithMessages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => changeMessage(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentMessageIndex 
                            ? 'bg-[#ec4d58] scale-125' 
                            : 'bg-board-border hover:bg-textMuted'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Interfaz de Juego con Toggle para Sabiduría Sith */
            <div className="game-interface-content">
              {/* Toggle para alternar entre Juego y Sabiduría Sith */}
              <div className="flex-shrink-0 mb-4">
                <div className="flex bg-accent rounded-lg p-1 border border-board-border">
                  <button
                    onClick={() => setShowGameInterface(true)}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-300 ${
                      showGameInterface
                        ? 'bg-[#ec4d58] text-white'
                        : 'text-textMuted hover:text-text'
                    }`}
                  >
                    Juego
                  </button>
                  <button
                    onClick={() => setShowGameInterface(false)}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-300 ${
                      !showGameInterface
                        ? 'bg-[#ec4d58] text-white'
                        : 'text-textMuted hover:text-text'
                    }`}
                  >
                    Sabiduría
                  </button>
                </div>
              </div>

                             {showGameInterface ? (
                 /* Interfaz de Juego */
                 <div className="game-interface-content">
                   {/* Sección superior fija */}
                   <div className="flex-shrink-0 space-y-4">
                    {/* Información del nivel de dificultad */}
                    <div>
                      <div className="bg-accent p-3 rounded-lg border border-board-border">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: currentDifficulty.color }}
                          ></div>
                          <span className="text-text font-semibold text-sm">
                            {currentDifficulty.name}
                          </span>
                        </div>
                        <p className="text-textMuted text-xs text-center">
                          {currentDifficulty.description}
                        </p>
                      </div>
                    </div>

                    {/* Selector de Tiempo */}
                    <div>
                      <h3 className="text-text font-semibold mb-3 text-center">Tiempo de Juego</h3>
                      <div className="bg-accent p-3 rounded-lg border border-board-border">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-textMuted text-sm">Duración:</span>
                          <span className="text-text font-mono font-semibold text-lg">
                            {formatTime(gameTime)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-textMuted text-sm">Referencia:</span>
                          <span className="text-text font-mono text-sm">
                            {selectedTimeOption} min
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Estado del juego */}
                    <div>
                      <h3 className="text-text font-semibold mb-3 text-center">Estado del Juego</h3>
                      <div className="h-32 bg-accent rounded-lg border border-board-border flex items-center justify-center">
                        {gameOver ? (
                          <div className="text-center animate-fade-in">
                            <p className="text-text font-semibold mb-2">
                              {chess.isCheckmate() ? '¡Jaque mate!' : chess.isDraw() ? 'Empate' : 'Fin del juego'}
                            </p>
                            {chess.isCheckmate() && (
                              <p className="text-textMuted text-sm mb-2">
                                {chess.turn() === playerColor ? 'La IA ha ganado' : '¡Has ganado!'}
                              </p>
                            )}
                            <button
                              onClick={resetGame}
                              className="px-4 py-2 bg-board-highlight hover:bg-board-selected text-text font-medium rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-board-highlight focus:ring-opacity-50"
                            >
                              Nueva Partida
                            </button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <p className={`font-semibold mb-2 ${
                              chess.turn() === playerColor ? 'text-[#ec4d58]' : 'text-text'
                            }`}>
                              {chess.turn() === playerColor ? 'Tu turno' : 'Turno de la IA'}
                            </p>
                            {isThinking && (
                              <div className="flex items-center justify-center space-x-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#ec4d58]"></div>
                                <span className="text-textMuted text-sm">Pensando...</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Piezas Capturadas - Altura fija */}
                    <div className="h-32">
                      <h3 className="text-text font-semibold mb-3 text-center">Piezas Capturadas</h3>
                      <div className="grid grid-cols-2 gap-4 h-20">
                        {/* Piezas capturadas por el jugador */}
                        <div className="bg-accent p-3 rounded-lg border border-board-border overflow-hidden">
                          <h4 className="text-textMuted text-sm font-medium mb-2 text-center">Tus capturas</h4>
                          <div className="flex flex-wrap gap-1 justify-center max-h-12 overflow-y-auto">
                            {capturedPieces.black.map((piece, index) => (
                              <span key={index} className="text-lg text-[#8a8a8a]">
                                {getPieceSymbol(piece)}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Piezas capturadas por la IA */}
                        <div className="bg-accent p-3 rounded-lg border border-board-border overflow-hidden">
                          <h4 className="text-textMuted text-sm font-medium mb-2 text-center">Capturas de la IA</h4>
                          <div className="flex flex-wrap gap-1 justify-center max-h-12 overflow-y-auto">
                            {capturedPieces.white.map((piece, index) => (
                              <span key={index} className="text-lg text-[#fafafa]">
                                {getPieceSymbol(piece)}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                                     {/* Sección de movimientos - Altura fija */}
                   <div className="game-interface-scrollable">
                     <h3 className="text-text font-semibold mb-3 text-center">Movimientos</h3>
                     <div className="bg-accent p-4 rounded-lg border border-board-border h-full overflow-y-auto">
                      <div className="text-textMuted text-sm font-mono leading-relaxed">
                        {moves.length > 0 ? (
                          moves.map((move, index) => {
                            const moveNumber = Math.floor(index / 2) + 1
                            const isWhiteMove = index % 2 === 0
                            const pieceSymbol = getMovePieceSymbol(move, isWhiteMove)
                            
                            return (
                              <div 
                                key={index} 
                                className={`mb-2 transition-colors duration-200 ${
                                  index === moves.length - 1 ? 'text-[#ec4d58] font-semibold' : ''
                                }`}
                              >
                                {isWhiteMove && (
                                  <span className="inline-block w-8 text-textMuted">
                                    {moveNumber}.
                                  </span>
                                )}
                                <span className="inline-flex items-center">
                                  <span className="mr-2 text-lg">
                                    {pieceSymbol}
                                  </span>
                                  <span>{move}</span>
                                </span>
                              </div>
                            )
                          })
                        ) : (
                          <div className="text-center text-textMuted py-8">
                            <p>No hay movimientos aún</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Información adicional - Altura fija */}
                  <div className="flex-shrink-0 mt-4 text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className={`w-3 h-3 rounded-full ${playerColor === 'w' ? 'bg-white' : 'bg-gray-400'}`}></div>
                      <p className="text-textMuted text-xs">
                        {playerColor === 'w' ? 'Juegas con las piezas blancas' : 'Juegas con las piezas negras'}
                      </p>
                    </div>
                    <p className="text-textMuted text-xs">
                      Color asignado aleatoriamente
                    </p>
                  </div>
                </div>
                             ) : (
                 /* Sabiduría Sith - Durante el juego */
                 <div className="game-interface-content">
                  <h3 className="text-text font-semibold mb-6 text-center text-[#ec4d58]">Sabiduría Sith</h3>
                  
                  {/* Selector de Tiempo */}
                  <div className="mb-6">
                    <h4 className="text-text font-medium mb-3 text-center">Tiempo de Referencia</h4>
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
                  </div>

                  <div className="game-interface-scrollable flex items-start justify-center">
                    <div className={`text-center p-4 md:p-6 bg-accent rounded-lg border border-board-border w-full max-w-sm mx-auto ${
                      isMessageTransitioning ? 'message-fade-out' : 'message-fade-in'
                    }`}>
                      <p className="text-text font-medium mb-4 leading-relaxed text-sm md:text-base">
                        {sithMessages[currentMessageIndex]}
                      </p>
                      <div className="flex justify-center space-x-2">
                        {sithMessages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => changeMessage(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === currentMessageIndex 
                                ? 'bg-[#ec4d58] scale-125' 
                                : 'bg-board-border hover:bg-textMuted'
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
     </div>
   </div>
 )
}
