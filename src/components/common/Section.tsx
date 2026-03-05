import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionProps {
  id: string;
  title?: string;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function Section({ id, title, children, className, noPadding = false }: SectionProps) {
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
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              {title}
            </h2>
          </motion.div>
        )}
        
        {children}
      </div>
    </section>
  );
}
