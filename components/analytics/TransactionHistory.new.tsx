'use client';

import { useState, useEffect, Fragment } from 'react';
import { motion } from '@/components/motion';
import { fadeIn } from '@/components/motion/variants';

interface Transaction {
  id: string;
  txId: string;
  agentId: string;
  agentName: string;
  action: string;
  amount: number;
  fee: number;
  timestamp: string;
  status: 'confirmed' | 'pending' | 'failed';
  isPrivate: boolean;
}

interface TransactionHistoryProps {
  isLoading: boolean;
  selectedAgents: string[];
  dateRange: { start: string | null; end: string | null };
}

export default function TransactionHistory({
  isLoading,
  selectedAgents,
  dateRange
}: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [expandedTxId, setExpandedTxId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<keyof Transaction>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Generate sample transactions for demonstration
  useEffect(() => {
    const sampleTransactions: Transaction[] = [];
    const agentNames = ['Auto-Save Bitcoin', 'DCA Bot', 'Liquidation Protection', 'Yield Optimizer'];
    const actions = [
      'Transfer to Cold Storage',
      'Purchase BTC',
      'Add Collateral',
      'Deposit to Yield Protocol',
      'Swap BTC/USDT',
      'Withdraw from Exchange'
    ];
    
    // Generate 15 sample transactions
    for (let i = 0; i < 15; i++) {
      const agentIndex = Math.floor(Math.random() * 4);
      const actionIndex = Math.floor(Math.random() * actions.length);
      const statusOptions = ['confirmed', 'pending', 'failed'] as const;
      const statusIndex = Math.floor(Math.random() * 10) < 8 ? 0 : Math.floor(Math.random() * 3); // Make confirmed more common
      
      // Calculate a timestamp within the last 7 days
      const timestamp = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString();
      const amount = parseFloat((Math.random() * 0.15).toFixed(8));
      
      sampleTransactions.push({
        id: `tx-${i}`,
        txId: `${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`,
        agentId: `agent-${agentIndex + 1}`,
        agentName: agentNames[agentIndex],
        action: actions[actionIndex],
        amount,
        fee: parseFloat((amount * 0.001 + Math.random() * 0.0001).toFixed(8)),
        timestamp,
        status: statusOptions[statusIndex],
        isPrivate: Math.random() > 0.5 // 50% chance to be private
      });
    }
    
    // Sort transactions by timestamp (newest first)
    sampleTransactions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    setTimeout(() => {
      setTransactions(sampleTransactions);
    }, 500);
  }, []);
  
  // Filter transactions based on selected agents and date range
  const filteredTransactions = transactions.filter(tx => {
    // Filter by agent
    if (!selectedAgents.includes('all') && !selectedAgents.includes(tx.agentId)) {
      return false;
    }
    
    // Filter by date range
    if (dateRange.start && dateRange.end) {
      const txDate = new Date(tx.timestamp).getTime();
      const startDate = new Date(dateRange.start).getTime();
      const endDate = new Date(dateRange.end).getTime();
      
      return txDate >= startDate && txDate <= endDate;
    }
    
    return true;
  });
  
  // Sort transactions based on the selected field and direction
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortField === 'timestamp' || sortField === 'amount' || sortField === 'fee') {
      const valueA = sortField === 'timestamp' 
        ? new Date(a[sortField]).getTime() 
        : a[sortField];
      const valueB = sortField === 'timestamp' 
        ? new Date(b[sortField]).getTime() 
        : b[sortField];
      
      return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
    } else {
      const valueA = a[sortField].toString().toLowerCase();
      const valueB = b[sortField].toString().toLowerCase();
      
      return sortDirection === 'asc' 
        ? valueA.localeCompare(valueB) 
        : valueB.localeCompare(valueA);
    }
  });
  
  const toggleSort = (field: keyof Transaction) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc'); // Default to descending for new sort fields
    }
  };
  
  const toggleTxExpand = (txId: string) => {
    setExpandedTxId(expandedTxId === txId ? null : txId);
  };
  
  // Format timestamp to readable date
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Truncate transaction ID for display
  const truncateTxId = (txId: string) => {
    return `${txId.substring(0, 6)}...${txId.substring(txId.length - 6)}`;
  };
  
  return (
    <motion.div
      className="bg-[#181820] border border-white/5 rounded-2xl overflow-hidden"
      variants={fadeIn}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#14141A] border-b border-white/5">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-white/60 cursor-pointer hover:text-white transition-colors"
                onClick={() => toggleSort('txId')}
              >
                <div className="flex items-center gap-1">
                  Tx ID
                  {sortField === 'txId' && (
                    <i className={`bx ${sortDirection === 'asc' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'}`}></i>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-white/60 cursor-pointer hover:text-white transition-colors"
                onClick={() => toggleSort('agentName')}
              >
                <div className="flex items-center gap-1">
                  Agent
                  {sortField === 'agentName' && (
                    <i className={`bx ${sortDirection === 'asc' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'}`}></i>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-white/60 cursor-pointer hover:text-white transition-colors"
                onClick={() => toggleSort('action')}
              >
                <div className="flex items-center gap-1">
                  Action
                  {sortField === 'action' && (
                    <i className={`bx ${sortDirection === 'asc' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'}`}></i>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-white/60 cursor-pointer hover:text-white transition-colors"
                onClick={() => toggleSort('amount')}
              >
                <div className="flex items-center gap-1">
                  Amount
                  {sortField === 'amount' && (
                    <i className={`bx ${sortDirection === 'asc' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'}`}></i>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-white/60 cursor-pointer hover:text-white transition-colors"
                onClick={() => toggleSort('fee')}
              >
                <div className="flex items-center gap-1">
                  Fee
                  {sortField === 'fee' && (
                    <i className={`bx ${sortDirection === 'asc' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'}`}></i>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-white/60 cursor-pointer hover:text-white transition-colors"
                onClick={() => toggleSort('timestamp')}
              >
                <div className="flex items-center gap-1">
                  Timestamp
                  {sortField === 'timestamp' && (
                    <i className={`bx ${sortDirection === 'asc' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'}`}></i>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-white/60 cursor-pointer hover:text-white transition-colors"
                onClick={() => toggleSort('status')}
              >
                <div className="flex items-center gap-1">
                  Status
                  {sortField === 'status' && (
                    <i className={`bx ${sortDirection === 'asc' ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'}`}></i>
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/60">
                Privacy
              </th>
            </tr>
          </thead>
          
          <tbody>
            {isLoading ? (
              // Skeleton loaders for table rows
              Array(5).fill(0).map((_, index) => (
                <tr key={`skeleton-${index}`} className="animate-pulse border-b border-white/5">
                  <td className="px-6 py-3">
                    <div className="h-4 bg-white/10 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="h-4 bg-white/10 rounded w-20"></div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="h-4 bg-white/10 rounded w-32"></div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="h-4 bg-white/10 rounded w-16"></div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="h-4 bg-white/10 rounded w-12"></div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="h-4 bg-white/10 rounded w-20"></div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="h-4 bg-white/10 rounded w-16"></div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="h-4 bg-white/10 rounded w-16"></div>
                  </td>
                </tr>
              ))
            ) : sortedTransactions.length > 0 ? (
              sortedTransactions.map((tx) => (
                <Fragment key={tx.id}>
                  <tr 
                    className={`border-b border-white/5 transition-colors cursor-pointer ${
                      expandedTxId === tx.id ? 'bg-[#14141A]' : 'hover:bg-[#14141A]/50'
                    }`}
                    onClick={() => toggleTxExpand(tx.id)}
                  >
                    <td className="px-6 py-3 font-mono">
                      <div className="flex items-center gap-1">
                        <i className="bx bx-transfer-alt text-[#F7931A]"></i>
                        <a 
                          href={`https://mempool.space/tx/${tx.txId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#13ADC7] hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {truncateTxId(tx.txId)}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`font-medium ${
                        tx.agentId === 'agent-1' ? 'text-green-400' :
                        tx.agentId === 'agent-2' ? 'text-blue-400' :
                        tx.agentId === 'agent-3' ? 'text-yellow-400' : 
                        'text-purple-400'
                      }`}>
                        {tx.agentName}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      {tx.action}
                    </td>
                    <td className="px-6 py-3 font-mono">
                      {tx.amount.toFixed(8)} BTC
                    </td>
                    <td className="px-6 py-3 font-mono text-white/60">
                      {tx.fee.toFixed(8)} BTC
                    </td>
                    <td className="px-6 py-3 text-white/70">
                      {formatDate(tx.timestamp)}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        tx.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                        tx.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      {tx.isPrivate ? (
                        <div className="flex items-center gap-1 text-white/80">
                          <i className="bx bx-shield text-[#13ADC7]"></i>
                          <span className="text-xs">Rebar Shielded</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-white/60">
                          <i className="bx bx-globe"></i>
                          <span className="text-xs">Public</span>
                        </div>
                      )}
                    </td>
                  </tr>
                  
                  {/* Expanded transaction details */}
                  {expandedTxId === tx.id && (
                    <tr>
                      <td colSpan={8} className="bg-[#14141A]">
                        <motion.div 
                          className="px-6 py-4 text-sm"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-[#0B0C0F] p-3 rounded border border-white/5">
                              <h4 className="text-xs font-medium text-white/60 mb-2">Transaction Details</h4>
                              <div className="space-y-2 text-xs">
                                <div>
                                  <span className="text-white/40">Full TX ID:</span>
                                  <div className="bg-black/30 p-2 rounded mt-1 font-mono overflow-x-auto">
                                    {tx.txId}
                                  </div>
                                </div>
                                <div>
                                  <span className="text-white/40">Timestamp:</span>
                                  <div className="bg-black/30 p-2 rounded mt-1 font-mono">
                                    {new Date(tx.timestamp).toISOString()}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-[#0B0C0F] p-3 rounded border border-white/5">
                              <h4 className="text-xs font-medium text-white/60 mb-2">Agent Information</h4>
                              <div className="space-y-2 text-xs">
                                <div>
                                  <span className="text-white/40">Agent ID:</span>
                                  <div className="bg-black/30 p-2 rounded mt-1 font-mono">
                                    {tx.agentId}
                                  </div>
                                </div>
                                <div>
                                  <span className="text-white/40">Operation:</span>
                                  <div className="bg-black/30 p-2 rounded mt-1 font-mono">
                                    {tx.action}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-[#0B0C0F] p-3 rounded border border-white/5">
                              <h4 className="text-xs font-medium text-white/60 mb-2">Analytics</h4>
                              <div className="space-y-2 text-xs">
                                <div className="flex justify-between">
                                  <span className="text-white/60">Amount:</span>
                                  <span className="font-mono">{tx.amount.toFixed(8)} BTC</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/60">Network Fee:</span>
                                  <span className="font-mono">{tx.fee.toFixed(8)} BTC</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/60">Fee Rate:</span>
                                  <span className="font-mono">{Math.round(tx.fee / tx.amount * 100 * 10000) / 100}%</span>
                                </div>
                                <div className="flex justify-between mt-2 pt-2 border-t border-white/10">
                                  <span className="text-white/60">Effective Value:</span>
                                  <span className="font-mono">{(tx.amount - tx.fee).toFixed(8)} BTC</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <a 
                              href={`https://mempool.space/tx/${tx.txId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#13ADC7] hover:text-[#13ADC7]/80 text-sm flex items-center gap-1"
                            >
                              <span>View on Block Explorer</span>
                              <i className="bx bx-link-external"></i>
                            </a>
                          </div>
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="bg-[#0B0C0F] w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white/30">
                      <i className="bx bx-transfer text-3xl"></i>
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">No transactions found</h4>
                    <p className="text-white/60 text-sm max-w-md">
                      No transactions match your current filters. Try selecting different agents or date range.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {!isLoading && sortedTransactions.length > 0 && (
        <div className="border-t border-white/5 px-6 py-3 text-sm text-white/60 flex justify-between items-center">
          <div>
            Showing {sortedTransactions.length} of {transactions.length} transactions
          </div>
          
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded border border-white/10 hover:bg-white/5 transition-colors">
              Previous
            </button>
            <span>Page 1 of 1</span>
            <button className="px-3 py-1 rounded border border-white/10 hover:bg-white/5 transition-colors">
              Next
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
