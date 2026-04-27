# Household Chores Todo App — Tasks

## Task 1: Project Scaffold
Set up the Vite + React + TypeScript project.

- [ ] Run `npm create vite@latest chores-app -- --template react-ts`
- [ ] Install dependencies (`npm install`)
- [ ] Clean out boilerplate (default App.tsx, CSS, assets)
- [ ] Verify dev server starts

## Task 2: Core Types
Create shared TypeScript types used across the app.

- [x] Create `src/types/index.ts`
- [x] Define `User`, `Chore`, `RecurrenceRule`, `RecurrenceType`, `AppState`

## Task 3: Storage Layer
Implement the storage abstraction.

- [ ] Create `src/storage/StorageService.ts` with the `StorageService` interface
- [ ] Create `src/storage/LocalStorageService.ts` implementing the interface using localStorage
- [ ] Export a singleton instance for use in the app

## Task 4: Recurrence Utility
Implement next-due-date calculation logic.

- [ ] Create `src/utils/recurrence.ts`
- [ ] Implement `getNextDueDate(dueDate: string, rule: RecurrenceRule): string`
- [ ] Handle `daily`, `weekly`, `monthly`, `custom` cases

## Task 5: State Management
Wire up React Context and useReducer.

- [ ] Create `src/state/actions.ts` with all action types and interfaces
- [ ] Create `src/state/reducer.ts` implementing all action handlers
- [ ] Create `src/state/AppContext.tsx` with provider that loads initial state from StorageService and persists on every state change

## Task 6: UserSelector Component
Build the user selection overlay shown on first load.

- [ ] Create `src/components/UserSelector.tsx`
- [ ] Dropdown lists all existing users
- [ ] "Continue" button sets `currentUserId` in state
- [ ] Show overlay when `currentUserId` is null

## Task 7: UserManager Component
Build the UI for adding and removing users.

- [ ] Create `src/components/UserManager.tsx`
- [ ] Text input + "Add User" button dispatches `ADD_USER`
- [ ] List of current users each with a "Remove" button dispatching `REMOVE_USER`

## Task 8: AddChoreForm Component
Build the form for creating new chores.

- [ ] Create `src/components/AddChoreForm.tsx`
- [ ] Fields: title (required), description (optional), assignees (multi-select from users), recurrence type (dropdown), due date (date picker)
- [ ] Validate at least one assignee selected and title non-empty
- [ ] On submit dispatch `ADD_CHORE` and reset form

## Task 9: ChoreItem Component
Build the individual chore row.

- [ ] Create `src/components/ChoreItem.tsx`
- [ ] Display title, assignees, due date, recurrence badge, status
- [ ] Highlight row if overdue (due date past and status pending)
- [ ] "Mark Done" button dispatches `COMPLETE_CHORE`
- [ ] Completed chores show a done state (greyed out, checkmark)

## Task 10: FilterBar Component
Build the assignee filter controls.

- [ ] Create `src/components/FilterBar.tsx`
- [ ] "All" option plus one button/option per user
- [ ] Selecting a user dispatches `SET_FILTER`

## Task 11: ChoreList Component
Build the main chore list view.

- [ ] Create `src/components/ChoreList.tsx`
- [ ] Read chores and filter from state
- [ ] Apply `filterAssigneeId` filter
- [ ] Sort chores by due date (overdue first, then ascending)
- [ ] Render `ChoreItem` for each chore

## Task 12: App Assembly
Wire everything together in App.tsx.

- [ ] Render `UserSelector` overlay when no current user
- [ ] Render main layout: `UserManager`, `FilterBar`, `ChoreList`, `AddChoreForm`
- [ ] Apply basic layout styles

## Task 13: Styling
Add minimal but clean styles.

- [ ] Global reset and base styles
- [ ] Overdue highlight (e.g. red left border or background tint)
- [ ] Done chore styling (muted/strikethrough)
- [ ] Responsive single-column layout for mobile friendliness
