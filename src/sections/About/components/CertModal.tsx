'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ICertificate } from '@/core/models/PortfolioModels';
import { getImageSrc } from '@/shared/lib/utils';

interface ICertModalProps {
  selectedCert: ICertificate | null;
  onClose: () => void;
}

export function CertModal({ selectedCert, onClose }: ICertModalProps) {
  return (
    <AnimatePresence>
      {selectedCert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative max-w-5xl w-full bg-card rounded-2xl overflow-hidden shadow-2xl border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-border/60 flex justify-between items-center">
              <h3 className="text-xl font-bold text-foreground">{selectedCert.title}</h3>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 bg-background/40">
              <img
                src={getImageSrc(selectedCert.image)}
                alt={selectedCert.title}
                loading="lazy"
                decoding="async"
                className="w-full h-auto max-h-[80vh] object-contain mx-auto rounded-lg"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
