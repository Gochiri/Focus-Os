import { LogOut } from 'lucide-react'

export interface User {
  name: string
  email?: string
  avatarUrl?: string
}

interface UserMenuProps {
  user: User
  onLogout?: () => void
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="flex items-center gap-4">
      {/* Avatar */}
      <div className="flex-shrink-0">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-10 h-10 rounded-2xl object-cover shadow-md ring-2 ring-white dark:ring-slate-800"
          />
        ) : (
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-100 to-violet-200 dark:from-violet-900/50 dark:to-violet-800/30 flex items-center justify-center shadow-inner">
            <span className="text-xs font-black text-violet-700 dark:text-violet-300 font-heading">
              {initials}
            </span>
          </div>
        )}
      </div>

      {/* User info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate font-heading tracking-tight">
          {user.name}
        </p>
        {user.email && (
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 truncate uppercase tracking-widest">
            PRO PLAN
          </p>
        )}
      </div>

      {/* Logout button */}
      {onLogout && (
        <button
          onClick={onLogout}
          className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 hover:text-red-500 hover:border-red-200 dark:hover:border-red-900 transition-all shadow-sm hover:shadow-md active:scale-90"
          aria-label="Cerrar Sesión"
        >
          <LogOut className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
