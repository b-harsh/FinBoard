import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  widgets: [],
  layout: [],
};

const widgetSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      state.widgets.push(action.payload);
    },
    removeWidget: (state, action) => {
      state.widgets = state.widgets.filter((w) => w.id !== action.payload);
    },
    updateWidget: (state, action) => {
      const index = state.widgets.findIndex((w) => w.id === action.payload.id);
      if (index !== -1) {
        state.widgets[index] = action.payload;
      }
    },
    updateLayout: (state, action) => {
      state.layout = action.payload;
      action.payload.forEach((item) => {
        const widget = state.widgets.find((w) => w.id === item.i);
        if (widget) {
          widget.layout = {
            ...widget.layout,
            x: item.x,
            y: item.y,
            w: item.w,
            h: item.h,
          };
        }
      });
    },
    loadFromStorage: (state, action) => {
      state.widgets = action.payload.widgets || [];
      state.layout = action.payload.layout || [];
    },
  },
});

export const {
  addWidget,
  removeWidget,
  updateWidget,
  updateLayout,
  loadFromStorage,
} = widgetSlice.actions;
export default widgetSlice.reducer;
