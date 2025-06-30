
'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DonationModal({ isOpen, onClose }: DonationModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleDonate = () => {
    window.open('https://pushpay.com/g/turningpointchurchscottsburg?src=fp', '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-md mx-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden shadow-2xl border border-amber-500/30"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 h-8 w-8 p-0 bg-black/50 hover:bg-black/70 text-white border-none"
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Content */}
            <div className="p-8 text-center">
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-slate-900" fill="currentColor" />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-white mb-4">
                Support Our Ministry
              </h2>

              {/* Description */}
              <p className="text-slate-300 mb-2 leading-relaxed">
                Your generous giving helps us continue our mission of being the church of second chances and spreading God's love in our community.
              </p>

              <p className="text-slate-400 text-sm mb-6">
                You are being redirected to our secure giving portal.
              </p>

              {/* Church Motto */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
                <p className="text-amber-300 font-medium italic">
                  "We are the family of God and what you go through we go through"
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleDonate}
                  className="flex-1 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 font-semibold py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Proceed to Give
                </Button>
                
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 py-3 rounded-full"
                >
                  Cancel
                </Button>
              </div>

              {/* Security Note */}
              <p className="text-slate-500 text-xs mt-4">
                Powered by PushPay - Secure & Encrypted
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
