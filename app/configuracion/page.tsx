'use client'

import { useState } from 'react'
import { Settings, User, Palette, Gamepad2, Shield, Bell } from 'lucide-react'
import { Sidebar } from '@/components/Sidebar'

export default function ConfiguracionPage() {
  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'apariencia', label: 'Apariencia', icon: Palette },
    { id: 'juego', label: 'Juego', icon: Gamepad2 },
    { id: 'privacidad', label: 'Privacidad', icon: Shield },
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-light text-[#ec4d58]">Configuración General</h2>
            
            <div className="space-y-4">
              <div className="bg-accent p-4 rounded-lg border border-board-border">
                <h3 className="text-lg font-medium text-text mb-3">Cuenta</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-textMuted">Nombre de usuario:</span>
                    <span className="text-text">JugadorSith</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-textMuted">Nivel actual:</span>
                    <span className="text-text">Principiante</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-textMuted">Partidas jugadas:</span>
                    <span className="text-text">0</span>
                  </div>
                </div>
              </div>

              <div className="bg-accent p-4 rounded-lg border border-board-border">
                <h3 className="text-lg font-medium text-text mb-3">Sistema</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-textMuted">Auto-guardado:</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-board-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ec4d58]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-textMuted">Sonidos:</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-board-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ec4d58]"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'apariencia':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-light text-[#ec4d58]">Apariencia</h2>
            
            <div className="space-y-4">
              <div className="bg-accent p-4 rounded-lg border border-board-border">
                <h3 className="text-lg font-medium text-text mb-3">Tema</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input type="radio" name="theme" id="dark" defaultChecked />
                    <label htmlFor="dark" className="text-text">Oscuro (Sith)</label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input type="radio" name="theme" id="light" />
                    <label htmlFor="light" className="text-text">Claro (Jedi)</label>
                  </div>
                </div>
              </div>

              <div className="bg-accent p-4 rounded-lg border border-board-border">
                <h3 className="text-lg font-medium text-text mb-3">Colores de Piezas</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-textMuted">Estilo de piezas:</span>
                    <select className="bg-secondary text-text px-3 py-1 rounded border border-board-border">
                      <option>Clásico</option>
                      <option>Moderno</option>
                      <option>Sith</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'juego':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-light text-[#ec4d58]">Configuración del Juego</h2>
            
            <div className="space-y-4">
              <div className="bg-accent p-4 rounded-lg border border-board-border">
                <h3 className="text-lg font-medium text-text mb-3">Nivel de IA</h3>
                <div className="space-y-3">
                  <select className="w-full bg-secondary text-text px-3 py-2 rounded border border-board-border">
                    <option>Iniciado</option>
                    <option>Acólito</option>
                    <option>Warrior</option>
                    <option>Lord</option>
                    <option>Darth</option>
                    <option>Maestro</option>
                  </select>
                  <p className="text-textMuted text-sm">
                    Elige el nivel de dificultad de tu oponente IA
                  </p>
                </div>
              </div>

              <div className="bg-accent p-4 rounded-lg border border-board-border">
                <h3 className="text-lg font-medium text-text mb-3">Tiempo de Movimiento</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-textMuted">Límite de tiempo:</span>
                    <select className="bg-secondary text-text px-3 py-1 rounded border border-board-border">
                      <option>Sin límite</option>
                      <option>1 minuto</option>
                      <option>3 minutos</option>
                      <option>5 minutos</option>
                      <option>10 minutos</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-accent p-4 rounded-lg border border-board-border">
                <h3 className="text-lg font-medium text-text mb-3">Visualización</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-textMuted">Mostrar movimientos válidos:</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-board-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ec4d58]"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'privacidad':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-light text-[#ec4d58]">Privacidad</h2>
            
            <div className="space-y-4">
              <div className="bg-accent p-4 rounded-lg border border-board-border">
                <h3 className="text-lg font-medium text-text mb-3">Perfil</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-textMuted">Perfil público:</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-board-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ec4d58]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-textMuted">Historial de partidas:</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-board-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ec4d58]"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'notificaciones':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-light text-[#ec4d58]">Notificaciones</h2>
            
            <div className="space-y-4">
              <div className="bg-accent p-4 rounded-lg border border-board-border">
                <h3 className="text-lg font-medium text-text mb-3">Tipos de Notificación</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-textMuted">Notificaciones push:</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-board-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ec4d58]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-textMuted">Recordatorios de juego:</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-board-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ec4d58]"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-primary text-text flex">
      <Sidebar onNewGame={() => {}} />
      <div className="flex-1">
        {/* Navegación por pestañas */}
        <div className="bg-secondary border-b border-board-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-[#ec4d58] border-b-2 border-[#ec4d58] bg-primary'
                      : 'text-textMuted hover:text-text hover:bg-accent'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

        {/* Contenido principal */}
        <div className="max-w-4xl mx-auto p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
