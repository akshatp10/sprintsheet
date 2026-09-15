# Creating a Project

## Purpose

Project creation establishes the project and its initial configuration.

The creation flow is divided into three logical steps:

```text
1. Project Basics
        ↓
2. Columns & Stages
        ↓
3. People / Members
        ↓
   Create Project
```

### Screenshot

> **Screenshot:** Complete project creation flow.
>
> `screenshots/create-project-flow.png`

## 1. Project Basics

Collect the project's core information.

Typical project-level data includes:

- Name
- Description
- Cycle configuration
- Other project settings

The form produces a typed `CreateProjectInput`.

```text
Form
 ↓
CreateProjectInput
 ↓
useCreateProject()
```

## 2. Columns & Stages

The project starts from Sprintsheet's common basic structure.

The user can configure the initial stage/column arrangement.

Stage ordering is project-specific, so the project stores the relationship/order rather than changing the global stage definition.

See [Reordering Stages](./REORDERING_STAGES.md).

### Screenshot

> **Screenshot:** Stage/column configuration step.
>
> `screenshots/create-project-stages.png`

## 3. People

Users are associated with the project through project-membership records.

```text
User
  ↓
ProjectMember
  ├── projectId
  ├── userId
  └── role
```

A user can belong to multiple projects with different roles.

### Screenshot

> **Screenshot:** Member selection step.
>
> `screenshots/create-project-members.png`

## Data flow

```text
Create Project Form
       ↓
useCreateProject()
       ↓
createNewProject()
       ↓
createProject()
       ↓
Database
 ├── projects
 ├── projectMembers
 ├── users
 ├── stages
 └── projectStages
```

The UI should not write directly to Dexie.

## After creation

On success:

```text
Create project
     ↓
Mutation succeeds
     ↓
Invalidate project query
     ↓
React Query refetches
     ↓
New project appears
```

## Developer checklist

When adding a project field, trace it through:

```text
UI
 ↓
Form/type
 ↓
CreateProjectInput
 ↓
Service
 ↓
DB function
 ↓
DB schema
 ↓
Read/query path
```

A field is incomplete if it only exists in the form.

## Related

- [Project](./PROJECT.md)
- [Reordering Stages](./REORDERING_STAGES.md)
