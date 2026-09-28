import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="apple-state-box">
      <div className="apple-state-icon">
        <AlertCircle size={24} />
      </div>
      <h3 className="apple-state-title">Não foi possível carregar os dados</h3>
      <p className="apple-state-desc">
        {message || 'Verifique sua conexão com a internet e tente novamente.'}
      </p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="apple-btn-secondary">
          <RotateCcw size={15} />
          <span>Tentar Novamente</span>
        </button>
      )}
    </div>
  );
};

export default ErrorState;
