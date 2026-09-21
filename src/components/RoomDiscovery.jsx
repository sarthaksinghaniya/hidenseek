import React, { useState } from 'react';
import { 
  Flower2, 
  BookOpen, 
  Mail, 
  Bookmark, 
  Coffee, 
  Sparkles, 
  Gift, 
  Moon, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';

export default function RoomDiscovery({ onClueFound, discoveredClues, onProceedToMap }) {
  const [activeToast, setActiveToast] = useState(null);
  const [activePoem, setActivePoem] = useState(null);
  const [toastTimer, setToastTimer] = useState(null);

  const showToast = (message) => {
    if (toastTimer) clearTimeout(toastTimer);
    setActiveToast(message);
    const timer = setTimeout(() => {
      setActiveToast(null);
    }, 2800);
    setToastTimer(timer);
  };

  const decoyResponses = [
    "Nope. Not here.",
    "Nice try.",
    "A little closer...",
    "You really thought I'd hide it there? 😉",
    "Hmm... you're getting warmer.",
    "Don't give up on me yet.",
    "Just an innocent little item sitting here.",
    "Keep that pretty gaze looking around..."
  ];

  const handleDecoyClick = (name) => {
    soundFx.playDecoy();
    const randomMsg = decoyResponses[Math.floor(Math.random() * decoyResponses.length)];
    showToast(`${name}: ${randomMsg}`);
  };

  const triggerDiscoveryEffect = () => {
    soundFx.playLoveChime();
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#E8B4B8', '#F4D7DC', '#EED9C4', '#D9E4DD']
    });
  };

  const objects = [
    {
      id: 'flower',
      isClue: true,
      clueId: 1,
      title: 'Dried Jasmine Flower',
      icon: <Flower2 size={28} />,
      color: '#E8B4B8',
      desc: 'Tucked gently between soft pages',
      poem: `I may hide a little here,\na little there,\nbut somehow every road\nkeeps leading me to you.`
    },
    {
      id: 'coffee',
      isClue: false,
      title: 'Warm Cinnamon Latte',
      icon: <Coffee size={26} />,
      color: '#B88E65',
      desc: 'Still steaming softly'
    },
    {
      id: 'ribbon',
      isClue: true,
      clueId: 2,
      title: 'Blush Silk Ribbon',
      icon: <Bookmark size={26} />,
      color: '#C88E9B',
      desc: 'Knotted carefully around a memory',
      poem: `If finding you takes a hundred tries,\nI'll gladly get lost a hundred times.`
    },
    {
      id: 'book',
      isClue: false,
      title: 'Vintage Poetry Volume',
      icon: <BookOpen size={26} />,
      color: '#6E8F7F',
      desc: 'Dog-eared on page 24'
    },
    {
      id: 'moon',
      isClue: true,
      clueId: 3,
      title: 'Little Crescent Moon',
      icon: <Moon size={26} />,
      color: '#D4A373',
      desc: 'Glowing faintly in the quiet corner',
      poem: `Some things are worth searching for,\neven when you already know\nyour heart wants to find them.`
    },
    {
      id: 'gift',
      isClue: false,
      title: 'Tied Miniature Box',
      icon: <Gift size={26} />,
      color: '#9D5364',
      desc: 'Light as air'
    },
    {
      id: 'note',
      isClue: false,
      title: 'Folded Paper Note',
      icon: <FileText size={26} />,
      color: '#A08F87',
      desc: 'Written in pencil'
    }
  ];

  const handleObjectClick = (obj) => {
    if (obj.isClue) {
      if (!discoveredClues.includes(obj.clueId)) {
        onClueFound(obj.clueId);
      }
      triggerDiscoveryEffect();
      setActivePoem({ title: obj.title, poem: obj.poem });
    } else {
      handleDecoyClick(obj.title);
    }
  };

  const roomCluesFound = [1, 2, 3].every(id => discoveredClues.includes(id));

  return (
    <div style={{
      maxWidth: '860px',
      margin: '0 auto',
      padding: '80px 20px 60px',
      position: 'relative',
      zIndex: 10
    }}>
      {/* Intro Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }} className="animate-fade-in">
        <span className="badge-soft" style={{ marginBottom: '12px' }}>
          Round 1: The Stationery Desk
        </span>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '2.2rem',
          color: 'var(--rose-dark)',
          fontWeight: '500',
          marginBottom: '8px'
        }}>
          Look closely at what's lying here...
        </h2>
        <p style={{
          fontFamily: 'var(--font-sans)',
          color: 'var(--text-muted)',
          fontSize: '0.98rem'
        }}>
          Tap any object that catches your eye. Some are little clues, some are just playful decoys.
        </p>
      </div>

      {/* Grid of Interactive Objects */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '18px',
        marginBottom: '40px'
      }}>
        {objects.map((obj) => {
          const isFound = obj.isClue && discoveredClues.includes(obj.clueId);
          return (
            <div
              key={obj.id}
              onClick={() => handleObjectClick(obj)}
              className="stationery-card"
              style={{
                padding: '24px 20px',
                cursor: 'pointer',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                border: isFound ? '1.5px solid var(--rose-blush)' : '1px solid var(--border-delicate)',
                background: isFound 
                  ? 'linear-gradient(135deg, rgba(255, 253, 249, 0.95) 0%, rgba(244, 215, 220, 0.4) 100%)'
                  : 'rgba(255, 253, 249, 0.85)',
                transform: isFound ? 'scale(1.02)' : 'none',
                position: 'relative'
              }}
            >
              {isFound && (
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  color: 'var(--rose-deep)'
                }}>
                  <CheckCircle2 size={18} />
                </div>
              )}

              <div 
                className="animate-sway"
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: `rgba(${obj.isClue ? '244, 215, 220, 0.6' : '238, 217, 196, 0.45'})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: obj.color,
                  boxShadow: '0 6px 16px rgba(110, 51, 64, 0.06)'
                }}
              >
                {obj.icon}
              </div>

              <h4 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                color: 'var(--text-main)',
                fontWeight: '600'
              }}>
                {obj.title}
              </h4>

              <p style={{
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                lineHeight: '1.4'
              }}>
                {obj.desc}
              </p>

              <span style={{
                fontSize: '0.78rem',
                color: isFound ? 'var(--rose-deep)' : 'var(--text-light)',
                fontWeight: isFound ? '600' : '400',
                marginTop: '4px'
              }}>
                {isFound ? '✨ Clue Discovered (Tap to read)' : 'Tap to inspect →'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Effort Theme Card (Revealed as progress is made) */}
      {discoveredClues.length >= 2 && (
        <div 
          className="stationery-card animate-fade-in"
          style={{
            padding: '36px 30px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(255, 253, 249, 0.96) 0%, rgba(251, 229, 216, 0.35) 100%)',
            border: '1px solid var(--border-light)',
            marginBottom: '36px'
          }}
        >
          <span className="badge-soft" style={{ marginBottom: '14px' }}>
            A quiet thought
          </span>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.35rem',
            lineHeight: '1.8',
            color: 'var(--text-main)',
            maxWidth: '580px',
            margin: '0 auto',
            fontStyle: 'italic'
          }}>
            "I don't mind searching.<br />
            I'll look behind every little clue, take every wrong turn, start over when I have to...<br />
            <strong style={{ color: 'var(--rose-deep)', fontStyle: 'normal' }}>
              because some people are worth putting in all the effort for.
            </strong>"
          </p>
        </div>
      )}

      {/* Button to proceed to Map once room clues are uncovered */}
      {roomCluesFound && (
        <div style={{ textAlign: 'center', animation: 'fadeInScale 0.7s ease forwards' }}>
          <button
            className="btn-romantic btn-primary-romantic"
            onClick={() => {
              soundFx.playChime();
              onProceedToMap();
            }}
            style={{ padding: '15px 38px', fontSize: '1.05rem' }}
          >
            <span>Let's explore the map next</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* Decoy Toast */}
      {activeToast && (
        <div className="decoy-toast">
          <HelpCircle size={18} color="var(--rose-deep)" />
          <span>{activeToast}</span>
        </div>
      )}

      {/* Clue Poem Modal */}
      {activePoem && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(51, 43, 40, 0.4)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1500,
          padding: '20px'
        }}>
          <div 
            className="stationery-card animate-fade-in"
            style={{
              maxWidth: '480px',
              width: '100%',
              padding: '40px 32px',
              textAlign: 'center',
              background: '#FFFDF9',
              border: '1.5px solid var(--rose-blush)'
            }}
          >
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'rgba(244, 215, 220, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: 'var(--rose-deep)'
            }}>
              <Sparkles size={22} />
            </div>

            <span className="badge-soft" style={{ marginBottom: '14px' }}>
              Poetic Clue Found
            </span>

            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.5rem',
              color: 'var(--rose-dark)',
              marginBottom: '18px'
            }}>
              {activePoem.title}
            </h3>

            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.3rem',
              lineHeight: '1.8',
              color: 'var(--text-main)',
              fontStyle: 'italic',
              whiteSpace: 'pre-line',
              padding: '16px 20px',
              background: 'rgba(250, 247, 242, 0.8)',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--border-delicate)',
              marginBottom: '26px'
            }}>
              {activePoem.poem}
            </div>

            <button
              className="btn-romantic"
              onClick={() => {
                soundFx.playPop();
                setActivePoem(null);
              }}
              style={{ padding: '10px 28px' }}
            >
              Keep searching ✨
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
