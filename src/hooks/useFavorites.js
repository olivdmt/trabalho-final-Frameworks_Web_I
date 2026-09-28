import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const toggleFavorite = (pokemon) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === pokemon.id);
      if (exists) {
        return prev.filter((item) => item.id !== pokemon.id);
      }
      return [
        ...prev,
        {
          id: pokemon.id,
          name: pokemon.name,
          types: pokemon.types,
          sprites: {
            other: {
              'official-artwork': {
                front_default: pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default,
              },
            },
            front_default: pokemon.sprites?.front_default,
          },
          stats: pokemon.stats,
        },
      ];
    });
  };

  const isFavorite = (id) => favorites.some((item) => item.id === id);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    favoritesCount: favorites.length,
  };
};
