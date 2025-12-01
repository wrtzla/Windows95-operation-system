
export enum AppId {
  NOTEPAD = 'notepad',
  GEMINI = 'gemini',
  MINESWEEPER = 'minesweeper',
  ABOUT = 'about',
  CALCULATOR = 'calculator',
  PAINT = 'paint',
  EXPLORER = 'explorer',
  RUN = 'run',
  INTERNET_EXPLORER = 'internet_explorer',
  BLOG = 'blog',
  INSTALL_XP = 'install_xp',
  INSTALL_7 = 'install_7',
  INSTALL_10 = 'install_10'
}

export enum Theme {
  WIN95 = 'win95',
  WINXP = 'winxp',
  WIN7 = 'win7',
  WIN10 = 'win10'
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
  data?: any; // For passing initial data to apps (e.g., file content)
}

export interface IconProps {
  className?: string;
  size?: number;
}
