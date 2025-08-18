'use client'

import Link from 'next/link'
import { Sidebar } from '@/components/Sidebar'
import { ArrowLeft, Shield, Target, Zap, BookOpen, Users, Trophy } from 'lucide-react'

export default function AyudaPage() {
  return (
    <div className="min-h-screen bg-primary text-text flex">
      <Sidebar onNewGame={() => {}} />
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <Link href="/inicio" className="text-textMuted hover:text-text transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-4xl font-light text-[#ec4d58]">Academia Sith - Manual de Guerra</h1>
          </div>
          <p className="text-lg text-textMuted leading-relaxed">
            Bienvenido a la Academia Sith del Ajedrez. Aquí aprenderás las artes oscuras del juego más noble, 
            donde cada movimiento es una lección de estrategia y cada partida una batalla de mentes.
          </p>
        </div>

        {/* Contenido principal */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Las Piezas */}
          <section className="space-y-6">
            <h2 className="text-3xl font-light text-[#ec4d58] flex items-center space-x-3">
              <Shield className="w-8 h-8" />
              <span>Las Piezas del Ejército</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-accent p-6 rounded-lg border border-board-border">
                <h3 className="text-xl font-medium text-text mb-4">El Rey - Tu Comandante</h3>
                <p className="text-textMuted text-sm leading-relaxed mb-3">
                  El Rey es tu pieza más valiosa. Se mueve una casilla en cualquier dirección. 
                  Si el Rey cae, la batalla termina. Protégelo como si fuera tu vida.
                </p>
                <p className="text-textMuted text-sm leading-relaxed">
                  <strong>Movimiento:</strong> Una casilla en cualquier dirección (horizontal, vertical o diagonal)
                </p>
              </div>

              <div className="bg-accent p-6 rounded-lg border border-board-border">
                <h3 className="text-xl font-medium text-text mb-4">La Reina - Tu Arma Más Poderosa</h3>
                <p className="text-textMuted text-sm leading-relaxed mb-3">
                  La Reina combina el poder de la Torre y el Alfil. Se mueve cualquier número de casillas 
                  en línea recta. Es tu pieza más versátil y letal.
                </p>
                <p className="text-textMuted text-sm leading-relaxed">
                  <strong>Movimiento:</strong> Cualquier número de casillas en línea recta
                </p>
              </div>

              <div className="bg-accent p-6 rounded-lg border border-board-border">
                <h3 className="text-xl font-medium text-text mb-4">La Torre - Tu Fortaleza</h3>
                <p className="text-textMuted text-sm leading-relaxed mb-3">
                  La Torre se mueve en líneas rectas horizontales y verticales. Es excelente para 
                  controlar columnas y filas abiertas, y fundamental en los finales.
                </p>
                <p className="text-textMuted text-sm leading-relaxed">
                  <strong>Movimiento:</strong> Cualquier número de casillas en línea recta horizontal o vertical
                </p>
              </div>

              <div className="bg-accent p-6 rounded-lg border border-board-border">
                <h3 className="text-xl font-medium text-text mb-4">El Alfil - Tu Arquero</h3>
                <p className="text-textMuted text-sm leading-relaxed mb-3">
                  El Alfil se mueve en diagonales. Controla casillas del mismo color durante toda la partida. 
                  Dos Alfiles trabajando juntos son una fuerza devastadora.
                </p>
                <p className="text-textMuted text-sm leading-relaxed">
                  <strong>Movimiento:</strong> Cualquier número de casillas en diagonal
                </p>
              </div>

              <div className="bg-accent p-6 rounded-lg border border-board-border">
                <h3 className="text-xl font-medium text-text mb-4">El Caballo - Tu Explorador</h3>
                <p className="text-textMuted text-sm leading-relaxed mb-3">
                  El Caballo se mueve en forma de &quot;L&quot;: dos casillas en una dirección y una perpendicular. 
                  Es la única pieza que puede &quot;saltar&quot; sobre otras.
                </p>
                <p className="text-textMuted text-sm leading-relaxed">
                  <strong>Movimiento:</strong> Dos casillas en una dirección, luego una perpendicular
                </p>
              </div>

              <div className="bg-accent p-6 rounded-lg border border-board-border">
                <h3 className="text-xl font-medium text-text mb-4">El Peón - Tu Infantería</h3>
                <p className="text-textMuted text-sm leading-relaxed mb-3">
                  Los Peones se mueven hacia adelante una casilla. En su primer movimiento pueden avanzar dos. 
                  Capturan en diagonal. Son la base de tu estrategia.
                </p>
                <p className="text-textMuted text-sm leading-relaxed">
                  <strong>Movimiento:</strong> Una casilla hacia adelante, captura en diagonal
                </p>
              </div>
            </div>
          </section>

          {/* Objetivo del Juego */}
          <section className="space-y-6">
            <h2 className="text-3xl font-light text-[#ec4d58] flex items-center space-x-3">
              <Target className="w-8 h-8" />
              <span>El Objetivo de la Guerra</span>
            </h2>
            
            <div className="bg-accent p-6 rounded-lg border border-board-border">
              <h3 className="text-xl font-medium text-text mb-4">Jaque Mate - La Victoria Total</h3>
              <p className="text-textMuted text-sm leading-relaxed mb-4">
                El objetivo es dar jaque mate al Rey enemigo. Esto ocurre cuando el Rey está bajo ataque 
                y no puede escapar, ser protegido o el ataque ser bloqueado.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ec4d58] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-textMuted text-sm leading-relaxed">
                    <strong>Jaque:</strong> Cuando el Rey está bajo ataque directo
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ec4d58] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-textMuted text-sm leading-relaxed">
                    <strong>Jaque Mate:</strong> Cuando el Rey está en jaque y no puede escapar
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ec4d58] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-textMuted text-sm leading-relaxed">
                    <strong>Ahogado:</strong> Cuando el Rey no está en jaque pero no puede hacer movimientos legales
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Tácticas Básicas */}
          <section className="space-y-6">
            <h2 className="text-3xl font-light text-[#ec4d58] flex items-center space-x-3">
              <Zap className="w-8 h-8" />
              <span>Artes Tácticas del Sith</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-accent p-6 rounded-lg border border-board-border">
                <h3 className="text-xl font-medium text-text mb-4">El Enroque</h3>
                <p className="text-textMuted text-sm leading-relaxed mb-3">
                  Un movimiento especial que protege al Rey y desarrolla la Torre. El Rey se mueve dos casillas 
                  hacia la Torre, y la Torre se coloca al lado del Rey.
                </p>
                <p className="text-textMuted text-sm leading-relaxed">
                  <strong>Condiciones:</strong> Rey y Torre no han movido, no hay piezas entre ellos, Rey no está en jaque
                </p>
              </div>

              <div className="bg-accent p-6 rounded-lg border border-board-border">
                <h3 className="text-xl font-medium text-text mb-4">Captura al Paso</h3>
                <p className="text-textMuted text-sm leading-relaxed mb-3">
                  Cuando un peón avanza dos casillas y pasa junto a un peón enemigo, este puede capturarlo 
                  como si hubiera avanzado solo una casilla.
                </p>
                <p className="text-textMuted text-sm leading-relaxed">
                  <strong>Condición:</strong> Solo se puede hacer en el movimiento inmediatamente siguiente
                </p>
              </div>

              <div className="bg-accent p-6 rounded-lg border border-board-border">
                <h3 className="text-xl font-medium text-text mb-4">Promoción de Peones</h3>
                <p className="text-textMuted text-sm leading-relaxed mb-3">
                  Cuando un peón llega a la última fila, puede ser promovido a Reina, Torre, Alfil o Caballo. 
                  La Reina es la elección más común por su poder.
                </p>
                <p className="text-textMuted text-sm leading-relaxed">
                  <strong>Estrategia:</strong> Los peones promovidos pueden cambiar el curso de la batalla
                </p>
              </div>

              <div className="bg-accent p-6 rounded-lg border border-board-border">
                <h3 className="text-xl font-medium text-text mb-4">Jaque Perpetuo</h3>
                <p className="text-textMuted text-sm leading-relaxed mb-3">
                  Una táctica donde se da jaque repetidamente sin posibilidad de escape. 
                  Puede forzar un empate por repetición.
                </p>
                <p className="text-textMuted text-sm leading-relaxed">
                  <strong>Uso:</strong> Útil para salvar una posición perdida
                </p>
              </div>
            </div>
          </section>

          {/* Consejos del Maestro */}
          <section className="space-y-6">
            <h2 className="text-3xl font-light text-[#ec4d58] flex items-center space-x-3">
              <BookOpen className="w-8 h-8" />
              <span>Consejos del Maestro Sith</span>
            </h2>
            
            <div className="bg-accent p-6 rounded-lg border border-board-border">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ec4d58] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-textMuted text-sm leading-relaxed">
                    <strong>Piensa antes de mover:</strong> Siempre considera la respuesta de tu oponente antes de hacer tu movimiento.
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ec4d58] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-textMuted text-sm leading-relaxed">
                    <strong>Controla el centro:</strong> Las casillas centrales son el corazón del tablero. Domínalas.
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ec4d58] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-textMuted text-sm leading-relaxed">
                    <strong>Desarrolla tus piezas:</strong> No muevas el mismo peón múltiples veces en la apertura.
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ec4d58] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-textMuted text-sm leading-relaxed">
                    <strong>Protege tu Rey:</strong> El enroque temprano es fundamental para la seguridad de tu monarca.
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ec4d58] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-textMuted text-sm leading-relaxed">
                    <strong>Valora las piezas:</strong> Peón = 1, Caballo/Alfil = 3, Torre = 5, Reina = 9, Rey = ∞
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Tu Progreso */}
          <section className="space-y-6">
            <h2 className="text-3xl font-light text-[#ec4d58] flex items-center space-x-3">
              <Trophy className="w-8 h-8" />
              <span>Tu Camino hacia la Maestría</span>
            </h2>
            
            <div className="bg-accent p-6 rounded-lg border border-board-border">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="text-lg font-medium text-text mb-2">Principiante</h3>
                  <p className="text-textMuted text-sm leading-relaxed">
                    Aprende las reglas básicas, practica movimientos y familiarízate con el tablero.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-text mb-2">Intermedio</h3>
                  <p className="text-textMuted text-sm leading-relaxed">
                    Domina tácticas básicas, estudia aperturas y mejora tu visión del juego.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-text mb-2">Avanzado</h3>
                  <p className="text-textMuted text-sm leading-relaxed">
                    Desarrolla estrategias complejas, analiza partidas y perfecciona tu técnica.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <div className="text-center py-8">
            <Link
              href="/chess"
              className="inline-flex items-center px-8 py-4 bg-[#ec4d58] hover:bg-[#d13d48] text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <Users className="w-5 h-5 mr-2" />
              Comenzar a Jugar
            </Link>
            <p className="text-textMuted mt-4">
              La teoría es importante, pero la práctica es la que te convierte en un verdadero maestro
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
