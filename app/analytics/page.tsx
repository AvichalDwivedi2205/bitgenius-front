'use client';

import { useState, useEffect } from 'react';
import { motion } from '@/components/motion';
import Navbar from '@/components/Navbar';
import AnalyticsHeader from '@/components/analytics/AnalyticsHeader';
import LogsConsole from '@/components/analytics/LogsConsole';
import TransactionHistory from '@/components/analytics/TransactionHistory';
import PerformanceAnalytics from '@/components/analytics/PerformanceAnalytics';
import { staggerContainer } from '@/components/motion/variants';

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('logs');
  const [isLiveMode, setIsLiveMode] = useState(true);
  const [selectedAgents, setSelectedAgents] = useState<string[]>(['all']);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Function to handle tab changes
  const handleTabChange = (tab: string) => {
    setIsLoading(true);
    setActiveTab(tab);
    
    // Simulating data loading when switching tabs
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };
  
  return (
    <div className="min-h-screen bg-[#0B0C0F] text-white pb-24">
      <Navbar />
      
      <main className="container mx-auto max-w-7xl px-4 pt-24">
        {/* Analytics Header */}
        <AnalyticsHeader 
          isLiveMode={isLiveMode} 
          setIsLiveMode={setIsLiveMode} 
          selectedAgents={selectedAgents}
          setSelectedAgents={setSelectedAgents}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
        
        {/* Tab Navigation */}
        <div className="mt-8 border-b border-white/10">
          <div className="flex space-x-2">
            <TabButton 
              label="Activity Logs" 
              isActive={activeTab === 'logs'} 
              onClick={() => handleTabChange('logs')}
              icon="bx-terminal"
            />
            <TabButton 
              label="Transactions" 
              isActive={activeTab === 'transactions'} 
              onClick={() => handleTabChange('transactions')}
              icon="bx-transfer"
            />
            <TabButton 
              label="Performance" 
              isActive={activeTab === 'performance'} 
              onClick={() => handleTabChange('performance')}
              icon="bx-line-chart"
            />
          </div>
        </div>
        
        {/* Tab Content */}
        <motion.div 
          className="mt-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {activeTab === 'logs' && (
            <LogsConsole 
              isLoading={isLoading} 
              isLiveMode={isLiveMode} 
              selectedAgents={selectedAgents}
              dateRange={dateRange}
            />
          )}
          
          {activeTab === 'transactions' && (
            <TransactionHistory 
              isLoading={isLoading} 
              selectedAgents={selectedAgents}
              dateRange={dateRange}
            />
          )}
          
          {activeTab === 'performance' && (
            <PerformanceAnalytics 
              isLoading={isLoading} 
              selectedAgents={selectedAgents}
              dateRange={dateRange}
            />
          )}
        </motion.div>
        
        {/* Footer Section */}
        <div className="mt-12 flex justify-between items-center py-4 border-t border-white/10">
          <div className="text-sm text-white/60">
            <span>Data is cryptographically verifiable via Bitcoin Layer 2s</span>
            <motion.span 
              className="ml-2 inline-block cursor-help"
              whileHover={{ scale: 1.2 }}
            >
              <i className="bx bx-info-circle" title="All agent operations are verified and can be audited on the Bitcoin network"></i>
            </motion.span>
          </div>
          
          <motion.button
            className="flex items-center gap-2 px-4 py-2 bg-[#181820] rounded-lg border border-white/10 hover:border-[#13ADC7]/50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <i className="bx bx-download"></i>
            <span>Export Logs</span>
          </motion.button>
        </div>
      </main>
    </div>
  );
}

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon: string;
}

function TabButton({ label, isActive, onClick, icon }: TabButtonProps) {
  return (
    <motion.button
      className={`px-5 py-3 flex items-center gap-2 font-medium border-b-2 transition-all ${
        isActive 
          ? 'border-[#13ADC7] text-white' 
          : 'border-transparent text-white/60 hover:text-white/80'
      }`}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      <i className={`bx ${icon}`}></i>
      {label}
    </motion.button>
  );
}
