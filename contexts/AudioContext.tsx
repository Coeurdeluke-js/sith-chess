'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useAudio } from '@/hooks/useAudio'

interface AudioSettings {
  enabled: boolean
  volume: number
  moveSounds: boolean
  timerSounds: boolean
  uiSounds: boolean
}

interface AudioContextType {
  // Funciones de reproducción
  playMove: () => void
  playCapture: () => void
  playCheck: () => void
  playCheckmate: () => void
  playTimerWarning: () => void
  playTimerCritical: () => void
  playTimeUp: () => void
  playPieceSelect: () => void
  playButtonClick: () => void
  playGameStart: () => void
  
  // Configuración
  settings: AudioSettings
  toggleSound: () => void
  setVolume: (volume: number) => void
  toggleMoveSounds: () => void
  toggleTimerSounds: () => void
  toggleUISounds: () => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AudioSettings>(() => {
    // Cargar configuración desde localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chess-audio-settings')
      if (saved) {
        return JSON.parse(saved)
      }
    }
    return {
      enabled: true,
      volume: 0.4,
      moveSounds: true,
      timerSounds: true,
      uiSounds: false
    }
  })

  // Hooks de audio para cada tipo de sonido
  const moveAudio = useAudio('/sounds/moves/piece-move.mp3', { volume: settings.volume, preload: true })
  const captureAudio = useAudio('/sounds/moves/capture.mp3', { volume: settings.volume, preload: true })
  const checkAudio = useAudio('/sounds/moves/check.mp3', { volume: settings.volume, preload: true })
  const checkmateAudio = useAudio('/sounds/moves/checkmate.mp3', { volume: settings.volume, preload: true })
  const timerWarningAudio = useAudio('/sounds/timer/warning.mp3', { volume: settings.volume, preload: true })
  const timerCriticalAudio = useAudio('/sounds/timer/critical.mp3', { volume: settings.volume, preload: true })
  const timeUpAudio = useAudio('/sounds/timer/time-up.mp3', { volume: settings.volume, preload: true })
  const pieceSelectAudio = useAudio('/sounds/ui/piece-select.mp3', { volume: settings.volume * 0.7, preload: false })
  const buttonClickAudio = useAudio('/sounds/ui/button-click.mp3', { volume: settings.volume * 0.5, preload: false })
  const gameStartAudio = useAudio('/sounds/ui/game-start.mp3', { volume: settings.volume, preload: false })

  // Actualizar volumen de todos los audios cuando cambie la configuración
  useEffect(() => {
    const audios = [
      moveAudio, captureAudio, checkAudio, checkmateAudio,
      timerWarningAudio, timerCriticalAudio, timeUpAudio,
      pieceSelectAudio, buttonClickAudio, gameStartAudio
    ]
    
    audios.forEach(audio => audio.setVolume(settings.volume))
  }, [settings.volume, moveAudio, captureAudio, checkAudio, checkmateAudio, 
      timerWarningAudio, timerCriticalAudio, timeUpAudio, pieceSelectAudio, 
      buttonClickAudio, gameStartAudio])

  // Guardar configuración en localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chess-audio-settings', JSON.stringify(settings))
    }
  }, [settings])

  // Funciones de reproducción con verificación de configuración
  const playMove = useCallback(() => {
    if (settings.enabled && settings.moveSounds) {
      moveAudio.play()
    }
  }, [settings.enabled, settings.moveSounds, moveAudio])

  const playCapture = useCallback(() => {
    if (settings.enabled && settings.moveSounds) {
      captureAudio.play()
    }
  }, [settings.enabled, settings.moveSounds, captureAudio])

  const playCheck = useCallback(() => {
    if (settings.enabled && settings.moveSounds) {
      checkAudio.play()
    }
  }, [settings.enabled, settings.moveSounds, checkAudio])

  const playCheckmate = useCallback(() => {
    if (settings.enabled && settings.moveSounds) {
      checkmateAudio.play()
    }
  }, [settings.enabled, settings.moveSounds, checkmateAudio])

  const playTimerWarning = useCallback(() => {
    if (settings.enabled && settings.timerSounds) {
      timerWarningAudio.play()
    }
  }, [settings.enabled, settings.timerSounds, timerWarningAudio])

  const playTimerCritical = useCallback(() => {
    if (settings.enabled && settings.timerSounds) {
      timerCriticalAudio.play()
    }
  }, [settings.enabled, settings.timerSounds, timerCriticalAudio])

  const playTimeUp = useCallback(() => {
    if (settings.enabled && settings.timerSounds) {
      timeUpAudio.play()
    }
  }, [settings.enabled, settings.timerSounds, timeUpAudio])

  const playPieceSelect = useCallback(() => {
    if (settings.enabled && settings.uiSounds) {
      pieceSelectAudio.play()
    }
  }, [settings.enabled, settings.uiSounds, pieceSelectAudio])

  const playButtonClick = useCallback(() => {
    if (settings.enabled && settings.uiSounds) {
      buttonClickAudio.play()
    }
  }, [settings.enabled, settings.uiSounds, buttonClickAudio])

  const playGameStart = useCallback(() => {
    if (settings.enabled && settings.uiSounds) {
      gameStartAudio.play()
    }
  }, [settings.enabled, settings.uiSounds, gameStartAudio])

  // Funciones de configuración
  const toggleSound = useCallback(() => {
    setSettings(prev => ({ ...prev, enabled: !prev.enabled }))
  }, [])

  const setVolume = useCallback((volume: number) => {
    setSettings(prev => ({ ...prev, volume: Math.max(0, Math.min(1, volume)) }))
  }, [])

  const toggleMoveSounds = useCallback(() => {
    setSettings(prev => ({ ...prev, moveSounds: !prev.moveSounds }))
  }, [])

  const toggleTimerSounds = useCallback(() => {
    setSettings(prev => ({ ...prev, timerSounds: !prev.timerSounds }))
  }, [])

  const toggleUISounds = useCallback(() => {
    setSettings(prev => ({ ...prev, uiSounds: !prev.uiSounds }))
  }, [])

  const value: AudioContextType = {
    playMove,
    playCapture,
    playCheck,
    playCheckmate,
    playTimerWarning,
    playTimerCritical,
    playTimeUp,
    playPieceSelect,
    playButtonClick,
    playGameStart,
    settings,
    toggleSound,
    setVolume,
    toggleMoveSounds,
    toggleTimerSounds,
    toggleUISounds
  }

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  )
}

export const useAudioContext = () => {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error('useAudioContext must be used within an AudioProvider')
  }
  return context
}
