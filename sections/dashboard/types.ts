// =============================================================================
// Data Types
// =============================================================================

export type Period = 'today' | 'week' | 'month'

export type GoalStatus = 'por_iniciar' | 'en_progreso' | 'pausada' | 'completada'

export type InsightType = 'positive' | 'suggestion' | 'warning' | 'celebration'

export type InsightPriority = 'high' | 'medium' | 'low'

export type AchievementCategory = 'streak' | 'habit' | 'productivity' | 'focus' | 'goals'

export interface PeriodMetrics {
  productivityScore: number
  previousScore: number
  focusMinutes: number
  previousFocusMinutes: number
  sessionsCompleted: number
  previousSessions: number
  tasksCompleted: number
  previousTasksCompleted: number
  highImpactCompleted: number
  highImpactTotal: number
  streakDays: number
}

export interface TrendDataPoint {
  date: string
  score: number
  focusMinutes: number
}

export interface GoalProgress {
  id: string
  title: string
  progress: number
  dueDate: string
  status: GoalStatus
  tasksCompleted: number
  tasksTotal: number
}

export interface MotivationalCard {
  quote: string
  author: string
  aiInsight: string
  date: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: string | null
  category: AchievementCategory
}

export interface AIInsight {
  id: string
  type: InsightType
  title: string
  message: string
  priority: InsightPriority
}

export interface AllMetrics {
  today: PeriodMetrics
  week: PeriodMetrics
  month: PeriodMetrics
}

// =============================================================================
// Component Props
// =============================================================================

export interface DashboardProps {
  /** Currently selected period */
  currentPeriod: Period
  /** Metrics for all periods */
  metrics: AllMetrics
  /** Trend data for last 7 days */
  trendData: TrendDataPoint[]
  /** Progress of active goals */
  goalProgress: GoalProgress[]
  /** Daily motivational card */
  motivationalCard: MotivationalCard
  /** User achievements */
  achievements: Achievement[]
  /** AI-generated insights */
  aiInsights: AIInsight[]
  /** Called when user changes the period */
  onPeriodChange?: (period: Period) => void
  /** Called when user clicks on a goal */
  onGoalClick?: (goalId: string) => void
  /** Called when user clicks on an achievement */
  onAchievementClick?: (achievementId: string) => void
  /** Called when user dismisses an insight */
  onDismissInsight?: (insightId: string) => void
  /** Called when user wants to refresh the motivational card */
  onRefreshMotivation?: () => void
}

export interface ProductivityGaugeProps {
  /** Current score (0-100) */
  score: number
  /** Previous period score for comparison */
  previousScore: number
  /** Label for the period */
  periodLabel: string
}

export interface MetricCardProps {
  /** Label for the metric */
  label: string
  /** Current value */
  value: number | string
  /** Previous value for comparison */
  previousValue?: number
  /** Icon name */
  icon: string
  /** Color theme */
  color: 'violet' | 'amber' | 'emerald' | 'blue'
}

export interface TrendChartProps {
  /** Data points for the chart */
  data: TrendDataPoint[]
}

export interface GoalProgressCardProps {
  /** Goal to display */
  goal: GoalProgress
  /** Called when clicked */
  onClick?: () => void
}

export interface AchievementBadgeProps {
  /** Achievement to display */
  achievement: Achievement
  /** Called when clicked */
  onClick?: () => void
}
