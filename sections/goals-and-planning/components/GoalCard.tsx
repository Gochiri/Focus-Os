import { useState } from 'react'
import {
  Target,
  Calendar,
  CheckCircle2,
  Circle,
  MoreHorizontal,
  Pencil,
  Trash2,
  Play,
  Pause,
  Flag,
  ChevronRight,
  ListTodo,
} from 'lucide-react'
import type { Goal, GoalStatus } from '@/../product/sections/goals-and-planning/types'

interface GoalCardProps {
  goal: Goal
  onView?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onStatusChange?: (id: string, newStatus: GoalStatus) => void
}

export function GoalCard({
  goal,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}: GoalCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const completedMilestones = goal.milestones.filter(m => m.completed).length
  const totalMilestones = goal.milestones.length
  const completedTasks = goal.linkedTasks.filter(t => t.completed).length
  const totalTasks = goal.linkedTasks.length

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
  }

  const isOverdue = () => {
    const dueDate = new Date(goal.dueDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return dueDate < today && goal.status !== 'completada'
  }

  const statusConfig: Record<GoalStatus, { label: string; nextStatus: GoalStatus; icon: typeof Play }> = {
    por_iniciar: { label: 'Iniciar', nextStatus: 'en_progreso', icon: Play },
    en_progreso: { label: 'Pausar', nextStatus: 'pausada', icon: Pause },
    pausada: { label: 'Reanudar', nextStatus: 'en_progreso', icon: Play },
    completada: { label: 'Reabrir', nextStatus: 'en_progreso', icon: Play },
  }

  const tagColors: Record<string, string> = {
    'Producto': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
    'Q1': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'Fundraising': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    'Salud': 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
    'Personal': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    'Aprendizaje': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
    'Tech': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
    'Growth': 'bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400',
  }

  const getProgressColor = () => {
    if (goal.progress >= 75) return 'bg-emerald-500'
    if (goal.progress >= 50) return 'bg-violet-500'
    if (goal.progress >= 25) return 'bg-amber-500'
    return 'bg-slate-400'
  }

  return (
    <div
      onClick={() => onView?.(goal.id)}
      className={`
        group relative rounded-xl border transition-all duration-200 cursor-pointer
        ${goal.status === 'completada'
          ? 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800 opacity-75'
          : goal.status === 'pausada'
          ? 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-md hover:shadow-violet-100/50 dark:hover:shadow-violet-900/20'
        }
      `}
    >
      {/* Progress indicator bar at top */}
      {goal.status !== 'completada' && goal.progress > 0 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 dark:bg-slate-800 rounded-t-xl overflow-hidden">
          <div
            className={`h-full ${getProgressColor()} transition-all duration-500`}
            style={{ width: `${goal.progress}%` }}
          />
        </div>
      )}

      {/* Completed overlay */}
      {goal.status === 'completada' && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500 rounded-t-xl" />
      )}

      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className={`
              p-1.5 rounded-lg
              ${goal.status === 'completada'
                ? 'bg-emerald-100 dark:bg-emerald-900/30'
                : 'bg-violet-100 dark:bg-violet-900/30'
              }
            `}>
              <Target className={`
                w-4 h-4
                ${goal.status === 'completada'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-violet-600 dark:text-violet-400'
                }
              `} />
            </div>
            <span className={`
              text-xs font-medium
              ${goal.progress >= 75 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}
            `}>
              {goal.progress}%
            </span>
          </div>

          {/* Menu button */}
          <div className="relative flex-shrink-0">
            <button
              onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen) }}
              className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <MoreHorizontal className="w-4 h-4 text-slate-500" />
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={(e) => { e.stopPropagation(); setMenuOpen(false) }}
                />
                <div className="absolute right-0 top-8 z-20 w-44 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); onEdit?.(goal.id); setMenuOpen(false) }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Pencil className="w-4 h-4" />
                    Editar
                  </button>

                  <div className="border-t border-slate-200 dark:border-slate-700 my-1" />
                  <div className="px-3 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                    Cambiar estado
                  </div>

                  {goal.status !== 'por_iniciar' && (
                    <button
                      onClick={(e) => { e.stopPropagation(); onStatusChange?.(goal.id, 'por_iniciar'); setMenuOpen(false) }}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <Circle className="w-4 h-4 text-slate-400" />
                      Por iniciar
                    </button>
                  )}
                  {goal.status !== 'en_progreso' && (
                    <button
                      onClick={(e) => { e.stopPropagation(); onStatusChange?.(goal.id, 'en_progreso'); setMenuOpen(false) }}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <Play className="w-4 h-4 text-violet-500" />
                      En progreso
                    </button>
                  )}
                  {goal.status !== 'pausada' && (
                    <button
                      onClick={(e) => { e.stopPropagation(); onStatusChange?.(goal.id, 'pausada'); setMenuOpen(false) }}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <Pause className="w-4 h-4 text-amber-500" />
                      Pausada
                    </button>
                  )}
                  {goal.status !== 'completada' && (
                    <button
                      onClick={(e) => { e.stopPropagation(); onStatusChange?.(goal.id, 'completada'); setMenuOpen(false) }}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      Completada
                    </button>
                  )}

                  <div className="border-t border-slate-200 dark:border-slate-700 my-1" />
                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete?.(goal.id); setMenuOpen(false) }}
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

        {/* Title */}
        <h3 className={`
          font-semibold leading-snug mb-2
          ${goal.status === 'completada'
            ? 'text-slate-500 dark:text-slate-500 line-through'
            : 'text-slate-900 dark:text-slate-100'
          }
        `}>
          {goal.title}
        </h3>

        {/* Description preview */}
        {goal.description && goal.status !== 'completada' && (
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
            {goal.description}
          </p>
        )}

        {/* Milestones & Tasks summary */}
        <div className="flex items-center gap-3 mb-3">
          {totalMilestones > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Flag className="w-3.5 h-3.5" />
              <span>{completedMilestones}/{totalMilestones} hitos</span>
            </div>
          )}
          {totalTasks > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <ListTodo className="w-3.5 h-3.5" />
              <span>{completedTasks}/{totalTasks} tareas</span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex items-center flex-wrap gap-1.5 mb-3">
          {goal.tags.map(tag => (
            <span
              key={tag}
              className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${tagColors[tag] || 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer: Due date & view action */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className={`
            inline-flex items-center gap-1.5 text-xs
            ${isOverdue()
              ? 'text-red-600 dark:text-red-400 font-medium'
              : 'text-slate-500 dark:text-slate-400'
            }
          `}>
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(goal.dueDate)}
            {isOverdue() && <span className="ml-1">(vencida)</span>}
          </span>

          <span className="inline-flex items-center gap-1 text-xs text-violet-600 dark:text-violet-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Ver detalle
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  )
}
