# Sprintsheet — Contribution Guide

> Development standards, architecture conventions, Git workflow, and contribution rules for Sprintsheet.

---

## 1. About Sprintsheet

Sprintsheet is a sheet-first task tracker designed around the speed of a spreadsheet while providing project structure, cycles, stages, task history, members, and project-level configuration.

The product is intentionally designed around a small number of strong conventions. Contributors should follow the existing product and code conventions rather than introducing alternative patterns.

### Product principles

- Sheet-first task management
- One consistent project structure
- Tasks are independent of cycles
- Cycles reference tasks
- Table and card views represent the same dataset
- Drag-and-drop has one clear purpose per view
- Light theme only
- Stage meaning is represented through configuration, not stage names
- Desktop and mobile are both supported

---

# 2. Tech Stack

The current frontend uses:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand
- React Hook Form
- Lucide React
- ESLint
- Husky
- lint-staged

Do not introduce a new library when the existing stack already provides the required functionality.

Before adding a dependency, discuss it with the project owner.

---

# 3. Local Setup

## Requirements

Install:

- Node.js
- npm
- Git

Verify:

node -v
npm -v
git --version

## Clone

git clone <repository-url>
cd sprintsheet

## Install dependencies

npm install

## Start development server

npm run dev

## Build

npm run build

## Lint

npm run lint

---

# 4. Project Structure

The project separates application structure, reusable UI, and feature-specific code.

src/
├── app/
│ ├── layout/
│ ├── App.tsx
│ └── router.tsx
│
├── components/
│ ├── button/
│ ├── chips/
│ ├── common/
│ ├── identity/
│ ├── inputs/
│ ├── sidebar/
│ └── topbar/
│
├── features/
│ └── projects/
│ └── components/
│
├── pages/
│
├── lib/
│
├── styles/
│ └── tokens/
│
└── main.tsx

## Where code belongs

### `components/`

Reusable components that are not tied to a single feature.

Examples:

- Buttons
- Inputs
- Text
- Sidebar components
- Identity/avatar components
- Common UI elements

### `features/`

Feature-specific components and logic.

For example:

features/projects/components/

should contain components that primarily exist for the Projects feature.

### `pages/`

Route-level page components.

A page should compose components rather than becoming a large collection of reusable UI.

### `app/`

Application-level configuration such as:

- Routing
- Layout
- Application shell

### `lib/`

Shared utilities and helper functions.

### `styles/tokens/`

Design-system tokens.

Do not introduce arbitrary colors or typography values when an existing token exists.

---

# 5. Component Rules

## Prefer reusable components

If a UI pattern is used in multiple places, consider extracting it into a reusable component.

Do not duplicate the same UI implementation across multiple screens.

## Keep components focused

A component should have one clear responsibility.

Avoid components that contain unrelated:

- UI
- state management
- navigation
- business logic
- API logic

When a component becomes difficult to understand, consider splitting it.

## Props must be typed

Use TypeScript types/interfaces for component props.

Example:

interface SidebarNavigationsProps {
label: string;
to: string;
icon: LucideIcon;
}

Avoid `any` unless there is a specific reason.

---

# 6. Lucide Icons

Use Lucide React for application icons.

Prefer passing the icon component when the receiving component needs to control its properties.

Good:

icon: Grid2X2

Then:

<Icon
    size={20}
    strokeWidth={1.5}
/>

Avoid passing a rendered icon when the component needs to control state-dependent properties.

Avoid:

icon: <Grid2X2 />

unless there is a specific reason.

---

# 7. Styling

Sprintsheet uses Tailwind CSS and project-specific design tokens.

Prefer existing tokens:

- colors
- typography
- spacing
- borders
- surfaces
- accents

Do not introduce arbitrary colors when a design token exists.

Use `cn()` for conditional classes.

Example:

className={cn(
"base classes",
isActive && "active classes"
)}

---

# 8. Design System Rules

The design system is part of the product architecture, not just visual styling.

### Theme

Sprintsheet uses a light theme.

Do not introduce dark-mode-specific styling unless the product specification changes.

### Color

Color communicates categories and meaning.

Stage colors use the defined stage palette.

Do not invent a new stage color for an individual component.

Color should not be the only way information is communicated.

### Typography

Use the existing typography tokens.

Do not introduce random font sizes or font families when an existing token is appropriate.

---

# 9. Product Invariants

These rules have priority over implementation preferences.

## Rule 1 — One structure, everywhere

Every project starts with the same basic structure.

