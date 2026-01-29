import {
  CheckSquare,
  Target,
  Bot,
  Timer,
  BarChart3,
  type LucideIcon,
} from 'lucide-react'

export interface NavigationItem {
  label: string
  href: string
  icon?: string
  isActive?: boolean
}

interface MainNavProps {
  items: NavigationItem[]
  onNavigate?: (href: string) => void
}

const iconMap: Record<string, LucideIcon> = {
  CheckSquare,
  Target,
  Bot,
  Timer,
  BarChart3,
}

export function MainNav({ items, onNavigate }: MainNavProps) {
  return (
    <ul className="space-y-1 px-3">
      {items.map((item) => {
        const Icon = item.icon ? iconMap[item.icon] : null

        return (
          <li key={item.href}>
            <button
              onClick={() => onNavigate?.(item.href)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                text-sm font-medium transition-colors duration-200
                ${
                  item.isActive
                    ? 'bg-violet-600 text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-700 dark:hover:text-violet-300'
                }
              `}
            >
              {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
              <span>{item.label}</span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
