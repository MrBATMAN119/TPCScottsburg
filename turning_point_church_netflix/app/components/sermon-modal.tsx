
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Clock, Share2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChurchData } from '@/lib/types';
import { formatDate, formatDuration, getYouTubeVideoId } from '@/lib/church-data';

interface SermonModalProps {
  isOpen: boolean;
  onClose: () => void;
  sermon: ChurchData['sermons'][0] | null;
  series?: ChurchData['sermon_series'][0] | null;
}

export function SermonModal({ isOpen, onClose, sermon, series }: SermonModalProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsVideoLoaded(false);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleShare = async () => {
    if (!sermon?.video_url) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: sermon.title,
          text: `Watch "${sermon.title}" by ${sermon.speaker}`,
          url: sermon.video_url,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(sermon.video_url);
        // You could show a toast notification here
      } catch (error) {
        console.log('Error copying to clipboard:', error);
      }
    }
  };

  const videoId = getYouTubeVideoId(sermon?.video_url || null);

  if (!sermon) return null;

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
            className="relative w-full max-w-4xl mx-4 bg-slate-900 rounded-lg overflow-hidden shadow-2xl"
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

            {/* Video Player */}
            <div className="relative aspect-video bg-black">
              {videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  title={sermon.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={() => setIsVideoLoaded(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-800">
                  <p className="text-white">Video not available</p>
                </div>
              )}
              
              {!isVideoLoaded && videoId && (
                <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Series Badge */}
              {series && (
                <div className="inline-block bg-purple-600 text-white text-sm px-3 py-1 rounded-full mb-3">
                  {series.title}
                </div>
              )}

              {/* Title and Share */}
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold text-white pr-4">
                  {sermon.title}
                </h2>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="flex-shrink-0 border-slate-600 text-slate-300 hover:text-white hover:border-amber-500"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm mb-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>{sermon.speaker}</span>
                </div>
                
                {sermon.date && (
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formatDate(sermon.date)}</span>
                  </div>
                )}
                
                {sermon.duration_seconds && (
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{formatDuration(sermon.duration_seconds)}</span>
                  </div>
                )}
              </div>

              {/* Scripture Focus */}
              {sermon.scripture_focus && (
                <div className="mb-4">
                  <div className="flex items-center text-amber-400 text-sm mb-2">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>Scripture Focus</span>
                  </div>
                  <p className="text-slate-300">{sermon.scripture_focus}</p>
                </div>
              )}

              {/* Description */}
              {sermon.description && (
                <div className="mb-4">
                  <h3 className="text-amber-400 text-sm mb-2">About This Sermon</h3>
                  <p className="text-slate-300 leading-relaxed">{sermon.description}</p>
                </div>
              )}

              {/* Series Description */}
              {series?.description && (
                <div>
                  <h3 className="text-amber-400 text-sm mb-2">About This Series</h3>
                  <p className="text-slate-300 leading-relaxed">{series.description}</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
