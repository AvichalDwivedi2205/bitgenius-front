'use client';

import { useState, useEffect } from 'react';
import { motion } from '@/components/motion';

interface AiHelpPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentStep: 'template' | 'config' | 'summary';
  agentData: {
    name: string;
    goal: string;
    triggerType: string;
    triggerValue: string;
    strategy: string;
    usePrivacy: boolean;
    privacyLevel: number;
    btcAmount: number;
    feeStrategy: string;
  };
}

export default function AiHelpPanel({ isOpen, onClose, currentStep, agentData }: AiHelpPanelProps) {
  const [tipIndex, setTipIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [visibleText, setVisibleText] = useState('');
  const [currentTipText, setCurrentTipText] = useState('');
  
  // Get contextual tips based on current step and agent data
  const getTips = () => {
    if (currentStep === 'template') {
      return [
        "Choose a template that best matches your automation goal. You can customize everything later.",
        "DCA Bots are perfect for consistently accumulating Bitcoin without timing the market.",
        "Privacy Mixers help obfuscate your transaction history for enhanced financial privacy.",
        "Arbitrage Hunters can help you profit from price differences between exchanges and L2s."
      ];
    } else if (currentStep === 'config') {
      if (agentData.triggerType === 'threshold') {
        return [
          "Threshold conditions let your agent react to market changes in real-time.",
          "You can use complex logical expressions with AND (&&) and OR (||) operators.",
          "Available variables include: btc_price, wallet_balance, price_change_24h, and more.",
          "Example: wallet_balance > 0.1 && btc_price < 40000"
        ];
      } else {
        return [
          "Schedule-based agents run at regular intervals regardless of market conditions.",
          "For DCA strategies, weekly or monthly schedules often work best.",
          "Shorter intervals like hourly are better for arbitrage hunting.",
          "Consider your fee budget when choosing the frequency of execution."
        ];
      }
    } else {
      return [
        "Review all settings carefully before deploying your agent.",
        "Your agent will run automatically based on your configured triggers.",
        "You can monitor and modify your agent after deployment.",
        "Rebar Shield can increase privacy but may slightly increase transaction times."
      ];
    }
  };
  
  const tips = getTips();
  
  // Typewriter effect for tips
  useEffect(() => {
    setIsTyping(true);
    setCurrentTipText(tips[tipIndex]);
    setVisibleText('');
    
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < tips[tipIndex].length) {
        setVisibleText(prev => prev + tips[tipIndex][i]);
        i++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, 20);
    
    return () => clearInterval(typeInterval);
  }, [tipIndex, currentStep]);
  
  // Show next tip
  const showNextTip = () => {
    setTipIndex((prev) => (prev + 1) % tips.length);
  };
  
  // Show previous tip
  const showPrevTip = () => {
    setTipIndex((prev) => (prev - 1 + tips.length) % tips.length);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed right-0 top-0 bottom-0 w-80 bg-[#181820] border-l border-white/10 shadow-xl z-30 flex flex-col"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
    >
      {/* Panel Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#F7931A] to-[#13ADC7] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <h3 className="font-bold text-white">AI Assistant</h3>
        </div>
        
        <button 
          className="text-white/60 hover:text-white transition-colors"
          onClick={onClose}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      {/* Tips Section */}
      <div className="p-4 flex-1 overflow-auto">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
          Tips for {currentStep === 'template' ? 'Choosing Templates' : currentStep === 'config' ? 'Configuration' : 'Review & Deploy'}
        </h4>
        
        <div className="bg-[#0B0C0F] border border-white/5 rounded-lg p-4 min-h-[120px] relative overflow-hidden">
          {/* Pulsing dot for "typing" effect */}
          <p className="text-white/90">{visibleText}</p>
          
          {isTyping && (
            <span className="inline-block w-2 h-5 ml-1 bg-[#13ADC7] animate-pulse"></span>
          )}
          
          {/* Tip pagination */}
          <div className="absolute bottom-2 right-3 flex items-center gap-2 text-xs text-white/60">
            <span>{tipIndex + 1}/{tips.length}</span>
          </div>
        </div>
        
        <div className="flex justify-between mt-3">
          <button 
            className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-sm"
            onClick={showPrevTip}
          >
            Previous Tip
          </button>
          <button 
            className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-sm"
            onClick={showNextTip}
          >
            Next Tip
          </button>
        </div>
      </div>
      
      {/* Contextual Help Section */}
      <div className="p-4 border-t border-white/10">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="17 11 12 6 7 11"></polyline>
            <polyline points="17 18 12 13 7 18"></polyline>
          </svg>
          Quick Links
        </h4>
        
        <div className="space-y-2">
          <a href="#" className="block px-4 py-2 bg-[#0B0C0F] hover:bg-[#13ADC7]/10 border border-white/5 hover:border-[#13ADC7]/30 rounded-lg transition-colors text-sm flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            Agent Creation Guide
          </a>
          <a href="#" className="block px-4 py-2 bg-[#0B0C0F] hover:bg-[#13ADC7]/10 border border-white/5 hover:border-[#13ADC7]/30 rounded-lg transition-colors text-sm flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Trigger Expression Docs
          </a>
          <a href="#" className="block px-4 py-2 bg-[#0B0C0F] hover:bg-[#13ADC7]/10 border border-white/5 hover:border-[#13ADC7]/30 rounded-lg transition-colors text-sm flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
            Strategy Templates
          </a>
          <a href="#" className="block px-4 py-2 bg-[#0B0C0F] hover:bg-[#13ADC7]/10 border border-white/5 hover:border-[#13ADC7]/30 rounded-lg transition-colors text-sm flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
              <rect x="9" y="9" width="6" height="6"></rect>
              <line x1="9" y1="1" x2="9" y2="4"></line>
              <line x1="15" y1="1" x2="15" y2="4"></line>
              <line x1="9" y1="20" x2="9" y2="23"></line>
              <line x1="15" y1="20" x2="15" y2="23"></line>
              <line x1="20" y1="9" x2="23" y2="9"></line>
              <line x1="20" y1="14" x2="23" y2="14"></line>
              <line x1="1" y1="9" x2="4" y2="9"></line>
              <line x1="1" y1="14" x2="4" y2="14"></line>
            </svg>
            Understanding Rebar Privacy
          </a>
        </div>
      </div>
      
      {/* Ask AI Question */}
      <div className="p-4 border-t border-white/10">
        <div className="relative">
          <input 
            type="text" 
            className="w-full bg-[#0B0C0F] border border-white/10 rounded-lg pl-4 pr-10 py-2 text-white text-sm focus:border-[#13ADC7] focus:outline-none transition-colors"
            placeholder="Ask AI for help..."
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#13ADC7]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
