import React, { useRef, useState, useEffect } from 'react';
import { WindowState } from '../types';

interface WindowFrameProps {
  window: WindowState;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  children: React.ReactNode;
}

const WindowFrame: React.FC<WindowFrameProps> = ({
  window,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  children
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        onMove(window.id, e.clientX - dragOffset.x, e.clientY - dragOffset.y);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, onMove, window.id]);

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus(window.id);
    if (!window.isMaximized) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - window.position.x,
        y: e.clientY - window.position.y
      });
    }
  };

  if (!window.isOpen || window.isMinimized) return null;

  return (
    <div
      ref={windowRef}
      className={`absolute flex flex-col bg-[#c0c0c0] p-1 ${window.isMaximized ? 'inset-0 w-full h-full' : 'win95-border-outset'}`}
      style={{
        zIndex: window.zIndex,
        left: window.isMaximized ? 0 : window.position.x,
        top: window.isMaximized ? 0 : window.position.y,
        width: window.isMaximized ? '100%' : window.size.width,
        height: window.isMaximized ? 'calc(100% - 40px)' : window.size.height, // Subtract taskbar height approximation
      }}
      onMouseDown={() => onFocus(window.id)}
    >
      {/* Title Bar */}
      <div
        className={`flex items-center justify-between px-1 py-0.5 mb-1 cursor-default select-none ${
          window.zIndex >= 10 ? 'bg-[#000080]' : 'bg-[#808080]'
        }`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-1 text-white font-bold tracking-wide truncate">
          <span className="text-sm px-1">{window.title}</span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(window.id); }}
            className="w-5 h-4 bg-[#c0c0c0] win95-border-outset flex items-center justify-center active:win95-border-inset"
          >
            <div className="w-2 h-0.5 bg-black translate-y-1"></div>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(window.id); }}
            className="w-5 h-4 bg-[#c0c0c0] win95-border-outset flex items-center justify-center active:win95-border-inset"
          >
            <div className="w-2.5 h-2 border border-black border-t-[2px]"></div>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(window.id); }}
            className="w-5 h-4 bg-[#c0c0c0] win95-border-outset flex items-center justify-center active:win95-border-inset ml-1"
          >
            <span className="text-black text-xs font-bold -mt-0.5">✕</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white relative overflow-hidden win95-border-inset text-black">
        {children}
      </div>
    </div>
  );
};

export default WindowFrame;