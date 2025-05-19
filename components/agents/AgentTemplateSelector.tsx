'use client';

import { motion } from '@/components/motion';
import { staggerContainer, fadeIn } from '@/components/motion/variants';

interface AgentTemplate {
  id: string;
  title: string;
  description: string;
  useCase: string;
  outcome: string;
  icon: string;
}

interface AgentTemplateSelectorProps {
  onSelectTemplate: (templateId: string) => void;
}

export default function AgentTemplateSelector({ onSelectTemplate }: AgentTemplateSelectorProps) {
  // Pre-defined agent templates
  const templates: AgentTemplate[] = [
    {
      id: 'dca',
      title: 'Auto DCA Bot',
      description: 'Automatically purchase Bitcoin at regular intervals regardless of price',
      useCase: 'Accumulate BTC steadily over time',
      outcome: 'Reduces impact of volatility through dollar-cost averaging',
      icon: '📊'
    },
    {
      id: 'privacy',
      title: 'Privacy Mixer',
      description: 'Mix your Bitcoin through Rebar Shield to enhance privacy',
      useCase: 'Mask transaction history and sources',
      outcome: 'Enhanced privacy for your Bitcoin holdings',
      icon: '🛡️'
    },
    {
      id: 'arbitrage',
      title: 'Arbitrage Hunter',
      description: 'Exploit price differences across exchanges and L2s',
      useCase: 'Profit from market inefficiencies',
      outcome: 'Automated profit from price discrepancies',
      icon: '💰'
    },
    {
      id: 'treasury',
      title: 'Treasury Tracker',
      description: 'Monitor and manage your Bitcoin treasury with alerts',
      useCase: 'Corporate/DAO treasury management',
      outcome: 'Optimized treasury allocation and risk management',
      icon: '🏦'
    },
    {
      id: 'custom',
      title: 'Custom Agent',
      description: 'Build a completely custom agent from scratch',
      useCase: 'Advanced or unique use cases',
      outcome: 'Fully customized Bitcoin automation',
      icon: '➕'
    }
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl font-bold mb-8 text-center">Choose an Agent Template</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {templates.map((template) => (
          <TemplateCard 
            key={template.id}
            template={template}
            onSelect={() => onSelectTemplate(template.id)}
          />
        ))}
      </div>
    </motion.div>
  );
}

interface TemplateCardProps {
  template: AgentTemplate;
  onSelect: () => void;
}

function TemplateCard({ template, onSelect }: TemplateCardProps) {
  return (
    <motion.div
      variants={fadeIn}
      className="bg-[#181820] border border-white/5 rounded-2xl p-6 cursor-pointer group relative overflow-hidden"
      whileHover={{ 
        y: -5, 
        boxShadow: "0 10px 30px -15px rgba(19, 173, 199, 0.3)",
        borderColor: "rgba(19, 173, 199, 0.3)",
      }}
      onClick={onSelect}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F7931A]/0 to-[#13ADC7]/0 group-hover:from-[#F7931A]/5 group-hover:to-[#13ADC7]/5 transition-opacity duration-300"></div>
      
      <div className="text-4xl mb-4">{template.icon}</div>
      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#13ADC7] transition-colors">{template.title}</h3>
      <p className="text-white/70 mb-4">{template.description}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-start gap-2">
          <span className="text-[#F7931A] text-sm">Use Case:</span>
          <span className="text-white/80 text-sm">{template.useCase}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-[#13ADC7] text-sm">Outcome:</span>
          <span className="text-white/80 text-sm">{template.outcome}</span>
        </div>
      </div>
      
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#F7931A] to-[#13ADC7]"
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Select button */}
      <motion.button 
        className="w-full py-2 mt-4 rounded-lg bg-white/5 border border-white/10 text-white font-medium transition-all group-hover:bg-gradient-to-r group-hover:from-[#F7931A] group-hover:to-[#13ADC7] group-hover:border-transparent"
        whileTap={{ scale: 0.95 }}
      >
        Select Template
      </motion.button>
    </motion.div>
  );
}
