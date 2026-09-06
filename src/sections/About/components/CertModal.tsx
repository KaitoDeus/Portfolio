'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ICertificate } from '@/core/models/PortfolioModels';
import { getImageSrc } from '@/shared/lib/utils';

interface ICertModalProps {
  selectedCert: ICertificate | null;
  onClose: () => void;
}

const emptySubscribe = () => () => {};

export function CertModal({ selectedCert, onClose }: ICertModalProps) {
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedCert, onClose]);

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {selectedCert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative max-w-4xl w-full bg-card rounded-2xl overflow-hidden shadow-2xl border border-border flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-border/60 flex justify-between items-center shrink-0">
              <h3 className="text-lg font-bold text-foreground line-clamp-1 pr-4">{selectedCert.title}</h3>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-1.5 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 bg-background/40 overflow-auto flex items-center justify-center">
              <img
                src={getImageSrc(selectedCert.image)}
                alt={selectedCert.title}
                loading="lazy"
                decoding="async"
                className="w-full h-auto max-h-[75vh] object-contain mx-auto rounded-lg shadow-md"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
