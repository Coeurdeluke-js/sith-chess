'use client'

import { useState } from 'react'
import { DifficultySelector } from '@/components/DifficultySelector'
import { useGame } from '@/contexts/GameContext'
import { Settings, Monitor, Gamepad2, Shield, Bell, User } from 'lucide-react'
import Image from 'next/image'
import { difficultyLevels } from '@/lib/difficultyLevels'

export default function ConfiguracionPage() {
  const { selectedDifficulty, setDifficulty } = useGame()
  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { id: 'emblemas', label: 'Emblemas', icon: User },
    { id: 'juego', label: 'Juego', icon: Gamepad2 },
    { id: 'apariencia', label: 'Apariencia', icon: Monitor },
    { id: 'general', label: 'General', icon: Settings }
  ]

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-light text-[#ec4d58] mb-8">Sistema de Emblemas Crypto Force</h1>
        <p className="text-textMuted text-lg mb-8 text-center max-w-2xl mx-auto">
          Configura tu arquetipo personal y ajusta los parámetros de tu viaje de individuación en el ajedrez Sith
        </p>

        {/* Pestañas */}
        <div className="flex space-x-1 mb-8 bg-secondary rounded-lg p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#ec4d58] text-white'
                    : 'text-textMuted hover:text-text hover:bg-accent'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Contenido de las pestañas */}
        <div className="bg-secondary rounded-lg border border-board-border p-6">
          {activeTab === 'emblemas' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-text mb-4">Tu Arquetipo Personal</h2>
              <p className="text-textMuted mb-6">
                Cada emblema representa una etapa en tu viaje de individuación. Selecciona el que mejor refleje tu estado actual de desarrollo interior.
              </p>
              
              {/* Selector de Dificultad */}
              <DifficultySelector
                selectedDifficulty={selectedDifficulty}
                onDifficultyChange={setDifficulty}
                className="mb-6"
              />

              <div className="bg-accent rounded-lg p-4 border border-board-border">
                <h3 className="text-text font-semibold mb-3">Sobre el Sistema de Emblemas</h3>
                <div className="text-sm text-textMuted space-y-2">
                  <p>
                    Este sistema combina la <strong>estética Sith de Star Wars</strong> con los principios de la <strong>psicología analítica de Carl Gustav Jung</strong>, 
                    representando el proceso de individuación de cada participante.
                  </p>
                  <p>
                    Cada emblema funciona como un <strong>arquetipo visual y simbólico</strong>, reflejando la etapa del viaje interior de quien lo porta. 
                    La complejidad del diseño aumenta progresivamente con cada nivel, siguiendo la evolución de la integración psíquica y del dominio personal.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-text mb-4">Configuración del Sistema</h2>
              <p className="text-textMuted mb-6">
                Ajustes básicos del sistema y preferencias de localización.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Idioma
                    </label>
                    <select className="w-full bg-accent border border-board-border rounded-md px-3 py-2 text-text">
                      <option value="es">Español</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Región
                    </label>
                    <select className="w-full bg-accent border border-board-border rounded-md px-3 py-2 text-text">
                      <option value="es">España</option>
                      <option value="mx">México</option>
                      <option value="ar">Argentina</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Zona Horaria
                    </label>
                    <select className="w-full bg-accent border border-board-border rounded-md px-3 py-2 text-text">
                      <option value="utc-5">UTC-5 (EST)</option>
                      <option value="utc-6">UTC-6 (CST)</option>
                      <option value="utc-8">UTC-8 (PST)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Formato de Fecha
                    </label>
                    <select className="w-full bg-accent border border-board-border rounded-md px-3 py-2 text-text">
                      <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                      <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                      <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'apariencia' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-text mb-4">Estética Sith</h2>
              <p className="text-textMuted mb-6">
                Personaliza la apariencia visual para que refleje tu arquetipo y preferencias estéticas.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Tema
                    </label>
                    <select className="w-full bg-accent border border-board-border rounded-md px-3 py-2 text-text">
                      <option value="dark">Oscuro (Sith)</option>
                      <option value="light">Claro</option>
                      <option value="auto">Automático</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Tamaño de Fuente
                    </label>
                    <select className="w-full bg-accent border border-board-border rounded-md px-3 py-2 text-text">
                      <option value="small">Pequeño</option>
                      <option value="medium">Mediano</option>
                      <option value="large">Grande</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Animaciones
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm text-text">Habilitar animaciones</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm text-text">Efectos de transición</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'juego' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-text mb-4">Configuración del Juego</h2>
              
              {/* Arquetipo Actual */}
              <div className="bg-accent rounded-lg p-4 border border-board-border mb-6">
                <h3 className="text-text font-semibold mb-3">Tu Arquetipo Actual</h3>
                <div className="flex items-center space-x-4">
                  <div className="relative w-12 h-12">
                    <div 
                      className="absolute inset-0 rounded-full opacity-20 animate-pulse"
                      style={{ 
                        backgroundColor: difficultyLevels.find(l => l.id === selectedDifficulty)?.color || '#ec4d58',
                        boxShadow: `0 0 15px ${difficultyLevels.find(l => l.id === selectedDifficulty)?.color || '#ec4d58'}40`
                      }}
                    ></div>
                    <Image
                      src={difficultyLevels.find(l => l.id === selectedDifficulty)?.insignia || '/insignias/1-iniciados.png'}
                      alt="Emblema actual"
                      width={48}
                      height={48}
                      className="object-contain relative z-10"
                    />
                  </div>
                  <div>
                    <h4 
                      className="text-lg font-bold"
                      style={{ color: difficultyLevels.find(l => l.id === selectedDifficulty)?.color || '#ec4d58' }}
                    >
                      {difficultyLevels.find(l => l.id === selectedDifficulty)?.name || 'Iniciado'}
                    </h4>
                    <p className="text-sm text-textMuted">
                      {difficultyLevels.find(l => l.id === selectedDifficulty)?.description || 'Descripción del arquetipo'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Sonidos del Juego
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm text-text">Efectos de sonido</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm text-text">Música de fondo</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Confirmación de Movimientos
                    </label>
                    <select className="w-full bg-accent border border-board-border rounded-md px-3 py-2 text-text">
                      <option value="always">Siempre</option>
                      <option value="captures">Solo capturas</option>
                      <option value="never">Nunca</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Mostrar Movimientos Válidos
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm text-text">Al seleccionar pieza</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-text">Siempre visibles</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Notación de Movimientos
                    </label>
                    <select className="w-full bg-accent border border-board-border rounded-md px-3 py-2 text-text">
                      <option value="algebraic">Algebraica</option>
                      <option value="descriptive">Descriptiva</option>
                      <option value="figurine">Figurine</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacidad' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-text mb-4">Privacidad y Seguridad</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Visibilidad del Perfil
                    </label>
                    <select className="w-full bg-accent border border-board-border rounded-md px-3 py-2 text-text">
                      <option value="public">Público</option>
                      <option value="friends">Solo amigos</option>
                      <option value="private">Privado</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Historial de Partidas
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm text-text">Guardar partidas</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-text">Compartir automáticamente</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Notificaciones de Estado
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm text-text">Mostrar cuando estoy en línea</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-text">Mostrar partida actual</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notificaciones' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-text mb-4">Notificaciones</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Notificaciones de Juego
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm text-text">Invitaciones a partidas</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm text-text">Turno pendiente</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-text">Resultados de partidas</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Notificaciones del Sistema
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm text-text">Actualizaciones</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-text">Novedades</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-text">Mantenimiento</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
