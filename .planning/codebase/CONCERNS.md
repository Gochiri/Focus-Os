# Codebase Concerns

**Analysis Date:** 2026-01-29

## Tech Debt

**Untyped Interval Handler:**
- Issue: `let interval: any = null` in focus timer logic bypasses TypeScript type safety
- Files: `focus-app/src/pages/FocusPage.tsx:50`
- Impact: Reduces type safety for timer state management; can lead to runtime errors if interval handling changes
- Fix approach: Type as `NodeJS.Timeout | null` and ensure proper cleanup in useEffect

**Missing Type Definitions:**
- Issue: Components use types `CalendarDay`, `FocusStats`, `DurationPreset` that are defined only in `/sections/focus-mode/types.ts` but imported from main `src/types/index.ts`
- Files: `focus-app/src/pages/FocusPage.tsx:3` imports missing types from main types file
- Impact: Type definitions scattered across sections folder and main app; no single source of truth for shared types
- Fix approach: Consolidate all types in `focus-app/src/types/index.ts` and remove duplication with `/sections/` folder types

**Type Mismatch in Goal Entity:**
- Issue: `Goal` interface in `src/types/index.ts` has `smart` and `rpm` fields typed as `SmartFields` and `RpmFields`, but pages use `smartFields` and `rpmFields` (camelCase variants)
- Files: `focus-app/src/pages/GoalsPage.tsx:24-35` (initialGoals data)
- Impact: Data structure doesn't match type definition; will cause TypeScript errors at runtime
- Fix approach: Rename fields in type definition to `smartFields` and `rpmFields` to match usage

## Known Bugs

**Native Alert/Confirm for UI Decisions:**
- Symptoms: Uses `alert()` and `window.confirm()` for user interactions, breaking modern UX
- Files: `focus-app/src/pages/FocusPage.tsx:72`, `focus-app/src/pages/TasksPage.tsx:127`, `focus-app/src/pages/GoalsPage.tsx:121`
- Trigger: Completing focus sessions, deleting tasks, deleting goals
- Workaround: Replace with modal components (already available: Tailwind-based UI)
- Severity: High - Poor UX for critical operations like deletion

**Uncontrolled Overflow in Fixed Panel:**
- Symptoms: `AICoachPanel` positioned as `fixed inset-y-0 right-0` with full height, can overlay content
- Files: `focus-app/src/components/coach/AICoachPanel.tsx:79`
- Trigger: Opening coach panel on mobile or in fullscreen mode
- Impact: Panel overlays main content, especially on small screens; not dismissible in all contexts
- Fix approach: Use absolute positioning in layout context or implement proper sidebar slide-over on mobile

## Security Considerations

**Hardcoded Demo Data and User:**
- Risk: User object hardcoded with fixed credentials; no authentication system in place
- Files: `focus-app/src/App.tsx:17-20`
- Current mitigation: Demo app only, but no auth guards on routes
- Recommendations:
  - Add authentication layer before production
  - Implement route guards for protected pages
  - Store user session in context or state management

**No Input Sanitization:**
- Risk: User inputs in chat, task creation, goal editing are displayed directly without validation
- Files: `focus-app/src/pages/CoachPage.tsx:56-82` (handleSendMessage), `focus-app/src/pages/TasksPage.tsx` (task data), `focus-app/src/pages/GoalsPage.tsx` (goal data)
- Impact: Potential XSS if data is persisted and rendered without escaping
- Recommendations:
  - Validate and sanitize all user inputs
  - Use React's built-in XSS protection (content is escaped by default)
  - Add input length limits and format validation

## Performance Bottlenecks

**Unnecessary Re-renders on Message Array:**
- Problem: `messages` array in `AICoachPanel` causes full component re-render on each new message
- Files: `focus-app/src/components/coach/AICoachPanel.tsx:132-139`
- Cause: Messages passed as prop, no memoization of message list or individual messages
- Improvement path: Implement React.memo on ChatMessage component; consider virtualization for long chat histories

**No Lazy Loading for Pages:**
- Problem: All page components imported eagerly in App.tsx with BrowserRouter
- Files: `focus-app/src/App.tsx:1-6`
- Impact: Larger initial bundle; all page code loaded even if user only visits one page
- Improvement path: Implement React.lazy with Suspense for route-based code splitting

**Calendar/Stats Recalculation:**
- Problem: `mockCalendarDays` and `mockStats` recalculated on every render in page components
- Files: `focus-app/src/pages/FocusPage.tsx:6-40`, `focus-app/src/pages/DashboardPage.tsx:5-151`
- Impact: Unnecessary object allocations each render, especially with large data
- Improvement path: Move mock data outside component or use useMemo; prepare for real API calls

## Fragile Areas

**Focus Timer Logic:**
- Files: `focus-app/src/pages/FocusPage.tsx:49-60`
- Why fragile: Timer state managed across `isActive`, `isPaused`, `timeLeft`, `totalTime`, `mode` with complex conditional dependencies; interval cleanup relies on dependency array correctness
- Safe modification: Add exhaustive tests for all state transitions; consider state machine pattern
- Test coverage: No test files detected; timer edge cases untested (rapid pause/play, cleanup on unmount)

