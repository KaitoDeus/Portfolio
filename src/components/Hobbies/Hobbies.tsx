import { motion } from 'framer-motion';
import { Gamepad2, Palette, Code, Brain } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { portfolioData } from '../../data/portfolioData';

const hobbyIcons: Record<string, React.ElementType> = {
  game: Gamepad2,
  palette: Palette,
  code: Code,
  brain: Brain,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Hobbies() {
  const { hobbies } = portfolioData;

  return (
    <section id="hobbies" className="min-h-screen py-20 px-[5%]">
      <motion.h2 
        className="text-4xl lg:text-5xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Hobbies
      </motion.h2>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {hobbies.map((hobby, index) => {
          const Icon = hobbyIcons[hobby.icon] || Code;
          return (
            <motion.div key={index} variants={cardVariants}>
              <Card className="h-full hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20 transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{hobby.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{hobby.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
