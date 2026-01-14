import { useState, useMemo } from 'react'
import {
  Plus,
  Target,
  LayoutGrid,
  Calendar as CalendarIcon,
  List,
  Circle,
  Play,
  Pause,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import type { Goal, GoalStatus, GoalsAndPlanningProps, ViewMode } from '@/../product/sections/goals-and-planning/types'
import { GoalCard } from './GoalCard'

interface KanbanColumn {
  id: GoalStatus
  title: string
  icon: typeof Circle
  iconColor: string
  emptyMessage: string
}

const columns: KanbanColumn[] = [
  {
    id: 'por_iniciar',
    title: 'Por iniciar',
    icon: Circle,
    iconColor: 'text-slate-400',
    emptyMessage: 'No hay metas pendientes de iniciar',
  },
  {
    id: 'en_progreso',
    title: 'En progreso',
    icon: Play,
    iconColor: 'text-violet-500',
    emptyMessage: 'No hay metas en progreso',
  },
  {
    id: 'pausada',
    title: 'Pausada',
    icon: Pause,
    iconColor: 'text-amber-500',
    emptyMessage: 'No hay metas pausadas',
  },
  {
    id: 'completada',
    title: 'Completada',
    icon: CheckCircle2,
    iconColor: 'text-emerald-500',
    emptyMessage: 'No hay metas completadas',
  },
]

export function GoalKanban({
  goals,
  viewMode = 'kanban',
  onCreate,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
  onViewModeChange,
}: GoalsAndPlanningProps) {
  const [activeView, setActiveView] = useState<ViewMode>(viewMode)

  const goalsByStatus = useMemo(() => {
    const grouped: Record<GoalStatus, Goal[]> = {
      por_iniciar: [],
      en_progreso: [],
      pausada: [],
      completada: [],
    }

    goals.forEach(goal => {
      grouped[goal.status].push(goal)
    })

    // Sort by due date within each column
    Object.keys(grouped).forEach(status => {
      grouped[status as GoalStatus].sort((a, b) =>
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      )
    })

    return grouped
  }, [goals])

  const stats = useMemo(() => {
    const total = goals.length
    const completed = goals.filter(g => g.status === 'completada').length
    const inProgress = goals.filter(g => g.status === 'en_progreso').length
    const avgProgress = goals.length > 0
      ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length)
      : 0

    return { total, completed, inProgress, avgProgress }
  }, [goals])

  const handleViewChange = (mode: ViewMode) => {
    setActiveView(mode)
    onViewModeChange?.(mode)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                Goals & Planning
              </h1>
              <p className="mt-1 text-slate-500 dark:text-slate-400">
                Define tus metas con metodología SMART y framework RPM
              </p>
            </div>

            <button
              onClick={onCreate}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-violet-500/25"
            >
              <Plus className="w-5 h-5" />
              <span>Nueva meta</span>
            </button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
                  <Target className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.total}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Total metas</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Play className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.inProgress}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">En progreso</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.completed}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Completadas</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.avgProgress}%</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Progreso prom.</p>
                </div>
              </div>
            </div>
          </div>

          {/* View toggle */}
          <div className="flex items-center justify-end">
            <div className="inline-flex items-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-1">
              <button
                onClick={() => handleViewChange('kanban')}
                className={`
                  inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                  ${activeView === 'kanban'
                    ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }
                `}
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Kanban</span>
              </button>
              <button
                onClick={() => handleViewChange('timeline')}
                className={`
                  inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                  ${activeView === 'timeline'
                    ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }
                `}
              >
                <CalendarIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Timeline</span>
              </button>
              <button
                onClick={() => handleViewChange('list')}
                className={`
                  inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                  ${activeView === 'list'
                    ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }
                `}
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">Lista</span>
              </button>
            </div>
          </div>
        </div>

        {/* Kanban board */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {columns.map(column => {
            const columnGoals = goalsByStatus[column.id]
            const Icon = column.icon

            return (
              <div key={column.id} className="flex flex-col">
                {/* Column header */}
                <div className="flex items-center gap-2 mb-3 px-1">
                  <Icon className={`w-4 h-4 ${column.iconColor}`} />
                  <h2 className="font-semibold text-slate-900 dark:text-slate-100">
                    {column.title}
                  </h2>
                  <span className="ml-auto inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400">
                    {columnGoals.length}
                  </span>
                </div>

                {/* Column content */}
                <div className="flex-1 space-y-3 min-h-[200px] p-2 bg-slate-100/50 dark:bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                  {columnGoals.length > 0 ? (
                    columnGoals.map(goal => (
                      <GoalCard
                        key={goal.id}
                        goal={goal}
                        onView={onView}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onStatusChange={onStatusChange}
                      />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                      <Icon className={`w-8 h-8 ${column.iconColor} opacity-40 mb-2`} />
                      <p className="text-sm text-slate-400 dark:text-slate-500">
                        {column.emptyMessage}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
