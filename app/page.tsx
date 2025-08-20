'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirigir automáticamente a la página de inicio
    router.push('/inicio')
  }, [router])

  // Página de carga mientras se redirige
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#ec4d58] mx-auto mb-4"></div>
        <p className="text-text text-lg">Cargando...</p>
          </div>
    </div>
  )
} 