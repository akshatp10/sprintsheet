# Projects - About

## What is this module?

The **Projects module** is the entry point for organizing work in Sprintsheet.

A project provides the context in which users manage:

- Tasks
- Stages
- Cycles
- Members
- Project-level configuration

Projects are the primary workspace boundary in Sprintsheet. Most task-related operations are scoped to a `projectId`.

## What does it provide?

```text
Projects
├── Project listing
├── Project creation
├── Project workspace
├── Members
├── Stages
├── Tasks
├── Cycles
└── Multiple task views
    ├── Table
    └── Cards
```

The module is responsible for the project-level experience, while individual concerns such as task management and drag-and-drop can have their own implementation/documentation.

## Related modules

- [Project](./PROJECT.md) — how an existing project works and how project data flows.
- [Creating Project](./CREATING_PROJECT.md) — how a project is created.
- [Reordering Stages](./REORDERING_STAGES.md) — how stage ordering works during project setup.
- `tasks` — task creation, updates and task data.
- `cycles` — cycle-specific behavior.
- `stages` — stage definitions and project-stage configuration.

> **Developer rule:** Keep project-level orchestration here. Do not move domain-specific behavior into the Project module simply because it is displayed inside a project.
