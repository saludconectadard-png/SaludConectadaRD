'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { handleChatSubmission } from '@/lib/actions';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: '¡Hola! Soy VIA. ¿Cómo puedo ayudarte hoy?', sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { text: inputValue, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const botResponseText = await handleChatSubmission(currentInput);
      const botMessage: Message = { text: botResponseText, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error en el envío del chat:', error);
      const errorMessage: Message = {
        text: 'Lo siento, algo salió mal. Por favor, intenta de nuevo.',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const BotIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-8 w-8 text-white"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      <path d="M12 18c-2.21 0-4-1.79-4-4h2c0 1.1.9 2 2 2s2-.9 2-2h2c0 2.21-1.79 4-4 4zM7.5 12c-.83 0-1.5-.67-1.5-1.5S6.67 9 7.5 9s1.5.67 1.5 1.5S8.33 12 7.5 12zm9 0c-.83 0-1.5-.67-1.5-1.5S15.67 9 16.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  );

  return (
    <>
      <button
        onClick={toggleChat}
        className={cn(
          'fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-110',
          'bg-gradient-to-br from-purple-600 to-blue-500'
        )}
        aria-label="Abrir chat"
      >
        {isOpen ? <X size={32} /> : <MessageSquare size={32} />}
      </button>

      <div
        className={cn(
          'fixed bottom-24 right-5 z-50 flex h-[70vh] max-h-[600px] w-[calc(100%-40px)] max-w-sm flex-col rounded-2xl bg-white shadow-xl transition-all duration-300 ease-in-out dark:bg-gray-900',
          isOpen
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-10 opacity-0'
        )}
      >
        <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-br from-purple-600 to-blue-500 p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <Bot />
            </div>
            <div>
              <h3 className="text-lg font-bold">VIA</h3>
              <p className="text-xs opacity-80">
                Virtual Intelligent Assistant
              </p>
            </div>
          </div>
          <button
            onClick={toggleChat}
            className="rounded-full p-2 hover:bg-white/20"
            aria-label="Cerrar chat"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-50 p-4 dark:bg-gray-800">
          <div className="flex flex-col gap-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  'flex max-w-[85%] items-start gap-3',
                  msg.sender === 'user'
                    ? 'flex-row-reverse self-end'
                    : 'self-start'
                )}
              >
                {msg.sender === 'bot' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-500">
                    <Bot />
                  </div>
                )}
                <div
                  className={cn(
                    'rounded-2xl p-3 text-sm',
                    msg.sender === 'user'
                      ? 'rounded-br-none bg-blue-500 text-white'
                      : 'rounded-bl-none bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 self-start">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-500">
                  <Bot />
                </div>
                <div className="flex items-center gap-2 rounded-2xl bg-gray-200 p-3 dark:bg-gray-700">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-gray-400 delay-0" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-gray-400 delay-150" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-gray-400 delay-300" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="rounded-b-2xl border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Escribe tu mensaje..."
              className="w-full flex-1 rounded-full border border-gray-200 bg-gray-100 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="rounded-full bg-blue-500 p-3 text-white transition-colors disabled:bg-gray-400"
              disabled={isLoading || !inputValue.trim()}
              aria-label="Enviar mensaje"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
