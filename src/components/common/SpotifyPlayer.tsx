import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Music, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SpotifyPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef(null);

  const playlistId = '5WPquPOTamRtIVq5i27QIq';

  const handleOpen = () => {
    if (!isDragging) setIsOpen(true);
  };

  return (
    <>
      {/* Constraints boundary */}
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-49" />

      <div className="fixed top-24 md:top-auto md:bottom-6 right-6 z-50 pointer-events-none flex items-end justify-end">
        {/* Spotify Card - Using relative so it occupies its own space when open, but absolute for no jump */}
        <motion.div
          drag
          dragConstraints={constraintsRef}
          dragMomentum={false}
          dragElastic={0.05}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
          initial={false}
          animate={{
            opacity: isOpen ? 1 : 0,
            scale: isOpen ? 1 : 0.8,
            pointerEvents: isOpen ? 'auto' : 'none',
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 400 }}
          className="absolute bottom-0 right-0 bg-card/80 backdrop-blur-xl border border-primary/20 rounded-2xl shadow-2xl overflow-hidden w-70 sm:w-[320px] md:w-[350px] cursor-grab active:cursor-grabbing origin-bottom-right"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-primary/10 border-b border-primary/10 select-none">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/20 rounded-lg text-primary">
                <Music className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold tracking-wider uppercase text-primary/80">
                Spotify Player
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full hover:bg-destructive/20 hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Spotify Embed */}
          <div className="opacity-100 p-2 h-38">
            <iframe
              style={{ borderRadius: '12px' }}
              src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </motion.div>

        {/* Toggle Button */}
        <motion.button
          drag
          dragConstraints={constraintsRef}
          dragMomentum={false}
          dragElastic={0.1}
          initial={false}
          animate={{
            opacity: isOpen ? 0 : 1,
            scale: isOpen ? 0 : 1,
            pointerEvents: isOpen ? 'none' : 'auto',
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 400 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
          onClick={handleOpen}
          className="pointer-events-auto absolute bottom-0 right-0 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30 border-2 border-primary-foreground/20 text-primary-foreground group cursor-grab active:cursor-grabbing origin-bottom-right"
        >
          <Music className="w-6 h-6 group-hover:animate-bounce pointer-events-none" />
        </motion.button>
      </div>
    </>
  );
}
