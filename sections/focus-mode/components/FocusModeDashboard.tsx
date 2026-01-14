import { useState } from 'react'
import {
  Play,
  Clock,
  Flame,
  Target,
  TrendingUp,
  Calendar,
  Zap,
  ChevronRight,
} from 'lucide-react'
import type { FocusModeProps, DurationPreset } from '@/../product/sections/focus-mode/types'
import { DurationSelector } from './DurationSelector'
import { FocusCalendar } from './FocusCalendar'

export function FocusModeDashboard({
  activeSession,
  focusStats,
  durationPresets,
  focusSessions,
  calendarDays,
  onStartSession,
  onSelectDay,
  onSelectTask,
}: FocusModeProps) {
  const [selectedMinutes, setSelectedMinutes] = useState(durationPresets.find(p => p.isRecommended)?.minutes || 25)
  const [selectedBreakMinutes, setSelectedBreakMinutes] = useState(durationPresets.find(p => p.isRecommended)?.breakMinutes || 5)
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>()

  const handleSelectPreset = (preset: DurationPreset) => {
    setSelectedMinutes(preset.minutes)
    setSelectedBreakMinutes(preset.breakMinutes)
  }

  const handleCustomDuration = (minutes: number, breakMinutes: number) => {
    setSelectedMinutes(minutes)
    setSelectedBreakMinutes(breakMinutes)
  }

  const weeklyProgress = Math.round((focusStats.weeklyMinutes / focusStats.weeklyGoal) * 100)

  // Get recent sessions for the history list
  const recentSessions = focusSessions.slice(0, 5)

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Focus Mode
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Sesiones de trabajo enfocado con técnica Pomodoro
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-violet-100 dark:bg-violet-900/30 rounded-xl">
                <Clock className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {formatTime(focusStats.todayMinutes)}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Hoy en foco</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                <Flame className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {focusStats.currentStreak}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Días de racha</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {focusStats.todaySessions}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Sesiones hoy</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {focusStats.averageSessionLength}m
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Promedio sesión</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Progreso semanal
              </span>
            </div>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {formatTime(focusStats.weeklyMinutes)} / {formatTime(focusStats.weeklyGoal)}
            </span>
          </div>
          <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-violet-600 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(weeklyProgress, 100)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {weeklyProgress >= 100
              ? '¡Meta semanal alcanzada!'
              : `${100 - weeklyProgress}% para alcanzar tu meta semanal`
            }
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Start Session Panel */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Iniciar sesión de foco
              </h2>

              {/* Duration Selector */}
              <DurationSelector
                presets={durationPresets}
                selectedMinutes={selectedMinutes}
                selectedBreakMinutes={selectedBreakMinutes}
                onSelectPreset={handleSelectPreset}
                onCustomDuration={handleCustomDuration}
              />

              {/* Task selector */}
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={onSelectTask}
                  className="w-full flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-slate-400" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Vincular a una tarea (opcional)
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Start Button */}
              <button
                onClick={() => onStartSession?.(selectedMinutes, selectedBreakMinutes, selectedTaskId)}
                className="mt-6 w-full py-4 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25 flex items-center justify-center gap-3 transition-all duration-200 hover:scale-[1.02]"
              >
                <Play className="w-6 h-6" />
                <span>Iniciar {selectedMinutes} minutos de foco</span>
              </button>
            </div>

            {/* Recent Sessions */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-slate-400" />
                <h3 className="font-medium text-slate-900 dark:text-slate-100">
                  Sesiones recientes
                </h3>
              </div>
              <div className="space-y-2">
                {recentSessions.map(session => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-2 h-2 rounded-full
                        ${session.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500'}
                      `} />
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {session.task?.title || 'Sesión libre'}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {session.date} • {session.startTime}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {session.durationMinutes}m
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div>
            <FocusCalendar
              calendarDays={calendarDays}
              onSelectDay={onSelectDay}
            />

            {/* Best streak */}
            <div className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <Flame className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                    Mejor racha: {focusStats.bestStreak} días
                  </p>
                  <p className="text-xs text-amber-600 dark:text-amber-400">
                    {focusStats.currentStreak >= focusStats.bestStreak
                      ? '¡Estás en tu mejor momento!'
                      : `Te faltan ${focusStats.bestStreak - focusStats.currentStreak} días para superarla`
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
