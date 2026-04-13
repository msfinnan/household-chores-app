# household-chores-app

A household chores management web app built with React + TypeScript.

## Features
- Multi-user support with a simple dropdown user selector (no auth)
- Recurring chores (daily, weekly, monthly, extensible to custom intervals)
- One-off chores
- Assignee ownership and filtering
- Overdue highlighting
- localStorage persistence behind a swappable StorageService abstraction

## Spec
See `.kiro/specs/chores-app/` for requirements, design, and implementation tasks.

## Stack
- React 18 + TypeScript
- Vite
- React Context + useReducer
- localStorage (swappable for a backend via StorageService interface)
