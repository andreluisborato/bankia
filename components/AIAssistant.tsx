
import React, { useState, useRef, useEffect } from 'react';
import { getAIResponse } from '../services/geminiService';
import { ChatMessage, ChatMessageSender } from '../types';

const BotIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.25278V6.25278C12.4142 6.25278 12.75 6.58857 12.75 7.00278V10.0028C12.75 10.417 12.4142 10.7528 12 10.7528V10.7528C11.5858 10.7528 11.25 10.417 11.25 10.0028V7.00278C11.25 6.58857 11.5858 6.25278 12 6.25278V6.25278Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.2422 7.75735L16.2422 7.75735C16.535 8.04991 16.535 8.52478 16.2422 8.81734L14.1206 10.939C13.8281 11.2315 13.3532 11.2315 13.0606 10.939L13.0606 10.939C12.7681 10.6464 12.7681 10.1716 13.0606 9.87902L15.1823 7.75735C15.4748 7.46479 15.9497 7.46479 16.2422 7.75735V7.75735Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.75781 7.75735L7.75781 7.75735C7.46495 8.04991 7.46495 8.52478 7.75781 8.81734L9.87943 10.939C10.172 11.2315 10.6468 11.2315 10.9394 10.939L10.9394 10.939C11.2319 10.6464 11.2319 10.1716 10.9394 9.87902L8.81774 7.75735C8.52518 7.46479 8.05031 7.46479 7.75781 7.75735V7.75781Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 14.2528H14.5" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: crypto.randomUUID(), text: "Olá! Como posso ajudá-lo a ganhar mais dinheiro hoje?", sender: ChatMessageSender.BOT },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { id: crypto.randomUUID(), text: input, sender: ChatMessageSender.USER };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseText = await getAIResponse(input);

    const botMessage: ChatMessage = { id: crypto.randomUUID(), text: responseText, sender: ChatMessageSender.BOT };
    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="bg-brand-surface rounded-2xl p-6 border border-brand-secondary flex flex-col h-[500px]">
      <h2 className="text-xl font-bold text-brand-text-primary mb-4">Assistente Financeiro AI</h2>
      <div className="flex-grow overflow-y-auto pr-2 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === ChatMessageSender.USER ? 'justify-end' : ''}`}>
            {msg.sender === ChatMessageSender.BOT && (
              <div className="flex-shrink-0 bg-brand-primary text-white rounded-full p-2">
                <BotIcon />
              </div>
            )}
            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${msg.sender === ChatMessageSender.BOT ? 'bg-brand-secondary text-brand-text-primary rounded-bl-none' : 'bg-brand-primary text-white rounded-br-none'}`}>
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
             {msg.sender === ChatMessageSender.USER && (
              <div className="flex-shrink-0 bg-brand-secondary text-brand-text-secondary rounded-full p-2">
                <UserIcon />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 bg-brand-primary text-white rounded-full p-2 animate-pulse">
                    <BotIcon />
                </div>
                <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl bg-brand-secondary text-brand-text-primary rounded-bl-none">
                    <div className="flex items-center space-x-1">
                        <div className="h-2 w-2 bg-brand-text-secondary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="h-2 w-2 bg-brand-text-secondary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="h-2 w-2 bg-brand-text-secondary rounded-full animate-bounce"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="mt-4 flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Pergunte como ganhar dinheiro..."
          className="flex-grow bg-brand-secondary border border-gray-600 rounded-lg px-4 py-3 text-brand-text-primary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all disabled:opacity-50"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="bg-brand-primary text-white p-3 rounded-lg hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface focus:ring-brand-primary transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;
