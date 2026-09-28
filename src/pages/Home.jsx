import React, { useState, useEffect, useCallback, useMemo } from 'react';
import SearchBar from '../components/ui/SearchBar';
import FilterBar from '../components/FilterBar';
import PokemonCard from '../components/PokemonCard';
import Pagination from '../components/Pagination';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import { getPokemonList, getPokemonDetail, getPokemonTypes, getPokemonsByType } from '../services/api';
import { useDebounce } from '../hooks/useDebounce';

const PER_PAGE = 24;

export const Home = ({ isFavorite, onToggleFavorite }) => {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setType] = useState('');
  const [sortBy, setSort] = useState('id_asc');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query.trim(), 380);

  useEffect(() => {
    let alive = true;
    getPokemonTypes().then((list) => { if (alive) setTypes(list); });
    return () => { alive = false; };
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (debouncedQuery) {
        try {
          const detail = await getPokemonDetail(debouncedQuery.toLowerCase());
          setPokemons([detail]);
          setTotal(1);
        } catch {
          setPokemons([]);
          setTotal(0);
        }
        return;
      }

      if (selectedType) {
        const typeData = await getPokemonsByType(selectedType);
        setTotal(typeData.count);
        const offset = (page - 1) * PER_PAGE;
        const paged = typeData.pokemonList.slice(offset, offset + PER_PAGE);
        const details = await Promise.all(paged.map((p) => getPokemonDetail(p.name)));
        setPokemons(details);
        return;
      }

      const offset = (page - 1) * PER_PAGE;
      const data = await getPokemonList(offset, PER_PAGE);
      setPokemons(data.results);
      setTotal(data.count);
    } catch (err) {
      setError(err.message || 'Falha ao buscar dados da PokéAPI.');
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, selectedType, page]);

  useEffect(() => { load(); }, [load]);

  const handleQuery = (v) => { setQuery(v); setPage(1); };
  const handleType = (t) => { setType(t); setPage(1); };
  const handleReset = () => { setType(''); setSort('id_asc'); setQuery(''); setPage(1); };

  const sorted = useMemo(() => {
    const list = [...pokemons];
    if (sortBy === 'id_desc') return list.sort((a, b) => b.id - a.id);
    if (sortBy === 'name_asc') return list.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === 'name_desc') return list.sort((a, b) => b.name.localeCompare(a.name));
    return list.sort((a, b) => a.id - b.id);
  }, [pokemons, sortBy]);

  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <div>
      <section className="hero">
        <p className="hero-eyebrow">Trabalho Final · Frameworks Web I</p>
        <h1 className="hero-title">
          Explore o Universo<br /><em>Pokémon</em>
        </h1>
        <p className="hero-sub">Estatísticas, tipos, habilidades e coleções pessoais — tudo em um só lugar.</p>
        <div className="hero-search">
          <SearchBar value={query} onChange={handleQuery} onClear={() => handleQuery('')} />
        </div>
      </section>

      <FilterBar
        types={types}
        selectedType={selectedType}
        onSelectType={handleType}
        sortBy={sortBy}
        onSortChange={setSort}
        totalResults={total}
      />

      {loading ? (
        <LoadingSkeleton count={PER_PAGE} />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : sorted.length === 0 ? (
        <div className="apple-state-box">
          <div className="apple-state-icon" style={{ fontSize: '28px' }}>🔍</div>
          <h3 className="apple-state-title">Nenhum resultado</h3>
          <p className="apple-state-desc">Tente outro nome, número ou limpe os filtros aplicados.</p>
          <button type="button" onClick={handleReset} className="apple-btn-secondary">Limpar filtros</button>
        </div>
      ) : (
        <>
          <div className="pokemon-grid">
            {sorted.map((p) => (
              <PokemonCard
                key={p.id}
                pokemon={p}
                isFavorite={isFavorite(p.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>

          {!debouncedQuery && totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
