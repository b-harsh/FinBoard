'use client';
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadFromStorage } from '@/store/slices/widgetSlice';
import styles from './Navbar.module.css';

const Navbar = ({ onAddWidgetClick }) => {
  const dispatch = useDispatch();
  const [isDark, setIsDark] = useState(true);
  const { widgets, layout } = useSelector((state) => state.widgets);
  const fileInputRef = useRef(null);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('light-mode');
  };

  const handleExport = () => {
    if (widgets.length === 0) return alert('Nothing to export!');
    const dataStr = JSON.stringify({ widgets, layout }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `finboard_config_${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        if (Array.isArray(json.widgets)) {
          if (
            confirm('This will overwrite your current dashboard. Continue?')
          ) {
            dispatch(loadFromStorage(json));
          }
        } else {
          alert('Invalid configuration file.');
        }
      } catch {
        alert('Failed to read file.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <div className={styles.icon}>📊</div>
        <div>
          <h1>Finance Dashboard</h1>
          <p className={styles.subtitle}>
            {widgets.length} active widget{widgets.length !== 1 ? 's' : ''} •
            Real-time data
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept=".json"
          onChange={handleFileChange}
        />

        <button
          onClick={handleExport}
          className="btn-secondary"
          title="Export Config"
        >
          ⬇ Export
        </button>

        <button
          onClick={handleImportClick}
          className="btn-secondary"
          title="Import Config"
        >
          ⬆ Import
        </button>

        <div className="divider"></div>

        <button onClick={toggleTheme} className="btn-secondary">
          {isDark ? '☀️ Light Theme' : '🌙 Dark Theme'}
        </button>

        <button className="btn btn-primary" onClick={onAddWidgetClick}>
          + Add Widget
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
