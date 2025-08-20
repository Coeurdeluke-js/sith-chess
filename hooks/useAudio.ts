import { useCallback, useRef, useEffect } from 'react'

interface AudioConfig {
  volume?: number
  loop?: boolean
  preload?: boolean
}

export const useAudio = (src: string, config: AudioConfig = {}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  // Configuración por defecto
  const {
    volume = 0.4,
    loop = false,
    preload = false
  } = config

  // Crear elemento de audio
  useEffect(() => {
    const audio = new Audio(src)
    audio.volume = volume
    audio.loop = loop
    audio.preload = preload ? 'auto' : 'none'
    audioRef.current = audio

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [src, volume, loop, preload])

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(error => {
        console.warn('Error playing audio:', error)
      })
    }
  }, [])

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }, [])

  const setVolume = useCallback((newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, newVolume))
    }
  }, [])

  return { play, stop, setVolume, audioRef }
}
