# Creating Tasks

## Purpose

This document explains how a task moves from the creation form to persistent data.

## Data flow

```text
TaskCreateForm
      ↓
CreateTaskInput
      ↓
useCreateTask()
      ↓
createNewTask()
      ↓
DB createTask()
      ↓
Dexie / IndexedDB
```

The form collects and validates input. Persistence is handled below the UI layer.

## Task key

Tasks receive a project-scoped key:

```text
<Project Key>-<Task Number>
```

Example:

```text
SPR-001
SPR-002
SPR-003
```

The project maintains a `nextTaskNumber` counter.

### Key generation

```text
Project.nextTaskNumber
        ↓
generate next number
        ↓
SPR-007
        ↓
create task
        ↓
increment nextTaskNumber
```

The counter is stored on the project so deleted task numbers are not reused.

Do **not** generate the next key using:

```text
number of existing tasks + 1
```

because deleting a task would make its number available again.

## Initial task state

The created task receives its initial project context, including its stage.

```text
CreateTaskInput
   ↓
task
   ├── projectId
   └── stageId
```

## After creation

```text
Task created
    ↓
mutation succeeds
    ↓
tasks query invalidated/refreshed
    ↓
new task appears in the current project
```

### Screenshot

<img width="1763" height="844" alt="image" src="https://github.com/user-attachments/assets/f7aafa71-35a6-4c31-97f0-592462b10700" />


## Developer checklist

When adding a task field, trace it through:

```text
UI
 ↓
form/type
 ↓
CreateTaskInput
 ↓
mutation
 ↓
service
 ↓
DB function
 ↓
DB schema
 ↓
query result
 ↓
UI
```

A field is not complete if it only exists in the form.

## Related

- [Task](./TASK.md)
- [Stages](./STAGES.md)
