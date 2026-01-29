import { Clock, Target, CheckCircle2, Flame, TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: number | string
  previousValue?: number
  icon: string
  color: 'violet' | 'amber' | 'emerald' | 'blue'
}

const iconMap: Record<string, React.ElementType> = {
  clock: Clock,
  target: Target,
  check: CheckCircle2,
  flame: Flame,
}

const colorClasses = {
  violet: {
    bg: 'bg-violet-100 dark:bg-violet-900/30',
    icon: 'text-violet-600 dark:text-violet-400',
    accent: 'text-violet-600 dark:text-violet-400',
  },
  amber: {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    icon: 'text-amber-600 dark:text-amber-400',
    accent: 'text-amber-600 dark:text-amber-400',
  },
  emerald: {
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    icon: 'text-emerald-600 dark:text-emerald-400',
    accent: 'text-emerald-600 dark:text-emerald-400',
  },
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    icon: 'text-blue-600 dark:text-blue-400',
    accent: 'text-blue-600 dark:text-blue-400',
  },
}

export function MetricCard({ label, value, previousValue, icon, color }: MetricCardProps) {
  const IconComponent = iconMap[icon] || Target
  const colors = colorClasses[color]

  const numericValue = typeof value === 'number' ? value : parseFloat(value) || 0
  const difference = previousValue !== undefined ? numericValue - previousValue : 0
  const percentChange = previousValue && previousValue !== 0
    ? Math.round((difference / previousValue) * 100)
    : 0

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-xl ${colors.bg}`}>
          <IconComponent className={`w-5 h-5 ${colors.icon}`} />
        </div>
        {previousValue !== undefined && (
          <div className={`
            flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full
            ${difference > 0
              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
              : difference < 0
              ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }
          `}>
            {difference > 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : difference < 0 ? (
              <TrendingDown className="w-3 h-3" />
            ) : (
              <Minus className="w-3 h-3" />
            )}
            <span>{percentChange > 0 ? '+' : ''}{percentChange}%</span>
          </div>
        )}
      </div>

      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
        {value}
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {label}
      </p>
    </div>
  )
}
