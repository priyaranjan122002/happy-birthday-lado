/**
 * Procedural Web Audio Sensory Synthesizer
 * Inspired by @design-engineer/audio (AkashPriyadarshii/akash-design-engineering)
 * Zero-asset mechanical clicks, resonant chimes, spatial thuds, and harmonic pops.
 */

let sharedAudioCtx: AudioContext | null = null;
let sharedNoiseBuffer: AudioBuffer | null = null;

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!sharedAudioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return null;
    sharedAudioCtx = new AudioContextClass();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume();
  }
  return sharedAudioCtx;
}

function getNoiseBuffer(ctx: AudioContext): AudioBuffer {
  if (!sharedNoiseBuffer) {
    const bufferSize = Math.floor(ctx.sampleRate * 0.03);
    sharedNoiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = sharedNoiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  }
  return sharedNoiseBuffer;
}

/**
 * Procedural mechanical switch click using Web Audio BiquadFilter noise bursts
 */
export function playClick(type: 'press' | 'release' = 'press', volume = 0.45): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const t0 = ctx.currentTime;
  const isPress = type === 'press';

  // 1. Noise snap impulse (High-Q mechanical bandpass)
  try {
    const noiseBuf = getNoiseBuffer(ctx);
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuf;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(isPress ? 3400 : 2800, t0);
    filter.Q.setValueAtTime(isPress ? 8.0 : 5.0, t0);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, t0);
    gain.gain.linearRampToValueAtTime(volume * (isPress ? 0.7 : 0.4), t0 + 0.001);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + (isPress ? 0.012 : 0.008));

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noiseSource.start(t0);
    noiseSource.stop(t0 + 0.02);
  } catch (err) {
    // Ignore context timing issues
  }

  // 2. Sub-bass bottom-out thud (Press impact)
  if (isPress) {
    try {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, t0);
      osc.frequency.exponentialRampToValueAtTime(40, t0 + 0.015);

      oscGain.gain.setValueAtTime(volume * 0.35, t0);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.015);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      osc.start(t0);
      osc.stop(t0 + 0.02);
    } catch (err) {
      // Ignore
    }
  }
}

/**
 * Synthesizes inharmonic metallic bell resonances (Euler-Bernoulli partial ratios)
 * for celebrations, wax seal breaking, and candle blowout.
 */
export function playSuccessChime(fundamental = 880, volume = 0.4): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const t0 = ctx.currentTime;

  // Inharmonic metallic beam partial modes: [Ratio, Relative Amplitude, Decay Factor]
  const modes: Array<[number, number, number]> = [
    [1.0, 0.6, 1.0],     // Fundamental
    [1.583, 0.35, 0.7],  // Mode 1
    [2.321, 0.25, 0.45], // Mode 2
    [3.012, 0.15, 0.25], // Mode 3
    [4.250, 0.08, 0.12], // Mode 4 (Rapidly damped high partial)
  ];

  try {
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volume, t0);
    masterGain.connect(ctx.destination);

    // 1. Mallet impact transient
    const mallet = ctx.createOscillator();
    const malletGain = ctx.createGain();
    mallet.type = 'triangle';
    mallet.frequency.setValueAtTime(3200, t0);
    mallet.frequency.exponentialRampToValueAtTime(600, t0 + 0.008);

    malletGain.gain.setValueAtTime(0.4, t0);
    malletGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.008);

    mallet.connect(malletGain);
    malletGain.connect(masterGain);
    mallet.start(t0);
    mallet.stop(t0 + 0.01);

    // 2. Resonant partial synthesis
    modes.forEach(([ratio, amp, decayFactor]) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(fundamental * ratio, t0);

      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.linearRampToValueAtTime(amp, t0 + 0.003); // 3ms attack
      gain.gain.exponentialRampToValueAtTime(0.00001, t0 + 1.2 * decayFactor); // Differential damping

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(t0);
      osc.stop(t0 + 1.3);
    });
  } catch (err) {
    // Ignore
  }
}

/**
 * Low-frequency resonant spatial impact for sheet/drawer/modal reveal
 */
export function playThud(frequency = 120, volume = 0.35): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const t0 = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, t0);
    osc.frequency.exponentialRampToValueAtTime(30, t0 + 0.08);

    gain.gain.setValueAtTime(volume, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t0);
    osc.stop(t0 + 0.09);
  } catch (err) {
    // Ignore
  }
}

/**
 * Sweet harmonic bubble/heart pop for sending kisses and love
 */
export function playHeartPop(volume = 0.3): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const t0 = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Frequency chirp from 550Hz to 1100Hz in 40ms
    osc.frequency.setValueAtTime(550, t0);
    osc.frequency.exponentialRampToValueAtTime(1100, t0 + 0.04);

    gain.gain.setValueAtTime(volume, t0);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t0);
    osc.stop(t0 + 0.07);
  } catch (err) {
    // Ignore
  }
}
