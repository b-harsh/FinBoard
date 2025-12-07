'use client';
import React from 'react';

const AddWidgetCard = ({ onClick }) => {
  return (
    <div className="add-widget-card" onClick={onClick}>
      <div className="icon-wrapper">
        <span className="plus-icon">+</span>
      </div>
      <h3>Add Widget</h3>
      <p>Connect to a finance API and create a custom widget</p>
    </div>
  );
};

export default AddWidgetCard;
