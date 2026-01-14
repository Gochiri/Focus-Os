# Test Instructions: AI Coach

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

Test the AI coach panel: opening/closing, chat messaging, quick actions, proactive suggestions, and integrations with other sections.

---

## User Flow Tests

### Flow 1: Open and Close Panel

**Scenario:** User opens AI coach from floating button

#### Success Path

**Setup:**
- User is on any page
- Coach panel is closed

**Steps:**
1. User clicks floating coach button (bottom-right)
2. Panel slides open from right
3. User clicks X button to close

**Expected Results:**
- [ ] Floating button visible on all pages
- [ ] Panel slides in smoothly (200ms animation)
- [ ] Panel shows header: "AI Coach"
- [ ] Close button (X) in header works
- [ ] Panel slides out when closed

### Flow 2: Send Message and Receive Response

**Scenario:** User chats with the AI coach

#### Success Path

**Setup:**
- Panel is open
- Chat history may have previous messages

**Steps:**
1. User types in input: "¿Qué debería hacer primero?"
2. User presses Enter or clicks send
3. User message appears in chat
4. AI typing indicator shows
5. AI responds

**Expected Results:**
- [ ] Input accepts text
- [ ] Send button enables when text entered
- [ ] User message appears immediately (right-aligned)
- [ ] "Escribiendo..." indicator shows
- [ ] AI response appears (left-aligned with bot icon)
- [ ] Input clears after sending

#### Failure Path: Send Fails

**Setup:**
- API returns error

**Steps:**
1. User sends message
2. Server returns error

**Expected Results:**
- [ ] Error message: "No se pudo enviar. Intenta de nuevo."
- [ ] User message marked as failed
- [ ] Retry option available
- [ ] Input text preserved

### Flow 3: Execute Quick Action

**Scenario:** User clicks quick action button in AI response

#### Success Path

**Setup:**
- AI response includes quick action: "Iniciar Focus Mode"

**Steps:**
1. User clicks "Iniciar Focus Mode" button
2. Action executes

**Expected Results:**
- [ ] Button shows loading state briefly
- [ ] Focus session starts (integrates with Focus Mode)
- [ ] Chat shows confirmation: "Focus Mode iniciado • 25 min"
- [ ] User can continue chatting

### Flow 4: Handle Proactive Suggestion

**Scenario:** AI shows procrastination alert

#### Success Path

**Setup:**
- Coach detects user avoiding task for 3 days
- Proactive suggestion appears

**Steps:**
1. User opens coach panel
2. Suggestion card shows at top
3. User clicks "Dividir en pasos"
4. Action executes

**Expected Results:**
- [ ] Suggestion card visible above chat
- [ ] Card shows: title, message, referenced task
- [ ] Action buttons: "Dividir en pasos", "Empezar ahora", "Recordar mañana"
- [ ] Clicking action calls `onSuggestionAction`
- [ ] Card can be dismissed with X

### Flow 5: Morning Check-In

**Scenario:** User responds to daily check-in prompt

#### Success Path

**Setup:**
- Morning time
- Check-in suggestion appears

**Steps:**
1. User opens coach panel
2. Check-in card: "¿Cuál es tu prioridad #1 hoy?"
3. User clicks "Responder"
4. User types their priority
5. Coach acknowledges

**Expected Results:**
- [ ] Check-in card styled differently (reflection type)
- [ ] Clicking "Responder" scrolls to input
- [ ] User can type response
- [ ] Coach responds with acknowledgment and support

---

## Empty State Tests

### No Chat History

**Scenario:** First-time user opens coach panel

**Setup:**
- Messages array is empty (`[]`)

**Expected Results:**
- [ ] Panel opens successfully
- [ ] Shows welcome message from coach: "¡Hola! Soy tu coach de productividad..."
- [ ] Input is ready for first message
- [ ] No blank panel

### No Proactive Suggestions

**Scenario:** No active suggestions to show

**Setup:**
- proactiveSuggestions is empty (`[]`)

**Expected Results:**
- [ ] No suggestion cards at top
- [ ] Chat history displays normally
- [ ] Shows "Al día" or similar (all caught up)

---

## Component Interaction Tests

### AICoachPanel

**Renders correctly:**
- [ ] Header shows "AI Coach" and "Tu asistente de productividad"
- [ ] Stats show: focus time today, streak days
- [ ] Suggestions section (if any)
- [ ] Chat history scrollable
- [ ] Input at bottom

**User interactions:**
- [ ] Typing in input enables send button
- [ ] Enter key sends message
- [ ] Scroll to bottom when new message arrives
- [ ] Close button works

### ChatMessage

**User message:**
- [ ] Right-aligned
- [ ] User avatar/initials
- [ ] Timestamp shows

**AI message:**
- [ ] Left-aligned with bot icon
- [ ] May have quick action buttons
- [ ] May reference a task (shows task card)
- [ ] Timestamp shows

### ProactiveSuggestionCard

**Renders correctly:**
- [ ] Icon based on type (alert, check-in, suggestion)
- [ ] Title and message
- [ ] Referenced task if applicable
- [ ] Action buttons

**User interactions:**
- [ ] Clicking action button calls `onSuggestionAction`
- [ ] Dismiss button calls `onDismissSuggestion`

---

## Edge Cases

- [ ] Very long messages wrap properly
- [ ] Rapid messages don't break UI
- [ ] Panel state preserved when switching sections
- [ ] Badge count updates when new suggestions arrive
- [ ] Works with slow network (shows loading states)
- [ ] Quick actions work even if chat API is slow

---

## Sample Test Data

```typescript
const mockMessage = {
  id: "msg-1",
  type: "ai",
  content: "Buenos días. Tienes 4 tareas de alto impacto pendientes. ¿Te ayudo a priorizarlas?",
  timestamp: "2026-01-13T08:30:00Z",
  quickActions: [
    { id: "qa-1", label: "Sí, prioricemos", action: "prioritize_tasks" },
    { id: "qa-2", label: "Mostrar tareas", action: "show_high_impact" }
  ]
};

const mockUserMessage = {
  id: "msg-2",
  type: "user",
  content: "Sí, ayúdame a ver qué debería hacer primero",
  timestamp: "2026-01-13T08:31:00Z"
};

const mockSuggestion = {
  id: "ps-1",
  type: "procrastination_alert",
  title: "¿Necesitas ayuda con esta tarea?",
  message: "He notado que 'Preparar presentación' lleva 3 días sin avance.",
  referencedTask: { id: "task-1", title: "Preparar presentación" },
  priority: "high",
  actions: [
    { id: "a1", label: "Dividir en pasos", action: "break_down_task" },
    { id: "a2", label: "Empezar ahora", action: "start_focus" },
    { id: "a3", label: "Recordar mañana", action: "snooze" }
  ]
};

const mockCoachState = {
  isTyping: false,
  unreadSuggestions: 2,
  todayFocusMinutes: 145,
  currentStreak: 5,
  lastCheckIn: "2026-01-13T08:00:00Z"
};

// Empty states
const mockEmptyMessages = [];
const mockEmptySuggestions = [];
```
