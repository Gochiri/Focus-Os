# Codebase Structure

**Analysis Date:** 2026-01-29

## Directory Layout

```
focus-app/
├── src/
│   ├── components/           # Reusable React components organized by feature
│   │   ├── coach/            # AI Coach UI components
│   │   ├── dashboard/        # Dashboard metrics and insights components
│   │   ├── focus/            # Focus Mode UI components
│   │   ├── goals/            # Goal management components
│   │   ├── tasks/            # Task management and priority view components
│   │   ├── AppShell.tsx      # Main application layout wrapper
│   │   ├── CoachButton.tsx   # Floating coach action button
│   │   ├── MainNav.tsx       # Primary navigation menu
│   │   ├── UserMenu.tsx      # User profile/logout menu
│   │   └── index.ts          # Component exports barrel
│   ├── pages/                # Page-level components for each route
│   │   ├── CoachPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── FocusPage.tsx
│   │   ├── GoalsPage.tsx
│   │   └── TasksPage.tsx
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts          # All core domain types
│   ├── assets/               # Static assets (images, SVGs)
│   ├── App.tsx               # Router configuration and main layout
│   ├── App.css               # App-level styles
│   ├── main.tsx              # React entry point
│   └── index.css             # Global styles
├── public/                   # Static files served directly
├── index.html                # HTML entry point
├── vite.config.ts            # Vite build configuration
├── tsconfig.json             # TypeScript configuration (base)
├── tsconfig.app.json         # TypeScript configuration (app-specific)
├── tsconfig.node.json        # TypeScript configuration (build tools)
├── package.json              # Dependencies and scripts
├── package-lock.json         # Locked dependency versions
├── eslint.config.js          # Linting rules
└── .gitignore                # Git ignore rules
```

## Directory Purposes