Projects can diverge through their own configuration, but there should not be separate project templates or alternate creation flows unless explicitly approved.

## Rule 2 — Tasks are cycle-independent

A task belongs to a project.

A cycle references tasks.

Moving a task between cycles must not change:

- Task key
- Task history
- Task identity

A task without a cycle is a valid backlog task.

## Rule 3 — Duplicating a cycle creates new tasks

Cycle duplication creates new task records.

The duplicated tasks receive:

- New keys
- Reset status
- New activity history

The original cycle must remain unchanged.

## Rule 4 — One dataset, multiple views

Table and Card views represent the same task data.

Changing views must not create a different dataset or unexpectedly reset filters/sort/state.

---

# 10. Interaction Rules

## Drag and drop

Drag-and-drop must have one meaning per view.

### Table

Dragging reorders rows.

### Cards

Dragging changes the task stage.

Moving a task between cycles is NOT a drag operation.

Cycle changes should be explicit actions through the appropriate menu/action.

## Keyboard accessibility

Anything achievable through drag-and-drop must have a keyboard alternative.

Drag must never be the only way to perform an action.

---

# 11. State and Interaction Standards

### Optimistic updates

User edits should feel immediate.

Where applicable:

1. Update the UI immediately
2. Persist the change
3. Reconcile with the server
4. Revert the exact field if the operation fails

Do not replace the entire page with an error state for a single failed field update.

### Undo

Operations that are defined as undoable should use the project's undo behavior.

Do not implement independent undo mechanisms without discussing the expected behavior first.

### URL state

Relevant screen state should be represented in the URL where specified by the product design.

Examples include:

- Cycle
- View
- Filters
- Sort
- Open task drawer

A view should be shareable when the specification requires it.

---

# 12. Loading and Empty States

Loading states should preserve the expected layout.

Avoid placing generic spinners over the entire page when a skeleton matching the content layout is more appropriate.

Empty states should explain:

1. What is empty
2. Why it might be empty
3. What the user can do next

Whenever possible, provide the next action directly from the empty state.

---

# 13. Accessibility

All interactive functionality should be usable with a keyboard.

Requirements include:

- Keyboard-accessible buttons
- Keyboard-accessible navigation
- Visible focus states
- Accessible labels for icon-only controls
- Keyboard alternatives for drag interactions
- Appropriate semantic HTML
- No information communicated exclusively through color

---

# 14. Responsive Design

Sprintsheet supports desktop and mobile layouts.

Do not assume that desktop UI can simply be scaled down.

Mobile screens may use different layouts where specified by the design.

The current design includes dedicated mobile behavior for:

- Tasks
- Task detail
- Projects
- Dashboard
- Filters
- Cycles
- Settings

When implementing a feature, check its corresponding screen/build notes before deciding how it should behave on mobile.

---

# 15. Feature Development

Before starting a feature:

1. Understand the requirement
2. Check the relevant screen/design specification
3. Check whether an existing component can be reused
4. Check whether the feature belongs under `features/`
5. Identify whether the change affects shared components
6. Confirm whether the change introduces new state or routing requirements

Do not immediately start writing UI without understanding the existing structure.

---

# 16. Git Branching

Do not develop directly on `dev`.

Create a feature/fix branch from the appropriate base branch.

Branch naming:

feat/<short-description>
fix/<short-description>
refactor/<short-description>
docs/<short-description>
chore/<short-description>

Examples:

feat/creating-project-screen
feat/creating-common-components
fix/sidebar-navigation
refactor/project-card
docs/update-contributing-guide

---

# 17. Stacked PRs

Sprintsheet may use stacked pull requests for larger features.

Example:

dev
│
├── feat/creating-common-components
│
├── feat/creating-ui-layout
│
└── feat/creating-project-screen

Each PR should contain only the work belonging to that layer.

Do not merge unrelated work into a lower-level PR simply because it is needed by a later feature.

---

# 18. Updating a Stacked Branch

When the parent PR is merged, update the next branch against the updated `dev`.

Example:

git checkout feat/creating-common-components
git fetch origin
git rebase origin/dev
git push --force-with-lease

After the next PR is merged, repeat the process for its child branch.

Use:

git push --force-with-lease

Never use:

git push --force

unless explicitly required and understood.

---

# 19. Commit Convention

Use:

<type>: <description>

Examples:

feat: create project screen UI
feat: add project card component
fix: correct sidebar active state
refactor: extract reusable button
docs: update contribution guide
chore: update dependencies

Supported types:

- feat
- fix
- refactor
- docs
- chore
- test

