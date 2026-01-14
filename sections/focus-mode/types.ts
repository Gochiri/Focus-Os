// =============================================================================
// Data Types
// =============================================================================

export type SessionStatus = 'completed' | 'interrupted' | 'in_progress'

export interface TaskReference {
  id: string
  title: string
}

export interface FocusSession {
  id: string
  date: string
  startTime: string
  endTime: string
  durationMinutes: number
  breakMinutes: number
  status: SessionStatus
  task: TaskReference | null
  pauseCount: number
  notes: string | null
}

export interface DurationPreset {
  id: string
  minutes: number
  breakMinutes: number
  label: string
  isRecommended: boolean
  aiReason: string | null
}

export interface FocusStats {
  todayMinutes: number
  todaySessions: number
  currentStreak: number
  bestStreak: number
  weeklyMinutes: number
  weeklyGoal: number
  averageSessionLength: number
}

export interface CalendarDay {
  date: string
  totalMinutes: number
  sessionsCount: number
  completedCount: number
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

// =============================================================================
// Component Props
// =============================================================================

export interface FocusModeProps {
  /** Current active session (null if no session running) */
  activeSession: ActiveSession | null
  /** User's focus statistics */
  focusStats: FocusStats
  /** Available duration presets */
  durationPresets: DurationPreset[]
  /** Historical focus sessions */
  focusSessions: FocusSession[]
  /** Calendar data for history view */
  calendarDays: CalendarDay[]
  /** Called when user starts a new focus session */
  onStartSession?: (durationMinutes: number, breakMinutes: number, taskId?: string) => void
  /** Called when user pauses the current session */
  onPauseSession?: () => void
  /** Called when user resumes a paused session */
  onResumeSession?: () => void
  /** Called when user cancels/stops the current session */
  onCancelSession?: () => void
  /** Called when user completes the current session */
  onCompleteSession?: () => void
  /** Called when user starts a break */
  onStartBreak?: () => void
  /** Called when user skips the break */
  onSkipBreak?: () => void
  /** Called when user selects a day in the calendar */
  onSelectDay?: (date: string) => void
  /** Called when user wants to select a task for the session */
  onSelectTask?: () => void
}

export interface TimerDisplayProps {
  /** Total duration in minutes */
  totalMinutes: number
  /** Elapsed time in seconds */
  elapsedSeconds: number
  /** Whether the session is paused */
  isPaused: boolean
  /** Whether this is a break timer */
  isBreak?: boolean
  /** The task being worked on */
  task?: TaskReference | null
  /** Called when user pauses */
  onPause?: () => void
  /** Called when user resumes */
  onResume?: () => void
  /** Called when user cancels */
  onCancel?: () => void
}

export interface DurationSelectorProps {
  /** Available presets */
  presets: DurationPreset[]
  /** Currently selected duration */
  selectedMinutes: number
  /** Currently selected break duration */
  selectedBreakMinutes: number
  /** Called when user selects a preset */
  onSelectPreset?: (preset: DurationPreset) => void
  /** Called when user sets custom duration */
  onCustomDuration?: (minutes: number, breakMinutes: number) => void
}

export interface FocusCalendarProps {
  /** Calendar data by day */
  calendarDays: CalendarDay[]
  /** Currently selected date */
  selectedDate?: string
  /** Called when user selects a day */
  onSelectDay?: (date: string) => void
}

export interface SessionHistoryProps {
  /** Sessions to display */
  sessions: FocusSession[]
  /** Called when user clicks on a session */
  onSelectSession?: (sessionId: string) => void
}
