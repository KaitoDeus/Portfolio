import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { portfolioData } from '../../data/portfolioData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function Certifications() {
  const { certificates } = portfolioData;

  return (
    <section id="certificates" className="min-h-screen py-20 px-[5%]">
      <motion.h2 
        className="text-4xl lg:text-5xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Certifications
      </motion.h2>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {certificates.map((cert, index) => (
          <motion.div key={index} variants={cardVariants}>
            <Card className="overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20 transition-all cursor-pointer">
              <img 
                src={cert.image} 
                alt={cert.title}
                loading="lazy"
                className="w-full h-56 object-cover"
              />
              <CardContent className="p-4 text-center">
                <h3 className="text-xl font-semibold mb-2">{cert.title}</h3>
                <div className="flex justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < cert.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted'}`}
                    />
                  ))}
                </div>
                <Badge variant="secondary">{cert.status}</Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
