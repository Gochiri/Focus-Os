import { useState } from 'react'
import {
  Check,
  Clock,
  Calendar,
  MoreHorizontal,
  Link2,
  Pencil,
  Trash2,
  Copy,
  CalendarPlus,
  ChevronUp,
  ChevronDown,
  Lock,
} from 'lucide-react'
import type { Task, Project, Tag, TaskPriority } from '@/../product/sections/tasks-and-priorities/types'

interface TaskCardProps {
  task: Task
  project?: Project
  tags: Tag[]
  blockedByTask?: Task
  isHighImpact?: boolean
  onComplete?: () => void
  onEdit?: () => void
  onDelete?: () => void
  onDuplicate?: () => void
  onChangePriority?: (priority: TaskPriority) => void
  onScheduleWorkBlock?: () => void
}

export function TaskCard({
  task,
  project,
  tags,
  blockedByTask,
  isHighImpact,
  onComplete,
  onEdit,
  onDelete,
  onDuplicate,
  onChangePriority,
  onScheduleWorkBlock,
}: TaskCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const isBlocked = task.status === 'blocked'
  const isCompleted = task.status === 'completed'
  const isInProgress = task.status === 'in_progress'

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
  }

  const formatMinutes = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }

  const priorityColors = {
    high: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    medium: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
    low: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  }

  const tagColorMap: Record<string, string> = {
    red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    slate: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
    green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  }

  return (
    <div
      className={`
        group relative rounded-xl border transition-all duration-200
        ${isCompleted
          ? 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-60'
          : isBlocked
          ? 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700'
          : isHighImpact
          ? 'bg-white dark:bg-slate-900 border-amber-200 dark:border-amber-800/50 shadow-sm shadow-amber-100 dark:shadow-amber-900/20'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-700'
        }
      `}
    >
      {/* High impact indicator bar */}
      {isHighImpact && !isCompleted && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-t-xl" />
      )}

      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <button
            onClick={onComplete}
            disabled={isBlocked}
            className={`
              mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center
              transition-all duration-200
              ${isCompleted
                ? 'bg-green-500 border-green-500 text-white'
                : isBlocked
                ? 'border-slate-300 dark:border-slate-600 cursor-not-allowed'
                : 'border-slate-300 dark:border-slate-600 hover:border-violet-500 dark:hover:border-violet-400'
              }
            `}
          >
            {isCompleted && <Check className="w-3 h-3" />}
            {isBlocked && <Lock className="w-3 h-3 text-slate-400" />}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title row */}
            <div className="flex items-start justify-between gap-2">
              <h3
                className={`
                  font-medium leading-tight
                  ${isCompleted
                    ? 'text-slate-500 dark:text-slate-500 line-through'
                    : 'text-slate-900 dark:text-slate-100'
                  }
                `}
              >
                {task.title}
              </h3>

              {/* Menu button */}
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  <MoreHorizontal className="w-4 h-4 text-slate-500" />
                </button>

                {/* Dropdown menu */}
                {menuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-8 z-20 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1">
                      <button
                        onClick={() => { onEdit?.(); setMenuOpen(false) }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <Pencil className="w-4 h-4" />
                        Editar
                      </button>
                      <button
                        onClick={() => { onDuplicate?.(); setMenuOpen(false) }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <Copy className="w-4 h-4" />
                        Duplicar
                      </button>
                      <button
                        onClick={() => { onScheduleWorkBlock?.(); setMenuOpen(false) }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <CalendarPlus className="w-4 h-4" />
                        Programar bloque
                      </button>
                      <div className="border-t border-slate-200 dark:border-slate-700 my-1" />
                      <div className="px-3 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                        Cambiar prioridad
                      </div>
                      <button
                        onClick={() => { onChangePriority?.('high'); setMenuOpen(false) }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <ChevronUp className="w-4 h-4 text-amber-500" />
                        Alto impacto
                      </button>
                      <button
                        onClick={() => { onChangePriority?.('medium'); setMenuOpen(false) }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <span className="w-4 h-4 flex items-center justify-center text-violet-500">—</span>
                        Medio
                      </button>
                      <button
                        onClick={() => { onChangePriority?.('low'); setMenuOpen(false) }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                        Bajo
                      </button>
                      <div className="border-t border-slate-200 dark:border-slate-700 my-1" />
                      <button
                        onClick={() => { onDelete?.(); setMenuOpen(false) }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Blocked message */}
            {isBlocked && blockedByTask && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400">
                <Link2 className="w-3.5 h-3.5" />
                <span>Bloqueada por: {blockedByTask.title}</span>
              </div>
            )}

            {/* Notes preview */}
            {task.notes && !isCompleted && (
              <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                {task.notes}
              </p>
            )}

            {/* Progress bar */}
            {isInProgress && task.progress > 0 && (
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-violet-500 rounded-full transition-all duration-300"
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {task.progress}%
                </span>
              </div>
            )}

            {/* Meta row */}
            <div className="mt-3 flex items-center flex-wrap gap-2">
              {/* Project badge */}
              {project && (
                <span
                  className={`
                    inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium
                    ${project.color === 'violet' ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400' : ''}
                    ${project.color === 'amber' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : ''}
                    ${project.color === 'emerald' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : ''}
                  `}
                >
                  {project.name}
                </span>
              )}

              {/* Tags */}
              {tags.map(tag => (
                <span
                  key={tag.id}
                  className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${tagColorMap[tag.color] || tagColorMap.slate}`}
                >
                  {tag.name}
                </span>
              ))}

              {/* Spacer */}
              <div className="flex-1" />

              {/* Deadline */}
              {task.deadline && (
                <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(task.deadline)}
                </span>
              )}

              {/* Estimated time */}
              {task.estimatedMinutes > 0 && (
                <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  {formatMinutes(task.estimatedMinutes)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
