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
import type { FocusSession, CalendarDay, FocusStats, DurationPreset } from '../../types'
import { DurationSelector } from './DurationSelector'
import { FocusCalendar } from './FocusCalendar'

export interface FocusModeDashboardProps {
    activeSession?: FocusSession
    focusStats: FocusStats
    durationPresets: DurationPreset[]
    focusSessions: FocusSession[]
    calendarDays: CalendarDay[]
    onStartSession?: (minutes: number, breakMinutes: number, taskId?: string) => void
    onSelectDay?: (date: string) => void
    onSelectTask?: () => void
}

export function FocusModeDashboard({
    activeSession,
    focusStats,
    durationPresets,
    focusSessions,
    calendarDays,
    onStartSession,
    onSelectDay,
    onSelectTask,
}: FocusModeDashboardProps) {
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

    const weeklyProgress = Math.round((focusStats.weeklyMinutes / (focusStats.weeklyGoal || 1)) * 100)

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
        <div className="py-6 sm:py-8 max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-10 text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 font-heading tracking-tight">
                    Focus Mode
                </h1>
                <p className="mt-2 text-slate-500 dark:text-slate-400 font-medium">
                    Entra en estado de Flow con sesiones de trabajo profundo
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-violet-100 dark:bg-violet-900/40 rounded-xl shadow-inner">
                            <Clock className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-slate-900 dark:text-slate-100 font-heading">
                                {formatTime(focusStats.todayMinutes)}
                            </p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Hoy en foco</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-amber-100 dark:bg-amber-900/40 rounded-xl shadow-inner">
                            <Flame className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-slate-900 dark:text-slate-100 font-heading">
                                {focusStats.currentStreak}
                            </p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Días racha</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl shadow-inner">
                            <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-slate-900 dark:text-slate-100 font-heading">
                                {focusStats.todaySessions}
                            </p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Sesiones hoy</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-blue-100 dark:bg-blue-900/40 rounded-xl shadow-inner">
                            <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-slate-900 dark:text-slate-100 font-heading">
                                {focusStats.averageSessionLength}m
                            </p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Avg sesión</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Main Control Panel */}
                <div className="lg:col-span-12 xl:col-span-8 space-y-8">
                    {/* Start Session Panel */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-8 font-heading uppercase tracking-widest text-center">
                            Nueva Sesión de Foco
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
                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={onSelectTask}
                                className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all border-2 border-transparent hover:border-violet-500/10"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                                        <Target className="w-5 h-5 text-violet-500" />
                                    </div>
                                    <span className="text-sm font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">
                                        {selectedTaskId ? 'Tarea vinculada' : 'Vincular a una tarea (opcional)'}
                                    </span>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        {/* Start Button */}
                        <button
                            onClick={() => onStartSession?.(selectedMinutes, selectedBreakMinutes, selectedTaskId)}
                            className="mt-8 w-full py-5 bg-gradient-to-r from-violet-600 to-violet-800 hover:from-violet-700 hover:to-violet-900 text-white font-bold rounded-2xl shadow-xl shadow-violet-500/30 flex items-center justify-center gap-4 transition-all duration-300 hover:scale-[1.02] active:scale-95 group font-heading uppercase tracking-widest"
                        >
                            <Play className="w-7 h-7 fill-white group-hover:animate-pulse" />
                            <span>Iniciar {selectedMinutes} minutos de potencia</span>
                        </button>
                    </div>

                    {/* Recent History Grid */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                                <Calendar className="w-5 h-5 text-slate-500" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-heading uppercase tracking-widest">
                                Historial Reciente
                            </h3>
                        </div>

                        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                            {recentSessions.map(session => (
                                <div
                                    key={session.id}
                                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`
                      w-3 h-3 rounded-full shadow-sm
                      ${session.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-400'}
                    `} />
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                                                {session.task?.title || 'Sesión libre'}
                                            </p>
                                            <p className="text-[10px] font-bold uppercase tracking-tight text-slate-400 mt-0.5">
                                                {session.date} • {session.startTime}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-black text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl shadow-sm">
                                        {session.durationMinutes}m
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Calendar & Weekly Stats Sidebar */}
                <div className="lg:col-span-12 xl:col-span-4 space-y-8">
                    {/* Weekly Progress Card */}
                    <div className="bg-gradient-to-br from-violet-600 to-violet-800 rounded-3xl p-8 text-white shadow-xl shadow-violet-500/20">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-widest text-white/90">
                                    Progreso Semanal
                                </span>
                            </div>
                            <span className="text-xs font-black bg-white/20 px-3 py-1.5 rounded-xl">
                                {weeklyProgress}%
                            </span>
                        </div>

                        <div className="mb-4">
                            <div className="h-4 bg-white/10 rounded-full overflow-hidden p-1">
                                <div
                                    className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${Math.min(weeklyProgress, 100)}%` }}
                                />
                            </div>
                        </div>

                        <p className="text-sm font-medium text-white/80 text-center">
                            {formatTime(focusStats.weeklyMinutes)} de {formatTime(focusStats.weeklyGoal)} completados
                        </p>
                    </div>

                    <FocusCalendar
                        calendarDays={calendarDays}
                        onSelectDay={onSelectDay}
                    />

                    {/* Best streak indicator */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-2xl shadow-inner">
                                <Flame className="w-6 h-6 text-amber-500" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Mejor Racha</p>
                                <p className="text-2xl font-black text-slate-900 dark:text-slate-100 font-heading">
                                    {focusStats.bestStreak} días
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                            <p className="text-xs font-bold text-slate-600 dark:text-slate-400 text-center">
                                {focusStats.currentStreak >= focusStats.bestStreak
                                    ? '🚀 ¡Estás batiendo récords!'
                                    : `🔥 Faltan ${focusStats.bestStreak - focusStats.currentStreak} días para récord`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
