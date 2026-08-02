import { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

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
      <div className="max-w-7xl mx-auto relative z-10">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">
              {title}
            </h2>
          </div>
        )}
        
        {children}
      </div>
    </section>
  );
}
