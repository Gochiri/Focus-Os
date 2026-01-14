// =============================================================================
// Data Types
// =============================================================================

export type MessageType = 'user' | 'ai' | 'reflection' | 'procrastination_alert'

export type ReflectionType = 'morning' | 'evening'

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

export interface ReferencedTask {
  id: string
  title: string
}

export interface ReferencedGoal {
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
  referencedTask?: ReferencedTask
  referencedGoal?: ReferencedGoal
  actionExecuted?: ActionExecuted
  reflectionType?: ReflectionType
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
  referencedTask?: ReferencedTask
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

// =============================================================================
// Component Props
// =============================================================================

export interface AICoachPanelProps {
  /** Chat message history */
  messages: Message[]
  /** Active proactive suggestions to display above chat */
  proactiveSuggestions: ProactiveSuggestion[]
  /** Current state of the coach (typing, unread count, etc.) */
  coachState: CoachState
  /** Whether the panel is currently open */
  isOpen?: boolean
  /** Called when user sends a message */
  onSendMessage?: (content: string) => void
  /** Called when user clicks a quick action */
  onQuickAction?: (action: ActionType, taskId?: string) => void
  /** Called when user interacts with a proactive suggestion */
  onSuggestionAction?: (suggestionId: string, action: ActionType, taskId?: string) => void
  /** Called when user dismisses a proactive suggestion */
  onDismissSuggestion?: (suggestionId: string) => void
  /** Called when user opens the panel */
  onOpen?: () => void
  /** Called when user closes the panel */
  onClose?: () => void
}

export interface AICoachFABProps {
  /** Number of unread suggestions (shows as badge) */
  unreadCount: number
  /** Whether the panel is currently open */
  isOpen?: boolean
  /** Called when user clicks the FAB */
  onClick?: () => void
}

export interface ChatMessageProps {
  /** The message to display */
  message: Message
  /** Called when user clicks a quick action */
  onQuickAction?: (action: ActionType, taskId?: string) => void
}

export interface ProactiveSuggestionCardProps {
  /** The suggestion to display */
  suggestion: ProactiveSuggestion
  /** Called when user clicks an action */
  onAction?: (action: ActionType, taskId?: string) => void
  /** Called when user dismisses the suggestion */
  onDismiss?: () => void
}
