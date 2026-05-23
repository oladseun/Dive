'use client'

import { useState, useRef, useEffect } from 'react'

const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'Action Required', message: 'The deadline for Amberscholar Scholarship 2026 is approaching in 5 days.', isRead: false, time: '2 hours ago' },
  { id: 2, title: 'AI Match', message: 'We found a new opportunity that matches your profile: Global Leaders Fellowship.', isRead: false, time: '1 day ago' },
  { id: 3, title: 'Document Scanned', message: 'Your CV has been successfully analyzed by AI Document Reviewer.', isRead: true, time: '3 days ago' },
]

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter(n => !n.isRead).length

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all group relative ${isOpen ? 'bg-primary/10 text-primary' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}
      >
        {unreadCount > 0 && (
          <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        )}
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-4 right-0 w-[380px] bg-white border border-slate-100 rounded-3xl shadow-2xl shadow-slate-900/10 z-50 overflow-hidden transform origin-top-right transition-all">
          <div className="p-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-slate-900">Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold uppercase tracking-widest rounded-md">
                  {unreadCount} New
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={markAllRead}
                className="text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
              >
                Mark all read
              </button>
              <button 
                onClick={clearAll}
                className="text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
          
          <div className="max-h-[400px] overflow-y-auto custom-scrollbar bg-white">
            {notifications.length === 0 ? (
              <div className="p-10 text-center flex flex-col items-center">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-xl mb-3 grayscale opacity-50">
                  📭
                </div>
                <p className="text-sm font-medium text-slate-400">You're all caught up!</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {notifications.map(notification => (
                  <div key={notification.id} className={`p-5 transition-colors hover:bg-slate-50/80 cursor-pointer flex gap-4 ${!notification.isRead ? 'bg-primary/[0.02]' : ''}`}>
                    <div className="mt-1">
                      {!notification.isRead ? (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      ) : (
                        <div className="w-2 h-2 bg-transparent rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-bold ${!notification.isRead ? 'text-slate-900' : 'text-slate-600'}`}>
                          {notification.title}
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">
                          {notification.time}
                        </p>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="p-3 border-t border-slate-50 bg-slate-50/50 text-center">
            <button className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
              View All Settings
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
