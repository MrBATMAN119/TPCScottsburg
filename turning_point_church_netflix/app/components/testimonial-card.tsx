
'use client';

import { motion } from 'framer-motion';
import { Quote, Play, Calendar, User } from 'lucide-react';
import { TestimonialCardProps } from '@/lib/types';

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  if (!testimonial) return null;

  const isVideo = testimonial.type === 'Video Collection';
  const isQuote = testimonial.type === 'Quote';

  return (
    <motion.div
      className="relative flex-shrink-0 w-80 group"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-500/30 hover:border-blue-400/50 p-6 h-full">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          {/* Type Badge */}
          <div className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${
            isVideo 
              ? 'bg-blue-600 text-white' 
              : 'bg-purple-600 text-white'
          }`}>
            {testimonial.type}
          </div>

          {/* Icon */}
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            {isVideo ? (
              <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
            ) : (
              <Quote className="w-4 h-4 text-white" />
            )}
          </div>
        </div>

        {/* Content for Video Testimonials */}
        {isVideo && (
          <>
            <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
              {testimonial?.title || 'Video Testimonial'}
            </h3>
            
            {testimonial?.description && (
              <p className="text-slate-300 text-sm mb-4">
                {testimonial.description}
              </p>
            )}

            {testimonial?.date && (
              <div className="flex items-center text-slate-400 text-xs mb-2">
                <Calendar className="w-3 h-3 mr-1" />
                <span>{new Date(testimonial.date).toLocaleDateString()}</span>
              </div>
            )}

            {testimonial?.url && (
              <div className="mt-4">
                <a
                  href={testimonial.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm transition-colors duration-300"
                >
                  <Play className="w-3 h-3 mr-1" />
                  Watch Video
                </a>
              </div>
            )}
          </>
        )}

        {/* Content for Quote Testimonials */}
        {isQuote && (
          <>
            {testimonial?.quote && (
              <blockquote className="text-white text-lg font-medium mb-4 leading-relaxed italic">
                "{testimonial.quote}"
              </blockquote>
            )}

            {testimonial?.author && (
              <div className="flex items-center text-slate-400 text-sm mb-2">
                <User className="w-4 h-4 mr-2" />
                <div>
                  <span className="text-white font-medium">{testimonial.author}</span>
                  {testimonial?.role && (
                    <span className="text-slate-400 ml-2">• {testimonial.role}</span>
                  )}
                </div>
              </div>
            )}

            {testimonial?.date && (
              <div className="flex items-center text-slate-400 text-xs mb-2">
                <Calendar className="w-3 h-3 mr-1" />
                <span>{new Date(testimonial.date).toLocaleDateString()}</span>
              </div>
            )}

            {testimonial?.context && (
              <p className="text-slate-400 text-xs mt-3 italic">
                {testimonial.context}
              </p>
            )}
          </>
        )}

        {/* Source */}
        {testimonial?.source && (
          <div className="mt-4 pt-4 border-t border-slate-700">
            <p className="text-slate-500 text-xs">
              Source: {testimonial.source}
            </p>
          </div>
        )}

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-blue-500/2 group-hover:to-blue-500/5 transition-all duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
}
