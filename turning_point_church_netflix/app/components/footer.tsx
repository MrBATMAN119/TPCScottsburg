
'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <motion.footer 
      className="bg-gradient-to-t from-slate-950 to-slate-900 border-t border-slate-800"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Church Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-slate-900 font-bold text-sm">TPC</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Turning Point Church</h3>
                <p className="text-xs text-slate-400">Scottsburg, Indiana</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start text-slate-400 text-sm">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p>899 W McClain Ave</p>
                  <p>Scottsburg, IN 47170</p>
                </div>
              </div>
              
              <div className="flex items-center text-slate-400 text-sm">
                <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                <a href="tel:(812) 752-7857" className="hover:text-amber-400 transition-colors">
                  (812) 752-7857
                </a>
              </div>
              
              <div className="flex items-center text-slate-400 text-sm">
                <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                <a href="mailto:office@tpcscottsburg.com" className="hover:text-amber-400 transition-colors">
                  office@tpcscottsburg.com
                </a>
              </div>
            </div>
          </div>

          {/* Church Mottos */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Our Heart</h4>
            <div className="space-y-3">
              <div className="text-slate-300 text-sm">
                <p className="text-amber-400 font-medium">"Be The Light"</p>
              </div>
              <div className="text-slate-300 text-sm">
                <p className="text-purple-400 font-medium">"The Church of Second Chances"</p>
              </div>
              <div className="text-slate-300 text-sm">
                <p className="text-blue-400 font-medium">"We are the family of God and what you go through we go through"</p>
              </div>
            </div>
          </div>

          {/* Online Presence */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect With Us</h4>
            <div className="space-y-3">
              <a 
                href="https://www.turningpointchurchscottsburg.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-400 hover:text-amber-400 text-sm transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Official Website
              </a>
              
              <a 
                href="https://www.youtube.com/@TPCScottsburg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-400 hover:text-red-400 text-sm transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                YouTube Channel
              </a>
              
              <a 
                href="https://www.facebook.com/Turningpointscottsburg/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-400 hover:text-blue-400 text-sm transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Facebook
              </a>
              
              <div className="text-slate-400 text-sm">
                <span>Instagram: </span>
                <span className="text-purple-400">@tpcscottsburg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            © 2025 Turning Point Church Scottsburg. A people of second chances and new beginnings.
          </p>
          <p className="text-slate-600 text-xs mt-2">
            Affiliated with Southeastern Indiana Baptist Association (SEIBA), Southern Baptist Convention
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
