import React from 'react';
import { X, Bell, CheckCircle2, Video, Award, Clock } from 'lucide-react';
import { playCyberClick } from '../utils/sound';

export default function NotificationDrawer({ isOpen, onClose, onSelectSession }) {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      title: 'Upcoming Session in 15 Minutes',
      text: 'STRYDEX AMA: Intro to Onshape Extrudes with Dr. Vance is starting soon.',
      time: '15m ago',
      icon: Video,
      action: 'Join Now',
      isSession: true,
    },
    {
      id: 2,
      title: 'Task Submission Approved',
      text: 'Refine Ankle Actuator Model passed geometric constraint review. 👕 👕 added to inventory.',
      time: '2h ago',
      icon: Award,
    },
    {
      id: 3,
      title: 'New Content Unlocked',
      text: 'Embedded Systems: Microcontroller Peripherals module is now ready to stream.',
      time: '1d ago',
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-sm h-full bg-[#081b1f] border-l border-[#1b4b53] shadow-2xl flex flex-col animate-slideLeft">
        {/* Header */}
        <header className="px-5 py-4 bg-[#0a2227] border-b border-[#18464e] flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-semibold text-sm">
            <Bell className="w-4 h-4 text-[#22cfb8]" />
            <span>Notifications</span>
            <span className="text-xs bg-[#22cfb8] text-[#07191d] font-bold px-1.5 py-0.5 rounded-full">3</span>
          </div>
          <button
            onClick={() => {
              playCyberClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-[#0e2c32] hover:bg-[#18444c] text-[#8cb4b9] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        {/* List */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                className="p-3.5 rounded-xl bg-[#0c262b] border border-[#17434a] hover:border-[#22cfb8]/50 transition-all text-xs"
              >
                <div className="flex items-start gap-3">
                  <span className="p-2 rounded-lg bg-[#113941] text-[#22cfb8] shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-white">{n.title}</h4>
                      <span className="text-[10px] text-[#558188] font-mono">{n.time}</span>
                    </div>
                    <p className="text-[#a5cfd3] leading-relaxed mb-2">{n.text}</p>
                    {n.isSession && (
                      <button
                        onClick={() => {
                          playCyberClick();
                          onClose();
                          if (onSelectSession) onSelectSession();
                        }}
                        className="px-2.5 py-1 rounded bg-[#22cfb8] text-[#07191d] font-bold text-[11px] hover:bg-[#38eed9] transition-colors"
                      >
                        {n.action}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <footer className="p-3 bg-[#0a2227] border-t border-[#18464e] text-center">
          <button
            onClick={() => {
              playCyberClick();
              onClose();
            }}
            className="text-xs text-[#22cfb8] hover:underline font-mono"
          >
            Mark all as read
          </button>
        </footer>
      </div>
    </div>
  );
}
