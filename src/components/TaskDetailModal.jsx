import React, { useState } from 'react';
import { X, CheckSquare, Square, Award, UploadCloud, Link as LinkIcon, CheckCircle2, Sparkles, Coffee, Shirt, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCyberClick, playSuccessChime } from '../utils/sound';

export default function TaskDetailModal({ task, onClose, onClaimReward }) {
  const [shareLink, setShareLink] = useState('https://cad.onshape.com/documents/strydex-ankle-v2');
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Check ball bearing press-fit clearance (19mm OD)', done: true },
    { id: 2, text: 'Verify 35° dorsiflexion / 20° plantarflexion mechanical stops', done: true },
    { id: 3, text: 'Validate cable guide routing for brushless motor tendon', done: false },
    { id: 4, text: 'Export STEP AP214 file to repository', done: false },
  ]);
  const [claimed, setClaimed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggleCheck = (id) => {
    playCyberClick();
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const handleClaim = () => {
    playSuccessChime();
    setClaimed(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#22cfb8', '#ffffff', '#38eed9', '#145963'],
    });
    if (onClaimReward) {
      onClaimReward(task);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#081d22] border border-[#1d4f58] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <header className="px-6 py-4 bg-[#0a2329] border-b border-[#1b4b53] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-[#0f343c] text-[#22cfb8] border border-[#1e5863]">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#73a3a9]">Task Brief</span>
              <h2 className="text-base sm:text-lg font-bold text-white">{task.title}</h2>
            </div>
          </div>

          <button
            onClick={() => {
              playCyberClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-[#0e2c32] hover:bg-[#18444c] text-[#8cb4b9] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          {/* Tags & Reward Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0c272d] p-3.5 rounded-xl border border-[#18444c]">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#73a3a9]">Tags:</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#22cfb8] text-[#07191d]">
                {task.tag1 || 'Onshape'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold border border-[#22cfb8] text-[#22cfb8] bg-[#0d2a30]">
                {task.tag2 || 'Assembly'}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#38eed9] bg-[#081e22] px-3 py-1 rounded-lg border border-[#1d525c]">
              <span>Reward:</span>
              <span>{task.rewardText}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-mono uppercase text-[#73a3a9] tracking-wider mb-1.5">Objective</h3>
            <p className="text-xs sm:text-sm text-[#c8e8e6] leading-relaxed">
              Refine the ankle articulation subassembly model in Onshape. Ensure mechanical stops limit range of motion to prevent hyper-extension during gait cycle testing with patient simulators.
            </p>
          </div>

          {/* Checklist */}
          <div>
            <h3 className="text-xs font-mono uppercase text-[#73a3a9] tracking-wider mb-2">Engineering Checklist</h3>
            <div className="space-y-2">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-2.5 rounded-xl border cursor-pointer flex items-center gap-3 transition-colors ${
                    item.done
                      ? 'bg-[#0e2f36] border-[#22cfb8]/50 text-white'
                      : 'bg-[#091f24] border-[#164149] text-[#7da6ab] hover:border-[#1e5863]'
                  }`}
                >
                  {item.done ? (
                    <CheckSquare className="w-4 h-4 text-[#22cfb8] shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-[#52777c] shrink-0" />
                  )}
                  <span className={`text-xs ${item.done ? 'line-through text-[#8bb7bc]' : ''}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Submission Input */}
          <div>
            <h3 className="text-xs font-mono uppercase text-[#73a3a9] tracking-wider mb-2">Submission URL</h3>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <LinkIcon className="w-3.5 h-3.5 text-[#5e888e] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={shareLink}
                  onChange={(e) => setShareLink(e.target.value)}
                  placeholder="https://cad.onshape.com/documents/..."
                  className="w-full bg-[#061518] text-xs text-white pl-9 pr-3 py-2.5 rounded-xl border border-[#19454d] focus:outline-none focus:border-[#22cfb8]"
                />
              </div>
            </div>
          </div>

          {/* Claim Action */}
          <div className="pt-2 border-t border-[#163f46] flex items-center justify-between">
            <span className="text-xs text-[#6e999f]">
              {checklist.filter((c) => c.done).length} of {checklist.length} verified
            </span>

            <button
              onClick={handleClaim}
              disabled={claimed}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                claimed
                  ? 'bg-[#15464f] text-[#38eed9] border border-[#22cfb8] cursor-default'
                  : 'bg-[#22cfb8] hover:bg-[#32e0cb] text-[#07191d] shadow-lg shadow-[#22cfb8]/20 hover:scale-[1.02]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{claimed ? 'Reward Claimed! ✓' : 'Submit & Claim Reward'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
