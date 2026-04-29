"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

// Component that represents an electronic part (LED, chip, node)
const CircuitNode = ({
  top,
  left,
  right,
  type = 'node',
  progress,
  activationThreshold,
}: {
  top: string;
  left?: string;
  right?: string;
  type?: 'node' | 'led' | 'chip';
  progress: MotionValue<number>;
  activationThreshold: number;
}) => {
  // Use progress to determine if beam has passed
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const unsubscribe = progress.on('change', (v: number) => {
      // Small buffer for activation
      if (v >= activationThreshold - 0.02 && v <= activationThreshold + 0.15) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    });
    return () => unsubscribe();
  }, [progress, activationThreshold]);

  const style: React.CSSProperties = { top, left, right };

  if (type === 'led') {
    return (
      <div className="absolute -translate-x-1/2 -translate-y-1/2 z-10" style={style}>
        <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
          isActive 
            ? 'bg-green-400 shadow-[0_0_15px_4px_rgba(74,222,128,0.8)] scale-125' 
            : 'bg-gray-800 border-2 border-gray-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]'
        }`} />
      </div>
    );
  }

  if (type === 'chip') {
    return (
      <div className="absolute -translate-x-1/2 -translate-y-1/2 z-10" style={style}>
        <div className={`w-6 h-8 rounded-[4px] flex items-center justify-center transition-all duration-300 ${
          isActive 
            ? 'bg-gray-900 border border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)]' 
            : 'bg-gray-900 border border-gray-700'
        }`}>
          {/* Chip pins */}
          <div className="absolute -left-1 top-1 bottom-1 flex flex-col justify-between py-0.5">
             {[...Array(4)].map((_, i) => <div key={`l-${i}`} className={`w-1 h-0.5 ${isActive ? 'bg-green-400' : 'bg-gray-500'}`} />)}
          </div>
          <div className="absolute -right-1 top-1 bottom-1 flex flex-col justify-between py-0.5">
             {[...Array(4)].map((_, i) => <div key={`r-${i}`} className={`w-1 h-0.5 ${isActive ? 'bg-green-400' : 'bg-gray-500'}`} />)}
          </div>
          <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,1)]' : 'bg-gray-800'}`} />
        </div>
      </div>
    );
  }

  // default node (via)
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 z-10" style={style}>
      <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-300 ${
        isActive ? 'border-2 border-cyan-400 bg-cyan-900 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'border-2 border-gray-700 bg-black'
      }`}>
        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-cyan-300' : 'bg-gray-600'}`} />
      </div>
    </div>
  );
};

