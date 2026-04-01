import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowRight } from 'lucide-react';

const STATS = [
  { value: '30', label: 'Documented Failures', color: 'text-red-500' },
  { value: '5',  label: 'Problem Categories',  color: 'text-amber-500' },
  { value: '19', label: 'Neural Modules',       color: 'text-sky-500' },
  { value: '₹∞', label: 'Revenue at Risk',      color: 'text-white' },
];


export function WarRoomHero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Background Video */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260302_085844_21a8f4b3-dea5-4ede-be16-d53f6973bb14.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Overlay to keep text readable */}
      <div className="absolute inset-0 bg-black/50 z-[1] pointer-events-none" />


      {/* Main content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center">

        {/* Alert badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-200 bg-red-50 font-sans text-[12px] font-semibold text-red-600 tracking-wide">
            <AlertTriangle className="w-3.5 h-3.5" />
            The State of Indian FTOs in 2024
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading font-bold text-zinc-900 leading-[1.05] tracking-tight"
        >
          <span className="block text-[44px] sm:text-[60px] md:text-[80px] lg:text-[96px] text-sky-400">
            30 Reasons Your FTO
          </span>
          <span className="block text-[44px] sm:text-[60px] md:text-[80px] lg:text-[96px] text-white">
            Needs Neural Wings.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-7 max-w-[640px] font-sans text-[17px] md:text-[19px] text-yellow-400 leading-relaxed"
        >
          Every FTO in India is running on paper registers, WhatsApp groups, and morning panic.
          Here is the full damage report — and exactly how we fix every single one.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => navigate('/book-demo')}
            className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-sky-500 text-white font-sans font-bold text-[14px] shadow-lg hover:bg-sky-600 transition-colors"
          >
            See a Live Demo
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#incident-log"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full border border-zinc-200 bg-white text-zinc-700 font-sans font-bold text-[14px] shadow-sm hover:border-zinc-300 transition-colors"
          >
            Read the Damage Report ↓
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 w-full max-w-[760px] grid grid-cols-2 md:grid-cols-4 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.18)] overflow-hidden"
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col items-center py-6 px-4 ${i < STATS.length - 1 ? 'border-r border-white/20' : ''}`}
            >
              <span className={`font-heading font-bold text-[36px] md:text-[44px] leading-none ${s.color}`}>
                {s.value}
              </span>
              <span className="mt-1.5 font-sans text-[11px] text-white/80 tracking-wide text-center">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
