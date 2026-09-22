# Task Stages

## Purpose

Stages represent the workflow status of a task.

A task stores a stage reference:

```text
Task.stageId → Stage
```

The stage determines where the task appears in Card View.

## Relationship

```text
Project
   ↓
ProjectStage
   ↓
Stage
   ↑
   │
Task.stageId
```

Project configuration determines which stages are available and their order.

## Changing a task's stage

```text
Task action / Card drag
        ↓
destination stage
        ↓
useUpdateTask()
        ↓
update task.stageId
        ↓
database
        ↓
query/cache reconciliation
        ↓
UI
```

The task itself does not change identity. Its `stageId` changes.

## Card View

Tasks are grouped using `stageId`:

```text
Task[]
   ↓
group by stageId
   ↓
┌────────┬─────────────┬──────┐
│ Todo   │ In Progress │ Done │
└────────┴─────────────┴──────┘
```

## Table View

The same `stageId` is shown as the task's stage/status in Table View.

Therefore:

```text
Card changes stage
      ↓
Task.stageId changes
      ↓
same Task[]
      ↓
Table reflects the new stage
```

## Important distinction

Changing a task's **stage** is different from moving it between **cycles**.

```text
Stage change
→ workflow status

Cycle change
→ planning/time grouping
```

Do not combine these operations.

## Related

- [Task](./TASK.md)
- [Drag and Drop](./DRAG_AND_DROP.md)
- [Card View](./CARD_VIEW.md)
- [Table View](./TABLE_VIEW.md)
