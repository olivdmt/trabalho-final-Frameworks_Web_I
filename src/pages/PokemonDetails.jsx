import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, Sparkles, Zap, Info, Shield, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getPokemonDetail, getPokemonSpecies, formatPokemonId, formatWeight, formatHeight, TYPE_COLORS } from '../services/api';
import TypeBadge from '../components/ui/TypeBadge';
import StatBar from '../components/StatBar';
import AudioCry from '../components/AudioCry';
import ErrorState from '../components/ErrorState';
import SegmentedControl from '../components/ui/SegmentedControl';

const TABS = [
  { value: 'stats', label: 'Status', icon: Zap },
  { value: 'about', label: 'Sobre', icon: Info },
  { value: 'abilities', label: 'Habilidades', icon: Shield },
  { value: 'moves', label: 'Movimentos', icon: Layers },
];

export const PokemonDetails = ({ isFavorite, onToggleFavorite }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState('stats');
  const [shiny, setShiny] = useState(false);

  useEffect(() => {
    let alive = true;
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPokemonDetail(id);
        if (!alive) return;
        setPokemon(data);

        const sp = await getPokemonSpecies(data.id);
        if (alive) setSpecies(sp);
      } catch (err) {
        if (alive) setError(err.message || 'Erro ao carregar Pokémon.');
      } finally {
        if (alive) setLoading(false);
      }
    };
    fetch();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => { alive = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="details-loading">
        <div className="loader-ring" />
        <span>Carregando Pokémon...</span>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="details-page">
        <ErrorState message={error} onRetry={() => navigate(0)} />
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link to="/" className="apple-btn-secondary">← Voltar à lista</Link>
        </div>
      </div>
    );
  }

  const primaryType = pokemon.types?.[0]?.type?.name || 'normal';
  const accentColor = TYPE_COLORS[primaryType] || '#007AFF';
  const isFav = isFavorite(pokemon.id);

  const artwork = shiny
    ? pokemon.sprites?.other?.['official-artwork']?.front_shiny || pokemon.sprites?.front_shiny || pokemon.sprites?.front_default
    : pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default;

  const flavorEntry =
    species?.flavor_text_entries?.find((e) => e.language.name === 'pt-br' || e.language.name === 'pt') ||
    species?.flavor_text_entries?.find((e) => e.language.name === 'en');

  const description = flavorEntry
    ? flavorEntry.flavor_text.replace(/[\f\n\r\t]/g, ' ')
    : 'Sem descrição disponível.';

  const genusEntry =
    species?.genera?.find((g) => g.language.name === 'pt-br' || g.language.name === 'pt') ||
    species?.genera?.find((g) => g.language.name === 'en');

  const genus = genusEntry?.genus || 'Pokémon';
  const total = pokemon.stats?.reduce((acc, s) => acc + s.base_stat, 0) || 0;

  const handleFav = () => {
    if (!isFav) {
      confetti({ particleCount: 35, spread: 60, origin: { x: 0.5, y: 0.45 }, colors: [accentColor, '#FF3B30', '#007AFF'] });
    }
    onToggleFavorite(pokemon);
  };

  return (
    <div className="details-page">
      <div className="details-breadcrumb">
        <Link to="/"><ChevronLeft size={14} /> Pokédex</Link>
        <span className="breadcrumb-sep">/</span>
        <span>{pokemon.name}</span>
      </div>

      <div className="details-hero" style={{ '--pokemon-accent': accentColor }}>
        <div className="details-hero-visual">
          <div className="details-hero-visual-bg" />
          <img src={artwork} alt={pokemon.name} className="details-hero-art" />
        </div>

        <div className="details-hero-info">
          <span className="details-id">{formatPokemonId(pokemon.id)}</span>
          <h1 className="details-name">{pokemon.name}</h1>
          <p className="details-genus">{genus}</p>

          <div className="details-types">
            {pokemon.types?.map((t) => (
              <TypeBadge key={t.type.name} type={t.type.name} size="md" />
            ))}
          </div>

          <div className="details-meta-grid">
            <div className="meta-card">
              <div className="meta-label">Altura</div>
              <div className="meta-value">{formatHeight(pokemon.height)}</div>
            </div>
            <div className="meta-card">
              <div className="meta-label">Peso</div>
              <div className="meta-value">{formatWeight(pokemon.weight)}</div>
            </div>
            <div className="meta-card">
              <div className="meta-label">Exp. Base</div>
              <div className="meta-value">{pokemon.base_experience ?? '—'}</div>
            </div>
            <div className="meta-card">
              <div className="meta-label">Captura</div>
              <div className="meta-value">{species?.capture_rate ?? '—'}</div>
            </div>
          </div>

          <div className="details-actions">
            <button type="button" onClick={handleFav} className={`details-fav-btn ${isFav ? 'is-fav' : ''}`}>
              <Heart size={16} fill={isFav ? 'currentColor' : 'none'} />
              {isFav ? 'Favoritado' : 'Favoritar'}
            </button>

            <button type="button" onClick={() => setShiny((s) => !s)} className={`shiny-toggle ${shiny ? 'active' : ''}`}>
              <Sparkles size={15} />
              Shiny
            </button>

            <AudioCry cries={pokemon.cries} pokemonName={pokemon.name} />
          </div>
        </div>
      </div>

      <div className="poke-nav">
        {pokemon.id > 1 ? (
          <Link to={`/pokemon/${pokemon.id - 1}`} className="poke-nav-link">
            <ChevronLeft size={16} /> #{String(pokemon.id - 1).padStart(3, '0')}
          </Link>
        ) : <span />}
        <Link to={`/pokemon/${pokemon.id + 1}`} className="poke-nav-link">
          #{String(pokemon.id + 1).padStart(3, '0')} <ChevronRight size={16} />
        </Link>
      </div>

      <div className="details-panel">
        <div className="details-panel-header">
          <div className="tab-list" role="tablist">
            {TABS.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={tab === value}
                onClick={() => setTab(value)}
                className={`tab-trigger ${tab === value ? 'active' : ''}`}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="tab-pane">
          {tab === 'stats' && (
            <>
              <div className="stats-list">
                {pokemon.stats?.map((s) => (
                  <StatBar key={s.stat.name} statName={s.stat.name} value={s.base_stat} />
                ))}
              </div>
              <div className="stats-total">
                <span className="stats-total-label">Total</span>
                <span className="stats-total-val">{total}</span>
              </div>
            </>
          )}

          {tab === 'about' && (
            <>
              <p className="about-description">"{description}"</p>
              <div className="about-grid">
                {[
                  { label: 'Habitat', value: species?.habitat?.name?.toUpperCase() || '—' },
                  { label: 'Felicidade Base', value: species?.base_happiness !== undefined ? `${species.base_happiness}/255` : '—' },
                  { label: 'Grupo de Ovos', value: species?.egg_groups?.map((g) => g.name).join(', ') || '—' },
                  { label: 'Geração', value: species?.generation?.name?.toUpperCase().replace('-', ' ') || '—' },
                ].map(({ label, value }) => (
                  <div key={label} className="meta-card">
                    <div className="meta-label">{label}</div>
                    <div className="meta-value" style={{ fontSize: '14px', textTransform: 'capitalize' }}>{value}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === 'abilities' && (
            <div className="abilities-grid">
              {pokemon.abilities?.map((a, i) => (
                <div key={i} className="ability-row">
                  <span className="ability-name">{a.ability.name.replace('-', ' ')}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {a.is_hidden && (
                      <span className="badge badge-accent badge-sm">Oculta</span>
                    )}
                    <span className="ability-slot">Slot {a.slot}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'moves' && (
            <>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                {pokemon.moves?.length} movimentos aprendidos por <strong>{pokemon.name}</strong>.
              </p>
              <div className="moves-wrap">
                {pokemon.moves?.slice(0, 60).map((m, i) => (
                  <span key={i} className="move-tag">{m.move.name.replace(/-/g, ' ')}</span>
                ))}
                {pokemon.moves?.length > 60 && (
                  <span className="moves-more">+{pokemon.moves.length - 60} outros</span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
