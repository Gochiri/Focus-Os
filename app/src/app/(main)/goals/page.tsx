'use client'

import { useState } from 'react'
import { goals } from '@/data/sample-data'
import { Goal, GoalStatus } from '@/types'
import {
  Target,
  Calendar,
  CheckCircle2,
  Circle,
  Plus,
  ChevronRight,
  LayoutGrid,
  Columns
} from 'lucide-react'

const statusColors: Record<GoalStatus, string> = {
  por_iniciar: 'bg-slate-100 text-slate-600',
  en_progreso: 'bg-violet-100 text-violet-700',
  pausada: 'bg-amber-100 text-amber-700',
  completada: 'bg-green-100 text-green-700',
}

const statusLabels: Record<GoalStatus, string> = {
  por_iniciar: 'Por iniciar',
  en_progreso: 'En progreso',
  pausada: 'Pausada',
  completada: 'Completada',
}

const columns: { status: GoalStatus; title: string; color: string }[] = [
  { status: 'por_iniciar', title: 'Por iniciar', color: 'bg-slate-400' },
  { status: 'en_progreso', title: 'En progreso', color: 'bg-violet-500' },
  { status: 'pausada', title: 'Pausada', color: 'bg-amber-500' },
  { status: 'completada', title: 'Completada', color: 'bg-green-500' },
]

function GoalCard({ goal }: { goal: Goal }) {
  const completedMilestones = goal.milestones.filter(m => m.completed).length
  const totalMilestones = goal.milestones.length

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[goal.status]}`}>
          {statusLabels[goal.status]}
        </span>
        <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
      </div>

      <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">{goal.title}</h3>

      <p className="text-sm text-slate-500 mb-4 line-clamp-2">{goal.description}</p>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-slate-500">Progreso</span>
          <span className="font-medium text-slate-900">{goal.progress}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-violet-500 rounded-full transition-all"
            style={{ width: `${goal.progress}%` }}
          />
        </div>
      </div>

      {/* Milestones */}
      {totalMilestones > 0 && (
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
          <CheckCircle2 size={14} />
          <span>{completedMilestones}/{totalMilestones} hitos</span>
        </div>
      )}

      {/* Due date and tags */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <Calendar size={12} />
          <span>{new Date(goal.dueDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>
        <div className="flex gap-1">
          {goal.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function GoalsPage() {
  const [view, setView] = useState<'kanban' | 'grid'>('kanban')

  const goalsByStatus = columns.map(col => ({
    ...col,
    goals: goals.filter(g => g.status === col.status),
  }))

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>
            Goals & Planning
          </h1>
          <p className="text-slate-500 mt-1">
            {goals.length} metas · {goals.filter(g => g.status === 'en_progreso').length} en progreso
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setView('kanban')}
              className={`p-2 rounded ${view === 'kanban' ? 'bg-white shadow-sm' : ''}`}
            >
              <Columns size={18} className={view === 'kanban' ? 'text-violet-600' : 'text-slate-400'} />
            </button>
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded ${view === 'grid' ? 'bg-white shadow-sm' : ''}`}
            >
              <LayoutGrid size={18} className={view === 'grid' ? 'text-violet-600' : 'text-slate-400'} />
            </button>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors">
            <Plus size={18} />
            <span className="text-sm font-medium">Nueva meta</span>
          </button>
        </div>
      </div>

      {/* SMART/RPM info */}
      <div className="bg-gradient-to-r from-violet-50 to-amber-50 border border-violet-100 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
            <Target size={20} className="text-violet-600" />
          </div>
          <div>
            <p className="font-medium text-slate-900">Metodología SMART + RPM</p>
            <p className="text-sm text-slate-600">
              Define metas específicas, medibles, alcanzables, relevantes y con tiempo límite
            </p>
          </div>
        </div>
      </div>

      {/* Kanban view */}
      {view === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {goalsByStatus.map(column => (
            <div key={column.status} className="bg-slate-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-3 h-3 ${column.color} rounded-full`} />
                <h2 className="font-semibold text-slate-900">{column.title}</h2>
                <span className="text-sm text-slate-500">({column.goals.length})</span>
              </div>

              <div className="space-y-3">
                {column.goals.map(goal => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}

                {column.goals.length === 0 && (
                  <div className="text-center py-8 text-slate-400">
                    <Circle size={24} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Sin metas</p>
                  </div>
                )}

                <button className="w-full py-2 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 hover:border-violet-300 hover:text-violet-500 transition-colors text-sm">
                  + Agregar meta
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map(goal => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      )}
    </div>
  )
}
