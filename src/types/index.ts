/**
 * Core types for the Household Chores App.
 */

// ─── Branded ID types ────────────────────────────────────────────────────────
// Branded types prevent accidentally passing a UserId where a ChoreId is expected.

declare const __brand: unique symbol;

/** A nominal/branded type helper. */
type Brand<T, B extends string> = T & { readonly [__brand]: B };

/** Unique identifier for a User. */
export type UserId = Brand<string, 'UserId'>;

/** Unique identifier for a Chore. */
export type ChoreId = Brand<string, 'ChoreId'>;

// ─── Recurrence ──────────────────────────────────────────────────────────────

/** The supported recurrence frequencies. */
export type RecurrenceType = 'none' | 'daily' | 'weekly' | 'monthly' | 'custom';

/** Describes how often a chore repeats. */
export interface RecurrenceRule {
  readonly type: RecurrenceType;
  /**
   * Custom interval in days.
   * Only meaningful when `type === 'custom'`.
   * Must be a positive integer.
   */
  readonly intervalDays?: number;
}

// ─── Domain entities ─────────────────────────────────────────────────────────

/** A household member who can be assigned chores. */
export interface User {
  readonly id: UserId;
  readonly name: string;
}

/** The lifecycle status of a chore. */
export type ChoreStatus = 'pending' | 'done';

/** A single chore/task within the household. */
export interface Chore {
  readonly id: ChoreId;
  readonly title: string;
  readonly description?: string;
  /** One or more users responsible for this chore. */
  readonly assigneeIds: readonly UserId[];
  readonly recurrence: RecurrenceRule;
  /** ISO date string (YYYY-MM-DD). */
  readonly dueDate: string;
  readonly status: ChoreStatus;
  /** ISO datetime string, set when chore is marked done. */
  readonly completedAt?: string;
}

// ─── Application state ───────────────────────────────────────────────────────

/** Top-level application state shape. */
export interface AppState {
  readonly currentUserId: UserId | null;
  readonly users: readonly User[];
  readonly chores: readonly Chore[];
  readonly filterAssigneeId: UserId | null;
}

// ─── Utility types ───────────────────────────────────────────────────────────

/** Fields required when creating a new User (id is generated). */
export type CreateUserPayload = Omit<User, 'id'>;

/** Fields required when creating a new Chore (id & completedAt are generated). */
export type CreateChorePayload = Omit<Chore, 'id' | 'completedAt' | 'status'>;

/** Makes selected properties of T mutable (inverse of Readonly). */
export type Mutable<T, K extends keyof T = keyof T> = Omit<T, K> & {
  -readonly [P in K]: T[P];
};