const CircuitBorders = () => {
  const { scrollYProgress } = useScroll();
  
  // Smooth the scroll progress for the beam so it feels fluid
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // The dashoffset defines how the stroke moves. 
  // We want the beam to travel from top to bottom as user scrolls down.
  // Using pathLength="1", a dasharray of "0.15 1" gives a beam size of 15%.
  // We move dashoffset from 1.15 to -0.15 to ensure it fully enters and exits.
  const pathOffset = useTransform(smoothProgress, [0, 1], [1.15, -0.15]);
  const reversePathOffset = useTransform(smoothProgress, [0, 1], [-0.15, 1.15]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none hidden md:block overflow-hidden">
      
      {/* --- LEFT BORDER --- */}
      <div className="absolute inset-y-0 left-0 w-24 border-r border-white/5 bg-black/20 backdrop-blur-sm">
        
        {/* Faint base circuit trace */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path 
            d="M 30 0 L 30 15 L 70 20 L 70 35 L 40 40 L 40 60 L 80 65 L 80 80 L 30 85 L 30 100" 
            fill="none" 
            stroke="rgba(255,255,255,0.05)" 
            strokeWidth="2" 
            vectorEffect="non-scaling-stroke"
          />
          <path 
            d="M 60 0 L 60 10 L 20 15 L 20 45 L 80 50 L 80 70 L 40 75 L 40 100" 
            fill="none" 
            stroke="rgba(255,255,255,0.03)" 
            strokeWidth="1" 
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* The Photon Beam (Main Trace) */}
        <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" preserveAspectRatio="none" viewBox="0 0 100 100">
          <motion.path 
            d="M 30 0 L 30 15 L 70 20 L 70 35 L 40 40 L 40 60 L 80 65 L 80 80 L 30 85 L 30 100" 
            fill="none" 
            stroke="#22c55e" 
            strokeWidth="3" 
            vectorEffect="non-scaling-stroke"
            pathLength="1"
            strokeDasharray="0.1 1"
            style={{ strokeDashoffset: pathOffset }}
            strokeLinecap="round"
          />
        </svg>

        {/* Secondary Photon Beam */}
        <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" preserveAspectRatio="none" viewBox="0 0 100 100">
          <motion.path 
            d="M 60 0 L 60 10 L 20 15 L 20 45 L 80 50 L 80 70 L 40 75 L 40 100" 
            fill="none" 
            stroke="#3b82f6" 
            strokeWidth="2" 
            vectorEffect="non-scaling-stroke"
            pathLength="1"
            strokeDasharray="0.08 1"
            style={{ strokeDashoffset: pathOffset }}
            strokeLinecap="round"
          />
        </svg>

        {/* Left Side Components */}
        <CircuitNode top="15%" left="30%" type="node" progress={smoothProgress} activationThreshold={0.15} />
        <CircuitNode top="20%" left="70%" type="led" progress={smoothProgress} activationThreshold={0.20} />
        <CircuitNode top="35%" left="70%" type="node" progress={smoothProgress} activationThreshold={0.35} />
        <CircuitNode top="40%" left="40%" type="chip" progress={smoothProgress} activationThreshold={0.40} />
        <CircuitNode top="60%" left="40%" type="node" progress={smoothProgress} activationThreshold={0.60} />
        <CircuitNode top="65%" left="80%" type="led" progress={smoothProgress} activationThreshold={0.65} />
        <CircuitNode top="80%" left="80%" type="chip" progress={smoothProgress} activationThreshold={0.80} />
        <CircuitNode top="85%" left="30%" type="node" progress={smoothProgress} activationThreshold={0.85} />
        
        {/* Secondary Path Nodes */}
        <CircuitNode top="10%" left="60%" type="node" progress={smoothProgress} activationThreshold={0.10} />
        <CircuitNode top="45%" left="20%" type="led" progress={smoothProgress} activationThreshold={0.45} />
        <CircuitNode top="50%" left="80%" type="node" progress={smoothProgress} activationThreshold={0.50} />
        <CircuitNode top="70%" left="80%" type="led" progress={smoothProgress} activationThreshold={0.70} />
        <CircuitNode top="75%" left="40%" type="node" progress={smoothProgress} activationThreshold={0.75} />
      </div>

      {/* --- RIGHT BORDER --- */}
      <div className="absolute inset-y-0 right-0 w-24 border-l border-white/5 bg-black/20 backdrop-blur-sm">
        
        {/* Faint base circuit trace */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path 
            d="M 60 0 L 60 25 L 30 30 L 30 55 L 70 60 L 70 75 L 40 80 L 40 100" 
            fill="none" 
            stroke="rgba(255,255,255,0.05)" 
            strokeWidth="2" 
            vectorEffect="non-scaling-stroke"
          />
          <path 
            d="M 20 0 L 20 18 L 80 23 L 80 45 L 20 50 L 20 85 L 70 90 L 70 100" 
            fill="none" 
            stroke="rgba(255,255,255,0.03)" 
            strokeWidth="1" 
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* The Photon Beam (Cyan) */}
        <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" preserveAspectRatio="none" viewBox="0 0 100 100">
          <motion.path 
            d="M 60 0 L 60 25 L 30 30 L 30 55 L 70 60 L 70 75 L 40 80 L 40 100" 
            fill="none" 
            stroke="#22d3ee" 
            strokeWidth="3" 
            vectorEffect="non-scaling-stroke"
            pathLength="1"
            strokeDasharray="0.12 1"
            style={{ strokeDashoffset: pathOffset }}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Secondary Beam (Purple) */}
        <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" preserveAspectRatio="none" viewBox="0 0 100 100">
          <motion.path 
            d="M 20 0 L 20 18 L 80 23 L 80 45 L 20 50 L 20 85 L 70 90 L 70 100" 
            fill="none" 
            stroke="#a855f7" 
            strokeWidth="2" 
            vectorEffect="non-scaling-stroke"
            pathLength="1"
            strokeDasharray="0.08 1"
            style={{ strokeDashoffset: reversePathOffset }} // This one flows upwards!
            strokeLinecap="round"
          />
        </svg>

        {/* Right Side Components */}
        <CircuitNode top="25%" left="60%" type="node" progress={smoothProgress} activationThreshold={0.25} />
        <CircuitNode top="30%" left="30%" type="led" progress={smoothProgress} activationThreshold={0.30} />
        <CircuitNode top="55%" left="30%" type="chip" progress={smoothProgress} activationThreshold={0.55} />
        <CircuitNode top="60%" left="70%" type="node" progress={smoothProgress} activationThreshold={0.60} />
        <CircuitNode top="75%" left="70%" type="led" progress={smoothProgress} activationThreshold={0.75} />
        <CircuitNode top="80%" left="40%" type="node" progress={smoothProgress} activationThreshold={0.80} />

        {/* Secondary Path Nodes (Upwards flow uses inverted threshold logic for visuals, but we can stick to normal thresholds) */}
        <CircuitNode top="18%" left="20%" type="led" progress={smoothProgress} activationThreshold={0.82} />
        <CircuitNode top="23%" left="80%" type="node" progress={smoothProgress} activationThreshold={0.77} />
        <CircuitNode top="45%" left="80%" type="chip" progress={smoothProgress} activationThreshold={0.55} />
        <CircuitNode top="50%" left="20%" type="node" progress={smoothProgress} activationThreshold={0.50} />
        <CircuitNode top="85%" left="20%" type="led" progress={smoothProgress} activationThreshold={0.15} />
        <CircuitNode top="90%" left="70%" type="node" progress={smoothProgress} activationThreshold={0.10} />

      </div>
    </div>
  );
};

export default CircuitBorders;
