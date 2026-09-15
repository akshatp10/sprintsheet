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

<img width="1902" height="906" alt="20260915-0553-32 1958032" src="https://github.com/user-attachments/assets/69ab2196-3c48-4be4-9380-4b460f04f934" />


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

<img width="1763" height="844" alt="image" src="https://github.com/user-attachments/assets/e24236a5-db42-4a8a-a89e-e314275a4fe2" />


## 2. Columns & Stages

The project starts from Sprintsheet's common basic structure.

The user can configure the initial stage/column arrangement.

Stage ordering is project-specific, so the project stores the relationship/order rather than changing the global stage definition.

See [Reordering Stages](./REORDERING_STAGES.md).

<img width="1763" height="844" alt="image" src="https://github.com/user-attachments/assets/ed484557-e862-462c-a415-3c3158c51aec" />


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

<img width="1763" height="844" alt="image" src="https://github.com/user-attachments/assets/6f1c66c1-26fc-4d4e-b426-7b013a644645" />


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
