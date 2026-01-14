# Milestone 6: Dashboard

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestones 1-5 complete

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

## Goal

Implement the Dashboard feature — productivity metrics center with score visualization, goal progress, focus time tracking, AI insights, and motivational elements.

## Overview

This section provides users with a comprehensive view of their productivity. It displays a productivity score gauge, key metrics, goal progress, trend charts, AI-generated insights, and achievements. Users can switch between today, weekly, and monthly views.

**Key Functionality:**
- View productivity score (0-100) in visual gauge
- Switch period: Today / This Week / This Month
- See key metrics: focus time, sessions, tasks completed
- Track progress toward active goals
- Read AI insights about productivity patterns
- View achievements/badges earned
- Get daily motivational quotes with AI context

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/dashboard/tests.md` for detailed test-writing instructions including:
- Key user flows to test (success and failure paths)
- Specific UI elements, button labels, and interactions to verify
- Expected behaviors and assertions

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/dashboard/components/`:

- `Dashboard.tsx` — Main dashboard layout
- `ProductivityGauge.tsx` — Circular score gauge
- `MetricCard.tsx` — Individual metric display
- `TrendChart.tsx` — 7-day trend line
- `GoalProgressCard.tsx` — Goal with progress bar
- `MotivationalCard.tsx` — Quote and AI insight
- `AIInsightCard.tsx` — AI-generated observation
- `AchievementBadge.tsx` — Unlocked achievement

### Data Layer

The components expect these data shapes:

```typescript
interface PeriodMetrics {
  productivityScore: number
  previousScore: number
  focusMinutes: number
  previousFocusMinutes: number
  sessionsCompleted: number
  tasksCompleted: number
  highImpactCompleted: number
  highImpactTotal: number
  streakDays: number
}

interface GoalProgress {
  id: string
  title: string
  progress: number
  dueDate: string
  status: 'por_iniciar' | 'en_progreso' | 'pausada' | 'completada'
  tasksCompleted: number
  tasksTotal: number
}

interface AIInsight {
  id: string
  type: 'positive' | 'suggestion' | 'warning' | 'celebration'
  title: string
  message: string
  priority: 'high' | 'medium' | 'low'
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: string | null
  category: 'streak' | 'habit' | 'productivity' | 'focus' | 'goals'
}
```

You'll need to:
- Create API endpoints to aggregate metrics
- Calculate productivity score algorithm
- Generate AI insights based on user patterns
- Manage achievement unlocking logic

### Callbacks

Wire up these user actions:

| Callback | Description |
|----------|-------------|
| `onPeriodChange` | Switch between today/week/month |
| `onGoalClick` | Navigate to goal detail |
| `onAchievementClick` | View achievement details |
| `onDismissInsight` | Dismiss an AI insight |
| `onRefreshMotivation` | Get new motivational quote |

### Empty States

Implement empty state UI for when no records exist yet:

- **New user with no data:** Show onboarding dashboard with prompts
- **No goals yet:** Show prompt to create first goal
- **No insights:** Show "Everything looks good" message
- **No achievements:** Show locked achievement placeholders

## Files to Reference

- `product-plan/sections/dashboard/README.md` — Feature overview
- `product-plan/sections/dashboard/tests.md` — Test-writing instructions
- `product-plan/sections/dashboard/components/` — React components
- `product-plan/sections/dashboard/types.ts` — TypeScript interfaces
- `product-plan/sections/dashboard/sample-data.json` — Test data
- `product-plan/sections/dashboard/screenshot.png` — Visual reference

## Expected User Flows

### Flow 1: Review Today's Productivity

1. User navigates to Dashboard (default: "Hoy")
2. User sees productivity score gauge: "78 - Muy bien"
3. User sees metrics: 2h 25m focus, 5 sessions, 7 tasks
4. User sees comparison: "+13 vs período anterior"
5. **Outcome:** User understands their productivity at a glance

### Flow 2: Check Weekly Progress

1. User clicks "Esta semana" toggle
2. Dashboard updates to weekly metrics
3. Trend chart shows last 7 days
4. Goals show weekly progress
5. **Outcome:** User sees weekly patterns and progress

### Flow 3: Review AI Insights

1. User scrolls to "Insights de la IA" section
2. User reads insight: "Tu mejor momento es la mañana"
3. User can dismiss insight or act on suggestion
4. **Outcome:** User gets personalized productivity advice

### Flow 4: View Goal Progress

1. User scrolls to "Progreso de metas" section
2. User sees active goals with progress bars
3. User clicks on a goal
4. User navigates to goal detail in Goals section
5. **Outcome:** User can track goals from dashboard

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Productivity score displays in gauge
- [ ] Period toggle works (today/week/month)
- [ ] All metrics display with comparisons
- [ ] Trend chart renders correctly
- [ ] Goal progress shows active goals
- [ ] AI insights display and can be dismissed
- [ ] Achievements display (locked and unlocked)
- [ ] Motivational quote refreshes
- [ ] Empty states display properly for new users
- [ ] Matches the visual design
- [ ] Responsive on mobile
