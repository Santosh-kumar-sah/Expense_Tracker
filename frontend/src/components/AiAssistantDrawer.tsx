import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Bot, User, BrainCircuit } from 'lucide-react';
import { sendAiChat } from '../services/api';
import { useExpense } from '../context/ExpenseContext';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  action?: string;
}

const suggestions = [
  'Add ₹450 for lunch today',
  'Add ₹2500 for internet bill under Bills',
  'What is my total spent?',
  'Add ₹120 for coffee',
];

export const AiAssistantDrawer = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: 'Hello! I am your ExpenseIQ Assistant. You can tell me to log expenses, check your spend, or ask financial questions in natural language. Try saying "Add ₹450 for lunch today"!',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { refreshAll } = useExpense();

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend: string): Promise<void> => {
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: Math.random().toString(36).substring(7),
      text: textToSend,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await sendAiChat({ message: textToSend });
      
      const botMsg: Message = {
        id: Math.random().toString(36).substring(7),
        text: response.reply,
        sender: 'bot',
        timestamp: new Date(),
        action: response.action || undefined,
      };

      setMessages((prev) => [...prev, botMsg]);

      // If the AI performed a database action (like creating an expense), auto-refresh the data
      if (response.action === 'create_expense') {
        toast.success('AI logged an expense successfully!');
        await refreshAll();
      }
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Something went wrong';
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(7),
          text: `Sorry, I encountered an error: ${errMsg}`,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Sparkles Trigger Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-500 hover:shadow-glow-emerald"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open AI Assistant"
      >
        <Sparkles className="h-6 w-6 animate-pulse" />
      </motion.button>

      <AnimatePresence>
        {isOpen ? (
          <>
            {/* Backdrop */}
            <motion.div
              key="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col glass-panel-lg border-l border-white/15 shadow-glass-lg"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200/50 p-4 dark:border-slate-800/60">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                    <BrainCircuit className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">AI Assistant</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Powered by Gemini & OpenRouter</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'bot' && (
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-500 dark:bg-emerald-500/15">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] rounded-2xl p-3 text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-emerald-600 text-white rounded-tr-none shadow-md shadow-emerald-600/10'
                          : 'glass-panel-subtle text-slate-800 dark:text-slate-200 rounded-tl-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                      {msg.action === 'create_expense' && (
                        <span className="mt-1.5 inline-block text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          ✓ Automatically Logged
                        </span>
                      )}
                      <span className="mt-1 block text-right text-[10px] opacity-50">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {msg.sender === 'user' && (
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-3 justify-start">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-500 dark:bg-emerald-500/15">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="glass-panel-subtle rounded-2xl rounded-tl-none p-3 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 dark:bg-slate-500 [animation-delay:-0.3s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 dark:bg-slate-500 [animation-delay:-0.15s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 dark:bg-slate-500" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions */}
              {messages.length === 1 && (
                <div className="p-4 pt-0">
                  <p className="mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Suggestions</p>
                  <div className="flex flex-col gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleSend(s)}
                        className="w-full text-left rounded-xl border border-slate-200/50 glass-panel-subtle px-3 py-2 text-xs text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-all"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Footer */}
              <form
                className="border-t border-slate-200/50 p-4 dark:border-slate-800/60"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask AI or log transaction..."
                    className="flex-1 rounded-xl border border-slate-200/60 bg-white/40 px-4 py-2.5 text-sm text-slate-900 outline-none backdrop-blur-sm focus:border-emerald-500/70 dark:border-slate-700/50 dark:bg-slate-950/40 dark:text-white"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!input.trim() || loading}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
};
