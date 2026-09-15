# Task Drag and Drop

## Purpose

Drag and drop provides an interaction for changing task state.

The current implementation uses **dnd-kit**.

The important separation is:

```text
dnd-kit
   ↓
detect interaction
   ↓
Task feature
   ↓
interpret interaction
   ↓
Task mutation
   ↓
Database
```

dnd-kit should not contain task business logic.

## Card drag

In Card View, dragging a task between stage columns means:

> Change the task's stage.

Example:

```text
Task A
stageId = todo
       ↓
drag to In Progress
       ↓
stageId = in-progress
```

### Flow

```text
Drag start
   ↓
dnd-kit
   ↓
drag over / destination
   ↓
drag end
   ↓
determine destination stage
   ↓
useUpdateTask()
   ↓
updateExistingTask()
   ↓
persist stageId
   ↓
UI updates
```

### Screenshot

<img width="1896" height="904" alt="20260915-1017-19 9171900" src="https://github.com/user-attachments/assets/9afe91a1-e734-4e95-98e0-b8f67ccbddb6" />

## Why separate DnD from task logic?

The DnD layer answers:

> What was dragged and where did it end?

The task feature answers:

> What does that mean for Sprintsheet?

This allows the same interaction system to support different domain operations.

```text
dnd-kit
→ interaction

Task feature
→ meaning

Service
→ mutation

DB
→ persistence
```

## One task dataset

After a stage update:

```text
Card drag
    ↓
Task.stageId changes
    ↓
same Task[]
    ├── Card View
    └── Table View
```

Do not maintain a separate Card-only task state.

## What drag does NOT mean

Task drag-and-drop changes the task's **stage**.

It does not move the task between cycles.

```text
Card drag
→ Stage

Explicit cycle action
→ Cycle
```

These are separate domain operations.

## Related

- [Task](./TASK.md)
- [Stages](./STAGES.md)
- [Card View](./CARD_VIEW.md)
