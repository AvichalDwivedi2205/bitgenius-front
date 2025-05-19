'use client';

import { useState, useEffect } from "react";
import { motion } from '@/components/motion';
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import { staggerContainer, fadeIn } from '@/components/motion/variants';

// What is BitGenius Section
const WhatIsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2
  });
  
  const steps = [
    {
      icon: "🔌",
      title: "Connect your BTC Wallet + Income Sources",
      description: "Connect your Bitcoin wallet and other financial sources securely through sBTC integrations and Layer 2 solutions."
    },
    {
      icon: "🤖",
      title: "Create AI Agents to Automate Saving, Hedging, Yield",
      description: "Build intelligent agents with customizable rules to automatically manage your Bitcoin based on your preferences."
    },
    {
      icon: "📊",
      title: "Track Agent Logs & AI Summaries in Real Time",
      description: "Monitor performance with real-time analytics and AI explanations of every automated action your agents take."
    }
  ];
  
  return (
    <section id="what-is" className="py-20 px-4 overflow-hidden" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What is BitGenius</h2>
          <p className="text-white/70 max-w-2xl mx-auto">The future of Bitcoin automation, combining AI agents with Layer 2 solutions for financial sovereignty.</p>
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-6 md:gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-[#181820] p-6 md:p-8 rounded-2xl flex-1 border border-white/5 hover:border-[#F7931A]/40 transition-all relative group"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(247, 147, 26, 0.3)" }}
            >
              <div className="absolute -right-2 -top-2 w-10 h-10 bg-[#0B0C0F] rounded-full border border-white/10 flex items-center justify-center">
                <span className="font-bold text-[#13ADC7]">{index + 1}</span>
              </div>
              
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#F7931A] transition-colors">{step.title}</h3>
              <p className="text-white/70">{step.description}</p>
              
              <div className="h-1 w-12 bg-gradient-to-r from-[#F7931A] to-[#13ADC7] mt-6 rounded-full group-hover:w-16 transition-all"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });
  
  const features = [
    {
      icon: "🧠",
      title: "AI-Powered Agent Builder",
      description: "Intelligent agents with explainable logic, trained to understand your financial patterns and preferences."
    },
    {
      icon: "🛡️",
      title: "Privacy-Preserving Execution",
      description: "All agent operations are shielded by Rebar technology, ensuring your financial data remains private."
    },
    {
      icon: "🔁",
      title: "BTC Automation on Layer2s",
      description: "Seamless integration with sBTC, BIP300, and exSat for high-performance, low-cost Bitcoin operations."
    },
    {
      icon: "📈",
      title: "Live Dashboards with Insights",
      description: "Real-time data visualization with AI-powered insights about your Bitcoin asset performance."
    }
  ];

  return (
    <section id="features" className="py-20 px-4 bg-[#0A0A0C]" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Core Features</h2>
          <p className="text-white/70 max-w-2xl mx-auto">Powered by cutting-edge technology to provide the most secure and intelligent Bitcoin automation.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-[#181820] to-[#14141A] p-6 rounded-2xl border border-white/5 relative group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(19, 173, 199, 0.4)" }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#13ADC7] transition-colors">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
              
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#F7931A]/0 to-[#13ADC7]/0 group-hover:from-[#F7931A]/10 group-hover:to-[#13ADC7]/10 transition-all pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Agent Previews Section with loading states
const AgentPreviewsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const agents = [
    {
      title: "Auto-Save 0.01 BTC Every Friday",
      type: "Savings",
      trigger: "Recurring Weekly",
      status: "Active",
      description: "Automatically transfers 0.01 BTC from your wallet to cold storage every Friday at 5 PM."
    },
    {
      title: "Dollar-Cost Average into Bitcoin",
      type: "Investment",
      trigger: "Price Drop Alert",
      status: "Active",
      description: "Buys $100 worth of BTC automatically when price drops more than 5% in 24h."
    },
    {
      title: "Liquidation Protection Bot",
      type: "Hedge",
      trigger: "Threshold-based",
      status: "Draft",
      description: "Monitors collateral ratio and automatically adds more collateral if liquidation risk increases."
    },
    {
      title: "Yield Optimizer",
      type: "Yield",
      trigger: "Rate-based",
      status: "Active",
      description: "Automatically moves BTC to highest yield protocols based on real-time APR comparison."
    }
  ];

  return (
    <section id="agent-previews" className="py-20 px-4" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">Live Agent Previews</h2>
            <p className="text-white/70">Explore and deploy pre-built Bitcoin automation agents</p>
          </div>
          
          <motion.button
            className="px-4 py-2 rounded-full bg-[#13ADC7] text-white font-medium"
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(19, 173, 199, 0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            View Agent Gallery
          </motion.button>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            // Skeleton loaders
            Array(4).fill(0).map((_, index) => (
              <div 
                key={index} 
                className="bg-[#181820] p-6 rounded-2xl border border-white/5 animate-pulse"
              >
                <div className="h-4 w-2/3 bg-white/10 rounded mb-4"></div>
                <div className="h-6 w-5/6 bg-white/10 rounded mb-6"></div>
                <div className="flex justify-between mb-6">
                  <div className="h-4 w-24 bg-white/10 rounded"></div>
                  <div className="h-4 w-16 bg-white/10 rounded"></div>
                </div>
                <div className="h-4 w-full bg-white/10 rounded mb-4"></div>
                <div className="h-10 w-full bg-white/10 rounded-full"></div>
              </div>
            ))
          ) : (
            agents.map((agent, index) => (
              <motion.div
                key={index}
                className="bg-[#181820] p-6 rounded-2xl border border-white/5 hover:border-[#13ADC7]/30 transition-all relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(19, 173, 199, 0.3)" }}
              >
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-[#13ADC7] font-medium">{agent.type}</span>
                  <span className={`text-sm px-2 py-0.5 rounded-full ${
                    agent.status === 'Active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : agent.status === 'Draft'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>{agent.status}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-[#13ADC7] transition-colors">{agent.title}</h3>
                
                <div className="flex justify-between mb-4">
                  <span className="text-white/70">Trigger</span>
                  <span className="font-medium text-white">{agent.trigger}</span>
                </div>
                
                <p className="text-white/70 mb-4 text-sm">{agent.description}</p>
                
                <motion.button
                  className="w-full px-4 py-3 rounded-full bg-gradient-to-r from-[#F7931A] to-[#13ADC7]/80 text-white font-medium"
                  whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(247, 147, 26, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Deploy This Agent
                </motion.button>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

// Stack Section
const StackSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });
  
  const technologies = [
    { name: "Bitcoin", logo: "/vercel.svg" },
    { name: "sBTC", logo: "/vercel.svg" },
    { name: "exSat", logo: "/vercel.svg" },
    { name: "Rebar", logo: "/vercel.svg" },
    { name: "BIP300", logo: "/vercel.svg" },
    { name: "OpenAI", logo: "/vercel.svg" },
  ];

  return (
    <section id="stack" className="py-20 px-4 bg-[#0A0A0C] relative overflow-hidden" ref={ref}>
      {/* Radar glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 rounded-full border border-[#F7931A]/20"></div>
        <div className="absolute inset-4 rounded-full border border-[#F7931A]/15 animate-pulse"></div>
        <div className="absolute inset-8 rounded-full border border-[#F7931A]/10 animate-pulse" style={{ animationDelay: "300ms" }}></div>
        <div className="absolute inset-12 rounded-full border border-[#F7931A]/5 animate-pulse" style={{ animationDelay: "600ms" }}></div>
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Stack & Trust Layer</h2>
          <p className="text-white/70 max-w-2xl mx-auto">Built with Bitcoin-native infrastructure for privacy, scale, and sovereignty</p>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-8 md:gap-12"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              className="text-center group"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#181820] rounded-xl flex items-center justify-center mb-3 group-hover:shadow-glow transition-all">
                <Image 
                  src={tech.logo} 
                  alt={tech.name} 
                  width={40} 
                  height={40}
                  className="opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <p className="text-white/70 group-hover:text-white transition-colors">{tech.name}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-20 bg-gradient-to-br from-[#181820] to-[#14141A] p-8 rounded-2xl border border-white/5 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#F7931A] to-[#13ADC7] flex items-center justify-center flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M20.2 5.2L8.8 16.6L3.8 11.6L2.4 13L8.8 19.4L21.6 6.6L20.2 5.2Z" />
              </svg>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2 text-white">Security & Sovereignty</h3>
              <p className="text-white/70">BitGenius is built on verifiable Bitcoin-native technology with user-controlled keys, ensuring complete financial sovereignty and maximum asset security.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0C0F] text-white overflow-hidden">
      <Header />
      <HeroSection />
      <WhatIsSection />
      <FeaturesSection />
      <AgentPreviewsSection />
      <StackSection />
      <Footer />
    </div>
  );
}
