
import React, { useState } from 'react';

interface NotepadProps {
  initialContent?: string;
}

const Notepad: React.FC<NotepadProps> = ({ initialContent }) => {
  const [text, setText] = useState(initialContent || 'Welcome to Windows 95 React!\n\nThis is a simple notepad.');

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex gap-4 px-2 py-1 bg-[#c0c0c0] border-b border-gray-400 text-sm">
        <span className="cursor-pointer underline-offset-2 hover:underline">File</span>
        <span className="cursor-pointer underline-offset-2 hover:underline">Edit</span>
        <span className="cursor-pointer underline-offset-2 hover:underline">Search</span>
        <span className="cursor-pointer underline-offset-2 hover:underline">Help</span>
      </div>
      <textarea
        className="flex-1 w-full h-full p-2 resize-none outline-none font-mono text-sm"
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
};

export default Notepad;
