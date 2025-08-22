'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface LogoTransitionContextType {
  showLogoTransition: boolean
  startLogoTransition: () => void
  stopLogoTransition: () => void
}

const LogoTransitionContext = createContext<LogoTransitionContextType | undefined>(undefined)

export const useLogoTransition = () => {
  const context = useContext(LogoTransitionContext)
  if (context === undefined) {
    throw new Error('useLogoTransition must be used within a LogoTransitionProvider')
  }
  return context
}

interface LogoTransitionProviderProps {
  children: ReactNode
}

export const LogoTransitionProvider = ({ children }: LogoTransitionProviderProps) => {
  const [showLogoTransition, setShowLogoTransition] = useState(false)

  const startLogoTransition = () => {
    setShowLogoTransition(true)
  }

  const stopLogoTransition = () => {
    setShowLogoTransition(false)
  }

  return (
    <LogoTransitionContext.Provider value={{
      showLogoTransition,
      startLogoTransition,
      stopLogoTransition
    }}>
      {children}
    </LogoTransitionContext.Provider>
  )
}
