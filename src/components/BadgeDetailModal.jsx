import React from 'react';
import { X, Award, CheckCircle, ShieldCheck, Zap } from 'lucide-react';
import { playCyberClick } from '../utils/sound';

export default function BadgeDetailModal({ badge, onClose }) {
  if (!badge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#081d22] border border-[#1d4f58] rounded-2xl shadow-2xl p-6 overflow-hidden text-center flex flex-col items-center">
        <button
          onClick={() => {
            playCyberClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#0e2c32] hover:bg-[#18444c] text-[#8cb4b9] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge Icon Glowing Frame */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#22cfb8]/20 blur-xl"></div>
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-[#0e353c] to-[#1a5b67] border-2 border-[#22cfb8] flex items-center justify-center shadow-lg">
            {badge.image ? (
              <img src={badge.image} alt={badge.name} width={56} height={56} className="w-14 h-14 object-contain" />
            ) : (
              <Award className="w-12 h-12 text-[#22cfb8]" />
            )}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#22cfb8] text-[#07191d] flex items-center justify-center shadow">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
        </div>

        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#22cfb8] bg-[#0c2f35] px-3 py-1 rounded-full border border-[#1b5560]">
          {badge.tier || 'Milestone Achieved'}
        </span>

        <h3 className="text-xl font-cyber font-bold text-white mt-3 mb-1">
          {badge.name || 'Exoskeleton Cadet'}
        </h3>

        <p className="text-xs text-[#8cb2b7] leading-relaxed max-w-xs mb-4">
          {badge.description || 'Successfully completed core kinematic modeling and attended 15 AMA engineering sessions.'}
        </p>

        <div className="w-full bg-[#0a2328] rounded-xl p-3 border border-[#16444c] text-xs text-[#73a1a7] flex justify-between font-mono">
          <span>Unlocked:</span>
          <span className="text-[#22cfb8] font-bold">{badge.unlockedDate || 'October 24, 2023'}</span>
        </div>
      </div>
    </div>
  );
}
