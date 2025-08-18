export interface DifficultyLevel {
  id: string
  name: string
  description: string
  insignia: string
  color: string
  aiBehavior: {
    moveDelay: { min: number; max: number }
    searchDepth: number
    randomness: number // 0-1, higher = more random moves
    aggression: number // 0-1, higher = more aggressive
    defensive: number // 0-1, higher = more defensive
    tactical: number // 0-1, higher = more tactical
  }
}

export const difficultyLevels: DifficultyLevel[] = [
  {
    id: 'iniciado',
    name: 'Iniciado',
    description: 'Apertura al camino y potencial puro. Media luna abierta hacia arriba, confrontación de la Persona.',
    insignia: '/insignias/1-iniciados.png',
    color: '#FAFAFA',
    aiBehavior: {
      moveDelay: { min: 300, max: 600 },
      searchDepth: 1,
      randomness: 0.8,
      aggression: 0.2,
      defensive: 0.3,
      tactical: 0.1
    }
  },
  {
    id: 'acolito',
    name: 'Acólito',
    description: 'Primer enfrentamiento con la sombra interna. Triángulo invertido con núcleo luminoso, iluminación de verdades ocultas.',
    insignia: '/insignias/2-acolitos.png',
    color: '#FFD447',
    aiBehavior: {
      moveDelay: { min: 200, max: 500 },
      searchDepth: 2,
      randomness: 0.6,
      aggression: 0.3,
      defensive: 0.4,
      tactical: 0.2
    }
  },
  {
    id: 'warrior',
    name: 'Warrior',
    description: 'Integración de fuerzas opuestas: disciplina y pasión. Dos sables cruzados, energía controlada y crecimiento.',
    insignia: '/insignias/3-warriors.png',
    color: '#3ED598',
    aiBehavior: {
      moveDelay: { min: 500, max: 1000 },
      searchDepth: 3,
      randomness: 0.4,
      aggression: 0.5,
      defensive: 0.5,
      tactical: 0.4
    }
  },
  {
    id: 'lord',
    name: 'Lord',
    description: 'Visión estratégica y comprensión de patrones. Ojo Sith estilizado, autoridad y percepción elevada.',
    insignia: '/insignias/4-lords.png',
    color: '#4671D5',
    aiBehavior: {
      moveDelay: { min: 400, max: 800 },
      searchDepth: 4,
      randomness: 0.2,
      aggression: 0.7,
      defensive: 0.6,
      tactical: 0.7
    }
  },
  {
    id: 'darth',
    name: 'Darth',
    description: 'Transmutación de la sombra en poder. Ouroboros circular con llama central, dominio de energía destructiva y creativa.',
    insignia: '/insignias/5-darths.png',
    color: '#EC4D58',
    aiBehavior: {
      moveDelay: { min: 300, max: 600 },
      searchDepth: 5,
      randomness: 0.1,
      aggression: 0.8,
      defensive: 0.7,
      tactical: 0.8
    }
  },
  {
    id: 'maestro',
    name: 'Maestro',
    description: 'Integración plena del Self y maestría interior. Mandala cerrado complejo, equilibrio y control absoluto.',
    insignia: '/insignias/6-maestros.png',
    color: '#8A8A8A',
    aiBehavior: {
      moveDelay: { min: 200, max: 400 },
      searchDepth: 6,
      randomness: 0.05,
      aggression: 0.9,
      defensive: 0.8,
      tactical: 0.9
    }
  }
]

export const getDifficultyLevel = (id: string): DifficultyLevel => {
  return difficultyLevels.find(level => level.id === id) || difficultyLevels[0]
}
