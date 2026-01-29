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
    <ul className="space-y-2 px-4">
      {items.map((item) => {
        const Icon = item.icon ? iconMap[item.icon] : null

        return (
          <li key={item.href}>
            <button
              onClick={() => onNavigate?.(item.href)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-2xl
                text-[13px] font-bold uppercase tracking-widest transition-all duration-300 group
                ${item.isActive
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100'
                }
              `}
            >
              {Icon && (
                <Icon
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 
                  ${item.isActive ? 'text-white' : 'text-slate-400 group-hover:text-violet-500'}`}
                />
              )}
              <span className="font-heading">{item.label}</span>
              {item.isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
              )}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
