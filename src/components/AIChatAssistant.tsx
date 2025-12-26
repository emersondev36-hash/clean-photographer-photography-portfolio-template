import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

type Message = { role: 'user' | 'assistant'; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;

export const AIChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = async (userMessages: Message[]) => {
    const resp = await fetch(CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: userMessages }),
    });

    if (!resp.ok || !resp.body) {
      throw new Error('Falha ao conectar com assistente');
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = '';
    let assistantContent = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith('\r')) line = line.slice(0, -1);
        if (line.startsWith(':') || line.trim() === '') continue;
        if (!line.startsWith('data: ')) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === '[DONE]') break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            assistantContent += content;
            setMessages(prev => {
              const last = prev[prev.length - 1];
              if (last?.role === 'assistant') {
                return prev.map((m, i) => 
                  i === prev.length - 1 ? { ...m, content: assistantContent } : m
                );
              }
              return [...prev, { role: 'assistant', content: assistantContent }];
            });
          }
        } catch {
          textBuffer = line + '\n' + textBuffer;
          break;
        }
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      await streamChat(newMessages);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Desculpe, ocorreu um erro. Tente novamente.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 border border-primary/40 bg-obsidian-900/90 backdrop-blur-sm flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all duration-500"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Sparkles className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-28 right-8 z-50 w-[400px] h-[560px] bg-obsidian-900 border border-border/30 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-border/20">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-primary/40 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-foreground">Assistente IA</h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Powered by Gemini</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-6" ref={scrollRef}>
              {messages.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 border border-border/30 flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-6 h-6 text-muted-foreground/40" strokeWidth={1.5} />
                  </div>
                  <p className="font-serif text-lg text-muted-foreground mb-2">Olá!</p>
                  <p className="font-mono text-xs text-muted-foreground/60">
                    Pergunte sobre tatuagens, estilos ou agende uma sessão.
                  </p>
                </div>
              )}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-5 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`inline-block max-w-[85%] px-4 py-3 font-mono text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary/20 border border-primary/30 text-foreground'
                        : 'bg-obsidian-800/50 border border-border/20 text-foreground/90'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-8 h-8 border border-border/30 flex items-center justify-center">
                    <Loader2 className="w-3 h-3 animate-spin text-primary" />
                  </div>
                  <span className="font-mono text-xs">Pensando...</span>
                </div>
              )}
            </ScrollArea>

            {/* Input */}
            <div className="p-6 border-t border-border/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-3"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-obsidian-800/50 border-border/30 rounded-none font-mono text-sm placeholder:text-muted-foreground/50"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={isLoading || !input.trim()}
                  className="w-10 h-10 rounded-none bg-primary/20 border border-primary/40 hover:bg-primary/30 hover:border-primary"
                >
                  <Send className="w-4 h-4 text-primary" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};