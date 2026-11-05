'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Copy, 
  Check, 
  Bot, 
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { portfolioService } from '@/core/services/PortfolioService';
import Section from '@/components/common/Section';
import PageHeader from '@/components/common/PageHeader';
import { chatService, IChatHistory } from '@/core/services/ChatService';
import modelAvatar from '@/assets/img/avt/model.webp';
import { getImageSrc } from '@/shared/lib/utils';
import { ChatMessage } from './components/ChatMessage';

const socialIcons: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

const SUGGESTED_PROMPTS = [
  "What are Khải's primary skills?",
  "Tell me about the Vietnam B2 Simulator",
  "What is his experience at FPT Software?",
  "How can I hire or contact Khải?",
];

export default function ContactPage() {
  const { socialLinks, name, projects, skills, personalInfo } = portfolioService.getRawData();
  const [messages, setMessages] = useState<{ sender: 'me' | 'visitor'; text: string; time: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const modelAvatarSrc = getImageSrc(modelAvatar);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      sender: 'visitor' as const,
      text: text,
      time: userTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const history: IChatHistory[] = messages.map((m) => ({
        role: m.sender === 'visitor' ? 'user' : 'assistant',
        content: m.text,
      }));

      const systemPrompt = `You are a helpful AI assistant for ${name}'s portfolio (English: Khai, Vietnamese: Khải, nickname: Kaito). 
      Your goal is to provide helpful, polite, and detailed information about Khải's skills, projects, and professional background.

      About Khải:
      - Software Engineer Intern at FPT Software (Remote, October 2026 - Present).
      - Senior IT Student at University of Transport Ho Chi Minh City (UTH, 2023 - 2027).
      - Part-Time Crew Member at Jollibee Vietnam (September 2026 - Present).
      - Practical experience in Full-stack Web Development, Game Development, and AI.
      - Top & Core Skills: WebGL, Unity, Rigid Body Dynamics, ${skills.map((s) => s.name).join(', ')}.

      Projects Highlights:
      ${projects.map((p) => `- ${p.title}: Built with ${p.technologies.join(', ')}.`).join('\n')}

      Contact & Links:
      - LinkedIn: ${socialLinks.find((l) => l.platform === 'linkedin')?.url || 'https://www.linkedin.com/in/kaitodeus'}
      - GitHub: ${socialLinks.find((l) => l.platform === 'github')?.url || 'https://github.com/KaitoDeus'}
      - Email: ${personalInfo.email || 'khaivo300605@gmail.com'}
      - Phone: ${personalInfo.phone || '0902316248'}

      Guidelines:
      - ALWAYS keep each link on a NEW SEPARATE LINE.
      - Keep responses very concise (1-3 sentences).
      - Speak in the language used by the visitor (Vietnamese or English).
      - Be friendly and helpful.
      - Use plain text only (no bold, italics, or # symbols). Keep it simple.`;

      const aiResponse = await chatService.chat(text, history, systemPrompt);

      setMessages((prev) => [
        ...prev,
        {
          sender: 'me',
          text: aiResponse || "Sorry, I couldn't process that.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
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

  const email = personalInfo.email || 'khaivo300605@gmail.com';
  const phone = personalInfo.phone || '0902316248';

  return (
    <Section id="contact">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Page Header */}
        <PageHeader
          title="Let's Start a"
          highlight="Conversation"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Info & Social Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Channels */}
            <div className="space-y-3">
              
              {/* Email */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-card/60 border border-border/60 backdrop-blur-md hover:border-foreground/30 transition-all">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-foreground shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${email}`}
                      className="text-sm font-semibold text-foreground hover:underline truncate block"
                    >
                      {email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(email, 'email')}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all cursor-pointer shrink-0"
                  title="Copy email"
                  aria-label="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-card/60 border border-border/60 backdrop-blur-md hover:border-foreground/30 transition-all">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-foreground shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      Phone / Zalo
                    </span>
                    <a
                      href={`tel:${phone}`}
                      className="text-sm font-semibold text-foreground hover:underline truncate block"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(phone, 'phone')}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all cursor-pointer shrink-0"
                  title="Copy phone"
                  aria-label="Copy phone"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center p-4 rounded-2xl bg-card/60 border border-border/60 backdrop-blur-md">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-foreground shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      Location
                    </span>
                    <p className="text-sm font-semibold text-foreground">
                      Ho Chi Minh City, Vietnam
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Social Network Profiles */}
            <div className="p-5 rounded-2xl bg-card/60 border border-border/60 backdrop-blur-md space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Online Presence
              </p>
              <div className="flex flex-wrap gap-2.5">
                {socialLinks.map((link) => {
                  const Icon = socialIcons[link.platform.toLowerCase()] || Github;
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary/80 border border-border/60 hover:border-foreground/50 hover:bg-foreground hover:text-background text-foreground text-xs font-semibold transition-all shadow-xs"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="capitalize">{link.platform}</span>
                    </a>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: AI Chat Assistant (7 cols) */}
          <div className="lg:col-span-7">
            <Card className="border-border/60 bg-card/70 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden flex flex-col h-[580px]">
              
              {/* Chat Header */}
              <div className="p-4 sm:p-5 border-b border-border/60 bg-secondary/40 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={modelAvatarSrc}
                      alt="AI Assistant"
                      className="w-10 h-10 rounded-full object-cover border-2 border-border/80"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-card" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                      <span>Kaito AI Assistant</span>
                      <Sparkles className="w-3.5 h-3.5 text-foreground" />
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Online</span>
                </div>
              </div>

              {/* Chat Messages Body */}
              <div className="p-4 sm:p-6 overflow-y-auto grow space-y-4">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-8">
                    <div className="w-16 h-16 rounded-2xl bg-secondary/80 border border-border/60 flex items-center justify-center text-foreground shadow-sm">
                      <Bot className="w-8 h-8" />
                    </div>
                    <div className="max-w-sm space-y-2">
                      <h4 className="font-bold text-base text-foreground">
                        Ask anything about Khải
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        I can answer questions regarding his software skills, 3D game projects, education at UTH, or professional background.
                      </p>
                    </div>

                    {/* Suggested Prompt Chips */}
                    <div className="flex flex-wrap gap-2 justify-center max-w-md pt-2">
                      {SUGGESTED_PROMPTS.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => sendMessage(prompt)}
                          className="text-xs px-3 py-1.5 rounded-full bg-secondary/80 hover:bg-secondary hover:border-foreground/30 border border-border/60 text-foreground transition-all cursor-pointer text-left"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((msg, index) => (
                      <ChatMessage
                        key={index}
                        sender={msg.sender}
                        text={msg.text}
                        time={msg.time}
                        avatarSrc={modelAvatarSrc}
                      />
                    ))}
                    {isLoading && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground p-3 rounded-2xl bg-secondary/40 max-w-xs">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-bounce" />
                          <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-bounce [animation-delay:0.4s]" />
                        </div>
                        <span>Thinking...</span>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </>
                )}
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 sm:p-4 border-t border-border/60 bg-card/80 shrink-0 flex items-center gap-2"
              >
                <Input
                  type="text"
                  placeholder="Ask a question about Khải's experience..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isLoading}
                  className="rounded-full h-11 text-xs sm:text-sm pl-4 bg-background/80 border-border/60 focus:border-foreground grow"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  size="icon"
                  className="w-11 h-11 rounded-full bg-foreground text-background hover:bg-foreground/80 shrink-0 cursor-pointer shadow-sm"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>

            </Card>
          </div>

        </div>

      </div>
    </Section>
  );
}
