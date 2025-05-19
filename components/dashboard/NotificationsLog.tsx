'use client';

import { useState, useEffect } from 'react';
import { motion } from '../motion';

type Notification = {
  id: string;
  type: 'transaction' | 'alert' | 'update' | 'security';
  title: string;
  message: string;
  time: string;
  read: boolean;
  important: boolean;
};

export default function NotificationsLog() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'important'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Sample notifications
  const sampleNotifications: Notification[] = [
    {
      id: '1',
      type: 'transaction',
      title: 'DCA Purchase Completed',
      message: 'Weekly DCA agent successfully purchased 0.001 BTC at $46,245',
      time: '2 hours ago',
      read: false,
      important: true
    },
    {
      id: '2',
      type: 'alert',
      title: 'Price Alert',
      message: 'BTC price dropped below $45,000, your limit order was triggered',
      time: '5 hours ago',
      read: true,
      important: true
    },
    {
      id: '3',
      type: 'update',
      title: 'Yield Strategy Updated',
      message: 'Your yield optimizer has moved funds to a higher yield protocol (4.2% APR)',
      time: '1 day ago',
      read: false,
      important: false
    },
    {
      id: '4',
      type: 'security',
      title: 'Security Check',
      message: 'Your wallet authorized a new connection to BitGenius app',
      time: '3 days ago',
      read: true,
      important: true
    },
    {
      id: '5',
      type: 'transaction',
      title: 'Transfer Completed',
      message: 'Transferred 0.05 BTC to your cold storage wallet',
      time: '5 days ago',
      read: true,
      important: false
    }
  ];
  
  useEffect(() => {
    // Simulate loading notifications
    const timer = setTimeout(() => {
      setNotifications(sampleNotifications);
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter notifications based on active filter
  const filteredNotifications = activeFilter === 'all' 
    ? notifications 
    : notifications.filter(n => n.important);
  
  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  return (
    <motion.div 
      className="bg-[#181820] rounded-2xl p-6 border border-white/5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Notifications</h3>
        
        <div className="flex bg-[#14141A] rounded-lg p-1">
          <button 
            className={`px-3 py-1 rounded-md text-sm ${
              activeFilter === 'all' 
                ? 'bg-[#13ADC7] text-white' 
                : 'text-white/70 hover:text-white'
            }`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={`px-3 py-1 rounded-md text-sm ${
              activeFilter === 'important' 
                ? 'bg-[#13ADC7] text-white' 
                : 'text-white/70 hover:text-white'
            }`}
            onClick={() => setActiveFilter('important')}
          >
            Important
          </button>
        </div>
      </div>
      
      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
        {isLoading ? (
          // Skeleton loaders
          Array(4).fill(0).map((_, index) => (
            <div 
              key={index}
              className="bg-[#14141A] p-4 rounded-xl border border-white/5 animate-pulse"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-white/10 rounded"></div>
                    <div className="h-3 w-40 bg-white/10 rounded"></div>
                  </div>
                </div>
                <div className="h-3 w-16 bg-white/10 rounded"></div>
              </div>
            </div>
          ))
        ) : filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-12 h-12 rounded-full bg-[#14141A] flex items-center justify-center mb-3">
              <i className="bx bx-bell-off text-2xl text-white/40"></i>
            </div>
            <p className="text-white/50">No notifications to display</p>
          </div>
        ) : (
          filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              className={`bg-[#14141A] p-4 rounded-xl border ${
                notification.read 
                  ? 'border-white/5'
                  : 'border-[#13ADC7]/40'
              } relative`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.03)' }}
              onClick={() => markAsRead(notification.id)}
            >
              {notification.important && !notification.read && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#F7931A] animate-pulse"></div>
              )}
              
              <div className="flex gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  notification.type === 'transaction' 
                    ? 'bg-green-500/20 text-green-400'
                    : notification.type === 'alert'
                    ? 'bg-red-500/20 text-red-400'
                    : notification.type === 'update'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  <i className={`bx ${
                    notification.type === 'transaction' 
                      ? 'bx-transfer'
                      : notification.type === 'alert'
                      ? 'bx-bell'
                      : notification.type === 'update'
                      ? 'bx-refresh'
                      : 'bx-shield'
                  } text-xl`}></i>
                </div>
                
                <div className="space-y-1">
                  <h4 className={`font-medium ${
                    notification.read ? 'text-white/80' : 'text-white'
                  }`}>
                    {notification.title}
                  </h4>
                  <p className={`text-sm ${
                    notification.read ? 'text-white/50' : 'text-white/70'
                  }`}>
                    {notification.message}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/40">{notification.time}</span>
                    {!notification.read && (
                      <span className="text-xs text-[#13ADC7]">New</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
      
      {!isLoading && notifications.length > 0 && (
        <motion.button 
          className="w-full px-4 py-2 mt-4 rounded-xl border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-colors text-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View All Notifications
        </motion.button>
      )}
    </motion.div>
  );
}
