import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Zap } from 'lucide-react';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/ui/SearchBar';

export const Favorites = ({ favorites = [], onToggleFavorite, isFavorite }) => {
  const [query, setQuery] = useState('');

  const filtered = favorites.filter((p) => {
    const q = query.toLowerCase().trim();
    return !q || p.name.toLowerCase().includes(q) || String(p.id).includes(q);
  });

  return (
    <div>
      <div className="favorites-hero">
        <h1>Favoritos</h1>
        <p>
          {favorites.length === 0
            ? 'Nenhum Pokémon salvo ainda.'
            : `${favorites.length} Pokémon${favorites.length !== 1 ? 's' : ''} na sua coleção`}
        </p>
      </div>

      {favorites.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <SearchBar
            value={query}
            onChange={setQuery}
            onClear={() => setQuery('')}
            placeholder="Filtrar favoritos..."
          />
        </div>
      )}

      {favorites.length === 0 ? (
        <div className="apple-state-box">
          <div className="apple-state-icon">
            <Heart size={24} />
          </div>
          <h3 className="apple-state-title">Coleção vazia</h3>
          <p className="apple-state-desc">Explore a Pokédex e clique no coração para salvar seus favoritos aqui.</p>
          <Link to="/" className="apple-btn-primary">
            <Zap size={16} />
            Explorar Pokémons
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        <div className="apple-state-box">
          <h3 className="apple-state-title">Nenhum resultado</h3>
          <p className="apple-state-desc">Nenhum favorito corresponde a "{query}".</p>
          <button type="button" onClick={() => setQuery('')} className="apple-btn-secondary">Limpar busca</button>
        </div>
      ) : (
        <div className="pokemon-grid">
          {filtered.map((p) => (
            <PokemonCard
              key={p.id}
              pokemon={p}
              isFavorite={isFavorite(p.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
