

import { useRouter } from 'next/navigation';
import React from 'react';


const AuthModal = ({ onClose }: { onClose: () => void }) => {
 
const router = useRouter();
  return (
    /* Modal Overlay - p-4 add kiya hai taaki mobile par modal kinaro se na chipke */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      
      {/* Glassmorphism Card - max-h-full aur responsive padding adjust ki gayi hai */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-3xl w-full max-w-md shadow-2xl relative my-auto">
        
        {/* Close Button - Mobile par click karna aasan banane ke liye thoda bada tap area */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white p-2"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="text-center">
          {/* Logo Icon - Size adjusted for mobile */}
          <div className="w-14 h-14 md:w-16 md:h-16 bg-[#cef19f] rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <span className="text-[#023020] text-2xl md:text-3xl font-bold">T</span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold mb-2 text-white">Login Required</h2>
          
          <p className="text-slate-300 mb-6 md:mb-8 text-xs md:text-sm leading-relaxed">
            Please log in to your account to start managing your boards and tasks.
          </p>

          <div className="space-y-3">
            {/* Primary Action - Mobile par tap friendly height (py-3.5) */}
            <button 
              onClick={() => router.push('/login')}
              className="w-full py-3.5 md:py-3 bg-[#cef19f] text-[#023020] rounded-xl font-bold hover:bg-[#b5d985] transition-all active:scale-[0.98] shadow-md uppercase tracking-wider text-xs md:text-sm"
            >
              Go to Login
            </button>
            
            {/* Secondary Action */}
            <button 
              onClick={onClose}
              className="w-full py-3.5 md:py-3 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 border border-white/10 transition-all active:scale-[0.98] text-xs md:text-sm"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;