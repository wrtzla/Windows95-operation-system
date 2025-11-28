import React from 'react';
import { AppId } from '../types';
import { IconNotepad, IconGemini, IconMinesweeper, IconComputer } from './Icons';

interface StartMenuProps {
  onOpenApp: (appId: AppId) => void;
  isOpen: boolean;
}

const StartMenu: React.FC<StartMenuProps> = ({ onOpenApp, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute bottom-10 left-1 w-64 bg-[#c0c0c0] win95-border-outset z-[60] flex flex-row">
      {/* Side banner */}
      <div className="w-8 bg-[#000080] flex items-end justify-center pb-2">
         <span className="text-white font-bold text-xl tracking-widest -rotate-90 whitespace-nowrap mb-4 transform origin-center translate-y-[-20px]">
           WINDOWS <span className="font-light">95</span>
         </span>
      </div>

      <div className="flex-1 flex flex-col py-1">
        <MenuItem icon={IconGemini} label="Gemini Assistant" onClick={() => onOpenApp(AppId.GEMINI)} />
        <MenuItem icon={IconNotepad} label="Notepad" onClick={() => onOpenApp(AppId.NOTEPAD)} />
        <MenuItem icon={IconMinesweeper} label="Minesweeper" onClick={() => onOpenApp(AppId.MINESWEEPER)} />
        
        <div className="border-b border-gray-400 border-t-white my-1 mx-1" />
        
        <MenuItem icon={IconComputer} label="Settings" onClick={() => {}} />
        <MenuItem icon={IconComputer} label="Shutdown" onClick={() => alert("It is now safe to turn off your computer.")} />
      </div>
    </div>
  );
};

const MenuItem: React.FC<{ icon: React.FC<any>; label: string; onClick: () => void }> = ({ icon: Icon, label, onClick }) => (
  <div 
    onClick={onClick}
    className="flex items-center gap-3 px-3 py-2 hover:bg-[#000080] hover:text-white cursor-pointer group"
  >
    <Icon className="w-6 h-6" />
    <span className="text-sm tracking-wide">{label}</span>
  </div>
);

export default StartMenu;