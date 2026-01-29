# Architecture

**Analysis Date:** 2026-01-29

## Pattern Overview

**Overall:** Multi-page React SPA with component-based UI architecture and mock data-driven patterns.

**Key Characteristics:**
- React Router-based client-side routing with 5 main pages
- Composition-based component hierarchy with page containers and reusable sub-components
- Mock data initialization in pages; no backend integration present
- Prop-driven callbacks for state management and user interactions
- Type-first development with comprehensive TypeScript type definitions
- Tailwind CSS with custom color/spacing system

## Layers

**Presentation Layer:**
- Purpose: Render UI and handle user interactions
- Location: `src/components/` and `src/pages/`
- Contains: React components, page wrappers, UI subcomponents
- Depends on: React, React Router, lucide-react icons, types from `src/types/`
- Used by: App.tsx router, other presentation components

**Type/Model Layer:**
- Purpose: Define core data structures and interfaces
- Location: `src/types/index.ts`
- Contains: Task, Goal, FocusSession, Message, ProactiveSuggestion, PeriodMetrics, Achievement entities
- Depends on: None (pure TypeScript)
- Used by: All pages and components for type safety

**Layout Layer:**
- Purpose: Provide consistent application shell and navigation structure
- Location: `src/components/AppShell.tsx`, `src/components/MainNav.tsx`, `src/components/CoachButton.tsx`
- Contains: Sidebar navigation, mobile header, main content wrapper, floating coach button
- Depends on: React Router navigation, types
- Used by: App.tsx root component

**Page Layer:**
- Purpose: Aggregate components for specific routes and manage page-level state
- Location: `src/pages/`
- Contains: TasksPage, GoalsPage, CoachPage, FocusPage, DashboardPage
- Depends on: Feature-specific components, mock data, types
- Used by: App.tsx Routes

**Feature Components:**
- Purpose: Render domain-specific UI (tasks, goals, dashboard, coach, focus)
- Location: `src/components/{tasks,goals,dashboard,coach,focus}/`
- Contains: Feature composite components and supporting atomic components
- Examples: Dashboard.tsx, TaskPriorityView.tsx, AICoachPanel.tsx, GoalKanban.tsx
- Depends on: Atomic components, types, icons
- Used by: Page components

**Atomic Components:**
- Purpose: Reusable UI elements (cards, gauges, buttons, forms)
- Location: `src/components/{dashboard,tasks,goals,coach,focus}/`
- Contains: MetricCard, ProductivityGauge, TaskCard, ChatMessage, GoalCard, etc.
- Depends on: React, Tailwind CSS, lucide-react
- Used by: Feature and page components

## Data Flow

**Page Initialization:**

1. Page component mounts (e.g., `DashboardPage`)
2. Page initializes mock data via `useState` (e.g., `mockMetrics`, `mockTrendData`)
3. Page manages local state for UI interactions (e.g., period selection, dismissals)
4. Page passes data and callbacks to feature component as props

**User Interaction:**

1. User clicks element in atomic/feature component
2. Component calls handler callback from props (e.g., `onCompleteTask`, `onPeriodChange`)
3. Page-level handler updates state via `useState` setter
4. State update triggers re-render with new props to child components

**Navigation Flow:**

1. User clicks navigation item in MainNav
2. Navigation handler calls `navigate(href)` from React Router
3. App.tsx Routes matches path and renders corresponding page
4. AppShell wrapper remains constant; only route content changes

**State Management:**
- Component-level: `useState` hooks for UI state (filters, selections, modal open/close)
- Page-level: Mock data initialization and aggregation
- No global state management (Context API or Redux not used)
- Data flows unidirectionally from page → feature → atomic components

## Key Abstractions

**Task Priority System:**
- Purpose: Represents Pareto principle (high-impact 20% of tasks)
- Files: `src/types/index.ts` (TaskPriority type), `src/components/tasks/TaskPriorityView.tsx`
- Pattern: Tasks filtered and separated by `priority: 'high' | 'medium' | 'low'`; high-impact tasks displayed prominently

