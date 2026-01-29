import { Flame } from 'lucide-react'
import type { Period, PeriodMetrics, TrendDataPoint, GoalProgress, MotivationalCard as MotivationalCardType, Achievement, AIInsight } from '../../types'
import { ProductivityGauge } from './ProductivityGauge'
import { MetricCard } from './MetricCard'
import { TrendChart } from './TrendChart'
import { GoalProgressCard } from './GoalProgressCard'
import { MotivationalCard } from './MotivationalCard'
import { AIInsightCard } from './AIInsightCard'
import { AchievementBadge } from './AchievementBadge'

export interface DashboardProps {
    currentPeriod: Period
    metrics: Record<Period, PeriodMetrics>
    trendData: TrendDataPoint[]
    goalProgress: GoalProgress[]
    motivationalCard: MotivationalCardType
    achievements: Achievement[]
    aiInsights: AIInsight[]
    onPeriodChange?: (period: Period) => void
    onGoalClick?: (goalId: string) => void
    onAchievementClick?: (achievementId: string) => void
    onDismissInsight?: (insightId: string) => void
    onRefreshMotivation?: () => void
}

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
        <div className="max-w-6xl mx-auto py-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 font-heading">
                        Panel de Control
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Tu rendimiento y progreso en tiempo real
                    </p>
                </div>

                {/* Period Toggle */}
                <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    {(['today', 'week', 'month'] as Period[]).map((period) => (
                        <button
                            key={period}
                            onClick={() => onPeriodChange?.(period)}
                            className={`
                px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200
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
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm transition-shadow hover:shadow-md">
                        <ProductivityGauge
                            score={currentMetrics.productivityScore}
                            previousScore={currentMetrics.previousScore}
                            periodLabel={periodLabel}
                        />
                    </div>

                    {/* Streak */}
                    <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg shadow-amber-500/20">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                                <Flame className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-4xl font-bold font-heading">{currentMetrics.streakDays}</p>
                                <p className="text-sm font-medium text-white/80 uppercase tracking-wider">días de racha</p>
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
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-5 font-heading uppercase text-xs tracking-widest">
                            Progreso de metas
                        </h3>
                        <div className="space-y-4">
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
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-5 font-heading uppercase text-xs tracking-widest">
                            Insights de IA
                        </h3>
                        <div className="space-y-4">
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
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-5 font-heading uppercase text-xs tracking-widest">
                            Logros
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
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
