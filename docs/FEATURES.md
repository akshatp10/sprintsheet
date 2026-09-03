# Sprintsheet Feature Documentation

> **Current status:** Frontend UI implementation is in progress.  
> **Completed:** Project screen UI and frontend navigation.  
> **Data state:** Dummy/static data only. No backend, persistence, authentication, or API integration has been implemented yet.

---

## 1. Purpose

This document tracks the features that have been completed in Sprintsheet, along with:

- What has been implemented
- The approach used
- Important implementation details
- How contributors should work with the feature
- What is currently UI-only
- What remains to be implemented

This document should be updated as new features are completed.

---

# 2. Current Product State

Sprintsheet is designed as a sheet-first task management and sprint planning application.

The product design defines several screens and workflows, including:

- Projects
- Create project
- Table view
- Card view
- Task details
- Dashboard
- Cycles
- Duplicate cycle
- All tasks
- Settings
- Authentication
- Mobile views

The current implementation **does not cover these complete workflows yet**.

At the current stage, the completed implementation is focused on the **Projects screen and frontend navigation between the available UI screens/routes**.

The project data, task data, users, cycles, and other application state are currently represented through dummy/static UI data.

---

# 3. Completed Features

## 3.1 Projects Screen

**Status:** ✅ Completed — UI only

The Projects screen acts as the workspace-level project listing.

The design defines this screen as the workspace root and the landing screen after sign-in.

### Current implementation

The implemented screen provides the frontend representation of:

- Project listing
- Project cards
- Project information
- Project navigation
- New-project UI entry point
- Project search UI
- Workspace/sidebar navigation
- Responsive project-card layout
- Empty/project-related UI structure where applicable

The current implementation is visual and interactive on the frontend only.

There is currently no persistence of projects.

### Project cards

Project cards are used to present project-level information and provide navigation into a project.

The design for a project card includes information such as:

- Project avatar/identity
- Project name
- Project description
- Active cycle information
- Open task count
- Completion/progress information
- Project members

:contentReference[oaicite:0]{index=0}

The current implementation uses dummy data to populate the project UI.

### Project navigation

A project card can be used as a navigation entry into the project UI.

The project screen is currently intended to demonstrate the navigation and visual flow rather than a complete project-management workflow.

The design specifies that selecting a project should take the user into the project's last-visited view, with the default being the Sheet/Table view. :contentReference[oaicite:1]{index=1}

At the current implementation stage, the navigation is frontend-only.

---

# 4. Project Screen Architecture

The project-related UI follows the existing Sprintsheet frontend structure.

Current high-level structure:

```text
src/
├── app/
│   ├── layout/
│   ├── App.tsx
│   └── router.tsx
│
├── components/
│   ├── button/
│   ├── chips/
│   ├── common/
│   ├── identity/
│   ├── inputs/
│   ├── sidebar/
│   └── topbar/
│
├── features/
│   └── projects/
│       └── components/
│           ├── CurProjectSidebarCard.tsx
│           ├── EmptyTaskCard.tsx
│           └── ProjectCardGrid.tsx
│
├── pages/
│   ├── AllProjectsPage.tsx
│   └── testPage.tsx
│
├── styles/
│   ├── tokens/
│   └── index.css
│
└── main.tsx
```
