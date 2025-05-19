'use client';

import { useState } from 'react';
import { motion } from '@/components/motion';
import Navbar from '@/components/Navbar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import AgentConsole from '@/components/dashboard/AgentConsole';
import FinancialInsights from '@/components/dashboard/FinancialInsights';
import StrategyPanel from '@/components/dashboard/StrategyPanel';
import NotificationsLog from '@/components/dashboard/NotificationsLog';
import DashboardFooter from '@/components/dashboard/DashboardFooter';

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  
  return (
    <div className="min-h-screen bg-[#0B0C0F] text-white pb-24">
      <Navbar />
      
      <main className="container mx-auto max-w-7xl px-4 pt-24">
        {/* Dashboard Header */}
        <DashboardHeader />
        
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column (Larger) */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <AgentConsole />
            <FinancialInsights />
          </motion.div>
          
          {/* Right Column */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <StrategyPanel />
            <NotificationsLog />
          </motion.div>
        </div>
      </main>
      
      <DashboardFooter />
    </div>
  );
}
