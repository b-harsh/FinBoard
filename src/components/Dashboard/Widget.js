'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeWidget } from '@/store/slices/widgetSlice';
import { useWidgetData } from '@/hooks/useWidgetData';
import ChartWidget from './ChartWidget';
import _ from 'lodash';

const Widget = ({ widget, onEdit }) => {
  const dispatch = useDispatch();
  const { data, loading, error, lastUpdated, refetch } = useWidgetData(
    widget.apiConfig
  );
  const [searchTerm, setSearchTerm] = useState('');

  const handleRefresh = () => {
    refetch();
    console.log('Refreshing...');
  };

  const handleDelete = () => {
    if (confirm(`Delete widget "${widget.title}"?`)) {
      dispatch(removeWidget(widget.id));
    }
  };

  const handleSettings = () => {
    if (onEdit) onEdit();
    console.log('Settings clicked');
  };

  const formatTime = (date) => (date ? date.toLocaleTimeString() : '');

  const renderTable = () => {
    let tableData = Array.isArray(data) ? data : data ? [data] : [];
    if (searchTerm) {
      tableData = tableData.filter((row) =>
        JSON.stringify(row).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div
          style={{
            padding: '12px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ position: 'relative', width: '60%' }}>
            <input
              type="text"
              placeholder="Search table..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 12px',
                color: '#e5e7eb',
                fontSize: '0.85rem',
                outline: 'none',
              }}
            />
          </div>
          <div
            style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: '500' }}
          >
            {tableData.length} of{' '}
            {Array.isArray(data) ? data.length : data ? 1 : 0} items
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.85rem',
              tableLayout: 'fixed',
            }}
          >
            <thead
              style={{
                position: 'sticky',
                top: 0,
                backgroundColor: '#111827',
                zIndex: 1,
              }}
            >
              <tr style={{ borderBottom: '1px solid #374151' }}>
                {widget.dataFields.map((field) => (
                  <th
                    key={field.path}
                    style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      color: '#9ca3af',
                      fontWeight: '500',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                    }}
                  >
                    {field.label}{' '}
                    <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>⇅</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #1f2937' }}>
                  {widget.dataFields.map((field) => (
                    <td
                      key={field.path}
                      style={{ padding: '12px 16px', color: '#e5e7eb' }}
                    >
                      {_.get(row, field.path) ||
                        _.get(row, field.path.split('.').slice(1).join('.')) ||
                        '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderCard = () => {
    return (
      <div
        style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {widget.dataFields.map((field, idx) => {
          const value = _.get(data, field.path, 'N/A');
          const isPrimary = idx === 1;
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                borderBottom:
                  idx < widget.dataFields.length - 1
                    ? '1px solid #1f2937'
                    : 'none',
                paddingBottom:
                  idx < widget.dataFields.length - 1 ? '16px' : '0',
              }}
            >
              <span
                style={{
                  color: '#6b7280',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  textTransform: 'lowercase',
                }}
              >
                {field.label}
              </span>
              <span
                style={{
                  fontSize: isPrimary ? '1.5rem' : '1.1rem',
                  fontWeight: '700',
                  color: 'white',
                  fontFamily: 'sans-serif',
                }}
              >
                {typeof value === 'number' ? value.toLocaleString() : value}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      style={{
        height: '100%',
        backgroundColor: '#111827',
        borderRadius: '12px',
        border: '1px solid #1f2937',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div
        className="widget-drag-handle"
        style={{
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: widget.type === 'table' ? 'none' : '1px solid #1f2937',
          cursor: 'grab',
          backgroundColor: '#111827',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            pointerEvents: 'none',
          }}
        >
          <span style={{ fontSize: '1rem', color: '#9ca3af' }}>
            {widget.type === 'chart'
              ? '📈'
              : widget.type === 'table'
              ? '▤'
              : '▦'}
          </span>
          <h3
            style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: 'white',
              margin: 0,
            }}
          >
            {widget.title}
          </h3>
          <span
            style={{
              fontSize: '0.75rem',
              color: '#6b7280',
              backgroundColor: '#1f2937',
              padding: '2px 6px',
              borderRadius: '4px',
              border: '1px solid #374151',
            }}
          >
            {widget.apiConfig.interval}s
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '8px',
            color: '#9ca3af',
            cursor: 'pointer',
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <button
            title="Refresh"
            onClick={handleRefresh}
            className="icon-btn"
            style={{ animation: loading ? 'spin 1s infinite linear' : 'none' }}
          >
            ↻
          </button>
          <button
            title="Settings"
            onClick={handleSettings}
            className="icon-btn"
          >
            ⚙
          </button>
          <button
            title="Delete"
            onClick={handleDelete}
            className="icon-btn hover-red"
          >
            🗑
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {error ? (
          <div style={{ padding: '20px', color: '#ef4444' }}>
            Error: {error}
          </div>
        ) : !data && loading ? (
          <div style={{ padding: '20px', color: '#9ca3af' }}>
            Loading data...
          </div>
        ) : (
          <>
            {widget.type === 'chart' && (
              <ChartWidget
                title={widget.title}
                dataPoint={Number(_.get(data, widget.dataFields[0]?.path))}
                label={widget.dataFields[0]?.label}
              />
            )}
            {widget.type === 'table' && renderTable()}
            {widget.type === 'card' && renderCard()}
          </>
        )}
      </div>

      {widget.type !== 'table' && (
        <div
          style={{
            padding: '8px 16px',
            borderTop: '1px solid #1f2937',
            fontSize: '0.7rem',
            color: '#4b5563',
            textAlign: 'center',
          }}
        >
          Last updated: {formatTime(lastUpdated)}
        </div>
      )}
    </div>
  );
};

export default Widget;
