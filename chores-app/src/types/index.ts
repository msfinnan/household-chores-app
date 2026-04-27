export type RecurrenceType = 'none' | 'daily' | 'weekly' | 'monthly' | 'custom';

export interface RecurrenceRule {
  type: RecurrenceType;
  intervalDays?: number; // used when type === 'custom'
}

export interface User {
  id: string;
  name: string;
}

export interface Chore {
  id: string;
  title: string;
  description?: string;
  assigneeIds: string[];
  recurrence: RecurrenceRule;
  dueDate: string; // ISO date string
  status: 'pending' | 'done';
  completedAt?: string; // ISO date string
}

export interface AppState {
  currentUserId: string | null;
  users: User[];
  chores: Chore[];
  filterAssigneeId: string | null;
}
