import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { useFavorites } from './hooks/useFavorites';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PokemonDetails from './pages/PokemonDetails';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  const { favorites, toggleFavorite, isFavorite, favoritesCount } = useFavorites();

  return (
    <ThemeProvider>
      <Router>
        <div className="app-wrapper">
          <Navbar favoritesCount={favoritesCount} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />} />
              <Route path="/pokemon/:id" element={<PokemonDetails isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />} />
              <Route path="/favoritos" element={<Favorites favorites={favorites} isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
