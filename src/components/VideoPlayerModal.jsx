import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, CheckCircle2, Bookmark, Clock, BookOpen, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCyberClick, playSuccessChime } from '../utils/sound';

export default function VideoPlayerModal({ item, onClose, onMarkComplete }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(24);
  const [speed, setSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState('notes'); // notes, chapters

  const canvasRef = useRef(null);

  // Simulated audio waveform / oscilloscope
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (isPlaying) {
        phase += 0.08 * speed;
      }

      ctx.beginPath();
      ctx.strokeStyle = '#22cfb8';
      ctx.lineWidth = 2;

      for (let x = 0; x < canvas.width; x++) {
        const y =
          canvas.height / 2 +
          Math.sin(x * 0.05 + phase) * (isPlaying ? 14 : 2) * Math.sin(x * 0.02) +
          Math.cos(x * 0.02 - phase * 0.5) * (isPlaying ? 8 : 1);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animId);
  }, [isPlaying, speed]);

  const handleMarkCompleted = () => {
    playSuccessChime();
    setCompleted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22cfb8', '#38eed9', '#ffffff', '#114a52'],
    });
    if (onMarkComplete) {
      onMarkComplete(item);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#07191d] border border-[#1d4f58] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <header className="px-5 py-3.5 bg-[#0a1e23] border-b border-[#1b4952] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#22cfb8] bg-[#0c2f35] px-2.5 py-1 rounded-md border border-[#1d5761]">
              {item.trackTitle || 'Track 1: CAD Fundamentals'}
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-md">
              {item.title}
            </h2>
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

        {/* Video Screen Area */}
        <div className="relative aspect-video bg-[#040e10] flex items-center justify-center overflow-hidden group">
          {/* Thumbnail / Visual Backdrop */}
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              width={880}
              height={495}
              className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-85' : 'opacity-60'}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-[#06181b] to-[#123840]">
              <span className="font-cyber text-2xl text-[#22cfb8]">STRYDEX ENGINEERING PORTAL</span>
            </div>
          )}

          {/* Waveform Canvas overlay at bottom */}
          <div className="absolute bottom-14 left-4 right-4 h-10 pointer-events-none opacity-80">
            <canvas ref={canvasRef} width={600} height={40} className="w-full h-full" />
          </div>

          {/* Center Play Overlay on Pause */}
          {!isPlaying && (
            <button
              onClick={() => {
                playCyberClick();
                setIsPlaying(true);
              }}
              className="absolute p-5 rounded-full bg-[#22cfb8]/90 text-[#07191d] shadow-2xl hover:scale-110 transition-transform"
            >
              <Play className="w-8 h-8 fill-current ml-1" />
            </button>
          )}

          {/* Video Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 flex flex-col gap-2">
            {/* Scrubber */}
            <div
              className="w-full h-2 bg-[#173a41] rounded-full cursor-pointer relative overflow-hidden group/bar"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickPos = (e.clientX - rect.left) / rect.width;
                setProgress(Math.round(clickPos * 100));
              }}
            >
              <div
                className="h-full bg-[#22cfb8] rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover/bar:opacity-100" />
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="flex items-center justify-between text-xs text-[#a1cbcf]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    playCyberClick();
                    setIsPlaying(!isPlaying);
                  }}
                  className="p-1 text-white hover:text-[#22cfb8] transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button
                  onClick={() => {
                    playCyberClick();
                    setIsMuted(!isMuted);
                  }}
                  className="p-1 hover:text-[#22cfb8] transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="font-mono text-[11px] text-[#7ca5ab]">
                  {Math.floor((progress * 18.5) / 100)}:12 / 18:32
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    playCyberClick();
                    const speeds = [1, 1.25, 1.5, 2];
                    const next = speeds[(speeds.indexOf(speed) + 1) % speeds.length];
                    setSpeed(next);
                  }}
                  className="px-2 py-0.5 rounded bg-[#102d33] border border-[#1d4d55] text-white hover:border-[#22cfb8] font-mono"
                >
                  {speed}x
                </button>

                <button
                  onClick={handleMarkCompleted}
                  className={`px-3 py-1 rounded-lg flex items-center gap-1.5 font-semibold transition-all ${
                    completed
                      ? 'bg-[#15464f] text-[#38eed9] border border-[#22cfb8]'
                      : 'bg-[#22cfb8] text-[#07191d] hover:bg-[#34e2cb]'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{completed ? 'Completed ✓' : 'Mark Complete'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Details & Notes */}
        <div className="p-5 overflow-y-auto max-h-56 bg-[#091f24] space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">{item.title}</h3>
              <p className="text-xs text-[#78a5aa] flex items-center gap-2 mt-1">
                <Clock className="w-3.5 h-3.5" /> {item.date || 'Oct 12, 2023'} • Instructor: STRYDEX Engineering Team
              </p>
            </div>
          </div>

          <div className="text-xs text-[#b8dcd9] leading-relaxed border-t border-[#163f47] pt-3">
            <p>
              In this module, you will learn the foundational CAD workflows required for designing wearable robotic exoskeletons. Topics covered include parametric variable tables, geometric constraint propagation, actuator shaft clearances, and tolerance stacks for 3D printed nylon and CNC aluminium components.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
