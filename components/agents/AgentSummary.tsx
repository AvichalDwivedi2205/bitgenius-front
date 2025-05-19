'use client';

import { useState } from 'react';
import { motion } from '@/components/motion';
import { fadeIn } from '@/components/motion/variants';

interface AgentSummaryProps {
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
  onDeploy: () => void;
  onBack: () => void;
}

export default function AgentSummary({ agentData, onDeploy, onBack }: AgentSummaryProps) {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploySuccess, setDeploySuccess] = useState(false);
  
  // Format trigger value for display
  const formatTriggerValue = () => {
    if (agentData.triggerType === 'schedule') {
      switch(agentData.triggerValue) {
        case '5m': return 'Every 5 minutes';
        case '15m': return 'Every 15 minutes';
        case '1h': return 'Hourly';
        case '6h': return 'Every 6 hours';
        case '12h': return 'Every 12 hours';
        case '24h': return 'Daily';
        case '168h': return 'Weekly';
        case '720h': return 'Monthly';
        default: return agentData.triggerValue;
      }
    } else {
      return agentData.triggerValue;
    }
  };
  
  // Handle deploy button click
  const handleDeploy = () => {
    setIsDeploying(true);
    
    // Simulate deployment
    setTimeout(() => {
      setIsDeploying(false);
      setDeploySuccess(true);
      
      // Show success state for 1.5 seconds before continuing
      setTimeout(() => {
        onDeploy();
      }, 1500);
    }, 2000);
  };

  // Calculate estimated fee
  const estimatedFee = agentData.feeStrategy === 'fast' ? 0.00025 : 0.00010;
  
  // Calculate estimated execution time
  const getEstimatedTime = () => {
    if (agentData.triggerType === 'schedule') {
      return 'Based on schedule';
    } else {
      return 'When conditions are met';
    }
  };
  
  // Calculate privacy strength
  const getPrivacyStrength = () => {
    if (!agentData.usePrivacy) return 'Not enabled';
    
    if (agentData.privacyLevel <= 3) return 'Basic';
    if (agentData.privacyLevel <= 6) return 'Strong';
    return 'Maximum';
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
      className="max-w-3xl mx-auto"
    >
      <motion.h2 
        variants={fadeIn}
        className="text-2xl font-bold mb-8 text-center"
      >
        Agent Summary & Deployment
      </motion.h2>
      
      <motion.div 
        variants={fadeIn}
        className="bg-[#181820] border border-white/5 rounded-2xl overflow-hidden mb-8"
      >
        {/* Agent Header */}
        <div className="bg-gradient-to-r from-[#F7931A]/10 to-[#13ADC7]/10 p-6 border-b border-white/5">
          <div className="flex items-center gap-4">
            {/* Agent Avatar */}
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#F7931A] to-[#13ADC7] flex items-center justify-center text-2xl shadow-glow">
              {agentData.goal.includes('DCA') ? '📊' : 
               agentData.goal.includes('Privacy') ? '🛡️' : 
               agentData.goal.includes('Price') ? '💰' : 
               agentData.goal.includes('Treasury') ? '🏦' : '🤖'}
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white">{agentData.name}</h3>
              <p className="text-white/70">{agentData.goal}</p>
            </div>
          </div>
        </div>
        
        {/* Agent Details */}
        <div className="p-6 space-y-8">
          {/* Trigger & Execution */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium border-b border-white/10 pb-2 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Trigger & Execution Logic
            </h4>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Trigger Type:</span>
                <span className="font-medium">{agentData.triggerType === 'schedule' ? 'Schedule-Based' : 'Threshold-Based'}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-white/70">Trigger Condition:</span>
                <span className="font-medium">{formatTriggerValue()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-white/70">Strategy Type:</span>
                <span className="font-medium">{agentData.strategy === 'predefined' ? 'Predefined Strategy' : 'Custom Strategy'}</span>
              </div>
              
              <div className="mt-2 pt-2 border-t border-white/5">
                <div className="bg-[#0B0C0F] rounded-lg p-3 text-sm text-white/80">
                  <p className="mb-1 font-medium">Plain English Summary:</p>
                  <p>This agent will {agentData.triggerType === 'schedule' ? 'run on a schedule' : 'run when conditions are met'} to {agentData.goal.toLowerCase()}. 
                  It will use {agentData.btcAmount} BTC per execution with {agentData.feeStrategy === 'fast' ? 'priority' : 'standard'} network fees.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Config & Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium border-b border-white/10 pb-2 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Security & Resources
            </h4>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Privacy Shield:</span>
                  <span className={`font-medium ${agentData.usePrivacy ? 'text-green-400' : 'text-white/40'}`}>
                    {agentData.usePrivacy ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                
                {agentData.usePrivacy && (
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Privacy Strength:</span>
                    <span className="font-medium">{getPrivacyStrength()}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Wallet Connection:</span>
                  <span className="font-medium text-green-400">Secure</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">BTC per Execution:</span>
                  <span className="font-medium text-[#F7931A]">{agentData.btcAmount} BTC</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Fee Strategy:</span>
                  <span className="font-medium">{agentData.feeStrategy === 'fast' ? 'Fast Confirmation' : 'Low Fee'}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Est. Network Fee:</span>
                  <span className="font-medium text-[#F7931A]">{estimatedFee.toFixed(5)} BTC</span>
                </div>
              </div>
            </div>
            
            <div className="mt-2 pt-2 border-t border-white/5">
              <div className="bg-[#0B0C0F] rounded-lg p-3 text-sm flex items-center justify-between">
                <span className="text-white/70">Estimated First Execution:</span>
                <span className="font-medium">{getEstimatedTime()}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Action Buttons */}
      <motion.div 
        variants={fadeIn}
        className="flex justify-between"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-white flex items-center gap-2"
          onClick={onBack}
          disabled={isDeploying || deploySuccess}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Configuration
        </motion.button>
        
        <motion.button
          whileHover={!isDeploying && !deploySuccess ? { scale: 1.05 } : {}}
          whileTap={!isDeploying && !deploySuccess ? { scale: 0.95 } : {}}
          className="px-6 py-3 rounded-lg text-white flex items-center gap-2 relative overflow-hidden"
          style={{
            background: !deploySuccess 
              ? 'linear-gradient(to right, #F7931A, #13ADC7)' 
              : 'linear-gradient(to right, #10B981, #059669)'
          }}
          onClick={handleDeploy}
          disabled={isDeploying || deploySuccess}
        >
          {/* Overlay for loading animation */}
          {isDeploying && (
            <motion.div 
              className="absolute inset-0 bg-white/10 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </motion.div>
          )}
          
          {/* Success State */}
          {deploySuccess ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              Agent Deployed Successfully!
              
              {/* Confetti Animation */}
              <motion.div
                className="absolute -top-10 left-1/2 transform -translate-x-1/2 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 50], x: [-20, 20, -10, 10, 0] }}
                transition={{ duration: 1.5, type: 'spring' }}
              >
                <div className="w-24 h-24 flex items-center justify-center">
                  <span className="text-3xl">🎉</span>
                </div>
              </motion.div>
            </>
          ) : (
            <>
              Deploy Agent
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
