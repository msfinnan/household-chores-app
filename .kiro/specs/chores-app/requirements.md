# Household Chores Todo App — Requirements

## Overview
A web-based household chores management app built with React and TypeScript. Supports multiple users, recurring and one-off chores, and assignment/ownership. No authentication — users identify via a dropdown selector on load. Data persists in localStorage behind an abstraction layer to allow future backend integration.

## Users

### User Management
- REQ-1: The app shall display a user selector dropdown on load so the current user can identify themselves.
- REQ-2: The app shall allow adding new users by name.
- REQ-3: The app shall allow removing existing users.
- REQ-4: Each user shall have a unique id and a display name.
- REQ-5: The selected user shall persist for the session (sessionStorage or in-memory).

## Chores

### Chore Properties
- REQ-6: Each chore shall have a title, optional description, one or more assignees (user ids), a recurrence setting, a due date, and a status (pending | done).
- REQ-7: Recurrence options shall include: none (one-off), daily, weekly, monthly.
- REQ-8: The recurrence model shall be extensible to support custom intervals (e.g. every N days) without breaking changes.

### Chore Creation
- REQ-9: Any user shall be able to add a new chore with title, optional description, assignees, recurrence type, and due date.
- REQ-10: At least one assignee must be selected when creating a chore.

### Chore Completion
- REQ-11: A chore can be marked as done by any assigned user.
- REQ-12: When a one-off chore is marked done, its status shall be set to done and it shall remain visible in a completed state.
- REQ-13: When a recurring chore is marked done, the app shall automatically generate the next occurrence based on the recurrence interval, and the original instance shall be marked done.

### Chore List & Filtering
- REQ-14: The chore list shall display all chores visible to the current user.
- REQ-15: The list shall be filterable by assignee.
- REQ-16: Overdue chores (due date in the past, status pending) shall be visually highlighted.
- REQ-17: Chores shall be sortable/grouped by due date.

## Storage & Architecture

### Storage Abstraction
- REQ-18: All data access shall go through a `StorageService` interface, not directly to localStorage.
- REQ-19: The localStorage implementation shall be swappable for an API-backed implementation without changes to the rest of the app.

### State Management
- REQ-20: App state shall be managed via React Context and useReducer.
- REQ-21: The state shape and reducer pattern shall be compatible with future migration to Redux or Zustand.
