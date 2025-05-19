'use client';

import { useState } from 'react';
import { motion } from '../motion';

export default function FinancialInsights() {
  const [activeTab, setActiveTab] = useState('portfolio');
  
  const tabs = [
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'privacy', label: 'Privacy Score' }
  ];
  
  const transactions = [
    { 
      type: 'buy', 
      amount: '0.0215', 
      price: '$45,621.24', 
      date: '2 hours ago', 
      status: 'completed',
      hash: '3a8e2c9b1d7f6e5a4c3b2d1e'
    },
    { 
      type: 'transfer', 
      amount: '0.0500', 
      destination: 'Cold Storage', 
      date: '1 day ago', 
      status: 'completed',
      hash: '7f6e5d4c3b2a1e9d8c7b6a5'
    },
    { 
      type: 'yield', 
      amount: '0.0012', 
      source: 'Staking rewards', 
      date: '3 days ago', 
      status: 'completed',
      hash: '2a3b4c5d6e7f8g9h1i2j3k4'
    },
    { 
      type: 'sell', 
      amount: '0.0100', 
      price: '$44,832.51', 
      date: '1 week ago', 
      status: 'completed',
      hash: '9i8u7y6t5r4e3w2q1p0o9i8'
    },
    { 
      type: 'swap', 
      amount: '0.0300',
      target: 'Lightning Channel',
      date: '2 weeks ago',
      status: 'processing',
      hash: '5f4d3s2a1q9w8e7r6t5y6u'
    }
  ];
  
  const privacyScore = 82;

  // Portfolio distribution data
  const portfolioItems = [
    { name: 'Cold Storage', percentage: 65, color: '#13ADC7' },
    { name: 'Exchange', percentage: 15, color: '#F7931A' },
    { name: 'Yield Farming', percentage: 12, color: '#6366F1' },
    { name: 'Lightning', percentage: 8, color: '#F97316' },
  ];
  
  return (
    <motion.div 
      className="bg-[#181820] rounded-2xl p-6 border border-white/5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-xl font-bold text-white mb-4">Financial Insights</h3>
      
      {/* Tab Navigation */}
      <div className="flex mb-6 border-b border-white/10">
        {tabs.map((tab) => (
          <button 
            key={tab.id}
            className={`relative px-4 py-2 text-sm font-medium ${
              activeTab === tab.id 
                ? 'text-white' 
                : 'text-white/50 hover:text-white/80'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#13ADC7]"
                layoutId="activeTab"
              />
            )}
          </button>
        ))}
      </div>
      
      {/* Portfolio Tab */}
      {activeTab === 'portfolio' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Portfolio Donut Chart */}
            <div className="flex-1 flex justify-center items-center">
              <div className="w-48 h-48 rounded-full relative bg-[#14141A] flex items-center justify-center">
                {/* Generate chart segments with different colors and percentages */}
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#14141A" strokeWidth="20" />
                  
                  {portfolioItems.map((item, index) => {
                    const prevSegments = portfolioItems.slice(0, index);
                    const startAngle = prevSegments.reduce((acc, curr) => acc + (curr.percentage * 3.6), 0);
                    const endAngle = startAngle + (item.percentage * 3.6);
                    
                    // Convert to radians for calculations
                    const startRad = (startAngle - 90) * Math.PI / 180;
                    const endRad = (endAngle - 90) * Math.PI / 180;
                    
                    // Calculate SVG arc path
                    const x1 = 50 + 40 * Math.cos(startRad);
                    const y1 = 50 + 40 * Math.sin(startRad);
                    const x2 = 50 + 40 * Math.cos(endRad);
                    const y2 = 50 + 40 * Math.sin(endRad);
                    
                    const largeArc = item.percentage > 50 ? 1 : 0;
                    
                    return (
                      <motion.path
                        key={index}
                        d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                        fill={item.color}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: index * 0.2 + 0.3 }}
                      />
                    );
                  })}
                </svg>
                <div className="absolute flex flex-col items-center justify-center w-16 h-16 bg-[#181820] rounded-full">
                  <motion.span 
                    className="font-bold text-lg text-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.8, delay: 0.8 }}
                  >
                    100%
                  </motion.span>
                  <span className="text-xs text-white/60">Total</span>
                </div>
              </div>
            </div>
            
            {/* Portfolio Legend */}
            <div className="flex-1 space-y-3">
              {portfolioItems.map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-white/80">{item.name}</span>
                  </div>
                  <div className="text-white font-medium">{item.percentage}%</div>
                </motion.div>
              ))}
              
              <motion.button 
                className="mt-4 w-full px-4 py-2 rounded-xl border border-white/10 text-white/80 hover:text-white hover:border-white/30 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Optimize Distribution
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-4 max-h-80 overflow-y-auto pr-1"
        >
          {transactions.map((tx, index) => (
            <motion.div 
              key={index}
              className="flex justify-between items-center border-b border-white/5 pb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)', x: 3 }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  tx.type === 'buy' 
                    ? 'bg-green-500/20 text-green-400'
                    : tx.type === 'sell'
                    ? 'bg-red-500/20 text-red-400'
                    : tx.type === 'transfer'
                    ? 'bg-blue-500/20 text-blue-400'
                    : tx.type === 'yield'
                    ? 'bg-[#F7931A]/20 text-[#F7931A]'
                    : 'bg-purple-500/20 text-purple-400'
                }`}>
                  <i className={`bx ${
                    tx.type === 'buy' 
                      ? 'bx-down-arrow-alt'
                      : tx.type === 'sell'
                      ? 'bx-up-arrow-alt'
                      : tx.type === 'transfer'
                      ? 'bx-transfer'
                      : tx.type === 'yield'
                      ? 'bx-coin-stack'
                      : 'bx-refresh'
                  }`}></i>
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium text-white capitalize">{tx.type}</span>
                    <span className="text-white/70 text-sm">{tx.amount} BTC</span>
                  </div>
                  <div className="text-xs text-white/50">
                    {tx.type === 'buy' || tx.type === 'sell' 
                      ? tx.price
                      : tx.type === 'transfer'
                      ? `To: ${tx.destination}`
                      : tx.type === 'yield'
                      ? tx.source
                      : `To: ${tx.target}`
                    }
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-white/50 text-xs">{tx.date}</span>
                <span className={`text-xs ${
                  tx.status === 'completed'
                    ? 'text-green-400'
                    : tx.status === 'processing'
                    ? 'text-yellow-400'
                    : 'text-red-400'
                }`}>{tx.status}</span>
              </div>
            </motion.div>
          ))}
          
          <motion.button 
            className="w-full px-4 py-2 rounded-xl border border-white/10 text-white/80 hover:text-white hover:border-white/30 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Transactions
          </motion.button>
        </motion.div>
      )}
      
      {/* Privacy Score Tab */}
      {activeTab === 'privacy' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-6">
            {/* Privacy Score Gauge */}
            <div className="flex-1 flex flex-col items-center">
              <svg width="160" height="160" viewBox="0 0 160 160">
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="none"
                  stroke="#14141A"
                  strokeWidth="16"
                />
                <motion.circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="none"
                  stroke={privacyScore > 80 ? "#4ADE80" : privacyScore > 50 ? "#F7931A" : "#F87171"}
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 60 * privacyScore / 100} ${2 * Math.PI * 60 * (1 - privacyScore / 100)}`}
                  strokeDashoffset={2 * Math.PI * 60 * 0.25}
                  initial={{ strokeDasharray: `0 ${2 * Math.PI * 60}` }}
                  animate={{ strokeDasharray: `${2 * Math.PI * 60 * privacyScore / 100} ${2 * Math.PI * 60 * (1 - privacyScore / 100)}` }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <text 
                  x="80" 
                  y="80"
                  textAnchor="middle" 
                  dominantBaseline="middle"
                  className="text-2xl font-bold"
                  fill="white"
                >
                  {privacyScore}%
                </text>
                <text 
                  x="80" 
                  y="100"
                  textAnchor="middle" 
                  dominantBaseline="middle"
                  className="text-xs"
                  fill="rgba(255, 255, 255, 0.7)"
                >
                  Privacy Score
                </text>
              </svg>
            </div>
            
            {/* Privacy Recommendations */}
            <div className="flex-1 space-y-3">
              <h4 className="text-sm font-medium text-white/80">Privacy Recommendations</h4>
              
              <motion.div 
                className="flex items-center gap-2 text-sm text-white/70"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <i className="bx bx-check-circle text-green-400"></i>
                <span>Utilizing coin join protocols</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-2 text-sm text-white/70"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <i className="bx bx-check-circle text-green-400"></i>
                <span>Multiple wallet addresses</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-2 text-sm text-white/70"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <i className="bx bx-x-circle text-yellow-400"></i>
                <span>Consider adding Rebar privacy layer</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-2 text-sm text-white/70"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <i className="bx bx-x-circle text-yellow-400"></i>
                <span>Route transactions through Lightning Network</span>
              </motion.div>
              
              <motion.button 
                className="mt-4 w-full px-4 py-2 rounded-xl border border-white/10 text-white/80 hover:text-white hover:border-white/30 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Enhance Privacy
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
