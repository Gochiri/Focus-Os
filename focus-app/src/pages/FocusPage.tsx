import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, Coffee, CheckCircle2 } from 'lucide-react'

export function FocusPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [sessionsCompleted, setSessionsCompleted] = useState(3)

  useEffect(() => {
    let interval: number | undefined

    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      if (!isBreak) {
        setSessionsCompleted(prev => prev + 1)
        setIsBreak(true)
        setTimeLeft(5 * 60) // 5 minute break
      } else {
        setIsBreak(false)
        setTimeLeft(25 * 60)
      }
      setIsRunning(false)
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, isBreak])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = isBreak
    ? ((5 * 60 - timeLeft) / (5 * 60)) * 100
    : ((25 * 60 - timeLeft) / (25 * 60)) * 100

  const reset = () => {
    setIsRunning(false)
    setTimeLeft(isBreak ? 5 * 60 : 25 * 60)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="text-center max-w-md w-full">
        {/* Session type indicator */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 ${
          isBreak
            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
            : 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400'
        }`}>
          {isBreak ? (
            <>
              <Coffee className="w-4 h-4" />
              <span className="font-medium">Descanso</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span className="font-medium">Sesión de foco</span>
            </>
          )}
        </div>

        {/* Timer circle */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-slate-200 dark:text-slate-800"
            />
            {/* Progress circle */}
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 120}
              strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
              className={`transition-all duration-1000 ${
                isBreak ? 'text-amber-500' : 'text-violet-500'
              }`}
            />
          </svg>

          {/* Time display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-slate-900 dark:text-slate-100 font-mono">
              {formatTime(timeLeft)}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              {isBreak ? 'hasta volver al trabajo' : 'de concentración'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={reset}
            className="p-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <RotateCcw className="w-6 h-6" />
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`p-6 rounded-full text-white shadow-lg transition-all hover:scale-105 ${
              isBreak
                ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/25'
                : 'bg-violet-600 hover:bg-violet-700 shadow-violet-600/25'
            }`}
          >
            {isRunning ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </button>

          <button
            onClick={() => {
              setIsBreak(!isBreak)
              setTimeLeft(isBreak ? 25 * 60 : 5 * 60)
              setIsRunning(false)
            }}
            className="p-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <Coffee className="w-6 h-6" />
          </button>
        </div>

        {/* Session stats */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p className="text-sm text-slate-500 dark:text-slate-400">Sesiones hoy</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {sessionsCompleted}
              </p>
            </div>
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i < sessionsCompleted
                      ? 'bg-violet-500'
                      : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500 dark:text-slate-400">Tiempo total</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {sessionsCompleted * 25}m
              </p>
            </div>
          </div>
        </div>

        {/* Current task */}
        <div className="mt-4 p-4 bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-xl">
          <p className="text-sm text-violet-600 dark:text-violet-400 mb-1">Trabajando en:</p>
          <p className="font-medium text-slate-900 dark:text-slate-100">
            Preparar presentación para inversores
          </p>
        </div>
      </div>
    </div>
  )
}
