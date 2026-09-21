import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function IllFindYouSection({ onNext }) {
  const [lineIndex, setLineIndex] = useState(0);

  const lines = [
    { text: "If you hide...", highlight: false, delay: 1000 },
    { text: "I'll look.", highlight: true, delay: 2400 },
    { text: "If you disappear behind a hundred little things...", highlight: false, delay: 4200 },
    { text: "I'll still search.", highlight: true, delay: 6000 },
    { text: "If the path gets complicated...", highlight: false, delay: 7800 },
    { text: "I'll take my time.", highlight: true, delay: 9400 },
    { text: "Because if the destination is you...", highlight: false, delay: 11200 },
    { text: "I don't think I'll ever mind the journey.", highlight: "special", delay: 13000 }
  ];

  useEffect(() => {
    const timers = lines.map((item, index) => {
      return setTimeout(() => {
        setLineIndex(index + 1);
        if (item.highlight === "special") {
          soundFx.playLoveChime();
        }
      }, item.delay);
    });

    return () => {
      timers.forEach(t => clearTimeout(t));
    };
  }, []);

  const handleNext = () => {
    soundFx.playChime();
    onNext();
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '30px 20px',
      position: 'relative',
      zIndex: 10
    }}>
      <div 
        className="stationery-card animate-fade-in"
        style={{
          maxWidth: '640px',
          width: '100%',
          padding: '56px 40px',
          textAlign: 'center',
          background: 'linear-gradient(175deg, rgba(255, 253, 249, 0.98) 0%, rgba(248, 237, 240, 0.92) 100%)',
          boxShadow: '0 25px 65px -15px rgba(120, 60, 75, 0.12)',
          border: '1.5px solid var(--border-delicate)'
        }}
      >
        <span className="badge-soft" style={{ marginBottom: '24px' }}>
          For Astha
        </span>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          margin: '24px 0 38px'
        }}>
          {lines.slice(0, lineIndex).map((item, idx) => {
            if (item.highlight === "special") {
              return (
                <div 
                  key={idx}
                  className="animate-fade-in"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.65rem',
                    color: 'var(--rose-deep)',
                    fontWeight: '600',
                    lineHeight: '1.6',
                    marginTop: '16px',
                    padding: '16px 20px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--rose-soft)',
                    boxShadow: '0 6px 20px rgba(184, 110, 126, 0.08)'
                  }}
                >
                  ✨ {item.text}
                </div>
              );
            }

            return (
              <p
                key={idx}
                className="animate-fade-in"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: item.highlight ? '1.55rem' : '1.35rem',
                  lineHeight: '1.6',
                  color: item.highlight ? 'var(--rose-dark)' : 'var(--text-muted)',
                  fontWeight: item.highlight ? '600' : '400',
                  fontStyle: item.highlight ? 'normal' : 'italic'
                }}
              >
                {item.text}
              </p>
            );
          })}
        </div>

        {lineIndex >= lines.length && (
          <div style={{ marginTop: '32px', animation: 'fadeInScale 0.7s ease forwards' }}>
            <button
              className="btn-romantic btn-primary-romantic"
              onClick={handleNext}
              style={{ padding: '14px 36px', fontSize: '1.05rem' }}
            >
              <span>The last hidden clue</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
