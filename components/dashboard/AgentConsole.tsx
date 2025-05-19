'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from '../motion';

export default function AgentConsole() {
  const [logs, setLogs] = useState<string[]>([]);
  const [currentLog, setCurrentLog] = useState("");
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [typing, setTyping] = useState(false);
  const [agentStatus, setAgentStatus] = useState<'active' | 'paused' | 'configuring'>('active');
  
  const logContainerRef = useRef<HTMLDivElement>(null);
  
  const sampleLogs = [
    "Agent initialized. Scanning Bitcoin mempool for transaction confirmations...",
    "Detected price drop alert: BTC -3.2% in last 4 hours.",
    "Checking user-defined threshold conditions...",
    "Threshold conditions met for DCA strategy activation.",
    "Attempting to allocate $100 USD equivalent for Bitcoin purchase.",
    "Security verification passed. Preparing transaction...",
    "Connected to exchange API. Market order prepared.",
    "Executing purchase: 0.00215 BTC at $46,512 per BTC.",
    "Transaction confirmed. Hash: 8fe2c9b3a4f1d7e6c5b9a8d7f6e5c4b3a2f1d9e8.",
    "Updating portfolio balance. New BTC balance: 1.23676 BTC.",
    "Generating trade report for user dashboard...",
    "Agent action complete. Returning to monitoring state."
  ];
  
  // Typewriter effect for logs
  useEffect(() => {
    if (logs.length < sampleLogs.length && !typing) {
      const nextLog = sampleLogs[currentLogIndex];
      let charIndex = 0;
      setTyping(true);
      
      const typingInterval = setInterval(() => {
        if (charIndex <= nextLog.length) {
          setCurrentLog(nextLog.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setLogs(prev => [...prev, nextLog]);
          setCurrentLog("");
          setCurrentLogIndex(prev => prev + 1);
          setTyping(false);
        }
      }, 30);
      
      return () => clearInterval(typingInterval);
    }
  }, [logs, typing, currentLogIndex, sampleLogs]);
  
  // Auto scroll to bottom
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, currentLog]);
  
  // Toggle agent status
  const toggleAgentStatus = () => {
    if (agentStatus === 'active') {
      setAgentStatus('paused');
    } else if (agentStatus === 'paused') {
      setAgentStatus('active');
    }
  };

  return (
    <motion.div 
      className="bg-[#181820] rounded-2xl p-6 border border-white/5 h-[400px] flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold text-white">Agent Console</h3>
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${
            agentStatus === 'active' 
              ? 'bg-green-500/20 text-green-400' 
              : agentStatus === 'paused'
              ? 'bg-yellow-500/20 text-yellow-400'
              : 'bg-blue-500/20 text-blue-400'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              agentStatus === 'active' 
                ? 'bg-green-400 animate-pulse' 
                : agentStatus === 'paused'
                ? 'bg-yellow-400'
                : 'bg-blue-400'
            }`}></div>
            <span className="text-xs font-medium">
              {agentStatus === 'active' ? 'Active' : agentStatus === 'paused' ? 'Paused' : 'Configuring'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.button
            className="w-8 h-8 rounded-full flex items-center justify-center bg-[#14141A] text-white/70 hover:text-white border border-white/10"
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.05)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAgentStatus('configuring')}
          >
            <i className="bx bx-cog"></i>
          </motion.button>
          <motion.button
            className={`w-8 h-8 rounded-full flex items-center justify-center bg-[#14141A] border border-white/10 ${
              agentStatus === 'active' ? 'text-yellow-400 hover:text-yellow-500' : 'text-green-400 hover:text-green-500'
            }`}
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.05)' }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleAgentStatus}
          >
            <i className={`bx ${agentStatus === 'active' ? 'bx-pause' : 'bx-play'}`}></i>
          </motion.button>
        </div>
      </div>
      
      {/* Terminal-like console */}
      <div 
        ref={logContainerRef}
        className="flex-1 bg-[#14141A] rounded-xl p-4 text-white/80 font-mono text-sm overflow-y-auto"
      >
        <div className="space-y-1.5">
          {logs.map((log, index) => (
            <div key={index} className="flex">
              <span className="text-green-400 mr-2">{">"}</span>
              <span>{log}</span>
            </div>
          ))}
          {currentLog && (
            <div className="flex">
              <span className="text-green-400 mr-2">{">"}</span>
              <span>{currentLog}</span>
              <span className="animate-blink">_</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Console input */}
      <div className="mt-4 flex gap-3">
        <input 
          type="text" 
          className="flex-1 bg-[#14141A] border border-white/10 rounded-xl px-4 py-2.5 text-white/80 font-mono text-sm focus:outline-none focus:border-[#13ADC7]/50"
          placeholder="Send manual command to agent..."
        />
        <motion.button
          className="px-4 py-2 rounded-xl bg-[#14141A] border border-white/10 text-white/80 hover:text-white hover:border-white/30 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Send
        </motion.button>
      </div>
    </motion.div>
  );
}
