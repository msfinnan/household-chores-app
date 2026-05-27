import { User, Chore } from '../types';

export type Action =
  | SetCurrentUserAction
  | AddUserAction
  | RemoveUserAction
  | AddChoreAction
  | CompleteChoreAction
  | SetFilterAction;

export interface SetCurrentUserAction {
  type: 'SET_CURRENT_USER';
  payload: { userId: string | null };
}

export interface AddUserAction {
  type: 'ADD_USER';
  payload: { user: User };
}

export interface RemoveUserAction {
  type: 'REMOVE_USER';
  payload: { userId: string };
}

export interface AddChoreAction {
  type: 'ADD_CHORE';
  payload: { chore: Chore };
}

export interface CompleteChoreAction {
  type: 'COMPLETE_CHORE';
  payload: { choreId: string };
}

export interface SetFilterAction {
  type: 'SET_FILTER';
  payload: { assigneeId: string | null };
}
