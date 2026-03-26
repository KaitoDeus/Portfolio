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
      // Check for links
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
                  className="text-cyan-400 hover:text-cyan-300 underline font-semibold inline-flex items-center gap-1 transition-colors"
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
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isMe ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/10 text-white/50'}`}>
          {isMe ? <Bot size={16} /> : <User size={16} />}
        </div>
        <div className={`px-4 py-3 rounded-2xl text-sm ${
          isMe 
            ? 'bg-secondary/50 text-white rounded-bl-none border border-white/5 shadow-inner' 
            : 'bg-cyan-500 text-black font-medium rounded-br-none shadow-lg shadow-cyan-500/20'
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
  const { socialLinks, name, projects, skills, cvDownloadUrl } = portfolioService.getRawData();
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
      // Prepare history for AI
      const history: IChatHistory[] = messages.map(m => ({
        role: m.sender === 'visitor' ? 'user' : 'assistant',
        content: m.text
      }));

      // Create a system prompt describing the portfolio owner
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
      - CV/Resume: ${window.location.origin}${cvDownloadUrl}

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
          <motion.div 
            className="lg:col-span-5 space-y-10 lg:pt-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Available for hire
              </div>
              <h2 className="text-5xl lg:text-7xl font-extrabold mb-8 tracking-tighter leading-none text-white">
                Connect with me!
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400/50">Follow Me</p>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => {
                  const Icon = socialIcons[link.platform.toLowerCase()] || Github;
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary/20 border border-white/5 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300 shadow-lg"
                      title={link.platform}
                    >
                      <Icon className="w-6 h-6 text-muted-foreground group-hover:text-cyan-400 group-hover:scale-110 transition-all" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="pt-10 border-t border-white/10 space-y-6">
               <div className="space-y-4">
                 <p className="text-2xl font-black tracking-tighter text-white/90">
                    {name} <span className="text-cyan-400/30 font-thin mx-3">/</span> © {currentYear}
                 </p>
                 <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.3em]">
                    <span>Built with</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white">React</span>
                      <span className="w-1 h-1 rounded-full bg-cyan-400" />
                      <span className="text-white">TypeScript</span>
                      <span className="w-1 h-1 rounded-full bg-cyan-400" />
                      <span className="text-white">Tailwind</span>
                    </div>
                 </div>
               </div>
            </div>
          </motion.div>

          {/* Right Content: Chatbox UI */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-white/5 bg-[#0d0d1a]/80 backdrop-blur-2xl shadow-2xl rounded-[2.5rem] overflow-hidden">
              <CardContent className="p-0 flex flex-col h-125 relative">
                
                {/* Empty State / Background Text */}
                {messages.length === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none gap-8 pb-16">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="relative"
                    >
                      <div className="absolute -inset-4 bg-cyan-500/10 rounded-full blur-2xl animate-pulse" />
                      <img 
                        src={modelAvatar} 
                        alt="Model" 
                        className="w-32 h-32 object-cover rounded-full border-4 border-white/5 relative z-10 shadow-2xl" 
                      />
                    </motion.div>
                    <p className="text-xl font-medium text-white/20 tracking-tight">Ask me anything about {name.split(' ').pop()}...</p>
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
                           <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                              <Bot size={16} />
                           </div>
                           <div className="px-4 py-2 rounded-2xl bg-secondary/50 text-white/50 text-xs italic">
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
                        className="px-5 py-2 rounded-full bg-white/3 border border-white/10 text-xs font-medium text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                  
                  <form onSubmit={handleSendMessage} className="relative group">
                    <Input 
                      placeholder={`Ask anything about ${name.split(' ').pop()}...`}
                      className="bg-black/40 border border-white/5 group-hover:border-white/10 focus:border-cyan-500/30 focus-visible:ring-0 focus-visible:ring-offset-0 h-14 pl-8 pr-16 rounded-full text-white placeholder:text-white/20 transition-all duration-500 shadow-inner"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Button 
                      type="submit"
                      disabled={!inputValue.trim() || isLoading}
                      className="absolute right-2 top-1.5 w-11 h-11 rounded-full bg-transparent hover:bg-white/5 text-cyan-400 p-0 transition-all active:scale-95"
                    >
                      <Send size={20} />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </Section>
  );
}



