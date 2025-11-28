import React from 'react';
import { IconProps } from '../types';

interface DesktopIconProps {
  label: string;
  icon: React.FC<IconProps>;
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ label, icon: Icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center justify-center w-20 p-2 cursor-pointer group active:opacity-50"
    >
      <div className="mb-1">
        <Icon className="w-8 h-8" />
      </div>
      <span className="text-white text-xs text-center font-normal px-1 bg-[#008080] group-hover:bg-[#000080] border border-transparent group-hover:border-dotted group-hover:border-white">
        {label}
      </span>
    </div>
  );
};

export default DesktopIcon;