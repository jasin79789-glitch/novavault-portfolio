import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, RefreshCw, Key, ChevronDown, Check } from 'lucide-react';
import { askAIConcierge } from '../../services/geminiService';
import { storageAdapter } from '../../services/storageAdapter';

export const AIConcierge = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Hello! I am NovaVault's AI Concierge. I can answer questions about Muhammad Abdullah's engineering background, explain any project, and help you get instant digital downloads. What would you like to explore?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [customKey, setCustomKey] = useState('');
  const [keySaved, setKeySaved] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg = { id: 'u-' + Date.now(), role: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askAIConcierge(query, messages);
      const botMsg = { id: 'b-' + Date.now(), role: 'assistant', text: response };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          role: 'assistant',
          text: "I encountered a momentary synchronization glitch. Please try asking again or feel free to check the projects directly in the showcase!"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveKey = () => {
    if (!customKey.trim()) return;
    const config = storageAdapter.getBackendConfig();
    config.geminiApiKey = customKey.trim();
    storageAdapter.saveBackendConfig(config);
    setKeySaved(true);
    setTimeout(() => {
      setShowKeyInput(false);
      setKeySaved(false);
    }, 1500);
  };

  const QUICK_PROMPTS = [
    "What free tools are available?",
    "Tell me about AetherOS",
    "How can I hire Abdullah for custom work?"
  ];

  return (
    <>
      {/* Floating Orb Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={onToggle}
            aria-label="Open AI Concierge"
            className="group relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#121217] to-[#1E1E28] border border-cyan-neon/40 shadow-neon-cyan flex items-center justify-center text-cyan-neon hover:scale-110 active:scale-95 transition-all duration-300"
          >
            {/* Pulsing rings */}
            <span className="absolute -inset-1 rounded-full border border-cyan-neon/40 animate-ping opacity-60" />
            <span className="absolute -inset-2 rounded-full border border-violet-neon/30 animate-pulse" />

            <Bot className="w-6 h-6 transition-transform group-hover:rotate-12" />

            {/* Tooltip on hover */}
            <span className="absolute right-full mr-3 px-3 py-1 rounded-lg text-xs font-mono bg-black/90 text-white border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-glass">
              Ask AI Concierge
            </span>
          </button>
        </div>
      )}

      {/* Expanded Glassmorphic Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] glass-panel border border-cyan-neon/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/10 bg-surface/70 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-neon/15 border border-cyan-neon/30 flex items-center justify-center text-cyan-neon">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-display font-bold text-sm text-white">Nova Concierge</h4>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-cyan-neon/15 text-cyan-neon border border-cyan-neon/30">
                    AI AGENT
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 font-mono">Abdullah's Digital Representative</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowKeyInput(!showKeyInput)}
                title="Configure Gemini API Key"
                className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-cyan-neon transition-colors"
              >
                <Key className="w-4 h-4" />
              </button>
              <button
                onClick={onToggle}
                className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Optional Key Input Banner */}
          {showKeyInput && (
            <div className="p-3 bg-black/80 border-b border-white/10 text-xs space-y-2">
              <p className="text-gray-400">
                Optional: Connect your personal Gemini API key for live LLM generation:
              </p>
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="Paste Gemini API Key..."
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-neon"
                />
                <button
                  onClick={handleSaveKey}
                  className="px-3 py-1.5 rounded-lg bg-cyan-neon text-black font-semibold text-xs flex items-center gap-1"
                >
                  {keySaved ? <Check className="w-3.5 h-3.5" /> : 'Save'}
                </button>
              </div>
            </div>
          )}

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m) => {
              const isBot = m.role === 'assistant';
              return (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {isBot && (
                    <div className="w-7 h-7 rounded-lg bg-cyan-neon/15 border border-cyan-neon/30 flex-shrink-0 flex items-center justify-center text-cyan-neon">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      isBot
                        ? 'glass-panel border border-white/10 text-gray-200'
                        : 'bg-gradient-to-r from-cyan-neon to-cyan-500 text-black font-medium shadow-neon-cyan/20'
                    }`}
                  >
                    {m.text}
                  </div>

                  {!isBot && (
                    <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/10 flex-shrink-0 flex items-center justify-center text-white">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-xs text-gray-400 font-mono">
                <div className="w-7 h-7 rounded-lg bg-cyan-neon/15 border border-cyan-neon/30 flex items-center justify-center text-cyan-neon animate-spin">
                  <RefreshCw className="w-3.5 h-3.5" />
                </div>
                <span>Synthesizing response...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts suggestions */}
          <div className="px-3 pt-2 pb-1 flex gap-1.5 overflow-x-auto no-scrollbar border-t border-white/5">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-cyan-neon whitespace-nowrap transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box Footer */}
          <div className="p-3 border-t border-white/10 bg-surface/90">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, downloads, or custom work..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-neon/60 focus:ring-1 focus:ring-cyan-neon/40 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-xl bg-cyan-neon disabled:opacity-40 text-black hover:bg-cyan-300 transition-all flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
