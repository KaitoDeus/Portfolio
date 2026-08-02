import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Github, Linkedin, Mail, User, Bot, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { portfolioService } from '@/core/services/PortfolioService';
import Section from '@/components/common/Section';
import { chatService, IChatHistory } from '@/core/services/ChatService';
import modelAvatar from '@/assets/img/avt/model.webp';

const socialIcons: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

const ChatMessage = ({ sender, text, timestamp }: { sender: 'me' | 'visitor', text: string, timestamp: string }) => {
  const isMe = sender === 'me';
  
  const parseText = (content: string) => {
    return content.split('\n').map((line, i) => {
      const urlRegex = /(https?:\/\/[^\s]+|mailto:[^\s]+)/g;
      const parts = line.split(urlRegex);
      
      return (
        <div key={i} className="min-h-[1.5em] flex flex-wrap items-center gap-x-1">
          {parts.map((part, j) => {
            if (part.match(urlRegex)) {
              const isMail = part.startsWith('mailto:');
              const displayUrl = part.replace('mailto:', '');
              let Icon = ExternalLink;
              if (part.includes('linkedin')) Icon = Linkedin;
              else if (part.includes('github')) Icon = Github;
              else if (isMail) Icon = Mail;

              return (
                <a 
                  key={j} 
                  href={part} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline font-bold inline-flex items-center gap-1 transition-colors hover:opacity-80"
                >
                  <Icon size={12} />
                  {displayUrl}
                </a>
              );
            }
            return part;
          })}
        </div>
      );
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex ${isMe ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div className={`flex max-w-[85%] ${isMe ? 'flex-row' : 'flex-row-reverse'} items-end gap-2`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          isMe ? 'bg-foreground/10 text-foreground' : 'bg-foreground text-background'
        }`}>
          {isMe ? <Bot size={16} /> : <User size={16} />}
        </div>
        <div className={`px-4 py-3 rounded-2xl text-sm ${
          isMe 
            ? 'bg-secondary/60 text-foreground rounded-bl-none border border-border/40 backdrop-blur-sm' 
            : 'bg-foreground text-background font-medium rounded-br-none shadow-md'
        }`}>
          <div className="space-y-1">
            {parseText(text)}
          </div>
          <div className={`text-[10px] mt-2 opacity-50 ${isMe ? 'text-left' : 'text-right'}`}>
            {timestamp}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ContactPage() {
  const { socialLinks, name, projects, skills } = portfolioService.getRawData();
  const currentYear = new Date().getFullYear();
  const [messages, setMessages] = useState<{ sender: 'me' | 'visitor', text: string, time: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      sender: 'visitor' as const,
      text: text,
      time: userTime
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const history: IChatHistory[] = messages.map(m => ({
        role: m.sender === 'visitor' ? 'user' : 'assistant',
        content: m.text
      }));

      const systemPrompt = `You are a helpful AI assistant for ${name}'s portfolio (English: Khai, Vietnamese: Khải). 
      Your goal is to provide helpful, polite, and detailed information about Khải's skills, projects, and professional background.

      About Khải:
      - Software Engineer student at UTH.
      - Interests: Game Development, Fullstack Web, and AI.
      - Core Skills: ${skills.map(s => s.name).join(', ')}.

      Projects Highlights:
      ${projects.map(p => `- ${p.title}: Built with ${p.technologies.join(', ')}.`).join('\n')}

      Contact & Links:
      - LinkedIn: ${socialLinks.find(l => l.platform === 'linkedin')?.url || 'N/A'}
      - GitHub: ${socialLinks.find(l => l.platform === 'github')?.url || 'N/A'}
      - Email: mailto:${socialLinks.find(l => l.platform === 'mail')?.url.replace('mailto:', '') || 'N/A'}

      Guidelines:
      - ALWAYS keep each link on a NEW SEPARATE LINE.
      - Keep responses very concise (1-3 sentences).
      - Speak in the language used by the visitor (Vietnamese or English).
      - Be friendly and helpful.
      - Use plain text only (no bold, italics, or # symbols). Keep it simple.`;

      const aiResponse = await chatService.chat(text, history, systemPrompt);

      setMessages(prev => [...prev, {
        sender: 'me',
        text: aiResponse || "Sorry, I couldn't process that.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <Section id="contact" className="pb-20 pt-16 lg:pt-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Content: Intro & Socials */}
          <div className="lg:col-span-5 space-y-10 lg:pt-4">
            <div>

              <h2 className="text-5xl lg:text-7xl font-extrabold mb-8 tracking-tighter leading-none text-foreground">
                Connect with me!
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Follow Me</p>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => {
                  const Icon = socialIcons[link.platform.toLowerCase()] || Github;
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center w-14 h-14 rounded-2xl bg-card/60 border border-border/60 hover:border-foreground/60 hover:bg-foreground/10 backdrop-blur-md transition-all duration-300 shadow-lg"
                      title={link.platform}
                      aria-label={link.platform}
                    >
                      <Icon className="w-6 h-6 text-muted-foreground group-hover:text-foreground group-hover:scale-110 transition-all" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="pt-10 border-t border-border/40 space-y-6">
               <div className="space-y-4">
                 <p className="text-2xl font-black tracking-tighter text-foreground">
                    {name} <span className="opacity-30 font-thin mx-3">/</span> © {currentYear}
                 </p>
                 <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">
                    <span>Built with</span>
                    <div className="flex items-center gap-2">
                      <span className="text-foreground">React</span>
                      <span className="w-1 h-1 rounded-full bg-foreground/40" />
                      <span className="text-foreground">TypeScript</span>
                      <span className="w-1 h-1 rounded-full bg-foreground/40" />
                      <span className="text-foreground">Tailwind</span>
                    </div>
                 </div>
               </div>
            </div>
          </div>

          {/* Right Content: Chatbox UI */}
          <div className="lg:col-span-7">
            <Card className="border-border/60 bg-card/70 backdrop-blur-2xl shadow-2xl rounded-[2.5rem] overflow-hidden">
              <CardContent className="p-0 flex flex-col h-125 relative">
                
                {/* Empty State */}
                {messages.length === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none gap-8 pb-16">
                    <div className="relative">
                      <img 
                        src={modelAvatar} 
                        alt="Model" 
                        loading="lazy"
                        decoding="async"
                        className="w-32 h-32 object-cover rounded-full border-4 border-border/60 relative z-10 shadow-2xl" 
                      />
                    </div>
                    <p className="text-xl font-medium text-muted-foreground/60 tracking-tight">Ask me anything about {name.split(' ').pop()}...</p>
                  </div>
                )}

                {/* Chat Area */}
                <div className="grow overflow-y-auto p-8 space-y-4 relative z-10 scrollbar-hide">
                   <AnimatePresence>
                    {messages.map((msg, idx) => (
                      <ChatMessage key={idx} sender={msg.sender} text={msg.text} timestamp={msg.time} />
                    ))}
                    {isLoading && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start mb-4"
                      >
                         <div className="flex flex-row items-center gap-2">
                           <div className="w-8 h-8 rounded-full bg-foreground/10 text-foreground flex items-center justify-center">
                              <Bot size={16} />
                           </div>
                           <div className="px-4 py-2 rounded-2xl bg-secondary/60 text-muted-foreground text-xs italic border border-border/40">
                              Typing...
                           </div>
                         </div>
                      </motion.div>
                    )}
                   </AnimatePresence>
                   <div ref={chatEndRef} />
                </div>

                {/* Suggestions & Input Area */}
                <div className="p-8 pt-0 space-y-6 relative z-10">
                  <div className="flex flex-wrap justify-center gap-3">
                    {['Work', 'About me', 'Projects', 'Contact'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => sendMessage(suggestion)}
                        className="px-5 py-2 rounded-full bg-secondary/60 border border-border/60 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary hover:border-foreground/30 transition-all duration-300"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                  
                  <form onSubmit={handleSendMessage} className="relative group">
                    <Input 
                      placeholder={`Ask anything about ${name.split(' ').pop()}...`}
                      aria-label={`Ask anything about ${name.split(' ').pop()}`}
                      className="bg-background/60 border border-border/60 group-hover:border-foreground/30 focus:border-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0 h-14 pl-8 pr-16 rounded-full text-foreground placeholder:text-muted-foreground/50 transition-all duration-500 shadow-inner"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Button 
                      type="submit"
                      disabled={!inputValue.trim() || isLoading}
                      aria-label="Send Message"
                      className="absolute right-2 top-1.5 w-11 h-11 rounded-full bg-foreground text-background hover:bg-foreground/80 p-0 transition-all active:scale-95 shadow-md"
                    >
                      <Send size={18} />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </Section>
  );
}
