import { useState, useEffect } from 'react'
import { FocusModeDashboard } from '../components/focus/FocusModeDashboard'
import { focusService } from '../services/focusService'
import { taskService } from '../services/taskService'
import type { FocusSession, FocusStats, DurationPreset, Task } from '../types'
import { Play, Pause, X, Zap, Coffee, RotateCcw } from 'lucide-react'

const DURATION_PRESETS: DurationPreset[] = [
  { id: 'p1', label: 'Eficacia Pomodoro', minutes: 25, breakMinutes: 5, isRecommended: true, aiReason: 'Ideal para tareas que requieren alta concentración sin fatiga.' },
  { id: 'p2', label: 'Enfoque Profundo', minutes: 50, breakMinutes: 10 },
  { id: 'p3', label: 'Ultra Foco', minutes: 90, breakMinutes: 15 },
  { id: 'p4', label: 'Sprint Corto', minutes: 15, breakMinutes: 3 },
]

export function FocusPage() {
  const [sessions, setSessions] = useState<FocusSession[]>([])
  const [stats, setStats] = useState<FocusStats>({
    todayMinutes: 0,
    todaySessions: 0,
    currentStreak: 0,
    bestStreak: 0,
    weeklyMinutes: 0,
    weeklyGoal: 1500,
    averageSessionLength: 0
  })
  const [loading, setLoading] = useState(true)
  const [activeTaskId, setActiveTaskId] = useState<string | undefined>()
  const [availableTasks, setAvailableTasks] = useState<Task[]>([])
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  
  // Timer State
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const [sessionType, setSessionType] = useState<'work' | 'break'>('work')

  useEffect(() => {
    loadData()
    const unsubscribe = focusService.subscribeToFocusSessions(() => loadData())
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && isTimerRunning) {
      handleSessionComplete()
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timeLeft])

  const loadData = async () => {
    try {
      setLoading(true)
      const [recentSessions, allTasks] = await Promise.all([
        focusService.getRecentSessions(),
        taskService.getTasks()
      ])
      setSessions(recentSessions)
      setAvailableTasks(allTasks.filter(t => t.status !== 'completed'))
      
      const today = new Date().toISOString().split('T')[0]
      const todaySessions = recentSessions.filter(s => s.date === today && s.status === 'completed')
      const todayMinutes = todaySessions.reduce((acc, s) => acc + s.durationMinutes, 0)
      
      setStats(prev => ({
        ...prev,
        todayMinutes,
        todaySessions: todaySessions.length,
        averageSessionLength: recentSessions.length > 0 
          ? Math.round(recentSessions.reduce((acc, s) => acc + s.durationMinutes, 0) / recentSessions.length)
          : 0
      }))
    } catch (err) {
      console.error('Failed to load focus data', err)
    } finally {
      setLoading(false)
    }
  }

  const handleStartSession = async (minutes: number) => {
    if (sessionType === 'break') {
      setTotalTime(minutes * 60)
      setTimeLeft(minutes * 60)
      setIsTimerRunning(true)
      return
    }

    const start = new Date().toISOString()
    try {
      const selectedTask = availableTasks.find(t => t.id === activeTaskId)
      const newSession = await focusService.createSession({
        date: start.split('T')[0],
        startTime: start,
        endTime: null as any,
        durationMinutes: minutes,
        breakMinutes: 5, // Default
        status: 'in_progress',
        task: selectedTask ? { id: selectedTask.id, title: selectedTask.title } : null,
        pauseCount: 0,
        notes: null
      })
      
      setCurrentSessionId(newSession.id)
      setTotalTime(minutes * 60)
      setTimeLeft(minutes * 60)
      setIsTimerRunning(true)
      setSessionType('work')
    } catch (err) {
      console.error('Failed to start session', err)
    }
  }

  const handleSessionComplete = async () => {
    setIsTimerRunning(false)
    if (currentSessionId && sessionType === 'work') {
      await focusService.updateSession(currentSessionId, {
        status: 'completed',
        endTime: new Date().toISOString()
      })
      alert('¡Sesión completada! Tómate un respiro.')
      setSessionType('break')
      const preset = DURATION_PRESETS.find(p => p.minutes === totalTime / 60)
      setTimeLeft((preset?.breakMinutes || 5) * 60)
      setTotalTime((preset?.breakMinutes || 5) * 60)
    } else {
      alert('¡Descanso terminado!')
      setSessionType('work')
      setTimeLeft(0)
    }
    setCurrentSessionId(null)
    loadData()
  }

  const handleCancelSession = () => {
    if (window.confirm('¿Cancelar sesión actual?')) {
      setIsTimerRunning(false)
      setTimeLeft(0)
      setCurrentSessionId(null)
      setSessionType('work')
    }
  }

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0

  if (isTimerRunning || timeLeft > 0) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
        <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-2xl border border-slate-200 dark:border-slate-800 text-center">
          <div className="mb-8">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest ${sessionType === 'work' ? 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'}`}>
              {sessionType === 'work' ? <Zap className="w-3.5 h-3.5 fill-current" /> : <Coffee className="w-3.5 h-3.5" />}
              {sessionType === 'work' ? 'Trabajo Profundo' : 'Descanso'}
            </span>
            {activeTaskId && sessionType === 'work' && (
               <p className="mt-4 text-sm font-bold text-slate-500 dark:text-slate-400 truncate px-4">
                 Foco en: {availableTasks.find(t => t.id === activeTaskId)?.title}
               </p>
            )}
          </div>

          <div className="relative w-64 h-64 mx-auto mb-10">
            <svg className="w-full h-full -rotate-90">
              <circle cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-slate-800" />
              <circle
                cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="12" fill="transparent"
                strokeDasharray={2 * Math.PI * 120}
                strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                strokeLinecap="round"
                className={`transition-all duration-1000 ${sessionType === 'work' ? 'text-violet-600' : 'text-emerald-500'}`}
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
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all font-heading"
            >
              {isTimerRunning ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
            </button>
            <button
              onClick={handleCancelSession}
              className="w-16 h-16 rounded-3xl bg-violet-600 text-white flex items-center justify-center hover:bg-violet-700 transition-all shadow-lg shadow-violet-500/30"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <FocusModeDashboard
        focusStats={stats}
        durationPresets={DURATION_PRESETS}
        focusSessions={sessions}
        calendarDays={[]}
        onStartSession={handleStartSession}
        onSelectTask={() => setIsTaskModalOpen(true)}
      />

      {isTaskModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg max-h-[80vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Seleccionar Tarea</h3>
              <button onClick={() => setIsTaskModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {availableTasks.length === 0 && <p className="text-center text-slate-500 py-8">No hay tareas pendientes.</p>}
              {availableTasks.map(task => (
                <button
                  key={task.id}
                  onClick={() => {
                    setActiveTaskId(task.id)
                    setIsTaskModalOpen(false)
                  }}
                  className={`w-full text-left p-4 rounded-2xl transition-all border-2 ${
                    activeTaskId === task.id 
                      ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20' 
                      : 'border-transparent bg-slate-50 dark:bg-slate-800/40 hover:border-slate-200'
                  }`}
                >
                  <p className="font-bold text-slate-900 dark:text-slate-100">{task.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-bold uppercase text-slate-400">{task.priority} impact</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
               <button 
                onClick={() => { setActiveTaskId(undefined); setIsTaskModalOpen(false); }}
                className="w-full py-3 text-sm font-bold text-slate-500 hover:text-slate-700 uppercase tracking-widest"
               >
                 Continuar sin tarea específica
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}