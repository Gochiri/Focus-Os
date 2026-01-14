# Data Model

## Overview

FocusAI's data model centers around five core entities that work together to enable AI-powered productivity coaching.

## Core Entities

### Task

A task represents a unit of work with AI-calculated Pareto priority.

```typescript
interface Task {
  id: string
  title: string
  notes: string
  priority: 'high' | 'medium' | 'low'  // AI-calculated Pareto
  status: 'pending' | 'in_progress' | 'completed' | 'blocked'
  deadline: string  // ISO date
  estimatedMinutes: number
  progress: number  // 0-100
  projectId: string | null
  goalId: string | null  // Links to Goal
  tagIds: string[]
  blockedBy: string[]  // Task IDs that must complete first
}
```

### Goal

A goal structured with SMART criteria and RPM methodology.

```typescript
interface Goal {
  id: string
  title: string
  description: string
  status: 'por_iniciar' | 'en_progreso' | 'pausada' | 'completada'
  progress: number  // 0-100, calculated from milestones/tasks
  dueDate: string
  tags: string[]
  smart: SmartFields
  rpm: RpmFields
  milestones: Milestone[]
  linkedTasks: LinkedTask[]  // References Task entities
}
```

### FocusSession

A Pomodoro-style work session tracking focused time.

```typescript
interface FocusSession {
  id: string
  date: string
  startTime: string
  endTime: string
  durationMinutes: number
  breakMinutes: number
  status: 'completed' | 'interrupted' | 'in_progress'
  task: TaskReference | null  // Optional link to Task
  pauseCount: number
  notes: string | null
}
```

### CoachInteraction (Messages & Suggestions)

Interactions with the AI coach including chat and proactive suggestions.

```typescript
interface Message {
  id: string
  type: 'user' | 'ai' | 'reflection' | 'procrastination_alert'
  content: string
  timestamp: string
  quickActions?: QuickAction[]
  referencedTask?: TaskReference
  referencedGoal?: GoalReference
  actionExecuted?: ActionExecuted
}

interface ProactiveSuggestion {
  id: string
  type: 'procrastination_alert' | 'check_in' | 'suggestion' | 'reflection'
  title: string
  message: string
  referencedTask?: TaskReference
  priority: 'high' | 'medium' | 'low'
  actions: SuggestionAction[]
}
```

### ProductivityMetrics

Aggregated statistics for the dashboard.

```typescript
interface PeriodMetrics {
  productivityScore: number  // 0-100
  previousScore: number
  focusMinutes: number
  sessionsCompleted: number
  tasksCompleted: number
  highImpactCompleted: number
  highImpactTotal: number
  streakDays: number
}
```

## Relationships

```
Goal ──1:N──> Task (Goal has many Tasks as part of action plan)
Task ──N:1──> Goal (Task optionally belongs to a Goal)
FocusSession ──N:1──> Task (Session optionally links to Task being worked)
Message ──N:1──> Task/Goal (Message can reference Task or Goal)
ProductivityMetrics aggregates from Tasks, FocusSessions, Goals
```

## Key Behaviors

### Pareto Priority Calculation

The AI analyzes tasks and assigns priority based on:
- Deadline urgency
- Dependencies (blocking other tasks)
- Description keywords
- Historical patterns

High-impact tasks (top 20%) get `priority: 'high'`.

### Progress Calculation

Goal progress is calculated from:
- Milestone completion (each milestone = equal weight)
- Linked task completion (if using tasks as progress tracker)

### Streak Tracking

Streak counts consecutive days where user:
- Completed at least 1 focus session, OR
- Completed at least 1 task

## Sample Data

See `sample-data.json` for example data structures used in the UI components.
