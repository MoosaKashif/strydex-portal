import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, Shirt, Coffee, Printer, CheckCircle, Sparkles, Trophy, Award, ExternalLink } from 'lucide-react';
import { playCyberClick, playCyberHover } from '../utils/sound';

export default function DashboardView({
  onSelectSession,
  onOpenTask,
  onOpenBadge,
  searchQuery = '',
}) {
  const scrollRef = useRef(null);

  const sessions = [
    {
      id: 'onshape-extrudes',
      badge: 'OCT 26 | 2:00 PM EST',
      title: 'STRYDEX AMA: Intro to Onshape Extrudes',
      description: 'Turn your startup idea into a focused, investor-ready execution plan that accelerates traction and team',
      isLive: true,
    },
    {
      id: 'exnematics',
      badge: 'OCT 26 | 2:00 PM EST',
      title: 'STRYDEX AMA: Intro to Exnematics',
      description: 'Create your startup embos into a investor-ready riack exigimentation.',
      isLive: false,
    },
    {
      id: 'rehab-robotics',
      badge: 'OCT 27 | 2:00 PM EST',
      title: 'STRYDEX AMA: Rehabilitation Robotics',
      description: 'Turn your startup idea into a investor-ready execution plan that accelerates traction alignment!',
      isLive: false,
    },
    {
      id: 'actuator-control',
      badge: 'OCT 28 | 4:00 PM EST',
      title: 'STRYDEX AMA: Actuator Control Systems',
      description: 'Master closed-loop torque control algorithms and brushless DC motor tuning for robotic gait.',
      isLive: false,
    },
    {
      id: 'gait-tracking',
      badge: 'OCT 30 | 1:00 PM EST',
      title: 'STRYDEX AMA: Sensor Fusion & Gait Tracking',
      description: 'Real-time IMU kinematic analysis and stance-phase detection for walking assist.',
      isLive: false,
    },
  ];

  const tasks = [
    {
      id: 'task-1',
      title: 'Refine Ankle Actuator Model',
      tag1: 'Onshape',
      tag2: 'Assembly',
      rewardText: '👕 👕',
      rewardType: 'shirt',
    },
    {
      id: 'task-2',
      title: 'Refine Ankle Actuator Model',
      tag1: 'Onshape',
      tag2: 'Assembly',
      rewardText: '☕ ☕',
      rewardType: 'coffee',
    },
    {
      id: 'task-3',
      title: 'Refine Ankle Actuator',
      tag1: 'Onshape',
      tag2: 'Kinematics',
      rewardText: '🖨️ 3D Print credit',
      rewardType: 'print',
    },
    {
      id: 'task-4',
      title: 'Refine 3D kinemator',
      tag1: 'Onshape',
      tag2: 'Assembly',
      rewardText: '🖨️ 3D Print credit',
      rewardType: 'print',
    },
  ];

  const badges = [
    {
      id: 'b1',
      name: 'Strydex Cadet',
      tier: 'Tier 1 Completed',
      description: 'Completed your first 5 live engineering sessions.',
      unlockedDate: 'Oct 14, 2023',
      bg: 'bg-white',
      textColor: 'text-black',
      isLeg: true,
    },
    {
      id: 'b2',
      name: 'CAD Schematic Specialist',
      tier: 'Tier 2 Completed',
      description: 'Mastered 3D constraints and geometric tolerance analysis.',
      unlockedDate: 'Oct 19, 2023',
      bg: 'bg-[#0f2e35]',
      border: 'border-dashed border-[#22cfb8]',
      isBlueprint: true,
    },
    {
      id: 'b3',
      name: 'Kinematic Solver',
      tier: 'Tier 3 Completed',
      description: 'Calculated torque curves for wearable exoskeleton joint pivots.',
      unlockedDate: 'Oct 22, 2023',
      isHex: true,
    },
    {
      id: 'b4',
      name: 'Actuator Tuner',
      tier: 'Tier 4 Completed',
      description: 'Calibrated brushless motor PID loops for smooth stance assistance.',
      unlockedDate: 'Oct 24, 2023',
      isHex: true,
    },
    {
      id: 'b5',
      name: 'Embedded Pioneer',
      tier: 'Tier 5 Completed',
      description: 'Implemented real-time sensor fusion with zero packet loss.',
      unlockedDate: 'Oct 26, 2023',
      isHex: true,
    },
    {
      id: 'b6',
      name: 'Strydex Fellow',
      tier: 'Tier 6 Completed',
      description: 'Contributed 4 refined subassembly parts to the main repository.',
      unlockedDate: 'Oct 28, 2023',
      bg: 'bg-[#0c2429]',
      isLegDark: true,
    },
    {
      id: 'b7',
      name: 'Exoskeleton Architect',
      tier: 'Tier 7 Completed',
      description: 'Reached 15 milestone sessions and completed clinical validation prep.',
      unlockedDate: 'Oct 30, 2023',
      isHex: true,
    },
  ];

  const scroll = (direction) => {
    playCyberClick();
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Filter sessions and tasks by query
  const filteredSessions = sessions.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tag1.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tag2.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* SECTION 1: UPCOMING SESSIONS */}
      <section aria-labelledby="upcoming-sessions-heading">
        <div className="flex items-center justify-between mb-4">
          <h2 id="upcoming-sessions-heading" className="text-xl sm:text-2xl font-cyber font-bold text-white tracking-wide">
            Upcoming Sessions
          </h2>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-1.5 rounded-lg bg-[#0c2428] border border-[#164249] text-[#73a3a8] hover:text-[#22cfb8] hover:border-[#22cfb8] transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-1.5 rounded-lg bg-[#0c2428] border border-[#164249] text-[#73a3a8] hover:text-[#22cfb8] hover:border-[#22cfb8] transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sessions Carousel */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-none scroll-smooth snap-x"
        >
          {filteredSessions.map((s) => (
            <div
              key={s.id}
              onClick={() => {
                playCyberClick();
                onSelectSession(s);
              }}
              onMouseEnter={playCyberHover}
              className="min-w-[280px] sm:min-w-[320px] max-w-[340px] cyber-card p-5 rounded-2xl flex flex-col justify-between cursor-pointer group shrink-0 snap-start relative overflow-hidden"
            >
              {/* Card Glow Border on Hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#22cfb8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div>
                {/* Date/Time Badge exactly as in screenshot */}
                <div className="inline-block px-3 py-1 rounded-full text-[11px] font-bold font-mono bg-[#22cfb8] text-[#07191d] shadow-sm mb-4">
                  {s.badge}
                </div>

                {/* Session Title */}
                <h3 className="text-base sm:text-lg font-cyber font-bold text-white leading-snug mb-2.5 group-hover:text-[#22cfb8] transition-colors">
                  {s.title}
                </h3>

                {/* Subtext description */}
                <p className="text-xs text-[#8ab3b7] line-clamp-3 leading-relaxed mb-6">
                  {s.description}
                </p>
              </div>

              {/* Join Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playCyberClick();
                  onSelectSession(s);
                }}
                className="w-full py-2 px-4 rounded-xl font-cyber font-bold text-xs bg-[#22cfb8] hover:bg-[#34e2cb] text-[#07191d] transition-all shadow-md group-hover:shadow-[0_0_15px_rgba(34,207,184,0.4)] text-center"
              >
                Join
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: SPLIT LOWER ROW (TASK BOARD & YOUR PROGRESS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: TASK BOARD */}
        <section aria-labelledby="task-board-heading" className="lg:col-span-6 space-y-4">
          <h2 id="task-board-heading" className="text-xl sm:text-2xl font-cyber font-bold text-white tracking-wide">
            Task Board
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => {
                  playCyberClick();
                  onOpenTask(task);
                }}
                onMouseEnter={playCyberHover}
                className="cyber-card p-4 rounded-xl cursor-pointer group flex flex-col justify-between min-h-[145px] hover:border-[#22cfb8]"
              >
                <div>
                  <h3 className="text-sm font-cyber font-bold text-white group-hover:text-[#22cfb8] transition-colors mb-2.5 leading-snug">
                    {task.title}
                  </h3>

                  {/* Badges exactly matching design */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#22cfb8] text-[#07191d]">
                      {task.tag1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-[#22cfb8] text-[#22cfb8] bg-[#0c282e]">
                      {task.tag2}
                    </span>
                  </div>
                </div>

                {/* Reward line */}
                <div className="text-xs font-mono text-[#8cb2b7] flex items-center gap-1.5 pt-1 border-t border-[#133c43]">
                  <span>Reward:</span>
                  <span className="text-[#38eed9] font-bold">{task.rewardText}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT COLUMN: YOUR PROGRESS */}
        <section aria-labelledby="your-progress-heading" className="lg:col-span-6 space-y-4">
          <h2 id="your-progress-heading" className="text-xl sm:text-2xl font-cyber font-bold text-white tracking-wide">
            Your Progress
          </h2>

          {/* Progress Card matching design line by line */}
          <div className="cyber-card p-6 rounded-2xl relative overflow-hidden space-y-6">
            {/* Ambient progress glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#22cfb8]/5 blur-3xl pointer-events-none" />

            {/* Progress Bar Container */}
            <div className="relative w-full h-8 bg-[#103238] rounded-full overflow-hidden p-0.5 border border-[#16434a]">
              <div
                className="h-full bg-[#22cfb8] rounded-full relative flex items-center justify-end pr-3 transition-all duration-1000 shadow-[0_0_15px_rgba(34,207,184,0.5)]"
                style={{ width: '65%' }}
              >
                <span className="text-xs font-cyber font-bold text-[#07191d] tracking-wide">
                  65%
                </span>
              </div>
            </div>

            {/* Split Info: Text and Badges */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              {/* Text Description exactly as shown */}
              <div className="md:col-span-6">
                <p className="text-xs sm:text-[13px] text-[#8db3b8] leading-relaxed">
                  You've completed 15 sessions. Your next milestone is 20 sessions. If You've completed 1sessions and next completed tno sessions.
                </p>
              </div>

              {/* Milestone Badges Grid */}
              <div className="md:col-span-6 flex flex-wrap gap-2.5 justify-start md:justify-end">
                {badges.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      playCyberClick();
                      onOpenBadge(b);
                    }}
                    onMouseEnter={playCyberHover}
                    className="relative w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 focus:outline-none"
                    title={`${b.name} - ${b.tier}`}
                  >
                    {/* Badge Style Variants */}
                    {b.isLeg ? (
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md p-1">
                        <img src="/assets/strydex_logo.png" alt="Leg" width={28} height={28} className="w-7 h-7 object-contain" />
                      </div>
                    ) : b.isLegDark ? (
                      <div className="w-10 h-10 rounded-full bg-[#0d2a30] border border-[#22cfb8] flex items-center justify-center shadow-md p-1">
                        <img src="/assets/strydex_logo.png" alt="Leg Dark" width={28} height={28} className="w-7 h-7 object-contain" />
                      </div>
                    ) : b.isBlueprint ? (
                      <div className="w-10 h-10 rounded-full bg-[#0a262d] border border-dashed border-[#22cfb8] flex items-center justify-center text-[#22cfb8]">
                        <span className="text-xs font-mono font-bold">CAD</span>
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-lg rotate-45 bg-[#0e3137] border border-[#22cfb8] flex items-center justify-center text-[#22cfb8] shadow-sm">
                        <CheckCircle className="w-4 h-4 -rotate-45" />
                      </div>
                    )}

                    {/* Small Cyan Checkmark Node at bottom-right */}
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#22cfb8] text-[#07191d] flex items-center justify-center shadow">
                      <CheckCircle className="w-2.5 h-2.5" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
