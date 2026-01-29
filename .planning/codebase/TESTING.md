# Testing Patterns

**Analysis Date:** 2026-01-29

## Test Framework

**Runner:**
- Not detected - no testing framework configured
- No test configuration files found (jest.config.js, vitest.config.ts, etc.)

**Assertion Library:**
- Not applicable - no tests present

**Run Commands:**
```bash
npm run dev              # Development mode
npm run build           # Production build (runs tsc then vite build)
npm run lint            # ESLint check
npm run preview         # Preview production build locally
```

## Test File Organization

**Location:**
- No test files present in source tree
- Application is currently untested

**Naming:**
- Pattern would be `.test.tsx` or `.spec.tsx` based on TypeScript configuration
- No existing examples to reference

**Structure:**
- Not applicable - no tests exist

## Test Framework Recommendations

**Suggested Setup:**

For a React + TypeScript application, the following would be appropriate:

**Unit/Component Testing:**
- Framework: Vitest (modern, fast, TypeScript-native)
- Alternative: Jest with ts-jest
- Assertion library: Vitest built-in or Chai
- DOM Testing: React Testing Library

**Configuration Example (Recommended):**
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
})
```

**Test File Placement:**
- Co-locate tests with components: `TaskCard.tsx` + `TaskCard.test.tsx` in same directory
- Utilities: `src/__tests__/utils/` for shared test helpers
- Fixtures: `src/__tests__/fixtures/` for mock data

## Mocking

**Framework:** Would use Vitest's built-in mocking or vitest/mock

**Patterns to Use (Recommended):**

For React components with handlers:
```typescript
// Example mocking pattern based on component structure
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TaskCard } from './TaskCard'

describe('TaskCard', () => {
  it('should call onComplete when checkbox clicked', () => {
    const onComplete = vi.fn()
    render(
      <TaskCard
        task={mockTask}
        tags={[]}
        onComplete={onComplete}
      />
    )
    screen.getByRole('button', { name: /checkbox/i }).click()
    expect(onComplete).toHaveBeenCalled()
  })
})
```

**What to Mock:**
- Callback handlers passed as props (onComplete, onEdit, onDelete, etc.)
- External dependencies (API calls, localStorage)
- Lucide React icons can be rendered directly in tests
- Router navigation (if testing with react-router-dom)

**What NOT to Mock:**
- React hooks (useState, useCallback) - test actual behavior
- Component render logic - test what users see
- Tailwind CSS classes - rely on DOM structure testing, not styles

## Fixtures and Factories

**Test Data:**

The application defines comprehensive data structures in `src/types/index.ts`. Test fixtures should follow these patterns:

```typescript
// Example fixture factory based on existing Task type
export const createMockTask = (overrides?: Partial<Task>): Task => ({
  id: 'task-001',
  title: 'Sample Task',
  notes: 'Sample notes',
  priority: 'high',
  status: 'pending',
  deadline: '2024-01-28',
  estimatedMinutes: 60,
  progress: 0,
  projectId: null,
  goalId: null,
  tagIds: [],
  blockedBy: [],
  ...overrides,
})

export const createMockProject = (overrides?: Partial<Project>): Project => ({
  id: 'proj-001',
  name: 'Sample Project',
  color: 'violet',
  ...overrides,
})
```

**Location:**
- `src/__tests__/fixtures/` for reusable test data
- Or `src/__tests__/mocks/` for mock factories
- Import and use in test files as needed

## Coverage

**Requirements:**
- Not enforced currently
- Suggested baseline: 70%+ coverage for components and utilities

**View Coverage:**
```bash
# After configuring Vitest
npm run test -- --coverage

# Generates coverage report in coverage/ directory
```

**Coverage Focus Areas:**
- Component render logic (snapshot testing)
- Event handlers and callbacks
- Conditional rendering branches
- Utility functions for formatting (formatDate, formatMinutes, etc.)

## Test Types

**Unit Tests:**
- Scope: Individual functions and components in isolation
- Approach: Test component props, state changes, callback invocation
- Example: TaskCard with different status values (completed, blocked, in_progress)
- File location: `src/components/tasks/TaskCard.test.tsx`

**Integration Tests:**
- Scope: Multiple components working together (e.g., TasksPage with TaskCard and TaskFilters)
- Approach: Render page, trigger interactions, verify state flows correctly
- Example: Filter tasks by project, verify only matching tasks display
- File location: `src/pages/TasksPage.test.tsx`

**E2E Tests:**
- Framework: Not detected - would use Playwright or Cypress
- Not currently implemented
- Recommended for: Full user journeys (login → create task → mark complete)

## Common Patterns

**Async Testing:**

For components using async operations (when implemented):
```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'

describe('Async Component', () => {
  it('should load and display data', async () => {
    const mockFetch = vi.fn(() => Promise.resolve({ data: [] }))

    render(<MyComponent />)

    await waitFor(() => {
      expect(screen.getByText('loaded')).toBeInTheDocument()
    })
  })
})
```

**Error Testing:**

For error scenarios (relevant when error handling is added):
```typescript
it('should handle missing props gracefully', () => {
  const { rerender } = render(
    <TaskCard task={null} tags={[]} />
  )

  expect(screen.getByText('Task not found')).toBeInTheDocument()
})
```

**User Interaction Testing:**

Pattern based on component structure:
```typescript
import { userEvent } from '@testing-library/user-event'

it('should open menu on button click', async () => {
  const user = userEvent.setup()
  render(<TaskCard task={mockTask} tags={[]} />)

  const menuButton = screen.getByRole('button', { name: 'more' })
  await user.click(menuButton)

  expect(screen.getByText('Edit')).toBeInTheDocument()
})
```

## Snapshot Testing

**When to Use:**
- UI components with consistent output (MetricCard, AchievementBadge)
- Large JSX structures that don't change frequently
- NOT for components that accept dynamic props

**Pattern:**
```typescript
it('should match snapshot', () => {
  const { container } = render(
    <MetricCard
      label="Test"
      value={100}
      icon="clock"
      color="violet"
    />
  )
  expect(container).toMatchSnapshot()
})
```

## Testing Utilities and Helpers

**Recommended Setup:**

Create `src/__tests__/setup.ts`:
```typescript
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Auto-cleanup after each test
afterEach(() => {
  cleanup()
})

// Custom matchers can be added here
```

**Helper Functions:**

Create `src/__tests__/utils.tsx`:
```typescript
import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Custom render with providers (router, context, etc.)
export function renderWithRouter(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <BrowserRouter>{children}</BrowserRouter>
    ),
    ...options
  })
}
```

## Current Test Status

**Summary:**
- No tests are currently implemented
- Strong type system (TypeScript strict mode) provides some safety
- ESLint configuration ensures code quality
- Testing framework needs to be added for production-ready codebase

**Priority for Implementation:**
1. **High:** Component unit tests for reusable components (TaskCard, MetricCard, ChatMessage)
2. **High:** Page/integration tests for main features (TasksPage, DashboardPage)
3. **Medium:** Utility function tests (formatDate, formatMinutes)
4. **Medium:** E2E tests for critical user paths
5. **Low:** Snapshot tests for stable UI components

---

*Testing analysis: 2026-01-29*
