'use client';

import { useState, useEffect } from 'react';
import { motion } from '@/components/motion';
import { fadeIn } from '@/components/motion/variants';

interface PerformanceData {
  roiData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      agentId: string;
      borderColor: string;
      backgroundColor: string;
    }[];
  };
  actionFrequency: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  };
  executionTime: {
    labels: string[];
    datasets: {
      label: string;
      data: {
        min: number;
        q1: number;
        median: number;
        q3: number;
        max: number;
      }[];
      backgroundColor: string[];
    }[];
  };
  shieldUsage: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  };
}

interface PerformanceAnalyticsProps {
  isLoading: boolean;
  selectedAgents: string[];
  dateRange: { start: string | null; end: string | null };
}

export default function PerformanceAnalytics({
  isLoading,
  selectedAgents,
  dateRange
}: PerformanceAnalyticsProps) {
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
  const [activeChartTab, setActiveChartTab] = useState('roi');
  
  // Generate sample performance data for demonstration
  useEffect(() => {
    // Generate dates for last 30 days
    const getDates = () => {
      const dates: string[] = [];
      for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }));
      }
      return dates;
    };
    
    const dates = getDates();
    
    // Generate ROI data
    const roiData = {
      labels: dates,
      datasets: [
        {
          label: 'Auto-Save Bitcoin',
          data: dates.map((_, i) => {
            // Start at 100 and add some randomness
            return 100 + Math.random() * 2 * i;
          }),
          agentId: 'agent-1',
          borderColor: 'rgba(34, 197, 94, 0.8)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)'
        },
        {
          label: 'DCA Bot',
          data: dates.map((_, i) => {
            // Start at 100 and add some randomness
            return 100 + Math.random() * 3.5 * i - Math.random() * i * 0.5;
          }),
          agentId: 'agent-2',
          borderColor: 'rgba(59, 130, 246, 0.8)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)'
        },
        {
          label: 'Yield Optimizer',
          data: dates.map((_, i) => {
            // Start at 100 and add some randomness with a bit more volatility
            return 100 + Math.random() * 4 * i - Math.random() * i * 1.2;
          }),
          agentId: 'agent-4',
          borderColor: 'rgba(168, 85, 247, 0.8)',
          backgroundColor: 'rgba(168, 85, 247, 0.1)'
        }
      ]
    };
    
    // Action frequency data
    const actionFrequency = {
      labels: ['Price Check', 'Transfer', 'Purchase', 'Sell', 'Yield Deposit', 'Withdraw'],
      datasets: [{
        label: 'Actions',
        data: [65, 42, 23, 17, 31, 12],
        backgroundColor: [
          'rgba(247, 147, 26, 0.7)',
          'rgba(19, 173, 199, 0.7)',
          'rgba(34, 197, 94, 0.7)',
          'rgba(250, 204, 21, 0.7)',
          'rgba(168, 85, 247, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ]
      }]
    };
    
    // Execution time data (boxplot-like)
    const executionTime = {
      labels: ['Auto-Save', 'DCA Bot', 'Liquidation Protection', 'Yield Optimizer'],
      datasets: [{
        label: 'Execution Time (seconds)',
        data: [
          {
            min: 0.5,
            q1: 1.2,
            median: 2.1,
            q3: 3.5,
            max: 6.2
          },
          {
            min: 0.8,
            q1: 1.8,
            median: 2.7,
            q3: 4.3,
            max: 7.1
          },
          {
            min: 1.2,
            q1: 2.5,
            median: 3.8,
            q3: 5.7,
            max: 9.2
          },
          {
            min: 2.1,
            q1: 3.6,
            median: 5.2,
            q3: 7.8,
            max: 12.4
          }
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.6)',
          'rgba(59, 130, 246, 0.6)',
          'rgba(250, 204, 21, 0.6)',
          'rgba(168, 85, 247, 0.6)'
        ]
      }]
    };
    
    // Shield usage data (doughnut)
    const shieldUsage = {
      labels: ['Shielded Transactions', 'Public Transactions'],
      datasets: [{
        label: 'Transaction Privacy',
        data: [67, 33],
        backgroundColor: [
          'rgba(19, 173, 199, 0.7)',
          'rgba(100, 116, 139, 0.7)'
        ]
      }]
    };
    
    // Set performance data after a delay to simulate loading
    setTimeout(() => {
      setPerformanceData({
        roiData,
        actionFrequency,
        executionTime,
        shieldUsage
      });
    }, 500);
  }, []);
  
  return (
    <div className="space-y-8">
      {/* Chart Type Selector */}
      <div className="bg-[#181820] border border-white/5 rounded-2xl overflow-hidden">
        <div className="border-b border-white/5 px-6 py-3 flex justify-between items-center">
          <h3 className="font-medium">Performance Analytics</h3>
          
          <div className="flex gap-2">
            <ChartTabButton 
              label="ROI Over Time" 
              icon="bx-line-chart"
              isActive={activeChartTab === 'roi'}
              onClick={() => setActiveChartTab('roi')}
            />
            <ChartTabButton 
              label="Action Frequency" 
              icon="bx-bar-chart-alt"
              isActive={activeChartTab === 'actions'}
              onClick={() => setActiveChartTab('actions')}
            />
            <ChartTabButton 
              label="Execution Time" 
              icon="bx-time"
              isActive={activeChartTab === 'time'}
              onClick={() => setActiveChartTab('time')}
            />
            <ChartTabButton 
              label="Shield Usage" 
              icon="bx-shield"
              isActive={activeChartTab === 'shield'}
              onClick={() => setActiveChartTab('shield')}
            />
          </div>
        </div>
        
        <div className="p-6">
          {isLoading || !performanceData ? (
            <div className="h-[400px] flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-2 border-[#13ADC7] border-t-transparent rounded-full animate-spin mb-3"></div>
                <span className="text-sm text-white/70">Loading chart data...</span>
              </div>
            </div>
          ) : (
            <div className="h-[400px] relative">
              {activeChartTab === 'roi' && (
                <div className="h-full">
                  {/* Mock ROI Line Chart */}
                  <motion.div 
                    className="h-full flex flex-col"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex-1 relative">
                      <div className="absolute inset-0">
                        {/* Y-Axis */}
                        <div className="absolute left-0 top-0 bottom-0 w-12 border-r border-white/5 flex flex-col justify-between p-2 text-xs text-white/40">
                          <span>150%</span>
                          <span>140%</span>
                          <span>130%</span>
                          <span>120%</span>
                          <span>110%</span>
                          <span>100%</span>
                        </div>
                        
                        {/* Grid lines */}
                        <div className="absolute left-12 right-0 top-0 bottom-0 flex flex-col justify-between">
                          {[0, 1, 2, 3, 4, 5].map((i) => (
                            <div 
                              key={i} 
                              className="border-b border-white/5 h-[16.66%]"
                            ></div>
                          ))}
                        </div>
                        
                        {/* Mock line paths with animated drawing */}
                        <div className="absolute left-12 right-0 top-8 bottom-8">
                          {performanceData.roiData.datasets.map((dataset, idx) => {
                            // Filter out datasets not matching selected agents
                            if (!selectedAgents.includes('all') && !selectedAgents.includes(dataset.agentId)) {
                              return null;
                            }
                            
                            return (
                              <svg 
                                key={idx} 
                                className="absolute inset-0 h-full w-full overflow-visible"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                              >
                                <motion.path
                                  d={`M 0,${100 - dataset.data[0] / 1.5} ${dataset.data.map((val, i) => {
                                    // Calculate x position based on index
                                    const x = (i / (dataset.data.length - 1)) * 100;
                                    // Calculate y position based on value (invert for SVG coordinates)
                                    const y = 100 - (val / 1.5);
                                    return `L ${x},${y}`;
                                  }).join(' ')}`}
                                  fill="none"
                                  stroke={dataset.borderColor}
                                  strokeWidth="1.5"
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  animate={{ pathLength: 1, opacity: 1 }}
                                  transition={{ duration: 1.5, ease: "easeInOut" }}
                                />
                                
                                {/* Area under the curve */}
                                <motion.path
                                  d={`M 0,100 L 0,${100 - dataset.data[0] / 1.5} ${dataset.data.map((val, i) => {
                                    const x = (i / (dataset.data.length - 1)) * 100;
                                    const y = 100 - (val / 1.5);
                                    return `L ${x},${y}`;
                                  }).join(' ')} L 100,100 Z`}
                                  fill={dataset.backgroundColor}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 1.5, delay: 0.5 }}
                                />
                              </svg>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    
                    {/* X-Axis labels */}
                    <div className="h-8 border-t border-white/5 flex items-center text-xs text-white/40">
                      <div className="w-12 flex-shrink-0"></div>
                      <div className="flex-1 flex justify-between px-2">
                        {performanceData.roiData.labels.filter((_, i) => i % 5 === 0).map((label, i) => (
                          <span key={i}>{label}</span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Legend */}
                    <div className="h-12 pt-4 flex items-center justify-center gap-6">
                      {performanceData.roiData.datasets.map((dataset, i) => {
                        // Filter out datasets not matching selected agents
                        if (!selectedAgents.includes('all') && !selectedAgents.includes(dataset.agentId)) {
                          return null;
                        }
                        
                        return (
                          <motion.div
                            key={i}
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 * i }}
                          >
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: dataset.borderColor }}
                            ></div>
                            <span>{dataset.label}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>
              )}
              
              {activeChartTab === 'actions' && (
                <div className="h-full">
                  {/* Mock Action Frequency Bar Chart */}
                  <motion.div 
                    className="h-full flex flex-col"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex-1 relative">
                      <div className="absolute inset-0">
                        {/* Y-Axis */}
                        <div className="absolute left-0 top-0 bottom-0 w-12 border-r border-white/5 flex flex-col justify-between p-2 text-xs text-white/40">
                          <span>70</span>
                          <span>60</span>
                          <span>50</span>
                          <span>40</span>
                          <span>30</span>
                          <span>20</span>
                          <span>10</span>
                          <span>0</span>
                        </div>
                        
                        {/* Grid lines */}
                        <div className="absolute left-12 right-0 top-0 bottom-0 flex flex-col justify-between">
                          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                            <div 
                              key={i} 
                              className="border-b border-white/5 h-[12.5%]"
                            ></div>
                          ))}
                        </div>
                        
                        {/* Bar chart */}
                        <div className="absolute left-12 right-0 top-4 bottom-4 flex items-end justify-around">
                          {performanceData.actionFrequency.labels.map((label, idx) => {
                            const value = performanceData.actionFrequency.datasets[0].data[idx];
                            const percentage = (value / 70) * 100;
                            
                            return (
                              <motion.div
                                key={idx}
                                className="relative w-[10%]"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ 
                                  height: `${percentage}%`, 
                                  opacity: 1 
                                }}
                                transition={{ 
                                  duration: 0.8, 
                                  delay: idx * 0.1,
                                  ease: "easeOut" 
                                }}
                                style={{ 
                                  backgroundColor: performanceData.actionFrequency.datasets[0].backgroundColor[idx] 
                                }}
                              >
                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium">
                                  {value}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    
                    {/* X-Axis labels */}
                    <div className="h-8 border-t border-white/5 flex items-center text-xs">
                      <div className="w-12 flex-shrink-0"></div>
                      <div className="flex-1 flex justify-around px-2 text-white/60">
                        {performanceData.actionFrequency.labels.map((label, i) => (
                          <span key={i} className="text-center">{label}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
              
              {activeChartTab === 'time' && (
                <div className="h-full">
                  {/* Mock Execution Time Box Plot */}
                  <motion.div 
                    className="h-full flex flex-col"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex-1 relative">
                      <div className="absolute inset-0">
                        {/* Y-Axis */}
                        <div className="absolute left-0 top-0 bottom-0 w-12 border-r border-white/5 flex flex-col justify-between p-2 text-xs text-white/40">
                          <span>15s</span>
                          <span>12s</span>
                          <span>9s</span>
                          <span>6s</span>
                          <span>3s</span>
                          <span>0s</span>
                        </div>
                        
                        {/* Grid lines */}
                        <div className="absolute left-12 right-0 top-0 bottom-0 flex flex-col justify-between">
                          {[0, 1, 2, 3, 4, 5].map((i) => (
                            <div 
                              key={i} 
                              className="border-b border-white/5 h-[20%]"
                            ></div>
                          ))}
                        </div>
                        
                        {/* Box plot visualization */}
                        <div className="absolute left-12 right-0 top-8 bottom-8 flex items-center justify-around">
                          {performanceData.executionTime.labels.map((label, idx) => {
                            // Only show if matching selected agents or all is selected
                            const agentId = `agent-${idx + 1}`;
                            if (!selectedAgents.includes('all') && !selectedAgents.includes(agentId)) {
                              return null;
                            }
                            
                            const boxData = performanceData.executionTime.datasets[0].data[idx];
                            const color = performanceData.executionTime.datasets[0].backgroundColor[idx];
                            
                            // Calculate positions as percentages of the height
                            const maxHeight = 15; // Max scale value
                            const minPos = (1 - boxData.min / maxHeight) * 100;
                            const maxPos = (1 - boxData.max / maxHeight) * 100;
                            const q1Pos = (1 - boxData.q1 / maxHeight) * 100;
                            const q3Pos = (1 - boxData.q3 / maxHeight) * 100;
                            const medianPos = (1 - boxData.median / maxHeight) * 100;
                            
                            return (
                              <motion.div
                                key={idx}
                                className="relative w-[15%] h-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                              >
                                {/* Min-Max line */}
                                <motion.div 
                                  className="absolute left-1/2 w-[1px] bg-white/30"
                                  style={{
                                    top: `${maxPos}%`,
                                    height: `${minPos - maxPos}%`,
                                    transform: 'translateX(-50%)'
                                  }}
                                  initial={{ height: 0 }}
                                  animate={{ height: `${minPos - maxPos}%` }}
                                  transition={{ duration: 0.8 }}
                                ></motion.div>
                                
                                {/* Min cap */}
                                <motion.div 
                                  className="absolute w-4 h-[1px] bg-white/30"
                                  style={{
                                    top: `${minPos}%`,
                                    left: '50%',
                                    transform: 'translateX(-50%)'
                                  }}
                                  initial={{ width: 0 }}
                                  animate={{ width: '10px' }}
                                  transition={{ duration: 0.4, delay: 0.8 }}
                                ></motion.div>
                                
                                {/* Max cap */}
                                <motion.div 
                                  className="absolute w-4 h-[1px] bg-white/30"
                                  style={{
                                    top: `${maxPos}%`,
                                    left: '50%',
                                    transform: 'translateX(-50%)'
                                  }}
                                  initial={{ width: 0 }}
                                  animate={{ width: '10px' }}
                                  transition={{ duration: 0.4, delay: 0.8 }}
                                ></motion.div>
                                
                                {/* Box (Q1-Q3) */}
                                <motion.div 
                                  className="absolute left-1/2 transform -translate-x-1/2 w-[60%]"
                                  style={{
                                    top: `${q3Pos}%`,
                                    height: `${q1Pos - q3Pos}%`,
                                    backgroundColor: color
                                  }}
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: `${q1Pos - q3Pos}%` }}
                                  transition={{ duration: 0.6, delay: 0.3 }}
                                ></motion.div>
                                
                                {/* Median line */}
                                <motion.div 
                                  className="absolute left-1/2 transform -translate-x-1/2 w-[60%] h-[2px] bg-white"
                                  style={{
                                    top: `${medianPos}%`
                                  }}
                                  initial={{ width: 0 }}
                                  animate={{ width: '60%' }}
                                  transition={{ duration: 0.5, delay: 0.6 }}
                                ></motion.div>
                                
                                {/* Label */}
                                <div className="absolute bottom-[-24px] left-0 right-0 text-center text-xs text-white/60">
                                  {label}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    
                    {/* Legend */}
                    <div className="h-12 pt-6 flex items-center justify-center gap-6">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-6 h-[2px] bg-white"></div>
                        <span>Median</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-4 h-4 bg-white/20"></div>
                        <span>Interquartile Range (Q1-Q3)</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="flex flex-col items-center">
                          <div className="w-[1px] h-4 bg-white/30"></div>
                          <div className="w-4 h-[1px] bg-white/30"></div>
                        </div>
                        <span>Min/Max</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
              
              {activeChartTab === 'shield' && (
                <div className="h-full">
                  {/* Mock Shield Usage Doughnut Chart */}
                  <motion.div 
                    className="h-full flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="relative w-[280px] h-[280px]">
                      {/* SVG Doughnut */}
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke={performanceData.shieldUsage.datasets[0].backgroundColor[0]}
                          strokeWidth="15"
                          strokeDasharray="251.2"
                          strokeDashoffset="0"
                          transform="rotate(-90 50 50)"
                          initial={{ strokeDashoffset: 251.2 }}
                          animate={{ 
                            strokeDashoffset: 251.2 * (1 - performanceData.shieldUsage.datasets[0].data[0] / 100) 
                          }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke={performanceData.shieldUsage.datasets[0].backgroundColor[1]}
                          strokeWidth="15"
                          strokeDasharray="251.2"
                          strokeDashoffset="0"
                          transform="rotate(-90 50 50)"
                          initial={{ strokeDashoffset: 0 }}
                          animate={{ 
                            strokeDashoffset: 251.2 * (performanceData.shieldUsage.datasets[0].data[0] / 100) 
                          }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                      </svg>
                      
                      {/* Center text */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <motion.div
                          className="text-4xl font-bold"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.8 }}
                        >
                          {performanceData.shieldUsage.datasets[0].data[0]}%
                        </motion.div>
                        <motion.div
                          className="text-sm text-white/60"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.6, delay: 1 }}
                        >
                          Privacy-Enhanced
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Legend */}
                    <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8">
                      {performanceData.shieldUsage.labels.map((label, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.2 + idx * 0.1 }}
                        >
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: performanceData.shieldUsage.datasets[0].backgroundColor[idx] }}
                          ></div>
                          <span className="text-sm">
                            {label} ({idx === 0 ? 
                              `${performanceData.shieldUsage.datasets[0].data[idx]}%` : 
                              `${performanceData.shieldUsage.datasets[0].data[idx]}%`})
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Agent Performance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {!isLoading && (
          <>
            <AgentPerformanceCard
              name="Auto-Save Bitcoin"
              success={92}
              operations={87}
              avgTime={2.1}
              trend={+3.2}
              color="#22c55e"
              agentId="agent-1"
              selectedAgents={selectedAgents}
            />
            <AgentPerformanceCard
              name="DCA Bot"
              success={97}
              operations={156}
              avgTime={2.7}
              trend={+12.4}
              color="#3b82f6"
              agentId="agent-2"
              selectedAgents={selectedAgents}
            />
            <AgentPerformanceCard
              name="Liquidation Protection"
              success={85}
              operations={23}
              avgTime={3.8}
              trend={-1.2}
              color="#facc15"
              agentId="agent-3"
              selectedAgents={selectedAgents}
            />
            <AgentPerformanceCard
              name="Yield Optimizer"
              success={94}
              operations={61}
              avgTime={5.2}
              trend={+7.8}
              color="#a855f7"
              agentId="agent-4"
              selectedAgents={selectedAgents}
            />
          </>
        )}
      </div>
    </div>
  );
}

interface ChartTabButtonProps {
  label: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

function ChartTabButton({ label, icon, isActive, onClick }: ChartTabButtonProps) {
  return (
    <motion.button
      className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-medium transition-colors ${
        isActive 
          ? 'bg-[#13ADC7]/20 text-[#13ADC7] border border-[#13ADC7]/40' 
          : 'text-white/60 hover:text-white/80 border border-transparent'
      }`}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      <i className={`bx ${icon}`}></i>
      <span>{label}</span>
    </motion.button>
  );
}

interface AgentPerformanceCardProps {
  name: string;
  success: number;
  operations: number;
  avgTime: number;
  trend: number;
  color: string;
  agentId: string;
  selectedAgents: string[];
}

function AgentPerformanceCard({ 
  name, 
  success, 
  operations, 
  avgTime, 
  trend,
  color,
  agentId,
  selectedAgents
}: AgentPerformanceCardProps) {
  // Only show card if agent is selected or all agents are selected
  if (!selectedAgents.includes('all') && !selectedAgents.includes(agentId)) {
    return null;
  }
  
  return (
    <motion.div
      className="bg-[#181820] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 
            className="font-medium mb-1"
            style={{ color }}
          >
            {name}
          </h3>
          <div className="text-xs text-white/60 flex items-center gap-1">
            <i className="bx bx-check-shield"></i>
            <span>{success}% Success Rate</span>
          </div>
        </div>
        
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <i className={`bx bx-bot text-xl`} style={{ color }}></i>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="bg-[#0B0C0F] rounded p-2">
          <div className="text-lg font-medium">{operations}</div>
          <div className="text-xs text-white/40">Operations</div>
        </div>
        <div className="bg-[#0B0C0F] rounded p-2">
          <div className="text-lg font-medium flex items-center justify-center">
            {avgTime}<span className="text-xs ml-1">s</span>
          </div>
          <div className="text-xs text-white/40">Avg Time</div>
        </div>
        <div className="bg-[#0B0C0F] rounded p-2">
          <div className={`text-lg font-medium flex items-center justify-center ${
            trend > 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {trend > 0 ? '+' : ''}{trend}%
          </div>
          <div className="text-xs text-white/40">Trend</div>
        </div>
      </div>
    </motion.div>
  );
}
