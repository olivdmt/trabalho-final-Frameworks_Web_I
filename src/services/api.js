import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 10000,
});

export const getPokemonList = async (offset = 0, limit = 24) => {
  try {
    const response = await api.get(`pokemon?offset=${offset}&limit=${limit}`);
    
    const detailedResults = await Promise.all(
      response.data.results.map((pokemon) => getPokemonDetail(pokemon.name))
    );

    return {
      count: response.data.count,
      next: response.data.next,
      previous: response.data.previous,
      results: detailedResults,
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Falha ao carregar a lista de Pokémon.');
  }
};

export const getPokemonDetail = async (nameOrId) => {
  try {
    const formatted = String(nameOrId).toLowerCase().trim();
    const response = await api.get(`pokemon/${formatted}`);
    return response.data;
  } catch (error) {
    throw new Error('Pokémon não encontrado.');
  }
};

export const getPokemonSpecies = async (nameOrId) => {
  try {
    const formatted = String(nameOrId).toLowerCase().trim();
    const response = await api.get(`pokemon-species/${formatted}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getPokemonTypes = async () => {
  try {
    const response = await api.get('type');
    return response.data.results.filter(
      (t) => t.name !== 'unknown' && t.name !== 'shadow'
    );
  } catch (error) {
    return [];
  }
};

export const getPokemonsByType = async (typeName) => {
  try {
    const response = await api.get(`type/${typeName}`);
    const pokemonEntries = response.data.pokemon.map((p) => p.pokemon);
    return {
      count: pokemonEntries.length,
      pokemonList: pokemonEntries,
    };
  } catch (error) {
    throw new Error(`Falha ao filtrar por tipo ${typeName}.`);
  }
};

export const TYPE_COLORS = {
  normal: '#9198A1',
  fire: '#FF6B4A',
  water: '#3A8DFF',
  grass: '#34C759',
  electric: '#FFB800',
  ice: '#5AC8FA',
  fighting: '#D94848',
  poison: '#A855F7',
  ground: '#D4A373',
  flying: '#7AA2E3',
  psychic: '#F43F5E',
  bug: '#84CC16',
  rock: '#B08968',
  ghost: '#7C3AED',
  dragon: '#6366F1',
  steel: '#94A3B8',
  fairy: '#F472B6',
  dark: '#475569',
};

export const TYPE_TRANSLATIONS = {
  normal: 'Normal',
  fire: 'Fogo',
  water: 'Água',
  grass: 'Planta',
  electric: 'Elétrico',
  ice: 'Gelo',
  fighting: 'Lutador',
  poison: 'Veneno',
  ground: 'Terrestre',
  flying: 'Voador',
  psychic: 'Psíquico',
  bug: 'Inseto',
  rock: 'Pedra',
  ghost: 'Fantasma',
  dragon: 'Dragão',
  steel: 'Aço',
  fairy: 'Fada',
  dark: 'Sombrio',
};

export const formatPokemonId = (id) => {
  if (!id) return '#000';
  return `#${String(id).padStart(3, '0')}`;
};

export const formatWeight = (hectograms) => {
  if (!hectograms && hectograms !== 0) return '—';
  return `${(hectograms / 10).toFixed(1).replace('.', ',')} kg`;
};

export const formatHeight = (decimetres) => {
  if (!decimetres && decimetres !== 0) return '—';
  return `${(decimetres / 10).toFixed(1).replace('.', ',')} m`;
};

export default api;
