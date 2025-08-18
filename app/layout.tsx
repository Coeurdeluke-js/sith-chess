import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GameProvider } from '@/contexts/GameContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Crypto Force - Ajedrez',
  description: 'Desarrolla tu mente estratégica a través del ajedrez',
  icons: {
    icon: '/logo-sith-chess.ico',
    shortcut: '/logo-sith-chess.ico',
    apple: '/logo-sith-chess.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  )
} 