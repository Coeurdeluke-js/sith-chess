'use client'

import { Sidebar } from '@/components/Sidebar'
import { Downbar } from '@/components/Downbar'

export default function AyudaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-primary">
      <Sidebar onNewGame={() => {}} />
      <main className="flex-1 overflow-auto pb-32 md:pb-0">
        {children}
      </main>
      <Downbar onNewGame={() => {}} />
    </div>
  )
}
