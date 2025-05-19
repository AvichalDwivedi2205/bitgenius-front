'use client';

import { useState, useEffect } from 'react';
import { motion } from '../motion';
import { fadeIn } from '../motion/variants';

export default function DashboardHeader() {
  const [balance, setBalance] = useState(0);
  const [targetBalance] = useState(2.3456);
  const [activeAgents, setActiveAgents] = useState(0);
  const [targetActiveAgents] = useState(3);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  useEffect(() => {
    // Animate balance counter
    const balanceTimer = setTimeout(() => {
      const step = targetBalance / 40;
      setBalance(prev => {
        if (prev < targetBalance) {
          return Math.min(prev + step, targetBalance);
        }
        return prev;
      });
    }, 25);
    
    // Animate agent counter
    const agentTimer = setTimeout(() => {
      setActiveAgents(prev => {
        if (prev < targetActiveAgents) {
          return prev + 1;
        }
        return prev;
      });
    }, 300);
    
    return () => {
      clearTimeout(balanceTimer);
      clearTimeout(agentTimer);
    };
  }, [balance, targetBalance, activeAgents, targetActiveAgents]);
  
  const quickActions = [
    { label: "Deploy New Agent", icon: "bx-bot", action: () => console.log("Deploy Agent") },
    { label: "Connect Wallet", icon: "bx-wallet", action: () => console.log("Connect Wallet") },
    { label: "Configure Strategy", icon: "bx-cog", action: () => console.log("Configure Strategy") },
    { label: "Withdraw BTC", icon: "bx-export", action: () => console.log("Withdraw BTC") }
  ];

  return (
    <motion.div 
      className="bg-[#181820] rounded-2xl p-6 border border-white/5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row justify-between gap-6">
        {/* Left: Balance and Status */}
        <div className="flex flex-col gap-3">
          <p className="text-white/70 text-sm">Total Balance</p>
          <div className="flex items-end gap-2">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {balance.toFixed(4)}
            </h2>
            <span className="text-[#F7931A] font-medium mb-1">BTC</span>
          </div>
          <div className="flex gap-3 mt-1">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-white/70 text-sm">{activeAgents} Active Agents</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#13ADC7]"></div>
              <span className="text-white/70 text-sm">Network Connected</span>
            </div>
          </div>
        </div>
        
        {/* Right: Quick Actions */}
        <div className="relative">
          <motion.button
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#F7931A]/80 to-[#13ADC7]/80 hover:from-[#F7931A] hover:to-[#13ADC7] text-white font-medium flex items-center gap-2"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <i className="bx bx-plus"></i>
            Quick Actions
            <i className={`bx bx-chevron-down transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}></i>
          </motion.button>
          
          {isDropdownOpen && (
            <motion.div 
              className="absolute right-0 mt-2 w-56 bg-[#14141A] rounded-xl shadow-lg border border-white/5 overflow-hidden z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {quickActions.map((action, index) => (
                <motion.button
                  key={index}
                  className="w-full px-4 py-3 flex items-center gap-2 text-white/80 hover:text-white hover:bg-white/5 transition-colors text-left"
                  onClick={() => {
                    action.action();
                    setIsDropdownOpen(false);
                  }}
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <i className={`bx ${action.icon}`}></i>
                  {action.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Balance history chart placeholder */}
      <motion.div 
        className="h-12 mt-4 w-full bg-[#14141A] rounded-xl overflow-hidden relative"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        {/* Animated sparkline chart */}
        <div className="absolute inset-0 flex items-end">
          {Array(40).fill(0).map((_, i) => (
            <motion.div
              key={i}
              className="w-full h-full bg-gradient-to-t from-[#F7931A]/20 to-transparent"
              style={{ 
                height: `${20 + Math.sin(i * 0.3) * 15 + Math.cos(i * 0.2) * 15}%`,
                opacity: 0.7
              }}
              initial={{ height: '0%' }}
              animate={{ height: `${20 + Math.sin(i * 0.3) * 15 + Math.cos(i * 0.2) * 15}%` }}
              transition={{ duration: 1, delay: i * 0.03 }}
            />
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F7931A]/40"></div>
      </motion.div>
    </motion.div>
  );
}
