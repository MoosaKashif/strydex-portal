import React from 'react';
import { Trophy, CheckCircle, Target, Award, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { playCyberClick } from '../utils/sound';

export default function ProgressFullView({ onOpenBadge }) {
  const skills = [
    { name: 'CAD Modeling & Onshape', level: 85, color: '#22cfb8' },
    { name: 'Kinematic Joint Geometry', level: 70, color: '#38eed9' },
    { name: 'Embedded C++ & STM32', level: 60, color: '#1db5a0' },
    { name: 'PCB Layout & High-Speed Traces', level: 45, color: '#179180' },
    { name: 'Additive Prototyping (DLP/FDM)', level: 80, color: '#22cfb8' },
  ];

  const milestones = [
    { sessions: 5, label: 'Milestone 1: Cadet Onboarding', achieved: true, date: 'Oct 14' },
    { sessions: 10, label: 'Milestone 2: Subassembly Mastery', achieved: true, date: 'Oct 20' },
    { sessions: 15, label: 'Milestone 3: Gait Biomechanics Specialist', achieved: true, date: 'Oct 28' },
    { sessions: 20, label: 'Milestone 4: Clinical Exoskeleton Fellow', achieved: false, date: 'Upcoming (5 sessions left)' },
    { sessions: 30, label: 'Milestone 5: Lead Hardware Architect', achieved: false, date: 'Locked' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-cyber font-bold text-white tracking-wide">
          Your Progress & Milestones
        </h1>
        <p className="text-xs sm:text-sm text-[#7aa1a7] mt-1">
          Detailed metrics, skill profiler, and verified credentials in exoskeleton robotics engineering.
        </p>
      </div>

      {/* Main 65% Progress Card */}
      <div className="cyber-card p-6 sm:p-8 rounded-2xl relative overflow-hidden bg-gradient-to-r from-[#0c272d] to-[#081f24]">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-mono font-bold text-[#22cfb8] uppercase tracking-wider bg-[#0b2f36] px-3 py-1 rounded-full border border-[#1b5561]">
              Level 3 Verified Engineer
            </span>
            <h2 className="text-xl sm:text-2xl font-cyber font-bold text-white">
              15 of 20 Sessions Completed (65% Milestone Progress)
            </h2>
            <p className="text-xs sm:text-sm text-[#8db5ba] leading-relaxed">
              You've completed 15 sessions. Your next milestone is 20 sessions. If You've completed 1sessions and next completed tno sessions.
            </p>
          </div>

          <div className="w-36 h-36 rounded-full border-4 border-[#22cfb8] flex flex-col items-center justify-center bg-[#07191d] shadow-[0_0_25px_rgba(34,207,184,0.3)] shrink-0">
            <span className="text-3xl font-cyber font-bold text-white">65%</span>
            <span className="text-[10px] font-mono text-[#7aa3a9] uppercase">Completion</span>
          </div>
        </div>

        {/* Bar */}
        <div className="w-full h-3.5 bg-[#091e23] rounded-full overflow-hidden mt-6 border border-[#16434a]">
          <div className="h-full bg-gradient-to-r from-[#179685] to-[#22cfb8] rounded-full" style={{ width: '65%' }}></div>
        </div>
      </div>

      {/* Two Column Layout: Skills & Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Skills Profiler */}
        <div className="lg:col-span-6 space-y-4">
          <h2 className="text-lg sm:text-xl font-cyber font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#22cfb8]" />
            <span>Technical Competency Matrix</span>
          </h2>

          <div className="cyber-card p-6 rounded-2xl space-y-4">
            {skills.map((skill, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="font-mono text-[#22cfb8] font-bold">{skill.level}%</span>
                </div>
                <div className="w-full h-2 bg-[#091f24] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones Roadmap */}
        <div className="lg:col-span-6 space-y-4">
          <h2 className="text-lg sm:text-xl font-cyber font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-[#22cfb8]" />
            <span>Milestone Trajectory</span>
          </h2>

          <div className="cyber-card p-6 rounded-2xl space-y-3">
            {milestones.map((m, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${
                  m.achieved
                    ? 'bg-[#0e2f36] border-[#22cfb8]/40 text-white'
                    : 'bg-[#081c20] border-[#153e46] text-[#699399]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                      m.achieved ? 'bg-[#22cfb8] text-[#07191d]' : 'bg-[#102d33] text-[#558187]'
                    }`}
                  >
                    {m.achieved ? '✓' : i + 1}
                  </span>
                  <div>
                    <div className="font-bold">{m.label}</div>
                    <span className="text-[10px] font-mono text-[#84aeb4]">{m.sessions} Sessions</span>
                  </div>
                </div>

                <span className="font-mono text-[11px] text-[#22cfb8]">{m.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
