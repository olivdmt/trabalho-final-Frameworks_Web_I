import React from 'react';
import { TYPE_COLORS, TYPE_TRANSLATIONS } from '../../services/api';

export const TypeBadge = ({ type, size = 'md' }) => {
  const name = (type?.name || type || 'normal').toLowerCase();
  const color = TYPE_COLORS[name] || '#8E8E93';
  const label = TYPE_TRANSLATIONS[name] || name;

  return (
    <span className={`type-pill type-pill-${size}`} style={{ '--type-color': color }}>
      <span className="type-dot" />
      {label}
    </span>
  );
};

export default TypeBadge;
