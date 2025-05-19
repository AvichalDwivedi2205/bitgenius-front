'use client';

import { useState } from 'react';
import { motion } from '@/components/motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function AgentsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Mock agents data
  const agents = [
    {
      id: 'agent-1',
      name: 'Weekly DCA Bot',
      type: 'Savings',
      status: 'Active',
      lastRun: '2 hours ago',
      nextRun: 'In 5 days',
      description: 'Buys 0.001 BTC every Friday regardless of price',
      performance: '+12.4%',
      performanceChange: 'positive'
    },
    {
      id: 'agent-2',
      name: 'Privacy Mixer',
      type: 'Privacy',
      status: 'Active',
      lastRun: '3 days ago',
      nextRun: 'When balance > 0.05 BTC',
      description: 'Automatically mixes funds through Rebar Shield for privacy',
      performance: 'Enhanced',
      performanceChange: 'neutral'
    },
    {
      id: 'agent-3',
      name: 'Arbitrage Hunter',
      type: 'Trading',
      status: 'Paused',
      lastRun: '5 days ago',
      nextRun: 'Manual activation',
      description: 'Exploits price differences across exchanges',
      performance: '+2.8%',
      performanceChange: 'positive'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0C0F] text-white">
      <Navbar />
      
      <main className="container mx-auto max-w-7xl px-4 pt-24 pb-24">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">My Bitcoin Agents</h1>
            <p className="text-white/70">Manage your automated Bitcoin strategies</p>
          </div>
          
          <Link href="/agents/create">
            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-[#F7931A] to-[#13ADC7] rounded-lg flex items-center gap-2 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Create New Agent
            </motion.button>
          </Link>
        </div>
        
        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              className="bg-[#181820] border border-white/5 rounded-2xl overflow-hidden hover:border-[#13ADC7]/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="p-5 border-b border-white/5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-[#13ADC7]">{agent.type}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        agent.status === 'Active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : agent.status === 'Paused'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>{agent.status}</span>
                    </div>
                    <h3 className="font-bold text-xl">{agent.name}</h3>
                  </div>
                  
                  <div className={`px-2 py-1 rounded ${
                    agent.performanceChange === 'positive'
                      ? 'bg-green-500/10 text-green-400'
                      : agent.performanceChange === 'negative'
                      ? 'bg-red-500/10 text-red-400'
                      : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    {agent.performance}
                  </div>
                </div>
                
                <p className="text-white/70 text-sm">{agent.description}</p>
              </div>
              
              <div className="p-5 bg-[#0B0C0F]/30">
                <div className="flex justify-between text-sm mb-3">
                  <div>
                    <p className="text-white/50">Last Run</p>
                    <p className="font-medium">{agent.lastRun}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/50">Next Run</p>
                    <p className="font-medium">{agent.nextRun}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded bg-white/5 hover:bg-white/10 text-sm transition-colors">
                    Edit
                  </button>
                  <button className="flex-1 py-2 rounded bg-white/5 hover:bg-white/10 text-sm transition-colors">
                    {agent.status === 'Active' ? 'Pause' : 'Resume'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Create New Agent Card */}
          <Link href="/agents/create">
            <motion.div
              className="bg-[#181820] border border-white/5 rounded-2xl overflow-hidden h-full min-h-[220px] flex items-center justify-center cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: agents.length * 0.1 }}
              whileHover={{ boxShadow: "0 8px 30px rgba(19, 173, 199, 0.15)", borderColor: "rgba(19, 173, 199, 0.3)" }}
            >
              <div className="text-center px-6">
                <div className="mx-auto w-16 h-16 rounded-full bg-[#13ADC7]/10 flex items-center justify-center mb-4 group-hover:bg-[#13ADC7]/20 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#13ADC7]">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-[#13ADC7] transition-colors">Create New Agent</h3>
                <p className="text-white/60 text-sm">Build a custom Bitcoin automation</p>
              </div>
            </motion.div>
          </Link>
        </div>
      </main>
    </div>
  );
}
