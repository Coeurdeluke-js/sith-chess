'use client'

import Link from 'next/link'
import { BookOpen, Target, Zap, Shield, Users, Trophy } from 'lucide-react'
import { ChessPieceMini } from '@/components/ChessPieceMini'

export default function AyudaPage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-[#ec4d58] mb-4">
            Academia Sith - Manual de Guerra
          </h1>
          <p className="text-textMuted text-lg">
            Domina el arte del ajedrez con la sabiduría de los Sith
          </p>
        </div>

        {/* Introducción */}
        <div className="bg-secondary rounded-lg border border-board-border p-8 mb-8">
          <h2 className="text-2xl font-semibold text-text mb-4 flex items-center">
            <BookOpen className="w-6 h-6 mr-3 text-[#ec4d58]" />
            Introducción al Arte de la Guerra
          </h2>
          <p className="text-textMuted leading-relaxed mb-4">
            El ajedrez es más que un simple juego. Es una batalla de mentes, una guerra de estrategias 
            donde cada movimiento puede cambiar el destino del tablero. Como aprendiz Sith, debes 
            comprender que la victoria no se logra solo con fuerza bruta, sino con inteligencia, 
            paciencia y visión táctica.
          </p>
          <p className="text-textMuted leading-relaxed">
            Este manual te guiará a través de los fundamentos del ajedrez, explicando cada pieza, 
            sus movimientos y las estrategias básicas que necesitas para convertirte en un verdadero 
            maestro del tablero.
          </p>
        </div>

        {/* Piezas del Ajedrez */}
        <div className="bg-secondary rounded-lg border border-board-border p-8 mb-8">
          <h2 className="text-2xl font-semibold text-text mb-6 flex items-center">
            <Target className="w-6 h-6 mr-3 text-[#ec4d58]" />
            Las Piezas del Ejército
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Rey */}
            <div className="bg-accent rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#ec4d58] mb-3 flex items-center">
                <ChessPieceMini type="k" color="w" size="md" />
                El Rey - Tu Comandante
              </h3>
              <p className="text-textMuted mb-3">
                El Rey es tu pieza más valiosa. Se mueve una casilla en cualquier dirección. Si el Rey cae, la batalla termina. Protégelo como si fuera tu vida.
              </p>
              <div className="text-sm text-textMuted">
                <strong>Movimiento:</strong> Una casilla en cualquier dirección (horizontal, vertical o diagonal)
              </div>
            </div>

            {/* Reina */}
            <div className="bg-accent rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#ec4d58] mb-3 flex items-center">
                <ChessPieceMini type="q" color="w" size="md" />
                La Reina - Tu Arma Más Poderosa
              </h3>
              <p className="text-textMuted mb-3">
                La Reina combina el poder de la Torre y el Alfil. Se mueve cualquier número de casillas en línea recta. Es tu pieza más versátil y letal.
              </p>
              <div className="text-sm text-textMuted">
                <strong>Movimiento:</strong> Cualquier número de casillas en línea recta
              </div>
            </div>

            {/* Torre */}
            <div className="bg-accent rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#ec4d58] mb-3 flex items-center">
                <ChessPieceMini type="r" color="w" size="md" />
                La Torre - Tu Fortaleza
              </h3>
              <p className="text-textMuted mb-3">
                La Torre se mueve en líneas rectas horizontales y verticales. Es excelente para controlar columnas y filas abiertas, y fundamental en los finales.
              </p>
              <div className="text-sm text-textMuted">
                <strong>Movimiento:</strong> Cualquier número de casillas horizontal o vertical
              </div>
            </div>

            {/* Alfil */}
            <div className="bg-accent rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#ec4d58] mb-3 flex items-center">
                <ChessPieceMini type="b" color="w" size="md" />
                El Alfil - Tu Arquero
              </h3>
              <p className="text-textMuted mb-3">
                El Alfil se mueve en diagonales. Controla casillas del mismo color durante toda la partida. Dos Alfiles trabajando juntos son una fuerza devastadora.
              </p>
              <div className="text-sm text-textMuted">
                <strong>Movimiento:</strong> Cualquier número de casillas en diagonal
              </div>
            </div>

            {/* Caballo */}
            <div className="bg-accent rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#ec4d58] mb-3 flex items-center">
                <ChessPieceMini type="n" color="w" size="md" />
                El Caballo - Tu Agilidad
              </h3>
              <p className="text-textMuted mb-3">
                El Caballo se mueve en forma de &quot;L&quot;: dos casillas en una dirección y una 
                perpendicular. Es la única pieza que puede saltar sobre otras.
              </p>
              <div className="text-sm text-textMuted">
                <strong>Movimiento:</strong> Dos casillas en una dirección, una perpendicular
              </div>
            </div>

            {/* Peón */}
            <div className="bg-accent rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#ec4d58] mb-3 flex items-center">
                <ChessPieceMini type="p" color="w" size="md" />
                El Peón - Tu Ejército
              </h3>
              <p className="text-textMuted mb-3">
                Los peones avanzan una casilla hacia adelante, pero capturan en diagonal. En su 
                primer movimiento pueden avanzar dos casillas. Al llegar al final del tablero, 
                pueden promocionarse.
              </p>
              <div className="text-sm text-textMuted">
                <strong>Movimiento:</strong> Una casilla hacia adelante, captura en diagonal
              </div>
            </div>
          </div>
        </div>

        {/* Objetivos */}
        <div className="bg-secondary rounded-lg border border-board-border p-8 mb-8">
          <h2 className="text-2xl font-semibold text-text mb-6 flex items-center">
            <Trophy className="w-6 h-6 mr-3 text-[#ec4d58]" />
            Los Objetivos de la Batalla
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-[#ec4d58] rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text mb-2">Jaque Mate</h3>
                <p className="text-textMuted">
                  El objetivo principal es dar jaque mate al Rey enemigo. Esto ocurre cuando el Rey 
                  está en jaque y no puede escapar de ninguna manera.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-[#ec4d58] rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text mb-2">Control del Centro</h3>
                <p className="text-textMuted">
                  Dominar las casillas centrales del tablero te da mayor movilidad y control sobre 
                  el juego. Las piezas en el centro tienen más opciones de movimiento.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-[#ec4d58] rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text mb-2">Desarrollo de Piezas</h3>
                <p className="text-textMuted">
                  Saca tus piezas de sus posiciones iniciales y colócalas en posiciones activas. 
                  Un desarrollo temprano te da ventaja táctica.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Estrategias Básicas */}
        <div className="bg-secondary rounded-lg border border-board-border p-8 mb-8">
          <h2 className="text-2xl font-semibold text-text mb-6 flex items-center">
            <Zap className="w-6 h-6 mr-3 text-[#ec4d58]" />
            Tácticas Sith Básicas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#ec4d58]">Apertura</h3>
              <ul className="text-textMuted space-y-2">
                <li>• Controla el centro con peones</li>
                <li>• Desarrolla caballos y alfiles</li>
                <li>• Enroca temprano para proteger al Rey</li>
                <li>• No muevas la Reina demasiado pronto</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#ec4d58]">Medio Juego</h3>
              <ul className="text-textMuted space-y-2">
                <li>• Busca oportunidades tácticas</li>
                <li>• Coordina tus piezas</li>
                <li>• Identifica debilidades enemigas</li>
                <li>• Mantén la iniciativa</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Consejos Rápidos */}
        <div className="bg-secondary rounded-lg border border-board-border p-8 mb-8">
          <h2 className="text-2xl font-semibold text-text mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-3 text-[#ec4d58]" />
            Consejos del Maestro Sith
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-accent rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-semibold text-text mb-2">Piensa Antes de Mover</h3>
              <p className="text-sm text-textMuted">
                Analiza cada movimiento y sus consecuencias. La paciencia es una virtud Sith.
              </p>
            </div>

            <div className="bg-accent rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold text-text mb-2">Aprovecha las Oportunidades</h3>
              <p className="text-sm text-textMuted">
                Cuando veas una debilidad, ataca sin piedad. La indecisión es tu enemigo.
              </p>
            </div>

            <div className="bg-accent rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="font-semibold text-text mb-2">Protege tu Rey</h3>
              <p className="text-sm text-textMuted">
                Tu Rey es tu vida. Manténlo seguro y bien defendido en todo momento.
              </p>
            </div>
          </div>
        </div>

        {/* Tu Progreso */}
        <div className="bg-secondary rounded-lg border border-board-border p-8">
          <h2 className="text-2xl font-semibold text-text mb-6 flex items-center">
            <Users className="w-6 h-6 mr-3 text-[#ec4d58]" />
            Tu Progreso en la Academia
          </h2>
          
          <div className="text-center">
            <p className="text-textMuted mb-6">
              Ahora que conoces los fundamentos, es hora de poner en práctica tu conocimiento. 
              Regresa al tablero y demuestra que tienes lo necesario para convertirte en un 
              verdadero maestro Sith del ajedrez.
            </p>
            
            <Link 
              href="/chess"
              className="inline-flex items-center px-6 py-3 bg-[#ec4d58] text-white rounded-lg hover:bg-[#d13d48] transition-colors duration-300"
            >
              <Target className="w-5 h-5 mr-2" />
              Comenzar Batalla
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
