import { useState, useMemo } from 'react'
import { Plus, ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { CalendarDay } from './CalendarDay'
import { TaskFilters } from './TaskFilters'
import type { TasksAndPrioritiesProps } from '@/../product/sections/tasks-and-priorities/types'

export function TaskCalendarView({
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
  const [currentView, setCurrentView] = useState<'priority' | 'calendar'>('calendar')
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1)) // January 2024 for sample data

  const today = new Date(2024, 0, 16) // Mock "today" for sample data

  // Get calendar grid data
  const calendarData = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)

    // Start from the Sunday before the first day
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    // End on the Saturday after the last day
    const endDate = new Date(lastDay)
    const daysUntilSaturday = 6 - lastDay.getDay()
    endDate.setDate(endDate.getDate() + daysUntilSaturday)

    const days: Date[] = []
    const current = new Date(startDate)
    while (current <= endDate) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }

    return { days, month, year }
  }, [currentDate])

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (selectedProjectId && task.projectId !== selectedProjectId) return false
      if (selectedTagIds.length > 0 && !selectedTagIds.some(tagId => task.tagIds.includes(tagId))) return false
      return true
    })
  }, [tasks, selectedProjectId, selectedTagIds])

  // Get deadlines and work blocks for a specific date
  const getDateData = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]

    const deadlines = filteredTasks
      .filter(task => task.deadline === dateStr && task.status !== 'completed')
      .map(task => ({
        task,
        project: projects.find(p => p.id === task.projectId),
      }))

    const dayWorkBlocks = workBlocks
      .filter(wb => wb.date === dateStr)
      .map(block => {
        const task = tasks.find(t => t.id === block.taskId)!
        return {
          block,
          task,
          project: projects.find(p => p.id === task?.projectId),
        }
      })
      .filter(wb => wb.task) // Only include if task exists

    return { deadlines, workBlocks: dayWorkBlocks }
  }

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

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1))
  }

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

  // Count items this month
  const monthStats = useMemo(() => {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

    const deadlinesCount = filteredTasks.filter(task => {
      const deadline = new Date(task.deadline)
      return deadline >= monthStart && deadline <= monthEnd && task.status !== 'completed'
    }).length

    const blocksCount = workBlocks.filter(wb => {
      const date = new Date(wb.date)
      return date >= monthStart && date <= monthEnd
    }).length

    return { deadlinesCount, blocksCount }
  }, [currentDate, filteredTasks, workBlocks])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Tasks & Priorities
            </h1>
            <p className="mt-1 text-slate-500 dark:text-slate-400">
              Visualiza deadlines y bloques de trabajo
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

        {/* Calendar header */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          {/* Month navigation */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                {monthNames[calendarData.month]} {calendarData.year}
              </h2>
              <div className="flex items-center gap-1">
                <button
                  onClick={goToPreviousMonth}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </button>
                <button
                  onClick={goToNextMonth}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </button>
              </div>
              <button
                onClick={goToToday}
                className="px-3 py-1.5 text-sm font-medium text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg transition-colors"
              >
                Hoy
              </button>
            </div>

            {/* Month stats */}
            <div className="hidden sm:flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                {monthStats.deadlinesCount} deadlines
              </span>
              <span className="flex items-center gap-1.5 text-violet-600 dark:text-violet-400">
                <span className="w-2 h-2 rounded-full bg-violet-500" />
                {monthStats.blocksCount} bloques
              </span>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800">
            {dayNames.map(day => (
              <div
                key={day}
                className="py-2 text-center text-sm font-medium text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800 last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7">
            {calendarData.days.map((date, index) => {
              const { deadlines, workBlocks: dayWorkBlocks } = getDateData(date)
              const isToday = date.toDateString() === today.toDateString()
              const isCurrentMonth = date.getMonth() === calendarData.month

              return (
                <CalendarDay
                  key={index}
                  date={date}
                  isToday={isToday}
                  isCurrentMonth={isCurrentMonth}
                  deadlines={deadlines}
                  workBlocks={dayWorkBlocks}
                  onTaskClick={(taskId) => onEditTask?.(taskId)}
                  onWorkBlockClick={(workBlockId) => onDeleteWorkBlock?.(workBlockId)}
                />
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-violet-100 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-800" />
            <span>Bloque de trabajo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50" />
            <span>Deadline</span>
          </div>
        </div>
      </div>
    </div>
  )
}
