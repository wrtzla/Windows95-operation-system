export enum AppId {
  NOTEPAD = 'notepad',
  GEMINI = 'gemini',
  MINESWEEPER = 'minesweeper',
  ABOUT = 'about',
  CALCULATOR = 'calculator'
}

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface IconProps {
  className?: string;
  size?: number;
}