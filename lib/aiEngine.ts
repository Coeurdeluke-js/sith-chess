import { Chess } from 'chess.js'
import { DifficultyLevel } from './difficultyLevels'

export interface AIMove {
  from: string
  to: string
  piece: string
  san: string
  score?: number
}

export class AIEngine {
  private chess: Chess
  private difficulty: DifficultyLevel

  constructor(chess: Chess, difficulty: DifficultyLevel) {
    this.chess = chess
    this.difficulty = difficulty
  }

  // Función principal para seleccionar el mejor movimiento
  public selectMove(aiColor: 'w' | 'b'): AIMove | null {
    try {
      // Obtener movimientos válidos del tablero actual
      const possibleMoves = this.chess.moves({ verbose: true }) as any[]
      
      if (!possibleMoves || possibleMoves.length === 0) {
        console.log('No hay movimientos válidos disponibles')
        return null
      }

      // Filtrar solo movimientos de la IA
      const aiMoves = possibleMoves.filter((move: any) => {
        const piece = this.chess.get(move.from as any)
        return piece && piece.color === aiColor
      })

      if (aiMoves.length === 0) {
        console.log('No hay movimientos válidos para la IA')
        return null
      }

      // Aplicar aleatoriedad según el nivel de dificultad
      if (Math.random() < this.difficulty.aiBehavior.randomness) {
        return this.selectRandomMove(aiMoves)
      }

      // Evaluar movimientos con búsqueda en profundidad según el nivel
      const evaluatedMoves = aiMoves.map(move => ({
        ...move,
        score: this.evaluateMoveWithDepth(move, aiColor, this.difficulty.aiBehavior.searchDepth)
      }))

      // Ordenar por puntuación (mejor primero)
      evaluatedMoves.sort((a, b) => (b.score || 0) - (a.score || 0))

      // Seleccionar el mejor movimiento con variabilidad inteligente
      const topMoves = evaluatedMoves.slice(0, Math.max(1, Math.floor(evaluatedMoves.length * 0.2)))
      const selectedMove = topMoves[Math.floor(Math.random() * topMoves.length)]
      
      // Verificar que el movimiento sea válido antes de retornarlo
      if (selectedMove && this.isValidMove(selectedMove)) {
        return selectedMove
      } else {
        // Si el movimiento seleccionado no es válido, usar uno aleatorio
        console.log('Movimiento seleccionado no válido, usando aleatorio')
        // Filtrar solo movimientos válidos antes de seleccionar uno aleatorio
        const validMoves = aiMoves.filter(move => this.isValidMove(move))
        if (validMoves.length > 0) {
          return this.selectRandomMove(validMoves)
        } else {
          console.log('No hay movimientos válidos después del filtrado')
          return null
        }
      }
    } catch (error) {
      console.error('Error en selectMove:', error)
      // En caso de error, retornar un movimiento aleatorio válido
      const possibleMoves = this.chess.moves({ verbose: true }) as any[]
      const aiMoves = possibleMoves.filter((move: any) => {
        const piece = this.chess.get(move.from as any)
        return piece && piece.color === aiColor
      })
      return aiMoves.length > 0 ? this.selectRandomMove(aiMoves) : null
    }
  }

  // Seleccionar movimiento aleatorio
  private selectRandomMove(moves: any[]): AIMove {
    return moves[Math.floor(Math.random() * moves.length)]
  }

  // Verificar si un movimiento es válido
  private isValidMove(move: any): boolean {
    try {
      // Verificar que las coordenadas sean válidas
      if (!move.from || !move.to || !move.piece) {
        console.log('Movimiento inválido: coordenadas faltantes', move)
        return false
      }

      // Verificar que la pieza existe en la posición de origen
      const piece = this.chess.get(move.from as any)
      if (!piece || piece.type !== move.piece) {
        console.log('Movimiento inválido: pieza no encontrada o tipo incorrecto', { move, piece })
        return false
      }

      // Verificar que el movimiento esté en la lista de movimientos válidos
      const validMoves = this.chess.moves({ verbose: true }) as any[]
      const isValid = validMoves.some(validMove => 
        validMove.from === move.from && 
        validMove.to === move.to && 
        validMove.piece === move.piece
      )

      if (!isValid) {
        console.log('Movimiento no está en la lista de movimientos válidos', { move, validMoves: validMoves.slice(0, 5) })
      }

      return isValid
    } catch (error) {
      console.error('Error verificando validez del movimiento:', error)
      return false
    }
  }

