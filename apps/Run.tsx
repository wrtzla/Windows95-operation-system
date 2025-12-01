
import React, { useState } from 'react';
import { IconRun } from '../components/Icons';

interface RunProps {
  onRun: (command: string) => void;
  onCancel: () => void;
}

const Run: React.FC<RunProps> = ({ onRun, onCancel }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onRun(input.trim());
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#c0c0c0] p-4 text-sm select-none">
      <div className="flex gap-4 mb-4">
        <div>
          <IconRun size={32} />
        </div>
        <div className="flex-1">
          <p className="mb-4 text-black">
            Type the name of a program, folder, or document, and Windows will open it for you.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2">
              <label htmlFor="run-open" className="font-bold">Open:</label>
              <input
                id="run-open"
                type="text"
                autoFocus
                className="flex-1 win95-border-inset px-1 py-0.5 outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-auto">
        <button 
          onClick={() => onRun(input.trim())}
          className="w-20 py-1 win95-border-outset active:win95-border-inset font-bold"
        >
          OK
        </button>
        <button 
          onClick={onCancel}
          className="w-20 py-1 win95-border-outset active:win95-border-inset"
        >
          Cancel
        </button>
        <button 
          disabled
          className="w-20 py-1 win95-border-outset text-gray-500 shadow-none relative"
        >
          Browse...
          <div className="absolute inset-0 win95-border-outset pointer-events-none"></div>
        </button>
      </div>
    </div>
  );
};

export default Run;
