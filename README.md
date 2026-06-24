# household-chores-app

A household chores management web app built with React + TypeScript.

## Features
- Multi-user support with a simple dropdown user selector (no auth)
- Recurring chores (daily, weekly, monthly, extensible to custom intervals)
- One-off chores
- Assignee ownership and filtering
- Overdue highlighting
- localStorage persistence behind a swappable StorageService abstraction

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS recommended) and npm

### Install
```bash
npm install
```

### Development
Start the Vite dev server with hot module replacement:
```bash
npm run dev
```

### Build
Type-check and produce a production build:
```bash
npm run build
```

### Preview
Preview the production build locally:
```bash
npm run preview
```

### Lint
Run ESLint across the project:
```bash
npm run lint
```

## Project Structure
```
household-chores-app/
├── index.html              # App entry HTML
├── vite.config.ts          # Vite configuration
├── eslint.config.js        # ESLint configuration
├── tsconfig*.json          # TypeScript configuration
├── public/                 # Static assets
└── src/
    ├── App.tsx             # Root application component
    ├── main.tsx            # React entry point
    ├── storage/
    │   ├── StorageService.ts        # Storage abstraction interface
    │   └── LocalStorageService.ts   # localStorage implementation
    └── types/
        └── index.ts        # Shared type definitions
```

## Spec
See `.kiro/specs/chores-app/` for requirements, design, and implementation tasks.

## Stack
- React 18 + TypeScript
- Vite
- React Context + useReducer
- localStorage (swappable for a backend via StorageService interface)
