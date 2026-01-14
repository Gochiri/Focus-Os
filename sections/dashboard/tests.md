# Test Instructions: Dashboard

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

Test the productivity dashboard: metrics display, period switching, goal progress, AI insights, achievements, and motivational elements.

---

## User Flow Tests

### Flow 1: View Today's Productivity

**Scenario:** User views their daily productivity summary

#### Success Path

**Setup:**
- User has activity today
- Metrics calculated

**Steps:**
1. User navigates to Dashboard
2. User sees productivity score gauge
3. User sees metrics grid
4. User sees goal progress

**Expected Results:**
- [ ] Default period is "Hoy"
- [ ] Score gauge shows: "78 de 100" with "Muy bien" label
- [ ] Comparison shows: "+13 vs período anterior"
- [ ] Metrics show: focus time, sessions, tasks completed, high impact ratio
- [ ] Streak badge shows: "12 días de racha"

### Flow 2: Switch to Weekly View

**Scenario:** User changes period to see weekly stats

#### Success Path

**Setup:**
- Weekly data exists

**Steps:**
1. User clicks "Esta semana" toggle
2. Dashboard updates

**Expected Results:**
- [ ] "Esta semana" button shows selected state
- [ ] Score changes to weekly average
- [ ] Metrics update to weekly totals
- [ ] Trend chart shows last 7 days
- [ ] Comparison shows vs previous week

### Flow 3: Review Goal Progress

**Scenario:** User checks progress on active goals

#### Success Path

**Setup:**
- User has 4 active goals

**Steps:**
1. User scrolls to "Progreso de metas" section
2. User sees goal cards with progress
3. User clicks on a goal card

**Expected Results:**
- [ ] Goal cards show: title, progress %, task count, due date
- [ ] Progress bar reflects percentage
- [ ] Status badge (En progreso, Por iniciar, etc.)
- [ ] Clicking navigates to goal detail in Goals section

### Flow 4: Dismiss AI Insight

**Scenario:** User dismisses an AI insight card

#### Success Path

**Setup:**
- AI insights exist

**Steps:**
1. User sees "Insights de la IA" section
2. User reads insight: "Tu mejor momento es la mañana"
3. User clicks dismiss (X) button
4. Insight disappears

**Expected Results:**
- [ ] Insight cards display in grid
- [ ] Each has dismiss button
- [ ] Clicking dismiss calls `onDismissInsight`
- [ ] Card animates out
- [ ] Other insights remain

### Flow 5: Refresh Motivational Quote

**Scenario:** User wants a new motivational quote

#### Success Path

**Setup:**
- Motivational card shows current quote

**Steps:**
1. User sees motivational card with quote
2. User clicks refresh icon
3. New quote loads

**Expected Results:**
- [ ] Quote displays with author attribution
- [ ] AI insight below quote
- [ ] Refresh button visible
- [ ] Clicking refresh loads new quote
- [ ] Loading state shows briefly

---

## Empty State Tests

### New User Dashboard

**Scenario:** First-time user with no activity

**Setup:**
- All metrics are zero
- No goals, sessions, or tasks

**Expected Results:**
- [ ] Score gauge shows: "0 de 100"
- [ ] Metrics show zeros with helpful context
- [ ] Goal section: "No hay metas activas" with CTA
- [ ] Insights section: "Completa algunas tareas para ver insights"
- [ ] Motivational card still shows (always available)
- [ ] Dashboard doesn't look broken or empty

### No Goals Yet

**Scenario:** User has activity but no goals

**Setup:**
- Focus sessions and tasks exist
- Goals array is empty

**Expected Results:**
- [ ] "Progreso de metas" shows: "Sin metas activas"
- [ ] CTA button: "Crear primera meta"
- [ ] Clicking navigates to Goals section
- [ ] Other dashboard sections work normally

### No Insights Available

**Scenario:** Not enough data for AI insights

