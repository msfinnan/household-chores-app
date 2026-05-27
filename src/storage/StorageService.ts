import { User, Chore } from '../types';

/**
 * Abstraction over persistence. Implementations can use localStorage,
 * IndexedDB, a remote API, etc.
 */
export interface StorageService {
  getUsers(): User[];
  saveUsers(users: User[]): void;
  getChores(): Chore[];
  saveChores(chores: Chore[]): void;
}
