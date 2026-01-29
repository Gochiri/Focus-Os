# External Integrations

**Analysis Date:** 2026-01-29

## APIs & External Services

**Not Detected:**
- No external API integrations currently implemented
- No HTTP client library (axios, fetch wrapper) detected in codebase
- No API service layer in `src/`

## Data Storage

**Databases:**
- Not implemented - No database connection detected
- No ORM or query builder in dependencies (e.g., no Prisma, TypeORM, Sequelize)
- No environment variables for database URLs

**File Storage:**
- Local filesystem only - No cloud storage integration (S3, Firebase Storage, etc.)
- Static assets served via Vite from `public/` directory (see `public/vite.svg`)

**Caching:**
- None - Application uses in-memory React state only
- See `src/pages/CoachPage.tsx` for mock state management pattern
- See `src/pages/TasksPage.tsx` for hardcoded initial data arrays

## Authentication & Identity

**Auth Provider:**
- Custom/Mock only
- Implementation: Hardcoded user object in `src/App.tsx`:
  ```typescript
  const user = {
    name: 'Usuario Demo',
    email: 'demo@focusai.app'
  }
  ```
- No OAuth, JWT, or session management detected
- UserMenu component in `src/components/UserMenu.tsx` shows logout handler but does not implement actual auth flow

**OAuth References (Planned):**
- Task `task-003` in `src/pages/TasksPage.tsx` mentions OAuth implementation needed:
  ```
  title: 'Implementar autenticación OAuth',
  notes: 'Soporte para Google y Apple sign-in.',
  ```
- This indicates OAuth integration is a planned feature but not yet implemented

## Monitoring & Observability

**Error Tracking:**
- None - No error tracking service (Sentry, Rollbar, etc.) integrated

**Logs:**
- Console logging only
- Pattern: `console.log()` for debug messages (e.g., `src/pages/CoachPage.tsx` line 85, 124)
- No structured logging framework

## CI/CD & Deployment

**Hosting:**
- Not specified - Application is a static SPA ready for any static hosting platform
- Build output: `dist/` directory (from vite config and build script)

**CI Pipeline:**
- None detected - No GitHub Actions, Jenkins, or other CI config files present

**Build Commands:**
- Development: `npm run dev`
- Production: `npm run build` (runs `tsc -b && vite build`)
- Preview: `npm run preview`
- Lint: `npm run lint`

## Environment Configuration

**Required env vars:**
- None currently - Application runs without environment variables

**Future env vars (recommended for planned features):**
- `VITE_API_BASE_URL` - For API endpoint once backend is created
- `VITE_AI_COACH_API_KEY` - For AI/LLM integration
- `VITE_AUTH_PROVIDER_ID` - For OAuth configuration

**Secrets location:**
- Not applicable - No secrets management in current implementation

## Webhooks & Callbacks

**Incoming:**
- None - Application is frontend-only SPA

**Outgoing:**
- None - No external service integrations

## State Management

**Current State Management:**
- React Hooks (useState) for local component state
- Example patterns in `src/pages/CoachPage.tsx`:
  ```typescript
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [suggestions, setSuggestions] = useState<ProactiveSuggestion[]>(initialSuggestions)
  const [coachState, setCoachState] = useState<CoachState>({...})
  ```
- No global state management library (Redux, Zustand, Context API) detected

**Data Flow:**
- Mock data: Hardcoded arrays in page components
- State lifting: Props passed down to child components
- No data persistence between sessions

## Planned Integration Points

Based on codebase analysis, the following integrations are mentioned in tasks but not yet implemented:

1. **OAuth Integration** (high priority)
   - Files: `src/pages/TasksPage.tsx` (task-003)
   - Platforms: Google, Apple sign-in

2. **AI Coach API** (implied by extensive AI Coach UI)
   - Files: `src/pages/CoachPage.tsx`, `src/components/coach/`
   - Currently simulated with hardcoded messages and fake AI responses
   - Timeout simulation at line 68: `setTimeout(() => {...}, 1500)`

3. **Backend API** (implied by data types and application scope)
   - Files: `src/types/index.ts` defines full data model (Task, Goal, FocusSession, etc.)
   - No API endpoints currently implemented
   - All data currently mock/hardcoded

4. **Persistence Layer** (needed for production)
   - Required for: Task persistence, Goal tracking, Focus session history
   - Currently all data lost on page refresh

---

*Integration audit: 2026-01-29*
