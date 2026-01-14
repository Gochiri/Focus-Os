import {
  AlertTriangle,
  Sun,
  Lightbulb,
  Sparkles,
  X,
  Target,
} from 'lucide-react'
import type { ProactiveSuggestionCardProps, SuggestionType } from '@/../product/sections/ai-coach/types'

export function ProactiveSuggestionCard({
  suggestion,
  onAction,
  onDismiss,
}: ProactiveSuggestionCardProps) {
  const getTypeConfig = (type: SuggestionType) => {
    switch (type) {
      case 'procrastination_alert':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
          borderColor: 'border-amber-200 dark:border-amber-800/50',
          iconColor: 'text-amber-500',
          iconBg: 'bg-amber-100 dark:bg-amber-900/30',
        }
      case 'check_in':
        return {
          icon: Sun,
          bgColor: 'bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20',
          borderColor: 'border-violet-200 dark:border-violet-800/50',
          iconColor: 'text-violet-500',
          iconBg: 'bg-violet-100 dark:bg-violet-900/30',
        }
      case 'suggestion':
        return {
          icon: Lightbulb,
          bgColor: 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20',
          borderColor: 'border-emerald-200 dark:border-emerald-800/50',
          iconColor: 'text-emerald-500',
          iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
        }
      case 'reflection':
        return {
          icon: Sparkles,
          bgColor: 'bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20',
          borderColor: 'border-rose-200 dark:border-rose-800/50',
          iconColor: 'text-rose-500',
          iconBg: 'bg-rose-100 dark:bg-rose-900/30',
        }
    }
  }

  const config = getTypeConfig(suggestion.type)
  const Icon = config.icon

  return (
    <div className={`
      relative rounded-xl border p-4 transition-all duration-200
      ${config.bgColor} ${config.borderColor}
      hover:shadow-md
    `}>
      {/* Dismiss button */}
      <button
        onClick={onDismiss}
        className="absolute top-2 right-2 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Header */}
      <div className="flex items-start gap-3 mb-3 pr-6">
        <div className={`p-2 rounded-lg ${config.iconBg}`}>
          <Icon className={`w-4 h-4 ${config.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
            {suggestion.title}
          </h4>
          {suggestion.referencedTask && (
            <div className="flex items-center gap-1 mt-1 text-xs text-slate-500 dark:text-slate-400">
              <Target className="w-3 h-3" />
              <span className="truncate">{suggestion.referencedTask.title}</span>
            </div>
          )}
        </div>
      </div>

      {/* Message */}
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
        {suggestion.message}
      </p>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        {suggestion.actions.map((action, index) => (
          <button
            key={action.id}
            onClick={() => onAction?.(action.action, action.taskId)}
            className={`
              px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
              ${index === 0
                ? 'bg-violet-600 hover:bg-violet-700 text-white'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-violet-300 dark:hover:border-violet-600'
              }
            `}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  )
}
