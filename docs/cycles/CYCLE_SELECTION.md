# Cycle Selection

## Purpose

The selected cycle is the shared context for the task workspace.

The selection is driven through the URL so the task page, topbar and sidebar use the same cycle.

```text
URL
 ↓
selected cycle ID
 ↓
TaskViewPage
 ├── Topbar
 ├── Sidebar
 └── Task views
```

### Screenshot

> **Screenshot:** Cycle tabs with the active cycle.
>
> `screenshots/cycle-selection.png`

## Automatic selection

If no cycle is explicitly selected:

```text
No cycle in URL
      ↓
load cycles
      ↓
check current date
      ↓
find cycle containing today
      ↓
select it
```

## After creating a cycle

```text
Create Cycle
    ↓
new Cycle returned
    ↓
select new cycle
    ↓
task context updates
```

## Propagation

```text
Selected Cycle
      │
      ├── TaskViewPage
      ├── Project Sidebar
      ├── Topbar
      ├── Task creation
      └── Task queries
```

The topbar uses the selected cycle to display its date range and task count. The sidebar displays its name.

Centralizing selection prevents different parts of the UI from operating on different cycles.

## Related

- [Cycle](./CYCLE.md)
- [Creating Cycle](./CREATING_CYCLE.md)
- [Tasks in a Cycle](./TASKS_IN_A_CYCLE.md)
