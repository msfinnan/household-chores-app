# Household Chores Todo App — Design

## Tech Stack
- React 18 + TypeScript
- Vite (build tool)
- localStorage via abstracted StorageService
- React Context + useReducer for state
- CSS Modules or plain CSS (no UI framework dependency)

## Project Structure

```
chores-app/
├── src/
│   ├── types/
│   │   └── index.ts          # Shared types: User, Chore, RecurrenceRule
│   ├── storage/
│   │   ├── StorageService.ts # Interface definition
│   │   └── LocalStorageService.ts # localStorage implementation
│   ├── state/
│   │   ├── AppContext.tsx     # React context + provider
│   │   ├── reducer.ts        # useReducer logic
│   │   └── actions.ts        # Action type definitions
│   ├── utils/
│   │   └── recurrence.ts     # Next due date calculation logic
│   ├── components/
│   │   ├── UserSelector.tsx  # Dropdown on load
│   │   ├── UserManager.tsx   # Add/remove users
│   │   ├── ChoreList.tsx     # Main chore list with filters
│   │   ├── ChoreItem.tsx     # Single chore row
│   │   ├── AddChoreForm.tsx  # Form to create a chore
│   │   └── FilterBar.tsx     # Assignee filter controls
│   ├── App.tsx
│   └── main.tsx
```

## Core Types

```ts
type RecurrenceType = 'none' | 'daily' | 'weekly' | 'monthly' | 'custom';

interface RecurrenceRule {
  type: RecurrenceType;
  intervalDays?: number; // used when type === 'custom'
}

interface User {
  id: string;
  name: string;
}

interface Chore {
  id: string;
  title: string;
  description?: string;
  assigneeIds: string[];
  recurrence: RecurrenceRule;
  dueDate: string; // ISO date string
  status: 'pending' | 'done';
  completedAt?: string; // ISO date string
}
```

## StorageService Interface

```ts
interface StorageService {
  getUsers(): User[];
  saveUsers(users: User[]): void;
  getChores(): Chore[];
  saveChores(chores: Chore[]): void;
}
```

The `LocalStorageService` implements this interface. To swap in a backend, implement the same interface with fetch/axios calls — no other code changes needed.

## Recurrence Logic

When a recurring chore is marked done:
1. Set the current chore's status to `done` and `completedAt` to now.
2. Calculate the next due date using `recurrence.ts`:
   - `daily` → +1 day
   - `weekly` → +7 days
   - `monthly` → +1 calendar month
   - `custom` → +`intervalDays` days
3. Create a new chore entry with the same properties, `status: 'pending'`, and the new due date.

## State Shape

```ts
interface AppState {
  currentUserId: string | null;
  users: User[];
  chores: Chore[];
  filterAssigneeId: string | null;
}
```

## Key Actions
- `SET_CURRENT_USER`
- `ADD_USER` / `REMOVE_USER`
- `ADD_CHORE`
- `COMPLETE_CHORE` (handles both one-off and recurring)
- `SET_FILTER`

## UI Flow
1. App loads → if no current user in session, show `UserSelector` overlay.
2. Once user selected → show main view: `FilterBar` + `ChoreList` + `AddChoreForm`.
3. `ChoreList` renders `ChoreItem` for each chore, sorted by due date, overdue items highlighted.
4. Completing a chore dispatches `COMPLETE_CHORE` → reducer handles next-occurrence logic.
