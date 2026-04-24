"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface HeroProps {
  onRegisterClick: () => void;
}

// --- Typewriter Hook ---
function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx % words.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, display.length + 1));
        if (display.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        setDisplay(current.slice(0, display.length - 1));
        if (display.length - 1 === 0) {
          setDeleting(false);
          setWordIdx(i => i + 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [display, deleting, wordIdx, words, speed, pause]);

  return display;
}

// --- Particle Canvas ---
const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
    const COUNT = 80;

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34, 197, 94, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 197, 94, ${p.alpha})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

// --- Glitch Text ---
const GlitchTitle: React.FC<{ text: string }> = ({ text }) => (
  <div className="relative inline-block">
    <style>{`
      @keyframes glitch-clip-1 {
        0%, 90%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
        92% { clip-path: inset(10% 0 60% 0); transform: translate(-3px, 1px); }
        94% { clip-path: inset(50% 0 30% 0); transform: translate(3px, -1px); }
        96% { clip-path: inset(30% 0 50% 0); transform: translate(-2px, 2px); }
        98% { clip-path: inset(70% 0 10% 0); transform: translate(2px, -2px); }
      }
      @keyframes glitch-clip-2 {
        0%, 90%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
        91% { clip-path: inset(40% 0 40% 0); transform: translate(3px, -1px); }
        93% { clip-path: inset(20% 0 70% 0); transform: translate(-3px, 1px); }
        95% { clip-path: inset(60% 0 20% 0); transform: translate(2px, -2px); }
        97% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 2px); }
      }
      @keyframes neon-border-rotate {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes shimmer-move {
        0% { transform: translateX(-100%) skewX(-12deg); }
        100% { transform: translateX(250%) skewX(-12deg); }
      }
      @keyframes counter-up {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `}</style>
    {/* Base */}
    <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter drop-shadow-xl relative z-10">
      {text}
    </h1>
    {/* Glitch layer 1 — cyan */}
    <h1
      aria-hidden
      className="absolute inset-0 text-6xl md:text-8xl font-bold tracking-tighter text-cyan-400"
      style={{ animation: 'glitch-clip-1 4s infinite', left: 0, top: 0 }}
    >
      {text}
    </h1>
    {/* Glitch layer 2 — red */}
    <h1
      aria-hidden
      className="absolute inset-0 text-6xl md:text-8xl font-bold tracking-tighter text-red-400"
      style={{ animation: 'glitch-clip-2 4s infinite', left: 0, top: 0 }}
    >
      {text}
    </h1>
  </div>
);

// --- Animated Neon Border Button ---
const NeonButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div className="relative inline-block p-[2px] rounded-full group" style={{
    background: 'linear-gradient(270deg, #22c55e, #3b82f6, #a855f7, #22c55e)',
    backgroundSize: '400% 400%',
    animation: 'neon-border-rotate 3s ease infinite',
  }}>
    <motion.button
      onClick={onClick}
      className="relative overflow-hidden bg-[#0a0a0a] text-white px-12 py-5 rounded-full text-xl font-bold transition-all duration-300"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Shimmer sweep */}
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
          animation: 'shimmer-move 2.5s infinite',
        }}
      />
      <span className="relative z-10 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-extrabold tracking-wide">
        Initialize Registration
      </span>
    </motion.button>
  </div>
);

// --- Stat Counter ---
const StatPill: React.FC<{ value: string; label: string; delay: number }> = ({ value, label, delay }) => (
  <motion.div
    className="flex flex-col items-center px-6 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: 'easeOut' }}
  >
    <span className="text-2xl font-extrabold text-green-400 tabular-nums">{value}</span>
    <span className="text-xs text-white/50 uppercase tracking-widest mt-0.5">{label}</span>
  </motion.div>
);

// --- Main Hero ---
const Hero: React.FC<HeroProps> = ({ onRegisterClick }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mounted, setMounted] = useState(false);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const tileX = useTransform(springX, [-500, 500], [-10, 10]);
  const tileY = useTransform(springY, [-500, 500], [-10, 10]);
  const bgX = useTransform(springX, [-500, 500], [20, -20]);
  const bgY = useTransform(springY, [-500, 500], [20, -20]);

  const tagline = useTypewriter([
    'Build the Future.',
    'Break the Limits.',
    'Hack the Impossible.',
    'Ship in 24 Hours.',
  ]);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="hero" className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden pt-20 bg-[#0a0a0a]">

      {/* Particle Field */}
      {mounted && <ParticleField />}

      {/* Noise grain overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />

      {/* Top Left Logo */}
      <div className="fixed top-6 left-6 z-50">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer"
          onClick={() => window.location.reload()}
        >
          <Image
            src="/images/logo.png"
            alt="HackIE3 Logo"
            width={60}
            height={60}
            className="drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]"
          />
        </motion.div>
      </div>

      {/* Background Glow Logo — blur reduced to 50% (blur-[20px] instead of blur-2xl/40px) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <motion.div
          style={{ x: bgX, y: bgY, filter: 'blur(20px)' }}
          className="relative w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] opacity-25 pointer-events-none"
        >
          <Image
            src="/images/logo.png"
            alt="Background Glow"
            fill
            className="object-contain"
          />
          <div className="absolute inset-0 bg-green-500/20 rounded-full blur-[140px] animate-pulse"></div>
          <div className="absolute inset-0 bg-green-400/5 rounded-full blur-[200px]"></div>
        </motion.div>

        {/* Animated Blobs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-600/5 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      {/* Main Glass Tile */}
      <motion.div
        style={{ x: tileX, y: tileY }}
        className="relative z-10 p-[1.5px] rounded-[15px] max-w-4xl mx-auto"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Animated rotating neon border */}
        <div
          className="absolute inset-0 rounded-[15px] opacity-70"
          style={{
            background: 'linear-gradient(270deg, rgba(34,197,94,0.6), rgba(59,130,246,0.6), rgba(168,85,247,0.4), rgba(34,197,94,0.6))',
            backgroundSize: '400% 400%',
            animation: 'neon-border-rotate 4s ease infinite',
            borderRadius: '15px',
          }}
        />

        {/* Glass inner */}
        <div className="relative glass-effect p-10 md:p-20 text-center shadow-[0_0_60px_rgba(0,0,0,0.7)] rounded-[14px]">

          {/* Glitch Title */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <GlitchTitle text="HackIE³" />
          </motion.div>

          {/* Typewriter tagline */}
          <motion.div
            className="mb-4 h-10 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xl md:text-2xl text-green-400 font-mono font-semibold tracking-wide">
              {tagline}
              <span className="inline-block w-[2px] h-6 bg-green-400 ml-1 align-middle animate-pulse" />
            </p>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-base md:text-lg text-white/50 mb-10 font-light max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span className="text-green-400/80 font-medium">Jadavpur University's</span> Premier Hackathon.
          </motion.p>

          {/* Stat pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <StatPill value="48h" label="Duration" delay={1.0} />
            <StatPill value="₹1L+" label="Prize Pool" delay={1.1} />
            <StatPill value="500+" label="Hackers" delay={1.2} />
            <StatPill value="∞" label="Ideas" delay={1.3} />
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <NeonButton onClick={onRegisterClick} />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-green-400 rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
