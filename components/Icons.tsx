
import React from 'react';
import { IconProps } from '../types';

export const IconNotepad: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M16 2H4C2.9 2 2 2.9 2 4V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V8L16 2Z" fill="#FFF" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M16 2V8H22" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M6 10H18" stroke="#000080" strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 14H18" stroke="#000080" strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 18H14" stroke="#000080" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IconGemini: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="url(#geminiGradient)" stroke="#000080" strokeWidth="1"/>
    <defs>
      <linearGradient id="geminiGradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4E87F6"/>
        <stop offset="1" stopColor="#E94057"/>
      </linearGradient>
    </defs>
  </svg>
);

export const IconComputer: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="2" y="3" width="20" height="14" rx="1" fill="#c0c0c0" stroke="black" strokeWidth="2"/>
    <rect x="4" y="5" width="16" height="10" fill="#008080" stroke="black" strokeWidth="1"/>
    <path d="M6 21H18" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    <path d="M2 17H22" stroke="black" strokeWidth="2"/>
  </svg>
);

export const IconMinesweeper: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="9" fill="black"/>
    <path d="M12 2V6" stroke="white" strokeWidth="2"/>
    <path d="M12 18V22" stroke="white" strokeWidth="2"/>
    <path d="M2 12H6" stroke="white" strokeWidth="2"/>
    <path d="M18 12H22" stroke="white" strokeWidth="2"/>
    <path d="M5 5L8 8" stroke="white" strokeWidth="2"/>
    <path d="M16 16L19 19" stroke="white" strokeWidth="2"/>
  </svg>
);

export const IconCalculator: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="4" y="2" width="16" height="20" rx="1" fill="#c0c0c0" stroke="black" strokeWidth="2"/>
    <rect x="6" y="5" width="12" height="4" fill="#fff" stroke="black" strokeWidth="1"/>
    <rect x="6" y="11" width="3" height="3" fill="#808080" stroke="black" strokeWidth="1"/>
    <rect x="10.5" y="11" width="3" height="3" fill="#808080" stroke="black" strokeWidth="1"/>
    <rect x="15" y="11" width="3" height="3" fill="#808080" stroke="black" strokeWidth="1"/>
    <rect x="6" y="15" width="3" height="3" fill="#808080" stroke="black" strokeWidth="1"/>
    <rect x="10.5" y="15" width="3" height="3" fill="#808080" stroke="black" strokeWidth="1"/>
    <rect x="15" y="15" width="3" height="3" fill="#808080" stroke="black" strokeWidth="1"/>
  </svg>
);

export const IconPaint: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M18.5 2.5L21.5 5.5C21.7 5.7 21.7 6.1 21.5 6.3L20 7.8L16.2 4L17.7 2.5C17.9 2.3 18.3 2.3 18.5 2.5Z" fill="#E83E38" stroke="black"/>
    <path d="M16.2 4L20 7.8L9.5 18.3L5.7 14.5L16.2 4Z" fill="#F4BC08" stroke="black"/>
    <path d="M5.7 14.5L9.5 18.3L4.5 19.5L5.7 14.5Z" fill="#F4BC08" stroke="black"/>
    <rect x="2" y="20" width="20" height="4" fill="#4E87F6"/>
    <circle cx="6" cy="11" r="2" fill="#67B636"/>
    <circle cx="11" cy="6" r="1.5" fill="#3D74D9"/>
  </svg>
);

export const IconWindows: React.FC<IconProps> = ({ className, size = 24 }) => (
   <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M2 11h9V2H2z" fill="#E83E38"/>
    <path d="M12 11h10V2h-10z" fill="#67B636"/>
    <path d="M2 22h9v-10H2z" fill="#3D74D9"/>
    <path d="M12 22h10v-10h-10z" fill="#F4BC08"/>
  </svg>
);

export const IconFolder: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M2 6C2 4.9 2.9 4 4 4H10L12 6H20C21.1 6 22 6.9 22 8V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6Z" fill="#F4BC08" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M2 8H22" stroke="black" strokeWidth="2"/>
  </svg>
);

export const IconFileText: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
     <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="white" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
     <path d="M14 2V8H20" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
     <path d="M6 12H18" stroke="#808080" strokeWidth="2" strokeDasharray="2 2" />
     <path d="M6 16H18" stroke="#808080" strokeWidth="2" strokeDasharray="2 2" />
  </svg>
);

export const IconHardDrive: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4 6H20V12H4V6Z" fill="#c0c0c0" stroke="black" strokeWidth="2"/>
    <rect x="2" y="12" width="20" height="6" fill="#808080" stroke="black" strokeWidth="2"/>
    <circle cx="6" cy="15" r="1" fill="#00ff00"/>
    <circle cx="18" cy="15" r="1" fill="red"/>
  </svg>
);

export const IconRun: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* File behind */}
    <path d="M6 4h10l4 4v12h-14z" fill="white" stroke="black" strokeWidth="1" />
    <path d="M16 4v4h4" stroke="black" strokeWidth="1" />
    {/* Window overlay */}
    <rect x="2" y="12" width="14" height="10" fill="#c0c0c0" stroke="black" strokeWidth="1" />
    <rect x="3" y="13" width="12" height="2" fill="#000080" />
  </svg>
);

export const IconIE: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="10" fill="#87CEEB" stroke="black" />
    <path d="M2 12H22" stroke="black" strokeWidth="0.5" />
    <path d="M12 2V22" stroke="black" strokeWidth="0.5" />
    <path d="M12 2C16 2 20 6 20 12C20 18 16 22 12 22C8 22 4 18 4 12C4 6 8 2 12 2Z" stroke="black" strokeWidth="0.5" fill="none"/>
    <path d="M5 12C5 12 8 16 12 16C16 16 19 12 19 12" stroke="black" strokeWidth="0.5" fill="none"/>
    <path d="M16 8L8 16" stroke="black" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    <text x="7" y="18" fontFamily="serif" fontSize="16" fontWeight="bold" fill="#000080">e</text>
  </svg>
);

export const IconBlog: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.79 4.21 10.21L9 15V16C9 17.1 9.9 18 11 18V19.93ZM17.9 17.39C17.64 16.58 16.9 16 16 16H15V13C15 12.45 14.55 12 14 12H8V10H10C10.55 10 11 9.55 11 9V7H13C14.1 7 15 6.1 15 5V4.59C17.93 5.78 20 8.65 20 12C20 14.08 19.2 15.97 17.9 17.39Z" fill="#4E87F6" stroke="black" strokeWidth="1"/>
  </svg>
);

export const IconCD: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="10" fill="#c0c0c0" stroke="black"/>
    <circle cx="12" cy="12" r="3" fill="white" stroke="gray"/>
    <path d="M12 2A10 10 0 0 1 22 12" stroke="white" strokeWidth="1" fill="none"/>
  </svg>
);

export const IconXP: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
     <IconCD size={size} className="absolute"/>
     <text x="6" y="16" fontSize="10" fontWeight="bold" fill="blue">XP</text>
  </svg>
);

export const IconWin7: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
     <IconCD size={size} className="absolute"/>
     <text x="8" y="16" fontSize="10" fontWeight="bold" fill="#008080">7</text>
  </svg>
);

export const IconWin10: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
     <IconCD size={size} className="absolute"/>
     <text x="6" y="16" fontSize="10" fontWeight="bold" fill="#004275">10</text>
  </svg>
);
