import React from 'react';

export const SegmentedControl = ({ options = [], value, onChange, className = '' }) => (
  <div className={`segmented-control ${className}`} role="tablist">
    {options.map((option) => {
      const Icon = option.icon;
      return (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={option.value === value}
          onClick={() => onChange(option.value)}
          className={`segmented-item ${option.value === value ? 'selected' : ''}`}
        >
          {Icon && <Icon size={14} />}
          <span>{option.label}</span>
        </button>
      );
    })}
  </div>
);

export default SegmentedControl;
