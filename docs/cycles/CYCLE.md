# Cycle

## Purpose

A cycle is a project-scoped time period used to organize work.

```text
Cycle
├── id
├── projectId
├── name
├── startDate
└── endDate
```

The cycle does not own tasks directly.

```text
Task
  ↓
TaskCycle
├── taskId
├── cycleId
└── stageId
```

`TaskCycle` is the relationship between a task and a cycle and stores the task's **cycle-specific stage**.

## Why TaskCycle exists

The final task model keeps tasks independent of cycles and stages.

```text
Task
├── projectId
└── task data

TaskCycle
├── taskId
├── cycleId
└── stageId
```

This allows the same task to have different cycle-specific state without changing the task itself.

```text
Task A
├── Cycle 1 → Todo
└── Cycle 2 → In Progress
```

## Reading cycle tasks

```text
Selected cycle
      ↓
useTasksByCycle(cycleId)
      ↓
cycle task query
      ↓
TaskCycle[]
      ↓
resolve task data
      ↓
group by stage
      ↓
Table / Card View
```

## Cycle lifecycle

```text
Create
  ↓
Select
  ↓
Load TaskCycles
  ↓
Work on tasks
  ↓
Create / update / move tasks
```

The v2 database model explicitly keeps tasks independent of cycles and stores cycle-specific stage state in `TaskCycle`. Tasks without a cycle are backlog tasks. citeturn2view0

## Related

- [Creating Cycle](./CREATING_CYCLE.md)
- [Cycle Selection](./CYCLE_SELECTION.md)
- [Tasks in a Cycle](./TASKS_IN_A_CYCLE.md)
