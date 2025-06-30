
'use client';

import { motion } from 'framer-motion';
import { Play, Calendar, Clock, User } from 'lucide-react';
import Image from 'next/image';
import { SermonCardProps } from '@/lib/types';
import { getYouTubeThumbnail, formatDate, formatDuration } from '@/lib/church-data';

export function SermonCard({ sermon, series, onClick }: SermonCardProps) {
  if (!sermon) return null;

  return (
    <motion.div
      className="relative flex-shrink-0 w-80 group cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
    >
      {/* Card Container */}
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-700 hover:border-amber-500/50">
        
        {/* Video Thumbnail */}
        <div className="relative aspect-video bg-slate-800">
          <Image
            src={getYouTubeThumbnail(sermon?.video_url)}
            alt={sermon?.title || 'Sermon thumbnail'}
            fill
            className="object-cover"
          />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <motion.div
              className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center shadow-lg group-hover:bg-amber-400 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-6 h-6 text-slate-900 ml-1" fill="currentColor" />
            </motion.div>
          </div>

          {/* Duration Badge */}
          {sermon?.duration_seconds && (
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
              {formatDuration(sermon.duration_seconds)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Series Badge */}
          {series && (
            <div className="inline-block bg-purple-600 text-white text-xs px-2 py-1 rounded-full mb-2">
              {series.title}
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors duration-300">
            {sermon?.title || 'Sermon Title'}
          </h3>

          {/* Speaker */}
          <div className="flex items-center text-slate-400 text-sm mb-2">
            <User className="w-4 h-4 mr-1" />
            <span>{sermon?.speaker || 'Speaker'}</span>
          </div>

          {/* Date */}
          {sermon?.date && (
            <div className="flex items-center text-slate-400 text-sm mb-2">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{formatDate(sermon.date)}</span>
            </div>
          )}

          {/* Description */}
          {sermon?.description && (
            <p className="text-slate-300 text-sm line-clamp-2">
              {sermon.description}
            </p>
          )}
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/0 group-hover:from-amber-500/10 group-hover:via-amber-500/5 group-hover:to-amber-500/10 transition-all duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
}
