import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Download, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CVDownloadDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVDownloadDialog({ isOpen, onClose }: CVDownloadDialogProps) {
  const downloadOptions = [
    {
      title: "English Version",
      fileName: "VoAnhKhai_Resume_InternshipEN.pdf",
      url: "/VoAnhKhai_Resume_InternshipEN.pdf",
      icon: <Globe className="w-5 h-5 text-primary" />,
    },
    {
      title: "Vietnamese Version",
      fileName: "VoAnhKhai_Resume_InternshipVIE.pdf",
      url: "/VoAnhKhai_Resume_InternshipVIE.pdf",
      icon: <FileText className="w-5 h-5 text-orange" />,
    }
  ];

  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm bg-card border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden pointer-events-auto"
          >
            {/* Header Gradient */}
            <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-primary via-primary/50 to-orange" />
            
            <div className="p-8 sm:p-10 text-center">
              <div className="flex justify-end absolute top-6 right-6">
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/5 text-muted-foreground hover:text-white transition-all active:scale-95"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-white tracking-tighter">Download CV</h2>
                <p className="text-muted-foreground mt-2 font-medium">Select your preferred version</p>
              </div>

              <div className="grid gap-3">
                {downloadOptions.map((option, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDownload(option.url, option.fileName)}
                    className="group relative flex items-center gap-4 p-5 rounded-3xl bg-white/3 border border-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer overflow-hidden shadow-lg"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/30 border border-white/5 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all shrink-0">
                      {option.icon}
                    </div>

                    <div className="grow text-left">
                      <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{option.title}</h3>
                    </div>

                    <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-y-0.5 transition-all" />
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center gap-4">
                 <Button 
                   variant="ghost" 
                   onClick={onClose}
                   className="text-muted-foreground hover:text-white rounded-full px-8 h-10"
                 >
                   Cancel
                 </Button>
                 <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/30 font-bold">
                   Thank you!
                 </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
