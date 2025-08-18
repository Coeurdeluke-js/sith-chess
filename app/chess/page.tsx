'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { Chess } from 'chess.js'
import { ChessPiece } from '@/components/ChessPiece'
import { OpeningModal } from '@/components/OpeningModal'
import { useGame } from '@/contexts/GameContext'

export default function ChessGame() {
  const { gameStarted, startNewGame, stopGame } = useGame()
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

  // Mensajes filosóficos Sith
  const sithMessages = [
    "El ajedrez es como el mercado: cada movimiento revela tu verdadera naturaleza. Los débiles temen la pérdida, los fuertes buscan la victoria total.",
    "En el tablero como en el trading, la paciencia es tu arma más poderosa. El Sith que actúa por impulso, muere por impulso.",
    "Las piezas son tus soldados, el tablero tu campo de batalla. Pero recuerda: el verdadero poder no está en las piezas, sino en la mente que las dirige.",
    "El trading y el ajedrez comparten una verdad fundamental: el que controla el centro, controla el juego. El que controla sus emociones, controla su destino.",
    "Cada captura es una lección, cada jaque una advertencia. En la guerra del mercado como en la guerra del tablero, solo los adaptables sobreviven.",
    "El jaque mate no es el fin, es el comienzo de una nueva comprensión. Cada derrota te hace más fuerte, cada victoria te hace más sabio."
  ]

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

                     // Si es turno de la IA, hacer su movimiento
           if (chess.turn() !== playerColor) {
             setTimeout(() => {
               // Lógica de IA inline para evitar dependencia circular
               const aiColor = playerColor === 'w' ? 'b' : 'w'
               if (gameOver || chess.turn() !== aiColor || !gameStarted) return

              setIsThinking(true)
              
              setTimeout(() => {
                try {
                  const possibleMoves = chess.moves({ verbose: true })
                  const aiMoves = possibleMoves.filter((move: any) => {
                    const piece = chess.get(move.from as any)
                    return piece && piece.color === aiColor
                  })
                  
                  if (aiMoves.length > 0) {
                    let bestMove = aiMoves[0]
                    
                    const checkMoves = aiMoves.filter((move: any) => 
                      move.san.includes('+') || move.san.includes('#')
                    )
                    if (checkMoves.length > 0) {
                      bestMove = checkMoves[0]
                    }
                    
                    const captureMoves = aiMoves.filter((move: any) => 
                      move.san.includes('x')
                    )
                    if (captureMoves.length > 0) {
                      bestMove = captureMoves[0]
                    }

                    const aiPiece = chess.get(bestMove.from as any)
                    if (aiPiece) {
                      // Animar movimiento de la IA
                      setAnimatingPiece({ from: bestMove.from, to: bestMove.to, piece: aiPiece })
                      
                      setTimeout(() => {
                        const capturedPiece = chess.get(bestMove.to as any)
                        
                        const result = chess.move(bestMove)
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
                  }
                } catch (error) {
                  console.error('Error en movimiento de IA:', error)
                } finally {
                  setIsThinking(false)
                }
              }, 400 + Math.random() * 300)
            }, 600)
          }
        }
      }, 300) // Duración de la animación del jugador
    } catch (error) {
      console.error('Movimiento inválido:', error)
      setSelectedSquare(null)
      setAnimatingPiece(null)
    }
  }, [chess, playerColor, gameOver, gameStarted])



  // Efecto para movimientos automáticos de IA
  useEffect(() => {
    const aiColor = playerColor === 'w' ? 'b' : 'w'
    if (chess.turn() === aiColor && !gameOver && selectedSquare === null && gameStarted && !isThinking && !animatingPiece) {
      // Lógica de IA inline
      setIsThinking(true)
      
      setTimeout(() => {
        try {
          const possibleMoves = chess.moves({ verbose: true })
          const aiMoves = possibleMoves.filter((move: any) => {
            const piece = chess.get(move.from as any)
            return piece && piece.color === aiColor
          })
          
          if (aiMoves.length > 0) {
            let bestMove = aiMoves[0]
            
            const checkMoves = aiMoves.filter((move: any) => 
              move.san.includes('+') || move.san.includes('#')
            )
            if (checkMoves.length > 0) {
              bestMove = checkMoves[0]
            }
            
            const captureMoves = aiMoves.filter((move: any) => 
              move.san.includes('x')
            )
            if (captureMoves.length > 0) {
              bestMove = captureMoves[0]
            }

            const aiPiece = chess.get(bestMove.from as any)
            if (aiPiece) {
              // Animar movimiento de la IA
              setAnimatingPiece({ from: bestMove.from, to: bestMove.to, piece: aiPiece })
              
              setTimeout(() => {
                const capturedPiece = chess.get(bestMove.to as any)
                
                const result = chess.move(bestMove)
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
          }
        } catch (error) {
          console.error('Error en movimiento de IA:', error)
        } finally {
          setIsThinking(false)
        }
      }, 400 + Math.random() * 300)
    }
  }, [chess.turn(), gameOver, selectedSquare, gameStarted, isThinking, playerColor, chess, animatingPiece])

  // Efecto para que la IA haga el primer movimiento si el jugador juega con negras
  useEffect(() => {
    if (gameStarted && playerColor === 'b' && chess.turn() === 'b' && !gameOver && !isThinking && !animatingPiece) {
      // Pequeño delay para que el usuario vea que la IA va primero
      setTimeout(() => {
        setIsThinking(true)
        
        setTimeout(() => {
          try {
            const possibleMoves = chess.moves({ verbose: true })
            const aiMoves = possibleMoves.filter((move: any) => {
              const piece = chess.get(move.from as any)
              return piece && piece.color === 'b'
            })
            
            if (aiMoves.length > 0) {
              let bestMove = aiMoves[0]
              
              const checkMoves = aiMoves.filter((move: any) => 
                move.san.includes('+') || move.san.includes('#')
              )
              if (checkMoves.length > 0) {
                bestMove = checkMoves[0]
              }
              
              const captureMoves = aiMoves.filter((move: any) => 
                move.san.includes('x')
              )
              if (captureMoves.length > 0) {
                bestMove = captureMoves[0]
              }

              const aiPiece = chess.get(bestMove.from as any)
              if (aiPiece) {
                // Animar movimiento de la IA
                setAnimatingPiece({ from: bestMove.from, to: bestMove.to, piece: aiPiece })
                
                setTimeout(() => {
                  const capturedPiece = chess.get(bestMove.to as any)
                  
                  const result = chess.move(bestMove)
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
            }
          } catch (error) {
            console.error('Error en movimiento de IA:', error)
          } finally {
            setIsThinking(false)
          }
        }, 400 + Math.random() * 300)
      }, 800)
    }
  }, [gameStarted, playerColor, chess.turn(), gameOver, isThinking, chess, animatingPiece])

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

  // Efecto para iniciar automáticamente el juego cuando se carga la página
  useEffect(() => {
    if (!gameStarted) {
      startNewGame()
    }
  }, [gameStarted, startNewGame])

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
    // Asignar color aleatorio al jugador
    setPlayerColor(Math.random() < 0.5 ? 'w' : 'b')
  }, [chess, stopGame])



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
    <div className="min-h-screen bg-primary select-none">
      {/* Modal de apertura - solo se muestra una vez */}
      {showOpeningModal && !modalShown && (
        <OpeningModal onClose={handleOpeningModalClose} />
      )}

      <div className="flex h-full flex-col md:flex-row">
        {/* Contenido principal - Tablero centrado */}
        <div className="flex-1 flex items-center justify-center p-3 md:p-6">
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
        <div className="w-full md:w-80 bg-secondary border-t md:border-t-0 md:border-l border-board-border p-4 md:p-6 flex flex-col mt-4 md:mt-0">
          {!gameStarted ? (
            /* Filosofía Sith */
            <div className="flex flex-col">
              <h3 className="text-text font-semibold mb-6 text-center text-[#ec4d58]">Sabiduría Sith</h3>
                <div className="flex items-start justify-center">
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
            /* Interfaz de Juego */
            <>
              {/* Estado del juego */}
              <div className="mb-6">
                <h3 className="text-text font-semibold mb-3 text-center">Estado del Juego</h3>
                {gameOver ? (
                  <div className="text-center p-4 bg-accent rounded-lg border border-board-border animate-fade-in">
                    <p className="text-text font-semibold mb-3">
                      {chess.isCheckmate() ? '¡Jaque mate!' : chess.isDraw() ? 'Empate' : 'Fin del juego'}
                    </p>
                    {chess.isCheckmate() && (
                      <p className="text-textMuted text-sm mb-3">
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
                  <div className="text-center p-4 bg-accent rounded-lg border border-board-border">
                    <p className="text-text font-semibold mb-2">
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

              {/* Piezas Capturadas */}
              {(capturedPieces.white.length > 0 || capturedPieces.black.length > 0) && (
                <div className="mb-6">
                  <h3 className="text-text font-semibold mb-3 text-center">Piezas Capturadas</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Piezas capturadas por el jugador */}
                    <div className="bg-accent p-3 rounded-lg border border-board-border">
                      <h4 className="text-textMuted text-sm font-medium mb-2 text-center">Tus capturas</h4>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {capturedPieces.black.map((piece, index) => (
                          <span key={index} className="text-lg text-[#8a8a8a]">
                            {getPieceSymbol(piece)}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Piezas capturadas por la IA */}
                    <div className="bg-accent p-3 rounded-lg border border-board-border">
                      <h4 className="text-textMuted text-sm font-medium mb-2 text-center">Capturas de la IA</h4>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {capturedPieces.white.map((piece, index) => (
                          <span key={index} className="text-lg text-[#fafafa]">
                            {getPieceSymbol(piece)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Movimientos */}
              {moves.length > 0 && (
                <div className="flex-1">
                  <h3 className="text-text font-semibold mb-3 text-center">Movimientos</h3>
                  <div className="bg-accent p-4 rounded-lg border border-board-border max-h-96 overflow-y-auto">
                    <div className="text-textMuted text-sm font-mono leading-relaxed">
                      {moves.map((move, index) => {
                        // Determinar qué pieza se movió basándose en el movimiento
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
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Información adicional */}
              <div className="mt-4 text-center">
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
            </>
          )}
        </div>
      </div>
    </div>
  )
}
