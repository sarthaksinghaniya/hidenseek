import React from 'react';
import { Sparkles, X } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function EasterEggModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(51, 43, 40, 0.45)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px'
    }}>
      <div 
        className="stationery-card animate-fade-in"
        style={{
          maxWidth: '460px',
          width: '100%',
          padding: '36px 32px',
          textAlign: 'center',
          background: 'linear-gradient(145deg, #FFFDF9 0%, #FAF2EE 100%)',
          border: '1.5px solid var(--rose-blush)',
          boxShadow: '0 25px 60px -15px rgba(110, 51, 64, 0.25)',
          position: 'relative'
        }}
      >
        <button
          onClick={() => {
            soundFx.playPop();
            onClose();
          }}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-light)',
            cursor: 'pointer',
            padding: '6px'
          }}
        >
          <X size={18} />
        </button>

        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'rgba(244, 215, 220, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          color: 'var(--rose-deep)'
        }}>
          <Sparkles size={24} />
        </div>

        <span className="badge-soft" style={{ marginBottom: '14px' }}>
          Secret Discovery
        </span>

        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.6rem',
          color: 'var(--rose-dark)',
          marginBottom: '16px',
          fontWeight: '500'
        }}>
          Okay fine... I'll admit it.
        </h3>

        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.18rem',
          lineHeight: '1.75',
          color: 'var(--text-main)',
          fontStyle: 'italic',
          margin: '20px 0 24px'
        }}>
          <p>The game was never really about hide & seek.</p>
          <p style={{ marginTop: '12px' }}>
            I just needed an excuse<br />
            to find my way to you.
          </p>
          <p style={{ marginTop: '14px', color: 'var(--rose-deep)', fontWeight: '500' }}>
            Maybe this was the cutest excuse I could come up with.
          </p>
        </div>

        <button
          className="btn-romantic"
          onClick={() => {
            soundFx.playPop();
            onClose();
          }}
          style={{ padding: '10px 24px', fontSize: '0.9rem' }}
        >
          I'll pretend I didn't see this 🙈
        </button>
      </div>
    </div>
  );
}