## Commit rules

Keep commits:

- Small
- Focused
- Descriptive
- Related to one logical change

Avoid:

changes
update
fix
stuff
final
wip

Do not combine unrelated work into a single commit.

---

# 20. Pre-commit Checks

The repository uses Husky and lint-staged.

The pre-commit hook runs:

npx lint-staged

JavaScript and TypeScript files are checked with ESLint before committing.

If a commit fails the pre-commit check, fix the issue rather than bypassing the hook.

Do not use `--no-verify` unless there is a specific reason and the owner is aware of it.

---

# 21. Pull Request Rules

Every feature or fix should be submitted through a PR.

PR titles should follow the commit convention.

Example:

feat: create project screen UI

A PR description should contain:

## Summary

Brief explanation of the change.

## Changes

- Change 1
- Change 2
- Change 3

## Screenshots

Include screenshots for UI changes.

## Notes

Mention:

- Known limitations
- Follow-up work
- Important implementation decisions

---

# 22. UI PR Requirements

UI-related PRs should include screenshots.

Screenshots should demonstrate relevant states where applicable:

- Default
- Active
- Hover
- Empty
- Loading
- Error
- Mobile
- Permission-restricted states

Screenshots should make it possible for reviewers to compare the implementation against the design.

---

# 23. Before Opening a PR

Run:

npm run lint
npm run build

Then manually verify the affected feature.

Checklist:

- [ ] Feature works
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Lint passes
- [ ] Build passes
- [ ] Existing functionality still works
- [ ] Responsive behavior checked
- [ ] Screenshots added for UI changes
- [ ] No secrets committed
- [ ] No unnecessary files changed
- [ ] PR contains only relevant changes

---

# 24. Code Review

Reviewers should consider:

### Correctness

Does it behave according to the specification?

### Architecture

Does it fit the existing project structure?

### Reusability

Could existing components be reused?

### Consistency

Does it follow the established styling and component patterns?

### Accessibility

Can the feature be used without relying exclusively on a mouse or color?

### Scope

Does the PR contain unnecessary changes?

Review comments should be specific and constructive.

---

# 25. Adding Dependencies

Before adding a dependency, ask:

- Do we already have a solution?
- Can the existing stack handle this?
- Is the dependency necessary?
- Does it add significant complexity?
- Does it introduce another pattern that future contributors must learn?

Discuss significant dependency additions with the project owner before merging.

---

# 26. Security

Never commit:

- `.env`
- API keys
- Passwords
- Access tokens
- Private credentials
- Personal/private data

Use environment variables for secrets.

If a secret is accidentally committed, notify the project owner immediately and rotate the credential.

---

# 27. Project Owner Rules

The project owner is responsible for:

- Maintaining the product direction
- Defining/approving architectural changes
- Reviewing PRs
- Managing the `dev` branch
- Maintaining project conventions
- Approving new dependencies
- Resolving design/implementation conflicts
- Keeping the contribution documentation up to date

Major architectural changes should not be introduced silently through a feature PR.

---

# 28. Contributor Rules

Contributors are expected to:

- Read the relevant design/build notes before implementing a feature
- Follow existing architecture
- Reuse existing components
- Keep PRs focused
- Write meaningful commits
- Test changes locally
- Run lint/build before opening a PR
- Include screenshots for UI changes
- Avoid unnecessary dependencies
- Ask before making architectural changes
- Keep stacked branches correctly rebased

---

# 29. Source of Truth

When implementing Sprintsheet, use the following priority:

1. Product/design specification
2. Existing established project architecture
3. Existing component/design-system conventions
4. Implementation preference

If an implementation conflicts with the product specification, the specification wins.

If a new requirement conflicts with an existing architectural convention, discuss it before introducing a new pattern.

---

# 30. Quick Start

git clone <repository-url>
cd sprintsheet
npm install
npm run dev

Before pushing:

npm run lint
npm run build

Create a branch:

git checkout dev
git pull origin dev
git checkout -b feat/my-feature

Commit:

git add .
git commit -m "feat: add my feature"

Push:

git push -u origin feat/my-feature

Then open a Pull Request.

---

# 31. Final Principle

Sprintsheet should remain easy to understand for the next developer.

Prefer:

- Existing patterns over new patterns
- Reusable components over duplication
- Small focused PRs over large PRs
- Clear code over clever code
- Design tokens over arbitrary styling
- Explicit behavior over hidden behavior
- Accessibility over mouse-only interactions

When in doubt, check the design specification and existing implementation before introducing something new.
