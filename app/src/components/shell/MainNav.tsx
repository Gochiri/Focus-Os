'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  CheckSquare,
  Target,
  MessageCircle,
  Clock,
  BarChart3
} from 'lucide-react'

export interface NavigationItem {
  id: string
  label: string
  href: string
  icon: React.ReactNode
}

const navigationItems: NavigationItem[] = [
  { id: 'tasks', label: 'Tasks & Priorities', href: '/tasks', icon: <CheckSquare size={20} /> },
  { id: 'goals', label: 'Goals & Planning', href: '/goals', icon: <Target size={20} /> },
  { id: 'coach', label: 'AI Coach', href: '/coach', icon: <MessageCircle size={20} /> },
  { id: 'focus', label: 'Focus Mode', href: '/focus', icon: <Clock size={20} /> },
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: <BarChart3 size={20} /> },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1 px-3 py-4">
      {navigationItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

        return (
          <Link
            key={item.id}
            href={item.href}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
              transition-colors duration-150
              ${isActive
                ? 'bg-violet-600 text-white'
                : 'text-slate-700 hover:bg-violet-100 hover:text-violet-700'
              }
            `}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