**Goal with SMART/RPM Frameworks:**
- Purpose: Structure goal-setting with dual methodologies
- Files: `src/types/index.ts` (Goal, SmartFields, RpmFields), `src/components/goals/GoalKanban.tsx`
- Pattern: Goal entity contains `smart` object (Specific, Measurable, Achievable, Relevant, TimeBound) and `rpm` object (Result, Purpose, MassiveActionPlan)

**Focus Session Tracking:**
- Purpose: Capture deep work metrics and pomodoro-like sessions
- Files: `src/types/index.ts` (FocusSession, ActiveSession), `src/components/focus/FocusModeDashboard.tsx`
- Pattern: Sessions track `durationMinutes`, `breakMinutes`, `pauseCount`, and current status

**AI Coach Interaction Model:**
- Purpose: Enable conversational guidance and proactive suggestions
- Files: `src/types/index.ts` (Message, ProactiveSuggestion, CoachState), `src/components/coach/AICoachPanel.tsx`
- Pattern: Messages with optional `quickActions` that trigger `ActionType` handlers; suggestions show context-aware recommendations

**Productivity Metrics with Temporal Periods:**
- Purpose: Track performance across different time scales
- Files: `src/types/index.ts` (PeriodMetrics, Period), `src/components/dashboard/Dashboard.tsx`
- Pattern: Metrics keyed by period ('today', 'week', 'month'); each includes current + previous scores for trend visualization

## Entry Points

**Main Application:**
- Location: `src/main.tsx`
- Triggers: Browser document load
- Responsibilities: Create React root, mount App component

**App Router:**
- Location: `src/App.tsx`
- Triggers: Application initialization
- Responsibilities: Define BrowserRouter, render AppShell wrapper, map Routes to pages

**Page Components:**
- Examples: `src/pages/DashboardPage.tsx`, `src/pages/TasksPage.tsx`, `src/pages/CoachPage.tsx`
- Triggers: Route navigation (e.g., `/dashboard`, `/tasks`, `/coach`)
- Responsibilities: Initialize mock data, manage page-level state, render feature components with data and callbacks

**AppShell Container:**
- Location: `src/components/AppShell.tsx`
- Triggers: App.tsx
- Responsibilities: Render sidebar (desktop/mobile toggle), main content area, floating coach button; coordinate navigation

## Error Handling

**Strategy:** Minimal error handling in current implementation; relies on type safety and happy-path mocking.

**Patterns:**
- Confirmation dialogs for destructive actions (e.g., `window.confirm()` in `TasksPage.tsx` before delete)
- Null/undefined checks via optional chaining and nullish coalescing in component rendering
- Type safety via TypeScript prevents many runtime errors (no loose `any` types observed)

**Not Implemented:**
- Try/catch blocks for async operations (no backend calls present)
- Error boundaries for component crashes
- User-facing error notifications
- Request/response error handling

## Cross-Cutting Concerns

**Logging:**
- Approach: Console.log used for debugging (e.g., `console.log('Logout')` in App.tsx, handler stubs in pages)
- No structured logging framework

**Validation:**
- Approach: TypeScript types enforce structure; no runtime validation
- UI constraints via disabled states or confirmation dialogs
- Example: Task deletion requires `window.confirm()` user approval

**Authentication:**
- Approach: Mock user object in App.tsx (`name: 'Usuario Demo'`, `email: 'demo@focusai.app'`)
- No authentication flow; static user throughout session
- User menu displays but logout is non-functional stub

**Styling:**
- Approach: Tailwind CSS utility classes with dark mode support (`dark:` prefix)
- Custom fonts via CSS variables: `font-heading` (for titles), `font-body` (default)
- Consistent spacing/padding using Tailwind scale (px-4, py-6, gap-4, etc.)
- Color system tied to semantic names: `violet-600` (primary), `slate-900` (dark), `amber-500` (accent)

**Icons:**
- Approach: Lucide React library (`src/components/MainNav.tsx` iconMap pattern)
- Icon mapping: String name → component lookup via object map
- Icons imported as named exports from 'lucide-react'

---

*Architecture analysis: 2026-01-29*
