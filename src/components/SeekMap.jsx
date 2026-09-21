import React, { useState } from 'react';
import { MapPin, Compass, Sparkles, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';

export default function SeekMap({ onClueFound, discoveredClues, onProceedToSuspicion }) {
  const [activePlace, setActivePlace] = useState(null);
  const [visitedPlaces, setVisitedPlaces] = useState([1]); // First location unlocked

  const places = [
    {
      id: 1,
      title: "The Quiet Corner",
      subtitle: "Where time slows down",
      icon: "🌿",
      quote: "Maybe you're supposed to look here.\nOr maybe I just wanted you to stay a little longer.",
      actionText: "Listen to the quiet..."
    },
    {
      id: 2,
      title: "Somewhere Warm",
      subtitle: "A cozy spot just for you",
      icon: "☕",
      quote: "You know...\nI could really get used to having you around.",
      actionText: "Feel the warmth..."
    },
    {
      id: 3,
      title: "A Little Garden",
      subtitle: "Where delicate thoughts bloom",
      icon: "🌸",
      quote: "If I had to choose one place to hide forever,\nI'd probably choose somewhere close to you.",
      actionText: "Watch the petals dance..."
    },
    {
      id: 4,
      title: "The Place I Almost Hid It",
      subtitle: "A hesitant little whisper",
      icon: "💭",
      quote: "I hesitated putting anything here...\nbecause what I want to tell you feels a little too precious to hide.",
      actionText: "Look into the secret..."
    },
    {
      id: 5,
      title: "One Last Map Clue",
      subtitle: "The turning point",
      icon: "🗝️",
      isClue: true,
      clueId: 4,
      quote: "Maybe the real game\nwas never about finding something...\nmaybe it was about finding someone.",
      actionText: "Unlock this clue ✨"
    }
  ];

  const handleSelectPlace = (place) => {
    soundFx.playChime();
    setActivePlace(place);
    if (!visitedPlaces.includes(place.id)) {
      setVisitedPlaces(prev => [...prev, place.id]);
    }
    if (place.isClue && !discoveredClues.includes(place.clueId)) {
      onClueFound(place.clueId);
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E8B4B8', '#F4D7DC', '#EED9C4', '#D9E4DD']
      });
    }
  };

  const isMapComplete = visitedPlaces.length >= 4 && discoveredClues.includes(4);

  return (
    <div style={{
      maxWidth: '860px',
      margin: '0 auto',
      padding: '80px 20px 60px',
      position: 'relative',
      zIndex: 10
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }} className="animate-fade-in">
        <span className="badge-soft" style={{ marginBottom: '12px' }}>
          Round 2: The Illustrated Map
        </span>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '2.2rem',
          color: 'var(--rose-dark)',
          fontWeight: '500',
          marginBottom: '8px'
        }}>
          Little places I thought of you...
        </h2>
        <p style={{
          fontFamily: 'var(--font-sans)',
          color: 'var(--text-muted)',
          fontSize: '0.98rem'
        }}>
          Explore each spot on the map. Each one holds a small whisper.
        </p>
      </div>

      {/* Map Interactive Nodes Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        {places.map((place, idx) => {
          const isVisited = visitedPlaces.includes(place.id);
          const isSelected = activePlace?.id === place.id;
          return (
            <div
              key={place.id}
              onClick={() => handleSelectPlace(place)}
              className="stationery-card"
              style={{
                padding: '28px 22px',
                cursor: 'pointer',
                textAlign: 'left',
                border: isSelected 
                  ? '1.5px solid var(--rose-dusty)' 
                  : isVisited 
                  ? '1px solid var(--border-delicate)' 
                  : '1px dashed var(--border-light)',
                background: isSelected 
                  ? 'linear-gradient(145deg, #FFFDF9 0%, #FBF1F3 100%)'
                  : 'rgba(255, 253, 249, 0.9)',
                transform: isSelected ? 'scale(1.02)' : 'none',
                position: 'relative'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}>
                <span style={{
                  fontSize: '1.8rem',
                  filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.06))'
                }}>
                  {place.icon}
                </span>

                {isVisited ? (
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.75rem',
                    color: 'var(--rose-deep)',
                    fontWeight: '600'
                  }}>
                    <CheckCircle2 size={15} /> Visited
                  </span>
                ) : (
                  <span style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-light)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(200, 142, 155, 0.08)'
                  }}>
                    Unvisited
                  </span>
                )}
              </div>

              <h4 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.3rem',
                color: 'var(--rose-dark)',
                fontWeight: '600',
                marginBottom: '4px'
              }}>
                {place.title}
              </h4>

              <p style={{
                fontSize: '0.84rem',
                color: 'var(--text-muted)',
                marginBottom: '14px'
              }}>
                {place.subtitle}
              </p>

              <div style={{
                fontSize: '0.8rem',
                color: 'var(--rose-deep)',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span>{place.actionText}</span>
                <ArrowRight size={14} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Place Quote Overlay / Card */}
      {activePlace && (
        <div 
          className="stationery-card animate-fade-in"
          style={{
            padding: '36px 30px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #FFFDF9 0%, #FAF0EE 100%)',
            border: '1.5px solid var(--rose-blush)',
            boxShadow: '0 16px 40px rgba(110, 51, 64, 0.1)',
            marginBottom: '36px'
          }}
        >
          <div style={{
            fontSize: '2rem',
            marginBottom: '12px'
          }}>
            {activePlace.icon}
          </div>

          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.55rem',
            color: 'var(--rose-dark)',
            marginBottom: '14px'
          }}>
            {activePlace.title}
          </h3>

          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.35rem',
            lineHeight: '1.85',
            color: 'var(--text-main)',
            fontStyle: 'italic',
            whiteSpace: 'pre-line',
            maxWidth: '540px',
            margin: '0 auto 16px'
          }}>
            "{activePlace.quote}"
          </div>

          {activePlace.isClue && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--rose-deep)',
              fontWeight: '600',
              fontSize: '0.9rem',
              marginTop: '8px'
            }}>
              <Sparkles size={16} />
              <span>4th Clue Gathered</span>
            </div>
          )}
        </div>
      )}

      {/* Proceed Button */}
      {isMapComplete && (
        <div style={{ textAlign: 'center', animation: 'fadeInScale 0.7s ease forwards' }}>
          <button
            className="btn-romantic btn-primary-romantic"
            onClick={() => {
              soundFx.playChime();
              onProceedToSuspicion();
            }}
            style={{ padding: '15px 38px', fontSize: '1.05rem' }}
          >
            <span>Continue the path</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
