"use client";

import React, { useState, useEffect } from 'react';
import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import BlurText from '@/components/ui/blur-text';

export default function HeaderWithBlurText() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <header className="relative overflow-hidden bg-slate-900 text-white py-5 px-8 shadow-lg">
      {/* 动态背景渐变 - 极光风格 */}
      <motion.div 
        className="absolute inset-0 opacity-50"
        animate={{ 
          background: [
            'linear-gradient(60deg, #ff0080 0%, #7928ca 50%, #4361ee 100%)',
            'linear-gradient(120deg, #00bfff 0%, #6d28d9 50%, #ff4d8b 100%)',
            'linear-gradient(180deg, #8b5cf6 0%, #3b82f6 50%, #10b981 100%)',
            'linear-gradient(240deg, #4f46e5 0%, #0ea5e9 50%, #4ade80 100%)',
            'linear-gradient(300deg, #c026d3 0%, #4f46e5 50%, #0ea5e9 100%)',
            'linear-gradient(360deg, #ff0080 0%, #7928ca 50%, #4361ee 100%)',
          ]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.2, 0.4, 0.6, 0.8, 1]
        }}
      />
      
      {/* 光晕效果1 */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-blue-600/20 blur-3xl"></div>
      
      {/* 鼠标跟随光效 */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-fuchsia-400 opacity-20 blur-3xl pointer-events-none"
        animate={{
          x: mousePosition.x - 180,
          y: mousePosition.y - 250,
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 80,
          mass: 0.6
        }}
      />
      
      {/* 内容容器 */}
      <div className="container mx-auto flex items-center justify-center relative z-10">
        <motion.h1 
          className="text-4xl font-bold flex items-center gap-3"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            whileHover={{ 
              rotate: [0, -10, 10, -5, 5, 0], 
              scale: [1, 1.15, 1],
              transition: { duration: 0.6 } 
            }}
          >
            <Bot className="h-9 w-9" />
          </motion.div>
          <BlurText 
            text="智视未来" 
            animateBy="chars" 
            delay={60}
            direction="top"
            stepDuration={0.4}
            className="leading-none"
          />
        </motion.h1>
      </div>
    </header>
  );
} 