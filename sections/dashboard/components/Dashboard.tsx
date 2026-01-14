import { Flame } from 'lucide-react'
import type { DashboardProps, Period } from '@/../product/sections/dashboard/types'
import { ProductivityGauge } from './ProductivityGauge'
import { MetricCard } from './MetricCard'
import { TrendChart } from './TrendChart'
import { GoalProgressCard } from './GoalProgressCard'
import { MotivationalCard } from './MotivationalCard'
import { AIInsightCard } from './AIInsightCard'
import { AchievementBadge } from './AchievementBadge'

const periodLabels: Record<Period, string> = {
  today: 'Hoy',
  week: 'Esta semana',
  month: 'Este mes',
}

export function Dashboard({
  currentPeriod,
  metrics,
  trendData,
  goalProgress,
  motivationalCard,
  achievements,
  aiInsights,
  onPeriodChange,
  onGoalClick,
  onAchievementClick,
  onDismissInsight,
  onRefreshMotivation,
}: DashboardProps) {
  const currentMetrics = metrics[currentPeriod]
  const periodLabel = periodLabels[currentPeriod]

  const formatFocusTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours === 0) return `${mins}min`
    if (mins === 0) return `${hours}h`
    return `${hours}h ${mins}m`
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Tu resumen de productividad
          </p>
        </div>

        {/* Period Toggle */}
        <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {(['today', 'week', 'month'] as Period[]).map((period) => (
            <button
              key={period}
              onClick={() => onPeriodChange?.(period)}
              className={`
                px-4 py-2 text-sm font-medium rounded-lg transition-all
                ${currentPeriod === period
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }
              `}
            >
              {periodLabels[period]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Main Stats */}
        <div className="lg:col-span-4 space-y-6">
          {/* Productivity Gauge */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <ProductivityGauge
              score={currentMetrics.productivityScore}
              previousScore={currentMetrics.previousScore}
              periodLabel={periodLabel}
            />
          </div>

          {/* Streak */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/20">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <p className="text-3xl font-bold">{currentMetrics.streakDays}</p>
                <p className="text-sm text-white/80">días de racha</p>
              </div>
            </div>
          </div>

          {/* Trend Chart */}
          <TrendChart data={trendData} />
        </div>

        {/* Center Column - Metrics & Goals */}
        <div className="lg:col-span-5 space-y-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            <MetricCard
              label="Tiempo en foco"
              value={formatFocusTime(currentMetrics.focusMinutes)}
              previousValue={currentMetrics.previousFocusMinutes}
              icon="clock"
              color="violet"
            />
            <MetricCard
              label="Sesiones"
              value={currentMetrics.sessionsCompleted}
              previousValue={currentMetrics.previousSessions}
              icon="target"
              color="blue"
            />
            <MetricCard
              label="Tareas completadas"
              value={currentMetrics.tasksCompleted}
              previousValue={currentMetrics.previousTasksCompleted}
              icon="check"
              color="emerald"
            />
            <MetricCard
              label="Alto impacto"
              value={`${currentMetrics.highImpactCompleted}/${currentMetrics.highImpactTotal}`}
              icon="flame"
              color="amber"
            />
          </div>

          {/* Goal Progress */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Progreso de metas
            </h3>
            <div className="space-y-3">
              {goalProgress.slice(0, 4).map((goal) => (
                <GoalProgressCard
                  key={goal.id}
                  goal={goal}
                  onClick={() => onGoalClick?.(goal.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Motivation & Insights */}
        <div className="lg:col-span-3 space-y-6">
          {/* Motivational Card */}
          <MotivationalCard
            card={motivationalCard}
            onRefresh={onRefreshMotivation}
          />

          {/* AI Insights */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Insights de la IA
            </h3>
            <div className="space-y-3">
              {aiInsights.map((insight) => (
                <AIInsightCard
                  key={insight.id}
                  insight={insight}
                  onDismiss={() => onDismissInsight?.(insight.id)}
                />
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Logros
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {achievements.slice(0, 6).map((achievement) => (
                <AchievementBadge
                  key={achievement.id}
                  achievement={achievement}
                  onClick={() => onAchievementClick?.(achievement.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
