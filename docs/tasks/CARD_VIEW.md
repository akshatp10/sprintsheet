# Card View

## Purpose

Card View is a visual representation of the project's task dataset.

It does not maintain its own task data.

```text
                 Task[]
                   ↓
              group by stage
                   ↓
        ┌──────────┼──────────┐
        ↓          ↓          ↓
      Todo     In Progress    Done
```

## Reading data

```text
useTasks(projectId)
      ↓
Task[]
      ↓
group by stageId
      ↓
stage columns
      ↓
TaskCard
```

The project stages determine the columns. Each task is rendered in the column matching its `stageId`.

### Screenshot

> **Screenshot:** Complete Card View showing multiple stage columns and tasks.
>
> `screenshots/card-view.png`

## Task card

A `TaskCard` is responsible for presenting task information and exposing task interactions.

Typical information includes:

- Task key
- Title
- Assignees
- Stage
- Relevant task metadata

Persistence remains in the task service/data layer.

## Stage columns

```text
Project stages
      ↓
Card columns
      ↓
tasks with matching stageId
```

Example:

```text
Todo
├── SPR-001
└── SPR-004

In Progress
├── SPR-002
└── SPR-005

Done
└── SPR-003
```

## Dragging cards

Dragging a card has one meaning:

> Move the task to another stage.

```text
TaskCard
   ↓
dnd-kit
   ↓
destination stage
   ↓
update task.stageId
   ↓
Task[]
   ↓
Card View
```

See [Drag and Drop](./DRAG_AND_DROP.md).

## Synchronization with Table View

Card and Table views consume the same task data.

```text
          Task[]
          /   \
         /     \
      Cards   Table
         │
         ↓
   same task state
```

If a card changes stage, the table should show the same stage.

This is a core Sprintsheet invariant.

### Screenshot

> **Screenshot:** The same task represented in Card and Table views.
>
> `screenshots/card-table-sync.png`

## Related

- [Task](./TASK.md)
- [Stages](./STAGES.md)
- [Drag and Drop](./DRAG_AND_DROP.md)
