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
import type { Goal, GoalStatus } from '../../types'
import { GoalCard } from './GoalCard'

export type ViewMode = 'kanban' | 'timeline' | 'list'

export interface GoalsAndPlanningProps {
    goals: Goal[]
    viewMode?: ViewMode
    onCreate?: () => void
    onView?: (id: string) => void
    onEdit?: (id: string) => void
    onDelete?: (id: string) => void
    onStatusChange?: (id: string, newStatus: GoalStatus) => void
    onViewModeChange?: (mode: ViewMode) => void
}

interface KanbanColumn {
    id: GoalStatus
    title: string
    icon: React.ElementType
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
        <div className="py-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 font-heading">
                            Metas & Planificación
                        </h1>
                        <p className="mt-1 text-slate-500 dark:text-slate-400">
                            Metas SMART potenciadas por el framework RPM
                        </p>
                    </div>

                    <button
                        onClick={onCreate}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-violet-500/25 font-heading uppercase text-xs tracking-widest"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Nueva meta</span>
                    </button>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-violet-100 dark:bg-violet-900/30 rounded-xl">
                                <Target className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-heading">{stats.total}</p>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total metas</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                                <Play className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-heading">{stats.inProgress}</p>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">En progreso</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-heading">{stats.completed}</p>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Completadas</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                                <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-heading">{stats.avgProgress}%</p>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Progreso avg</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* View toggle */}
                <div className="flex items-center justify-end">
                    <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                        <button
                            onClick={() => handleViewChange('kanban')}
                            className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
                ${activeView === 'kanban'
                                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                                }
              `}
                        >
                            <LayoutGrid className="w-4 h-4" />
                            <span className="hidden sm:inline">Kanban</span>
                        </button>
                        <button
                            onClick={() => handleViewChange('timeline')}
                            className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
                ${activeView === 'timeline'
                                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                                }
              `}
                        >
                            <CalendarIcon className="w-4 h-4" />
                            <span className="hidden sm:inline">Timeline</span>
                        </button>
                        <button
                            onClick={() => handleViewChange('list')}
                            className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
                ${activeView === 'list'
                                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {columns.map(column => {
                    const columnGoals = goalsByStatus[column.id]
                    const Icon = column.icon

                    return (
                        <div key={column.id} className="flex flex-col">
                            {/* Column header */}
                            <div className="flex items-center gap-2 mb-4 px-2">
                                <Icon className={`w-4 h-4 ${column.iconColor}`} />
                                <h2 className="font-bold text-sm uppercase tracking-widest text-slate-900 dark:text-slate-100 font-heading">
                                    {column.title}
                                </h2>
                                <span className="ml-auto inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                                    {columnGoals.length}
                                </span>
                            </div>

                            {/* Column content */}
                            <div className="flex-1 space-y-4 min-h-[300px] p-3 bg-slate-100/30 dark:bg-slate-900/30 rounded-2xl border-2 border-dashed border-slate-200/50 dark:border-slate-800/50 transition-colors">
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
                                    <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                                        <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-3 opacity-40">
                                            <Icon className={`w-8 h-8 ${column.iconColor}`} />
                                        </div>
                                        <p className="text-xs font-medium text-slate-400 dark:text-slate-500 max-w-[120px]">
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
    )
}
