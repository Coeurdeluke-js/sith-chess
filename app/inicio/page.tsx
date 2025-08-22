'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Shield, Gamepad2, BookOpen, Users } from 'lucide-react'

export default function InicioPage() {
  const [activeTab, setActiveTab] = useState('bienvenida')

  const tabs = [
    { id: 'bienvenida', label: 'Bienvenida', icon: Shield },
    { id: 'ajedrez', label: 'Ajedrez', icon: Gamepad2 },
    { id: 'aprendizaje', label: 'Aprendizaje', icon: BookOpen },
    { id: 'comunidad', label: 'Comunidad', icon: Users }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'bienvenida':
        return (
          <div className="space-y-12">
            <div className="text-center space-y-4 md:space-y-6">
              <h1 className="text-3xl md:text-5xl font-light text-[#ec4d58] leading-tight px-2">
                El Arte del Ajedrez
              </h1>
              <p className="text-base md:text-xl text-textMuted max-w-2xl mx-auto leading-relaxed font-light px-4">
                Desarrolla tu mente estratégica a través del juego más noble. 
                Cada partida es una lección de paciencia, precisión y dominio.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto px-4">
              <div className="text-center space-y-3 md:space-y-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-accent rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6 md:w-8 md:h-8 text-[#ec4d58]" />
                </div>
                <h3 className="text-base md:text-lg font-medium text-text">Estrategia</h3>
                <p className="text-textMuted text-xs md:text-sm leading-relaxed">
                  Planifica múltiples movimientos adelante y desarrolla tu visión táctica.
                </p>
              </div>

              <div className="text-center space-y-3 md:space-y-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-accent rounded-full flex items-center justify-center mx-auto">
                  <Gamepad2 className="w-6 h-6 md:w-8 md:h-8 text-[#ec4d58]" />
                </div>
                <h3 className="text-base md:text-lg font-medium text-text">Concentración</h3>
                <p className="text-textMuted text-xs md:text-sm leading-relaxed">
                  Mantén tu mente enfocada y controla tus emociones bajo presión.
                </p>
              </div>

              <div className="text-center space-y-3 md:space-y-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-accent rounded-full flex items-center justify-center mx-auto">
                  <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-[#ec4d58]" />
                </div>
                <h3 className="text-base md:text-lg font-medium text-text">Sabiduría</h3>
                <p className="text-textMuted text-xs md:text-sm leading-relaxed">
                  Aprende de cada partida y construye tu conocimiento paso a paso.
                </p>
              </div>
            </div>

            <div className="text-center px-4">
              <Link
                href="/chess"
                className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-[#ec4d58] hover:bg-[#d13d48] text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
              >
                <Gamepad2 className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Comenzar Partida
              </Link>
            </div>
          </div>
        )

      case 'ajedrez':
        return (
          <div className="space-y-8 text-center">
            <h2 className="text-4xl font-light text-[#ec4d58]">El Juego de Reyes</h2>
            <p className="text-textMuted max-w-2xl mx-auto text-lg leading-relaxed">
              El ajedrez es más que un juego. Es un arte que entrena tu mente para pensar estratégicamente, 
              analizar situaciones complejas y tomar decisiones informadas.
            </p>
            <div className="bg-accent p-6 rounded-lg border border-board-border max-w-2xl mx-auto">
              <p className="text-text text-lg font-light italic">
                "El ajedrez es la gimnasia de la mente"
              </p>
            </div>
            <Link
              href="/chess"
              className="inline-flex items-center px-6 py-3 bg-[#ec4d58] hover:bg-[#d13d48] text-white font-medium rounded-lg transition-all duration-300"
            >
              <Gamepad2 className="w-5 h-5 mr-2" />
              Jugar Ahora
            </Link>
          </div>
        )

      case 'aprendizaje':
        return (
          <div className="space-y-8 text-center">
            <h2 className="text-4xl font-light text-[#ec4d58]">Aprende y Mejora</h2>
            <p className="text-textMuted max-w-2xl mx-auto text-lg leading-relaxed">
              Domina los fundamentos, estudia las aperturas clásicas y desarrolla tu repertorio de tácticas.
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="bg-accent p-6 rounded-lg border border-board-border text-left">
                <h3 className="text-lg font-medium text-text mb-3">Para Principiantes</h3>
                <ul className="text-textMuted text-sm space-y-2">
                  <li>• Reglas básicas del juego</li>
                  <li>• Movimientos de las piezas</li>
                  <li>• Conceptos de apertura</li>
                  <li>• Tácticas elementales</li>
                </ul>
              </div>
              <div className="bg-accent p-6 rounded-lg border border-board-border text-left">
                <h3 className="text-lg font-medium text-text mb-3">Para Avanzados</h3>
                <ul className="text-textMuted text-sm space-y-2">
                  <li>• Estrategias complejas</li>
                  <li>• Finales técnicos</li>
                  <li>• Análisis de partidas</li>
                  <li>• Psicología del juego</li>
                </ul>
              </div>
            </div>
            <Link
              href="/ayuda"
              className="inline-flex items-center px-6 py-3 bg-accent hover:bg-board-highlight text-text font-medium rounded-lg transition-all duration-300"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Ver Tutorial
            </Link>
          </div>
        )

      case 'comunidad':
        return (
          <div className="space-y-8 text-center">
            <h2 className="text-4xl font-light text-[#ec4d58]">Únete a la Comunidad</h2>
            <p className="text-textMuted max-w-2xl mx-auto text-lg leading-relaxed">
              Comparte partidas, discute estrategias y aprende de otros jugadores apasionados por el ajedrez.
            </p>
            <div className="bg-accent p-6 rounded-lg border border-board-border max-w-md mx-auto">
              <p className="text-text text-lg font-light">
                "El ajedrez une a las personas a través de la pasión por el juego"
              </p>
            </div>
            <div className="text-textMuted">
              <p>Próximamente: Foros, torneos y eventos en vivo</p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-primary text-text overflow-x-hidden">
      <div className="flex-1">
        {/* Navegación por pestañas */}
        <div className="bg-secondary border-b border-board-border">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap space-x-1 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-1 md:space-x-2 px-3 md:px-6 py-3 md:py-4 transition-all duration-300 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-[#ec4d58] border-b-2 border-[#ec4d58] bg-primary'
                        : 'text-textMuted hover:text-text hover:bg-accent'
                    }`}
                  >
                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="font-medium text-sm md:text-base">{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
