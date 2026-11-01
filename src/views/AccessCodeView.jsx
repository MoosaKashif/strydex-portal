import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Globe, ShieldCheck, Check, Sparkles } from 'lucide-react';
import ParticleNetwork from '../components/ParticleNetwork';
import { playCyberClick, playSuccessChime } from '../utils/sound';

export default function AccessCodeView({ onVerified, onBack }) {
  // Pre-filled with the exact 5 0 5 1 1 as shown in the design!
  const [digits, setDigits] = useState(['5', '0', '5', '1', '1', '']);
  const [timer, setTimer] = useState(18);
  const [canResend, setCanResend] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [verifying, setVerifying] = useState(false);

  const inputRefs = useRef([]);

  // Countdown timer for "Resend code in 0:18"
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Focus the 6th input box on mount to match the cursor in the screenshot!
  useEffect(() => {
    if (inputRefs.current[5]) {
      inputRefs.current[5].focus();
    }
  }, []);

  const handleDigitChange = (index, value) => {
    playCyberClick();
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value.slice(-1);
    setDigits(newDigits);

    // Auto-advance
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    // Auto submit if all 6 filled
    if (index === 5 && value) {
      triggerVerification([...newDigits.slice(0, 5), value.slice(-1)].join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    playCyberClick();
    setTimer(30);
    setCanResend(false);
    setErrorMsg('');
  };

  const triggerVerification = (code) => {
    setVerifying(true);
    playSuccessChime();
    setTimeout(() => {
      onVerified();
    }, 400);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    playCyberClick();
    const fullCode = digits.join('');
    if (fullCode.length === 6) {
      triggerVerification(fullCode);
    } else {
      // Auto complete to 505118 for convenience
      const completed = [...digits];
      if (!completed[5]) completed[5] = '8';
      setDigits(completed);
      triggerVerification(completed.join(''));
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#071316] text-[#e0f3f2] flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Language Selector in Top Bar */}
      <header className="absolute top-6 right-8 z-30 flex items-center gap-2 text-xs font-medium text-[#9fc7cb] bg-[#0c2429]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#19454d]">
        <span>English (US)</span>
        <span className="text-base">🌐</span>
      </header>

      {/* LEFT COLUMN: Access Code Form */}
      <main className="w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 z-20">
        <div className="max-w-md w-full mx-auto">
          {/* Back button */}
          <button
            onClick={() => {
              playCyberClick();
              if (onBack) onBack();
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#8eb6bb] hover:text-[#22cfb8] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back</span>
          </button>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-bold font-cyber text-white mb-3 tracking-tight">
            Enter access code
          </h1>

          {/* Subtext */}
          <p className="text-xs sm:text-sm text-[#7aa3a8] leading-relaxed mb-8">
            An access code has been sent to the email address you provided. Enter this code to access the platform.
          </p>

          {/* Code Input Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="code-0" className="block text-xs font-medium text-[#8bb4b9] mb-3">
                Code
              </label>

              {/* 6 Digit Inputs */}
              <div className="flex items-center gap-2 sm:gap-3">
                {digits.map((digit, index) => (
                  <div key={index} className="relative flex-1">
                    <input
                      id={`code-${index}`}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleDigitChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      aria-label={`Digit ${index + 1} of verification code`}
                      className={`w-full aspect-square text-center text-xl sm:text-2xl font-bold font-mono rounded-xl bg-[#092227] text-white border transition-all duration-200 outline-none ${
                        index === 5 && !digit
                          ? 'border-[#22cfb8] shadow-[0_0_15px_rgba(34,207,184,0.35)] ring-1 ring-[#22cfb8]'
                          : digit
                          ? 'border-[#1e4d56] focus:border-[#22cfb8] focus:ring-1 focus:ring-[#22cfb8]'
                          : 'border-[#153940] focus:border-[#22cfb8]'
                      }`}
                    />
                    {/* Blinking cursor effect for 6th digit if empty */}
                    {index === 5 && !digit && (
                      <span className="absolute inset-y-3 left-1/2 -translate-x-1/2 w-0.5 bg-[#22cfb8] animate-pulse pointer-events-none" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Resend Code Countdown */}
            <div className="flex items-center justify-between text-xs font-mono">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-[#22cfb8] hover:underline font-semibold"
                >
                  Resend code now
                </button>
              ) : (
                <span className="text-[#6d969c]">
                  Resend code in 0:{timer < 10 ? `0${timer}` : timer}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={verifying}
              className="w-full py-3.5 px-6 rounded-xl font-cyber font-bold text-sm tracking-wide bg-[#22cfb8] hover:bg-[#34e3cc] text-[#07191d] shadow-[0_0_20px_rgba(34,207,184,0.35)] transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              {verifying ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#07191d] border-t-transparent rounded-full animate-spin"></span>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify & Enter Portal</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Hint */}
          <div className="mt-8 p-3 rounded-xl bg-[#092227]/60 border border-[#143a41] text-[11px] text-[#739ea3] text-center">
            Click <span className="text-[#22cfb8] font-semibold">Verify</span> to access the Strydex Portal as <strong className="text-white">Muhammad Hadi</strong>.
          </div>
        </div>
      </main>

      {/* RIGHT COLUMN: Holographic Exoskeleton & Neon Brand */}
      <aside aria-label="Strydex Exoskeleton Presentation" className="w-full md:w-1/2 relative bg-[#041013] overflow-hidden flex flex-col items-center justify-center p-8 border-t md:border-t-0 md:border-l border-[#133c43]">
        {/* Interactive Glowing Cyber Constellation */}
        <ParticleNetwork density={50} maxDistance={120} speed={0.4} />

        {/* Ambient Cyan Radial Lights */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#22cfb8]/15 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-[#115059]/20 blur-3xl pointer-events-none"></div>

        {/* Exoskeleton Artwork with built-in STRYDEX brand logo */}
        <div className="relative z-10 max-w-xl w-full flex items-center justify-center">
          <img
            src="/assets/exo_full.png"
            alt="Strydex AI-Powered Walking Assist Exoskeleton"
            width={1024}
            height={1143}
            className="max-h-[580px] w-auto object-contain filter drop-shadow-[0_0_35px_rgba(34,207,184,0.4)] animate-pulse"
            style={{ animationDuration: '6s' }}
          />
        </div>
      </aside>
    </div>
  );
}
