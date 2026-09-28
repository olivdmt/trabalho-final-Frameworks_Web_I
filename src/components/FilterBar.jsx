import React from 'react';
import { TYPE_TRANSLATIONS } from '../services/api';
import Chip from './ui/Chip';

export const FilterBar = ({
  types = [],
  selectedType,
  onSelectType,
  sortBy,
  onSortChange,
  totalResults,
}) => (
  <div className="toolbar">
    <div className="toolbar-left">
      <Chip
        label="Todos"
        active={selectedType === ''}
        onClick={() => onSelectType('')}
      />
      {types.map((type) => (
        <Chip
          key={type.name}
          label={TYPE_TRANSLATIONS[type.name] || type.name}
          active={selectedType === type.name}
          onClick={() => onSelectType(type.name)}
        />
      ))}
    </div>

    <div className="toolbar-right">
      {totalResults > 0 && (
        <span className="results-label">{totalResults} resultados</span>
      )}
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
        aria-label="Ordenar"
      >
        <option value="id_asc">N° Crescente</option>
        <option value="id_desc">N° Decrescente</option>
        <option value="name_asc">Nome A – Z</option>
        <option value="name_desc">Nome Z – A</option>
      </select>
    </div>
  </div>
);

export default FilterBar;
