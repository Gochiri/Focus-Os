// =============================================================================
// Data Types
// =============================================================================

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
  progress: number
  dueDate: string
  tags: string[]
  smart: SmartFields
  rpm: RpmFields
  milestones: Milestone[]
  linkedTasks: LinkedTask[]
}

// =============================================================================
// View Types
// =============================================================================

export type ViewMode = 'kanban' | 'timeline' | 'list'

export interface KanbanColumn {
  id: GoalStatus
  title: string
  goals: Goal[]
}

// =============================================================================
// Component Props
// =============================================================================

export interface GoalsAndPlanningProps {
  /** List of goals to display */
  goals: Goal[]
  /** Current view mode */
  viewMode?: ViewMode
  /** Called when user creates a new goal */
  onCreate?: () => void
  /** Called when user wants to view/edit a goal's details */
  onView?: (id: string) => void
  /** Called when user wants to edit a goal */
  onEdit?: (id: string) => void
  /** Called when user wants to delete a goal */
  onDelete?: (id: string) => void
  /** Called when user changes a goal's status (e.g., drag in Kanban) */
  onStatusChange?: (id: string, newStatus: GoalStatus) => void
  /** Called when user toggles a milestone's completion */
  onToggleMilestone?: (goalId: string, milestoneId: string) => void
  /** Called when user creates a task from within a goal */
  onCreateTask?: (goalId: string, taskTitle: string) => void
  /** Called when user changes the view mode */
  onViewModeChange?: (mode: ViewMode) => void
}

export interface GoalCardProps {
  /** The goal to display */
  goal: Goal
  /** Called when user clicks the card to view details */
  onView?: (id: string) => void
  /** Called when user wants to edit the goal */
  onEdit?: (id: string) => void
  /** Called when user changes the goal's status */
  onStatusChange?: (id: string, newStatus: GoalStatus) => void
}

export interface GoalDetailProps {
  /** The goal to display in detail view */
  goal: Goal
  /** Called when user closes the detail view */
  onClose?: () => void
  /** Called when user wants to edit the goal */
  onEdit?: (id: string) => void
  /** Called when user wants to delete the goal */
  onDelete?: (id: string) => void
  /** Called when user toggles a milestone */
  onToggleMilestone?: (goalId: string, milestoneId: string) => void
  /** Called when user creates a new task for this goal */
  onCreateTask?: (goalId: string, taskTitle: string) => void
}
