import type { Chore, User } from '../types';

/**
 * Abstraction over persistence.
 *
 * Implementations can use localStorage, IndexedDB, a remote API, etc.
 * All methods are synchronous today but the interface is designed so that
 * swapping to an async implementation requires only changing return types
 * to Promises (callers already handle `T | null` semantics).
 */
export interface StorageService {
  /** Retrieve all registered users. Returns an empty array when none exist. */
  getUsers(): User[];

  /** Persist the full users list, replacing any previous value. */
  saveUsers(users: User[]): void;

  /** Retrieve all chores. Returns an empty array when none exist. */
  getChores(): Chore[];

  /** Persist the full chores list, replacing any previous value. */
  saveChores(chores: Chore[]): void;

  /**
   * Remove all persisted data.
   * Useful for testing or user-initiated resets.
   */
  clear(): void;
}
