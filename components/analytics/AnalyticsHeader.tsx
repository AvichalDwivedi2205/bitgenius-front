'use client';

import { useState } from 'react';
import { motion } from '@/components/motion';
import { fadeIn } from '@/components/motion/variants';

interface AnalyticsHeaderProps {
  isLiveMode: boolean;
  setIsLiveMode: (value: boolean) => void;
  selectedAgents: string[];
  setSelectedAgents: (value: string[]) => void;
  dateRange: { start: any; end: any };
  setDateRange: (value: { start: any; end: any }) => void;
}

export default function AnalyticsHeader({
  isLiveMode,
  setIsLiveMode,
  selectedAgents,
  setSelectedAgents,
  dateRange,
  setDateRange
}: AnalyticsHeaderProps) {
  const [showAgentDropdown, setShowAgentDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // Sample agents for demonstration
  const agents = [
    { id: 'agent-1', name: 'Auto-Save Bitcoin' },
    { id: 'agent-2', name: 'DCA Bot' },
    { id: 'agent-3', name: 'Liquidation Protection' },
    { id: 'agent-4', name: 'Yield Optimizer' }
  ];
  
  // Handle agent selection toggle
  const toggleAgentSelection = (id: string) => {
    if (id === 'all') {
      setSelectedAgents(['all']);
      return;
    }
    
    // If all was previously selected, remove it and add the clicked agent
    if (selectedAgents.includes('all')) {
      setSelectedAgents([id]);
      return;
    }
    
    // Toggle agent selection
    setSelectedAgents(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(agentId => agentId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };
  
  // Get active agent count for display
  const getActiveAgentCount = () => {
    if (selectedAgents.includes('all')) {
      return agents.length;
    }
    return selectedAgents.length;
  };
  
  // Handle date range selection
  const handleDateChange = (type: 'start' | 'end', value: any) => {
    setDateRange(prev => ({
      ...prev,
      [type]: value
    }));
  };
  
  return (
    <motion.div
      className="bg-[#181820] border border-white/5 rounded-2xl p-6"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Agent Activity Logs</h1>
          <p className="text-white/60">
            Monitor agent activities, transactions and performance metrics
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-stretch sm:items-center">
          {/* Agent Filter */}
          <div className="relative">
            <motion.button
              className="px-4 py-2.5 bg-[#0B0C0F] rounded-lg flex items-center gap-2 min-w-[180px] justify-between border border-white/10 hover:border-[#13ADC7]/50 transition-colors"
              onClick={() => setShowAgentDropdown(!showAgentDropdown)}
              whileHover={{ y: -2 }}
            >
              <span className="flex items-center gap-2">
                <i className="bx bx-bot text-[#F7931A]"></i>
                <span>
                  {selectedAgents.includes('all') 
                    ? 'All Agents' 
                    : `${selectedAgents.length} Agent${selectedAgents.length !== 1 ? 's' : ''}`}
                </span>
              </span>
              <i className={`bx bx-chevron-${showAgentDropdown ? 'up' : 'down'}`}></i>
            </motion.button>
            
            {showAgentDropdown && (
              <motion.div
                className="absolute top-full left-0 mt-2 bg-[#0B0C0F] border border-white/10 rounded-lg shadow-lg w-full min-w-[220px] z-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-2">
                  <div 
                    className={`px-3 py-2 rounded flex items-center gap-2 cursor-pointer ${
                      selectedAgents.includes('all') 
                        ? 'bg-[#13ADC7]/20 text-[#13ADC7]' 
                        : 'hover:bg-white/5'
                    }`}
                    onClick={() => toggleAgentSelection('all')}
                  >
                    <i className={`bx ${selectedAgents.includes('all') ? 'bxs-check-circle' : 'bx-circle'}`}></i>
                    <span>All Agents</span>
                  </div>
                  
                  <div className="h-[1px] bg-white/5 my-1"></div>
                  
                  {agents.map(agent => (
                    <div 
                      key={agent.id}
                      className={`px-3 py-2 rounded flex items-center gap-2 cursor-pointer ${
                        selectedAgents.includes(agent.id) && !selectedAgents.includes('all')
                          ? 'bg-[#13ADC7]/20 text-[#13ADC7]' 
                          : 'hover:bg-white/5'
                      }`}
                      onClick={() => toggleAgentSelection(agent.id)}
                    >
                      <i className={`bx ${
                        selectedAgents.includes(agent.id) && !selectedAgents.includes('all')
                          ? 'bxs-check-circle' 
                          : 'bx-circle'
                      }`}></i>
                      <span>{agent.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Date Range Picker */}
          <div className="relative">
            <motion.button
              className="px-4 py-2.5 bg-[#0B0C0F] rounded-lg flex items-center gap-2 min-w-[180px] justify-between border border-white/10 hover:border-[#13ADC7]/50 transition-colors"
              onClick={() => setShowDatePicker(!showDatePicker)}
              whileHover={{ y: -2 }}
            >
              <span className="flex items-center gap-2">
                <i className="bx bx-calendar text-[#13ADC7]"></i>
                <span>
                  {dateRange.start && dateRange.end 
                    ? 'Custom Range' 
                    : 'All Time'}
                </span>
              </span>
              <i className={`bx bx-chevron-${showDatePicker ? 'up' : 'down'}`}></i>
            </motion.button>
            
            {showDatePicker && (
              <motion.div
                className="absolute top-full right-0 mt-2 bg-[#0B0C0F] border border-white/10 rounded-lg shadow-lg w-[280px] z-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-3 space-y-3">
                  <h4 className="text-sm font-medium text-white/80 mb-2">Select date range</h4>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div 
                      className="bg-[#181820] p-2 rounded border border-white/5 hover:border-[#13ADC7]/40 cursor-pointer transition-colors text-center"
                      onClick={() => {
                        setDateRange({ start: null, end: null });
                        setShowDatePicker(false);
                      }}
                    >
                      All time
                    </div>
                    <div 
                      className="bg-[#181820] p-2 rounded border border-white/5 hover:border-[#13ADC7]/40 cursor-pointer transition-colors text-center"
                      onClick={() => {
                        setDateRange({ 
                          start: new Date(Date.now() - 86400000).toISOString(),
                          end: new Date().toISOString()
                        });
                        setShowDatePicker(false);
                      }}
                    >
                      Last 24h
                    </div>
                    <div 
                      className="bg-[#181820] p-2 rounded border border-white/5 hover:border-[#13ADC7]/40 cursor-pointer transition-colors text-center"
                      onClick={() => {
                        setDateRange({ 
                          start: new Date(Date.now() - 86400000 * 7).toISOString(),
                          end: new Date().toISOString()
                        });
                        setShowDatePicker(false);
                      }}
                    >
                      Last 7 days
                    </div>
                    <div 
                      className="bg-[#181820] p-2 rounded border border-white/5 hover:border-[#13ADC7]/40 cursor-pointer transition-colors text-center"
                      onClick={() => {
                        setDateRange({ 
                          start: new Date(Date.now() - 86400000 * 30).toISOString(),
                          end: new Date().toISOString() 
                        });
                        setShowDatePicker(false);
                      }}
                    >
                      Last 30 days
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-xs text-white/60 mb-2">Or select custom range</p>
                    
                    <div className="space-y-2">
                      <div>
                        <label className="text-xs mb-1 block text-white/80">From</label>
                        <input 
                          type="date" 
                          className="w-full bg-[#0B0C0F] border border-white/10 rounded p-2 text-sm"
                          onChange={(e) => handleDateChange('start', e.target.value ? new Date(e.target.value).toISOString() : null)}
                        />
                      </div>
                      <div>
                        <label className="text-xs mb-1 block text-white/80">To</label>
                        <input 
                          type="date" 
                          className="w-full bg-[#0B0C0F] border border-white/10 rounded p-2 text-sm"
                          onChange={(e) => handleDateChange('end', e.target.value ? new Date(e.target.value).toISOString() : null)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Live Mode Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-white/70 text-sm">Live Feed</span>
            <div 
              className={`relative w-12 h-6 rounded-full transition-all cursor-pointer ${
                isLiveMode ? 'bg-[#13ADC7]' : 'bg-[#0B0C0F] border border-white/10'
              }`}
              onClick={() => setIsLiveMode(!isLiveMode)}
            >
              <motion.div 
                className="absolute top-1 w-4 h-4 rounded-full bg-white"
                initial={false}
                animate={{ 
                  left: isLiveMode ? '28px' : '4px',
                  backgroundColor: isLiveMode ? '#fff' : '#888'
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 border-t border-white/5 pt-4 text-sm text-white/70">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
          <span>
            {isLiveMode 
              ? `Logging ${getActiveAgentCount()} active agent${getActiveAgentCount() !== 1 ? 's' : ''}...` 
              : `Showing ${getActiveAgentCount()} agent${getActiveAgentCount() !== 1 ? 's' : ''} ${dateRange.start && dateRange.end ? 'in selected date range' : 'all time'}`}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
