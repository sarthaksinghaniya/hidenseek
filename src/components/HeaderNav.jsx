import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function HeaderNav({ clueCount, maxClues = 5, onTriggerEasterEgg }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggleMusic = () => {
    soundFx.playPop();
    const playing = soundFx.toggleAmbientMusic((active) => {
      setIsPlaying(active);
    });
    setIsPlaying(playing);
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      padding: '14px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 100,
      background: 'rgba(250, 247, 242, 0.75)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(200, 142, 155, 0.12)'
    }}>
      {/* Brand / Title & Secret Easter Egg trigger */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span 
          style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '1.05rem', 
            fontWeight: '600', 
            letterSpacing: '0.04em',
            color: 'var(--rose-deep)'
          }}
        >
          Astha's Hide & Seek
        </span>
        <button
          onClick={() => {
            soundFx.playLoveChime();
            onTriggerEasterEgg();
          }}
          title="A tiny hidden secret..."
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '2px 4px',
            color: 'var(--rose-blush)',
            opacity: 0.55,
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'rotate(20deg) scale(1.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.55';
            e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
          }}
        >
          <Sparkles size={14} />
        </button>
      </div>

      {/* Center Clue Progress Pill */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '5px 14px',
        borderRadius: 'var(--radius-full)',
        background: 'rgba(255, 253, 249, 0.9)',
        border: '1px solid var(--border-delicate)',
        boxShadow: '0 2px 10px rgba(110, 51, 64, 0.04)',
        fontSize: '0.8rem',
        fontWeight: '500',
        color: 'var(--text-muted)'
      }}>
        <Heart size={12} color="var(--rose-dusty)" fill={clueCount > 0 ? "var(--rose-soft)" : "none"} />
        <span>Found:</span>
        <strong style={{ color: 'var(--rose-deep)' }}>{clueCount}</strong>
        <span style={{ opacity: 0.6 }}>/ {maxClues}</span>
      </div>

      {/* Music Toggle */}
      <button
        onClick={handleToggleMusic}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          padding: '7px 14px',
          borderRadius: 'var(--radius-full)',
          background: isPlaying ? 'rgba(232, 180, 184, 0.25)' : 'rgba(255, 255, 255, 0.8)',
          border: '1px solid ' + (isPlaying ? 'var(--rose-dusty)' : 'var(--border-delicate)'),
          color: isPlaying ? 'var(--rose-dark)' : 'var(--text-muted)',
          fontSize: '0.82rem',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          outline: 'none'
        }}
      >
        {isPlaying ? <Volume2 size={14} color="var(--rose-deep)" /> : <VolumeX size={14} />}
        <span style={{ display: window.innerWidth < 450 ? 'none' : 'inline' }}>
          {isPlaying ? '♫ soft melody' : '♪ play something?'}
        </span>
      </button>
    </header>
  );
}
