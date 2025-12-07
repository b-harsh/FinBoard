'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addWidget, updateWidget } from '@/store/slices/widgetSlice';
import { getAvailablePaths } from '@/utils/jsonHelpers';
import styles from './AddWidgetModal.module.css';

const AddWidgetModal = ({ onClose, widgetToEdit = null }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('Bitcoin');
  const [apiUrl, setApiUrl] = useState(
    'https://api.coinbase.com/v2/exchange-rates?currency=BTC'
  );
  const [interval, setInterval] = useState(30);
  const [displayMode, setDisplayMode] = useState('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [availableFields, setAvailableFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);

  useEffect(() => {
    if (widgetToEdit) {
      setName(widgetToEdit.title);
      setApiUrl(widgetToEdit.apiConfig.url);
      setInterval(widgetToEdit.apiConfig.interval);
      setDisplayMode(widgetToEdit.type);
      setSelectedFields(widgetToEdit.dataFields);
      handleTestApi(widgetToEdit.apiConfig.url);
    }
  }, [widgetToEdit]);

  const handleTestApi = async (urlOverride = null) => {
    const validOverride = typeof urlOverride === 'string' ? urlOverride : null;
    const urlToUse = validOverride || apiUrl;
    setIsTesting(true);
    setConnectionStatus(null);
    try {
      const res = await fetch(urlToUse);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const fields = getAvailableFields(data);
      setAvailableFields(fields);
      setConnectionStatus('success');
    } catch (err) {
      setConnectionStatus('error');
    } finally {
      setIsTesting(false);
    }
  };

  const handleAddField = (fieldObj) => {
    if (selectedFields.find((f) => f.path === fieldObj.path)) return;
    const label = fieldObj.path.split('.').pop();
    setSelectedFields([...selectedFields, { ...fieldObj, label }]);
  };

  const handleRemoveField = (path) => {
    setSelectedFields(selectedFields.filter((f) => f.path !== path));
  };

  const handleLabelChange = (path, newLabel) => {
    setSelectedFields(
      selectedFields.map((f) =>
        f.path === path ? { ...f, label: newLabel } : f
      )
    );
  };

  const handleSubmit = () => {
    if (!name || selectedFields.length === 0)
      return alert('Please select fields.');
    const widgetData = {
      id: widgetToEdit ? widgetToEdit.id : Date.now().toString(),
      title: name,
      type: displayMode,
      apiConfig: { url: apiUrl, interval },
      dataFields: selectedFields,
      layout: widgetToEdit
        ? widgetToEdit.layout
        : {
            i: Date.now().toString(),
            x: 0,
            y: 0,
            w: displayMode === 'table' ? 6 : 3,
            h: 4,
          },
    };
    widgetToEdit
      ? dispatch(updateWidget(widgetData))
      : dispatch(addWidget(widgetData));
    onClose();
  };

  const filteredFields = availableFields.filter((f) =>
    f.path.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{widgetToEdit ? 'Edit Widget' : 'Add New Widget'}</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#6b7280',
              fontSize: '1.5rem',
              cursor: 'pointer',
            }}
          >
            ×
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Widget Name</label>
            <input
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>API URL</label>
            <div className={styles.inputGroup}>
              <input
                className={styles.input}
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
              />
              <button
                className={styles.testBtn}
                onClick={() => handleTestApi(apiUrl)}
                disabled={isTesting}
              >
                {isTesting ? 'Testing...' : '↻ Test'}
              </button>
            </div>
          </div>

          {connectionStatus === 'success' && (
            <div className={styles.successMsg}>
              <span>👁</span> Connection successful! {availableFields.length}{' '}
              fields available.
            </div>
          )}

          <div className={styles.inputGroup}>
            <div className={styles.formGroup} style={{ flex: 1 }}>
              <label className={styles.label}>Refresh Interval (seconds)</label>
              <input
                type="number"
                className={styles.input}
                value={interval}
                onChange={(e) => setInterval(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Select Fields to Display</label>
            <label className={styles.label}>Display Mode</label>
            <div className={styles.toggleGroup}>
              {['Card', 'Table', 'Chart'].map((mode) => (
                <button
                  key={mode}
                  className={`${styles.toggleBtn} ${
                    displayMode === mode.toLowerCase() ? styles.active : ''
                  }`}
                  onClick={() => setDisplayMode(mode.toLowerCase())}
                >
                  {mode === 'Card' ? '▦ ' : mode === 'Table' ? '▤ ' : '📈 '}
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label className={styles.label}>Search Fields</label>
              {displayMode === 'table' && (
                <label style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                  <input type="checkbox" /> Show arrays only
                </label>
              )}
            </div>

            {availableFields.length > 0 ? (
              <>
                <input
                  className={styles.input}
                  placeholder="Search for fields..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <label className={styles.label}>Available Fields</label>
                <div className={styles.listContainer}>
                  {filteredFields.map((field) => (
                    <div key={field.path} className={styles.fieldItem}>
                      <div className={styles.fieldInfo}>
                        <span className={styles.fieldPath}>{field.path}</span>
                        <span className={styles.fieldMeta}>
                          {field.type} | {String(field.value).substring(0, 30)}
                          ...
                        </span>
                      </div>
                      <span
                        className={styles.addIcon}
                        onClick={() => handleAddField(field)}
                      >
                        +
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div
                style={{
                  padding: '20px',
                  textAlign: 'center',
                  color: '#6b7280',
                  border: '1px dashed #374151',
                  borderRadius: '8px',
                }}
              >
                Click Test to load available data fields.
              </div>
            )}
          </div>

          {selectedFields.length > 0 && (
            <div className={styles.formGroup}>
              <label className={styles.label}>Selected Fields</label>
              {selectedFields.map((field) => (
                <div key={field.path} className={styles.selectedField}>
                  <div className={styles.selectedHeader}>
                    <span>{field.path}</span>
                    <span
                      className={styles.removeBtn}
                      onClick={() => handleRemoveField(field.path)}
                    >
                      ×
                    </span>
                  </div>
                  <input
                    className={styles.input}
                    value={field.label}
                    onChange={(e) =>
                      handleLabelChange(field.path, e.target.value)
                    }
                    style={{
                      padding: '6px',
                      fontSize: '0.85rem',
                      backgroundColor: '#111827',
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button
            className={styles.testBtn}
            style={{
              background: 'transparent',
              border: '1px solid #374151',
              color: '#9ca3af',
            }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button className={styles.testBtn} onClick={handleSubmit}>
            {widgetToEdit ? 'Save Changes' : 'Add Widget'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;
