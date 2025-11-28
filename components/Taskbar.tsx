import React, { useState, useEffect } from 'react';
import { WindowState, AppId } from '../types';
import { IconWindows } from './Icons';

interface TaskbarProps {
  windows: WindowState[];
  activeWindowId: string | null;
  onWindowClick: (id: string) => void;
  onStartClick: () => void;
  isStartOpen: boolean;
}

const Taskbar: React.FC<TaskbarProps> = ({ 
  windows, 
  activeWindowId, 
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

  return (
    <div className="h-10 bg-[#c0c0c0] border-t-2 border-white flex items-center px-1 fixed bottom-0 left-0 w-full z-50">
      <button
        onClick={(e) => { e.stopPropagation(); onStartClick(); }}
        className={`
          flex items-center gap-1.5 px-2 py-1 h-8 mr-2
          font-bold text-sm tracking-wide
          ${isStartOpen ? 'win95-border-inset bg-[#e0e0e0] border-2 border-black border-r-white border-b-white' : 'win95-border-outset active:win95-border-inset'}
        `}
      >
        <IconWindows className="w-5 h-5" />
        Start
      </button>

      <div className="flex-1 flex gap-1 overflow-x-auto px-1">
        {windows.map((win) => (
          <button
            key={win.id}
            onClick={() => onWindowClick(win.id)}
            className={`
              flex items-center gap-2 px-2 h-8 min-w-[120px] max-w-[160px]
              truncate text-sm text-left
              ${activeWindowId === win.id && !win.isMinimized 
                ? 'win95-border-inset bg-[#e0e0e0] font-bold' 
                : 'win95-border-outset active:win95-border-inset'}
            `}
          >
             {/* Small icon placeholder */}
             <div className="w-4 h-4 rounded-full bg-gray-400 flex-shrink-0" />
             <span className="truncate">{win.title}</span>
          </button>
        ))}
      </div>

      <div className="w-24 h-8 win95-border-inset bg-[#c0c0c0] flex items-center justify-center ml-2 px-2 text-sm">
        <span className="mr-1">🔈</span>
        {formatTime(time)}
      </div>
    </div>
  );
};

export default Taskbar;