# FocusAI — Complete Implementation Instructions

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Test-Driven Development

Each section includes a `tests.md` file with detailed test-writing instructions. These are **framework-agnostic** — adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, RSpec, Minitest, PHPUnit, etc.).

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write failing tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

The test instructions include:
- Specific UI elements, button labels, and interactions to verify
- Expected success and failure behaviors
- Empty state handling (when no records exist yet)
- Data assertions and state validations

---

## Product Overview

### FocusAI

Un administrador de tareas con IA integrada que actúa como coach de productividad personal. Va más allá de listar pendientes: te ayuda activamente a cumplir tus objetivos más importantes mediante frameworks probados y acompañamiento inteligente.

### Sections to Build

1. **Tasks & Priorities** — Gestión de tareas con priorización automática Pareto (80/20)
2. **Goals & Planning** — Sistema de metas SMART y método RPM
3. **AI Coach** — Chat conversacional con IA y detección de procrastinación
4. **Focus Mode** — Sesiones Pomodoro con pausas inteligentes
5. **Dashboard** — Métricas de productividad y visualización de progreso

### Data Model

- **Task** — Individual task with Pareto priority, status, deadline
- **Goal** — SMART goal with RPM fields, milestones, linked tasks
- **FocusSession** — Pomodoro session with duration, status, task reference
- **CoachInteraction** — AI coach message, suggestion, or reflection
- **ProductivityMetrics** — Aggregated stats for dashboard

### Design System

- **Colors:** Primary: violet, Secondary: amber, Neutral: slate
- **Typography:** Headings: Space Grotesk, Body: Inter, Code: JetBrains Mono

---

# Milestone 1: Foundation

## Goal

Set up the foundational elements: design tokens, data model types, routing structure, and application shell.

## What to Implement

### 1. Design Tokens

- **Colors:** violet (primary), amber (secondary), slate (neutral)
- **Typography:** Space Grotesk (headings), Inter (body), JetBrains Mono (code)
- See `product-plan/design-system/` for configuration files

### 2. Data Model Types

Create TypeScript interfaces for: Task, Goal, FocusSession, CoachInteraction, ProductivityMetrics
- See `product-plan/data-model/types.ts`

### 3. Routing Structure

| Route | Section |
|-------|---------|
| `/tasks` | Tasks & Priorities |
| `/goals` | Goals & Planning |
| `/coach` | AI Coach |
| `/focus` | Focus Mode |
| `/dashboard` | Dashboard |

### 4. Application Shell

Copy shell components from `product-plan/shell/components/`:
- `AppShell.tsx` — Main layout wrapper
- `MainNav.tsx` — Navigation with icons
- `UserMenu.tsx` — User avatar and logout
- `CoachButton.tsx` — Floating AI coach button

## Done When

- [ ] Design tokens configured
- [ ] Data model types defined
- [ ] Routes exist for all sections
- [ ] Shell renders with navigation
- [ ] Responsive on mobile

---

# Milestone 2: Tasks & Priorities

## Goal

Core task management with automatic Pareto prioritization that identifies the 20% of high-impact tasks.

## Components

- `TaskCard.tsx`, `TaskFilters.tsx`, `TaskPriorityView.tsx`, `TaskCalendarView.tsx`, `CalendarDay.tsx`

## Key Data Types

```typescript
interface Task {
  id: string; title: string; notes: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  deadline: string; estimatedMinutes: number; progress: number;
  projectId: string | null; goalId: string | null;
  tagIds: string[]; blockedBy: string[];
}
```

## Key Callbacks

`onCreateTask`, `onEditTask`, `onDeleteTask`, `onCompleteTask`, `onPostponeTask`, `onChangePriority`, `onChangeView`, `onFilterByProject`, `onFilterByTags`

## Done When

- [ ] Tasks display with Pareto prioritization
- [ ] CRUD operations work
- [ ] Dependencies show blocked indicator
- [ ] Calendar view shows deadlines
- [ ] Empty states display properly

---

# Milestone 3: Goals & Planning

## Goal

SMART goal system with RPM methodology for structuring objectives.

## Components

