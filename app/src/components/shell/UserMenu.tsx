'use client'

import { LogOut } from 'lucide-react'

export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

interface UserMenuProps {
  user: User
  onLogout?: () => void
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="flex items-center gap-3 px-3 py-3 border-t border-slate-200">
      <div className="w-9 h-9 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-sm font-semibold">
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt={user.name} className="w-full h-full rounded-full object-cover" />
        ) : (
          initials
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900 truncate">{user.name}</p>
      </div>
      {onLogout && (
        <button
          onClick={onLogout}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          title="Cerrar sesión"
        >
          <LogOut size={18} />
        </button>
      )}
    </div>
  )
}
