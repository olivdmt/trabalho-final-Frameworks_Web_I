import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import TypeBadge from './ui/TypeBadge';
import { formatPokemonId, TYPE_COLORS } from '../services/api';

export const PokemonCard = ({ pokemon, isFavorite = false, onToggleFavorite }) => {
  if (!pokemon) return null;

  const primaryType = pokemon.types?.[0]?.type?.name || 'normal';
  const accentColor = TYPE_COLORS[primaryType] || '#8E8E93';

  const imageSrc =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default ||
    '';

  const handleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isFavorite) {
      confetti({
        particleCount: 20,
        spread: 55,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        colors: [accentColor, '#FF3B30', '#007AFF'],
        scalar: 0.8,
      });
    }

    onToggleFavorite?.(pokemon);
  };

  return (
    <div className="poke-card" style={{ '--card-accent': accentColor }}>
      <div className="poke-card-image-zone">
        <div className="poke-card-bg" />
        <div className="poke-card-actions">
          <button
            type="button"
            onClick={handleFav}
            className={`fav-btn ${isFavorite ? 'is-fav' : ''}`}
            aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Heart size={15} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
        <img
          src={imageSrc}
          alt={pokemon.name}
          className="poke-card-img"
          loading="lazy"
        />
      </div>

      <Link to={`/pokemon/${pokemon.id}`} className="poke-card-body">
        <span className="poke-card-id">{formatPokemonId(pokemon.id)}</span>
        <h3 className="poke-card-name">{pokemon.name}</h3>
        <div className="poke-card-types">
          {pokemon.types?.map((t) => (
            <TypeBadge key={t.type.name} type={t.type.name} size="sm" />
          ))}
        </div>
      </Link>
    </div>
  );
};

export default PokemonCard;
