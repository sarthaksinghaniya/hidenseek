import React, { useState } from 'react';
import { Heart, Send, MessageCircle, Clock, Sparkles, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';

export default function IndirectRevealLetter() {
  const [selectedResponse, setSelectedResponse] = useState(null);

  const phoneNumber = "6387860126";
  const defaultMessage = encodeURIComponent("Hey... I played your little hide & seek game. Here is what I felt...");

  const handleResponseChoice = (choice) => {
    soundFx.playLoveChime();
    setSelectedResponse(choice);
    confetti({
      particleCount: 45,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#E8B4B8', '#F4D7DC', '#EED9C4', '#DFE8E2']
    });
  };

  const handleOpenMessaging = () => {
    soundFx.playPop();
    // Try SMS first, with fallback to WhatsApp
    const smsUrl = `sms:${phoneNumber}?body=${defaultMessage}`;
    const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${defaultMessage}`;
    
    // Check if mobile user
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = smsUrl;
    } else {
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div style={{
      maxWidth: '740px',
      margin: '0 auto',
      padding: '80px 20px 100px',
      position: 'relative',
      zIndex: 10
    }}>
      {/* 1. The Indirect Reveal Section */}
      <div 
        className="stationery-card animate-fade-in"
        style={{
          padding: '48px 36px',
          textAlign: 'center',
          background: 'rgba(255, 253, 249, 0.96)',
          border: '1px solid var(--border-delicate)',
          marginBottom: '40px'
        }}
      >
        <span className="badge-soft" style={{ marginBottom: '18px' }}>
          The Real Discovery
        </span>

        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.45rem',
          lineHeight: '1.8',
          color: 'var(--text-main)',
          fontStyle: 'italic',
          marginBottom: '28px'
        }}>
          Maybe this whole little game<br />
          was just my way of saying something<br />
          I didn't know how to say normally.
        </p>

        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.35rem',
          lineHeight: '2.1',
          color: 'var(--rose-dark)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          margin: '20px 0 28px'
        }}>
          <div>I want to put in the effort to find you.</div>
          <div>I want to hold your hand.</div>
          <div>I want to make you smile.</div>
          <div>I want to know the little things about you.</div>
          <div style={{ marginTop: '12px', color: 'var(--rose-deep)', fontWeight: '600' }}>
            And if you'll let me...<br />
            I'd really like to find a little place in your heart too.
          </div>
        </div>
      </div>

      {/* 2. Final Handwritten Love Letter */}
      <div 
        className="stationery-card animate-fade-in"
        style={{
          padding: '52px 40px',
          background: 'linear-gradient(170deg, #FFFDF9 0%, #FAF1EC 100%)',
          border: '1.5px solid var(--rose-blush)',
          boxShadow: '0 20px 50px -10px rgba(110, 51, 64, 0.12)',
          marginBottom: '44px',
          position: 'relative'
        }}
      >
        {/* Decorative corner stamp */}
        <div style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          width: '54px',
          height: '62px',
          border: '1.5px dashed var(--rose-dusty)',
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255, 255, 255, 0.6)',
          color: 'var(--rose-deep)',
          fontSize: '0.68rem',
          letterSpacing: '0.05em'
        }}>
          <Heart size={16} fill="var(--rose-soft)" />
          <span style={{ marginTop: '2px', fontWeight: '600' }}>FOR HER</span>
        </div>

        <h3 style={{
          fontFamily: 'var(--font-handwriting)',
          fontSize: '2.8rem',
          color: 'var(--rose-dark)',
          marginBottom: '20px',
          fontWeight: '700'
        }}>
          Astha,
        </h3>

        <div style={{
          fontFamily: 'var(--font-handwriting)',
          fontSize: '1.75rem',
          lineHeight: '1.75',
          color: 'var(--text-main)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <p>I don't know where this little game takes us.</p>
          <p>Maybe nowhere.</p>
          <p>Maybe somewhere beautiful.</p>
          <p>
            But I know one thing...<br />
            I'd rather spend my time finding my way to you than wondering what could have happened.
          </p>

          <div style={{
            margin: '16px 0',
            padding: '16px 20px',
            background: 'rgba(255, 255, 255, 0.7)',
            borderRadius: 'var(--radius-sm)',
            borderLeft: '3px solid var(--rose-deep)',
            fontSize: '1.85rem',
            color: 'var(--rose-deep)',
            fontWeight: '700'
          }}>
            So here's my last little clue:<br />
            Maybe the person you've been looking for has been looking for you too.
          </div>

          <p style={{
            fontSize: '1.45rem',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
            marginTop: '8px'
          }}>
            No pressure. Just a little piece of my heart, hidden here for you.
          </p>
        </div>
      </div>

      {/* 3. Soft Interactive Choice */}
      <div 
        className="stationery-card animate-fade-in"
        style={{
          padding: '40px 32px',
          textAlign: 'center',
          background: 'rgba(255, 253, 249, 0.94)',
          border: '1px solid var(--border-delicate)',
          marginBottom: '40px'
        }}
      >
        <h4 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.6rem',
          color: 'var(--rose-dark)',
          marginBottom: '20px',
          fontWeight: '500'
        }}>
          How did this feel?
        </h4>

        {!selectedResponse ? (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center'
          }}>
            <button
              className="btn-romantic"
              onClick={() => handleResponseChoice('tell')}
              style={{ padding: '13px 26px', fontSize: '0.98rem' }}
            >
              <span>I want to tell you how I felt 🌸</span>
            </button>
            <button
              className="btn-romantic"
              onClick={() => handleResponseChoice('time')}
              style={{ padding: '13px 26px', fontSize: '0.98rem' }}
            >
              <span>I need a little time ⏳</span>
            </button>
          </div>
        ) : (
          <div className="animate-fade-in" style={{ padding: '10px 0' }}>
            {selectedResponse === 'tell' ? (
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.4rem',
                lineHeight: '1.7',
                color: 'var(--rose-deep)'
              }}>
                <p>Then don't keep it hidden.</p>
                <p style={{ fontStyle: 'italic', color: 'var(--text-main)', marginTop: '8px', fontSize: '1.25rem' }}>
                  Tell me what you felt while finding all of this.
                </p>
              </div>
            ) : (
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.4rem',
                lineHeight: '1.7',
                color: 'var(--rose-deep)'
              }}>
                <p>Take your time.</p>
                <p style={{ fontStyle: 'italic', color: 'var(--text-main)', marginTop: '8px', fontSize: '1.25rem' }}>
                  Some things are worth letting unfold slowly.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. Contact / Response Phone Section */}
      <div 
        className="stationery-card animate-fade-in"
        style={{
          padding: '46px 36px',
          textAlign: 'center',
          background: 'linear-gradient(145deg, #FFFDF9 0%, #FAF0F2 100%)',
          border: '1.5px solid var(--rose-dusty)',
          boxShadow: '0 20px 45px rgba(110, 51, 64, 0.12)'
        }}
      >
        <span className="badge-soft" style={{ marginBottom: '16px' }}>
          Now it's your turn
        </span>

        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.9rem',
          color: 'var(--rose-dark)',
          fontWeight: '500',
          marginBottom: '10px'
        }}>
          I hid all of this here for you...
        </h3>

        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.25rem',
          color: 'var(--text-muted)',
          fontStyle: 'italic',
          marginBottom: '26px'
        }}>
          You can tell me what you felt.
        </p>

        {/* Display phone number prominently */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 28px',
          borderRadius: 'var(--radius-full)',
          background: '#FFFDF9',
          border: '1.5px solid var(--rose-blush)',
          boxShadow: '0 4px 18px rgba(184, 110, 126, 0.12)',
          marginBottom: '28px'
        }}>
          <Phone size={18} color="var(--rose-deep)" />
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.35rem',
            fontWeight: '600',
            letterSpacing: '0.06em',
            color: 'var(--rose-dark)'
          }}>
            {phoneNumber}
          </span>
        </div>

        <div>
          <button
            className="btn-romantic btn-primary-romantic"
            onClick={handleOpenMessaging}
            style={{ padding: '16px 42px', fontSize: '1.1rem' }}
          >
            <span>Tell me what you felt</span>
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
