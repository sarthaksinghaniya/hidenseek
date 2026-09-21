// Web Audio API Synthesizer for ambient romantic lofi acoustic tones and chimes

class AudioSystem {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.musicTimer = null;
    this.musicGain = null;
    this.masterGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPop() {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      console.warn("Audio error", e);
    }
  }

  playDecoy() {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.15);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {
      console.warn("Audio error", e);
    }
  }

  playChime() {
    this.init();
    if (!this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.07;
        const duration = 0.6;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    } catch (e) {
      console.warn("Audio error", e);
    }
  }

  playLoveChime() {
    this.init();
    if (!this.ctx) return;
    try {
      const notes = [440, 554.37, 659.25, 880, 1108.73]; // A, C#, E, A, C#
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.09;
        const duration = 1.2;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    } catch (e) {
      console.warn("Audio error", e);
    }
  }

  toggleAmbientMusic(callback) {
    this.init();
    if (!this.ctx) return false;

    if (this.isPlayingMusic) {
      this.stopAmbientMusic();
      if (callback) callback(false);
      return false;
    } else {
      this.startAmbientMusic();
      if (callback) callback(true);
      return true;
    }
  }

  startAmbientMusic() {
    if (this.isPlayingMusic || !this.ctx) return;
    this.isPlayingMusic = true;

    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.musicGain.gain.exponentialRampToValueAtTime(0.25, this.ctx.currentTime + 2.0);
    this.musicGain.connect(this.masterGain);

    // Progression of peaceful romantic lofi chords (frequencies in Hz)
    // Cmaj9 -> Am9 -> Fmaj7 -> G6add9
    const chordProgressions = [
      [261.63, 329.63, 392.00, 493.88, 587.33], // C, E, G, B, D
      [220.00, 261.63, 329.63, 392.00, 493.88], // A, C, E, G, B
      [174.61, 261.63, 329.63, 349.23, 440.00], // F, C, E, F, A
      [196.00, 246.94, 293.66, 392.00, 440.00]  // G, B, D, G, A
    ];

    let chordIdx = 0;

    const playChordStep = () => {
      if (!this.isPlayingMusic || !this.ctx) return;
      const currentChord = chordProgressions[chordIdx];
      const now = this.ctx.currentTime;

      // Play soft arpeggios
      currentChord.forEach((freq, noteIdx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const noteTime = now + noteIdx * 0.28 + (Math.random() * 0.05);
        const noteDuration = 2.4;

        osc.type = noteIdx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.001, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.08, noteTime + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + noteDuration);

        osc.connect(gain);
        gain.connect(this.musicGain);

        osc.start(noteTime);
        osc.stop(noteTime + noteDuration);
      });

      chordIdx = (chordIdx + 1) % chordProgressions.length;
      this.musicTimer = setTimeout(playChordStep, 2600);
    };

    playChordStep();
  }

  stopAmbientMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
    if (this.musicGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.musicGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      setTimeout(() => {
        if (this.musicGain) {
          try { this.musicGain.disconnect(); } catch (e) {}
          this.musicGain = null;
        }
      }, 1300);
    }
  }
}

export const soundFx = new AudioSystem();
