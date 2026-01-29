import {
    AlertTriangle,
    Sun,
    Lightbulb,
    Sparkles,
    X,
    Target,
} from 'lucide-react'
import type { ProactiveSuggestion, SuggestionType, ActionType } from '../../types'

interface ProactiveSuggestionCardProps {
    suggestion: ProactiveSuggestion
    onAction?: (action: ActionType, taskId?: string) => void
    onDismiss?: () => void
}

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
                    bgColor: 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10',
                    borderColor: 'border-amber-200/50 dark:border-amber-800/30',
                    iconColor: 'text-amber-500',
                    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
                }
            case 'check_in':
                return {
                    icon: Sun,
                    bgColor: 'bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/10 dark:to-purple-900/10',
                    borderColor: 'border-violet-200/50 dark:border-violet-800/30',
                    iconColor: 'text-violet-500',
                    iconBg: 'bg-violet-100 dark:bg-violet-900/30',
                }
            case 'suggestion':
                return {
                    icon: Lightbulb,
                    bgColor: 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10',
                    borderColor: 'border-emerald-200/50 dark:border-emerald-800/30',
                    iconColor: 'text-emerald-500',
                    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
                }
            case 'reflection':
                return {
                    icon: Sparkles,
                    bgColor: 'bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/10 dark:to-pink-900/10',
                    borderColor: 'border-rose-200/50 dark:border-rose-800/30',
                    iconColor: 'text-rose-500',
                    iconBg: 'bg-rose-100 dark:bg-rose-900/30',
                }
        }
    }

    const config = getTypeConfig(suggestion.type)
    const Icon = config.icon

    return (
        <div className={`
      relative rounded-2xl border p-5 transition-all duration-300
      ${config.bgColor} ${config.borderColor}
      hover:shadow-lg hover:-translate-y-1 shadow-sm
    `}>
            {/* Dismiss button */}
            <button
                onClick={onDismiss}
                className="absolute top-3 right-3 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors"
            >
                <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-start gap-3 mb-4 pr-8">
                <div className={`p-2.5 rounded-xl ${config.iconBg} shadow-sm`}>
                    <Icon className={`w-5 h-5 ${config.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 font-heading">
                        {suggestion.title}
                    </h4>
                    {suggestion.referencedTask && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-[10px] font-bold uppercase tracking-tight text-slate-500 dark:text-slate-400">
                            <Target className="w-3.5 h-3.5 text-violet-500" />
                            <span className="truncate">{suggestion.referencedTask.title}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Message */}
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 font-medium">
                {suggestion.message}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
                {suggestion.actions.map((action, index) => (
                    <button
                        key={action.id}
                        onClick={() => onAction?.(action.action, action.taskId)}
                        className={`
              px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all
              ${index === 0
                                ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-500/20'
                                : 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-violet-300 dark:hover:border-violet-600'
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