  // Evaluar un movimiento específico con búsqueda en profundidad
  private evaluateMoveWithDepth(move: any, aiColor: 'w' | 'b', depth: number): number {
    let score = 0

    // Evaluación inmediata del movimiento
    score += this.evaluateMove(move, aiColor)

    // Búsqueda en profundidad para niveles altos
    if (depth > 1) {
      try {
        // Hacer el movimiento temporalmente
        this.chess.move(move)
        
        // Evaluar la posición resultante
        score += this.evaluatePositionAfterMove(aiColor, depth - 1) * 0.5
        
        // Deshacer el movimiento
        this.chess.undo()
      } catch (error) {
        // Si hay error, continuar con la evaluación básica
      }
    }

    return score
  }

  // Evaluar un movimiento específico
  private evaluateMove(move: any, aiColor: 'w' | 'b'): number {
    let score = 0

    // Evaluación básica de capturas
    score += this.evaluateCapture(move) * 10

    // Evaluación de jaque
    score += this.evaluateCheck(move) * 15

    // Evaluación de jaque mate
    score += this.evaluateCheckmate(move) * 1000

    // Evaluación posicional
    score += this.evaluatePosition(move, aiColor)

    // Evaluación táctica según el nivel
    score += this.evaluateTactical(move, aiColor)

    // Evaluación defensiva según el nivel
    score += this.evaluateDefensive(move, aiColor)

    // Evaluación agresiva según el nivel
    score += this.evaluateAggressive(move, aiColor)

    return score
  }

  // Evaluar capturas
  private evaluateCapture(move: any): number {
    if (!move.san.includes('x')) return 0
    
    const pieceValues: { [key: string]: number } = {
      'p': 1,   // Peón
      'n': 3,   // Caballo
      'b': 3,   // Alfil
      'r': 5,   // Torre
      'q': 9,   // Reina
      'k': 0    // Rey (no se puede capturar directamente)
    }

    const capturedPiece = this.chess.get(move.to as any)
    return capturedPiece ? pieceValues[capturedPiece.type] || 0 : 0
  }

  // Evaluar jaque
  private evaluateCheck(move: any): number {
    return move.san.includes('+') ? 1 : 0
  }

  // Evaluar jaque mate
  private evaluateCheckmate(move: any): number {
    return move.san.includes('#') ? 1 : 0
  }

  // Evaluar posición
  private evaluatePosition(move: any, aiColor: 'w' | 'b'): number {
    let score = 0

    // Control del centro
    const centerSquares = ['d4', 'd5', 'e4', 'e5']
    if (centerSquares.includes(move.to)) {
      score += 3
    }

    // Desarrollo de piezas
    if (move.piece === 'p' && aiColor === 'w' && move.to[1] >= '4') {
      score += 2
    }
    if (move.piece === 'p' && aiColor === 'b' && move.to[1] <= '5') {
      score += 2
    }

    // Seguridad del rey
    if (move.piece === 'k') {
      score -= 8 // Penalizar mover el rey temprano
    }

    // Evaluar estructura de peones
    score += this.evaluatePawnStructure(move, aiColor)

    // Evaluar seguridad del rey
    score += this.evaluateKingSafety(move, aiColor)

    return score
  }

