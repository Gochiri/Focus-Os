import { useState, useEffect } from 'react'
import { FocusModeDashboard } from '../components/focus/FocusModeDashboard'
import type { FocusSession, CalendarDay, FocusStats, DurationPreset } from '../types'
import { Timer, Play, Pause, RotateCcw, Coffee, Zap } from 'lucide-react'

const durationPresets: DurationPreset[] = [
  { id: 'p1', label: 'Eficacia Pomodoro', minutes: 25, breakMinutes: 5, isRecommended: true, aiReason: 'Ideal para tareas que requieren alta concentración sin fatiga.' },
  { id: 'p2', label: 'Enfoque Profundo', minutes: 50, breakMinutes: 10 },
  { id: 'p3', label: 'Ultra Foco', minutes: 90, breakMinutes: 15 },
  { id: 'p4', label: 'Sprint Corto', minutes: 15, breakMinutes: 3 },
]

const mockStats: FocusStats = {
  todayMinutes: 240,
  todaySessions: 8,
  currentStreak: 15,
  bestStreak: 21,
  weeklyMinutes: 1250,
  weeklyGoal: 1500,
  averageSessionLength: 32
}

const mockSessions: FocusSession[] = [
  { id: 's1', date: 'Hoy', startTime: '10:00', durationMinutes: 25, status: 'completed', task: { id: 't1', title: 'Diseño de UI Premium' } },
  { id: 's2', date: 'Hoy', startTime: '11:30', durationMinutes: 50, status: 'completed', task: { id: 't2', title: 'Refactor types.ts' } },
  { id: 's3', date: 'Ayer', startTime: '09:00', durationMinutes: 25, status: 'completed' },
  { id: 's4', date: 'Ayer', startTime: '15:00', durationMinutes: 90, status: 'completed' },
]

const mockCalendarDays: CalendarDay[] = [
  { date: '2024-01-20', totalMinutes: 120, sessionCount: 4 },
  { date: '2024-01-21', totalMinutes: 180, sessionCount: 6 },
  { date: '2024-01-22', totalMinutes: 45, sessionCount: 2 },
  { date: '2024-01-23', totalMinutes: 240, sessionCount: 8 },
  { date: '2024-01-24', totalMinutes: 150, sessionCount: 5 },
  { date: '2024-01-25', totalMinutes: 300, sessionCount: 10 },
  { date: '2024-01-26', totalMinutes: 90, sessionCount: 3 },
  { date: '2024-01-27', totalMinutes: 210, sessionCount: 7 },
  { date: '2024-01-28', totalMinutes: 240, sessionCount: 8 },
]

export function FocusPage() {
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [totalTime, setTotalTime] = useState(25 * 60)
  const [mode, setMode] = useState<'work' | 'break'>('work')

  useEffect(() => {
    let interval: any = null
    if (isActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      clearInterval(interval)
      handleSessionComplete()
    }
    return () => clearInterval(interval)
  }, [isActive, isPaused, timeLeft])

  const handleStart = (minutes: number, breakMinutes: number) => {
    setTotalTime(minutes * 60)
    setTimeLeft(minutes * 60)
    setIsActive(true)
    setIsPaused(false)
    setMode('work')
  }

  const handleSessionComplete = () => {
    setIsActive(false)
    alert(mode === 'work' ? '¡Sesión de foco completada! Tómate un respiro.' : '¡Descanso terminado! ¿Listo para otro bloque?')
  }

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const progress = ((totalTime - timeLeft) / totalTime) * 100

  if (isActive) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
        <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-2xl border border-slate-200 dark:border-slate-800 text-center">
          <div className="mb-8">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest ${mode === 'work' ? 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'}`}>
              {mode === 'work' ? <Zap className="w-3.5 h-3.5 fill-current" /> : <Coffee className="w-3.5 h-3.5" />}
              {mode === 'work' ? 'Trabajo Profundo' : 'Descanso'}
            </span>
          </div>

          <div className="relative w-64 h-64 mx-auto mb-10">
            {/* SVG Progress Circle */}
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-slate-100 dark:text-slate-800"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 120}
                strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                strokeLinecap="round"
                className={`transition-all duration-1000 ${mode === 'work' ? 'text-violet-600' : 'text-emerald-500'}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl font-black font-heading text-slate-900 dark:text-slate-100 tracking-tighter">
                {formatTimer(timeLeft)}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Restante</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all font-heading"
            >
              {isPaused ? <Play className="w-6 h-6 fill-current" /> : <Pause className="w-6 h-6 fill-current" />}
            </button>
            <button
              onClick={() => { setIsActive(false); setTimeLeft(25 * 60); }}
              className="w-16 h-16 rounded-3xl bg-violet-600 text-white flex items-center justify-center hover:bg-violet-700 transition-all shadow-lg shadow-violet-500/30"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-10 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800/50">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-relaxed">
              "No te detengas cuando estés cansado, detente cuando hayas terminado."
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <FocusModeDashboard
        focusStats={mockStats}
        durationPresets={durationPresets}
        focusSessions={mockSessions}
        calendarDays={mockCalendarDays}
        onStartSession={handleStart}
        onSelectDay={(date) => console.log('Selected date:', date)}
        onSelectTask={() => console.log('Select task')}
      />
    </div>
  )
}
