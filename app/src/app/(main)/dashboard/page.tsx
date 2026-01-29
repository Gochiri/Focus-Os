'use client'

import { useState } from 'react'
import { periodMetrics, aiInsights, achievements, motivationalCard, goalProgress } from '@/data/sample-data'
import { Period } from '@/types'
import {
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  Target,
  Flame,
  Sparkles,
  Award,
  Quote,
  X,
  ChevronRight
} from 'lucide-react'

const periods: { value: Period; label: string }[] = [
  { value: 'today', label: 'Hoy' },
  { value: 'week', label: 'Semana' },
  { value: 'month', label: 'Mes' },
]

function ProductivityGauge({ score, previousScore }: { score: number; previousScore: number }) {
  const diff = score - previousScore
  const isPositive = diff >= 0

  const circumference = 2 * Math.PI * 80
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="w-full h-full -rotate-90">
        <circle
          cx="96"
          cy="96"
          r="80"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="12"
        />
        <circle
          cx="96"
          cy="96"
          r="80"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>
          {score}
        </span>
        <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>{isPositive ? '+' : ''}{diff}%</span>
        </div>
      </div>
    </div>
  )
}

function MetricCard({
  icon,
  label,
  value,
  subvalue,
  trend,
  color
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  subvalue?: string
  trend?: number
  color: string
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className={`flex items-center gap-2 ${color} mb-2`}>
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      {subvalue && <p className="text-xs text-slate-500">{subvalue}</p>}
      {trend !== undefined && (
        <div className={`flex items-center gap-1 text-xs mt-1 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{trend >= 0 ? '+' : ''}{trend}% vs anterior</span>
        </div>
      )}
    </div>
  )
}

export default function DashboardPage() {
  const [period, setPeriod] = useState<Period>('today')
  const [insights, setInsights] = useState(aiInsights)

  const dismissInsight = (id: string) => {
    setInsights(prev => prev.filter(i => i.id !== id))
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>
            Dashboard
          </h1>
          <p className="text-slate-500 mt-1">Tu centro de métricas de productividad</p>
        </div>

        <div className="flex items-center bg-slate-100 rounded-lg p-1">
          {periods.map(p => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                period === p.value
                  ? 'bg-white shadow-sm text-slate-900'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main score */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 text-center">
              Score de Productividad
            </h2>
            <ProductivityGauge
              score={periodMetrics.productivityScore}
              previousScore={periodMetrics.previousScore}
            />
            <p className="text-sm text-slate-500 text-center mt-4">
              Basado en tareas, foco y consistencia
            </p>
          </div>

          {/* Motivational card */}
          <div className="bg-gradient-to-br from-violet-500 to-violet-700 rounded-xl p-6 mt-4 text-white">
            <Quote size={24} className="opacity-50 mb-3" />
            <p className="text-lg font-medium mb-2">"{motivationalCard.quote}"</p>
            <p className="text-sm opacity-75">— {motivationalCard.author}</p>
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-sm flex items-center gap-2">
                <Sparkles size={14} />
                {motivationalCard.aiInsight}
              </p>
            </div>
          </div>
        </div>

        {/* Metrics and insights */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard
              icon={<Clock size={18} />}
              label="Tiempo en foco"
              value={`${Math.floor(periodMetrics.focusMinutes / 60)}h ${periodMetrics.focusMinutes % 60}m`}
              trend={Math.round((periodMetrics.focusMinutes - periodMetrics.previousFocusMinutes) / periodMetrics.previousFocusMinutes * 100)}
              color="text-violet-500"
            />
            <MetricCard
              icon={<CheckCircle2 size={18} />}
              label="Tareas completadas"
              value={periodMetrics.tasksCompleted}
              subvalue={`${periodMetrics.highImpactCompleted}/${periodMetrics.highImpactTotal} alto impacto`}
              trend={Math.round((periodMetrics.tasksCompleted - periodMetrics.previousTasksCompleted) / periodMetrics.previousTasksCompleted * 100)}
              color="text-green-500"
            />
            <MetricCard
              icon={<Target size={18} />}
              label="Sesiones"
              value={periodMetrics.sessionsCompleted}
              trend={Math.round((periodMetrics.sessionsCompleted - periodMetrics.previousSessions) / periodMetrics.previousSessions * 100)}
              color="text-blue-500"
            />
            <MetricCard
              icon={<Flame size={18} />}
              label="Racha"
              value={`${periodMetrics.streakDays} días`}
              color="text-amber-500"
            />
          </div>

          {/* AI Insights */}
          {insights.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Sparkles size={18} className="text-violet-500" />
                Insights de IA
              </h2>
              <div className="space-y-3">
                {insights.map(insight => (
                  <div
                    key={insight.id}
                    className={`border rounded-xl p-4 flex items-start justify-between ${
                      insight.type === 'positive' ? 'bg-green-50 border-green-200' :
                      insight.type === 'suggestion' ? 'bg-blue-50 border-blue-200' :
                      insight.type === 'warning' ? 'bg-amber-50 border-amber-200' :
                      'bg-violet-50 border-violet-200'
                    }`}
                  >
                    <div>
                      <p className="font-medium text-slate-900">{insight.title}</p>
                      <p className="text-sm text-slate-600 mt-1">{insight.message}</p>
                    </div>
                    <button
                      onClick={() => dismissInsight(insight.id)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Goals progress */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">Progreso de metas</h2>
            <div className="space-y-3">
              {goalProgress.map(goal => (
                <div
                  key={goal.id}
                  className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-slate-900">{goal.title}</p>
                      <span className="text-sm text-slate-500">{goal.progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-violet-500 rounded-full transition-all"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      {goal.tasksCompleted}/{goal.tasksTotal} tareas · Vence {new Date(goal.dueDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                  <ChevronRight size={20} className="text-slate-300 group-hover:text-slate-500 ml-4" />
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Award size={18} className="text-amber-500" />
              Logros
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {achievements.map(achievement => (
                <div
                  key={achievement.id}
                  className={`border rounded-xl p-4 text-center ${
                    achievement.unlockedAt
                      ? 'bg-white border-slate-200'
                      : 'bg-slate-50 border-slate-200 opacity-50'
                  }`}
                >
                  <span className="text-3xl">{achievement.icon}</span>
                  <p className="font-medium text-slate-900 mt-2 text-sm">{achievement.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{achievement.description}</p>
                  {achievement.unlockedAt && (
                    <p className="text-xs text-green-600 mt-2">
                      Desbloqueado
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
