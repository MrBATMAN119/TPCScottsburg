
'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { EventCardProps } from '@/lib/types';

export function EventCard({ event }: EventCardProps) {
  if (!event) return null;

  const isRecurring = 'frequency' in event;
  const isSpecial = 'status' in event;

  return (
    <motion.div
      className="relative flex-shrink-0 w-72 group"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-500/30 hover:border-purple-400/50 p-6">
        
        {/* Event Type Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${
            isRecurring 
              ? 'bg-blue-600 text-white' 
              : 'bg-purple-600 text-white'
          }`}>
            {isRecurring ? 'Recurring' : 'Special Event'}
          </div>
          
          {isSpecial && event.status && (
            <div className={`text-xs px-2 py-1 rounded ${
              event.status === 'Past' 
                ? 'bg-slate-600 text-slate-300' 
                : 'bg-green-600 text-white'
            }`}>
              {event.status}
            </div>
          )}
        </div>

        {/* Event Name */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
          {event?.name || 'Event Name'}
        </h3>

        {/* Event Details */}
        <div className="space-y-3">
          {/* Date/Time for Recurring Events */}
          {isRecurring && (
            <>
              <div className="flex items-center text-slate-300">
                <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                <span className="text-sm">Every {event.day}</span>
              </div>
              <div className="flex items-center text-slate-300">
                <Clock className="w-4 h-4 mr-2 text-purple-400" />
                <span className="text-sm">{event.time}</span>
              </div>
              <div className="flex items-center text-slate-300">
                <Users className="w-4 h-4 mr-2 text-purple-400" />
                <span className="text-sm">{event.frequency}</span>
              </div>
            </>
          )}

          {/* Date/Time for Special Events */}
          {isSpecial && (
            <>
              <div className="flex items-center text-slate-300">
                <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                <span className="text-sm">{new Date(event.date || '').toLocaleDateString()}</span>
              </div>
              {event.time_start && (
                <div className="flex items-center text-slate-300">
                  <Clock className="w-4 h-4 mr-2 text-purple-400" />
                  <span className="text-sm">
                    {event.time_start}
                    {event.time_end && ` - ${event.time_end}`}
                  </span>
                </div>
              )}
              {event.location && (
                <div className="flex items-center text-slate-300">
                  <MapPin className="w-4 h-4 mr-2 text-purple-400" />
                  <span className="text-sm">{event.location}</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm mt-4 line-clamp-3">
          {event?.description || 'Event description'}
        </p>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:via-purple-500/2 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
}
