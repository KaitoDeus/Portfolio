import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, User, Bot, ExternalLink } from 'lucide-react';

interface IChatMessageProps {
  sender: 'me' | 'visitor';
  text: string;
  timestamp: string;
}

export const ChatMessage = ({ sender, text, timestamp }: IChatMessageProps) => {
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
