import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Github, Facebook, Linkedin, MapPin, GraduationCap, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { portfolioData } from '../../data/portfolioData';
import { useLanguage } from '../../context/LanguageContext';

export default function Contact() {
  const { personalInfo } = portfolioData;
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const contactInfo = [
    { icon: Mail, labelKey: 'contact.email', value: 'khaivo300605@gmail.com', link: 'mailto:khaivo300605@gmail.com' },
    { icon: Phone, labelKey: 'contact.phone', value: '0123456789', link: 'tel:0123456789' },
    { icon: Github, labelKey: 'GitHub', value: 'github.com/KaitoDeus', link: 'https://github.com/KaitoDeus' },
    { icon: Linkedin, labelKey: 'LinkedIn', value: 'linkedin.com/in/kaitodeus', link: 'https://www.linkedin.com/in/kaitodeus/' },
    { icon: Facebook, labelKey: 'Facebook', value: 'facebook.com/kaitovo8952', link: 'https://www.facebook.com/kaitovo8952/' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(t('contact.success'));
    setFormData({ fullName: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-[5%]">
      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl lg:text-5xl font-bold mb-4">
          {t('contact.heading').replace('{name}', personalInfo.fullname.split(' ').pop() || '')}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t('contact.description')}
        </p>
        <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {t('about.hcmCity')}</span>
          <span className="flex items-center gap-1"><GraduationCap className="w-4 h-4" /> {t('about.uthSchool')}</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Left - Contact Info Cards */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            const label = info.labelKey.startsWith('contact.') ? t(info.labelKey) : info.labelKey;
            return (
              <motion.a
                key={info.labelKey}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all cursor-pointer group">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{label}</h4>
                      <p className="text-sm text-muted-foreground">{info.value}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Right - Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">{t('contact.formTitle')}</h3>
              <p className="text-sm text-muted-foreground mb-6">
                {t('contact.formDescription')}
              </p>
              
              <form className="space-y-4" onSubmit={handleSubmit}>
                <Input
                  type="text"
                  name="fullName"
                  placeholder={t('contact.fullName')}
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="bg-background border-border focus:border-primary"
                />
                <Input
                  type="email"
                  name="email"
                  placeholder={t('contact.email')}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-background border-border focus:border-primary"
                />
                <Input
                  type="text"
                  name="subject"
                  placeholder={t('contact.subject')}
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-background border-border focus:border-primary"
                />
                <Textarea
                  name="message"
                  placeholder={t('contact.message')}
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="bg-background border-border focus:border-primary resize-none"
                />
                
                <Button type="submit" className="w-full shadow-lg shadow-primary/30">
                  <Send className="w-4 h-4 mr-2" />
                  {t('contact.send')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
