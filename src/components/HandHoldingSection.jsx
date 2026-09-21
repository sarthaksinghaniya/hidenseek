import React, { useState } from 'react';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';

export default function HandHoldingSection({ onNext }) {
  const [stage, setStage] = useState(0);

  const handleNextStep = () => {
    soundFx.playChime();
    if (stage === 2) {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.5 },
        colors: ['#E8B4B8', '#F4D7DC', '#EED9C4']
      });
    }
    setStage(prev => prev + 1);
  };

  const handleComplete = () => {
    soundFx.playLoveChime();
    onNext();
  };

  // Hand distance computation
  // stage 0: far apart (-40px, +40px)
  // stage 1: closer (-20px, +20px)
  // stage 2: gently touching (-5px, +5px)
  // stage 3: joined with warm glow (0px, 0px)

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
          maxWidth: '620px',
          width: '100%',
          padding: '54px 36px',
          textAlign: 'center',
          background: 'linear-gradient(180deg, rgba(255, 253, 249, 0.96) 0%, rgba(250, 242, 244, 0.9) 100%)',
          boxShadow: '0 25px 60px -15px rgba(130, 80, 95, 0.12)',
          border: '1px solid var(--border-delicate)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Soft background radial warmth */}
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '280px',
          height: '280px',
          background: 'radial-gradient(circle, rgba(244, 215, 220, 0.5) 0%, rgba(238, 217, 196, 0.2) 60%, transparent 80%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        {/* Illustrated Minimalist Hands Graphic */}
        <div style={{
          position: 'relative',
          height: '140px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '32px',
          zIndex: 1
        }}>
          {/* Left Hand SVG */}
          <div style={{
            transform: `translateX(${stage === 0 ? '-35px' : stage === 1 ? '-18px' : stage === 2 ? '-4px' : '0px'}) rotate(${stage >= 2 ? '5deg' : '0deg'})`,
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
            filter: 'drop-shadow(0 4px 12px rgba(184, 110, 126, 0.15))'
          }}>
            <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 65C25 65 35 60 45 52C52 46 62 45 70 42C74 40.5 78 42 79 46C80 50 76 53 71 55L50 64C45 66 40 75 25 75H10" stroke="#C88E9B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="rgba(247, 229, 233, 0.45)"/>
              <path d="M48 50C54 44 65 42 74 39C78 37.5 82 39 83 43C84 47 80 50 75 52L52 61" stroke="#C88E9B" strokeWidth="2.2" strokeLinecap="round"/>
              <path d="M46 56L68 60C72 61 74 64 73 67C72 70 68 71 64 70L45 66" stroke="#C88E9B" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Gentle Sparkle or Heart when touching */}
          {stage >= 2 && (
            <div 
              className="animate-fade-in"
              style={{
                position: 'absolute',
                zIndex: 2,
                color: 'var(--rose-deep)',
                animation: 'pulseGlow 2s infinite ease-in-out'
              }}
            >
              <Heart size={20} fill="#E8B4B8" color="#C88E9B" />
            </div>
          )}

          {/* Right Hand SVG */}
          <div style={{
            transform: `translateX(${stage === 0 ? '35px' : stage === 1 ? '18px' : stage === 2 ? '4px' : '0px'}) rotate(${stage >= 2 ? '-5deg' : '0deg'}) scaleX(-1)`,
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
            filter: 'drop-shadow(0 4px 12px rgba(184, 110, 126, 0.15))'
          }}>
            <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 65C25 65 35 60 45 52C52 46 62 45 70 42C74 40.5 78 42 79 46C80 50 76 53 71 55L50 64C45 66 40 75 25 75H10" stroke="#B88E65" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="rgba(238, 217, 196, 0.45)"/>
              <path d="M48 50C54 44 65 42 74 39C78 37.5 82 39 83 43C84 47 80 50 75 52L52 61" stroke="#B88E65" strokeWidth="2.2" strokeLinecap="round"/>
              <path d="M46 56L68 60C72 61 74 64 73 67C72 70 68 71 64 70L45 66" stroke="#B88E65" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Poetic Text Progression */}
        <div style={{
          minHeight: '160px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          gap: '14px'
        }}>
          {stage === 0 && (
            <div className="animate-fade-in">
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.45rem',
                lineHeight: '1.7',
                color: 'var(--text-main)',
                fontStyle: 'italic'
              }}>
                Maybe what I'm really looking for...<br />
                isn't hidden in these little corners.
              </p>
            </div>
          )}

          {stage === 1 && (
            <div className="animate-fade-in">
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.45rem',
                lineHeight: '1.7',
                color: 'var(--rose-dark)',
                fontStyle: 'italic'
              }}>
                Maybe I'm just looking for a reason<br />
                <strong style={{ color: 'var(--rose-deep)', fontStyle: 'normal' }}>
                  to find your hand...
                </strong>
              </p>
            </div>
          )}

          {stage === 2 && (
            <div className="animate-fade-in">
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.45rem',
                lineHeight: '1.7',
                color: 'var(--rose-deep)',
                fontStyle: 'italic'
              }}>
                ...hold it for a little longer...
              </p>
            </div>
          )}

          {stage >= 3 && (
            <div className="animate-fade-in">
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.5rem',
                lineHeight: '1.75',
                color: 'var(--rose-dark)'
              }}>
                and maybe, someday,<br />
                find a tiny little spot<br />
                <span style={{ color: 'var(--rose-deep)', fontWeight: '600', fontStyle: 'italic' }}>
                  in your heart.
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Step Buttons */}
        <div style={{ marginTop: '36px', zIndex: 1, position: 'relative' }}>
          {stage < 3 ? (
            <button
              className="btn-romantic"
              onClick={handleNextStep}
              style={{ padding: '12px 30px', fontSize: '0.98rem' }}
            >
              <span>{stage === 0 ? 'Reach closer...' : stage === 1 ? 'A little more...' : 'Hold softly...'}</span>
              <Sparkles size={16} />
            </button>
          ) : (
            <button
              className="btn-romantic btn-primary-romantic"
              onClick={handleComplete}
              style={{ padding: '14px 36px', fontSize: '1.02rem' }}
            >
              <span>There's one more quiet truth</span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
