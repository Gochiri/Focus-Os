# Application Shell

## Overview

FocusAI uses a sidebar navigation pattern optimized for a productivity app with multiple functional areas. The shell provides persistent navigation, user menu, and a floating AI coach button accessible from any section.

## Navigation Structure

| Nav Item | Route | Icon |
|----------|-------|------|
| Tasks & Priorities | `/tasks` | CheckSquare |
| Goals & Planning | `/goals` | Target |
| AI Coach | `/coach` | Bot |
| Focus Mode | `/focus` | Timer |
| Dashboard | `/dashboard` | BarChart3 |

## Components Provided

- `AppShell.tsx` — Main layout wrapper with sidebar and mobile drawer
- `MainNav.tsx` — Navigation list with icons and active state
- `UserMenu.tsx` — User avatar, name, and logout button
- `CoachButton.tsx` — Floating action button for AI coach

## User Menu

- Location: Bottom of sidebar
- Contents: User avatar (or initials), display name, logout button
- Behavior: Shows user info inline (not dropdown)

## AI Coach Floating Button

- Location: Bottom-right corner, fixed position
- Purpose: Quick access to AI coach chat from any section
- Behavior: Opens chat overlay/modal without navigating away
- Style: Violet background with sparkle icon

## Layout Pattern

- Sidebar width: 256px (expanded)
- Content area: Fills remaining width
- Sidebar position: Fixed on left
- Content scrolls independently

## Responsive Behavior

- **Desktop (1024px+):** Full sidebar with labels and icons
- **Mobile (<1024px):** Hidden sidebar, hamburger menu triggers slide-out drawer

## Design Notes

- Active nav item: `bg-violet-600 text-white`
- Hover states: `bg-violet-100 dark:bg-violet-900/30`
- Sidebar background: `bg-white dark:bg-slate-900`
- Floating coach button: `bg-violet-600` with subtle shadow
- All transitions: 200ms for smooth interactions

## Props Interface

```typescript
interface AppShellProps {
  children: React.ReactNode
  navigationItems: NavigationItem[]
  user?: User
  onNavigate?: (href: string) => void
  onLogout?: () => void
  onCoachClick?: () => void
}

interface NavigationItem {
  label: string
  href: string
  icon?: string  // Icon name from lucide-react
  isActive?: boolean
}

interface User {
  name: string
  email?: string
  avatarUrl?: string
}
```