  // Evaluación táctica
  private evaluateTactical(move: any, aiColor: 'w' | 'b'): number {
    const tacticalWeight = this.difficulty.aiBehavior.tactical
    
    // Buscar movimientos que ataquen múltiples piezas
    let tacticalScore = 0
    
    // Verificar si el movimiento ataca múltiples piezas
    const attackedSquares = this.getAttackedSquares(move.to, aiColor)
    tacticalScore += attackedSquares.length * 2

    // Verificar si el movimiento defiende piezas propias
    const defendedSquares = this.getDefendedSquares(move.to, aiColor)
    tacticalScore += defendedSquares.length

    return tacticalScore * tacticalWeight
  }

  // Evaluación defensiva
  private evaluateDefensive(move: any, aiColor: 'w' | 'b'): number {
    const defensiveWeight = this.difficulty.aiBehavior.defensive
    
    // Verificar si el movimiento protege al rey
    let defensiveScore = 0
    
    if (this.isKingInDanger(aiColor)) {
      defensiveScore += 10
    }

    // Verificar si el movimiento bloquea ataques
    if (this.blocksAttack(move)) {
      defensiveScore += 5
    }

    return defensiveScore * defensiveWeight
  }

  // Evaluación agresiva
  private evaluateAggressive(move: any, aiColor: 'w' | 'b'): number {
    const aggressiveWeight = this.difficulty.aiBehavior.aggression
    
    let aggressiveScore = 0
    
    // Movimientos que atacan piezas de mayor valor
    const capturedPiece = this.chess.get(move.to as any)
    if (capturedPiece) {
      const pieceValues: { [key: string]: number } = {
        'p': 1, 'n': 3, 'b': 3, 'r': 5, 'q': 9, 'k': 0
      }
      aggressiveScore += pieceValues[capturedPiece.type] || 0
    }

    // Movimientos que ponen en jaque
    if (move.san.includes('+')) {
      aggressiveScore += 8
    }

    // Movimientos que avanzan peones hacia la promoción
    if (move.piece === 'p') {
      const promotionRank = aiColor === 'w' ? '8' : '1'
      const distanceToPromotion = Math.abs(parseInt(move.to[1]) - parseInt(promotionRank))
      aggressiveScore += (8 - distanceToPromotion) * 0.5
    }

    return aggressiveScore * aggressiveWeight
  }

  // Obtener casillas atacadas desde una posición
  private getAttackedSquares(square: string, aiColor: 'w' | 'b'): string[] {
    const attackedSquares: string[] = []
    const moves = this.chess.moves({ square: square as any, verbose: true }) as any[]
    
    for (const move of moves) {
      const piece = this.chess.get(move.to as any)
      if (piece && piece.color !== aiColor) {
        attackedSquares.push(move.to)
      }
    }
    
    return attackedSquares
  }

  // Obtener casillas defendidas desde una posición
  private getDefendedSquares(square: string, aiColor: 'w' | 'b'): string[] {
    const defendedSquares: string[] = []
    const moves = this.chess.moves({ square: square as any, verbose: true }) as any[]
    
    for (const move of moves) {
      const piece = this.chess.get(move.to as any)
      if (piece && piece.color === aiColor) {
        defendedSquares.push(move.to)
      }
    }
    
    return defendedSquares
  }

  // Verificar si el rey está en peligro
  private isKingInDanger(aiColor: 'w' | 'b'): boolean {
    return this.chess.isCheck()
  }

  // Verificar si el movimiento bloquea un ataque
  private blocksAttack(move: any): boolean {
    // Implementación simplificada - verificar si el movimiento interfiere con ataques
    const opponentColor = move.color === 'w' ? 'b' : 'w'
    const opponentMoves = this.chess.moves({ verbose: true }) as any[]
    
    // Verificar si el movimiento bloquea un ataque directo
    for (const oppMove of opponentMoves) {
      if (oppMove.to === move.to && oppMove.san.includes('x')) {
        return true
      }
    }
    
    return false
  }

  // Obtener el delay de movimiento según la dificultad
  public getMoveDelay(): number {
    const { min, max } = this.difficulty.aiBehavior.moveDelay
    return Math.random() * (max - min) + min
  }

