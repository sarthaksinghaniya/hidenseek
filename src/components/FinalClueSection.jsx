import React, { useState } from 'react';
import { Mail, MailOpen, Sparkles, ArrowRight, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';

export default function FinalClueSection({ onClueFound, onProceedToLetter }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      soundFx.playLoveChime();
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#E8B4B8', '#F4D7DC', '#EED9C4', '#D9E4DD', '#DF97A5']
      });
      setIsOpen(true);
      onClueFound(5);

      setTimeout(() => setStep(1), 1000);
      setTimeout(() => setStep(2), 2600);
      setTimeout(() => setStep(3), 4400);
    }
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
          maxWidth: '580px',
          width: '100%',
          padding: '52px 36px',
          textAlign: 'center',
          background: 'rgba(255, 253, 249, 0.96)',
          border: '1.5px solid var(--rose-blush)',
          boxShadow: '0 25px 60px -15px rgba(130, 80, 95, 0.14)'
        }}
      >
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: 'var(--radius-full)',
          background: isOpen ? 'rgba(244, 215, 220, 0.6)' : 'rgba(238, 217, 196, 0.5)',
          color: 'var(--rose-deep)',
          fontSize: '0.85rem',
          fontWeight: '600',
          marginBottom: '20px'
        }}>
          <Heart size={14} fill="currentColor" />
          <span>FOUND: {isOpen ? '5 / 5' : '4 / 5'}</span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '2.1rem',
          color: 'var(--rose-dark)',
          fontWeight: '500',
          marginBottom: '24px'
        }}>
          One last thing.
        </h2>

        {!isOpen ? (
          <div style={{ padding: '20px 0' }}>
            <div 
              onClick={handleOpenEnvelope}
              className="animate-float"
              style={{
                width: '120px',
                height: '90px',
                margin: '0 auto 24px',
                background: 'linear-gradient(135deg, #FFF6F7 0%, #F5DDE2 100%)',
                border: '1.5px solid var(--rose-dusty)',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 12px 30px rgba(184, 110, 126, 0.2)',
                position: 'relative'
              }}
            >
              <Mail size={38} color="var(--rose-deep)" />
              <span style={{
                position: 'absolute',
                bottom: '-12px',
                background: 'var(--rose-deep)',
                color: '#fff',
                fontSize: '0.72rem',
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                fontWeight: '600'
              }}>
                Tap to open
              </span>
            </div>

            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.2rem',
              color: 'var(--text-muted)',
              fontStyle: 'italic'
            }}>
              The final envelope is waiting for you...
            </p>
          </div>
        ) : (
          <div className="animate-fade-in" style={{ margin: '16px 0 28px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(244, 215, 220, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              color: 'var(--rose-deep)'
            }}>
              <MailOpen size={28} />
            </div>

            <div style={{
              fontFamily: 'var(--font-serif)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              textAlign: 'center',
              padding: '24px 20px',
              background: 'rgba(250, 247, 242, 0.9)',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--border-delicate)'
            }}>
              <p style={{ fontSize: '1.4rem', color: 'var(--text-main)', fontStyle: 'italic' }}>
                "I think I've searched enough places now."
              </p>

              {step >= 1 && (
                <div className="animate-fade-in" style={{
                  fontSize: '1.25rem',
                  color: 'var(--text-muted)',
                  lineHeight: '1.6'
                }}>
                  Behind flowers.<br />
                  Between little notes.<br />
                  Through every silly clue.
                </div>
              )}

              {step >= 2 && (
                <div className="animate-fade-in" style={{
                  fontSize: '1.5rem',
                  color: 'var(--rose-deep)',
                  fontWeight: '600',
                  marginTop: '10px'
                }}>
                  And somehow...<br />
                  <span style={{ fontStyle: 'italic' }}>I kept finding you.</span>
                </div>
              )}
            </div>

            {step >= 3 && (
              <div style={{ marginTop: '32px', animation: 'fadeInScale 0.7s ease forwards' }}>
                <button
                  className="btn-romantic btn-primary-romantic"
                  onClick={() => {
                    soundFx.playChime();
                    onProceedToLetter();
                  }}
                  style={{ padding: '14px 38px', fontSize: '1.05rem' }}
                >
                  <span>Read the full letter</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
