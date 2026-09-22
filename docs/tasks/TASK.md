# Task

## Purpose

A task is the basic unit of work inside a project.

```text
Project
   │
   └── Task
       ├── key
       ├── title
       ├── description
       ├── projectId
       ├── stageId
       ├── assigneeIds
       └── other task data
```

## Ownership

A task belongs to one project through `projectId`.

```text
Task → Project
```

All task queries should therefore be project-scoped.

## Reading tasks

The standard flow is:

```text
Task View
   ↓
useTasks(projectId)
   ↓
getAllProjectTasks(projectId)
   ↓
DB function
   ↓
Dexie / IndexedDB
   ↓
Task[]
   ↓
React Query cache
   ↓
Table / Card View
```

The project ID is part of the query scope so tasks from different projects are not mixed.

## Updating tasks

```text
User action
   ↓
useUpdateTask()
   ↓
updateExistingTask()
   ↓
DB update
   ↓
React Query reconciliation
   ↓
UI
```

Components should not write directly to the database.

## Assignees

Tasks store user IDs:

```text
Task
└── assigneeIds[]
       ↓
     Users
```

The service/data layer resolves these IDs when full user information is required by the UI.

## Cycle relationship

A task belongs to a project, not to a cycle.

```text
Project
├── Task A → Cycle 1
├── Task B → Cycle 2
└── Task C → no cycle
```

A task without a cycle is a valid backlog task.

Cycle movement is a separate operation from changing a task's stage.

## Views

The same `Task[]` is used by:

```text
              Task[]
             /      \
        Table       Cards
```

Do not create separate task datasets for the two views.

## Related

- [Creating Tasks](./CREATING_TASK.md)
- [Stages](./STAGES.md)
- [Drag and Drop](./DRAG_AND_DROP.md)
- [Card View](./CARD_VIEW.md)
- [Table View](./TABLE_VIEW.md)