  // Evaluar estructura de peones
  private evaluatePawnStructure(move: any, aiColor: 'w' | 'b'): number {
    let score = 0

    // Evaluar peones doblados
    const file = move.to.charCodeAt(0) - 97
    const pawnsInFile = this.countPawnsInFile(file, aiColor)
    if (pawnsInFile > 1) score -= 1

    // Evaluar peones aislados
    if (this.isPawnIsolated(file, aiColor)) score -= 2

    // Evaluar peones pasados
    if (this.isPawnPassed(move.to, aiColor)) score += 3

    return score
  }

  // Evaluar seguridad del rey
  private evaluateKingSafety(move: any, aiColor: 'w' | 'b'): number {
    let score = 0
    const board = this.chess.board()
    
    // Encontrar la posición del rey
    let kingSquare = ''
    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const piece = board[rank][file]
        if (piece && piece.type === 'k' && piece.color === aiColor) {
          kingSquare = String.fromCharCode(97 + file) + (rank + 1)
          break
        }
      }
      if (kingSquare) break
    }

    if (kingSquare) {
      const kingFile = kingSquare.charCodeAt(0) - 97
      const kingRank = parseInt(kingSquare[1]) - 1

      // Penalizar si el rey está muy expuesto
      if (aiColor === 'w' && kingRank > 6) score -= 2
      if (aiColor === 'b' && kingRank < 1) score -= 2

      // Evaluar protección del rey
      const protectionSquares = this.getKingProtectionSquares(kingFile, kingRank, aiColor)
      score += protectionSquares * 1.5
    }

    return score
  }

  // Obtener cuadrados de protección del rey
  private getKingProtectionSquares(file: number, rank: number, aiColor: 'w' | 'b'): number {
    let protection = 0
    const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
    
    for (const [df, dr] of directions) {
      const newFile = file + df
      const newRank = rank + dr
      if (newFile >= 0 && newFile < 8 && newRank >= 0 && newRank < 8) {
        const piece = this.chess.board()[newRank][newFile]
        if (piece && piece.color === aiColor) protection++
      }
    }
    
    return protection
  }

  // Contar peones en una fila
  private countPawnsInFile(file: number, aiColor: 'w' | 'b'): number {
    let count = 0
    for (let rank = 0; rank < 8; rank++) {
      const piece = this.chess.board()[rank][file]
      if (piece && piece.type === 'p' && piece.color === aiColor) count++
    }
    return count
  }

  // Verificar si un peón está aislado
  private isPawnIsolated(file: number, aiColor: 'w' | 'b'): boolean {
    const leftFile = file - 1
    const rightFile = file + 1
    
    if (leftFile >= 0 && this.countPawnsInFile(leftFile, aiColor) > 0) return false
    if (rightFile < 8 && this.countPawnsInFile(rightFile, aiColor) > 0) return false
    
    return true
  }

  // Verificar si un peón es pasado
  private isPawnPassed(square: string, aiColor: 'w' | 'b'): boolean {
    const file = square.charCodeAt(0) - 97
    const rank = parseInt(square[1]) - 1
    const opponentColor = aiColor === 'w' ? 'b' : 'w'
    
    // Verificar si hay peones enemigos en la misma fila o adyacentes
    for (let r = 0; r < 8; r++) {
      const piece = this.chess.board()[r][file]
      if (piece && piece.type === 'p' && piece.color === opponentColor) {
        if (aiColor === 'w' && r > rank) return false
        if (aiColor === 'b' && r < rank) return false
      }
    }
    
    // Verificar filas adyacentes
    for (const adjFile of [file - 1, file + 1]) {
      if (adjFile >= 0 && adjFile < 8) {
        for (let r = 0; r < 8; r++) {
          const piece = this.chess.board()[r][adjFile]
          if (piece && piece.type === 'p' && piece.color === opponentColor) {
            if (aiColor === 'w' && r > rank) return false
            if (aiColor === 'b' && r < rank) return false
          }
        }
      }
    }
    
    return true
  }
}
