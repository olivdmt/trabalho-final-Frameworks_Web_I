import React from 'react';
import { TYPE_COLORS, TYPE_TRANSLATIONS } from '../services/api';

/**
 * Componente reutilizável para exibir a badge do tipo de Pokémon com cores temáticas
 * @param {string} type - Nome do tipo em inglês
 * @param {string} size - 'sm' | 'md' | 'lg'
 */
export const TypeBadge = ({ type, size = 'md' }) => {
  const typeName = type?.name || type;
  const color = TYPE_COLORS[typeName?.toLowerCase()] || '#777777';
  const label = TYPE_TRANSLATIONS[typeName?.toLowerCase()] || typeName;

  return (
    <span
      className={`type-badge type-badge-${size}`}
      style={{
        backgroundColor: color,
        boxShadow: `0 2px 8px ${color}55`,
      }}
    >
      {label}
    </span>
  );
};

export default TypeBadge;
