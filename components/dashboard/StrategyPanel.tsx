'use client';

import { useState } from 'react';
import { motion } from '../motion';
import { fadeIn } from '../motion/variants';

export default function StrategyPanel() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const strategies = [
    { 
      id: 'dca',
      name: 'Dollar-Cost Averaging', 
      icon: '📊',
      description: 'Automatically buy Bitcoin at regular intervals regardless of price.'
    },
    { 
      id: 'hedge',
      name: 'Volatility Hedge', 
      icon: '🛡️',
      description: 'Protect your portfolio from downside risk during market volatility.' 
    },
    { 
      id: 'yield',
      name: 'Yield Optimizer', 
      icon: '💰',
      description: 'Automatically move your Bitcoin to highest yielding protocols.' 
    }
  ];
  
  const steps = [
    { title: 'Select Strategy', description: 'Choose an automated strategy for your Bitcoin' },
    { title: 'Configure', description: 'Set parameters and thresholds for your agent' },
    { title: 'Review & Deploy', description: 'Confirm settings and activate your agent' }
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowConfirmation(true);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleDeploy = () => {
    // Simulate deployment
    setShowConfirmation(false);
    // Could add some success indication here
  };

  return (
    <motion.div 
      className="bg-[#181820] rounded-2xl p-6 border border-white/5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold text-white mb-1">Deploy New Strategy</h3>
      <p className="text-white/60 text-sm mb-6">Create an automated agent to manage your Bitcoin</p>
      
      {/* Step indicator */}
      <div className="flex mb-6 relative">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 relative">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                currentStep >= index 
                  ? 'bg-gradient-to-r from-[#F7931A] to-[#13ADC7] text-white'
                  : 'bg-[#14141A] text-white/40 border border-white/10'
              }`}>
                {currentStep > index ? (
                  <i className="bx bx-check text-lg"></i>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <div className="text-xs mt-2 text-center">
                <p className={currentStep >= index ? 'text-white' : 'text-white/40'}>
                  {step.title}
                </p>
                <p className="text-white/40 hidden md:block">{step.description}</p>
              </div>
            </div>
            
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="absolute top-4 left-1/2 w-full h-0.5 bg-[#14141A]">
                <div 
                  className="h-full bg-gradient-to-r from-[#F7931A] to-[#13ADC7] transition-all duration-500"
                  style={{ width: currentStep > index ? '100%' : '0%' }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Step content */}
      <div className="min-h-[260px] mb-4">
        {/* Step 1: Select Strategy */}
        {currentStep === 0 && (
          <motion.div 
            className="space-y-3"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            {strategies.map((strategy) => (
              <motion.div
                key={strategy.id}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedStrategy === strategy.id
                    ? 'bg-[#14141A] border-[#13ADC7] shadow-glow'
                    : 'bg-[#14141A]/50 border-white/5 hover:border-white/20'
                }`}
                onClick={() => setSelectedStrategy(strategy.id)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{strategy.icon}</div>
                  <div>
                    <h4 className="font-medium text-white">{strategy.name}</h4>
                    <p className="text-sm text-white/60">{strategy.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Step 2: Configure */}
        {currentStep === 1 && (
          <motion.div 
            className="space-y-4"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-[#14141A]/70 p-4 rounded-xl border border-white/5">
              <h4 className="font-medium text-white mb-3">Trigger Settings</h4>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-white/70 mb-1 block">Trigger Type</label>
                  <select className="w-full bg-[#14141A] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#13ADC7]/50">
                    <option value="scheduled">Scheduled (Time-based)</option>
                    <option value="price">Price Movement</option>
                    <option value="threshold">Threshold</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm text-white/70 mb-1 block">Frequency</label>
                  <select className="w-full bg-[#14141A] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#13ADC7]/50">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="bg-[#14141A]/70 p-4 rounded-xl border border-white/5">
              <h4 className="font-medium text-white mb-3">Amount Settings</h4>
              
              <div>
                <label className="text-sm text-white/70 mb-1 block">BTC Amount per Execution</label>
                <div className="flex items-center">
                  <input 
                    type="text" 
                    className="flex-1 bg-[#14141A] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#13ADC7]/50"
                    placeholder="0.001"
                  />
                  <span className="ml-2 text-[#F7931A] font-medium">BTC</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Step 3: Review & Deploy */}
        {currentStep === 2 && (
          <motion.div 
            className="space-y-4"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-[#14141A]/70 p-4 rounded-xl border border-white/5">
              <h4 className="font-medium text-white mb-3">Strategy Summary</h4>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">Strategy Type:</span>
                  <span className="text-white">Dollar-Cost Averaging</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Trigger:</span>
                  <span className="text-white">Scheduled (Weekly)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Amount:</span>
                  <span className="text-white">0.001 BTC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Status:</span>
                  <span className="text-green-400">Ready to deploy</span>
                </div>
              </div>
            </div>
            
            <div className="bg-[#14141A]/70 p-4 rounded-xl border border-white/5">
              <h4 className="font-medium text-white mb-2">Security Verification</h4>
              <p className="text-white/60 text-sm mb-3">Verify you want to allow this agent to execute transactions automatically</p>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="confirmCheck" className="rounded bg-[#14141A] border-white/20 text-[#13ADC7]" />
                <label htmlFor="confirmCheck" className="text-sm text-white/80">I confirm this agent can perform transactions on my behalf</label>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
            <motion.div 
              className="bg-[#181820] rounded-2xl border border-white/10 p-6 max-w-md w-full relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <button 
                className="absolute top-4 right-4 text-white/50 hover:text-white"
                onClick={() => setShowConfirmation(false)}
              >
                <i className="bx bx-x text-2xl"></i>
              </button>
              
              <div className="flex flex-col items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#13ADC7]/20 flex items-center justify-center mb-4">
                  <i className="bx bx-check text-4xl text-[#13ADC7]"></i>
                </div>
                <h3 className="text-xl font-bold text-white">Deploy DCA Agent</h3>
                <p className="text-white/60 text-center mt-2">Your agent will begin operating immediately after deployment</p>
              </div>
              
              <div className="space-y-2 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">Weekly Purchase:</span>
                  <span className="text-white">0.001 BTC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">First Execution:</span>
                  <span className="text-white">Today at 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Gas Fees:</span>
                  <span className="text-white">~0.00001 BTC</span>
                </div>
              </div>
              
              <div className="flex gap-4">
                <motion.button
                  className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-white/80 hover:text-white hover:border-white/30 transition-colors"
                  onClick={() => setShowConfirmation(false)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#F7931A] to-[#13ADC7] text-white font-medium"
                  onClick={handleDeploy}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Deploy Now
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between">
        <motion.button
          className={`px-4 py-2 rounded-xl border ${
            currentStep === 0
              ? 'border-white/5 text-white/30 cursor-not-allowed'
              : 'border-white/20 text-white hover:border-white/40 transition-colors'
          }`}
          onClick={handlePrevious}
          disabled={currentStep === 0}
          whileHover={currentStep > 0 ? { scale: 1.03 } : {}}
          whileTap={currentStep > 0 ? { scale: 0.98 } : {}}
        >
          Previous
        </motion.button>
        
        <motion.button
          className={`px-4 py-2 rounded-xl ${
            (currentStep === 0 && !selectedStrategy)
              ? 'bg-white/10 text-white/30 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#F7931A] to-[#13ADC7] text-white'
          }`}
          onClick={handleNext}
          disabled={currentStep === 0 && !selectedStrategy}
          whileHover={!(currentStep === 0 && !selectedStrategy) ? { scale: 1.03 } : {}}
          whileTap={!(currentStep === 0 && !selectedStrategy) ? { scale: 0.98 } : {}}
        >
          {currentStep < steps.length - 1 ? 'Next' : 'Deploy Agent'}
        </motion.button>
      </div>
    </motion.div>
  );
}
