
import React, { useState, useEffect } from 'react';
import { AppId, WindowState } from './types';
import { WindowFrame } from './components/WindowFrame';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import DesktopIcon from './components/DesktopIcon';
import ContextMenu from './components/ContextMenu';
import { IconNotepad, IconGemini, IconMinesweeper, IconComputer, IconCalculator, IconPaint, IconIE } from './components/Icons';

// Apps
import Notepad from './apps/Notepad';
import GeminiChat from './apps/GeminiChat';
import Minesweeper from './apps/Minesweeper';
import Calculator from './apps/Calculator';
import Paint from './apps/Paint';
import Explorer from './apps/Explorer';
import Run from './apps/Run';
import InternetExplorer from './apps/InternetExplorer';

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

  const openWindow = (appId: AppId, data?: any) => {
    setIsStartOpen(false);
    
    // Check if Run is already open, if so focus it (optional, but typical for single instance dialogs)
    if (appId === AppId.RUN) {
        const existingRun = windows.find(w => w.appId === AppId.RUN);
        if (existingRun) {
            focusWindow(existingRun.id);
            return;
        }
    }

    const id = Date.now().toString();
    const isMobile = window.innerWidth < 640;
    
    const baseConfig = {
      id,
      appId,
      isOpen: true,
      isMinimized: false,
      isMaximized: isMobile && appId !== AppId.RUN, // Run is never maximized
      zIndex: nextZIndex,
      position: { x: 50 + (windows.length * 20), y: 50 + (windows.length * 20) },
      size: { width: 500, height: 400 }, // Default size
      data 
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
      case AppId.CALCULATOR:
        newWindow = { ...baseConfig, title: 'Calculator', size: { width: 260, height: 320 } };
        break;
      case AppId.PAINT:
        newWindow = { ...baseConfig, title: 'untitled - Paint', size: { width: 600, height: 450 } };
        break;
      case AppId.EXPLORER:
        newWindow = { ...baseConfig, title: 'My Computer', size: { width: 500, height: 400 } };
        break;
      case AppId.RUN:
        newWindow = { ...baseConfig, title: 'Run', size: { width: 350, height: 180 }, isMaximized: false };
        break;
      case AppId.INTERNET_EXPLORER:
        newWindow = { ...baseConfig, title: 'Internet Explorer', size: { width: 600, height: 480 } };
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
     // Run dialog is not maximizable in this implementation for simplicity
     const win = windows.find(w => w.id === id);
     if (win && win.appId === AppId.RUN) return;

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
        alert("Windows 95 React System\n\nCopyright © 2025\n\nComputer:\n   ReactOS 95\n   Gemini Powered\n   640KB RAM");
    }
  };

  const handleRunCommand = (command: string, windowId: string) => {
    const cmd = command.toLowerCase().trim();
    let found = false;

    // Command mapping
    if (cmd === 'notepad') { openWindow(AppId.NOTEPAD); found = true; }
    else if (cmd === 'calc' || cmd === 'calculator') { openWindow(AppId.CALCULATOR); found = true; }
    else if (cmd === 'mspaint' || cmd === 'paint' || cmd === 'pbrush') { openWindow(AppId.PAINT); found = true; }
    else if (cmd === 'mine' || cmd === 'minesweeper' || cmd === 'winmine') { openWindow(AppId.MINESWEEPER); found = true; }
    else if (cmd === 'explorer') { openWindow(AppId.EXPLORER); found = true; }
    else if (cmd === 'gemini') { openWindow(AppId.GEMINI); found = true; }
    else if (cmd === 'iexplore' || cmd === 'internet') { openWindow(AppId.INTERNET_EXPLORER); found = true; }
    else if (cmd === 'cmd') { alert('Command Prompt not installed.'); } // Placeholder
    
    if (found) {
        closeWindow(windowId);
    } else {
        alert(`Cannot find file '${command}' (or one of its components). Make sure the path and filename are correct and that all required libraries are available.`);
    }
  };

  const renderAppContent = (window: WindowState) => {
    switch (window.appId) {
      case AppId.NOTEPAD: return <Notepad initialContent={window.data?.content} />;
      case AppId.GEMINI: return <GeminiChat />;
      case AppId.MINESWEEPER: return <Minesweeper />;
      case AppId.CALCULATOR: return <Calculator />;
      case AppId.PAINT: return <Paint />;
      case AppId.EXPLORER: return <Explorer onOpenApp={openWindow} />;
      case AppId.RUN: return <Run onRun={(cmd) => handleRunCommand(cmd, window.id)} onCancel={() => closeWindow(window.id)} />;
      case AppId.INTERNET_EXPLORER: return <InternetExplorer />;
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
        <DesktopIcon label="My Computer" icon={IconComputer} onClick={() => openWindow(AppId.EXPLORER)} />
        <DesktopIcon label="The Internet" icon={IconIE} onClick={() => openWindow(AppId.INTERNET_EXPLORER)} />
        <DesktopIcon label="Gemini AI" icon={IconGemini} onClick={() => openWindow(AppId.GEMINI)} />
        <DesktopIcon label="Notepad" icon={IconNotepad} onClick={() => openWindow(AppId.NOTEPAD)} />
        <DesktopIcon label="Paint" icon={IconPaint} onClick={() => openWindow(AppId.PAINT)} />
        <DesktopIcon label="Calculator" icon={IconCalculator} onClick={() => openWindow(AppId.CALCULATOR)} />
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
          {renderAppContent(win)}
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