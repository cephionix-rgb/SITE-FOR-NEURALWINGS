import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function HicaChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'user',
      content: 'How many sorties does Aryan Kapoor have remaining for Phase 2?',
    },
    {
      role: 'hica',
      content: 'Aryan Kapoor has completed 34 out of the required 50 sorties for Phase 2 (Basic Flying). He has 16 sorties remaining, covering Exercises 13 through 15 (Forced Landings, Precautionary Landings, and Low Flying). At his current pace of ~3 sorties per week, he is projected to complete Phase 2 by approximately 25 April 2026. ✅',
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = () => {
    if (!query.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setQuery('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        role: 'hica',
        content: "I'm analysing that query against your current data... Based on today's records, I recommend reviewing the relevant module. Shall I generate a detailed report?",
      }]);
    }, 3000 + Math.random() * 2000);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.5)] z-[100] group overflow-hidden"
          >
            <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Bot className="w-8 h-8 text-zinc-900 relative z-10 animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop on mobile */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-transparent/80 backdrop-blur-sm z-[90] md:hidden"
            />
            
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 w-full md:w-[380px] h-[100dvh] bg-background-surface/90 backdrop-blur-2xl border-l border-indigo-500/20 z-[100] flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/50 bg-white/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-inner">
                    <Bot className="w-5 h-5 text-zinc-900" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading font-bold text-zinc-900 text-[15px] leading-tight">HICA AI</span>
                    <span className="flex items-center gap-1.5 font-sans justify-center text-[11px] text-green-400 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Online
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-font-secondary hover:text-zinc-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 hide-scrollbar bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
                <div className="text-center mb-4">
                  <span className="px-3 py-1 bg-accent-gold/20 text-accent-gold border border-accent-gold/30 rounded-full text-[10px] font-bold uppercase tracking-wider">AI Powered Assistant</span>
                </div>
                
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'}`}>
                    <div 
                      className={`p-3 rounded-2xl text-[14px] font-sans leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-indigo-600/50 text-zinc-900 rounded-br-sm border border-indigo-500/30'
                          : 'bg-white/10 text-zinc-900/90 rounded-bl-sm border border-white/50 backdrop-blur-sm shadow-lg'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="self-start max-w-[85%]">
                    <div className="px-4 py-3 bg-white/10 rounded-2xl rounded-bl-sm border border-white/50">
                      <MoreHorizontal className="w-6 h-6 text-violet-400 animate-pulse" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-white/50 bg-transparent">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about students, flights..."
                    className="w-full bg-white/50 border border-white/50 focus:border-violet-400/50 rounded-xl py-3 pl-4 pr-12 text-sm text-zinc-900 focus:outline-none transition-colors"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!query.trim() || isTyping}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gradient-primary text-zinc-900 disabled:opacity-50 transition-opacity"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
