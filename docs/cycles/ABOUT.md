# Cycles — About

The **Cycles module** organizes project work into time-bounded planning periods.

It provides:
- Cycle creation
- Cycle selection
- Cycle-aware task loading
- Cycle-specific task stages
- Backlog separation
- Cycle-aware task creation

## Core model

```text
Project
├── Tasks
├── Cycles
└── TaskCycles
      └── connects Tasks ↔ Cycles
```

A task is **independent of a cycle**. `TaskCycle` represents the task's membership and stage inside a cycle.

## Related

- [Cycle](./CYCLE.md)
- [Creating Cycle](./CREATING_CYCLE.md)
- [Cycle Selection](./CYCLE_SELECTION.md)
- [Tasks in a Cycle](./TASKS_IN_A_CYCLE.md)
