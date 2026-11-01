import React from 'react';
import {
  LayoutDashboard,
  Video,
  BookOpen,
  ClipboardList,
  BarChart2,
  Archive,
  Menu,
  X,
  Volume2,
  VolumeX,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { playCyberClick, toggleSound, isSoundEnabled } from '../utils/sound';

export default function Sidebar({
  activeTab,
  setActiveTab,
  isOpen,
  setIsOpen,
  onLogout,
  soundOn,
  setSoundOn,
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'sessions', label: 'Sessions', icon: Video },
    { id: 'content-library', label: 'Content Library', icon: BookOpen },
    { id: 'task-board', label: 'Task Board', icon: ClipboardList },
    { id: 'progress', label: 'Progress', icon: BarChart2 },
    { id: 'session-archive', label: 'Session Archive', icon: Archive },
  ];

  const handleNavClick = (id) => {
    playCyberClick();
    setActiveTab(id);
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) {
      playCyberClick();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Main Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#081a1d] border-r border-[#153e45] flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header & Logo */}
        <div>
          <div className="h-16 px-5 border-b border-[#13373d] flex items-center justify-between">
            {/* Logo */}
            <div
              onClick={() => handleNavClick('dashboard')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <img
                src="/assets/strydex_logo.png"
                alt="STRYDEX Logo"
                width={140}
                height={38}
                className="h-8 w-auto object-contain filter drop-shadow-[0_0_10px_rgba(34,207,184,0.3)] transition-transform group-hover:scale-105"
              />
            </div>

            {/* Close button on mobile or toggle button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-1.5 rounded-lg bg-[#0d272d] text-[#78a4aa] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Block */}
          <div className="px-5 py-5 border-b border-[#12363c] flex items-center justify-between">
            <span className="text-sm font-semibold text-white tracking-wide">
              Muhammad Hadi
            </span>
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-[#e3f4f3] flex items-center justify-center text-[#07191d] shadow-sm">
                <span className="font-bold text-xs">MH</span>
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#22cfb8] border-2 border-[#081a1d]"></span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5" aria-label="Portal Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-[13px] transition-all text-left group ${
                    isActive
                      ? 'bg-[#22cfb8] text-[#07191d] font-bold shadow-[0_0_15px_rgba(34,207,184,0.35)]'
                      : 'text-[#84adb2] hover:text-white hover:bg-[#0d2a30]'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-[#07191d]' : 'text-[#5d8b91] group-hover:text-[#22cfb8]'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Utility Controls */}
        <div className="p-4 border-t border-[#12363c] space-y-2">
          {/* Audio Toggle */}
          <button
            onClick={handleToggleSound}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#0b242a] text-[#7faab0] hover:text-white text-xs border border-[#163f47] transition-colors"
          >
            <span className="flex items-center gap-2">
              {soundOn ? <Volume2 className="w-3.5 h-3.5 text-[#22cfb8]" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>Cyber SFX</span>
            </span>
            <span className={`text-[10px] font-mono ${soundOn ? 'text-[#22cfb8]' : 'text-[#52777c]'}`}>
              {soundOn ? 'ON' : 'MUTED'}
            </span>
          </button>

          {/* Switch to Access Code / Logout */}
          <button
            onClick={() => {
              playCyberClick();
              onLogout();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#759fa5] hover:text-red-400 hover:bg-[#1f1214] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock / Enter Code</span>
          </button>
        </div>
      </aside>
    </>
  );
}
