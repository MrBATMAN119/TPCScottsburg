
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { DonationModal } from './donation-modal';

export function Header() {
  const [showDonationModal, setShowDonationModal] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-slate-900/90 to-transparent backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-slate-900 font-bold text-sm">TPC</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Turning Point Church</h1>
              <p className="text-xs text-slate-300">Be The Light</p>
            </div>
          </div>

          {/* Navigation & Donate Button */}
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#sermons" className="text-slate-300 hover:text-white transition-colors">
                Sermons
              </a>
              <a href="#events" className="text-slate-300 hover:text-white transition-colors">
                Events
              </a>
              <a href="#programs" className="text-slate-300 hover:text-white transition-colors">
                Programs
              </a>
              <a href="#testimonials" className="text-slate-300 hover:text-white transition-colors">
                Testimonials
              </a>
            </nav>
            
            <Button 
              onClick={() => setShowDonationModal(true)}
              className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 font-semibold px-6 py-2 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Heart className="w-4 h-4 mr-2" />
              Donate
            </Button>
          </div>
        </div>
      </header>

      <DonationModal 
        isOpen={showDonationModal} 
        onClose={() => setShowDonationModal(false)} 
      />
    </>
  );
}
