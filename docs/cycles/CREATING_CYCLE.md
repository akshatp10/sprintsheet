# Creating a Cycle

## Flow

```text
CreateCycleForm
      ↓
CreateCycleInput
      ↓
useCreateCycle()
      ↓
cycle service
      ↓
cycle DB function
      ↓
Dexie / IndexedDB
```

The form collects:

- Name
- Start date
- End date

The name is optional. If omitted, a default name is generated from the date range.

Example:

```text
AUG 19 - AUG 27
```

The date range is validated before creation.

### Screenshot

> **Screenshot:** Create Cycle form.
>
> `screenshots/create-cycle.png`

## After creation

The mutation returns the newly created cycle.

```text
Create cycle
    ↓
new Cycle returned
    ↓
cycle query updated
    ↓
new cycle selected
```

This allows the UI to immediately switch to the newly created cycle.

## Cycle creation does not create tasks

```text
Create Cycle
     ↓
Cycle exists

Add/create Task
     ↓
TaskCycle created
```

A cycle and its task relationships are separate records.

## Related

- [Cycle](./CYCLE.md)
- [Cycle Selection](./CYCLE_SELECTION.md)
- [Tasks in a Cycle](./TASKS_IN_A_CYCLE.md)
