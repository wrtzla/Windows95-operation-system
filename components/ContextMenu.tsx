import React, { useEffect, useRef } from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onAction: (action: string) => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, onAction }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Adjust position if menu goes off screen
  const menuStyle: React.CSSProperties = {
    top: y,
    left: x,
  };

  // Simple adjustment logic to keep menu on screen (basic implementation)
  if (menuRef.current) {
     if (x + 160 > window.innerWidth) menuStyle.left = x - 160;
     if (y + 200 > window.innerHeight) menuStyle.top = y - 200;
  }

  const menuItems = [
    { label: 'Arrange Icons', hasSubmenu: true, disabled: true },
    { label: 'Line up Icons', disabled: true },
    { separator: true },
    { label: 'Paste', disabled: true },
    { label: 'Paste Shortcut', disabled: true },
    { separator: true },
    { label: 'New', hasSubmenu: true, disabled: true },
    { separator: true },
    { label: 'Properties', action: 'properties' },
  ];

  return (
    <div 
      ref={menuRef}
      className="fixed z-[9999] bg-[#c0c0c0] win95-border-outset py-0.5 shadow-[2px_2px_4px_rgba(0,0,0,0.5)] flex flex-col w-40 cursor-default"
      style={menuStyle}
      onClick={(e) => e.stopPropagation()} // Prevent clicks inside menu from closing it immediately via App's onClick
      onContextMenu={(e) => e.preventDefault()}
    >
      {menuItems.map((item, idx) => {
        if (item.separator) {
           return <div key={idx} className="h-[2px] border-b border-white border-t border-[#808080] my-1 mx-1" />;
        }
        
        return (
          <div 
            key={idx}
            className={`
              px-4 py-0.5 flex items-center justify-between text-sm
              ${item.disabled ? 'text-[#808080] shadow-none' : 'hover:bg-[#000080] hover:text-white group'}
            `}
            onClick={(e) => {
                if(!item.disabled) {
                    if (item.action) onAction(item.action);
                    onClose();
                }
            }}
          >
            <span className="truncate relative">
               {/* Emulate disabled text shadow for authentic look */}
               {item.disabled && <span className="absolute left-[1px] top-[1px] text-white -z-10">{item.label}</span>}
               {item.label}
            </span>
            {item.hasSubmenu && (
               <span className={`text-black ${!item.disabled && 'group-hover:text-white'}`}>▸</span>
            )}
          </div>
        )
      })}
    </div>
  );
};

export default ContextMenu;