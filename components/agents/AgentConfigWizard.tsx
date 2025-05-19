'use client';

import { useState } from 'react';
import { motion } from '@/components/motion';
import { fadeIn, staggerContainer } from '@/components/motion/variants';

interface AgentConfigWizardProps {
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
  updateAgentData: (data: Partial<AgentConfigWizardProps['agentData']>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function AgentConfigWizard({ agentData, updateAgentData, onNext, onBack }: AgentConfigWizardProps) {
  const [configStep, setConfigStep] = useState(1);
  const [showAiSuggestion, setShowAiSuggestion] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');

  // Function to handle step changes
  const changeStep = (step: number) => {
    // Simulate some validation before changing steps
    if (step > configStep && configStep === 1) {
      // Check if name is entered
      if (!agentData.name.trim()) {
        return;
      }
    }
    
    setConfigStep(step);
  };

  // Simulate AI suggestion after 1 second of typing
  const handleNameChange = (value: string) => {
    updateAgentData({ name: value });
    
    if (value.length > 3) {
      setShowAiSuggestion(false);
      setTimeout(() => {
        // Generate a suggestion based on the name
        let suggestion = '';
        if (value.toLowerCase().includes('dca')) {
          suggestion = 'Dollar-Cost Average';
        } else if (value.toLowerCase().includes('privacy') || value.toLowerCase().includes('mix')) {
          suggestion = 'Enhance Privacy';
        } else if (value.toLowerCase().includes('arbitrage')) {
          suggestion = 'Exploit Price Differences';
        } else if (value.toLowerCase().includes('treasury')) {
          suggestion = 'Track Treasury';
        } else {
          suggestion = 'Automate Bitcoin Management';
        }
        
        setAiSuggestion(suggestion);
        setShowAiSuggestion(true);
      }, 1000);
    }
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto"
    >
      {/* Tabs Navigation */}
      <div className="flex mb-8 border-b border-white/10">
        <TabButton 
          label="Agent Name & Goal" 
          isActive={configStep === 1} 
          onClick={() => changeStep(1)} 
          step={1} 
        />
        <TabButton 
          label="Trigger Conditions" 
          isActive={configStep === 2} 
          onClick={() => changeStep(2)} 
          step={2} 
        />
        <TabButton 
          label="Execution Logic" 
          isActive={configStep === 3} 
          onClick={() => changeStep(3)} 
          step={3} 
        />
        <TabButton 
          label="Privacy & Resources" 
          isActive={configStep === 4} 
          onClick={() => changeStep(4)} 
          step={4} 
        />
      </div>
      
      {/* Content Area */}
      <div className="bg-[#181820] border border-white/5 rounded-2xl p-8 min-h-[400px]">
        {/* Step 1: Name & Goal */}
        {configStep === 1 && (
          <motion.div
            variants={fadeIn}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6">Name Your Agent</h3>
            
            <div className="space-y-2">
              <label className="block text-white/80 mb-1">Agent Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={agentData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full bg-[#0B0C0F] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#13ADC7] focus:outline-none transition-colors"
                  placeholder="e.g., My Bitcoin DCA Bot"
                />
                
                {/* AI suggestion ghost text */}
                {showAiSuggestion && (
                  <motion.div 
                    className="mt-2 text-sm text-[#13ADC7] flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="w-4 h-4 rounded-full bg-[#13ADC7]/20 flex items-center justify-center">
                      <span className="text-xs">AI</span>
                    </span>
                    <span>Suggested goal: {aiSuggestion}</span>
                    <button
                      className="text-xs underline"
                      onClick={() => updateAgentData({ goal: aiSuggestion })}
                    >
                      Use
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
            
            <div className="space-y-2 mt-6">
              <label className="block text-white/80 mb-1">Agent Goal</label>
              <select
                value={agentData.goal}
                onChange={(e) => updateAgentData({ goal: e.target.value })}
                className="w-full bg-[#0B0C0F] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#13ADC7] focus:outline-none transition-colors"
              >
                <option value="">Select a goal...</option>
                <option value="Dollar-Cost Average">Dollar-Cost Average</option>
                <option value="Enhance Privacy">Enhance Privacy</option>
                <option value="Exploit Price Differences">Exploit Price Differences</option>
                <option value="Track Treasury">Track Treasury</option>
                <option value="Automate Bitcoin Management">Automate Bitcoin Management</option>
              </select>
            </div>
          </motion.div>
        )}
        
        {/* Step 2: Trigger Conditions */}
        {configStep === 2 && (
          <motion.div
            variants={fadeIn}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6">When Should This Agent Run?</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => updateAgentData({ triggerType: 'schedule' })}
                  className={`flex-1 py-3 px-4 rounded-lg border ${
                    agentData.triggerType === 'schedule' 
                      ? 'bg-gradient-to-r from-[#F7931A]/20 to-[#13ADC7]/20 border-[#13ADC7]' 
                      : 'bg-[#0B0C0F] border-white/10'
                  } transition-colors`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span className="font-medium">Schedule Based</span>
                  </div>
                  <p className="text-xs text-white/60">Run at regular intervals</p>
                </button>
                
                <button
                  onClick={() => updateAgentData({ triggerType: 'threshold' })}
                  className={`flex-1 py-3 px-4 rounded-lg border ${
                    agentData.triggerType === 'threshold' 
                      ? 'bg-gradient-to-r from-[#F7931A]/20 to-[#13ADC7]/20 border-[#13ADC7]' 
                      : 'bg-[#0B0C0F] border-white/10'
                  } transition-colors`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="2" x2="12" y2="6"></line>
                      <line x1="12" y1="18" x2="12" y2="22"></line>
                      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                      <line x1="2" y1="12" x2="6" y2="12"></line>
                      <line x1="18" y1="12" x2="22" y2="12"></line>
                      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                    </svg>
                    <span className="font-medium">Threshold Based</span>
                  </div>
                  <p className="text-xs text-white/60">Run when conditions are met</p>
                </button>
              </div>
              
              {/* Schedule input */}
              {agentData.triggerType === 'schedule' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <label className="block text-white/80 mb-2">Run Frequency</label>
                  <select
                    value={agentData.triggerValue}
                    onChange={(e) => updateAgentData({ triggerValue: e.target.value })}
                    className="w-full bg-[#0B0C0F] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#13ADC7] focus:outline-none transition-colors"
                  >
                    <option value="">Select frequency...</option>
                    <option value="5m">Every 5 minutes</option>
                    <option value="15m">Every 15 minutes</option>
                    <option value="1h">Hourly</option>
                    <option value="6h">Every 6 hours</option>
                    <option value="12h">Every 12 hours</option>
                    <option value="24h">Daily</option>
                    <option value="168h">Weekly</option>
                    <option value="720h">Monthly</option>
                  </select>
                </motion.div>
              )}
              
              {/* Threshold input */}
              {agentData.triggerType === 'threshold' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <label className="block text-white/80 mb-2">Trigger Condition</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={agentData.triggerValue}
                      onChange={(e) => updateAgentData({ triggerValue: e.target.value })}
                      className="w-full bg-[#0B0C0F] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#13ADC7] focus:outline-none transition-colors"
                      placeholder="e.g., btc_price < 40000 || wallet_balance > 0.1"
                    />
                    
                    {/* Expression Builder Button */}
                    <button 
                      className="absolute right-3 top-3 text-[#13ADC7] hover:text-[#F7931A] transition-colors text-sm bg-[#13ADC7]/10 px-2 py-1 rounded"
                    >
                      Expression Builder
                    </button>
                  </div>
                  
                  {/* Examples */}
                  <div className="mt-2 text-xs text-white/60">
                    <p>Examples:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li><code className="bg-white/5 px-1 py-0.5 rounded">btc_price {'<'} 40000</code> - When BTC price falls below $40k</li>
                      <li><code className="bg-white/5 px-1 py-0.5 rounded">wallet_balance {'>'} 0.1</code> - When wallet contains more than 0.1 BTC</li>
                      <li><code className="bg-white/5 px-1 py-0.5 rounded">price_change_24h {'<'} -5%</code> - When BTC drops more than 5% in 24h</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
        
        {/* Step 3: Execution Logic */}
        {configStep === 3 && (
          <motion.div
            variants={fadeIn}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6">What Should Your Agent Do?</h3>
            
            <div className="space-y-4">
              {/* Strategy Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => updateAgentData({ strategy: 'predefined' })}
                  className={`py-3 px-4 rounded-lg border ${
                    agentData.strategy === 'predefined' 
                      ? 'bg-gradient-to-r from-[#F7931A]/20 to-[#13ADC7]/20 border-[#13ADC7]' 
                      : 'bg-[#0B0C0F] border-white/10'
                  } transition-colors text-left`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    </svg>
                    <span className="font-medium">Use Predefined Strategy</span>
                  </div>
                  <p className="text-xs text-white/60">Simple, pre-built strategies</p>
                </button>
                
                <button
                  onClick={() => updateAgentData({ strategy: 'custom' })}
                  className={`py-3 px-4 rounded-lg border ${
                    agentData.strategy === 'custom' 
                      ? 'bg-gradient-to-r from-[#F7931A]/20 to-[#13ADC7]/20 border-[#13ADC7]' 
                      : 'bg-[#0B0C0F] border-white/10'
                  } transition-colors text-left`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    <span className="font-medium">Build Custom Strategy</span>
                  </div>
                  <p className="text-xs text-white/60">Advanced block-based builder</p>
                </button>
              </div>
              
              {/* Logic Builder Area */}
              <div className="mt-6">
                {agentData.strategy === 'predefined' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="block text-white/80 mb-2">Select Strategy</label>
                    <select
                      className="w-full bg-[#0B0C0F] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#13ADC7] focus:outline-none transition-colors"
                    >
                      <option value="">Choose a predefined strategy...</option>
                      <option value="dca">Dollar-Cost Average (Buy $X of BTC every Y period)</option>
                      <option value="rebalance">Auto-Rebalance (Keep X% in cold storage)</option>
                      <option value="mixed">Privacy Mix (Route through Rebar Shield)</option>
                      <option value="liquidity">Provide Liquidity (Stake in yield protocol)</option>
                    </select>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border border-dashed border-white/20 rounded-lg p-4 min-h-[200px] bg-[#0B0C0F]/50"
                  >
                    <div className="text-center py-10">
                      <h4 className="text-lg font-medium mb-2">Block-Based Strategy Builder</h4>
                      <p className="text-white/60 text-sm mb-4">Drag and drop blocks to build your strategy</p>
                      
                      <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                        {['Buy BTC', 'Sell BTC', 'Transfer', 'Wait', 'IF Condition', 'Shield'].map(block => (
                          <div 
                            key={block}
                            className="px-3 py-2 bg-[#181820] border border-white/10 rounded text-sm cursor-grab hover:border-[#13ADC7] hover:shadow-glow-sm transition-all"
                          >
                            {block}
                          </div>
                        ))}
                      </div>
                      
                      <p className="text-white/60 text-sm mt-6">Or select a template to start with</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Step 4: Privacy & Resources */}
        {configStep === 4 && (
          <motion.div
            variants={fadeIn}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6">Privacy & Resource Settings</h3>
            
            <div className="space-y-8">
              {/* Privacy Section */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium border-b border-white/10 pb-2">Privacy Settings</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Use Rebar Shield</p>
                    <p className="text-sm text-white/60">Route transactions through privacy layer</p>
                  </div>
                  
                  <div className="relative inline-block w-12 h-6">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="opacity-0 w-0 h-0"
                      checked={agentData.usePrivacy}
                      onChange={(e) => updateAgentData({ usePrivacy: e.target.checked })}
                    />
                    <label
                      htmlFor="toggle"
                      className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors ${
                        agentData.usePrivacy ? 'bg-[#13ADC7]' : 'bg-white/20'
                      }`}
                    >
                      <span 
                        className={`absolute left-1 bottom-1 bg-white rounded-full w-4 h-4 transition-transform ${
                          agentData.usePrivacy ? 'transform translate-x-6' : ''
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
                
                {agentData.usePrivacy && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <label className="block text-white/80 mb-2">Privacy Level (Higher = More Anonymous)</label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="range" 
                        min="1" 
                        max="10" 
                        value={agentData.privacyLevel} 
                        onChange={(e) => updateAgentData({ privacyLevel: parseInt(e.target.value) })}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#13ADC7]" 
                      />
                      <span className="bg-[#13ADC7]/20 text-[#13ADC7] px-2 py-1 rounded font-medium">{agentData.privacyLevel}</span>
                    </div>
                    
                    <div className="flex justify-between text-xs text-white/40 mt-1">
                      <span>Faster</span>
                      <span>More Anonymous</span>
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Resource Allocation */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium border-b border-white/10 pb-2">Resource Allocation</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 mb-2">BTC Amount per Execution</label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="range" 
                        min="0.001" 
                        max="0.1" 
                        step="0.001"
                        value={agentData.btcAmount} 
                        onChange={(e) => updateAgentData({ btcAmount: parseFloat(e.target.value) })}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#F7931A]" 
                      />
                      <span className="bg-[#F7931A]/20 text-[#F7931A] px-2 py-1 rounded font-medium">{agentData.btcAmount} BTC</span>
                    </div>
                    
                    <div className="flex justify-between text-xs text-white/40 mt-1">
                      <span>0.001 BTC</span>
                      <span>0.1 BTC</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-white/80 mb-2">Fee Strategy</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => updateAgentData({ feeStrategy: 'low' })}
                        className={`py-2 px-3 rounded-lg border text-center ${
                          agentData.feeStrategy === 'low' 
                            ? 'bg-gradient-to-r from-[#F7931A]/20 to-[#13ADC7]/20 border-[#13ADC7]' 
                            : 'bg-[#0B0C0F] border-white/10'
                        } transition-colors`}
                      >
                        <div className="font-medium mb-1">Low Fee</div>
                        <p className="text-xs text-white/60">Slower confirmation</p>
                      </button>
                      
                      <button
                        onClick={() => updateAgentData({ feeStrategy: 'fast' })}
                        className={`py-2 px-3 rounded-lg border text-center ${
                          agentData.feeStrategy === 'fast' 
                            ? 'bg-gradient-to-r from-[#F7931A]/20 to-[#13ADC7]/20 border-[#13ADC7]' 
                            : 'bg-[#0B0C0F] border-white/10'
                        } transition-colors`}
                      >
                        <div className="font-medium mb-1">Fast Confirm</div>
                        <p className="text-xs text-white/60">Higher fee rate</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-white flex items-center gap-2"
          onClick={configStep === 1 ? onBack : () => changeStep(configStep - 1)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          {configStep === 1 ? 'Back to Templates' : 'Previous'}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-[#F7931A] to-[#13ADC7] rounded-lg text-white flex items-center gap-2"
          onClick={configStep === 4 ? onNext : () => changeStep(configStep + 1)}
        >
          {configStep === 4 ? 'Review & Deploy' : 'Continue'}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  step: number;
}

function TabButton({ label, isActive, onClick, step }: TabButtonProps) {
  return (
    <button
      className={`px-4 py-3 border-b-2 transition-colors ${
        isActive 
          ? 'border-[#13ADC7] text-white' 
          : 'border-transparent text-white/50 hover:text-white/80'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <span className={`w-5 h-5 rounded-full ${isActive ? 'bg-[#13ADC7]' : 'bg-white/10'} flex items-center justify-center text-xs`}>
          {step}
        </span>
        <span>{label}</span>
      </div>
    </button>
  );
}
