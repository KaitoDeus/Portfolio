import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

interface SectionProps {
  id: string;
  title?: string;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function Section({ id, title, children, className, noPadding = false }: SectionProps) {
    const { theme } = useTheme();

  return (
    <section 
      id={id} 
      className={cn(
        "relative w-full overflow-hidden",
        !noPadding && "py-20 px-[5%]",
        className
      )}
    >
      {/* Background decoration for modern feel if needed, can be toggleable */}
      
      <div className="max-w-7xl mx-auto relative z-10">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-600 dark:from-primary dark:to-teal-400 inline-block">
              {title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4 rounded-full opacity-70" />
          </motion.div>
        )}
        
        {children}
      </div>
    </section>
  );
}
