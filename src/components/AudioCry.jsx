import React, { useState, useRef } from 'react';
import { Volume2 } from 'lucide-react';

export const AudioCry = ({ cries, pokemonName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const audioUrl = cries?.latest || cries?.legacy;
  if (!audioUrl) return null;

  const playCry = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      } else {
        audioRef.current.volume = 0.4;
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  };

  return (
    <div className="audio-cry-wrapper">
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={() => setIsPlaying(false)}
        preload="none"
      />
      <button
        type="button"
        onClick={playCry}
        className={`audio-apple-btn ${isPlaying ? 'playing' : ''}`}
        aria-label={`Reproduzir som de ${pokemonName}`}
      >
        <Volume2 size={16} />
        <span>{isPlaying ? 'Reproduzindo...' : 'Som'}</span>
      </button>
    </div>
  );
};

export default AudioCry;
