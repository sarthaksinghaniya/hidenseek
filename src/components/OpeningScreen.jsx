import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function OpeningScreen({ onStart }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Step 0: "Astha..."
    const t1 = setTimeout(() => setStep(1), 1200);
    // Step 1: "Someone left a little something here for you."
    const t2 = setTimeout(() => setStep(2), 2600);
    // Step 2: "But apparently... you have to find it yourself."
    const t3 = setTimeout(() => setStep(3), 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleStart = () => {
    soundFx.playChime();
    onStart();
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      zIndex: 10
    }}>
      <div 
        className="stationery-card animate-fade-in"
        style={{
          maxWidth: '560px',
          width: '100%',
          padding: '52px 36px',
          textAlign: 'center',
          background: 'rgba(255, 253, 249, 0.92)',
          boxShadow: '0 20px 50px -10px rgba(130, 80, 90, 0.09)'
        }}
      >
        <div style={{
          fontFamily: 'var(--font-serif)',
          color: 'var(--rose-deep)',
          fontSize: '2.4rem',
          fontWeight: '500',
          letterSpacing: '0.02em',
          marginBottom: '28px',
          opacity: step >= 0 ? 1 : 0,
          transform: step >= 0 ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          Astha...
        </div>

        <div style={{
          minHeight: '140px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px'
        }}>
          {step >= 1 && (
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.45rem',
              lineHeight: '1.6',
              color: 'var(--text-main)',
              opacity: 1,
              animation: 'fadeInScale 0.8s ease forwards'
            }}>
              Someone left a little something here for you.
            </p>
          )}

          {step >= 2 && (
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.25rem',
              lineHeight: '1.6',
              color: 'var(--text-muted)',
              fontStyle: 'italic',
              animation: 'fadeInScale 0.8s ease forwards'
            }}>
              But apparently...<br />
              you have to find it yourself.
            </p>
          )}
        </div>

        {step >= 3 && (
          <div style={{ marginTop: '36px', animation: 'fadeInScale 0.7s ease forwards' }}>
            <button 
              className="btn-romantic btn-primary-romantic"
              onClick={handleStart}
              style={{ padding: '14px 34px', fontSize: '1.05rem' }}
            >
              <span>Start looking</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>

      <div style={{
        marginTop: '28px',
        fontSize: '0.85rem',
        color: 'var(--text-light)',
        fontFamily: 'var(--font-sans)',
        letterSpacing: '0.03em',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        opacity: 0.75
      }}>
        <Sparkles size={13} color="var(--rose-dusty)" />
        <span>A quiet sanctuary made just for you</span>
      </div>
    </div>
  );
}
