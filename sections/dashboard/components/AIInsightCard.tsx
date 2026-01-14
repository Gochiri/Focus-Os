import { Lightbulb, TrendingUp, AlertTriangle, PartyPopper, X } from 'lucide-react'
import type { AIInsight, InsightType } from '@/../product/sections/dashboard/types'

interface AIInsightCardProps {
  insight: AIInsight
  onDismiss?: () => void
}

const typeConfig: Record<InsightType, { icon: React.ElementType; colors: string; iconColor: string }> = {
  positive: {
    icon: TrendingUp,
    colors: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800',
    iconColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/50',
  },
  suggestion: {
    icon: Lightbulb,
    colors: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
    iconColor: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/50',
  },
  warning: {
    icon: AlertTriangle,
    colors: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    iconColor: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/50',
  },
  celebration: {
    icon: PartyPopper,
    colors: 'bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800',
    iconColor: 'text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/50',
  },
}

export function AIInsightCard({ insight, onDismiss }: AIInsightCardProps) {
  const config = typeConfig[insight.type]
  const Icon = config.icon

  return (
    <div className={`p-4 rounded-xl border ${config.colors} relative group`}>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute top-2 right-2 p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all"
          aria-label="Descartar"
        >
          <X className="w-4 h-4 text-slate-400" />
        </button>
      )}

      <div className="flex gap-3">
        <div className={`p-2 rounded-lg ${config.iconColor} flex-shrink-0`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 pr-6">
          <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm mb-1">
            {insight.title}
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {insight.message}
          </p>
        </div>
      </div>
    </div>
  )
}
