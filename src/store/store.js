import { configureStore } from '@reduxjs/toolkit';
import widgetReducer from './slices/widgetSlice';

export const store = configureStore({
  reducer: {
    widgets: widgetReducer,
  },
});
