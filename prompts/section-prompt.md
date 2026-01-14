# Section Implementation Prompt

Use this template to implement FocusAI section by section. Fill in the variables at the top before pasting into your coding agent.

---

## Define Section Variables

Before using this prompt, fill in these values:

- **SECTION_NAME** = `_____________` (e.g., "Tasks & Priorities")
- **SECTION_ID** = `_____________` (e.g., "tasks-and-priorities")
- **MILESTONE_NUMBER** = `__` (e.g., "02" — sections start at 02 since 01 is Foundation)

### Quick Reference

| Section | SECTION_ID | MILESTONE_NUMBER |
|---------|------------|------------------|
| Tasks & Priorities | tasks-and-priorities | 02 |
| Goals & Planning | goals-and-planning | 03 |
| AI Coach | ai-coach | 04 |
| Focus Mode | focus-mode | 05 |
| Dashboard | dashboard | 06 |

---

## Prompt to Copy

I need you to implement the **[SECTION_NAME]** section of my FocusAI application.

## Instructions

Please carefully read and analyze the following files:

1. **@product-plan/product-overview.md** — Product summary for overall context
2. **@product-plan/instructions/incremental/[MILESTONE_NUMBER]-[SECTION_ID].md** — Specific instructions for this section

Also review the section assets:
- **@product-plan/sections/[SECTION_ID]/README.md** — Feature overview and design intent
- **@product-plan/sections/[SECTION_ID]/tests.md** — Test-writing instructions (use TDD approach)
- **@product-plan/sections/[SECTION_ID]/components/** — React components to integrate
- **@product-plan/sections/[SECTION_ID]/types.ts** — TypeScript interfaces
- **@product-plan/sections/[SECTION_ID]/sample-data.json** — Test data

## Before You Begin

Please ask me clarifying questions about:

1. **Authentication & Authorization** (if not yet established)
   - How should users authenticate?
   - What permissions are needed for this section?

2. **Data Relationships**
   - How does this section's data relate to other entities?
   - Are there any cross-section dependencies?

3. **Integration Points**
   - How should this section connect to existing features?
   - Any API endpoints already built that this should use?

4. **Backend Business Logic**
   - Any server-side logic, validations or processes needed beyond what's shown in the UI?
   - Background processes, notifications, or other processes to trigger?

5. **Any Other Clarifications**
   - Questions about specific user flows in this section
   - Edge cases that need clarification

## Implementation Approach

Use test-driven development:
1. Read the `tests.md` file and write failing tests first
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

Lastly, be sure to ask me if I have any other notes to add for this implementation.

Once I answer your questions, proceed with implementation.

---

## Example Usage

For implementing **Goals & Planning**:

```
SECTION_NAME = Goals & Planning
SECTION_ID = goals-and-planning
MILESTONE_NUMBER = 03

Then reference:
- @product-plan/instructions/incremental/03-goals-and-planning.md
- @product-plan/sections/goals-and-planning/README.md
- @product-plan/sections/goals-and-planning/tests.md
- @product-plan/sections/goals-and-planning/components/
- @product-plan/sections/goals-and-planning/types.ts
- @product-plan/sections/goals-and-planning/sample-data.json
```
