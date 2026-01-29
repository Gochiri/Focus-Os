'use client'

import { useState, useEffect } from 'react'
import { focusSessions, focusStats, tasks } from '@/data/sample-data'
import {
  Play,
  Pause,
  Square,
  SkipForward,
  Clock,
  Flame,
  Target,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Coffee
} from 'lucide-react'

type TimerStatus = 'idle' | 'running' | 'paused' | 'break'

const durations = [
  { minutes: 15, label: '15 min', description: 'Rápido' },
  { minutes: 25, label: '25 min', description: 'Clásico', recommended: true },
  { minutes: 45, label: '45 min', description: 'Profundo' },
  { minutes: 60, label: '60 min', description: 'Maratón' },
]

export default function FocusPage() {
  const [status, setStatus] = useState<TimerStatus>('idle')
  const [selectedDuration, setSelectedDuration] = useState(25)
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [selectedTask, setSelectedTask] = useState<string | null>(null)

  const pendingTasks = tasks.filter(t => t.status !== 'completed')

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (status === 'running' || status === 'break') {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setStatus('idle')
            return selectedDuration * 60
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [status, selectedDuration])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = ((selectedDuration * 60 - timeLeft) / (selectedDuration * 60)) * 100

  const handleStart = () => {
    setTimeLeft(selectedDuration * 60)
    setStatus('running')
  }

  const handlePause = () => {
    setStatus(status === 'paused' ? 'running' : 'paused')
  }

  const handleStop = () => {
    setStatus('idle')
    setTimeLeft(selectedDuration * 60)
  }

  const handleBreak = () => {
    setTimeLeft(5 * 60)
    setStatus('break')
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>
            Focus Mode
          </h1>
          <p className="text-slate-500 mt-1">Sesiones de trabajo enfocado estilo Pomodoro</p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="flex items-center gap-2 text-violet-500 mb-2">
            <Clock size={18} />
            <span className="text-sm font-medium">Hoy</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {Math.floor(focusStats.todayMinutes / 60)}h {focusStats.todayMinutes % 60}m
          </p>
          <p className="text-xs text-slate-500">{focusStats.todaySessions} sesiones</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="flex items-center gap-2 text-amber-500 mb-2">
            <Flame size={18} />
            <span className="text-sm font-medium">Racha</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{focusStats.currentStreak} días</p>
          <p className="text-xs text-slate-500">Mejor: {focusStats.bestStreak} días</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="flex items-center gap-2 text-green-500 mb-2">
            <Target size={18} />
            <span className="text-sm font-medium">Esta semana</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {Math.floor(focusStats.weeklyMinutes / 60)}h
          </p>
          <p className="text-xs text-slate-500">Meta: {focusStats.weeklyGoal / 60}h</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="flex items-center gap-2 text-blue-500 mb-2">
            <Calendar size={18} />
            <span className="text-sm font-medium">Progreso</span>
          </div>
          <div className="mt-2">
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${(focusStats.weeklyMinutes / focusStats.weeklyGoal) * 100}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {Math.round((focusStats.weeklyMinutes / focusStats.weeklyGoal) * 100)}% de la meta
            </p>
          </div>
        </div>
      </div>

      {/* Timer section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-8">
        {status === 'idle' ? (
          <>
            {/* Duration selector */}
            <div className="mb-8">
              <p className="text-sm font-medium text-slate-500 mb-4 text-center">Selecciona la duración</p>
              <div className="grid grid-cols-4 gap-3">
                {durations.map(d => (
                  <button
                    key={d.minutes}
                    onClick={() => {
                      setSelectedDuration(d.minutes)
                      setTimeLeft(d.minutes * 60)
                    }}
                    className={`relative p-4 rounded-xl border-2 transition-all ${
                      selectedDuration === d.minutes
                        ? 'border-violet-500 bg-violet-50'
                        : 'border-slate-200 hover:border-violet-200'
                    }`}
                  >
                    {d.recommended && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 bg-violet-500 text-white rounded-full">
                        Recomendado
                      </span>
                    )}
                    <p className="text-2xl font-bold text-slate-900">{d.label}</p>
                    <p className="text-xs text-slate-500">{d.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Task selector */}
            <div className="mb-8">
              <p className="text-sm font-medium text-slate-500 mb-3">Tarea a trabajar (opcional)</p>
              <select
                value={selectedTask || ''}
                onChange={(e) => setSelectedTask(e.target.value || null)}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="">Sin tarea específica</option>
                {pendingTasks.map(task => (
                  <option key={task.id} value={task.id}>{task.title}</option>
                ))}
              </select>
            </div>

            {/* Start button */}
            <button
              onClick={handleStart}
              className="w-full py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-3"
            >
              <Play size={24} />
              Iniciar sesión de {selectedDuration} minutos
            </button>
          </>
        ) : (
          <>
            {/* Timer display */}
            <div className="text-center mb-8">
              {status === 'break' && (
                <div className="flex items-center justify-center gap-2 mb-4 text-green-600">
                  <Coffee size={20} />
                  <span className="font-medium">Tiempo de descanso</span>
                </div>
              )}

              <div className="relative w-64 h-64 mx-auto mb-6">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="8"
                  />
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    fill="none"
                    stroke={status === 'break' ? '#22c55e' : '#7c3aed'}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 120}
                    strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>
                    {formatTime(timeLeft)}
                  </span>
                  <span className="text-sm text-slate-500 mt-2">
                    {status === 'paused' ? 'En pausa' : status === 'break' ? 'Descanso' : 'Enfocado'}
                  </span>
                </div>
              </div>

              {selectedTask && (
                <p className="text-sm text-slate-600 mb-4">
                  Trabajando en: <span className="font-medium">{tasks.find(t => t.id === selectedTask)?.title}</span>
                </p>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handlePause}
                className="p-4 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
              >
                {status === 'paused' ? <Play size={24} /> : <Pause size={24} />}
              </button>

              <button
                onClick={handleStop}
                className="p-4 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-colors"
              >
                <Square size={24} />
              </button>

              {status !== 'break' && (
                <button
                  onClick={handleBreak}
                  className="p-4 bg-green-100 hover:bg-green-200 text-green-600 rounded-full transition-colors"
                >
                  <Coffee size={24} />
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Recent sessions */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Sesiones recientes</h2>
        <div className="space-y-3">
          {focusSessions.map(session => (
            <div key={session.id} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  session.status === 'completed' ? 'bg-green-100' : 'bg-amber-100'
                }`}>
                  {session.status === 'completed' ? (
                    <Clock size={18} className="text-green-600" />
                  ) : (
                    <Pause size={18} className="text-amber-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-slate-900">
                    {session.task?.title || 'Sesión libre'}
                  </p>
                  <p className="text-sm text-slate-500">
                    {new Date(session.startTime).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} - {session.durationMinutes} min
                  </p>
                </div>
              </div>
              <span className={`text-sm px-3 py-1 rounded-full ${
                session.status === 'completed'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {session.status === 'completed' ? 'Completada' : 'Interrumpida'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
