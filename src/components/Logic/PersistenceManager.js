'use client';
const { loadFromStorage } = require('@/store/slices/widgetSlice');
const { useEffect } = require('react');
const { useDispatch, useSelector } = require('react-redux');

const PersistenceManager = () => {
  const dispatch = useDispatch();
  const { widgets, layout } = useSelector((state) => state.widgets);

  useEffect(() => {
    const savedData = localStorage.getItem('finboard_state');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        dispatch(loadFromStorage(parsed));
      } catch (e) {
        console.error('Failed to load dashboard State', e);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (widgets.length > 0) {
      const statetoSave = { widgets, layout };
      localStorage.setItem('finboard_state', JSON.stringify(statetoSave));
    } else {
    }
  }, [widgets, layout]);
  return null;
};

export default PersistenceManager;
