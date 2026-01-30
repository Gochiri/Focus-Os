# Phase 1: Backend Foundation - Context

**Gathered:** 2025-01-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish the persistent data layer that enables all subsequent features. Supabase project configuration, database schema for goals/projects/tasks, real-time synchronization, and automatic progress calculations. This phase is pure infrastructure — no UI changes, just the backend that the existing frontend will connect to.

</domain>

<decisions>
## Implementation Decisions

### Database Schema Structure
- Soft delete for all entities (deleted_at timestamp, not hard delete)
- Cascade delete: deleting a goal deletes all its projects and tasks
- Schema should support future collaboration (user_id on all tables, even if single-user for now)

### Real-time Sync Behavior
- All changes sync in real-time across browser tabs/devices (goals, projects, tasks)
- Online required for v1 — show error state when offline, no local queue
- Silent updates when data changes from another device (no toast notifications)

### Progress Calculation
- Calculate in database (computed columns or triggers) — not frontend
- Priority-weighted tasks: high priority tasks count more toward progress than low priority

### Authentication & Multi-device
- Multiple login options: email/password AND social login (Google)
- Login required — no anonymous/guest mode
- Session duration: 7 days (short-lived)
- Schema designed for future sharing, but v1 is single-user (each user sees only their data)

### Claude's Discretion
- Timestamp columns (created_at, updated_at, deleted_at) — choose based on best practices
- Historical data tables — choose what's appropriate for v1
- Conflict resolution strategy for simultaneous edits
- Goal progress calculation method (from tasks vs projects vs milestones)
- How blocked tasks affect progress calculation

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. User wants a solid foundation that "just works" with the existing React frontend.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-backend-foundation*
*Context gathered: 2025-01-30*
