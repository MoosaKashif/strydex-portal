import React, { useState } from 'react';
import { Award, Shirt, Coffee, Printer, Filter, CheckCircle2, Plus } from 'lucide-react';
import { playCyberClick } from '../utils/sound';

export default function TaskBoardFullView({ onOpenTask }) {
  const [filterTag, setFilterTag] = useState('All');

  const allTasks = [
    {
      id: 'task-1',
      title: 'Refine Ankle Actuator Model',
      tag1: 'Onshape',
      tag2: 'Assembly',
      rewardText: '👕 👕',
      status: 'Open',
    },
    {
      id: 'task-2',
      title: 'Refine Ankle Actuator Model',
      tag1: 'Onshape',
      tag2: 'Assembly',
      rewardText: '☕ ☕',
      status: 'Open',
    },
    {
      id: 'task-3',
      title: 'Refine Ankle Actuator',
      tag1: 'Onshape',
      tag2: 'Kinematics',
      rewardText: '🖨️ 3D Print credit',
      status: 'In Review',
    },
    {
      id: 'task-4',
      title: 'Refine 3D kinemator',
      tag1: 'Onshape',
      tag2: 'Assembly',
      rewardText: '🖨️ 3D Print credit',
      status: 'Open',
    },
    {
      id: 'task-5',
      title: 'Optimize Knee Pivot Bearing Tolerances',
      tag1: 'Onshape',
      tag2: 'Assembly',
      rewardText: '👕 👕',
      status: 'Completed',
    },
    {
      id: 'task-6',
      title: 'Cable Guide Tensioner Finite Element Analysis',
      tag1: 'Onshape',
      tag2: 'Kinematics',
      rewardText: '☕ ☕',
      status: 'Open',
    },
  ];

  const filtered = allTasks.filter(
    (t) => filterTag === 'All' || t.tag2 === filterTag || t.tag1 === filterTag
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-cyber font-bold text-white tracking-wide">
            Task Board
          </h1>
          <p className="text-xs sm:text-sm text-[#7da5ab] mt-1">
            Complete engineering deliverables, refine CAD subassemblies, and earn hardware rewards.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 bg-[#0a2328] p-1 rounded-xl border border-[#164149]">
          {['All', 'Assembly', 'Kinematics'].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                playCyberClick();
                setFilterTag(tag);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-cyber font-semibold transition-all ${
                filterTag === tag
                  ? 'bg-[#22cfb8] text-[#07191d]'
                  : 'text-[#8cb4b9] hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Rewards Inventory Summary Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="cyber-card p-4 rounded-xl flex items-center gap-4 bg-[#0c272d]">
          <span className="p-3 rounded-xl bg-[#113840] text-[#22cfb8] text-xl">👕</span>
          <div>
            <span className="text-[11px] font-mono text-[#76a1a7]">Strydex Team Merch</span>
            <div className="text-lg font-cyber font-bold text-white">2 Shirts Claimed</div>
          </div>
        </div>

        <div className="cyber-card p-4 rounded-xl flex items-center gap-4 bg-[#0c272d]">
          <span className="p-3 rounded-xl bg-[#113840] text-[#22cfb8] text-xl">☕</span>
          <div>
            <span className="text-[11px] font-mono text-[#76a1a7]">Engineering Fuel</span>
            <div className="text-lg font-cyber font-bold text-white">2 Mugs Earned</div>
          </div>
        </div>

        <div className="cyber-card p-4 rounded-xl flex items-center gap-4 bg-[#0c272d]">
          <span className="p-3 rounded-xl bg-[#113840] text-[#22cfb8] text-xl">🖨️</span>
          <div>
            <span className="text-[11px] font-mono text-[#76a1a7]">Additive Lab Balance</span>
            <div className="text-lg font-cyber font-bold text-[#38eed9]">450g Carbon Filament</div>
          </div>
        </div>
      </div>

      {/* Grid of Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((task) => (
          <div
            key={task.id}
            onClick={() => {
              playCyberClick();
              onOpenTask(task);
            }}
            className="cyber-card p-5 rounded-xl cursor-pointer group flex flex-col justify-between hover:border-[#22cfb8] min-h-[170px]"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6b969c]">
                  {task.status}
                </span>
                <span className="text-xs font-mono font-bold text-[#38eed9] bg-[#092226] px-2 py-0.5 rounded border border-[#17464e]">
                  {task.rewardText}
                </span>
              </div>

              <h2 className="text-sm sm:text-base font-cyber font-bold text-white group-hover:text-[#22cfb8] transition-colors mb-3">
                {task.title}
              </h2>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#22cfb8] text-[#07191d]">
                  {task.tag1}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-[#22cfb8] text-[#22cfb8] bg-[#0c282e]">
                  {task.tag2}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#143e46] flex items-center justify-between text-xs text-[#7ea9af]">
              <span>Click to view brief & submit</span>
              <span className="text-[#22cfb8] group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
