# Plan 02-01: Goal Creation and SMART/RPM details

**Goal**: Enable users to manage goals with full details, including SMART and RPM frameworks, and track milestones.

## Proposed Changes

### 1. UI Components (`focus-app/src/components/goals/`)
- **`GoalForm.tsx` (New)**: A comprehensive form to create and edit goals.
    - Fields: Title, Description, Status, Due Date, Tags.
    - **SMART Section**: Accordion/Tab for Specific, Measurable, Achievable, Relevant, Time-bound inputs.
    - **RPM Section**: Accordion/Tab for Result, Purpose, Massive Action Plan inputs.
- **`MilestoneList.tsx` (New)**: Component to list, add, edit, toggle, and delete milestones within a goal.
- **`GoalCard.tsx` (Update)**: Display SMART/RPM tags or indicators and progress bar.
- **`GoalKanban.tsx` (Update)**: Ensure drag-and-drop updates status correctly and allows clicking to edit.

### 2. Service Layer Updates (`focus-app/src/services/goalService.ts`)
- Enhance `createGoal` and `updateGoal` to fully support SMART and RPM JSON structures.
- Implement `addMilestone`, `updateMilestone`, `deleteMilestone` methods (or handle via goal update if API allows, but separate tables usually imply separate endpoints or nested inserts).
    - *Note*: `milestones` is a separate table. We need specific service methods for it.

### 3. Page Integration (`focus-app/src/pages/GoalsPage.tsx`)
- Add a "New Goal" modal/slide-over using `GoalForm`.
- Add an "Edit Goal" modal/slide-over using `GoalForm` populated with existing data.
- Implement filter controls (Active, Completed, All).

## Step-by-Step Implementation

1.  **Service Update**:
    - Add `milestoneService.ts` or add methods to `goalService` for CRUD on the `milestones` table.
    - Verify `goalService` handles `smart` and `rpm` JSONB fields correctly.

2.  **UI Components**:
    - Create `GoalForm` with validation (e.g., title required).
    - Create `MilestoneList` with interactive checkboxes and input fields for new milestones.

3.  **Integration**:
    - Wire up `GoalsPage` to open `GoalForm`.
    - Handle form submission to call `goalService`.
    - Ensure Real-time sync updates the view automatically.

## Success Criteria
1.  User can create a goal with all SMART/RPM fields.
2.  User can see the SMART/RPM details when editing a goal.
3.  User can add milestones to a goal and mark them as complete.
4.  Goal progress updates (via DB trigger) when projects/tasks change, but milestones might also contribute? 
    - *Clarification*: Current DB trigger calculates goal progress from *projects*. Milestones are currently standalone or need to be linked. 
    - *Decision*: For this plan, milestones are checklist items. We will keep the DB trigger based on projects for "Auto" progress, but maybe allow manual override or hybrid?
    - *Refinement*: Let's stick to the current DB logic (Goal Progress = Avg Project Progress) to avoid conflict. Milestones will be for user reference/planning.

