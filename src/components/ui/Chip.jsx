import React from 'react';

export const Chip = ({ label, active = false, onClick, icon: Icon, className = '', count }) => (
  <button
    type="button"
    onClick={onClick}
    className={`chip ${active ? 'active' : ''} ${className}`}
  >
    {Icon && <Icon size={14} className="chip-icon" />}
    <span className="chip-label">{label}</span>
    {count !== undefined && <span className="chip-count">{count}</span>}
  </button>
);

export default Chip;
