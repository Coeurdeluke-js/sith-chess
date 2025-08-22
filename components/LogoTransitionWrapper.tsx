'use client'

import { useLogoTransition } from '@/contexts/LogoTransitionContext'
import { LogoTransition } from './LogoTransition'

export const LogoTransitionWrapper = () => {
  const { showLogoTransition, stopLogoTransition } = useLogoTransition()

  return (
    <LogoTransition 
      isVisible={showLogoTransition} 
      onComplete={stopLogoTransition} 
    />
  )
}
