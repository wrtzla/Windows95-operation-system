
import React, { useRef, useState, useEffect } from 'react';
import { WindowState, Theme } from '../types';

interface WindowFrameProps {
  window: WindowState;
  theme: Theme;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  onResize: (id: string, width: number, height: number) => void;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  window,
  theme,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onResize,
  children
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  // Resize state
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const [initialResizeState, setInitialResizeState] = useState({
    mouseX: 0,
    mouseY: 0,
    width: 0,
    height: 0
  });

  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Handle Moving
      if (isDragging) {
        onMove(window.id, e.clientX - dragOffset.x, e.clientY - dragOffset.y);
      }

      // Handle Resizing
      if (isResizing && resizeDirection) {
        e.preventDefault();
        const deltaX = e.clientX - initialResizeState.mouseX;
        const deltaY = e.clientY - initialResizeState.mouseY;

        let newWidth = initialResizeState.width;
        let newHeight = initialResizeState.height;

        if (resizeDirection.includes('e')) {
            newWidth = initialResizeState.width + deltaX;
        }
        if (resizeDirection.includes('s')) {
            newHeight = initialResizeState.height + deltaY;
        }

        onResize(window.id, newWidth, newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, isResizing, resizeDirection, initialResizeState, onMove, onResize, window.id]);

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

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
      e.stopPropagation();
      e.preventDefault();
      onFocus(window.id);
      setIsResizing(true);
      setResizeDirection(direction);
      setInitialResizeState({
          mouseX: e.clientX,
          mouseY: e.clientY,
          width: window.size.width,
          height: window.size.height
      });
  };

  if (!window.isOpen || window.isMinimized) return null;

  const isWin10 = theme === Theme.WIN10;
  const isWin7 = theme === Theme.WIN7;

  return (
    <div
      ref={windowRef}
      className={`absolute flex flex-col p-1 ${window.isMaximized ? 'inset-0 w-full h-full' : 'win95-border-outset'}`}
      style={{
        zIndex: window.zIndex,
        left: window.isMaximized ? 0 : window.position.x,
        top: window.isMaximized ? 0 : window.position.y,
        width: window.isMaximized ? '100%' : window.size.width,
        height: window.isMaximized ? 'calc(100% - 40px)' : window.size.height,
        backgroundColor: 'var(--window-bg)',
        border: `${window.isMaximized ? 0 : 'var(--win-border-width)'} solid var(--window-bg)`,
        borderRadius: window.isMaximized ? 0 : 'var(--border-radius-win)',
        boxShadow: isWin7 && !window.isMaximized ? '0 10px 20px rgba(0,0,0,0.4)' : undefined
      }}
      onMouseDown={() => onFocus(window.id)}
      onContextMenu={(e) => e.stopPropagation()} 
    >
      {/* Title Bar */}
      <div
        className={`flex items-center justify-between px-2 py-1 mb-1 cursor-default select-none transition-colors duration-300`}
        style={{
            background: 'var(--window-header-bg)',
            color: 'var(--window-header-text)',
            borderRadius: window.isMaximized ? 0 : 'var(--border-radius-win) var(--border-radius-win) 0 0'
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-1 font-bold tracking-wide truncate">
          <span className="text-sm">{window.title}</span>
        </div>
        <div className="flex gap-1 items-center">
          {!isWin10 && (
            <>
            <button
                onClick={(e) => { e.stopPropagation(); onMinimize(window.id); }}
                className="w-5 h-5 flex items-center justify-center bg-[var(--close-btn-bg)]"
                style={{ borderRadius: 'var(--border-radius-btn)', border: '1px solid gray' }}
            >
                <div className="w-2 h-0.5 bg-black translate-y-1"></div>
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); onMaximize(window.id); }}
                className="w-5 h-5 flex items-center justify-center bg-[var(--close-btn-bg)]"
                style={{ borderRadius: 'var(--border-radius-btn)', border: '1px solid gray' }}
            >
                <div className="w-2.5 h-2 border border-black border-t-[2px]"></div>
            </button>
            </>
          )}

          <button
            onClick={(e) => { e.stopPropagation(); onClose(window.id); }}
            className="w-5 h-5 flex items-center justify-center ml-1 font-bold"
            style={{ 
                backgroundColor: 'var(--close-btn-bg)', 
                color: 'var(--close-btn-text)',
                borderRadius: 'var(--border-radius-btn)',
                border: isWin10 ? 'none' : '1px solid gray'
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 relative overflow-hidden win95-border-inset" style={{ backgroundColor: '#fff', color: '#000' }}>
        {children}
      </div>

      {/* Resize Handles (Only show if not maximized) */}
      {!window.isMaximized && (
        <>
          {/* Right Handle */}
          <div 
            className="absolute right-0 top-0 bottom-4 w-1 cursor-ew-resize z-10"
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          />
          {/* Bottom Handle */}
          <div 
            className="absolute left-0 bottom-0 right-4 h-1 cursor-ns-resize z-10"
            onMouseDown={(e) => handleResizeStart(e, 's')}
          />
          {/* Bottom Right Corner Handle (Grip) */}
          <div 
            className="absolute right-0 bottom-0 w-4 h-4 cursor-nwse-resize z-20 flex items-end justify-end p-[1px]"
            onMouseDown={(e) => handleResizeStart(e, 'se')}
          >
             <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
               <path d="M8 2L9 3V9H3L2 8H8V2Z" fill="#808080"/>
               <path d="M5 5L6 6V9H3L2 8H5V5Z" fill="#808080"/>
             </svg>
          </div>
        </>
      )}
    </div>
  );
};
