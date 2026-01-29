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
  currentPeriod: Period
  metrics: AllMetrics
  trendData: TrendDataPoint[]
  goalProgress: GoalProgress[]
  motivationalCard: MotivationalCard
  achievements: Achievement[]
  aiInsights: AIInsight[]
  onPeriodChange?: (period: Period) => void
  onGoalClick?: (goalId: string) => void
  onAchievementClick?: (achievementId: string) => void
  onDismissInsight?: (insightId: string) => void
  onRefreshMotivation?: () => void
}

export interface NavigationItem {
  label: string
  href: string
  icon?: string
  isActive?: boolean
}

export interface User {
  name: string
  email?: string
  avatarUrl?: string
}
