import React, { useState } from 'react';
import { Search, Bell, FileText, ChevronDown, Menu, User, Settings, Shield, LogOut } from 'lucide-react';
import { playCyberClick } from '../utils/sound';

export default function Header({
  searchQuery,
  setSearchQuery,
  onOpenNotifications,
  onToggleSidebar,
  onLogout,
  user = { name: 'Hadi' },
}) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="h-16 px-4 sm:px-8 border-b border-[#143e45] bg-[#07171a]/90 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between gap-4">
      {/* Left: Mobile hamburger & Search bar */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => {
            playCyberClick();
            onToggleSidebar();
          }}
          className="lg:hidden p-2 rounded-lg bg-[#0d272d] text-[#7ea9af] hover:text-white border border-[#164249]"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search input matching design pill */}
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-[#5e888e] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full bg-[#16272b] text-xs text-white placeholder-[#689297] pl-9 pr-4 py-2 rounded-full border border-[#1a444c] focus:outline-none focus:border-[#22cfb8] focus:ring-1 focus:ring-[#22cfb8] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6e979d] hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Right Icons: Notifications, Notes, Profile Dropdown */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notification Bell with cyan badge */}
        <button
          onClick={() => {
            playCyberClick();
            onOpenNotifications();
          }}
          className="relative p-2 rounded-full text-[#8cb6bb] hover:text-[#22cfb8] hover:bg-[#0c282e] transition-colors"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5" />
          {/* Glowing Cyan Notification Dot matching design */}
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#22cfb8] shadow-[0_0_8px_rgba(34,207,184,0.9)] animate-pulse" />
        </button>

        {/* Content Feed / Notes Icon */}
        <button
          onClick={() => {
            playCyberClick();
            alert('STRYDEX Engineering Release Notes v2.4: Onshape extrude library synced, new tendon tension curves loaded.');
          }}
          className="p-2 rounded-lg text-[#8cb6bb] hover:text-[#22cfb8] hover:bg-[#0c282e] transition-colors hidden sm:flex"
          aria-label="Engineering notes"
        >
          <FileText className="w-5 h-5" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              playCyberClick();
              setProfileOpen(!profileOpen);
            }}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-[#0d2b31] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#dedede] flex items-center justify-center text-[#111] overflow-hidden">
              <User className="w-4 h-4 text-[#333]" />
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#739fa4]" />
          </button>

          {/* Profile Dropdown Menu */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#092025] border border-[#1a4a53] shadow-2xl py-2 z-50 text-xs">
              <div className="px-4 py-2 border-b border-[#143e46]">
                <p className="font-bold text-white">Muhammad Hadi</p>
                <p className="text-[11px] font-mono text-[#22cfb8]">hadi@strydex.io</p>
              </div>

              <button
                onClick={() => {
                  playCyberClick();
                  setProfileOpen(false);
                  alert('Strydex Participant ID: #SDX-2023-8842\nRole: Biomedical Robotics Fellow\nTier: 65% Certified');
                }}
                className="w-full px-4 py-2 text-left text-[#9fc7cc] hover:text-white hover:bg-[#0e2f36] flex items-center gap-2"
              >
                <Shield className="w-4 h-4 text-[#22cfb8]" />
                <span>Exoskeleton Credentials</span>
              </button>

              <button
                onClick={() => {
                  playCyberClick();
                  setProfileOpen(false);
                  onLogout();
                }}
                className="w-full px-4 py-2 text-left text-red-400 hover:bg-[#201214] flex items-center gap-2 border-t border-[#143e46] mt-1"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out / Access Code</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
