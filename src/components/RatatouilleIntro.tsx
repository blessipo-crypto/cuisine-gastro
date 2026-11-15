import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, ArrowRight, Sparkles } from 'lucide-react';

interface RatatouilleIntroProps {
  isOpen: boolean;
  onClose: () => void;
}

// Frequency table (Hz) for a cheerful, comedic Parisian musette & pizzicato melody
const MELODY_NOTES: { freq: number; duration: number; delay: number; slide?: boolean }[] = [
  // Measure 1 — upbeat bistro waltz motif
  { freq: 392.0, duration: 0.16, delay: 0.0 },   // G4
  { freq: 523.25, duration: 0.16, delay: 0.18 }, // C5
  { freq: 659.25, duration: 0.16, delay: 0.36 }, // E5
  { freq: 587.33, duration: 0.14, delay: 0.54 }, // D5
  { freq: 523.25, duration: 0.22, delay: 0.70 }, // C5
  // Measure 2 — playful hop
  { freq: 440.0, duration: 0.16, delay: 0.96 },  // A4
  { freq: 587.33, duration: 0.16, delay: 1.14 }, // D5
  { freq: 698.46, duration: 0.18, delay: 1.32 }, // F5
  { freq: 659.25, duration: 0.24, delay: 1.52 }, // E5
  // Measure 3 — whimsical chromatic giggle
  { freq: 783.99, duration: 0.14, delay: 1.82 }, // G5
  { freq: 739.99, duration: 0.14, delay: 1.98 }, // F#5
  { freq: 783.99, duration: 0.16, delay: 2.14 }, // G5
  { freq: 880.0, duration: 0.18, delay: 2.32 },  // A5
  { freq: 783.99, duration: 0.16, delay: 2.52 }, // G5
  { freq: 659.25, duration: 0.22, delay: 2.70 }, // E5
  // Measure 4 — comedic boing + joyful finale
  { freq: 587.33, duration: 0.15, delay: 2.98 }, // D5
  { freq: 659.25, duration: 0.15, delay: 3.15 }, // E5
  { freq: 523.25, duration: 0.28, delay: 3.32 }, // C5
  { freq: 392.0, duration: 0.12, delay: 3.64 },  // G4
  { freq: 523.25, duration: 0.12, delay: 3.78 }, // C5
  { freq: 783.99, duration: 0.14, delay: 3.92 }, // G5
  { freq: 1046.5, duration: 0.36, delay: 4.08, slide: true }, // C6 comedic pop!
];

const BASS_NOTES: { freq: number; delay: number }[] = [
  { freq: 130.81, delay: 0.0 },
  { freq: 196.0, delay: 0.36 },
  { freq: 146.83, delay: 0.96 },
  { freq: 196.0, delay: 1.32 },
  { freq: 130.81, delay: 1.82 },
  { freq: 196.0, delay: 2.32 },
  { freq: 196.0, delay: 2.98 },
  { freq: 130.81, delay: 3.32 },
  { freq: 130.81, delay: 4.08 },
];