**Setup:**
- User is new or has limited activity
- aiInsights is empty

**Expected Results:**
- [ ] "Insights de la IA" section shows placeholder
- [ ] Message: "Continúa usando la app para ver insights personalizados"
- [ ] No broken layout

### No Achievements Unlocked

**Scenario:** User hasn't earned any achievements

**Setup:**
- All achievements have `unlockedAt: null`

**Expected Results:**
- [ ] "Logros" section shows locked badges
- [ ] Locked badges are grayed out / faded
- [ ] Hover shows: "Por desbloquear: [achievement title]"
- [ ] Clicking shows requirements to unlock

---

## Component Interaction Tests

### ProductivityGauge

**Renders correctly:**
- [ ] Circular gauge with score number
- [ ] Label: "Muy bien", "Excelente", etc. based on score
- [ ] Comparison vs previous period

**Score ranges:**
- [ ] 0-30: "Bajo" with warning color
- [ ] 31-60: "Regular" with amber
- [ ] 61-80: "Muy bien" with green
- [ ] 81-100: "Excelente" with violet

### MetricCard

**Renders correctly:**
- [ ] Icon with color
- [ ] Value (number or formatted time)
- [ ] Label
- [ ] Comparison indicator (↑↓)

### TrendChart

**Renders correctly:**
- [ ] Line chart with 7 data points
- [ ] Day labels (lu, ma, mi, etc.)
- [ ] Min/Max/Average stats below

### GoalProgressCard

**Renders correctly:**
- [ ] Status badge
- [ ] Title
- [ ] Progress bar and percentage
- [ ] Tasks count: "8/12 tareas"
- [ ] Due date with icon

**User interactions:**
- [ ] Clicking card calls `onGoalClick`
- [ ] Hover shows pointer cursor

### AchievementBadge

**Renders correctly:**
- [ ] Icon for achievement type
- [ ] Title
- [ ] Date unlocked (or "Bloqueado")
- [ ] Locked state visually distinct

---

## Edge Cases

- [ ] Very high score (100) displays correctly
- [ ] Zero values don't break layout
- [ ] Very long goal titles truncate
- [ ] Many goals (10+) scrollable
- [ ] Many insights (5+) handled gracefully
- [ ] Period switch preserves scroll position
- [ ] Negative comparison (worse than before) shows red

---

## Sample Test Data

```typescript
const mockMetrics = {
  today: {
    productivityScore: 78,
    previousScore: 65,
    focusMinutes: 145,
    previousFocusMinutes: 120,
    sessionsCompleted: 5,
    previousSessions: 4,
    tasksCompleted: 7,
    previousTasksCompleted: 5,
    highImpactCompleted: 3,
    highImpactTotal: 4,
    streakDays: 12
  },
  week: { /* similar structure */ },
  month: { /* similar structure */ }
};

const mockGoalProgress = {
  id: "goal-1",
  title: "Lanzar la app móvil",
  progress: 70,
  dueDate: "2026-03-14",
  status: "en_progreso",
  tasksCompleted: 8,
  tasksTotal: 12
};

const mockAIInsight = {
  id: "insight-1",
  type: "positive",
  title: "Tu mejor momento es la mañana",
  message: "El 70% de tus tareas de alto impacto las completas antes de las 12pm.",
  priority: "medium"
};

const mockAchievement = {
  id: "ach-1",
  title: "Primera semana",
  description: "Completa 7 días consecutivos",
  icon: "calendar",
  unlockedAt: "2026-01-07",
  category: "streak"
};

const mockMotivationalCard = {
  quote: "El secreto de avanzar es comenzar.",
  author: "Mark Twain",
  aiInsight: "Has completado 3 tareas de alto impacto hoy. ¡Sigue así!",
  date: "2026-01-13"
};

// Empty states
const mockEmptyGoals = [];
const mockEmptyInsights = [];
const mockLockedAchievement = { ...mockAchievement, unlockedAt: null };
```
