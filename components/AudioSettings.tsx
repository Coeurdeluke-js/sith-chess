'use client'

import { Volume2, VolumeX, Music, Clock, MousePointer } from 'lucide-react'
import { useAudioContext } from '@/contexts/AudioContext'

export const AudioSettings = () => {
  const { 
    settings, 
    toggleSound, 
    setVolume, 
    toggleMoveSounds, 
    toggleTimerSounds, 
    toggleUISounds 
  } = useAudioContext()

  return (
    <div className="bg-secondary rounded-lg border border-board-border p-6">
      <h3 className="text-xl font-semibold text-text mb-6 flex items-center">
        {settings.enabled ? (
          <Volume2 className="w-6 h-6 mr-3 text-[#ec4d58]" />
        ) : (
          <VolumeX className="w-6 h-6 mr-3 text-[#ec4d58]" />
        )}
        Configuración de Audio
      </h3>

      {/* Control principal de audio */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-text font-medium">Sonido General</span>
          <button
            onClick={toggleSound}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              settings.enabled
                ? 'bg-[#ec4d58] text-white hover:bg-[#d13d48]'
                : 'bg-accent text-textMuted hover:text-text hover:bg-board-highlight'
            }`}
          >
            {settings.enabled ? 'Activado' : 'Desactivado'}
          </button>
        </div>

        {/* Control de volumen */}
        {settings.enabled && (
          <div className="mb-4">
            <label className="block text-textMuted text-sm mb-2">
              Volumen: {Math.round(settings.volume * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-2 bg-accent rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        )}
      </div>

      {/* Controles específicos */}
      {settings.enabled && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
            <div className="flex items-center">
              <Music className="w-5 h-5 mr-3 text-[#ec4d58]" />
              <span className="text-text">Sonidos de Movimientos</span>
            </div>
            <button
              onClick={toggleMoveSounds}
              className={`px-3 py-1 rounded text-sm font-medium transition-all duration-300 ${
                settings.moveSounds
                  ? 'bg-[#ec4d58] text-white'
                  : 'bg-board-border text-textMuted hover:text-text'
              }`}
            >
              {settings.moveSounds ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-3 text-[#ec4d58]" />
              <span className="text-text">Alertas de Timer</span>
            </div>
            <button
              onClick={toggleTimerSounds}
              className={`px-3 py-1 rounded text-sm font-medium transition-all duration-300 ${
                settings.timerSounds
                  ? 'bg-[#ec4d58] text-white'
                  : 'bg-board-border text-textMuted hover:text-text'
              }`}
            >
              {settings.timerSounds ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
            <div className="flex items-center">
              <MousePointer className="w-5 h-5 mr-3 text-[#ec4d58]" />
              <span className="text-text">Sonidos de Interfaz</span>
            </div>
            <button
              onClick={toggleUISounds}
              className={`px-3 py-1 rounded text-sm font-medium transition-all duration-300 ${
                settings.uiSounds
                  ? 'bg-[#ec4d58] text-white'
                  : 'bg-board-border text-textMuted hover:text-text'
              }`}
            >
              {settings.uiSounds ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      )}

      {/* Información adicional */}
      <div className="mt-6 p-4 bg-accent rounded-lg">
        <h4 className="text-text font-medium mb-2">Tipos de Sonidos</h4>
        <ul className="text-textMuted text-sm space-y-1">
          <li>• <strong>Movimientos:</strong> Sonidos de piezas moviéndose y capturas</li>
          <li>• <strong>Timer:</strong> Alertas a 30s y 10s, y cuando se agota el tiempo</li>
          <li>• <strong>Interfaz:</strong> Selección de piezas y clics en botones</li>
        </ul>
      </div>
    </div>
  )
}
