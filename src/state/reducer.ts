import { AppState, Chore } from '../types';
import { Action } from './actions';
import { getNextDueDate } from '../utils/recurrence';

export const initialState: AppState = {
  currentUserId: null,
  users: [],
  chores: [],
  filterAssigneeId: null,
};

export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return { ...state, currentUserId: action.payload.userId };

    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload.user] };

    case 'REMOVE_USER': {
      const { userId } = action.payload;
      return {
        ...state,
        users: state.users.filter((u) => u.id !== userId),
        chores: state.chores.map((chore) => ({
          ...chore,
          assigneeIds: chore.assigneeIds.filter((id) => id !== userId),
        })),
        currentUserId:
          state.currentUserId === userId ? null : state.currentUserId,
        filterAssigneeId:
          state.filterAssigneeId === userId ? null : state.filterAssigneeId,
      };
    }

    case 'ADD_CHORE':
      return { ...state, chores: [...state.chores, action.payload.chore] };

    case 'COMPLETE_CHORE': {
      const { choreId } = action.payload;
      const now = new Date().toISOString();
      const newChores: Chore[] = [];

      for (const chore of state.chores) {
        if (chore.id !== choreId) {
          newChores.push(chore);
          continue;
        }

        // Mark the current chore as done
        const completedChore: Chore = {
          ...chore,
          status: 'done',
          completedAt: now,
        };
        newChores.push(completedChore);

        // If it has a recurrence rule (not 'none'), create a new pending chore
        if (chore.recurrence.type !== 'none') {
          const nextDueDate = getNextDueDate(chore.dueDate, chore.recurrence);
          const nextChore: Chore = {
            ...chore,
            id: crypto.randomUUID(),
            dueDate: nextDueDate,
            status: 'pending',
            completedAt: undefined,
          };
          newChores.push(nextChore);
        }
      }

      return { ...state, chores: newChores };
    }

    case 'SET_FILTER':
      return { ...state, filterAssigneeId: action.payload.assigneeId };

    default:
      return state;
  }
}
