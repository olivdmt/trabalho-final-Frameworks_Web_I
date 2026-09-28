import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export const NotFound = () => (
  <div className="not-found-page">
    <div className="not-found-code">404</div>
    <h1 className="not-found-title">Página não encontrada</h1>
    <p className="not-found-sub">O endereço que você tentou acessar não existe. Um Pokémon selvagem provavelmente levou essa rota.</p>
    <Link to="/" className="apple-btn-primary">
      <Zap size={16} />
      Voltar para a Pokédex
    </Link>
  </div>
);

export default NotFound;
