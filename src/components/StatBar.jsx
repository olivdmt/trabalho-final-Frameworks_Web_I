import React from 'react';

export const StatBar = ({ statName, value, max = 255 }) => {
  const CONFIG = {
    hp:               { label: 'HP',            color: '#FF3B30' },
    attack:           { label: 'Ataque',         color: '#FF9500' },
    defense:          { label: 'Defesa',         color: '#34C759' },
    'special-attack': { label: 'Atq. Esp.',      color: '#007AFF' },
    'special-defense':{ label: 'Def. Esp.',      color: '#5856D6' },
    speed:            { label: 'Velocidade',     color: '#AF52DE' },
  };

  const { label, color } = CONFIG[statName] || { label: statName, color: '#007AFF' };
  const pct = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className="apple-stat-row">
      <div className="apple-stat-info">
        <span className="apple-stat-label">{label}</span>
        <span className="apple-stat-value">{value}</span>
      </div>
      <div className="apple-stat-track">
        <div className="apple-stat-fill" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
};

export default StatBar;
