
import React, { useState } from 'react';
import { IconFolder, IconFileText, IconHardDrive } from '../components/Icons';
import { AppId } from '../types';

interface ExplorerProps {
  onOpenApp: (appId: AppId, data?: any) => void;
}

interface FileSystemItem {
  id: string;
  name: string;
  type: 'folder' | 'file' | 'drive';
  content?: string; // Content for files
  children?: FileSystemItem[];
}

// Initial mock file system
const INITIAL_FS: FileSystemItem[] = [
  {
    id: 'c-drive',
    name: 'C:',
    type: 'drive',
    children: [
      {
        id: 'windows',
        name: 'Windows',
        type: 'folder',
        children: [
          { id: 'system32', name: 'System32', type: 'folder', children: [] },
          { id: 'fonts', name: 'Fonts', type: 'folder', children: [] },
          { id: 'readme', name: 'Readme.txt', type: 'file', content: 'Windows 95 React OS\nVersion 1.0\n\nEnjoy the nostalgia!' }
        ]
      },
      {
        id: 'documents',
        name: 'My Documents',
        type: 'folder',
        children: [
           { id: 'todo', name: 'todo.txt', type: 'file', content: '- Buy milk\n- Feed the cat\n- Install Netscape Navigator' },
           { id: 'secret', name: 'secret_plans.txt', type: 'file', content: 'Top Secret Plans:\n1. Rebuild Windows 95 in React\n2. ???\n3. Profit' }
        ]
      },
      {
        id: 'program_files',
        name: 'Program Files',
        type: 'folder',
        children: []
      }
    ]
  }
];

const Explorer: React.FC<ExplorerProps> = ({ onOpenApp }) => {
  const [currentPath, setCurrentPath] = useState<FileSystemItem[]>([]);
  const [fs, setFs] = useState<FileSystemItem[]>(INITIAL_FS);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Helper to find current folder content
  const getCurrentFolderContent = () => {
    if (currentPath.length === 0) {
      return fs; // Root level (My Computer)
    }
    const currentFolder = currentPath[currentPath.length - 1];
    return currentFolder.children || [];
  };

  const handleDoubleClick = (item: FileSystemItem) => {
    if (item.type === 'folder' || item.type === 'drive') {
      setCurrentPath([...currentPath, item]);
      setSelectedId(null);
    } else if (item.type === 'file') {
      // Open file
      onOpenApp(AppId.NOTEPAD, { content: item.content });
    }
  };

  const handleUp = () => {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, -1));
      setSelectedId(null);
    }
  };

  const handleCreateFolder = () => {
    const newName = prompt("Enter new folder name:", "New Folder");
    if (!newName) return;

    if (currentPath.length === 0) {
        alert("Cannot create folders at root level.");
        return;
    }

    const parent = currentPath[currentPath.length - 1];
    if (!parent.children) parent.children = [];
    
    // We need to update the state immutably (simplification here for depth)
    // For a deep update in a real app, use immer or deep cloning. 
    // Here we'll just push to the object reference since it's local state and simple.
    // To trigger re-render we clone the root array.
    
    parent.children.push({
        id: Date.now().toString(),
        name: newName,
        type: 'folder',
        children: []
    });
    
    // Force update
    setFs([...fs]);
  };

  const currentItems = getCurrentFolderContent();
  const pathString = currentPath.length === 0 ? 'My Computer' : 'My Computer\\' + currentPath.map(p => p.name).join('\\');

  return (
    <div className="flex flex-col h-full w-full bg-[#c0c0c0] select-none text-sm">
      {/* Menu Bar */}
      <div className="flex gap-4 px-2 py-0.5 bg-[#c0c0c0] border-b border-gray-400">
        <span className="cursor-pointer underline-offset-2 hover:underline">File</span>
        <span className="cursor-pointer underline-offset-2 hover:underline">Edit</span>
        <span className="cursor-pointer underline-offset-2 hover:underline">View</span>
        <span className="cursor-pointer underline-offset-2 hover:underline">Help</span>
      </div>

      {/* Toolbar (Simplified) */}
      <div className="flex items-center gap-2 p-1 border-b border-white">
          <span className="text-gray-500 text-xs px-2">Address:</span>
          <div className="flex-1 bg-white win95-border-inset px-1 py-0.5 truncate bg-white">
             {pathString}
          </div>
      </div>

      <div className="flex items-center gap-2 p-1 border-b border-gray-400 mb-1">
         <button onClick={handleUp} disabled={currentPath.length === 0} className="px-2 py-0.5 win95-border-outset active:win95-border-inset disabled:text-gray-500">
            ⬆ Up
         </button>
         <button onClick={handleCreateFolder} className="px-2 py-0.5 win95-border-outset active:win95-border-inset">
            📁 New Folder
         </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white win95-border-inset m-1 p-2 overflow-auto">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-2">
            {currentItems.map(item => (
                <div 
                    key={item.id}
                    className="flex flex-col items-center group cursor-pointer"
                    onClick={() => setSelectedId(item.id)}
                    onDoubleClick={() => handleDoubleClick(item)}
                >
                    <div className={`p-1 ${selectedId === item.id ? 'opacity-80' : ''}`}>
                        {item.type === 'drive' && <IconHardDrive size={32} />}
                        {item.type === 'folder' && <IconFolder size={32} />}
                        {item.type === 'file' && <IconFileText size={32} />}
                    </div>
                    <span className={`text-xs text-center px-1 truncate w-full ${selectedId === item.id ? 'bg-[#000080] text-white' : 'text-black'}`}>
                        {item.name}
                    </span>
                </div>
            ))}
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="h-6 win95-border-inset mx-1 mb-1 bg-[#c0c0c0] flex items-center px-2 text-xs gap-4">
         <span>{currentItems.length} object(s)</span>
         <span>{(currentItems.length * 1.5).toFixed(1)}KB</span>
      </div>
    </div>
  );
};

export default Explorer;
