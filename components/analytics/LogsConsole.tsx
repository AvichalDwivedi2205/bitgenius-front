'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from '@/components/motion';
import { fadeIn } from '@/components/motion/variants';

interface LogEntry {
  id: string;
  timestamp: string;
  agentId: string;
  agentName: string;
  action: string;
  status: 'success' | 'pending' | 'failed';
  metadata: any;
  isExpanded?: boolean;
}

interface LogsConsoleProps {
  isLoading: boolean;
  isLiveMode: boolean;
  selectedAgents: string[];
  dateRange: { start: string | null; end: string | null };
}

export default function LogsConsole({
  isLoading,
  isLiveMode,
  selectedAgents,
  dateRange
}: LogsConsoleProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const consoleEndRef = useRef<HTMLDivElement>(null);
  
  // Generate sample logs for demonstration
  useEffect(() => {
    const sampleLogs: LogEntry[] = [];
    const agentNames = ['Auto-Save Bitcoin', 'DCA Bot', 'Liquidation Protection', 'Yield Optimizer'];
    const actions = [
      'Wallet Balance Check',
      'BTC Transfer Initiated',
      'Price Check Performed',
      'Transaction Signed',
      'Swap Executed',
      'Privacy Shield Activated',
      'Yield Calculation',
      'Alert Triggered'
    ];
    
    // Generate 20 sample logs
    for (let i = 0; i < 20; i++) {
      const agentIndex = Math.floor(Math.random() * 4);
      const actionIndex = Math.floor(Math.random() * actions.length);
      const statusOptions = ['success', 'pending', 'failed'] as const;
      const statusIndex = Math.floor(Math.random() * 10) < 8 ? 0 : Math.floor(Math.random() * 3); // Make success more common
      
      // Calculate a timestamp within the last 24 hours
      const timestamp = new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString();
      
      sampleLogs.push({
        id: `log-${i}`,
        timestamp,
        agentId: `agent-${agentIndex + 1}`,
        agentName: agentNames[agentIndex],
        action: actions[actionIndex],
        status: statusOptions[statusIndex],
        metadata: {
          details: `Details for ${actions[actionIndex]}`,
          parameters: {
            amount: Math.random() * 0.05,
            fee: Math.random() * 0.001,
            destination: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
          }
        }
      });
    }
    
    // Sort logs by timestamp (newest first)
    sampleLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    setTimeout(() => {
      setLogs(sampleLogs);
    }, 500);
  }, []);
  
  // Add new logs periodically if in live mode
  useEffect(() => {
    if (!isLiveMode) return;
    
    const interval = setInterval(() => {
      const shouldAddLog = Math.random() > 0.6; // 40% chance to add a log
      if (shouldAddLog) {
        const agentNames = ['Auto-Save Bitcoin', 'DCA Bot', 'Liquidation Protection', 'Yield Optimizer'];
        const agentIndex = Math.floor(Math.random() * 4);
        const actions = [
          'Wallet Balance Check',
          'BTC Transfer Initiated',
          'Price Check Performed',
          'Transaction Signed',
          'Swap Executed'
        ];
        const actionIndex = Math.floor(Math.random() * actions.length);
        
        // Mostly successful operations
        const success = Math.random() > 0.2;
        
        const newLog: LogEntry = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toISOString(),
          agentId: `agent-${agentIndex + 1}`,
          agentName: agentNames[agentIndex],
          action: actions[actionIndex],
          status: success ? 'success' : (Math.random() > 0.5 ? 'pending' : 'failed'),
          metadata: {
            details: `Details for ${actions[actionIndex]}`,
            parameters: {
              amount: Math.random() * 0.05,
              fee: Math.random() * 0.001,
              destination: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
            }
          }
        };
        
        setLogs(prev => [newLog, ...prev]);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isLiveMode]);
  
  // Scroll to bottom when new logs are added in live mode
  useEffect(() => {
    if (isLiveMode && logs.length > 0 && consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isLiveMode]);
  
  // Filter logs based on selected agents and date range
  const filteredLogs = logs.filter(log => {
    // Filter by agent
    if (!selectedAgents.includes('all') && !selectedAgents.includes(log.agentId)) {
      return false;
    }
    
    // Filter by date range
    if (dateRange.start && dateRange.end) {
      const logDate = new Date(log.timestamp).getTime();
      const startDate = new Date(dateRange.start).getTime();
      const endDate = new Date(dateRange.end).getTime();
      
      return logDate >= startDate && logDate <= endDate;
    }
    
    return true;
  });
  
  const toggleLogExpand = (logId: string) => {
    setExpandedLogId(expandedLogId === logId ? null : logId);
  };
  
  // Render log status icon
  const renderStatusIcon = (status: LogEntry['status']) => {
    switch (status) {
      case 'success':
        return (
          <div className="w-4 h-4 rounded-full bg-green-400/20 flex items-center justify-center text-green-500">
            <i className="bx bx-check text-xs"></i>
          </div>
        );
      case 'pending':
        return (
          <div className="w-4 h-4 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-500">
            <i className="bx bx-loader-alt text-xs animate-spin"></i>
          </div>
        );
      case 'failed':
        return (
          <div className="w-4 h-4 rounded-full bg-red-400/20 flex items-center justify-center text-red-500">
            <i className="bx bx-x text-xs"></i>
          </div>
        );
    }
  };
  
  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  
  return (
    <motion.div
      className="bg-[#181820] border border-white/5 rounded-2xl overflow-hidden"
      variants={fadeIn}
    >
      <div className="border-b border-white/5 px-6 py-3 flex justify-between items-center bg-[#14141A]">
        <div className="flex items-center gap-2 text-white/80">
          <i className="bx bx-code-alt"></i>
          <span className="font-mono">Activity Logs</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/5 text-white/60"
            title="Copy logs"
          >
            <i className="bx bx-copy-alt text-sm"></i>
          </button>
          
          <button
            className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/5 text-white/60"
            title="Clear console"
          >
            <i className="bx bx-trash text-sm"></i>
          </button>
        </div>
      </div>
      
      <div className="relative">
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-[#181820]/90 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-2 border-[#13ADC7] border-t-transparent rounded-full animate-spin mb-3"></div>
              <span className="text-sm text-white/70">Loading logs...</span>
            </div>
          </div>
        )}
        
        {/* Console content */}
        <div 
          className="font-mono text-sm h-[calc(100vh-400px)] min-h-[400px] overflow-y-auto p-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log, index) => (
              <motion.div 
                key={log.id}
                className={`mb-1 p-2 rounded group hover:bg-[#0B0C0F] transition-colors border ${
                  expandedLogId === log.id ? 'border-white/10 bg-[#0B0C0F]' : 'border-transparent'
                }`}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
              >
                <div 
                  className="flex gap-3 items-start cursor-pointer"
                  onClick={() => toggleLogExpand(log.id)}
                >
                  {/* Log status indicator */}
                  <div className="flex-shrink-0 pt-1">
                    {renderStatusIcon(log.status)}
                  </div>
                  
                  {/* Log content */}
                  <div className="flex-grow">
                    {/* Log header */}
                    <div className="flex justify-between">
                      <div className="flex items-start gap-2">
                        <span className="text-white/40 text-xs pt-1">
                          {formatTime(log.timestamp)}
                        </span>
                        <span className={`font-medium ${
                          log.agentId === 'agent-1' ? 'text-green-400' :
                          log.agentId === 'agent-2' ? 'text-blue-400' :
                          log.agentId === 'agent-3' ? 'text-yellow-400' : 
                          'text-purple-400'
                        }`}>
                          {log.agentName}
                        </span>
                        <span className="text-white/80">{log.action}</span>
                      </div>
                      
                      {/* Status tag */}
                      <div className="flex-shrink-0">
                        <span className={`text-xs px-2 py-1 rounded ${
                          log.status === 'success' ? 'bg-green-500/20 text-green-400' :
                          log.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {log.status}
                        </span>
                      </div>
                    </div>
                    
                    {/* Expanded log details */}
                    {expandedLogId === log.id && (
                      <motion.div 
                        className="mt-2 bg-[#0B0C0F] rounded p-3 border border-white/10 text-white/70"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <div>
                            <span className="text-white/40 text-xs">Agent ID:</span>
                            <div className="text-xs bg-black/30 p-1 rounded mt-1 font-mono">
                              {log.agentId}
                            </div>
                          </div>
                          <div>
                            <span className="text-white/40 text-xs">Timestamp:</span>
                            <div className="text-xs bg-black/30 p-1 rounded mt-1 font-mono">
                              {new Date(log.timestamp).toISOString()}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-2">
                          <span className="text-white/40 text-xs">Parameters:</span>
                          <pre className="text-xs bg-black/30 p-2 rounded mt-1 font-mono overflow-x-auto">
                            {JSON.stringify(log.metadata.parameters, null, 2)}
                          </pre>
                        </div>
                        
                        {log.status === 'success' && log.metadata.parameters.amount && (
                          <div className="mt-3 text-green-400 text-xs border-t border-white/10 pt-2 flex items-center gap-1">
                            <i className="bx bx-check-circle"></i>
                            <span>Successfully processed {log.metadata.parameters.amount.toFixed(8)} BTC</span>
                          </div>
                        )}
                        
                        {log.status === 'failed' && (
                          <div className="mt-3 text-red-400 text-xs border-t border-white/10 pt-2 flex items-center gap-1">
                            <i className="bx bx-error-circle"></i>
                            <span>Operation failed: Insufficient funds or network error</span>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="bg-[#0B0C0F] w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white/30">
                <i className="bx bx-terminal text-3xl"></i>
              </div>
              <h4 className="text-lg font-medium text-white mb-2">No logs found</h4>
              <p className="text-white/60 text-sm max-w-md">
                No agent activity logs match your current filters. Try selecting different agents or date range.
              </p>
            </div>
          )}
          
          {isLiveMode && logs.length > 0 && (
            <div className="h-8">
              <div ref={consoleEndRef}></div>
            </div>
          )}
        </div>
        
        {/* Console footer */}
        <div className="border-t border-white/5 px-4 py-2 text-xs text-white/40 flex items-center justify-between">
          <div>
            {filteredLogs.length} log entries
          </div>
          
          <div className="flex items-center gap-2">
            {isLiveMode && (
              <span className="flex items-center gap-1 text-green-400">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Live updates enabled
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
