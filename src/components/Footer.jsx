import React from 'react';
import { ExternalLink, Heart } from 'lucide-react';

export const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-col">
        <h4>PokéUniverse</h4>
        <p>
          Trabalho Final de <strong>Frameworks Web I</strong>.<br />
          <span>Unilavras — Centro Universitário de Lavras</span>
        </p>
      </div>

      <div className="footer-col">
        <h4>Stack</h4>
        <ul className="footer-tags-list">
          {['React', 'Vite', 'Axios', 'React Router', 'PokéAPI', 'Context API'].map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>

      <div className="footer-col">
        <h4>Referências</h4>
        <div className="footer-link-row">
          <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="footer-ext-link">
            PokéAPI <ExternalLink size={13} />
          </a>
          <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="footer-ext-link">
            React Docs <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>

  </footer>
);

export default Footer;
