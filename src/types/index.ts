/**
 * Core types for the Household Chores App.
 */

export type RecurrenceType = 'none' | 'daily' | 'weekly' | 'monthly' | 'custom';

export interface RecurrenceRule {
  type: RecurrenceType;
  /** Used when type === 'custom' */
  intervalDays?: number;
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
  /** ISO date string (YYYY-MM-DD) */
  dueDate: string;
  status: 'pending' | 'done';
  /** ISO date string, set when chore is completed */
  completedAt?: string;
}

export interface AppState {
  currentUserId: string | null;
  users: User[];
  chores: Chore[];
  filterAssigneeId: string | null;
}