export const RatatouilleIntro: React.FC<RatatouilleIntroProps> = ({ isOpen, onClose }) => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const loopTimerRef = useRef<number | null>(null);

  const stopMusic = useCallback(() => {
    if (loopTimerRef.current !== null) {
      window.clearInterval(loopTimerRef.current);
      loopTimerRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsMusicPlaying(false);
  }, []);

  const schedulePhrase = useCallback((ctx: AudioContext) => {
    const now = ctx.currentTime + 0.05;

    // Accordion / Musette lead (dual slightly detuned triangle+sawtooth oscillators)
    for (const note of MELODY_NOTES) {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc1.type = 'triangle';
      osc2.type = 'sawtooth';
      osc1.frequency.setValueAtTime(note.freq, now + note.delay);
      osc2.frequency.setValueAtTime(note.freq * 1.006, now + note.delay);

      if (note.slide) {
        osc1.frequency.exponentialRampToValueAtTime(note.freq * 1.12, now + note.delay + 0.14);
        osc1.frequency.exponentialRampToValueAtTime(note.freq, now + note.delay + 0.3);
      }

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2200, now + note.delay);

      gain.gain.setValueAtTime(0.0001, now + note.delay);
      gain.gain.linearRampToValueAtTime(0.11, now + note.delay + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.delay + note.duration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now + note.delay);
      osc2.start(now + note.delay);
      osc1.stop(now + note.delay + note.duration + 0.03);
      osc2.stop(now + note.delay + note.duration + 0.03);
    }

    // Playful pizzicato / tuba bass bounce
    for (const bass of BASS_NOTES) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(bass.freq, now + bass.delay);
      osc.frequency.exponentialRampToValueAtTime(bass.freq * 0.92, now + bass.delay + 0.22);

      gain.gain.setValueAtTime(0.0001, now + bass.delay);
      gain.gain.linearRampToValueAtTime(0.18, now + bass.delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + bass.delay + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + bass.delay);
      osc.stop(now + bass.delay + 0.3);
    }

    // Funny wooden spoon percussion ticks
    [0.18, 0.54, 1.14, 1.52, 1.98, 2.52, 3.15, 3.78].forEach((t) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1180, now + t);
      osc.frequency.exponentialRampToValueAtTime(620, now + t + 0.045);

      gain.gain.setValueAtTime(0.06, now + t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + t);
      osc.stop(now + t + 0.06);
    });
  }, []);

  const startMusic = useCallback(async () => {
    try {
      stopMusic();
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      if (ctx.state === 'running') {
        setAudioBlocked(false);
        setIsMusicPlaying(true);
        schedulePhrase(ctx);
        loopTimerRef.current = window.setInterval(() => {
          if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
            schedulePhrase(audioCtxRef.current);
          }
        }, 4650);
      } else {
        setAudioBlocked(true);
        setIsMusicPlaying(false);
      }
    } catch {
      setAudioBlocked(true);
      setIsMusicPlaying(false);
    }
  }, [schedulePhrase, stopMusic]);

  // Attempt automatic playback on open & stop on close/unmount
  useEffect(() => {
    if (!isOpen) {
      stopMusic();
      return;
    }

    startMusic();

    return () => {
      stopMusic();
    };
  }, [isOpen, startMusic, stopMusic]);

  // Gentle auto-dismiss if user does not interact, giving time to enjoy the animation
  useEffect(() => {
    if (!isOpen || userInteracted) return;
    const timer = window.setTimeout(() => {
      stopMusic();
      onClose();
    }, 5800);
    return () => window.clearTimeout(timer);
  }, [isOpen, userInteracted, onClose, stopMusic]);

  const handleDismiss = () => {
    stopMusic();
    onClose();
  };

  const handleToggleMusic = () => {
    setUserInteracted(true);
    if (isMusicPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  const veggies = [
    { label: 'Tomate', color: '#DC2626', ring: '#FCA5A5', delay: 0.1, xStart: -115 },
    { label: 'Courgette', color: '#16A34A', ring: '#86EFAC', delay: 0.35, xStart: -45 },
    { label: 'Aubergine', color: '#7E22CE', ring: '#D8B4FE', delay: 0.6, xStart: 45 },
    { label: 'Poivron', color: '#D97706', ring: '#FDE68A', delay: 0.85, xStart: 115 },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label="Animation culinaire Ratatouille"
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/75 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.94, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 10 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="relative w-full max-w-xl bg-[#FBF9F5] border border-stone-300 rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Top Editorial Ribbon */}
            <div className="px-6 py-3.5 bg-[#1C1917] text-[#FBF9F5] flex items-center justify-between gap-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Ouverture de Brigade · Ratatouille</span>
              </span>

              <button
                type="button"
                onClick={handleToggleMusic}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded bg-stone-800 hover:bg-[#991B1B] text-[#FBF9F5] border border-stone-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                {isMusicPlaying ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
                    <span>Musique rigolote ♪ (Couper)</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-stone-300" aria-hidden="true" />
                    <span>
                      {audioBlocked ? 'Activer la musique rigolote ♪' : 'Lancer la musique ♪'}
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Animated Ratatouille Stage */}
            <div
              onClick={() => {
                if (!isMusicPlaying) {
                  setUserInteracted(true);
                  startMusic();
                }
              }}
              className="relative px-6 pt-8 pb-6 bg-gradient-to-b from-[#F3EFE7] to-[#FBF9F5] flex flex-col items-center cursor-pointer select-none"
            >
              {/* Top Ribbon Label */}
              <div className="relative w-full max-w-md h-56 flex items-end justify-center overflow-visible">
                {['♪', '♫', '♪'].map((note, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      y: [20, -24 - idx * 10, -48 - idx * 8],
                      x: [idx === 0 ? -95 : idx === 1 ? 95 : 10, idx === 0 ? -115 : idx === 1 ? 115 : -10],
                      rotate: [0, idx % 2 === 0 ? -15 : 15, 0],
                    }}
                    transition={{
                      duration: 2.1,
                      repeat: Infinity,
                      delay: idx * 0.55,
                      ease: 'easeInOut',
                    }}
                    className="absolute top-6 font-serif text-2xl font-bold text-[#991B1B] pointer-events-none"
                  >
                    {note}
                  </motion.span>
                ))}

                {/* Dancing Ratatouille Vegetable Slices arcing into the copper pot */}
                {veggies.map((veg) => (
                  <motion.div
                    key={veg.label}
                    initial={{ x: veg.xStart + 45, y: -95, opacity: 0, scale: 0.7, rotate: 0 }}
                    animate={{
                      x: [veg.xStart + 45, veg.xStart * 0.45 + 55, 62],
                      y: [-95, -55, 60],
                      opacity: [0, 1, 1, 0],
                      scale: [0.75, 1.05, 0.55],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2.0,
                      repeat: Infinity,
                      delay: veg.delay,
                      ease: 'easeIn',
                    }}
                    className="absolute top-12 z-20 pointer-events-none"
                  >
                    <div
                      className="w-7 h-7 rounded-full border-4 shadow-sm flex items-center justify-center"
                      style={{
                        backgroundColor: veg.color,
                        borderColor: veg.ring,
                      }}
                      title={veg.label}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    </div>
                  </motion.div>
                ))}

                {/* Rising Steam Curls over the Copper Pot */}
                {[0, 1, 2].map((steamIdx) => (
                  <motion.div
                    key={steamIdx}
                    animate={{
                      y: [0, -34],
                      opacity: [0.15, 0.55, 0],
                      scaleX: [0.9, 1.25, 0.95],
                    }}
                    transition={{
                      duration: 1.9,
                      repeat: Infinity,
                      delay: steamIdx * 0.45,
                      ease: 'easeOut',
                    }}
                    className="absolute bottom-24 pointer-events-none"
                    style={{ left: `${56 + steamIdx * 7}%` }}
                  >
                    <div className="w-4 h-7 rounded-full border-2 border-stone-400/50 border-b-0 border-l-0 rotate-12" />
                  </motion.div>
                ))}

                {/* Chef Richard + Petit Chef Mouse + Copper Cocotte Duo SVG */}
                <motion.svg
                  viewBox="0 0 380 200"
                  className="w-80 sm:w-96 h-52 relative z-10 overflow-visible"
                  animate={{ y: [0, -2.5, 0] }}
                  transition={{ duration: 0.95, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {/* === CHEF RICHARD (LEFT) === */}
                  <g>
                    {/* Richard's Tall Chef Toque */}
                    <motion.g
                      animate={{ rotate: [-2, 2.5, -2] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ originX: '88px', originY: '56px' }}
                    >
                      <path
                        d="M62 56 C52 34, 65 14, 78 18 C83 6, 97 6, 102 18 C115 14, 125 34, 114 56 Z"
                        fill="#FFFFFF"
                        stroke="#292524"
                        strokeWidth="2.5"
                      />
                      <rect
                        x="64"
                        y="51"
                        width="48"
                        height="10"
                        rx="2"
                        fill="#F5F5F4"
                        stroke="#292524"
                        strokeWidth="2"
                      />
                    </motion.g>

                    {/* Richard's Head & Friendly Face */}
                    <circle
                      cx="88"
                      cy="82"
                      r="22"
                      fill="#FDBA74"
                      stroke="#292524"
                      strokeWidth="2.5"
                    />
                    {/* Rosy cheeks */}
                    <circle cx="75" cy="87" r="3.5" fill="#FB7185" opacity="0.45" />
                    <circle cx="101" cy="87" r="3.5" fill="#FB7185" opacity="0.45" />
                    {/* Happy eyes */}
                    <circle cx="80" cy="79" r="2.7" fill="#1C1917" />
                    <circle cx="96" cy="79" r="2.7" fill="#1C1917" />
                    <circle cx="81" cy="78" r="0.9" fill="#FFFFFF" />
                    <circle cx="97" cy="78" r="0.9" fill="#FFFFFF" />
                    {/* Playful French Mustache & Big Smile */}
                    <path
                      d="M74 90 Q81 85 88 89 Q95 85 102 90"
                      fill="none"
                      stroke="#44403C"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M80 94 Q88 100 96 94"
                      fill="none"
                      stroke="#991B1B"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />

                    {/* Richard's White Chef Jacket & Red Neckerchief */}
                    <path
                      d="M46 184 L52 118 C54 108, 66 104, 88 104 C110 104, 122 108, 124 118 L130 184 Z"
                      fill="#FFFFFF"
                      stroke="#292524"
                      strokeWidth="2.5"
                    />
                    {/* Red Chef Scarf */}
                    <path
                      d="M72 104 L88 122 L104 104 Z"
                      fill="#991B1B"
                      stroke="#292524"
                      strokeWidth="2"
                    />
                    {/* Double-breasted jacket buttons */}
                    <circle cx="77" cy="134" r="2.2" fill="#292524" />
                    <circle cx="99" cy="134" r="2.2" fill="#292524" />
                    <circle cx="77" cy="148" r="2.2" fill="#292524" />
                    <circle cx="99" cy="148" r="2.2" fill="#292524" />

                    {/* RICHARD Name Badge on Jacket */}
                    <rect
                      x="60"
                      y="160"
                      width="56"
                      height="16"
                      rx="3"
                      fill="#1C1917"
                    />
                    <text
                      x="88"
                      y="171.5"
                      textAnchor="middle"
                      fill="#FDE68A"
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="bold"
                      letterSpacing="1"
                    >
                      RICHARD
                    </text>

                    {/* Richard's Animated Arm Holding Whisk */}
                    <motion.g
                      animate={{ rotate: [-10, 14, -10] }}
                      transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ originX: '122px', originY: '132px' }}
                    >
                      <path
                        d="M120 126 L146 112"
                        stroke="#FFFFFF"
                        strokeWidth="11"
                        strokeLinecap="round"
                      />
                      <path
                        d="M120 126 L146 112"
                        stroke="#292524"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <circle cx="148" cy="111" r="6" fill="#FDBA74" stroke="#292524" strokeWidth="2" />
                      {/* Silver Chef Whisk */}
                      <line x1="150" y1="106" x2="162" y2="86" stroke="#57534E" strokeWidth="3" strokeLinecap="round" />
                      <ellipse cx="166" cy="79" rx="6" ry="10" transform="rotate(28 166 79)" fill="none" stroke="#78716C" strokeWidth="1.8" />
                    </motion.g>
                  </g>

                  {/* === PETIT CHEF RAT & COPPER COCOTTE (RIGHT) === */}
                  <g transform="translate(125, 10)">
                    {/* Chef Toque Hat on Petit Rat */}
                    <motion.g
                      animate={{ rotate: [-3, 3, -3] }}
                      transition={{ duration: 0.85, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ originX: '130px', originY: '62px' }}
                    >
                      <path
                        d="M110 62 C102 45, 112 28, 122 30 C126 18, 138 18, 142 30 C152 28, 160 45, 150 62 Z"
                        fill="#FFFFFF"
                        stroke="#292524"
                        strokeWidth="2.5"
                      />
                      <rect
                        x="111"
                        y="58"
                        width="38"
                        height="9"
                        rx="2"
                        fill="#F5F5F4"
                        stroke="#292524"
                        strokeWidth="2"
                      />
                    </motion.g>

                    {/* Cute Little Chef Mouse Head & Ears */}
                    <circle cx="107" cy="72" r="13" fill="#9CA3AF" stroke="#292524" strokeWidth="2.5" />
                    <circle cx="107" cy="72" r="7" fill="#FBCFE8" />
                    <circle cx="153" cy="72" r="13" fill="#9CA3AF" stroke="#292524" strokeWidth="2.5" />
                    <circle cx="153" cy="72" r="7" fill="#FBCFE8" />

                    <ellipse cx="130" cy="84" rx="22" ry="18" fill="#9CA3AF" stroke="#292524" strokeWidth="2.5" />
                    {/* Eyes */}
                    <circle cx="122" cy="81" r="2.8" fill="#1C1917" />
                    <circle cx="138" cy="81" r="2.8" fill="#1C1917" />
                    <circle cx="123" cy="80" r="0.9" fill="#FFFFFF" />
                    <circle cx="139" cy="80" r="0.9" fill="#FFFFFF" />
                    {/* Pink Nose & Whiskers */}
                    <ellipse cx="130" cy="88" rx="4.5" ry="3" fill="#F472B6" stroke="#292524" strokeWidth="1.5" />
                    <line x1="104" y1="87" x2="117" y2="88" stroke="#292524" strokeWidth="1.5" />
                    <line x1="104" y1="92" x2="117" y2="90" stroke="#292524" strokeWidth="1.5" />
                    <line x1="143" y1="88" x2="156" y2="87" stroke="#292524" strokeWidth="1.5" />
                    <line x1="143" y1="90" x2="156" y2="92" stroke="#292524" strokeWidth="1.5" />

                    {/* Animated Wooden Spoon Stirring */}
                    <motion.g
                      animate={{ rotate: [-12, 12, -12], x: [-5, 5, -5] }}
                      transition={{ duration: 0.75, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ originX: '165px', originY: '115px' }}
                    >
                      <line
                        x1="145"
                        y1="120"
                        x2="188"
                        y2="68"
                        stroke="#92400E"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                      <ellipse cx="189" cy="66" rx="7" ry="10" transform="rotate(35 189 66)" fill="#B45309" stroke="#78350F" strokeWidth="2" />
                    </motion.g>

                    {/* Simmering Copper Cocotte Pot */}
                    <path
                      d="M68 112 L192 112 L183 162 C181 170, 173 175, 165 175 L95 175 C87 175, 79 170, 77 162 Z"
                      fill="#B45309"
                      stroke="#292524"
                      strokeWidth="2.5"
                    />
                    {/* Copper Shine */}
                    <path
                      d="M84 122 L90 162"
                      stroke="#FDE68A"
                      strokeWidth="4"
                      strokeLinecap="round"
                      opacity="0.55"
                    />
                    {/* Brass Rim & Side Handles */}
                    <rect x="63" y="106" width="134" height="10" rx="4" fill="#D97706" stroke="#292524" strokeWidth="2.5" />
                    <path d="M63 116 C48 116, 48 134, 68 134" fill="none" stroke="#292524" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M197 116 C212 116, 212 134, 192 134" fill="none" stroke="#292524" strokeWidth="3.5" strokeLinecap="round" />

                    {/* Ratatouille Simmering Crest on Pot */}
                    <text
                      x="130"
                      y="148"
                      textAnchor="middle"
                      fill="#FEF3C7"
                      fontSize="12"
                      fontFamily="serif"
                      fontWeight="bold"
                    >
                      RATATOUILLE
                    </text>
                  </g>
                </motion.svg>
              </div>

              <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-stone-900 text-center">
                « Tout le monde peut cuisiner, même Richard ! »
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-stone-600 text-center max-w-md">
                Chef Richard et son petit compagnon préparent la ratatouille en musique pour ouvrir
                votre Atlas des Chefs Étoilés…
              </p>

              {/* Progress / Action Footer */}
              <div className="mt-6 w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleMusic();
                  }}
                  className="text-xs font-medium text-[#991B1B] hover:underline underline-offset-4 cursor-pointer"
                >
                  {isMusicPlaying
                    ? '♪ Musique guinguette active — cliquez pour couper'
                    : '♪ Cliquez ici pour lancer la musique rigolote'}
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDismiss();
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-[#FBF9F5] bg-[#991B1B] hover:bg-stone-900 rounded-md transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Entrer dans l’Atlas</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