- `GoalCard.tsx`, `GoalKanban.tsx`

## Key Data Types

```typescript
interface Goal {
  id: string; title: string; description: string;
  status: 'por_iniciar' | 'en_progreso' | 'pausada' | 'completada';
  progress: number; dueDate: string; tags: string[];
  smart: SmartFields; rpm: RpmFields;
  milestones: Milestone[]; linkedTasks: LinkedTask[];
}
```

## Key Callbacks

`onCreate`, `onView`, `onEdit`, `onDelete`, `onStatusChange`, `onToggleMilestone`, `onCreateTask`, `onViewModeChange`

## Done When

- [ ] Kanban board with 4 columns
- [ ] Drag-and-drop status change
- [ ] SMART and RPM fields work
- [ ] Milestones update progress
- [ ] Tasks sync with Tasks section

---

# Milestone 4: AI Coach

## Goal

Conversational coach panel with proactive suggestions and procrastination detection.

## Components

- `AICoachPanel.tsx`, `ChatMessage.tsx`, `ProactiveSuggestionCard.tsx`

## Key Data Types

```typescript
interface Message {
  id: string; type: 'user' | 'ai' | 'reflection' | 'procrastination_alert';
  content: string; timestamp: string;
  quickActions?: QuickAction[]; referencedTask?: TaskReference;
}

interface ProactiveSuggestion {
  id: string; type: SuggestionType; title: string; message: string;
  referencedTask?: TaskReference; priority: SuggestionPriority;
  actions: SuggestionAction[];
}
```

## Key Callbacks

`onSendMessage`, `onQuickAction`, `onSuggestionAction`, `onDismissSuggestion`, `onOpen`, `onClose`

## Done When

- [ ] Panel opens/closes from floating button
- [ ] Chat messages send and receive
- [ ] AI responds contextually
- [ ] Proactive suggestions appear
- [ ] Badge shows unread count

---

# Milestone 5: Focus Mode

## Goal

Pomodoro-style focus sessions with AI-suggested optimal lengths.

## Components

- `FocusModeDashboard.tsx`, `DurationSelector.tsx`, `FocusCalendar.tsx`

## Key Data Types

```typescript
interface FocusSession {
  id: string; date: string; startTime: string; endTime: string;
  durationMinutes: number; breakMinutes: number;
  status: 'completed' | 'interrupted' | 'in_progress';
  task: TaskReference | null; pauseCount: number;
}

interface FocusStats {
  todayMinutes: number; todaySessions: number;
  currentStreak: number; bestStreak: number;
  weeklyMinutes: number; weeklyGoal: number;
}
```

## Key Callbacks

`onStartSession`, `onPauseSession`, `onResumeSession`, `onCancelSession`, `onCompleteSession`, `onStartBreak`, `onSkipBreak`, `onSelectDay`

## Done When

- [ ] Duration presets with AI recommendation
- [ ] Timer counts down accurately
- [ ] Pause/resume works
- [ ] Stats update correctly
- [ ] Calendar shows history

---

# Milestone 6: Dashboard

## Goal

Productivity metrics center with score visualization and AI insights.

## Components

- `Dashboard.tsx`, `ProductivityGauge.tsx`, `MetricCard.tsx`, `TrendChart.tsx`, `GoalProgressCard.tsx`, `MotivationalCard.tsx`, `AIInsightCard.tsx`, `AchievementBadge.tsx`

## Key Data Types

```typescript
interface PeriodMetrics {
  productivityScore: number; previousScore: number;
  focusMinutes: number; sessionsCompleted: number;
  tasksCompleted: number; highImpactCompleted: number;
  streakDays: number;
}

interface AIInsight {
  id: string; type: InsightType; title: string;
  message: string; priority: InsightPriority;
}
```

## Key Callbacks

`onPeriodChange`, `onGoalClick`, `onAchievementClick`, `onDismissInsight`, `onRefreshMotivation`

## Done When

- [ ] Productivity score gauge displays
- [ ] Period toggle works
- [ ] All metrics display with comparisons
- [ ] AI insights show and dismiss
- [ ] Achievements display
- [ ] Empty states for new users
