import { Target, Calendar, ChevronRight } from 'lucide-react'
import type { GoalProgress, GoalStatus } from '@/../product/sections/dashboard/types'

interface GoalProgressCardProps {
  goal: GoalProgress
  onClick?: () => void
}

const statusConfig: Record<GoalStatus, { label: string; color: string }> = {
  por_iniciar: {
    label: 'Por iniciar',
    color: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
  },
  en_progreso: {
    label: 'En progreso',
    color: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400'
  },
  pausada: {
    label: 'Pausada',
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
  },
  completada: {
    label: 'Completada',
    color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
  },
}

export function GoalProgressCard({ goal, onClick }: GoalProgressCardProps) {
  const status = statusConfig[goal.status]

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('es', { day: 'numeric', month: 'short' })
  }

  const getProgressColor = () => {
    if (goal.progress >= 75) return 'bg-emerald-500'
    if (goal.progress >= 50) return 'bg-violet-500'
    if (goal.progress >= 25) return 'bg-amber-500'
    return 'bg-slate-400'
  }

  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-violet-300 dark:hover:border-violet-700 transition-colors group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-violet-100 dark:bg-violet-900/30">
            <Target className="w-4 h-4 text-violet-600 dark:text-violet-400" />
          </div>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status.color}`}>
            {status.label}
          </span>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-violet-500 transition-colors" />
      </div>

      <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2 line-clamp-1">
        {goal.title}
      </h4>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-500 dark:text-slate-400">
            {goal.tasksCompleted}/{goal.tasksTotal} tareas
          </span>
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {goal.progress}%
          </span>
        </div>
        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full ${getProgressColor()} transition-all duration-500`}
            style={{ width: `${goal.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <Calendar className="w-3.5 h-3.5" />
        <span>Vence {formatDate(goal.dueDate)}</span>
      </div>
    </button>
  )
}