**Coach Interaction State:**
- Files: `focus-app/src/pages/CoachPage.tsx:47-105`
- Why fragile: Message history, suggestions, and coach state split across three useState calls with no unified state management; actions (quick actions) don't update actual app state
- Safe modification: Consolidate into context or reducer; add error handling for async operations
- Test coverage: No error handling; messages added without validation; AI simulation hardcoded (1500ms delay)

**Data Model Coupling:**
- Files: `focus-app/src/types/index.ts`, `focus-app/src/pages/*.tsx`
- Why fragile: Multiple data schemas (Task, Goal, FocusSession) with circular references (`goalId` in Task, `linkedTasks` in Goal); no validation layer
- Safe modification: Add schema validation (Zod/io-ts); establish clear ownership of entity updates
- Test coverage: No validation tests

## Scaling Limits

**No State Management:**
- Current capacity: Works for 5-10 pages with local useState
- Limit: Will break when adding:
  - Real-time updates (AI coach, notifications)
  - Cross-page state (selecting task in one page, showing in another)
  - Persistent state (localStorage, server sync)
- Scaling path: Introduce React Context or state management library (Zustand/Redux) before adding backend integration

**Mock Data Hardcoded:**
- Current capacity: 6-8 tasks, 4 goals, ~40 focus sessions per page
- Limit: UI performance degrades visibly with >100 items; no pagination or virtualization
- Scaling path: Implement pagination before moving to real API; add virtualization for large lists

**Layout Fixed to Desktop:**
- Current capacity: Works on modern browsers with modern viewport sizes
- Limit: Mobile UX broken on screens <375px; no tablet optimization; fixed sidebars don't adapt
- Scaling path: Test on actual mobile devices; implement responsive breakpoints

## Dependencies at Risk

**React 19 + Router 7 Combination:**
- Risk: React 19 is very recent (2024); React Router 7 just released; limited community patterns and Stack Overflow help
- Impact: Future upgrades may require significant refactoring; bug reports less likely to have solutions
- Migration plan: Monitor for stability; pin versions in package-lock.json; consider moving to Next.js if backend integration required

**Tailwind CSS 4.1:**
- Risk: Version 4.x is recent; may have breaking changes in minor updates
- Impact: Styling regressions on upgrade; custom Tailwind config not checked
- Migration plan: Review tailwind config (`focus-app/tsconfig.json` references); test CSS build on major version changes

## Missing Critical Features

**No Data Persistence:**
- Problem: All data exists only in React state; page refresh loses all user data
- Blocks: Can't make app functional for real use; no way to track productivity over time
- Priority: Critical - Must implement before beta testing

**No Error Boundaries:**
- Problem: Single component error crashes entire app; no error recovery
- Blocks: Can't gracefully handle API failures, async errors, or bad data
- Priority: High - Add Error Boundary wrapper around routes

**No Offline Support:**
- Problem: App requires network connectivity (for future AI integration) but no offline fallback
- Blocks: Can't function in poor network conditions; no service worker
- Priority: Medium - Implement after backend integration

**No Notification System:**
- Problem: Coach suggests proactive feedback but no way to notify user while working
- Blocks: Can't implement check-ins, reminders, procrastination alerts as described
- Priority: High - Needed for AI Coach functionality

**No Task/Goal Creation UI:**
- Problem: Pages show console.log() placeholders for onCreate, onEdit handlers
- Files: `focus-app/src/pages/TasksPage.tsx:142`, `focus-app/src/pages/GoalsPage.tsx:127`
- Blocks: Users can only view demo data; no way to create new tasks or goals
- Priority: Critical

## Test Coverage Gaps

**No Unit Tests:**
- What's not tested: All component logic, utility functions, type safety
- Files: Entire `src/` directory; no `.test.tsx` or `.spec.ts` files found
- Risk: Refactoring blind; regressions only caught in manual testing
- Priority: High

**No Integration Tests:**
- What's not tested: Data flow between pages, state management, async operations
- Files: No test setup (Jest/Vitest) configured or used
- Risk: Breaking changes in component communication undetected
- Priority: High - Add before implementing backend API

**No E2E Tests:**
- What's not tested: User workflows (create task → start focus → complete), navigation, real-world scenarios
- Files: No E2E setup (Cypress/Playwright) configured
- Risk: Critical user flows can break without detection
- Priority: Medium - Implement after core features stabilize

**Timer Edge Cases Untested:**
- Specific gaps: Pause during last second, tab focus loss, rapid state changes, browser sleep
- Files: `focus-app/src/pages/FocusPage.tsx:49-80`
- Risk: Timer may malfunction in real use; completion logic may skip
- Priority: High

**Type System Underutilized:**
- Specific gaps: No exhaustiveness checks; missing types on props; `any` types bypass safety
- Files: `focus-app/src/pages/FocusPage.tsx:50`, imports from wrong type files
- Risk: Silent failures when data structure changes
- Priority: Medium - Enable strict mode, add strict prop typing

---

*Concerns audit: 2026-01-29*
