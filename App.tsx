import React, { useState, useEffect } from 'react';
import { AppId, WindowState } from './types';
import { WindowFrame } from './components/WindowFrame';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import DesktopIcon from './components/DesktopIcon';
import ContextMenu from './components/ContextMenu';
import { IconNotepad, IconGemini, IconMinesweeper, IconComputer } from './components/Icons';

// Apps
import Notepad from './apps/Notepad';
import GeminiChat from './apps/GeminiChat';
import Minesweeper from './apps/Minesweeper';

const App: React.FC = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [nextZIndex, setNextZIndex] = useState(1);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{x: number, y: number} | null>(null);

  // Close start menu when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = () => {
        setIsStartOpen(false);
        setContextMenu(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const openWindow = (appId: AppId) => {
    setIsStartOpen(false);
    
    // Check if single instance app is already open (optional logic)
    // For now allow multiple notepads, but maybe single Minesweeper
    
    const id = Date.now().toString();
    const isMobile = window.innerWidth < 640;
    
    const baseConfig = {
      id,
      appId,
      isOpen: true,
      isMinimized: false,
      isMaximized: isMobile,
      zIndex: nextZIndex,
      position: { x: 50 + (windows.length * 20), y: 50 + (windows.length * 20) },
    };

    let newWindow: WindowState;

    switch (appId) {
      case AppId.NOTEPAD:
        newWindow = { ...baseConfig, title: 'Untitled - Notepad', size: { width: 400, height: 300 } };
        break;
      case AppId.GEMINI:
        newWindow = { ...baseConfig, title: 'Gemini Assistant 95', size: { width: 500, height: 400 } };
        break;
      case AppId.MINESWEEPER:
        newWindow = { ...baseConfig, title: 'Minesweeper', size: { width: 300, height: 340 } };
        break;
      default:
        return;
    }

    setWindows([...windows, newWindow]);
    setNextZIndex(prev => prev + 1);
    setActiveWindowId(id);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const minimizeWindow = (id: string) => {
    setWindows(windows.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    setActiveWindowId(null);
  };

  const maximizeWindow = (id: string) => {
     setWindows(windows.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
     focusWindow(id);
  };

  const focusWindow = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, zIndex: nextZIndex, isMinimized: false } : w
    ));
    setNextZIndex(prev => prev + 1);
    setActiveWindowId(id);
  };

  const moveWindow = (id: string, x: number, y: number) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, position: { x, y } } : w
    ));
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsStartOpen(false);
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleContextAction = (action: string) => {
    if (action === 'properties') {
        const id = Date.now().toString();
        // Simple alert for now, could be a full dialog later
        alert("Windows 95 React System\n\nCopyright © 2025\n\nComputer:\n   ReactOS 95\n   Gemini Powered\n   640KB RAM");
    }
  };

  const renderAppContent = (appId: AppId) => {
    switch (appId) {
      case AppId.NOTEPAD: return <Notepad />;
      case AppId.GEMINI: return <GeminiChat />;
      case AppId.MINESWEEPER: return <Minesweeper />;
      default: return null;
    }
  };

  return (
    <div 
      className="h-full w-full overflow-hidden relative font-sans text-sm select-none" 
      onContextMenu={handleContextMenu}
    >
      
      {/* Desktop Icons */}
      <div className="absolute top-2 left-2 flex flex-col gap-4 z-0">
        <DesktopIcon label="My Computer" icon={IconComputer} onClick={() => {}} />
        <DesktopIcon label="Gemini AI" icon={IconGemini} onClick={() => openWindow(AppId.GEMINI)} />
        <DesktopIcon label="Notepad" icon={IconNotepad} onClick={() => openWindow(AppId.NOTEPAD)} />
        <DesktopIcon label="Minesweeper" icon={IconMinesweeper} onClick={() => openWindow(AppId.MINESWEEPER)} />
      </div>

      {/* Windows Area */}
      {windows.map(win => (
        <WindowFrame
          key={win.id}
          window={win}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onFocus={focusWindow}
          onMove={moveWindow}
        >
          {renderAppContent(win.appId)}
        </WindowFrame>
      ))}

      {/* Start Menu */}
      <div onClick={(e) => e.stopPropagation()}>
         <StartMenu 
            isOpen={isStartOpen} 
            onOpenApp={openWindow} 
         />
      </div>
      
      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu 
          x={contextMenu.x} 
          y={contextMenu.y} 
          onClose={() => setContextMenu(null)}
          onAction={handleContextAction}
        />
      )}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        onWindowClick={(id) => {
            const win = windows.find(w => w.id === id);
            if (win?.isMinimized || activeWindowId !== id) {
                focusWindow(id);
            } else {
                minimizeWindow(id);
            }
        }}
        onStartClick={() => {
            setIsStartOpen(!isStartOpen);
            setContextMenu(null);
        }}
        isStartOpen={isStartOpen}
      />
    </div>
  );
};

export default App;