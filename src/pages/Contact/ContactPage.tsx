import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { portfolioData } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';
import Section from '@/components/common/Section';

export default function ContactPage() {
  const { personalInfo } = portfolioData;
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });



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
    <Section id="contact">
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
      </motion.div>

      <div className="max-w-3xl mx-auto">
        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-primary/20 shadow-xl shadow-primary/5">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{t('contact.formTitle')}</h3>
                <p className="text-muted-foreground">
                  {t('contact.formDescription')}
                </p>
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    name="fullName"
                    placeholder={t('contact.fullName')}
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border-border focus:border-primary h-12"
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder={t('contact.email')}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border-border focus:border-primary h-12"
                  />
                </div>
                
                <Input
                  type="text"
                  name="subject"
                  placeholder={t('contact.subject')}
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-background/50 border-border focus:border-primary h-12"
                />
                
                <Textarea
                  name="message"
                  placeholder={t('contact.message')}
                  value={formData.message}
                  onChange={handleChange}
                  rows={10}
                  required
                  className="bg-background/50 border-border focus:border-primary resize-none p-4 h-48"
                />
                
                <Button type="submit" size="lg" className="w-full text-lg font-semibold shadow-lg shadow-primary/30 h-12">
                  <Send className="w-5 h-5 mr-2" />
                  {t('contact.send')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}
