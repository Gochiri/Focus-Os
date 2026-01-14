# Milestone 5: Focus Mode

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestones 1-4 complete

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

Implement the Focus Mode feature — Pomodoro-style focus sessions with customizable durations, AI-suggested optimal lengths, and session history tracking.

## Overview

This section enables users to start focused work sessions using the Pomodoro technique. The AI learns user patterns to suggest optimal session lengths. Users can track their focus time, maintain streaks, and review session history in a calendar view.

**Key Functionality:**
- Start focus sessions with preset or custom durations
- AI recommends optimal session length based on history
- Timer display during active session
- Pause, resume, or cancel sessions
- Track daily focus time and streak
- View session history in calendar

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/focus-mode/tests.md` for detailed test-writing instructions including:
- Key user flows to test (success and failure paths)
- Specific UI elements, button labels, and interactions to verify
- Expected behaviors and assertions

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/focus-mode/components/`:

- `FocusModeDashboard.tsx` — Main view with stats and session starter
- `DurationSelector.tsx` — Duration preset buttons and custom option
- `FocusCalendar.tsx` — Monthly calendar with session history

### Data Layer

The components expect these data shapes:

```typescript
interface FocusSession {
  id: string
  date: string
  startTime: string
  endTime: string
  durationMinutes: number
  breakMinutes: number
  status: 'completed' | 'interrupted' | 'in_progress'
  task: { id: string; title: string } | null
  pauseCount: number
}

interface DurationPreset {
  id: string
  minutes: number
  breakMinutes: number
  label: string
  isRecommended: boolean
  aiReason: string | null
}

interface FocusStats {
  todayMinutes: number
  todaySessions: number
  currentStreak: number
  bestStreak: number
  weeklyMinutes: number
  weeklyGoal: number
  averageSessionLength: number
}

interface ActiveSession {
  id: string
  startedAt: string
  durationMinutes: number
  breakMinutes: number
  elapsedSeconds: number
  status: 'in_progress' | 'paused' | 'break'
  task: { id: string; title: string } | null
}
```

You'll need to:
- Create API endpoints for session CRUD
- Implement real-time timer logic (consider WebSockets or polling)
- Calculate AI recommendations based on session history
- Track streaks and aggregate stats

### Callbacks

Wire up these user actions:

| Callback | Description |
|----------|-------------|
| `onStartSession` | Start new focus session |
| `onPauseSession` | Pause active session |
| `onResumeSession` | Resume paused session |
| `onCancelSession` | Cancel/stop session |
| `onCompleteSession` | Mark session complete |
| `onStartBreak` | Begin break timer |
| `onSkipBreak` | Skip break and continue |
| `onSelectDay` | View sessions for a calendar day |
| `onSelectTask` | Link session to a task |

### Empty States

Implement empty state UI for when no records exist yet:

- **No sessions yet:** Show welcome with prompt to start first session
- **No sessions this month:** Show empty calendar with motivation
- **No active session:** Show prominent "Start Session" UI

## Files to Reference

- `product-plan/sections/focus-mode/README.md` — Feature overview
- `product-plan/sections/focus-mode/tests.md` — Test-writing instructions
- `product-plan/sections/focus-mode/components/` — React components
- `product-plan/sections/focus-mode/types.ts` — TypeScript interfaces
- `product-plan/sections/focus-mode/sample-data.json` — Test data
- `product-plan/sections/focus-mode/screenshot.png` — Visual reference

## Expected User Flows

### Flow 1: Start a Focus Session

1. User navigates to Focus Mode
2. User sees AI recommendation: "50 min + 10 min descanso"
3. User clicks recommended duration
4. User optionally links to a task
5. User clicks "Iniciar X minutos de foco"
6. **Outcome:** Timer starts, session recorded

### Flow 2: Complete Session and Take Break

1. Timer counts down to zero
2. Notification appears: "¡Sesión completada!"
3. User chooses "Descanso 5 min" or "Otra sesión"
4. If break, break timer starts
5. **Outcome:** Session logged, break begins

### Flow 3: Pause and Resume

1. User needs to step away during session
2. User clicks pause button
3. Timer pauses, pause count increments
4. User returns and clicks resume
5. **Outcome:** Session continues from where it paused

### Flow 4: Review History

1. User clicks on a day in the calendar
2. Sessions for that day display
3. User can see task worked on, duration, status
4. **Outcome:** User reviews past focus patterns

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Duration presets display with AI recommendation
- [ ] Timer counts down accurately
- [ ] Pause/resume works correctly
- [ ] Sessions save to database on completion
- [ ] Stats update (today time, streak, weekly progress)
- [ ] Calendar shows session history
- [ ] Empty states display properly
- [ ] Can link session to task
- [ ] Matches the visual design
- [ ] Responsive on mobile
