import React, { useState, useEffect } from 'react';
import { X, Users, MessageSquare, Hand, Mic, MicOff, Video, VideoOff, Send, Share2, Sparkles, Volume2 } from 'lucide-react';
import { playCyberClick, playSuccessChime } from '../utils/sound';

export default function LiveSessionModal({ session, onClose }) {
  const [micActive, setMicActive] = useState(false);
  const [videoActive, setVideoActive] = useState(true);
  const [handRaised, setHandRaised] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'STRYDEX Host', text: 'Welcome everyone! We are examining the 4-axis extrude geometry on Part 2201.', time: '2:01 PM', isHost: true },
    { sender: 'Alex Chen', text: 'Does the counterbore depth account for M4 socket head screws?', time: '2:03 PM' },
    { sender: 'Sarah Connor', text: 'Looking at the kinematic stress at the knee actuator pivot.', time: '2:04 PM' },
    { sender: 'Muhammad Hadi', text: 'Clear view of the CAD model on my screen 👍', time: '2:05 PM' },
  ]);
  const [viewerCount, setViewerCount] = useState(48);

  useEffect(() => {
    const timer = setInterval(() => {
      setViewerCount((c) => c + (Math.random() > 0.5 ? 1 : -1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    playCyberClick();
    setChatMessages((prev) => [
      ...prev,
      { sender: 'Muhammad Hadi', text: message.trim(), time: 'Just now', isSelf: true }
    ]);
    setMessage('');
  };

  const toggleHand = () => {
    playCyberClick();
    setHandRaised(!handRaised);
    if (!handRaised) {
      playSuccessChime();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl h-[88vh] bg-[#07191d] border border-[#1d4f58] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Top Bar */}
        <header className="px-5 py-3.5 bg-[#0a1f24] border-b border-[#1b4b53] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22cfb8] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#22cfb8]"></span>
            </span>
            <span className="text-xs uppercase tracking-wider font-bold text-[#22cfb8] bg-[#0c2e34] px-2.5 py-0.5 rounded-full border border-[#1f5c66]">
              Live Stream
            </span>
            <h2 className="text-sm sm:text-base font-semibold text-white truncate max-w-md">
              {session?.title || 'STRYDEX AMA: Intro to Onshape Extrudes'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-[#8fbabf] bg-[#0c252a] px-3 py-1 rounded-full border border-[#164148]">
              <Users className="w-3.5 h-3.5 text-[#22cfb8]" />
              <span className="font-mono text-[#22cfb8] font-bold">{viewerCount}</span> participants
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
          </div>
        </header>

        {/* Modal Body: Left video/cad, Right chat */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Main Stage */}
          <div className="flex-1 bg-[#040e11] flex flex-col relative">
            <div className="flex-1 relative flex items-center justify-center p-4 overflow-hidden">
              <img
                src="/assets/onshape_clean.png"
                alt="Live CAD Demonstration"
                width={880}
                height={640}
                className="max-w-full max-h-full object-contain rounded-xl border border-[#19454d] shadow-lg"
              />

              {/* Host PIP / Speaker box */}
              <div className="absolute bottom-5 right-5 w-44 h-28 bg-[#092227] rounded-xl border border-[#22cfb8]/50 shadow-2xl overflow-hidden flex flex-col">
                <div className="flex-1 bg-gradient-to-tr from-[#092329] to-[#123e47] flex items-center justify-center relative">
                  <img
                    src="/assets/logo_p1.png"
                    alt="Host Avatar"
                    width={120}
                    height={40}
                    className="max-h-12 object-contain"
                  />
                  <span className="absolute bottom-1 left-2 text-[10px] text-white font-mono bg-black/60 px-1.5 py-0.5 rounded">
                    Host: Dr. K. Vance
                  </span>
                </div>
              </div>

              {/* Live Status Overlay */}
              <div className="absolute top-6 left-6 flex items-center gap-2">
                <div className="bg-[#071e23]/90 backdrop-blur-md px-3 py-1 rounded-lg border border-[#1c5059] text-xs text-[#a3d2d7]">
                  Screen Share: <span className="font-mono text-[#22cfb8]">Onshape 3D Workspace</span>
                </div>
              </div>
            </div>

            {/* Stage Bottom Controls */}
            <div className="h-16 bg-[#0a1e23] border-t border-[#17434b] px-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    playCyberClick();
                    setMicActive(!micActive);
                  }}
                  className={`p-2.5 rounded-xl border transition-all ${
                    micActive
                      ? 'bg-[#22cfb8] text-[#07191d] border-[#22cfb8]'
                      : 'bg-[#0f2e34] text-[#84adb2] border-[#1c4b54] hover:border-[#22cfb8]'
                  }`}
                  title={micActive ? 'Mute Mic' : 'Unmute Mic'}
                >
                  {micActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => {
                    playCyberClick();
                    setVideoActive(!videoActive);
                  }}
                  className={`p-2.5 rounded-xl border transition-all ${
                    videoActive
                      ? 'bg-[#0f2e34] text-[#22cfb8] border-[#1c4b54]'
                      : 'bg-red-500/20 text-red-400 border-red-500/40'
                  }`}
                  title={videoActive ? 'Turn Off Camera' : 'Turn On Camera'}
                >
                  {videoActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={toggleHand}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all ${
                    handRaised
                      ? 'bg-[#22cfb8] text-[#07191d] border-[#22cfb8] shadow-lg shadow-[#22cfb8]/20'
                      : 'bg-[#0e2a30] text-[#a1cbcf] border-[#1d4d56] hover:border-[#22cfb8]'
                  }`}
                >
                  <Hand className={`w-4 h-4 ${handRaised ? 'animate-bounce' : ''}`} />
                  <span>{handRaised ? 'Hand Raised' : 'Raise Hand'}</span>
                </button>

                <button
                  onClick={() => {
                    playCyberClick();
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600/90 hover:bg-red-500 text-white transition-all"
                >
                  Leave Session
                </button>
              </div>
            </div>
          </div>

          {/* Right Live Chat Sidebar */}
          <div className="w-full md:w-80 bg-[#081b1f] border-t md:border-t-0 md:border-l border-[#19454d] flex flex-col h-64 md:h-auto">
            <div className="px-4 py-3 border-b border-[#163f46] flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-[#22cfb8]" />
                Live Chat & Q&A
              </span>
              <span className="text-[11px] font-mono text-[#76a3a9]">Active</span>
            </div>

            {/* Chat List */}
            <div className="flex-1 p-3 space-y-3 overflow-y-auto">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-xl text-xs ${
                    msg.isHost
                      ? 'bg-[#0f343b] border border-[#22cfb8]/40'
                      : msg.isSelf
                      ? 'bg-[#123f47] border border-[#1f5963] ml-2'
                      : 'bg-[#0c2429] border border-[#164047]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`font-semibold ${
                        msg.isHost ? 'text-[#22cfb8]' : msg.isSelf ? 'text-[#5df4e2]' : 'text-[#8fc3c9]'
                      }`}
                    >
                      {msg.sender}
                    </span>
                    <span className="text-[10px] text-[#557e84] font-mono">{msg.time}</span>
                  </div>
                  <p className="text-[#d8f2f0] leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-[#0a1e23] border-t border-[#163f46] flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask Dr. Vance a question..."
                className="flex-1 bg-[#061518] text-xs text-white placeholder-[#5d858a] px-3 py-2 rounded-xl border border-[#18454d] focus:outline-none focus:border-[#22cfb8]"
              />
              <button
                type="submit"
                className="p-2 bg-[#22cfb8] text-[#07191d] rounded-xl font-bold hover:bg-[#34e2cb] transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
