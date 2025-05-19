'use client';

import { useState } from 'react';
import { motion } from '@/components/motion';
import Navbar from '@/components/Navbar';
import AgentTemplateSelector from '@/components/agents/AgentTemplateSelector';
import AgentConfigWizard from '@/components/agents/AgentConfigWizard';
import AgentSummary from '@/components/agents/AgentSummary';
import AiHelpPanel from '@/components/agents/AiHelpPanel';
import { staggerContainer, fadeIn } from '@/components/motion/variants';

export default function CreateAgentPage() {
  const [currentStep, setCurrentStep] = useState<'template' | 'config' | 'summary'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isHelpPanelOpen, setIsHelpPanelOpen] = useState(false);
  const [agentData, setAgentData] = useState({
    name: '',
    goal: '',
    triggerType: 'schedule',
    triggerValue: '',
    strategy: '',
    usePrivacy: false,
    privacyLevel: 7,
    btcAmount: 0.01,
    feeStrategy: 'low'
  });

  // Move to the next step
  const goToNextStep = () => {
    if (currentStep === 'template') {
      setCurrentStep('config');
    } else if (currentStep === 'config') {
      setCurrentStep('summary');
    }
  };

  // Go back to the previous step
  const goToPreviousStep = () => {
    if (currentStep === 'config') {
      setCurrentStep('template');
    } else if (currentStep === 'summary') {
      setCurrentStep('config');
    }
  };

  // Update agent data
  const updateAgentData = (newData: Partial<typeof agentData>) => {
    setAgentData(prev => ({ ...prev, ...newData }));
  };

  // Select a template
  const selectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    
    // Pre-fill some data based on template
    if (templateId === 'dca') {
      updateAgentData({
        name: 'My DCA Bot',
        goal: 'Dollar-Cost Average',
        triggerType: 'schedule',
        triggerValue: '24h',
        strategy: 'dca',
        usePrivacy: true,
        btcAmount: 0.001
      });
    } else if (templateId === 'privacy') {
      updateAgentData({
        name: 'Privacy Mixer',
        goal: 'Enhance Privacy',
        triggerType: 'threshold',
        triggerValue: 'wallet_balance > 0.1',
        strategy: 'privacy',
        usePrivacy: true,
        privacyLevel: 9,
        btcAmount: 0.05
      });
    } else if (templateId === 'arbitrage') {
      updateAgentData({
        name: 'Arbitrage Hunter',
        goal: 'Exploit Price Differences',
        triggerType: 'threshold',
        triggerValue: 'price_difference > 1.5%',
        strategy: 'arbitrage',
        usePrivacy: false,
        btcAmount: 0.025
      });
    } else if (templateId === 'treasury') {
      updateAgentData({
        name: 'Treasury Tracker',
        goal: 'Track Treasury',
        triggerType: 'schedule',
        triggerValue: '12h',
        strategy: 'treasury',
        usePrivacy: false,
        btcAmount: 0
      });
    }
    
    goToNextStep();
  };

  // Deploy the agent
  const deployAgent = () => {
    // Simulate deployment
    console.log('Deploying agent:', agentData);
    // Here you would send the data to your API
    
    // After successful deployment, redirect to agents page
    // For now, just go back to first step
    setCurrentStep('template');
    setSelectedTemplate(null);
    setAgentData({
      name: '',
      goal: '',
      triggerType: 'schedule',
      triggerValue: '',
      strategy: '',
      usePrivacy: false,
      privacyLevel: 7,
      btcAmount: 0.01,
      feeStrategy: 'low'
    });
  };

  // Toggle help panel
  const toggleHelpPanel = () => {
    setIsHelpPanelOpen(!isHelpPanelOpen);
  };

  return (
    <div className="min-h-screen bg-[#0B0C0F] text-white relative">
      <Navbar />
      
      <main className="container mx-auto max-w-7xl px-4 pt-24 pb-24">
        {/* Page Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">Create Your Bitcoin Agent</h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Build an automated agent to manage your Bitcoin with custom rules, triggers, and actions.
          </p>
        </motion.div>
        
        {/* Steps Indicator */}
        <motion.div 
          className="flex items-center justify-center mb-12"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <StepIndicator 
            step={1} 
            title="Choose Template" 
            isActive={currentStep === 'template'} 
            isDone={currentStep === 'config' || currentStep === 'summary'} 
          />
          <div className={`w-20 h-0.5 ${currentStep === 'template' ? 'bg-white/20' : 'bg-[#13ADC7]'}`}></div>
          
          <StepIndicator 
            step={2} 
            title="Configure" 
            isActive={currentStep === 'config'} 
            isDone={currentStep === 'summary'} 
          />
          <div className={`w-20 h-0.5 ${currentStep === 'summary' ? 'bg-[#13ADC7]' : 'bg-white/20'}`}></div>
          
          <StepIndicator 
            step={3} 
            title="Deploy" 
            isActive={currentStep === 'summary'} 
            isDone={false} 
          />
        </motion.div>
        
        {/* Main Content Area */}
        <div className="relative">
          {currentStep === 'template' && (
            <AgentTemplateSelector onSelectTemplate={selectTemplate} />
          )}
          
          {currentStep === 'config' && (
            <AgentConfigWizard 
              agentData={agentData} 
              updateAgentData={updateAgentData} 
              onNext={goToNextStep} 
              onBack={goToPreviousStep} 
            />
          )}
          
          {currentStep === 'summary' && (
            <AgentSummary 
              agentData={agentData} 
              onDeploy={deployAgent} 
              onBack={goToPreviousStep} 
            />
          )}
          
          {/* Help Button */}
          <motion.button
            className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-r from-[#F7931A] to-[#13ADC7] flex items-center justify-center shadow-lg z-20"
            whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(19, 173, 199, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleHelpPanel}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </motion.button>
        </div>
        
        {/* Help Panel */}
        <AiHelpPanel isOpen={isHelpPanelOpen} onClose={toggleHelpPanel} currentStep={currentStep} agentData={agentData} />
      </main>
    </div>
  );
}

// Step indicator component
const StepIndicator = ({ 
  step, 
  title, 
  isActive, 
  isDone 
}: { 
  step: number; 
  title: string; 
  isActive: boolean; 
  isDone: boolean;
}) => {
  return (
    <motion.div 
      className="flex flex-col items-center gap-2"
      variants={fadeIn}
    >
      <div 
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isActive
            ? 'bg-gradient-to-r from-[#F7931A] to-[#13ADC7] text-white'
            : isDone
            ? 'bg-[#13ADC7] text-white'
            : 'bg-white/10 text-white/50'
        }`}
      >
        {isDone ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        ) : (
          <span>{step}</span>
        )}
      </div>
      <span className={`text-sm ${isActive ? 'text-white' : 'text-white/50'}`}>{title}</span>
    </motion.div>
  );
};
