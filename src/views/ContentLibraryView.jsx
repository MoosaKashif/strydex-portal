import React, { useState } from 'react';
import { Play, Lock, ChevronRight, ChevronLeft, BookOpen, Sparkles, AlertCircle } from 'lucide-react';
import { playCyberClick } from '../utils/sound';

export default function ContentLibraryView({ onSelectVideo, searchQuery = '' }) {
  const [lockedModalItem, setLockedModalItem] = useState(null);

  const tracks = [
    {
      id: 'track-1',
      title: 'Track 1: CAD Fundamentals',
      cards: [
        {
          id: 'cad-1',
          title: 'Intro to Parametric CAD',
          date: 'Oct 12, 2023',
          image: '/assets/cad_card1.png',
          isLocked: false,
          trackTitle: 'Track 1: CAD Fundamentals',
        },
        {
          id: 'cad-2',
          title: 'Sketching & Constraints',
          date: 'Oct 12, 2023',
          image: '/assets/cad_card2.png',
          isLocked: false,
          trackTitle: 'Track 1: CAD Fundamentals',
        },
        {
          id: 'cad-3',
          unlocksAfter: 'CAD 101',
          isLocked: true,
          trackTitle: 'Track 1: CAD Fundamentals',
        },
        {
          id: 'cad-4',
          title: 'Intro to Parametric CAD',
          date: 'Oct 12, 2023',
          image: '/assets/cad_card4.png',
          isLocked: false,
          trackTitle: 'Track 1: CAD Fundamentals',
        },
        {
          id: 'cad-5',
          title: 'Sketching & Constraints',
          date: 'Oct 12, 2023',
          image: '/assets/cad_card5.png',
          isLocked: false,
          trackTitle: 'Track 1: CAD Fundamentals',
        },
      ],
    },
    {
      id: 'track-2',
      title: 'Track 2: Embedded Systems',
      cards: [
        {
          id: 'emb-1',
          title: 'Embedded C++ Programming',
          image: '/assets/emb_card1.png',
          isLocked: false,
          trackTitle: 'Track 2: Embedded Systems',
        },
        {
          id: 'emb-2',
          title: 'Embedded C++ Programming',
          image: '/assets/emb_card2.png',
          isLocked: false,
          trackTitle: 'Track 2: Embedded Systems',
        },
        {
          id: 'emb-3',
          title: 'Microcontroller Peripherals',
          image: '/assets/emb_card3.png',
          isLocked: false,
          trackTitle: 'Track 2: Embedded Systems',
        },
        {
          id: 'emb-4',
          unlocksAfter: 'Embedded C++',
          isLocked: true,
          trackTitle: 'Track 2: Embedded Systems',
        },
        {
          id: 'emb-5',
          unlocksAfter: 'Embedded C++',
          isLocked: true,
          trackTitle: 'Track 2: Embedded Systems',
        },
      ],
    },
    {
      id: 'track-3',
      title: 'Track 3: Electronics & PCB Design',
      cards: [
        {
          id: 'pcb-1',
          title: 'Circuit Simulation Fundamentals',
          image: '/assets/pcb_card1.png',
          isLocked: false,
          trackTitle: 'Track 3: Electronics & PCB Design',
        },
        {
          id: 'pcb-2',
          title: 'Circuit Simulation Fundamentals',
          image: '/assets/pcb_card2.png',
          isLocked: false,
          trackTitle: 'Track 3: Electronics & PCB Design',
        },
        {
          id: 'pcb-3',
          title: 'PCB Layout for High-Speed Signals',
          image: '/assets/pcb_card3.png',
          isLocked: true,
          isPcbSpecial: true,
          trackTitle: 'Track 3: Electronics & PCB Design',
        },
        {
          id: 'pcb-4',
          unlocksAfter: 'Circuit Simula...',
          isLocked: true,
          trackTitle: 'Track 3: Electronics & PCB Design',
        },
        {
          id: 'pcb-5',
          unlocksAfter: 'Circuit Simulation',
          isLocked: true,
          trackTitle: 'Track 3: Electronics & PCB Design',
        },
      ],
    },
    {
      id: 'track-4',
      title: 'Track 4: Manufacturing & Prototyping',
      cards: [
        {
          id: 'mfg-1',
          unlocksAfter: 'Intro to CNC Machining',
          isLocked: true,
          trackTitle: 'Track 4: Manufacturing & Prototyping',
        },
        {
          id: 'mfg-2',
          unlocksAfter: 'Tolerance Analysis',
          isLocked: true,
          trackTitle: 'Track 4: Manufacturing & Prototyping',
        },
        {
          id: 'mfg-3',
          unlocksAfter: 'DLP 3D Printing',
          isLocked: true,
          trackTitle: 'Track 4: Manufacturing & Prototyping',
        },
        {
          id: 'mfg-4',
          unlocksAfter: 'DLP 3D Printing',
          isLocked: true,
          trackTitle: 'Track 4: Manufacturing & Prototyping',
        },
      ],
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-cyber font-bold text-white tracking-wide">
          Content Library
        </h1>
        <p className="text-xs sm:text-sm text-[#7aa1a7] mt-1">
          Explore curriculum tracks in CAD modeling, embedded firmware, PCB engineering, and additive manufacturing.
        </p>
      </div>

      {/* Tracks List */}
      <div className="space-y-8">
        {tracks.map((track) => {
          const matchingCards = track.cards.filter((card) => {
            if (!searchQuery) return true;
            const q = searchQuery.toLowerCase();
            return (
              (card.title && card.title.toLowerCase().includes(q)) ||
              (card.unlocksAfter && card.unlocksAfter.toLowerCase().includes(q)) ||
              track.title.toLowerCase().includes(q)
            );
          });

          if (matchingCards.length === 0) return null;

          return (
            <div key={track.id} className="space-y-3">
              <h2 className="text-base sm:text-lg font-cyber font-bold text-[#d4f2f0] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#22cfb8]"></span>
                <span>{track.title}</span>
              </h2>

              {/* Horizontal Scroll Row */}
              <div className="flex items-stretch gap-4 overflow-x-auto pb-4 scrollbar-none scroll-smooth">
                {matchingCards.map((card) => {
                  if (card.isLocked) {
                    return (
                      <div
                        key={card.id}
                        onClick={() => {
                          playCyberClick();
                          setLockedModalItem(card);
                        }}
                        className="min-w-[220px] sm:min-w-[245px] max-w-[250px] cyber-card p-4 rounded-xl flex flex-col justify-center items-center text-center cursor-pointer group bg-[#091f24]/90 border border-[#143a41] hover:border-[#22cfb8]/50 shrink-0 relative overflow-hidden"
                      >
                        {card.isPcbSpecial ? (
                          // Card with image thumbnail + lock badge
                          <div className="w-full flex flex-col h-full justify-between">
                            <div className="relative aspect-video rounded-lg overflow-hidden mb-2 bg-[#061517]">
                              {card.image && (
                                <img
                                  src={card.image}
                                  alt={card.title}
                                  width={245}
                                  height={138}
                                  className="w-full h-full object-cover opacity-50 filter grayscale"
                                />
                              )}
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                <Lock className="w-6 h-6 text-[#22cfb8]" />
                              </div>
                            </div>
                            <h3 className="text-xs font-cyber font-bold text-[#8fb8bd] line-clamp-2">
                              {card.title}
                            </h3>
                          </div>
                        ) : (
                          // Standard Locked Card
                          <div className="py-6 flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-[#0d272d] border border-[#1a4e57] flex items-center justify-center text-[#22cfb8] mb-3 group-hover:scale-110 transition-transform">
                              <Lock className="w-4 h-4 text-[#22cfb8]" />
                            </div>
                            <span className="text-[11px] font-mono text-[#75a2a8]">Unlocks after:</span>
                            <span className="text-xs font-cyber font-bold text-white mt-0.5">
                              {card.unlocksAfter}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  }

                  // Unlocked Playable Card
                  return (
                    <div
                      key={card.id}
                      onClick={() => {
                        playCyberClick();
                        onSelectVideo(card);
                      }}
                      className="min-w-[220px] sm:min-w-[245px] max-w-[250px] cyber-card rounded-xl overflow-hidden cursor-pointer group shrink-0 flex flex-col justify-between hover:border-[#22cfb8]"
                    >
                      {/* Image Thumbnail */}
                      <div className="relative aspect-video bg-[#051416] overflow-hidden">
                        {card.image ? (
                          <img
                            src={card.image}
                            alt={card.title}
                            width={245}
                            height={138}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-[#22cfb8]/40" />
                          </div>
                        )}
                        {/* Hover Overlay Play Icon */}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-[#22cfb8]/80 text-[#07191d] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          </div>
                        </div>
                      </div>

                      {/* Card Info */}
                      <div className="p-3 bg-[#0a2328] flex items-center justify-between border-t border-[#164149]">
                        <div className="pr-2">
                          <h3 className="text-xs font-cyber font-bold text-white group-hover:text-[#22cfb8] transition-colors line-clamp-1">
                            {card.title}
                          </h3>
                          {card.date && (
                            <span className="text-[10px] text-[#69959b] font-mono block mt-0.5">
                              {card.date}
                            </span>
                          )}
                        </div>

                        {/* Teal Play circle matching design */}
                        <div className="w-6 h-6 rounded-full bg-[#22cfb8] text-[#07191d] flex items-center justify-center shrink-0">
                          <Play className="w-3 h-3 fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Locked Prerequisite Modal */}
      {lockedModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#081d22] border border-[#1c4e57] rounded-2xl p-6 shadow-2xl text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#0d2e35] border border-[#22cfb8] flex items-center justify-center text-[#22cfb8] mb-4">
              <Lock className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-cyber font-bold text-white mb-2">
              Prerequisite Required
            </h3>

            <p className="text-xs text-[#8cb0b5] leading-relaxed mb-6">
              This module unlocks automatically after completing{' '}
              <strong className="text-[#38eed9] font-mono">
                {lockedModalItem.unlocksAfter || lockedModalItem.title}
              </strong>
              . Progress through earlier lessons to unlock advanced topics.
            </p>

            <button
              onClick={() => {
                playCyberClick();
                setLockedModalItem(null);
              }}
              className="px-6 py-2.5 rounded-xl bg-[#22cfb8] text-[#07191d] font-cyber font-bold text-xs hover:bg-[#32e0cb] transition-colors"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
