import React from 'react';

const STAT_CONFIG = {
  hp: { label: 'HP', color: '#FF3B30' },
  attack: { label: 'Ataque', color: '#FF9500' },
  defense: { label: 'Defesa', color: '#34C759' },
  'special-attack': { label: 'Atq. Especial', color: '#007AFF' },
  'special-defense': { label: 'Def. Especial', color: '#5856D6' },
  speed: { label: 'Velocidade', color: '#AF52DE' },
};

export const StatBar = ({ statName, value, max = 255 }) => {
  const config = STAT_CONFIG[statName] || { label: statName, color: '#007AFF' };
  const percentage = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className="apple-stat-row">
      <div className="apple-stat-info">
        <span className="apple-stat-label">{config.label}</span>
        <span className="apple-stat-value">{value}</span>
      </div>
      <div className="apple-stat-track">
        <div
          className="apple-stat-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: config.color,
          }}
        />
      </div>
    </div>
  );
};

export default StatBar;
