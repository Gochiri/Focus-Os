import { useState, useMemo } from 'react'
import { Plus, Zap, ListTodo } from 'lucide-react'
import { TaskCard } from './TaskCard'
import { TaskFilters } from './TaskFilters'
import type { TasksAndPrioritiesProps, TaskPriority } from '@/../product/sections/tasks-and-priorities/types'

export function TaskPriorityView({
  tasks,
  projects,
  tags,
  workBlocks,
  onCreateTask,
  onEditTask,
  onDeleteTask,
  onCompleteTask,
  onPostponeTask,
  onDuplicateTask,
  onChangePriority,
  onScheduleWorkBlock,
  onDeleteWorkBlock,
  onChangeView,
  onFilterByProject,
  onFilterByTags,
}: TasksAndPrioritiesProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([])
  const [currentView, setCurrentView] = useState<'priority' | 'calendar'>('priority')

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Filter by project
      if (selectedProjectId && task.projectId !== selectedProjectId) {
        return false
      }
      // Filter by tags
      if (selectedTagIds.length > 0 && !selectedTagIds.some(tagId => task.tagIds.includes(tagId))) {
        return false
      }
      return true
    })
  }, [tasks, selectedProjectId, selectedTagIds])

  // Separate high impact (Pareto 20%) from the rest
  const highImpactTasks = filteredTasks.filter(t => t.priority === 'high' && t.status !== 'completed')
  const otherTasks = filteredTasks.filter(t => t.priority !== 'high' || t.status === 'completed')

  // Sort other tasks: in_progress first, then pending, then blocked, then completed
  const statusOrder = { in_progress: 0, pending: 1, blocked: 2, completed: 3 }
  const priorityOrder = { high: 0, medium: 1, low: 2 }

  const sortedOtherTasks = [...otherTasks].sort((a, b) => {
    const statusDiff = statusOrder[a.status] - statusOrder[b.status]
    if (statusDiff !== 0) return statusDiff
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  // Helper to get project and tags for a task
  const getTaskMeta = (task: typeof tasks[0]) => ({
    project: projects.find(p => p.id === task.projectId),
    taskTags: tags.filter(t => task.tagIds.includes(t.id)),
    blockedByTask: task.blockedBy.length > 0
      ? tasks.find(t => t.id === task.blockedBy[0])
      : undefined,
  })

  const handleFilterByProject = (projectId: string | null) => {
    setSelectedProjectId(projectId)
    onFilterByProject?.(projectId)
  }

  const handleFilterByTags = (tagIds: string[]) => {
    setSelectedTagIds(tagIds)
    onFilterByTags?.(tagIds)
  }

  const handleChangeView = (view: 'priority' | 'calendar') => {
    setCurrentView(view)
    onChangeView?.(view)
  }

  // Stats
  const completedToday = tasks.filter(t => t.status === 'completed').length
  const highImpactCount = tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Tasks & Priorities
            </h1>
            <p className="mt-1 text-slate-500 dark:text-slate-400">
              Enfócate en el 20% que genera el 80% de resultados
            </p>
          </div>
          <button
            onClick={onCreateTask}
            className="
              inline-flex items-center justify-center gap-2 px-4 py-2.5
              bg-violet-600 hover:bg-violet-700 text-white
              rounded-lg font-medium shadow-sm shadow-violet-600/25
              transition-all duration-200 hover:shadow-md hover:shadow-violet-600/30
            "
          >
            <Plus className="w-5 h-5" />
            Nueva tarea
          </button>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {highImpactCount}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Alto impacto</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <ListTodo className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {completedToday}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Completadas</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <TaskFilters
            projects={projects}
            tags={tags}
            selectedProjectId={selectedProjectId}
            selectedTagIds={selectedTagIds}
            currentView={currentView}
            onFilterByProject={handleFilterByProject}
            onFilterByTags={handleFilterByTags}
            onChangeView={handleChangeView}
          />
        </div>

        {/* High Impact Section */}
        {highImpactTasks.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Alto Impacto
              </h2>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                — El 20% que importa
              </span>
            </div>
            <div className="space-y-3">
              {highImpactTasks.map(task => {
                const { project, taskTags, blockedByTask } = getTaskMeta(task)
                return (
                  <TaskCard
                    key={task.id}
                    task={task}
                    project={project}
                    tags={taskTags}
                    blockedByTask={blockedByTask}
                    isHighImpact
                    onComplete={() => onCompleteTask?.(task.id)}
                    onEdit={() => onEditTask?.(task.id)}
                    onDelete={() => onDeleteTask?.(task.id)}
                    onDuplicate={() => onDuplicateTask?.(task.id)}
                    onChangePriority={(priority) => onChangePriority?.(task.id, priority)}
                    onScheduleWorkBlock={() => onScheduleWorkBlock?.(task.id, '', '', '')}
                  />
                )
              })}
            </div>
          </section>
        )}

        {/* Divider */}
        {highImpactTasks.length > 0 && sortedOtherTasks.length > 0 && (
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-slate-50 dark:bg-slate-950 text-sm text-slate-400 dark:text-slate-500">
                Otras tareas
              </span>
            </div>
          </div>
        )}

        {/* Other Tasks */}
        {sortedOtherTasks.length > 0 && (
          <section>
            <div className="space-y-3">
              {sortedOtherTasks.map(task => {
                const { project, taskTags, blockedByTask } = getTaskMeta(task)
                return (
                  <TaskCard
                    key={task.id}
                    task={task}
                    project={project}
                    tags={taskTags}
                    blockedByTask={blockedByTask}
                    onComplete={() => onCompleteTask?.(task.id)}
                    onEdit={() => onEditTask?.(task.id)}
                    onDelete={() => onDeleteTask?.(task.id)}
                    onDuplicate={() => onDuplicateTask?.(task.id)}
                    onChangePriority={(priority) => onChangePriority?.(task.id, priority)}
                    onScheduleWorkBlock={() => onScheduleWorkBlock?.(task.id, '', '', '')}
                  />
                )
              })}
            </div>
          </section>
        )}

        {/* Empty state */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
              <ListTodo className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-1">
              No hay tareas
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-4">
              {selectedProjectId || selectedTagIds.length > 0
                ? 'No hay tareas que coincidan con los filtros'
                : 'Crea tu primera tarea para comenzar'
              }
            </p>
            {!selectedProjectId && selectedTagIds.length === 0 && (
              <button
                onClick={onCreateTask}
                className="
                  inline-flex items-center gap-2 px-4 py-2
                  bg-violet-600 hover:bg-violet-700 text-white
                  rounded-lg font-medium transition-colors
                "
              >
                <Plus className="w-4 h-4" />
                Nueva tarea
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
