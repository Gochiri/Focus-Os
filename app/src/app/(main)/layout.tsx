'use client'

import { AppShell } from '@/components/shell'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppShell
      coachUnreadCount={2}
      onOpenCoach={() => console.log('Open coach')}
    >
      {children}
    </AppShell>
  )
}
