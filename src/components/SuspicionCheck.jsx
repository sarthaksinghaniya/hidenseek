import React, { useState } from 'react';
import { Smile, Sparkles, ArrowRight, Eye } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function SuspicionCheck({ onNext }) {
  const [response, setResponse] = useState(null);

  const handleChoice = (choice) => {
    soundFx.playPop();
    setResponse(choice);
  };

  const handleContinue = () => {
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
      padding: '24px',
      position: 'relative',
      zIndex: 10
    }}>
      <div 
        className="stationery-card animate-fade-in"
        style={{
          maxWidth: '540px',
          width: '100%',
          padding: '50px 36px',
          textAlign: 'center',
          background: 'rgba(255, 253, 249, 0.94)',
          position: 'relative'
        }}
      >
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(244, 215, 220, 0.55)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          color: 'var(--rose-deep)'
        }}>
          <Eye size={24} />
        </div>

        <span className="badge-soft" style={{ marginBottom: '16px' }}>
          A quick checkpoint
        </span>

        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '2.1rem',
          color: 'var(--rose-dark)',
          fontWeight: '500',
          marginBottom: '26px'
        }}>
          You're getting suspicious, aren't you?
        </h2>

        {!response ? (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center',
            marginTop: '20px'
          }}>
            <button
              className="btn-romantic"
              onClick={() => handleChoice('maybe')}
              style={{ minWidth: '150px', fontSize: '1rem', padding: '13px 26px' }}
            >
              <span>Maybe... 👀</span>
            </button>
            <button
              className="btn-romantic"
              onClick={() => handleChoice('not_really')}
              style={{ minWidth: '150px', fontSize: '1rem', padding: '13px 26px' }}
            >
              <span>Not really 🙈</span>
            </button>
          </div>
        ) : (
          <div className="animate-fade-in" style={{ marginTop: '10px' }}>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.9rem',
              color: 'var(--rose-deep)',
              fontWeight: '600',
              marginBottom: '14px'
            }}>
              {response === 'not_really' ? 'Liar.' : 'I knew it.'}
            </div>

            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.3rem',
              color: 'var(--text-muted)',
              fontStyle: 'italic',
              marginBottom: '32px'
            }}>
              {response === 'not_really' 
                ? "Your curiosity definitely gave you away. 😉"
                : "You always have been sharp."}
              <br />
              <span style={{ color: 'var(--text-main)', fontStyle: 'normal', fontWeight: '500', marginTop: '8px', display: 'inline-block' }}>
                Keep looking.
              </span>
            </p>

            <button
              className="btn-romantic btn-primary-romantic"
              onClick={handleContinue}
              style={{ padding: '13px 34px', fontSize: '1.02rem' }}
            >
              <span>Show me where this is going</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
