// =============================================================================
// FocusAI - Core Data Model Types
// =============================================================================

// -----------------------------------------------------------------------------
// Task Entity
// -----------------------------------------------------------------------------

export type TaskPriority = 'high' | 'medium' | 'low'
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'blocked'

export interface Project {
  id: string
  name: string
  color: string
}

export interface Tag {
  id: string
  name: string
  color: string
}

export interface Task {
  id: string
  title: string
  notes: string
  priority: TaskPriority  // AI-calculated Pareto priority
  status: TaskStatus
  deadline: string  // ISO date string
  estimatedMinutes: number
  progress: number  // 0-100
  projectId: string | null
  goalId: string | null  // Reference to Goal
  tagIds: string[]
  blockedBy: string[]  // IDs of tasks that must complete first
  createdAt: string
  updatedAt: string
}

// -----------------------------------------------------------------------------
// Goal Entity
// -----------------------------------------------------------------------------

export type GoalStatus = 'por_iniciar' | 'en_progreso' | 'pausada' | 'completada'

export interface SmartFields {
  specific: string
  measurable: string
  achievable: string
  relevant: string
  timeBound: string
}

export interface RpmFields {
  result: string
  purpose: string
  massiveActionPlan: string
}

export interface Milestone {
  id: string
  title: string
  completed: boolean
}

export interface LinkedTask {
  id: string
  title: string
  completed: boolean
}

export interface Goal {
  id: string
  title: string
  description: string
  status: GoalStatus
  progress: number  // 0-100, calculated from milestones/tasks
  dueDate: string
  tags: string[]
  smart: SmartFields
  rpm: RpmFields
  milestones: Milestone[]
  linkedTasks: LinkedTask[]
  createdAt: string
  updatedAt: string
}

// -----------------------------------------------------------------------------
// FocusSession Entity
// -----------------------------------------------------------------------------

export type SessionStatus = 'completed' | 'interrupted' | 'in_progress'

export interface TaskReference {
  id: string
  title: string
}

export interface FocusSession {
  id: string
  date: string  // ISO date
  startTime: string  // ISO datetime
  endTime: string  // ISO datetime
  durationMinutes: number
  breakMinutes: number
  status: SessionStatus
  task: TaskReference | null
  pauseCount: number
  notes: string | null
}

export interface ActiveSession {
  id: string
  startedAt: string
  durationMinutes: number
  breakMinutes: number
  elapsedSeconds: number
  status: 'in_progress' | 'paused' | 'break'
  isPaused: boolean
  pauseCount: number
  task: TaskReference | null
}

// -----------------------------------------------------------------------------
// CoachInteraction Entity (Messages & Suggestions)
// -----------------------------------------------------------------------------

export type MessageType = 'user' | 'ai' | 'reflection' | 'procrastination_alert'
export type SuggestionType = 'procrastination_alert' | 'check_in' | 'suggestion' | 'reflection'
export type SuggestionPriority = 'high' | 'medium' | 'low'

export type ActionType =
  | 'prioritize_tasks'
  | 'show_high_impact'
  | 'start_focus'
  | 'view_task'
  | 'show_alternatives'
  | 'start_break'
  | 'complete_task'
  | 'break_down_task'
  | 'snooze'
  | 'respond_check_in'
  | 'show_tasks'
  | 'dismiss'

export interface QuickAction {
  id: string
  label: string
  action: ActionType
  taskId?: string
}

export interface GoalReference {
  id: string
  title: string
}

export interface ActionExecuted {
  type: 'focus_started' | 'task_completed' | 'break_started'
  taskId?: string
  duration?: number
}

export interface Message {
  id: string
  type: MessageType
  content: string
  timestamp: string
  quickActions?: QuickAction[]
  referencedTask?: TaskReference
  referencedGoal?: GoalReference
  actionExecuted?: ActionExecuted
}

export interface SuggestionAction {
  id: string
  label: string
  action: ActionType
  taskId?: string
}

export interface ProactiveSuggestion {
  id: string
  type: SuggestionType
  title: string
  message: string
  referencedTask?: TaskReference
  priority: SuggestionPriority
  actions: SuggestionAction[]
  createdAt: string
}

export interface CoachState {
  isTyping: boolean
  unreadSuggestions: number
  todayFocusMinutes: number
  currentStreak: number
  lastCheckIn: string
}

// -----------------------------------------------------------------------------
// ProductivityMetrics Entity
// -----------------------------------------------------------------------------

export type Period = 'today' | 'week' | 'month'
export type InsightType = 'positive' | 'suggestion' | 'warning' | 'celebration'
export type InsightPriority = 'high' | 'medium' | 'low'
export type AchievementCategory = 'streak' | 'habit' | 'productivity' | 'focus' | 'goals'

export interface PeriodMetrics {
  productivityScore: number  // 0-100
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
  unlockedAt: string | null  // null = locked
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
