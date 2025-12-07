'use client';
import { Provider } from 'react-redux';
import { store } from './store';
import PersistenceManager from '@/components/Logic/PersistenceManager';

export const StoreProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistenceManager />
      {children}
    </Provider>
  );
};