**src/components/**
- Purpose: Houses all reusable React UI components
- Contains: Feature-organized subdirectories + shell/layout components
- Key files: `AppShell.tsx` (main layout), `index.ts` (exports barrel)
- Import Pattern: `import { ComponentName } from './components'` or `import { ComponentName } from './components/feature'`

**src/components/coach/**
- Purpose: AI Coach chatbot and suggestion UI
- Contains: `AICoachPanel.tsx` (main coach interface), `ChatMessage.tsx` (message display), `ProactiveSuggestionCard.tsx` (suggestion cards)

**src/components/dashboard/**
- Purpose: Analytics, metrics, and insights visualization
- Contains: `Dashboard.tsx` (main layout), `ProductivityGauge.tsx`, `MetricCard.tsx`, `TrendChart.tsx`, `GoalProgressCard.tsx`, `AIInsightCard.tsx`, `AchievementBadge.tsx`, `MotivationalCard.tsx`

**src/components/focus/**
- Purpose: Focus Mode timer and session UI
- Contains: `FocusModeDashboard.tsx` (main interface), `DurationSelector.tsx`, `FocusCalendar.tsx`

**src/components/goals/**
- Purpose: Goal creation, editing, and tracking
- Contains: `GoalCard.tsx` (individual goal), `GoalKanban.tsx` (kanban-style view)

**src/components/tasks/**
- Purpose: Task management and Pareto priority view
- Contains: `TaskPriorityView.tsx` (main container), `TaskCard.tsx` (individual task), `TaskFilters.tsx` (filter controls)

**src/pages/**
- Purpose: Route-specific page containers with mock data and state management
- Contains: One component per route (TasksPage, GoalsPage, CoachPage, FocusPage, DashboardPage)
- Pattern: Each page initializes mock data, manages local state, passes data/callbacks to feature components

**src/types/**
- Purpose: Single source of truth for all TypeScript type definitions
- Contains: All interfaces and types (Task, Goal, FocusSession, Message, ProactiveSuggestion, PeriodMetrics, Achievement, etc.)
- Organization: Entities grouped with comments (Shared Entities, Task Entity, Goal Entity, etc.)

## Key File Locations

**Entry Points:**
- `src/main.tsx`: React root initialization with `createRoot(document.getElementById('root')).render()`
- `src/App.tsx`: Router setup with BrowserRouter, Routes, and AppShell wrapper
- `index.html`: HTML document with `<div id="root"></div>` mount point

**Configuration:**
- `vite.config.ts`: Build tool config with React and Tailwind plugins
- `tsconfig.json`: Base TypeScript settings (target ES2020, lib DOM)
- `eslint.config.js`: Linting rules for code quality
- `package.json`: Dependencies (React 19.2, React Router 7.12, Tailwind 4.1) and scripts

**Core Logic:**
- `src/types/index.ts`: Domain models and interfaces (350+ lines of type definitions)
- `src/App.tsx`: Route declarations and navigation item definitions
- `src/components/AppShell.tsx`: Main layout with sidebar/mobile header/content area

**Testing:**
- No test files present (`.test.ts`, `.spec.ts` not found)

## Naming Conventions

**Files:**
- `PascalCase` for component files: `AppShell.tsx`, `TaskCard.tsx`, `DashboardPage.tsx`
- `camelCase` for utility/config files: `vite.config.ts`, `eslint.config.js`
- Feature directories use `kebab-case`: `src/components/coach/`, `src/components/dashboard/`

**Components:**
- Export default or named export as PascalCase function: `export function AppShell()`, `export { Dashboard }`
- Props interfaces named `{ComponentName}Props`: `AppShellProps`, `DashboardProps`, `TasksAndPrioritiesProps`

**Types:**
- Entity types named descriptively: `Task`, `Goal`, `FocusSession`, `ProactiveSuggestion`
- Union types for enums: `type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'blocked'`
- Nested types with parent prefix: `SmartFields`, `RpmFields` (within Goal), `PeriodMetrics`

**Functions/Variables:**
- State setters use `set` prefix: `setTasks`, `setPeriod`, `setMessages`
- Event handlers use `on` prefix: `onCompleteTask`, `onPeriodChange`, `onNavigate`
- Boolean state variables indicate state: `mobileMenuOpen`, `isTyping`, `isActive`

**CSS Classes:**
- Tailwind utility-first approach; no custom classes observed
- Dark mode prefix: `dark:bg-slate-900`, `dark:text-slate-100`
- Semantic naming for semantic meaning: `bg-violet-600` (primary), `text-slate-500` (secondary text)

## Where to Add New Code

**New Feature (e.g., new page):**
- Primary code: `src/pages/{FeatureName}Page.tsx`
- Components: Create subdirectory `src/components/{feature-name}/` with composite and atomic components
- Types: Add to `src/types/index.ts` with comment grouping
- Route: Add entry to `navigationItems` array in `src/App.tsx` and `Routes` section
- Example: To add Reporting page:
  1. `src/pages/ReportingPage.tsx` - Initialize mock data, manage state
  2. `src/components/reporting/ReportingDashboard.tsx` - Main feature layout
  3. `src/components/reporting/{ReportCard,FilterPanel}.tsx` - Sub-components
  4. Add types to `src/types/index.ts`
  5. Add route to `src/App.tsx`

**New Component (within existing feature):**
- Implementation: `src/components/{feature}/{ComponentName}.tsx`
- Pattern: Accept props interface with data and callbacks, render JSX with Tailwind classes
- Export: Add to component barrel if shared, or import directly in parent
- Example (within dashboard):
  1. Create `src/components/dashboard/CustomCard.tsx`
  2. Accept `CustomCardProps { title: string, onAction?: () => void }`
  3. Import in `src/components/dashboard/Dashboard.tsx` and integrate into grid

**Utilities/Helpers:**
- Shared utilities: Create `src/utils/` directory if needed
- Feature-specific helpers: Colocate in component file or create separate file in feature directory
- Formatting functions (e.g., `formatFocusTime`) are currently inline in pages; extract to utils if reused
- Example: Extract `formatFocusTime()` from `Dashboard.tsx` to `src/utils/format.ts` for reuse

**Mock Data:**
- Current location: Top of page files (e.g., `initialTasks`, `mockMetrics`)
- For larger datasets: Create `src/mocks/` directory with separate files per entity
- Pattern: `mockTasks.ts` exports `const mockTasks: Task[] = [...]`
- Import in pages: `import { mockTasks } from '../mocks/tasks'`

## Special Directories

**node_modules/**
- Purpose: Installed npm dependencies
- Generated: Yes (via `npm install`)
- Committed: No (excluded via `.gitignore`)

**public/**
- Purpose: Static assets served as-is (logos, favicons)
- Generated: No (hand-authored)
- Committed: Yes (part of repo)

**src/assets/**
- Purpose: Static images and SVGs (e.g., `react.svg`)
- Generated: No (hand-authored or imported)
- Committed: Yes (part of repo)

## Import Path Patterns

**Relative imports for sibling/nested files:**
```typescript
// From component to adjacent component
import { MainNav } from './MainNav'

// From component to types
import type { Task, Goal } from '../types'

// From page to component
import { Dashboard } from '../components/dashboard/Dashboard'
```

**Absolute imports (if configured):**
- Not detected in current config; all imports use relative paths

**Barrel exports (index.ts):**
- `src/components/index.ts` exports shell components (AppShell, MainNav, UserMenu, CoachButton)
- Allows: `import { AppShell } from './components'` from root
- Feature-specific barrels not present; feature components imported directly

---

*Structure analysis: 2026-01-29*
