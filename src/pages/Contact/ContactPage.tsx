import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { portfolioService } from '@/core/services/PortfolioService';
import Section from '@/components/common/Section';

const socialIcons: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
};

export default function ContactPage() {
  const { socialLinks, name } = portfolioService.getRawData();
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // You need to replace 'YOUR_FORMSPREE_ID' with your actual Formspree ID
      const response = await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        alert("Thank you! Your message has been sent directly to me.");
        setFormData({ fullName: '', email: '', subject: '', message: '' });
      } else {
        alert("Oops! There was a problem. Please try again later.");
      }
    } catch (error) {
      alert("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact" className="pb-20 pt-16 lg:pt-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Content: Intro & Socials */}
          <motion.div 
            className="lg:col-span-5 space-y-12 lg:sticky lg:top-32"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-5xl lg:text-7xl font-extrabold mb-8 tracking-tighter leading-[1] text-white">
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

            <div className="pt-12 border-t border-white/10 space-y-6">
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

          {/* Right Content: Form Card */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-white/5 bg-white/[0.03] backdrop-blur-xl shadow-2xl rounded-[2rem] overflow-hidden">
              <CardContent className="p-8 md:p-10">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-white">Send Message</h3>
                  <p className="text-muted-foreground text-base">
                    I'm always open to discussing new projects, creative ideas or prospects to be part of your visions.
                  </p>
                </div>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 ml-1">
                        Full Name
                      </label>
                      <Input
                        type="text"
                        name="fullName"
                        placeholder="Your Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/5 focus:border-cyan-400 h-12 text-base rounded-xl px-5 transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 ml-1">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Your Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/5 focus:border-cyan-400 h-12 text-base rounded-xl px-5 transition-all duration-300"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 ml-1">
                      Subject
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      placeholder="How can I help you?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/5 focus:border-cyan-400 h-12 text-base rounded-xl px-5 transition-all duration-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 ml-1">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      placeholder="Your Message..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      className="bg-white/5 border-white/5 focus:border-cyan-400 resize-none p-5 text-base rounded-xl min-h-[160px] transition-all duration-300"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="w-full text-lg font-bold h-14 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:bg-gray-600 disabled:cursor-not-allowed text-black shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Send className="w-5 h-5 mr-3" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </Section>
  );
}


