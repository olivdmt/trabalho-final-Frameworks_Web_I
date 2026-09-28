import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Heart, Moon, Sun, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Navbar = ({ favoritesCount = 0 }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <div className="brand-pokeball">
            <div className="brand-pokeball-top" />
            <div className="brand-pokeball-mid" />
            <div className="brand-pokeball-center" />
          </div>
          <span className="brand-name">PokéUniverse</span>
        </Link>

        <nav className="navbar-actions">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}
          >
            <Zap size={16} />
            <span>Explorar</span>
          </NavLink>

          <NavLink
            to="/favoritos"
            className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}
          >
            <Heart size={16} />
            <span>Favoritos</span>
            {favoritesCount > 0 && (
              <span className="nav-count">{favoritesCount}</span>
            )}
          </NavLink>

          <button
            type="button"
            onClick={toggleTheme}
            className="icon-btn"
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
