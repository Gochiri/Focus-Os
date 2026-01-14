# Test Instructions: Focus Mode

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

Test the Pomodoro-style focus session system: starting sessions, timer functionality, pause/resume, break handling, and history tracking.

---

## User Flow Tests

### Flow 1: Start a Focus Session

**Scenario:** User starts a recommended focus session

#### Success Path

**Setup:**
- User is on Focus Mode page
- AI has recommendation: 50 min

**Steps:**
1. User sees AI recommendation card
2. User clicks "Usar 50 min + 10 min descanso" button
3. User optionally links a task
4. User clicks "Iniciar 50 minutos de foco"
5. Session starts

**Expected Results:**
- [ ] AI recommendation visible with reason
- [ ] Duration presets displayed as cards
- [ ] Clicking preset selects it (visual highlight)
- [ ] "Iniciar X minutos" button shows correct duration
- [ ] Timer starts counting down
- [ ] Session saved to database

### Flow 2: Complete Session and Take Break

**Scenario:** User finishes session and chooses to take break

#### Success Path

**Setup:**
- Active session with 2 minutes remaining
- Timer counts to zero

**Steps:**
1. Timer reaches 00:00
2. Notification/modal appears: "¡Sesión completada!"
3. User clicks "Descanso 5 min"
4. Break timer starts

**Expected Results:**
- [ ] Completion notification appears
- [ ] Options: "Descanso 5 min", "Otra sesión", "Terminar"
- [ ] Clicking "Descanso" starts break timer
- [ ] Session marked as completed
- [ ] Stats update (today's time increases)

### Flow 3: Pause and Resume Session

**Scenario:** User needs to pause during session

#### Success Path

**Setup:**
- Active session in progress (10 min elapsed)

**Steps:**
1. User clicks pause button
2. Timer pauses
3. User clicks resume
4. Timer continues

**Expected Results:**
- [ ] Pause button visible during active session
- [ ] Timer stops when paused
- [ ] "Pausado" indicator shows
- [ ] Resume button appears
- [ ] Timer continues from where it paused
- [ ] Pause count increments

### Flow 4: Cancel Session

**Scenario:** User cancels session early

#### Success Path

**Setup:**
- Active session in progress

**Steps:**
1. User clicks cancel/stop button
2. Confirmation appears
3. User confirms cancellation

**Expected Results:**
- [ ] Cancel button visible
- [ ] Confirmation: "¿Cancelar sesión? El tiempo no se guardará."
- [ ] Confirming ends session
- [ ] Session marked as "interrupted"
- [ ] Returns to session start view

### Flow 5: View Session History

**Scenario:** User reviews past sessions in calendar

#### Success Path

**Setup:**
- User has sessions on various days this month

**Steps:**
1. User views Focus Mode page
2. User sees calendar with colored days
3. User clicks on a day with sessions
4. Sessions for that day display

**Expected Results:**
- [ ] Calendar shows current month
- [ ] Days with sessions have color intensity
- [ ] Clicking day shows sessions list
- [ ] Session details: task name, duration, time, status

---

## Empty State Tests

### No Sessions Yet

**Scenario:** First-time user on Focus Mode

**Setup:**
- focusSessions is empty (`[]`)
- No active session

**Expected Results:**
- [ ] Shows welcome prompt
- [ ] Stats show: "0h 0m Hoy en foco"
- [ ] Streak shows: "0 días de racha"
- [ ] Calendar shows empty (no colored days)
- [ ] "Iniciar primera sesión" CTA prominent

### No Sessions This Month

**Scenario:** Calendar month has no sessions

**Setup:**
- User navigates to month with no sessions

**Expected Results:**
- [ ] Calendar renders correctly
- [ ] All days show neutral color (no activity)
- [ ] Legend shows "Menos" to "Más" scale
- [ ] User can navigate to other months

### No Linked Task

**Scenario:** User starts session without linking task

**Setup:**
- User doesn't select a task

**Expected Results:**
- [ ] "Vincular a una tarea (opcional)" shows
- [ ] Session can start without task
- [ ] Session saved with `task: null`
- [ ] Recent sessions show "Sesión libre" for unlinked

---

## Component Interaction Tests

### FocusModeDashboard

**Renders correctly:**
- [ ] Stats: today time, streak, sessions count, average
- [ ] Weekly progress bar with goal
- [ ] AI recommendation card
- [ ] Duration selector
- [ ] Recent sessions list
- [ ] Calendar

### DurationSelector

**Renders correctly:**
- [ ] 4 preset cards: 25min, 50min, 15min, 90min
- [ ] AI-recommended preset has "IA" badge
- [ ] "Duración personalizada" option

**User interactions:**
- [ ] Clicking preset selects it (highlighted border)
- [ ] Custom option opens duration input
- [ ] Selection calls callback with minutes and break time

### FocusCalendar

**Renders correctly:**
- [ ] Month name and year in header
- [ ] Navigation arrows for prev/next month
- [ ] Day names row (Dom, Lun, Mar, etc.)
- [ ] Days grid with correct date numbers
- [ ] Color intensity based on session minutes

**User interactions:**
- [ ] Clicking day calls `onSelectDay` with date
- [ ] Prev/next buttons change month
- [ ] Today's date highlighted

---

## Edge Cases

- [ ] Timer works correctly across minute boundaries
- [ ] Long sessions (90+ min) count down correctly
- [ ] Multiple pauses in one session tracked
- [ ] Session spans midnight (rare edge case)
- [ ] Streak calculation handles timezone correctly
- [ ] Very active day (5+ hours) shows max intensity
- [ ] Browser tab switching doesn't break timer

---

## Sample Test Data

```typescript
const mockFocusStats = {
  todayMinutes: 145,
  todaySessions: 5,
  currentStreak: 12,
  bestStreak: 21,
  weeklyMinutes: 840,
  weeklyGoal: 1200,
  averageSessionLength: 28
};

const mockDurationPresets = [
  { id: "p1", minutes: 25, breakMinutes: 5, label: "Pomodoro clásico", isRecommended: false, aiReason: null },
  { id: "p2", minutes: 50, breakMinutes: 10, label: "Sesión larga", isRecommended: true, aiReason: "Basado en tu historial, rindes mejor en sesiones de 50 minutos" },
  { id: "p3", minutes: 15, breakMinutes: 3, label: "Sprint rápido", isRecommended: false, aiReason: null },
  { id: "p4", minutes: 90, breakMinutes: 15, label: "Deep work", isRecommended: false, aiReason: null }
];

const mockFocusSession = {
  id: "fs-1",
  date: "2026-01-13",
  startTime: "08:30",
  endTime: "09:20",
  durationMinutes: 50,
  breakMinutes: 10,
  status: "completed",
  task: { id: "task-1", title: "Diseñar onboarding" },
  pauseCount: 0
};

const mockActiveSession = {
  id: "as-1",
  startedAt: "2026-01-13T10:00:00Z",
  durationMinutes: 50,
  breakMinutes: 10,
  elapsedSeconds: 1500, // 25 min
  status: "in_progress",
  isPaused: false,
  pauseCount: 0,
  task: { id: "task-2", title: "Preparar presentación" }
};

// Empty states
const mockEmptySessions = [];
const mockNoActiveSession = null;
```
