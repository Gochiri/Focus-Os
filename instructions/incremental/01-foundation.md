# Milestone 1: Foundation

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** None

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

Set up the foundational elements: design tokens, data model types, routing structure, and application shell.

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for Google Fonts setup

**Color Palette:**
- Primary: `violet` — Main actions, active states, branding
- Secondary: `amber` — Highlights, warnings, secondary accents
- Neutral: `slate` — Backgrounds, text, borders

**Typography:**
- Headings: Space Grotesk
- Body: Inter
- Code/technical: JetBrains Mono

### 2. Data Model Types

Create TypeScript interfaces for your core entities:

- See `product-plan/data-model/types.ts` for interface definitions
- See `product-plan/data-model/README.md` for entity relationships

**Core Entities:**
- `Task` — Individual task with Pareto priority, status, deadline
- `Goal` — SMART goal with RPM fields, milestones, linked tasks
- `FocusSession` — Pomodoro session with duration, status, task reference
- `CoachInteraction` — AI coach message, suggestion, or reflection
- `ProductivityMetrics` — Aggregated stats for dashboard

### 3. Routing Structure

Create placeholder routes for each section:

| Route | Section |
|-------|---------|
| `/tasks` | Tasks & Priorities |
| `/goals` | Goals & Planning |
| `/coach` | AI Coach |
| `/focus` | Focus Mode |
| `/dashboard` | Dashboard |

### 4. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper with sidebar
- `MainNav.tsx` — Navigation component with icons
- `UserMenu.tsx` — User avatar and logout
- `CoachButton.tsx` — Floating AI coach button

**Wire Up Navigation:**

Connect navigation to your routing:

| Nav Item | Route | Icon |
|----------|-------|------|
| Tasks & Priorities | `/tasks` | CheckSquare |
| Goals & Planning | `/goals` | Target |
| AI Coach | `/coach` | Bot |
| Focus Mode | `/focus` | Timer |
| Dashboard | `/dashboard` | BarChart3 |

**User Menu:**

The user menu expects:
- User name
- Email (optional)
- Avatar URL (optional)
- Logout callback

**Responsive Behavior:**
- Desktop (1024px+): Full sidebar with labels and icons
- Tablet (768px-1023px): Collapsed sidebar with icons only
- Mobile (<768px): Hidden sidebar, hamburger menu triggers slide-out drawer

## Files to Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/data-model/` — Type definitions
- `product-plan/shell/README.md` — Shell design intent
- `product-plan/shell/components/` — Shell React components

## Done When

- [ ] Design tokens are configured (colors, typography)
- [ ] Data model types are defined (Task, Goal, FocusSession, etc.)
- [ ] Routes exist for all sections (can be placeholder pages)
- [ ] Shell renders with sidebar navigation
- [ ] Navigation links to correct routes
- [ ] User menu shows user info
- [ ] Floating coach button is visible
- [ ] Responsive on mobile (drawer menu works)
- [ ] Dark mode toggle works
