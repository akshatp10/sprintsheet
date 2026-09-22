# Tasks — About

## What is this module?

The **Tasks module** manages the units of work inside a Sprintsheet project.

A task belongs to a project and can have:

- A task key
- A title and description
- A stage
- Assignees
- Tags / metadata
- A cycle association

A task is **independent of a cycle**. It can exist in the backlog without belonging to any cycle.

## What does it provide?

```text
Tasks
├── Read project tasks
├── Create tasks
├── Update tasks
├── Assign users
├── Change stage
├── Table representation
└── Card representation
```

## Task flow

```text
Project
   ↓
Tasks
   ├── Table View
   └── Card View
```

Both views use the **same task dataset**.

## Related documentation

- [Task](./TASK.md) — task structure and normal data flow.
- [Creating Tasks](./CREATING_TASK.md) — creation and task-key generation.
- [Stages](./STAGES.md) — task stages and stage relationships.
- [Drag and Drop](./DRAG_AND_DROP.md) — task drag-and-drop behavior.
- [Card View](./CARD_VIEW.md) — how tasks are grouped and displayed as cards.
- [Table View](./TABLE_VIEW.md) — how tasks are grouped and displayed in tabular form like excel.
