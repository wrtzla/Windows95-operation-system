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

export const IconWindows: React.FC<IconProps> = ({ className, size = 24 }) => (
   <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M2 11h9V2H2z" fill="#E83E38"/>
    <path d="M12 11h10V2h-10z" fill="#67B636"/>
    <path d="M2 22h9v-10H2z" fill="#3D74D9"/>
    <path d="M12 22h10v-10h-10z" fill="#F4BC08"/>
  </svg>
);