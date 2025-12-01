
import React, { useState, useEffect } from 'react';
import { WindowState, Theme } from '../types';
import { IconWindows } from './Icons';

interface TaskbarProps {
  windows: WindowState[];
  activeWindowId: string | null;
  theme: Theme;
  onWindowClick: (id: string) => void;
  onStartClick: () => void;
  isStartOpen: boolean;
}

const Taskbar: React.FC<TaskbarProps> = ({ 
  windows, 
  activeWindowId, 
  theme,
  onWindowClick, 
  onStartClick, 
  isStartOpen 
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isWinXP = theme === Theme.WINXP;

  return (
    <div 
        className="h-10 flex items-center px-1 fixed bottom-0 left-0 w-full z-50 transition-all duration-300"
        style={{
            background: 'var(--taskbar-bg)',
            borderTop: '2px solid var(--taskbar-border-top)'
        }}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onStartClick(); }}
        className={`
          flex items-center gap-1.5 px-2 py-1 h-8 mr-2
          font-bold text-sm tracking-wide transition-all
          ${isStartOpen ? 'win95-border-inset' : 'win95-border-outset active:win95-border-inset'}
        `}
        style={{
            background: 'var(--start-btn-bg)',
            color: 'var(--start-btn-text)',
            borderRadius: isWinXP ? '0 10px 10px 0' : 'var(--border-radius-btn)',
            border: 'none',
            boxShadow: theme === Theme.WIN95 ? undefined : '2px 2px 4px rgba(0,0,0,0.3)'
        }}
      >
        <IconWindows className="w-5 h-5" />
        <span className={isWinXP ? 'italic text-base' : ''}>Start</span>
      </button>

      <div className="flex-1 flex gap-1 overflow-x-auto px-1">
        {windows.map((win) => (
          <button
            key={win.id}
            onClick={() => onWindowClick(win.id)}
            className={`
              flex items-center gap-2 px-2 h-8 min-w-[120px] max-w-[160px]
              truncate text-sm text-left transition-all
              ${activeWindowId === win.id && !win.isMinimized 
                ? 'win95-border-inset font-bold opacity-100' 
                : 'win95-border-outset active:win95-border-inset opacity-90'}
            `}
            style={{
                background: activeWindowId === win.id ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                color: '#fff',
                borderRadius: 'var(--border-radius-btn)',
                border: theme === Theme.WIN95 ? undefined : '1px solid rgba(255,255,255,0.2)'
            }}
          >
             <div className="w-4 h-4 rounded-full bg-gray-400 flex-shrink-0 border border-black" />
             <span className="truncate drop-shadow-md text-black mix-blend-difference">{win.title}</span>
          </button>
        ))}
      </div>

      <div 
        className="w-24 h-8 win95-border-inset flex items-center justify-center ml-2 px-2 text-sm"
        style={{
            background: 'rgba(0,0,0,0.1)',
            color: theme === Theme.WIN95 ? '#000' : '#fff',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 'var(--border-radius-btn)'
        }}
      >
        <span className="mr-1">🔈</span>
        {formatTime(time)}
      </div>
    </div>
  );
};

export default Taskbar;
