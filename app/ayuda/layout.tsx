'use client'

import { Sidebar } from '@/components/Sidebar'

export default function AyudaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-primary">
      <Sidebar onNewGame={() => {}} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
