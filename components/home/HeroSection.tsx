'use client';

import { useRef } from 'react';
import { motion } from '../motion';
import { fadeIn, staggerContainer } from '../motion/variants';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 px-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-[#F7931A]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-[#13ADC7]/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="flex flex-col gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="inline-flex gap-2 items-center mb-2"
              variants={fadeIn}
            >
              <span className="bg-[#F7931A]/20 text-[#F7931A] px-3 py-1 rounded-full text-sm font-medium">
                Built with sBTC
              </span>
              <span className="bg-[#13ADC7]/20 text-[#13ADC7] px-3 py-1 rounded-full text-sm font-medium">
                Powered by AI
              </span>
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-[#F7931A] to-[#13ADC7] animate-gradient"
              variants={fadeIn}
            >
              AI Agents for Bitcoin Sovereignty.
            </motion.h1>
            
            <motion.p
              className="text-white/80 text-lg md:text-xl max-w-xl"
              variants={fadeIn}
            >
              Automate your BTC. Control your future. Create AI agents that manage your Bitcoin with privacy, security, and intelligence.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap gap-4 mt-2"
              variants={fadeIn}
            >
              <motion.button
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#F7931A] to-[#13ADC7] hover:opacity-90 text-white font-medium text-lg shadow-glow-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Launch App
              </motion.button>
              
              <motion.button
                className="px-6 py-3 rounded-full border border-[#F7931A] text-white hover:bg-[#F7931A]/10 transition-all font-medium text-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(247, 147, 26, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                See Agents in Action
              </motion.button>
            </motion.div>
            
            <motion.p
              className="text-white/60 text-sm mt-4"
              variants={fadeIn}
            >
              Built with sBTC • Powered by AI • Shielded by Rebar
            </motion.p>
          </motion.div>
          
          <motion.div
            className="relative h-[400px] lg:h-[500px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div 
              className="absolute w-full h-full flex items-center justify-center animate-float"
            >
              {/* Placeholder for the Bitcoin coin with orbiting data rings */}
              <div className="relative w-[300px] h-[300px]">
                {/* Bitcoin coin */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-40 h-40 rounded-full bg-[#F7931A] flex items-center justify-center text-white text-5xl font-bold shadow-[0_0_30px_rgba(247,147,26,0.5)]">
                    ₿
                  </div>
                </motion.div>
                
                {/* Orbiting elements */}
                <motion.div
                  className="absolute w-10 h-10 rounded-full bg-[#F7931A]/30 backdrop-blur-sm flex items-center justify-center shadow-lg"
                  animate={{
                    x: [0, 120, 0, -120, 0],
                    y: [-120, 0, 120, 0, -120],
                    transition: { repeat: Infinity, duration: 15, ease: "linear" }
                  }}
                >
                  <span className="text-white text-xs">AI</span>
                </motion.div>
                
                <motion.div
                  className="absolute w-12 h-12 rounded-full bg-[#13ADC7]/30 backdrop-blur-sm flex items-center justify-center shadow-lg"
                  animate={{
                    x: [0, -150, 0, 150, 0],
                    y: [150, 0, -150, 0, 150],
                    transition: { repeat: Infinity, duration: 20, ease: "linear" }
                  }}
                >
                  <span className="text-white text-xs">BTC</span>
                </motion.div>
                
                <motion.div
                  className="absolute w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg"
                  animate={{
                    x: [50, -100, 50, 100, 50],
                    y: [100, 50, -100, 50, 100],
                    transition: { repeat: Infinity, duration: 18, ease: "linear" }
                  }}
                >
                  <span className="text-white text-xs">L2</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-white/50 text-sm">Scroll to explore</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
