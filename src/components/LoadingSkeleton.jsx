import React from 'react';

const CARDS = 20;

export const LoadingSkeleton = ({ count = CARDS }) => (
  <div className="pokemon-grid">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="skeleton-card">
        <div className="skeleton-block sk-image" />
        <div className="skeleton-block sk-title" />
        <div className="skeleton-block sk-sub" />
        <div className="sk-row">
          <div className="skeleton-block sk-chip" />
          <div className="skeleton-block sk-chip" />
        </div>
      </div>
    ))}
  </div>
);

export default LoadingSkeleton;
