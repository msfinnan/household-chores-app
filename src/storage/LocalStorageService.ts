import { User, Chore } from '../types';
import { StorageService } from './StorageService';

const USERS_KEY = 'chores-app:users';
const CHORES_KEY = 'chores-app:chores';

class LocalStorageServiceImpl implements StorageService {
  getUsers(): User[] {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as User[];
    } catch {
      return [];
    }
  }

  saveUsers(users: User[]): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  getChores(): Chore[] {
    const raw = localStorage.getItem(CHORES_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as Chore[];
    } catch {
      return [];
    }
  }

  saveChores(chores: Chore[]): void {
    localStorage.setItem(CHORES_KEY, JSON.stringify(chores));
  }
}

/** Singleton instance used throughout the app */
export const storage: StorageService = new LocalStorageServiceImpl();
