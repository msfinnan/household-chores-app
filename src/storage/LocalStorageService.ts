import { User, Chore } from '../types';
import { StorageService } from './StorageService';

const KEYS = {
  users: 'chores-app:users',
  chores: 'chores-app:chores',
} as const;

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

  private read<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return null;
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  private write(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

/** Singleton instance for app-wide use. */
export const storage: StorageService = new LocalStorageService();
