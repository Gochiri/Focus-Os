import { Clock, AlertCircle } from 'lucide-react'
import type { Task, WorkBlock, Project } from '@/../product/sections/tasks-and-priorities/types'

interface CalendarDayProps {
  date: Date
  isToday: boolean
  isCurrentMonth: boolean
  deadlines: Array<{ task: Task; project?: Project }>
  workBlocks: Array<{ block: WorkBlock; task: Task; project?: Project }>
  onTaskClick?: (taskId: string) => void
  onWorkBlockClick?: (workBlockId: string) => void
}

export function CalendarDay({
  date,
  isToday,
  isCurrentMonth,
  deadlines,
  workBlocks,
  onTaskClick,
  onWorkBlockClick,
}: CalendarDayProps) {
  const dayNumber = date.getDate()

  const priorityIndicator = {
    high: 'bg-amber-500',
    medium: 'bg-violet-500',
    low: 'bg-slate-400',
  }

  return (
    <div
      className={`
        min-h-[120px] p-2 border-r border-b border-slate-200 dark:border-slate-800
        ${isCurrentMonth
          ? 'bg-white dark:bg-slate-900'
          : 'bg-slate-50 dark:bg-slate-950'
        }
      `}
    >
      {/* Day number */}
      <div className="flex items-center justify-between mb-2">
        <span
          className={`
            inline-flex items-center justify-center w-7 h-7 text-sm font-medium rounded-full
            ${isToday
              ? 'bg-violet-600 text-white'
              : isCurrentMonth
              ? 'text-slate-900 dark:text-slate-100'
              : 'text-slate-400 dark:text-slate-600'
            }
          `}
        >
          {dayNumber}
        </span>
        {deadlines.length > 0 && (
          <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
            {deadlines.length} deadline{deadlines.length > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Work blocks */}
      <div className="space-y-1">
        {workBlocks.slice(0, 2).map(({ block, task, project }) => (
          <button
            key={block.id}
            onClick={() => onWorkBlockClick?.(block.id)}
            className="
              w-full text-left p-1.5 rounded-md text-xs
              bg-violet-100 dark:bg-violet-900/30
              hover:bg-violet-200 dark:hover:bg-violet-900/50
              transition-colors
            "
          >
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-violet-600 dark:text-violet-400 flex-shrink-0" />
              <span className="font-medium text-violet-700 dark:text-violet-300 truncate">
                {block.startTime}
              </span>
            </div>
            <p className="text-violet-600 dark:text-violet-400 truncate mt-0.5">
              {task.title}
            </p>
          </button>
        ))}

        {/* Deadlines */}
        {deadlines.slice(0, 2).map(({ task, project }) => (
          <button
            key={task.id}
            onClick={() => onTaskClick?.(task.id)}
            className="
              w-full text-left p-1.5 rounded-md text-xs
              bg-amber-50 dark:bg-amber-900/20
              hover:bg-amber-100 dark:hover:bg-amber-900/30
              border border-amber-200 dark:border-amber-800/50
              transition-colors
            "
          >
            <div className="flex items-center gap-1.5">
              <AlertCircle className="w-3 h-3 text-amber-600 dark:text-amber-400 flex-shrink-0" />
              <div className={`w-2 h-2 rounded-full ${priorityIndicator[task.priority]}`} />
              <span className="font-medium text-amber-700 dark:text-amber-300 truncate flex-1">
                {task.title}
              </span>
            </div>
          </button>
        ))}

        {/* Overflow indicator */}
        {(workBlocks.length > 2 || deadlines.length > 2) && (
          <p className="text-xs text-slate-500 dark:text-slate-400 pl-1">
            +{workBlocks.length + deadlines.length - 4} más
          </p>
        )}
      </div>
    </div>
  )
}
