import React, { useState, useRef, useEffect } from 'react';
import { generateChatResponse } from '../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

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
             <div className={`max-w-[80%] p-2 ${msg.role === 'user' ? 'bg-[#000080] text-white' : 'bg-[#dfdfdf] text-black'} border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]`}>
                <p className="font-sans whitespace-pre-wrap leading-tight">{msg.text}</p>
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