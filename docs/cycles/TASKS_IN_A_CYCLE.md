# Tasks in a Cycle

## Core rule

A task belongs to a project. It is **not owned by a cycle**.

```text
Task → Project

TaskCycle → Task + Cycle + cycle-specific stage
```

## Loading

```text
Selected cycle
      ↓
useTasksByCycle(cycleId)
      ↓
TaskCycle[]
      ↓
resolve task data
      ↓
group by stage
      ↓
Table / Card View
```

Only tasks associated with the selected cycle are shown in the cycle task view.

## Creating a task inside a cycle

```text
TaskCreateForm
      ↓
projectId + cycleId + stageId
      ↓
create task
      ↓
create TaskCycle
      ↓
task appears in selected cycle
```

The selected stage is stored on `TaskCycle`.

## Changing stage

Stage movement inside a cycle updates:

```text
TaskCycle.stageId
```

not a global task stage.

Both Card and Table views use the same parent-level handler:

```text
Card / Table
      ↓
onUpdateTaskStage(taskId, stageId)
      ↓
updateTaskCycle()
      ↓
TaskCycle.stageId updated
      ↓
cycle task query reconciled
```

This keeps stage movement consistent between the two views. citeturn2view1turn2view2

### Screenshot

> **Screenshot:** Moving a task between stages inside a selected cycle.
>
> `screenshots/cycle-task-stage-change.png`

## Backlog

A task without a cycle is a backlog task.

```text
Task
├── Cycle 1
├── Cycle 2
└── no cycle → Backlog
```

Backlog and cycle tasks have separate query paths.

## Important distinction

Do not model:

```text
Task → Cycle ownership
```

Model:

```text
Task → Project

TaskCycle → Task + Cycle + Stage
```

This is the core invariant of the cycle implementation.

## Related

- [Cycle](./CYCLE.md)
- [Cycle Selection](./CYCLE_SELECTION.md)
- [Creating Cycle](./CREATING_CYCLE.md)
