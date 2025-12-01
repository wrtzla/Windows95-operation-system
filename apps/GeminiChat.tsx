import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { generateChatResponse } from '../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

// Stateful component to handle Code Block copy functionality
const CodeBlock = ({ node, className, children, ...props }: any) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  
  // Determine if it is inline code or a code block
  const isInline = !match && !String(children).includes('\n');

  if (isInline) {
    return (
      <code 
        {...props} 
        className="bg-white/50 px-1 font-mono text-xs border border-gray-400 mx-0.5 text-blue-900"
      >
        {children}
      </code>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-2 flex flex-col font-mono text-xs group">
      {/* Code Block Toolbar styled like a Windows 95 control */}
      <div className="bg-[#c0c0c0] px-2 py-1 flex justify-between items-center border-t border-l border-white border-b border-r border-gray-500">
        <span className="text-gray-600 font-bold uppercase">{match ? match[1] : 'CODE'}</span>
        <button
          onClick={handleCopy}
          className="px-2 py-0.5 bg-[#c0c0c0] win95-border-outset active:win95-border-inset text-black flex items-center gap-1 hover:bg-[#dfdfdf] text-[10px] uppercase font-bold tracking-wide"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      
      {/* Code Content */}
      <code 
        {...props} 
        className="block bg-white p-2 overflow-x-auto win95-border-inset text-black whitespace-pre border-t-0"
      >
        {children}
      </code>
    </div>
  );
};

const GeminiChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', text: 'Hello! I am Gemini 95. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Prepare history for API
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await generateChatResponse(userMsg.text, history);
    
    const botMsg: Message = { id: (Date.now() + 1).toString(), role: 'model', text: responseText };
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#c0c0c0] text-sm">
      <div className="flex-1 overflow-y-auto p-2 bg-white win95-border-inset m-1">
        {messages.map((msg) => (
          <div key={msg.id} className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
             <div className={`max-w-[85%] p-2 ${msg.role === 'user' ? 'bg-[#000080] text-white' : 'bg-[#dfdfdf] text-black'} border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]`}>
                <div className={`markdown-content font-sans leading-tight ${msg.role === 'user' ? 'text-white' : 'text-black'}`}>
                   <ReactMarkdown
                     components={{
                       // Custom renderers for specific elements to match Win95 style
                       a: ({node, ...props}) => <a {...props} className={`underline ${msg.role === 'user' ? 'text-white' : 'text-blue-800'}`} target="_blank" rel="noreferrer" />,
                       code: CodeBlock, // Use our new component here
                       ul: ({node, ...props}) => <ul {...props} className="list-disc list-inside my-1 pl-1" />,
                       ol: ({node, ...props}) => <ol {...props} className="list-decimal list-inside my-1 pl-1" />,
                       p: ({node, ...props}) => <p {...props} className="mb-2 last:mb-0" />,
                       h1: ({node, ...props}) => <h1 {...props} className="text-lg font-bold mb-1 mt-2" />,
                       h2: ({node, ...props}) => <h2 {...props} className="text-base font-bold mb-1 mt-2" />,
                       h3: ({node, ...props}) => <h3 {...props} className="text-sm font-bold mb-1 mt-1" />,
                       blockquote: ({node, ...props}) => <blockquote {...props} className="border-l-4 border-gray-500 pl-2 italic my-1" />,
                     }}
                   >
                     {msg.text}
                   </ReactMarkdown>
                </div>
             </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-gray-500 italic p-2 animate-pulse">Thinking...</div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-1 flex gap-2 mb-1">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a command..."
          className="flex-1 px-2 py-1 win95-border-inset outline-none"
          disabled={isLoading}
          autoFocus
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className="px-4 py-1 font-bold active:win95-border-inset win95-border-outset bg-[#c0c0c0]"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default GeminiChat;