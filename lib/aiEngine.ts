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
    const possibleMoves = this.chess.moves({ verbose: true }) as any[]
    const aiMoves = possibleMoves.filter((move: any) => {
      const piece = this.chess.get(move.from as any)
      return piece && piece.color === aiColor
    })

    if (aiMoves.length === 0) return null

    // Aplicar aleatoriedad según el nivel de dificultad
    if (Math.random() < this.difficulty.aiBehavior.randomness) {
      return this.selectRandomMove(aiMoves)
    }

    // Evaluar movimientos según la estrategia del nivel
    const evaluatedMoves = aiMoves.map(move => ({
      ...move,
      score: this.evaluateMove(move, aiColor)
    }))

    // Ordenar por puntuación (mejor primero)
    evaluatedMoves.sort((a, b) => (b.score || 0) - (a.score || 0))

    // Seleccionar el mejor movimiento con cierta variabilidad
    const topMoves = evaluatedMoves.slice(0, Math.max(1, Math.floor(evaluatedMoves.length * 0.3)))
    return topMoves[Math.floor(Math.random() * topMoves.length)]
  }

  // Seleccionar movimiento aleatorio
  private selectRandomMove(moves: any[]): AIMove {
    return moves[Math.floor(Math.random() * moves.length)]
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
      score += 2
    }

    // Desarrollo de piezas
    if (move.piece === 'p' && aiColor === 'w' && move.to[1] >= '4') {
      score += 1
    }
    if (move.piece === 'p' && aiColor === 'b' && move.to[1] <= '5') {
      score += 1
    }

    // Seguridad del rey
    if (move.piece === 'k') {
      score -= 5 // Penalizar mover el rey temprano
    }

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
}
