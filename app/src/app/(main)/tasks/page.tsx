'use client'

import { useState } from 'react'
import { tasks, projects, tags } from '@/data/sample-data'
import { Task, TaskStatus, TaskPriority } from '@/types'
import {
  CheckCircle2,
  Circle,
  Clock,
  AlertTriangle,
  Calendar,
  MoreHorizontal,
  Plus,
  Filter,
  LayoutGrid,
  List
} from 'lucide-react'

const priorityColors: Record<TaskPriority, string> = {
  high: 'bg-red-100 text-red-700 border-red-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  low: 'bg-green-100 text-green-700 border-green-200',
}

const priorityLabels: Record<TaskPriority, string> = {
  high: 'Alto impacto',
  medium: 'Medio impacto',
  low: 'Bajo impacto',
}

const statusIcons: Record<TaskStatus, React.ReactNode> = {
  pending: <Circle className="text-slate-400" size={20} />,
  in_progress: <Clock className="text-violet-500" size={20} />,
  completed: <CheckCircle2 className="text-green-500" size={20} />,
  blocked: <AlertTriangle className="text-red-500" size={20} />,
}

function TaskCard({ task }: { task: Task }) {
  const project = projects.find(p => p.id === task.projectId)
  const taskTags = tags.filter(t => task.tagIds.includes(t.id))

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <button className="mt-0.5 flex-shrink-0">
          {statusIcons[task.status]}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`font-medium ${task.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-900'}`}>
              {task.title}
            </h3>
            <button className="p-1 hover:bg-slate-100 rounded">
              <MoreHorizontal size={16} className="text-slate-400" />
            </button>
          </div>

          {task.notes && (
            <p className="text-sm text-slate-500 mt-1 line-clamp-2">{task.notes}</p>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className={`text-xs px-2 py-0.5 rounded-full border ${priorityColors[task.priority]}`}>
              {priorityLabels[task.priority]}
            </span>

            {project && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">
                {project.name}
              </span>
            )}

            {taskTags.map(tag => (
              <span key={tag.id} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {tag.name}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(task.deadline).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
            </span>
            {task.estimatedMinutes > 0 && (
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {Math.floor(task.estimatedMinutes / 60)}h {task.estimatedMinutes % 60}m
              </span>
            )}
            {task.progress > 0 && task.progress < 100 && (
              <span>{task.progress}%</span>
            )}
          </div>

          {task.progress > 0 && task.progress < 100 && (
            <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-500 rounded-full transition-all"
                style={{ width: `${task.progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function TasksPage() {
  const [view, setView] = useState<'priority' | 'list'>('priority')

  const highImpact = tasks.filter(t => t.priority === 'high' && t.status !== 'completed')
  const mediumImpact = tasks.filter(t => t.priority === 'medium' && t.status !== 'completed')
  const lowImpact = tasks.filter(t => t.priority === 'low' && t.status !== 'completed')
  const completed = tasks.filter(t => t.status === 'completed')

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>
            Tasks & Priorities
          </h1>
          <p className="text-slate-500 mt-1">
            {tasks.filter(t => t.status !== 'completed').length} tareas pendientes · {highImpact.length} de alto impacto
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setView('priority')}
              className={`p-2 rounded ${view === 'priority' ? 'bg-white shadow-sm' : ''}`}
            >
              <LayoutGrid size={18} className={view === 'priority' ? 'text-violet-600' : 'text-slate-400'} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded ${view === 'list' ? 'bg-white shadow-sm' : ''}`}
            >
              <List size={18} className={view === 'list' ? 'text-violet-600' : 'text-slate-400'} />
            </button>
          </div>

          <button className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">
            <Filter size={18} />
            <span className="text-sm">Filtrar</span>
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors">
            <Plus size={18} />
            <span className="text-sm font-medium">Nueva tarea</span>
          </button>
        </div>
      </div>

      {/* Pareto indicator */}
      <div className="bg-gradient-to-r from-violet-50 to-amber-50 border border-violet-100 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
            <span className="text-lg">🎯</span>
          </div>
          <div>
            <p className="font-medium text-slate-900">Principio de Pareto (80/20)</p>
            <p className="text-sm text-slate-600">
              {highImpact.length} tareas de alto impacto generarán el 80% de tus resultados
            </p>
          </div>
        </div>
      </div>

      {/* Priority columns */}
      {view === 'priority' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* High impact */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <h2 className="font-semibold text-slate-900">Alto impacto</h2>
              <span className="text-sm text-slate-500">({highImpact.length})</span>
            </div>
            <div className="space-y-3">
              {highImpact.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
              {highImpact.length === 0 && (
                <div className="text-center py-8 text-slate-400">
                  <p>No hay tareas de alto impacto</p>
                </div>
              )}
            </div>
          </div>

          {/* Medium impact */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-amber-500 rounded-full" />
              <h2 className="font-semibold text-slate-900">Medio impacto</h2>
              <span className="text-sm text-slate-500">({mediumImpact.length})</span>
            </div>
            <div className="space-y-3">
              {mediumImpact.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
              {mediumImpact.length === 0 && (
                <div className="text-center py-8 text-slate-400">
                  <p>No hay tareas de medio impacto</p>
                </div>
              )}
            </div>
          </div>

          {/* Low impact */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <h2 className="font-semibold text-slate-900">Bajo impacto</h2>
              <span className="text-sm text-slate-500">({lowImpact.length})</span>
            </div>
            <div className="space-y-3">
              {lowImpact.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
              {lowImpact.length === 0 && (
                <div className="text-center py-8 text-slate-400">
                  <p>No hay tareas de bajo impacto</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {[...highImpact, ...mediumImpact, ...lowImpact].map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}

      {/* Completed section */}
      {completed.length > 0 && (
        <div className="mt-8">
          <h2 className="font-semibold text-slate-900 mb-4">
            Completadas ({completed.length})
          </h2>
          <div className="space-y-3 opacity-60">
            {completed.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
