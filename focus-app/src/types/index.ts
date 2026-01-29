export interface Task {
  id: string
  title: string
  notes: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'in_progress' | 'completed' | 'blocked'
  deadline: string
  estimatedMinutes: number
  progress: number
  projectId: string | null
  goalId: string | null
  tagIds: string[]
  blockedBy: string[]
}

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

export interface Goal {
  id: string
  title: string
  description: string
  status: 'por_iniciar' | 'en_progreso' | 'pausada' | 'completada'
  progress: number
  dueDate: string
  tags: string[]
  smart: SmartFields
  rpm: RpmFields
  milestones: Milestone[]
  linkedTasks: LinkedTask[]
}

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

export interface FocusSession {
  id: string
  date: string
  startTime: string
  endTime: string
  durationMinutes: number
  breakMinutes: number
  status: 'completed' | 'interrupted' | 'in_progress'
  task: { id: string; title: string } | null
  pauseCount: number
  notes: string | null
}

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

export interface User {
  name: string
  email?: string
  avatarUrl?: string
}
