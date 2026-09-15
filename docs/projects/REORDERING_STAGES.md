# Reordering Stages

## Why does this exist?

Stages define the workflow of a project.

Their order controls how the workflow is presented and therefore needs to be configurable during project creation.

Example:

```text
Backlog → Todo → In Progress → Review → Done
```

A project may need:

```text
Backlog → Todo → In Progress → Done
```

The order belongs to the **project's configuration**, not to the global stage definition.

## Data model

The important distinction is:

```text
Stage
 └── reusable stage definition

ProjectStage
 ├── projectId
 ├── stageId
 └── order
```

So:

```text
Project
   ↓
ProjectStage
   ↓
Stage
```

`ProjectStage.order` determines where the stage appears in that project.

## Drag-and-drop flow

The current implementation uses `dnd-kit`.

```text
User starts dragging stage
          ↓
dnd-kit tracks interaction
          ↓
Drag end / destination determined
          ↓
Feature handler calculates new order
          ↓
Stage list is reordered
          ↓
New order is persisted
```

The drag library handles **interaction detection**. It does not own project business logic.

### Screenshot

<img width="1902" height="900" alt="20260915-0511-14 3308177" src="https://github.com/user-attachments/assets/14f44a77-7d1f-480d-9872-dbf940fa832b" />

## Reordering example

Before:

```text
[
  Backlog,
  Todo,
  In Progress,
  Done
]
```

Move `Done` to position 2:

```text
[
  Backlog,
  Done,
  Todo,
  In Progress
]
```

The important state change is the stage order.

## Why not reorder the global stages?

Because stages are reused as definitions while their placement can be different per project.

Changing the global stage would incorrectly affect other projects.

```text
Global Stage
     │
     ├── Project A → order 1
     ├── Project B → order 4
     └── Project C → order 2
```

`ProjectStage` provides the project-specific ordering.

## Implementation boundary

Keep the responsibilities separated:

```text
dnd-kit
  → detects drag

Project/Stage feature
  → interprets drag

Service / mutation
  → persists change

DB function
  → updates ProjectStage order
```

Do not put database writes inside the drag component.

## Related

- [Creating Project](./CREATING_PROJECT.md)
- [Project](./PROJECT.md)
- dnd-kit implementation documentation
