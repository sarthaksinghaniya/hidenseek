import React, { useState, useEffect } from 'react';
import { Sparkles, Compass } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function HideSeekIntro({ onReady }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 700);
    const t2 = setTimeout(() => setStep(2), 2200);
    const t3 = setTimeout(() => setStep(3), 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleReady = () => {
    soundFx.playChime();
    onReady();
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
          padding: '50px 38px',
          textAlign: 'center',
          background: 'rgba(255, 253, 249, 0.94)',
          position: 'relative'
        }}
      >
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(244, 215, 220, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          color: 'var(--rose-deep)'
        }}>
          <Compass size={24} />
        </div>

        <span className="badge-soft" style={{ marginBottom: '18px' }}>
          Rule #1: Take your time
        </span>

        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '2rem',
          color: 'var(--rose-dark)',
          fontWeight: '500',
          marginBottom: '20px',
          opacity: step >= 1 ? 1 : 0,
          transform: step >= 1 ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          Welcome to a very tiny game of hide & seek.
        </h2>

        <div style={{
          minHeight: '120px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px'
        }}>
          {step >= 2 && (
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.35rem',
              lineHeight: '1.6',
              color: 'var(--text-main)',
              animation: 'fadeInScale 0.7s ease forwards'
            }}>
              I've hidden a few things around here.
            </p>
          )}

          {step >= 3 && (
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.2rem',
              lineHeight: '1.6',
              color: 'var(--rose-deep)',
              fontStyle: 'italic',
              animation: 'fadeInScale 0.7s ease forwards'
            }}>
              And yes...<br />
              I may have made them unnecessarily difficult to find.
            </p>
          )}
        </div>

        {step >= 3 && (
          <div style={{ marginTop: '34px', animation: 'fadeInScale 0.6s ease forwards' }}>
            <button 
              className="btn-romantic btn-primary-romantic"
              onClick={handleReady}
              style={{ padding: '13px 36px', fontSize: '1.02rem' }}
            >
              <span>I'm ready.</span>
              <Sparkles size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
