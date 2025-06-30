
'use client';

import { motion } from 'framer-motion';
import { Users, BookOpen, Heart, Calendar } from 'lucide-react';
import { ProgramCardProps } from '@/lib/types';

export function ProgramCard({ program }: ProgramCardProps) {
  if (!program) return null;

  const getIcon = (programName: string) => {
    const name = programName?.toLowerCase() || '';
    if (name.includes('youth') || name.includes('children')) return Users;
    if (name.includes('prayer') || name.includes('encouragement')) return Heart;
    if (name.includes('bible') || name.includes('adult')) return BookOpen;
    return Calendar;
  };

  const Icon = getIcon(program.name);

  return (
    <motion.div
      className="relative flex-shrink-0 w-80 group"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative bg-gradient-to-br from-amber-900/20 to-orange-900/20 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-500/30 hover:border-amber-400/50 p-6 h-full">
        
        {/* Icon and Title */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-6 h-6 text-slate-900" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors duration-300">
              {program?.name || 'Program Name'}
            </h3>
            
            {/* Target Audience */}
            {program?.target_audience && (
              <div className="inline-block bg-amber-600 text-white text-xs px-2 py-1 rounded-full mb-2">
                {program.target_audience}
              </div>
            )}
          </div>
        </div>

        {/* Slogan */}
        {program?.slogan && (
          <div className="mb-4">
            <p className="text-amber-300 font-medium italic">
              "{program.slogan}"
            </p>
          </div>
        )}

        {/* Description */}
        {program?.description && (
          <p className="text-slate-300 text-sm mb-4 line-clamp-3">
            {program.description}
          </p>
        )}

        {/* Scripture */}
        {program?.guiding_scripture && (
          <div className="mb-4">
            <div className="flex items-center text-amber-400 text-xs mb-1">
              <BookOpen className="w-3 h-3 mr-1" />
              <span>Scripture Focus</span>
            </div>
            <p className="text-slate-400 text-sm italic">
              {program.guiding_scripture}
            </p>
          </div>
        )}

        {/* Meeting Schedule */}
        {program?.meeting_schedule && (
          <div className="mb-4">
            <div className="flex items-center text-amber-400 text-xs mb-1">
              <Calendar className="w-3 h-3 mr-1" />
              <span>Schedule</span>
            </div>
            <p className="text-slate-400 text-sm">
              {program.meeting_schedule}
            </p>
          </div>
        )}

        {/* Core Principles */}
        {program?.core_principles && program.core_principles.length > 0 && (
          <div className="mt-4">
            <h4 className="text-amber-400 text-xs mb-2">Core Principles:</h4>
            <ul className="space-y-1">
              {program.core_principles.slice(0, 3).map((principle, index) => (
                <li key={index} className="text-slate-400 text-xs flex items-start">
                  <span className="text-amber-400 mr-2">•</span>
                  <span className="line-clamp-2">{principle}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Platform Info */}
        {program?.platform && (
          <div className="mt-4 pt-4 border-t border-slate-700">
            <p className="text-slate-400 text-xs">
              Platform: <span className="text-amber-400">{program.platform}</span>
            </p>
          </div>
        )}

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:via-amber-500/2 group-hover:to-amber-500/5 transition-all duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
}
