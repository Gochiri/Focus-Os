# Coding Conventions

**Analysis Date:** 2026-01-29

## Naming Patterns

**Files:**
- React components: PascalCase (e.g., `TaskCard.tsx`, `AppShell.tsx`, `MainNav.tsx`)
- Type definitions: index.ts in directories (e.g., `src/types/index.ts`)
- Utility/helper files: camelCase for functions (e.g., `formatDate`, `formatMinutes`)

**Functions:**
- React component functions: PascalCase (e.g., `function TaskCard()`, `function Dashboard()`)
- Non-component functions: camelCase (e.g., `formatDate`, `formatMinutes`, `toggleTag`)
- Handler functions: onEvent pattern (e.g., `onComplete`, `onEdit`, `onDelete`, `onNavigate`)
- Setter functions: toggle prefix (e.g., `toggleTag`)

**Variables:**
- React state: camelCase (e.g., `menuOpen`, `projectDropdownOpen`, `selectedProjectId`)
- Constants: camelCase or UPPER_SNAKE_CASE for config (e.g., `initialTasks`, `navigationItems`)
- Arrays/collections: plural form (e.g., `tasks`, `projects`, `tags`, `items`)

**Types:**
- Interfaces: PascalCase with Props suffix for component props (e.g., `TaskCardProps`, `AppShellProps`, `MainNavProps`)
- Type aliases: PascalCase (e.g., `TaskPriority`, `TaskStatus`, `GoalStatus`)
- Union types: single quotes for string literals (e.g., `type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'blocked'`)

## Code Style

**Formatting:**
- Tool: Tailwind CSS for styling (no separate CSS files for components)
- Line length: No strict limit enforced but components avoid excessive nesting
- Spacing: 2 spaces for indentation (inferred from files)
- Semicolons: Required at end of statements
- Quotes: Single quotes for strings in code, double quotes in JSX attributes

**Linting:**
- Tool: ESLint with TypeScript support
- Config: `C:\Users\germa\OneDrive\Documents\Focus-Os\focus-app\eslint.config.js`
- Extends: ESLint recommended, TypeScript-ESLint recommended, React Hooks rules, React Refresh rules
- Key rules enforced:
  - No unused variables (`noUnusedLocals`)
  - No unused parameters (`noUnusedParameters`)
  - No fallthrough switch cases (`noFallthroughCasesInSwitch`)
  - No unchecked side effect imports (`noUncheckedSideEffectImports`)

**TypeScript Strict Mode:**
- Enabled in `tsconfig.app.json`
- `strict: true` enforces all strict type-checking options
- `noUnusedLocals: true` and `noUnusedParameters: true`

## Import Organization

**Order:**
1. React and React hooks (e.g., `import { useState } from 'react'`)
2. Third-party libraries (e.g., `import { Bot, Sparkles } from 'lucide-react'`)
3. Local components/types (e.g., `import { TaskCard } from './TaskCard'`, `import type { Task } from '../../types'`)
4. Type imports use `type` keyword for clarity (e.g., `import type { NavigationItem } from './MainNav'`)

**Path Aliases:**
- No path aliases detected; relative paths used throughout
- Pattern: `./ComponentName.tsx` for same directory, `../components/Component.tsx` for different directories

## Error Handling

**Patterns:**
- Confirmation dialogs for destructive actions: `if (window.confirm('...')) { ... }`
- No try/catch blocks detected; assumes stable data flow in demo app
- Optional callback handlers use optional chaining (e.g., `onNavigate?.(href)`)
- Disabled states on buttons for blocked actions (e.g., `disabled={isBlocked}`)

**Null/Undefined Handling:**
- Optional chaining widely used (e.g., `message.referencedTask?.title`, `onEdit?.()`)
- Nullish coalescing not explicitly used; relies on conditional rendering
- Default values for fallback icons/components (e.g., `const Icon = item.icon ? iconMap[item.icon] : null`)

## Logging

**Framework:** console methods

**Patterns:**
- `console.log` for demo/stub handlers (e.g., `console.log('Logout')`, `console.log('Create task')`)
- No structured logging or logging framework detected
- Logging only in page/stub handlers, not in component render logic

## Comments

**When to Comment:**
- JSDoc/block comments used for section headers in larger files (e.g., `/* Logo Section */`, `/* Navigation Section */`)
- Minimal inline comments; code structure and naming are generally self-documenting

**JSDoc/TSDoc:**
- TypeScript interfaces document props implicitly through type annotations
- No JSDoc function descriptions observed in source code
- Comments on design tokens and imports in CSS: `/* Google Fonts */`, `/* Design Tokens */`

## Function Design

**Size:**
- Functions are small and focused; largest observed around 50 lines
- Helper functions extracted when logic exceeds 10-15 lines

**Parameters:**
- Destructuring used for component props (e.g., `{ label, value, previousValue, icon, color }: MetricCardProps`)
- Optional callback handlers follow pattern: `onEvent?: () => void`
- Multiple parameters grouped into single object type when count exceeds 3

**Return Values:**
- React components return JSX
- Utility functions return primitives (strings, numbers) or React elements
- Optional returns use `| undefined` or optional properties in objects

## Module Design

**Exports:**
- Named exports for components (e.g., `export function TaskCard(...)`)
- Default export for App entry point (e.g., `export default App`)
- Type exports prefixed with `type` keyword (e.g., `export type NavigationItem = ...`)

**Barrel Files:**
- Used in `src/components/index.ts` to export main shell components
- Pattern: `export { Component, type ComponentProps } from './Component'`

**Component Props Pattern:**
- Interfaces defined above component function in same file
- Props interface always named with `Props` suffix (e.g., `TaskCardProps`)
- Optional props use `?:` (e.g., `onDelete?: () => void`)

## Dark Mode Support

**Convention:**
- All components support dark mode via Tailwind dark: prefix
- CSS custom properties defined in index.css for theme colors
- Consistent pattern: `dark:bg-slate-900`, `dark:text-slate-100`, `dark:border-slate-800`

## Tailwind CSS Usage

**Patterns:**
- Template literal multi-line classes for readability (see `TaskCard.tsx` lines 74-84)
- Conditional classes via ternary operators (e.g., `${condition ? 'class-a' : 'class-b'}`)
- Color maps as Record<string, string> for type safety (e.g., `tagColorMap`, `colorClasses`)
- Consistency: Uses slate for neutral, violet for primary, amber for high-priority/warnings

---

*Convention analysis: 2026-01-29*
