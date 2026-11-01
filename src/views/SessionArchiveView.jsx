import React from 'react';
import { Play, Calendar, Clock, Video, Download, Tag } from 'lucide-react';
import { playCyberClick } from '../utils/sound';

export default function SessionArchiveView({ onSelectVideo }) {
  const archives = [
    {
      id: 'arch-1',
      title: 'STRYDEX AMA: Exoskeleton Joint Biomechanics & DOF',
      date: 'Oct 19, 2023',
      duration: '58 mins',
      speaker: 'STRYDEX Core Team',
      tags: ['Kinematics', 'Gait Analysis'],
      image: '/assets/cad_card1.png',
    },
    {
      id: 'arch-2',
      title: 'STRYDEX AMA: Motor Sizing & Planetary Gearboxes',
      date: 'Oct 15, 2023',
      duration: '1 hr 12 mins',
      speaker: 'Hardware Lead',
      tags: ['Motors', 'Torque'],
      image: '/assets/cad_card2.png',
    },
    {
      id: 'arch-3',
      title: 'STRYDEX AMA: Real-Time IMU Sensor Fusion with Kalman Filter',
      date: 'Oct 10, 2023',
      duration: '46 mins',
      speaker: 'Firmware Engineer',
      tags: ['Embedded', 'Sensors'],
      image: '/assets/emb_card1.png',
    },
    {
      id: 'arch-4',
      title: 'STRYDEX AMA: Clinical Trials & Patient Rehabilitation Workflows',
      date: 'Oct 04, 2023',
      duration: '1 hr 04 mins',
      speaker: 'Clinical Advisor',
      tags: ['Physiotherapy', 'Compliance'],
      image: '/assets/pcb_card1.png',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl sm:text-3xl font-cyber font-bold text-white tracking-wide">
          Session Archive
        </h1>
        <p className="text-xs sm:text-sm text-[#7aa1a7] mt-1">
          Full video recordings, transcripts, CAD files, and slide decks from past STRYDEX live engineering sessions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {archives.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              playCyberClick();
              onSelectVideo({
                title: item.title,
                date: item.date,
                image: item.image,
                trackTitle: 'Session Archive',
              });
            }}
            className="cyber-card p-4 rounded-xl flex flex-col sm:flex-row gap-4 cursor-pointer group hover:border-[#22cfb8]"
          >
            <div className="relative w-full sm:w-44 aspect-video rounded-lg overflow-hidden bg-[#051518] shrink-0">
              <img
                src={item.image}
                alt={item.title}
                width={176}
                height={99}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#22cfb8] text-[#07191d] flex items-center justify-center shadow">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#76a1a7] mb-1">
                  <span>{item.date}</span>
                  <span>•</span>
                  <span>{item.duration}</span>
                </div>
                <h2 className="text-sm font-cyber font-bold text-white group-hover:text-[#22cfb8] transition-colors leading-snug mb-2">
                  {item.title}
                </h2>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {item.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0b242a] text-[#22cfb8] border border-[#164249]"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
