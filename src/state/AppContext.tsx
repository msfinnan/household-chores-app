import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState } from '../types';
import { Action } from './actions';
import { appReducer, initialState } from './reducer';
import { storage } from '../storage/LocalStorageService';

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

function getInitialState(): AppState {
  const users = storage.getUsers();
  const chores = storage.getChores();
  return {
    ...initialState,
    users,
    chores,
  };
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, getInitialState);

  useEffect(() => {
    storage.saveUsers(state.users);
    storage.saveChores(state.chores);
  }, [state.users, state.chores]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState(): AppContextValue {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
}
