# Project

## Purpose

This document explains what happens **after a project exists**: how project data is read, how it reaches the UI, and how the different project views use the same data.

## Project data flow

```text
Project route
    ↓
projectId
    ↓
React Query hook
    ↓
Service / API
    ↓
DB function
    ↓
Dexie / IndexedDB
    ↓
Query result
    ↓
Project UI
```

Project-scoped data uses the project ID to avoid mixing data between projects.

### Screenshot

<img width="1763" height="844" alt="image" src="https://github.com/user-attachments/assets/c5e7bfd9-6749-480e-b212-5c922e1d3e38" />


## Reading project data

The main pattern is:

```text
Component
   ↓
useQuery / feature hook
   ↓
service function
   ↓
DB function
   ↓
IndexedDB
```

React Query owns the query lifecycle and cache. Components consume query results rather than maintaining their own copy of persisted project data.

For example, project tasks follow the same project-scoped pattern:

```text
useTasks(projectId)
      ↓
getAllProjectTasks(projectId)
      ↓
DB task query
      ↓
Task[]
```

## Project relationships

```text
Project
├── Members → Users
├── Project Stages → Stages
├── Tasks
└── Cycles
```

Important distinction:

```text
Task → belongs to Project
Task → has a Stage
Cycle → groups/references Tasks
```

A task can therefore exist in a project without belonging to a cycle.

## Mutation flow

Project/task changes follow:

```text
User action
    ↓
Mutation hook
    ↓
Service
    ↓
DB function
    ↓
IndexedDB
    ↓
Query invalidation / update
    ↓
UI
```

Keep persistence out of UI components.

## What to read next

- [Creating Project](./CREATING_PROJECT.md) — project creation flow.
- [Reordering Stages](./REORDERING_STAGES.md) — stage drag/reorder implementation.
- Task documentation — task-specific behavior.
- Cycle documentation — cycle-specific behavior.
