'use client';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateLayout } from '@/store/slices/widgetSlice';
import Navbar from '@/components/UI/Navbar';
import AddWidgetModal from '@/components/Dashboard/AddWidgetModal';
import Widget from '@/components/Dashboard/Widget';
import AddWidgetCard from '@/components/Dashboard/AddWidgetCard';
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Home() {
  const dispatch = useDispatch();
  const widgets = useSelector((state) => state.widgets.widgets);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWidget, setEditingWidget] = useState(null);

  const handleAddClick = () => {
    setEditingWidget(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (widget) => {
    setEditingWidget(widget);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingWidget(null);
  };

  const onLayoutChange = (currentLayout) => {
    const realWidgetsLayout = currentLayout.filter((l) => l.i !== 'add-button');
    dispatch(updateLayout(realWidgetsLayout));
  };

  const generateLayout = () => {
    const layout = widgets.map((w) => ({
      i: w.id,
      x: w.layout.x,
      y: w.layout.y,
      w: w.layout.w,
      h: w.layout.h,
      minW: 2,
      minH: 3,
    }));

    if (widgets.length > 0) {
      layout.push({
        i: 'add-button',
        x: (widgets.length * 3) % 12,
        y: Infinity,
        w: 3,
        h: 4,
        static: false,
      });
    }

    return layout;
  };

  return (
    <main className="container">
      <Navbar onAddWidgetClick={handleAddClick} />

      {widgets.length === 0 ? (
        <div
          style={{
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed #2d3748',
            borderRadius: '12px',
            color: '#a0aec0',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <h2>Build Your Finance Dashboard</h2>
          <p>Create Custom Widgets by connecting to any Finance API. Track</p>
          <p>Stocks, Crypto, Forex or Economic Indicator, all in Real-Time</p>
          <button
            className="btn btn-primary"
            onClick={handleAddClick}
            style={{ marginTop: '20px' }}
          >
            + Create First Widget
          </button>
        </div>
      ) : (
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: generateLayout() }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={60}
          onLayoutChange={onLayoutChange}
          isDraggable={true}
          isResizable={true}
          draggableHandle=".widget-drag-handle"
        >
          {widgets.map((widget) => (
            <div key={widget.id} data-grid={widget.layout}>
              <Widget widget={widget} onEdit={() => handleEditClick(widget)} />
            </div>
          ))}

          <div
            key="add-button"
            data-grid={{
              x: (widgets.length * 3) % 12,
              y: Infinity,
              w: 3,
              h: 4,
            }}
            className="add-widget-wrapper"
          >
            <div className="inner">
              <AddWidgetCard onClick={handleAddClick} />
            </div>
          </div>
        </ResponsiveGridLayout>
      )}

      {isModalOpen && (
        <AddWidgetModal
          onClose={handleCloseModal}
          widgetToEdit={editingWidget}
        />
      )}
    </main>
  );
}
