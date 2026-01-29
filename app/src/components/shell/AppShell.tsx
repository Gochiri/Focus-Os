'use client'

import { useState, ReactNode } from 'react'
import { Menu, X } from 'lucide-react'
import { MainNav } from './MainNav'
import { UserMenu, User } from './UserMenu'
import { CoachButton } from './CoachButton'

export interface AppShellProps {
  children: ReactNode
  user?: User
  coachUnreadCount?: number
  onLogout?: () => void
  onOpenCoach?: () => void
}

const defaultUser: User = {
  id: '1',
  name: 'Demo User',
  email: 'demo@focusai.app',
}

export function AppShell({
  children,
  user = defaultUser,
  coachUnreadCount = 0,
  onLogout,
  onOpenCoach,
}: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-slate-200
          transform transition-transform duration-200 ease-in-out
          lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200">
            <h1 className="text-xl font-bold text-violet-600" style={{ fontFamily: 'var(--font-heading)' }}>
              FocusAI
            </h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <MainNav />
          </div>

          {/* User menu */}
          <UserMenu user={user} onLogout={onLogout} />
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex items-center gap-4 px-4 py-3 bg-white border-b border-slate-200 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-lg font-bold text-violet-600" style={{ fontFamily: 'var(--font-heading)' }}>
            FocusAI
          </h1>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>

      {/* Floating coach button */}
      <CoachButton unreadCount={coachUnreadCount} onClick={onOpenCoach} />
    </div>
  )
}
