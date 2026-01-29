import { useState } from 'react'
import { Menu, X, Zap } from 'lucide-react'
import { MainNav, type NavigationItem } from './MainNav'
import { UserMenu, type User } from './UserMenu'
import { CoachButton } from './CoachButton'

export interface AppShellProps {
  children: React.ReactNode
  navigationItems: NavigationItem[]
  user?: User
  onNavigate?: (href: string) => void
  onLogout?: () => void
  onCoachClick?: () => void
}

export function AppShell({
  children,
  navigationItems,
  user,
  onNavigate,
  onLogout,
  onCoachClick,
}: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-body transition-colors duration-500">
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between px-6 h-16">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 -ml-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-violet-600 fill-violet-600" />
            <span className="font-black text-xl text-slate-900 dark:text-slate-100 font-heading tracking-tighter">
              FocusAI
            </span>
          </div>

          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-72 bg-white dark:bg-slate-900
          border-r border-slate-200 dark:border-slate-800
          transform transition-all duration-300 ease-in-out shadow-2xl lg:shadow-none
          lg:translate-x-0
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between h-20 px-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-600 rounded-xl shadow-lg shadow-violet-500/20">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-2xl font-black text-slate-900 dark:text-slate-100 font-heading tracking-tighter">
                FocusAI
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-2 -mr-2 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Section */}
          <nav className="flex-1 overflow-y-auto py-8 custom-scrollbar">
            <div className="px-8 mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Menú Principal
            </div>
            <MainNav
              items={navigationItems}
              onNavigate={(href) => {
                onNavigate?.(href)
                setMobileMenuOpen(false)
              }}
            />
          </nav>

          {/* User menu */}
          {user && (
            <div className="p-6">
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] p-4 border border-slate-100 dark:border-slate-800/50">
                <UserMenu user={user} onLogout={onLogout} />
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:pl-72 pt-16 lg:pt-0 min-h-screen">
        <div className="h-full px-6 sm:px-10 lg:px-12 py-8 mx-auto xl:max-w-[1400px]">
          {children}
        </div>
      </main>

      {/* Floating coach button */}
      <CoachButton onClick={onCoachClick} />
    </div>
  )
}
