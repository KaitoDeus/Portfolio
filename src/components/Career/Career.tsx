import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { portfolioData } from '../../data/portfolioData';

export default function Career() {
  const { career } = portfolioData;

  return (
    <section id="career" className="min-h-screen py-20 px-[5%]">
      <motion.h2 
        className="text-4xl lg:text-5xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Career
      </motion.h2>

      <div className="relative max-w-4xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-orange hidden md:block" />
        
        {career.map((milestone, index) => (
          <motion.div 
            key={index}
            className={`relative flex items-center mb-12 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            {/* Content */}
            <div className={`w-full md:w-[calc(50%-30px)] ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
              <span className="text-xl font-bold text-orange block mb-2">{milestone.year}</span>
              <Card className="hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all cursor-pointer">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.location}</p>
                </CardContent>
              </Card>
            </div>

            {/* Dot */}
            <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-orange rounded-full shadow-lg shadow-orange/50 hidden md:block" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
