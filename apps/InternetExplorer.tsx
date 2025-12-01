
import React, { useState, useEffect } from 'react';
import { generateWebPage } from '../services/geminiService';

const InternetExplorer: React.FC = () => {
  const [url, setUrl] = useState('http://www.microsoft.com');
  const [inputUrl, setInputUrl] = useState('http://www.microsoft.com');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    loadPage(url);
  }, []);

  const loadPage = async (targetUrl: string) => {
    setIsLoading(true);
    // Simple mock loading time
    setContent('<center><br/><br/><h3>Connecting to host...</h3><p>Dialing...</p></center>');
    
    try {
      const html = await generateWebPage(targetUrl);
      setContent(html);
    } catch (e) {
      setContent('<center><h1>Error</h1><p>Failed to load page.</p></center>');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl !== url) {
        setHistory(prev => [...prev, url]);
        setUrl(inputUrl);
        loadPage(inputUrl);
    }
  };

  const handleHome = () => {
      setHistory(prev => [...prev, url]);
      const home = 'http://www.microsoft.com';
      setUrl(home);
      setInputUrl(home);
      loadPage(home);
  };

  const handleBack = () => {
      if (history.length > 0) {
          const prev = history[history.length - 1];
          setHistory(prevHist => prevHist.slice(0, -1));
          setUrl(prev);
          setInputUrl(prev);
          loadPage(prev);
      }
  };

  const ToolbarButton = ({ label, onClick, disabled = false }: any) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-3 py-1 text-xs border border-gray-400 bg-[#c0c0c0] 
        ${disabled ? 'text-gray-500' : 'active:win95-border-inset win95-border-outset hover:bg-[#dfdfdf]'}
      `}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col h-full w-full bg-[#c0c0c0] font-sans">
      {/* Title Bar - Handled by WindowFrame */}
      
      {/* Menu Bar */}
      <div className="flex gap-4 px-2 py-0.5 bg-[#c0c0c0] border-b border-white text-sm select-none">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Go</span>
        <span>Favorites</span>
        <span>Help</span>
      </div>

      {/* Toolbar */}
      <div className="flex gap-1 p-1 border-b border-gray-500">
        <ToolbarButton label="Back" onClick={handleBack} disabled={history.length === 0} />
        <ToolbarButton label="Forward" disabled />
        <ToolbarButton label="Stop" disabled={!isLoading} />
        <ToolbarButton label="Refresh" onClick={() => loadPage(url)} />
        <ToolbarButton label="Home" onClick={handleHome} />
        <ToolbarButton label="Search" onClick={() => {}} />
      </div>

      {/* Address Bar */}
      <div className="flex items-center gap-2 p-1 border-b border-white">
        <span className="text-xs">Address:</span>
        <form onSubmit={handleGo} className="flex-1 flex gap-1">
            <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="flex-1 px-1 text-sm win95-border-inset outline-none"
            />
            <button type="submit" className="px-2 text-xs win95-border-outset active:win95-border-inset">Go</button>
        </form>
      </div>

      {/* Viewport */}
      <div className="flex-1 bg-white win95-border-inset m-1 relative overflow-hidden">
        {isLoading && (
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-800 animate-pulse"></div>
        )}
        <div 
            className="w-full h-full overflow-auto p-4 ie-content font-serif"
            dangerouslySetInnerHTML={{ __html: content }}
        />
        
        {/* IE Icon Animation overlay */}
        <div className="absolute top-2 right-4 pointer-events-none opacity-20">
             {/* Using classic font E here as decoration */}
             <span className="font-serif text-6xl font-bold italic text-blue-900">e</span>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 win95-border-inset mx-1 mb-1 bg-[#c0c0c0] flex items-center px-2 text-xs">
        {isLoading ? 'Opening page...' : 'Done'}
      </div>
    </div>
  );
};

export default InternetExplorer;