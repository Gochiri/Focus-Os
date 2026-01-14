# Milestone 4: AI Coach

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestones 1-3 complete

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

Implement the AI Coach feature — conversational coach panel with proactive suggestions, check-ins, and procrastination detection.

## Overview

This section provides a collapsible right-side panel with an AI productivity coach. The coach can have conversations, execute actions in the app, send proactive suggestions, and conduct daily check-ins. It's accessible from any section via a floating action button.

**Key Functionality:**
- Open/close coach panel via floating button
- Conversational chat with AI coach
- Execute app actions from chat (create task, start focus, complete task)
- Receive proactive suggestions based on user behavior
- Morning check-in and evening reflection prompts
- Procrastination alerts when avoiding high-impact tasks

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/ai-coach/tests.md` for detailed test-writing instructions including:
- Key user flows to test (success and failure paths)
- Specific UI elements, button labels, and interactions to verify
- Expected behaviors and assertions

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/ai-coach/components/`:

- `AICoachPanel.tsx` — Main panel with chat and suggestions
- `ChatMessage.tsx` — Individual message bubble
- `ProactiveSuggestionCard.tsx` — Suggestion card above chat

### Data Layer

The components expect these data shapes:

```typescript
interface Message {
  id: string
  type: 'user' | 'ai' | 'reflection' | 'procrastination_alert'
  content: string
  timestamp: string
  quickActions?: QuickAction[]
  referencedTask?: { id: string; title: string }
  actionExecuted?: { type: string; taskId?: string; duration?: number }
}

interface ProactiveSuggestion {
  id: string
  type: 'procrastination_alert' | 'check_in' | 'suggestion' | 'reflection'
  title: string
  message: string
  referencedTask?: { id: string; title: string }
  priority: 'high' | 'medium' | 'low'
  actions: Array<{ id: string; label: string; action: string; taskId?: string }>
}

interface CoachState {
  isTyping: boolean
  unreadSuggestions: number
  todayFocusMinutes: number
  currentStreak: number
  lastCheckIn: string
}
```

You'll need to:
- Integrate with an LLM API for chat responses
- Build logic to generate proactive suggestions
- Track user behavior for procrastination detection
- Schedule morning/evening check-ins

### Callbacks

Wire up these user actions:

| Callback | Description |
|----------|-------------|
| `onSendMessage` | Send user message to AI |
| `onQuickAction` | Execute quick action from message |
| `onSuggestionAction` | Execute action from suggestion card |
| `onDismissSuggestion` | Dismiss/hide a suggestion |
| `onOpen` | Open the coach panel |
| `onClose` | Close the coach panel |

### Empty States

Implement empty state UI for when no records exist yet:

- **No chat history:** Show welcome message from coach
- **No suggestions:** Show "All caught up" state
- **First-time user:** Show onboarding prompts from coach

## Files to Reference

- `product-plan/sections/ai-coach/README.md` — Feature overview
- `product-plan/sections/ai-coach/tests.md` — Test-writing instructions
- `product-plan/sections/ai-coach/components/` — React components
- `product-plan/sections/ai-coach/types.ts` — TypeScript interfaces
- `product-plan/sections/ai-coach/sample-data.json` — Test data
- `product-plan/sections/ai-coach/screenshot.png` — Visual reference

## Expected User Flows

### Flow 1: Chat with Coach

1. User clicks floating coach button
2. Panel slides open from right
3. User types message and presses Enter
4. AI responds with helpful advice
5. **Outcome:** Conversation continues with context awareness

### Flow 2: Execute Action from Chat

1. Coach suggests starting a focus session
2. User clicks "Iniciar Focus Mode" button in chat
3. Focus session starts (integrates with Focus Mode section)
4. Chat shows confirmation message
5. **Outcome:** User taken to active focus session

### Flow 3: Handle Proactive Suggestion

1. Coach detects user avoiding high-impact task for 3 days
2. Suggestion card appears at top of panel
3. User can click "Dividir en pasos", "Empezar ahora", or "Recordar mañana"
4. Action executes accordingly
5. **Outcome:** User gets nudge to address important task

### Flow 4: Complete Morning Check-In

1. User opens app in morning
2. Coach presents check-in: "¿Cuál es tu prioridad #1 hoy?"
3. User responds with their priority
4. Coach acknowledges and offers to help plan
5. **Outcome:** User starts day with clear focus

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Panel opens/closes smoothly
- [ ] Chat messages send and receive
- [ ] AI responds contextually (integrate LLM)
- [ ] Quick actions execute correctly
- [ ] Proactive suggestions appear based on behavior
- [ ] Badge shows unread suggestion count
- [ ] Empty states display properly
- [ ] Panel accessible from any section
- [ ] Matches the visual design
- [ ] Responsive on mobile
