import type { Chore, User } from '../types';
import type { StorageService } from './StorageService';

/** Storage key constants to avoid magic strings. */
const KEYS = {
  users: 'chores-app:users',
  chores: 'chores-app:chores',
} as const;

type StorageKey = (typeof KEYS)[keyof typeof KEYS];

/**
 * localStorage-backed implementation of {@link StorageService}.
 *
 * - Reads gracefully handle missing or malformed data (returns `null`).
 * - Writes catch serialization/quota errors and surface them via console.
 */
class LocalStorageService implements StorageService {
  getUsers(): User[] {
    return this.read<User[]>(KEYS.users) ?? [];
  }

  saveUsers(users: User[]): void {
    this.write(KEYS.users, users);
  }

  getChores(): Chore[] {
    return this.read<Chore[]>(KEYS.chores) ?? [];
  }

  saveChores(chores: Chore[]): void {
    this.write(KEYS.chores, chores);
  }

  clear(): void {
    Object.values(KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  }

  // ─── Private helpers ───────────────────────────────────────────────

  /**
   * Safely read and parse a JSON value from localStorage.
   * Returns `null` if the key is absent or the value is unparseable.
   */
  private read<T>(key: StorageKey): T | null {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return null;
      return JSON.parse(raw) as T;
    } catch (error: unknown) {
      console.warn(
        `[LocalStorageService] Failed to read key "${key}":`,
        error,
      );
      return null;
    }
  }

  /**
   * Serialize and persist a value to localStorage.
   * Logs a warning if the write fails (e.g. quota exceeded).
   */
  private write(key: StorageKey, value: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error: unknown) {
      console.error(
        `[LocalStorageService] Failed to write key "${key}":`,
        error,
      );
    }
  }
}

/** Singleton instance for app-wide use. */
export const storage: StorageService = new LocalStorageService();
