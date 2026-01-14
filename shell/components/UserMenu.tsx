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
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <div className="flex-shrink-0">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center">
            <span className="text-sm font-medium text-violet-700 dark:text-violet-300">
              {initials}
            </span>
          </div>
        )}
      </div>

      {/* User info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
          {user.name}
        </p>
        {user.email && (
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
            {user.email}
          </p>
        )}
      </div>

      {/* Logout button */}
      {onLogout && (
        <button
          onClick={onLogout}
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          aria-label="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
