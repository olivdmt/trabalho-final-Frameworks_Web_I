import React, { useRef } from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({ value, onChange, onClear, placeholder = 'Buscar Pokémon por nome ou número...', className = '' }) => {
  const inputRef = useRef(null);

  const handleClear = () => {
    onClear();
    inputRef.current?.focus();
  };

  return (
    <div className={`search-spotlight ${className}`}>
      <Search size={18} className="search-spotlight-icon" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-spotlight-input"
        spellCheck="false"
        autoComplete="off"
      />
      {value && (
        <button type="button" onClick={handleClear} className="search-spotlight-clear" aria-label="Limpar">
          <X size={13} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
