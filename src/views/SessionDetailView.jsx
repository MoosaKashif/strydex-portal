import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Play, Sparkles, Layers, Rotate3D } from 'lucide-react';
import CadViewer3D from '../components/CadViewer3D';
import { playCyberClick, playSuccessChime } from '../utils/sound';

export default function SessionDetailView({ onBack, onOpenContent, onJoinLive }) {
  const [show3DViewer, setShow3DViewer] = useState(false); // default to original Onshape CAD screenshot as shown in PDF, with 1-click toggle to 3D orbit!

  return (
    <div className="min-h-full flex flex-col p-4 sm:p-6 lg:p-8 max-w-[1440px] mx-auto w-full animate-fadeIn">
      {/* Top Bar matching PDF: "< Back to list" on left and "Content" on right */}
      <div className="flex items-center justify-between mb-5 px-1">
        <button
          onClick={() => {
            playCyberClick();
            onBack();
          }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#21676f] bg-[#092226] text-xs font-semibold text-[#8eb8bd] hover:text-[#38eed9] hover:border-[#24d0bc] transition-all group shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to list</span>
        </button>

        <button
          onClick={() => {
            playCyberClick();
            onOpenContent();
          }}
          className="px-5 py-2 rounded-full border border-[#21676f] bg-[#092226] text-xs font-semibold text-[#8eb8bd] hover:text-[#38eed9] hover:border-[#24d0bc] transition-all flex items-center gap-1.5 shadow-sm"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Content</span>
        </button>
      </div>

      {/* MAIN CARD CONTAINER (with exact Rocket & Arrow launch background) */}
      <div className="relative rounded-[28px] overflow-hidden border border-[#1b5e59]/60 shadow-[0_15px_50px_rgba(0,0,0,0.5)] p-6 sm:p-10 lg:p-12 min-h-[640px] flex items-center">
        {/* Background Layer 1: Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0e4542] via-[#093537] to-[#062427] z-0" />

        {/* Background Layer 2: Rocket & Upward Traction Arrow Graphic */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <img
            src="/assets/session_rocket_bg.svg"
            alt="Rocket Launch & Growth Trajectory"
            width={1400}
            height={900}
            className="w-full h-full object-cover object-center opacity-90 filter drop-shadow-[0_0_20px_rgba(34,207,184,0.15)]"
          />
        </div>

        {/* Background Layer 3: Ambient Radial Glow & Particles */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#22cfb8]/10 rounded-full blur-3xl pointer-events-none z-0" />

        {/* Main Content Grid: Left Details + Right CAD Window */}
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN: Session Information */}
          <section aria-labelledby="live-session-heading" className="lg:col-span-6 space-y-6">
            {/* Live session pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#20ceb9] text-[#07191d] font-bold text-xs shadow-[0_0_15px_rgba(32,206,185,0.4)]">
              <span className="w-2 h-2 rounded-full bg-[#07191d] animate-ping" />
              <span>Live session</span>
            </div>

            {/* Author Block */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#09262b] border border-[#22cfb8] flex items-center justify-center p-1.5 shadow-md">
                <img
                  src="/assets/strydex_logo.png"
                  alt="STRYDEX Author Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="block text-[11px] text-[#78a5a9] font-mono leading-tight">Author</span>
                <span className="block text-sm font-cyber font-bold text-white tracking-wider">STRYDEX</span>
              </div>
            </div>

            {/* Title exactly as in PDF */}
            <h1 id="live-session-heading" className="text-3xl sm:text-4xl lg:text-[44px] font-cyber font-bold text-white leading-[1.12] tracking-tight">
              STRYDEX AMA: Intro to<br className="hidden sm:inline" /> Onshape Extrudes
            </h1>

            {/* Subtext description */}
            <p className="text-sm sm:text-base text-[#d1ece9] leading-relaxed max-w-xl font-normal">
              Turn your startup idea into a focused, investor-ready execution plan that accelerates traction and team alignment!
            </p>

            {/* Skills Section */}
            <div className="space-y-2 pt-1">
              <h2 className="text-xs font-mono font-bold text-[#86afb4]">Skills:</h2>
              <div className="flex flex-wrap gap-2.5">
                <span className="px-4 py-1.5 rounded-full text-xs font-medium border border-[#22cfb8] text-[#38eed9] bg-[#0a292d]/80 shadow-sm">
                  Define the core problem
                </span>
                <span className="px-4 py-1.5 rounded-full text-xs font-medium border border-[#22cfb8] text-[#38eed9] bg-[#0a292d]/80 shadow-sm">
                  Validate with users
                </span>
              </div>
            </div>

            {/* For Whom Section */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono font-bold text-[#86afb4]">For whom:</h2>
              <div>
                <span className="px-4 py-1.5 rounded-full text-xs font-medium border border-[#22cfb8] text-[#38eed9] bg-[#0a292d]/80 shadow-sm inline-block">
                  STRYDEX participants
                </span>
              </div>
            </div>

            {/* Join Session Button */}
            <div className="pt-3">
              <button
                onClick={() => {
                  playSuccessChime();
                  onJoinLive();
                }}
                className="px-8 py-3.5 rounded-full bg-[#24ceba] hover:bg-[#34e2cb] text-[#07191d] font-cyber font-bold text-base tracking-wide shadow-[0_0_25px_rgba(36,206,186,0.5)] hover:shadow-[0_0_35px_rgba(36,206,186,0.7)] transition-all hover:scale-[1.02] flex items-center gap-2.5"
              >
                <span>Join Session</span>
              </button>
            </div>
          </section>

          {/* RIGHT COLUMN: Onshape CAD Window Container */}
          <div className="lg:col-span-6 w-full flex flex-col items-center justify-center">
            <div className="relative w-full rounded-2xl overflow-hidden border border-[#1b4b53] bg-[#091b1f] shadow-2xl group">
              {show3DViewer ? (
                // Interactive 3D WebGL Three.js Orbit Model
                <div className="relative">
                  <CadViewer3D
                    showingScreenshot={false}
                    onToggleScreenshot={() => setShow3DViewer(false)}
                  />
                  <button
                    onClick={() => {
                      playCyberClick();
                      setShow3DViewer(false);
                    }}
                    className="absolute top-3 right-3 z-20 px-3 py-1.5 rounded-lg bg-[#081e23]/95 text-xs font-mono text-[#38eed9] border border-[#22cfb8] flex items-center gap-1.5 hover:bg-[#123841] transition-colors shadow-lg"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>View 2D Interface</span>
                  </button>
                </div>
              ) : (
                // Exact Onshape CAD Window matching the PDF
                <div className="relative aspect-[4/3] sm:aspect-[16/11] bg-[#09181b] flex items-center justify-center overflow-hidden">
                  <img
                    src="/assets/onshape_clean.png"
                    alt="Onshape Part List 2201 CAD Model Interface"
                    width={880}
                    height={640}
                    className="w-full h-full object-contain"
                  />

                  {/* Toggle Button in Top Right */}
                  <button
                    onClick={() => {
                      playCyberClick();
                      setShow3DViewer(true);
                    }}
                    className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-[#092227]/90 backdrop-blur-md text-xs font-mono text-[#22cfb8] border border-[#1e5863] hover:border-[#22cfb8] hover:bg-[#113840] flex items-center gap-1.5 transition-all shadow-lg"
                    title="Switch to interactive 3D WebGL orbit viewer"
                  >
                    <Rotate3D className="w-3.5 h-3.5" />
                    <span>Launch 3D Orbit</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
