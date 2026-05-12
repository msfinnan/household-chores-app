import { User, Chore } from '../types';

/**
 * Abstract storage interface.
 * Swap in any implementation (localStorage, REST API, IndexedDB, etc.)
 * without changing the rest of the app.
 */
export interface StorageService {
  getUsers(): User[];
  saveUsers(users: User[]): void;
  getChores(): Chore[];
  saveChores(chores: Chore[]): void;
}
