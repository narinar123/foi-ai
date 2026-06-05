'use client';
import { motion } from 'framer-motion';
import React from 'react';

export default function AnimatedBackground() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
          rotate: [0, 90, 180, 270, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, var(--brand-transparent) 0%, rgba(217,119,87,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)'
        }}
      />
      
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.1, 0.05],
          rotate: [360, 270, 180, 90, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          bottom: '-30%',
          right: '-10%',
          width: '70vw',
          height: '70vw',
          background: 'radial-gradient(circle, rgba(217,119,87,0.1) 0%, rgba(0,0,0,0) 60%)',
          borderRadius: '50%',
          filter: 'blur(100px)'
        }}
      />
    </div>
  );
}
