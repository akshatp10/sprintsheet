# Table View

## Purpose

Table View is a representation of the project's task dataset in a row-based layout.

It does not maintain separate task data.

```text
                 Task[]

                   ↓

              Table View

                   ↓

        ┌──────────────────────┐
        │ Key │ Title │ Stage  │
        ├──────────────────────┤
        │ ... │  ...  │  ...   │
        └──────────────────────┘
```

## Reading data

```text
useTasks(projectId)
      ↓
Task[]
      ↓
TableTaskPage
      ↓
task rows
```

The table receives the same project task data used by the other task views.

### Screenshot

> **Screenshot:** Complete Table View showing task rows, columns, stages and assignees.
>
> `screenshots/table-view.png`

## Task rows

Each task is represented as a row.

Typical information includes:

- Task key
- Title
- Assignees
- Stage
- Relevant task metadata

The row is responsible for displaying task information and exposing task interactions.

Persistence remains in the task service/data layer.

## Stage information

The task's stage is derived from its stage relationship.

```text
Task
  ↓
stageId
  ↓
Project Stage
  ↓
Stage displayed in row
```

The stage shown in Table View must represent the same task state shown in Card View.

## Row ordering

Table View supports row reordering.

The meaning of dragging in Table View is:

> **Reorder the task rows.**

It does not mean changing the task's stage.

```text
Task rows

SPR-001
SPR-002
SPR-003
SPR-004

       ↓ drag SPR-004

SPR-001
SPR-004
SPR-002
SPR-003
```

### Screenshot

> **Screenshot:** Task row being dragged to a different position.
>
> `screenshots/table-row-reordering.png`

## Drag flow

```text
Table row
    ↓
dnd-kit
    ↓
destination position
    ↓
calculate new order
    ↓
persist ordering
    ↓
Table View
```

The drag-and-drop implementation detects the interaction. The task/table feature determines that the operation means **row reordering**.

See [Drag and Drop](./DRAG_AND_DROP.md).

## Table vs Card View

Both views consume the same task dataset.

```text
                  Task[]
                 /      \
                /        \
          Table View    Card View
              │             │
              ↓             ↓
         row layout    stage columns
```

Their drag interactions have different meanings:

| View  | Drag meaning      |
| ----- | ----------------- |
| Table | Reorder task rows |
| Card  | Change task stage |

This distinction is a core Sprintsheet product invariant.

## Synchronization with Card View

Because both views use the same task data:

```text
                 Task[]
                /      \
               ↓        ↓
            Table     Cards
```

A task state change made through one view must be reflected when the other view is rendered.

For example:

```text
Card View
   ↓
Task stage changes
   ↓
same task data
   ↓
Table View shows new stage
```

Similarly, changing task ordering in the Table should not create a second task dataset.

## Cycle context

When a cycle is selected, Table View displays the tasks belonging to that cycle.

The cycle-specific stage comes from the `TaskCycle` relationship rather than global task state.

```text
Selected Cycle
      ↓
TaskCycles
      ↓
cycle tasks
      ↓
Table rows
```

See the Cycles documentation for the complete cycle-specific data flow.

## Related

- [Task](./TASK.md)
- [Stages](./STAGES.md)
- [Card View](./CARD_VIEW.md)
- [Drag and Drop](./DRAG_AND_DROP.md)
