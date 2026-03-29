import { Mail, Phone, Globe, MapPin, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logoUrl from '../../assets/logo.png';

const modules = [
  'Flight Operations', 'Fleet Management', 'Fuel Management',
  'AIRE Scheduler', 'Go/No-Go Engine', 'Digital Logbook',
  'Safety SMS', 'Finance', 'Student Portal', 'DGCA Compliance',
];

const company = [
  'About Cephionix', 'Neural Wings', 'VERIOS (Oncology)',
  'Careers', 'Blog', 'Privacy Policy', 'Terms',
];

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="relative bg-[#050810] overflow-hidden" id="contact">

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient glow – bottom left */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />
      {/* Ambient glow – top right */}
      <div className="absolute top-0 right-0 w-[500px] h-[350px] bg-cyan-500/[0.08] rounded-full blur-[140px] pointer-events-none" />

      {/* Top border beam */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      {/* ── Main grid ── */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6 pt-14 md:pt-20 pb-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12">

          {/* ── Brand col ── */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-cyan-500/20 blur-md" />
                <img src={logoUrl} alt="Neural Wings" className="relative h-[46px] w-auto" />
              </div>
              <span className="font-heading font-extrabold text-2xl text-white tracking-widest">
                NEURAL WINGS
              </span>
            </div>

            <p className="text-zinc-300 text-base leading-relaxed max-w-[300px]">
              The complete AI-powered Aviation Management System for DGCA-approved FTOs. Built by pilots, for pilots.
            </p>

            {/* Cephionix badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 w-max">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_2px_rgba(251,191,36,0.5)]" />
              <span className="text-amber-300 text-xs font-bold tracking-widest uppercase">A product of Cephionix</span>
            </div>

            {/* Status pill */}
            <div className="inline-flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-emerald-400 text-sm font-semibold">Systems Operational · India</span>
            </div>

            {/* CTA button */}
            <button
              onClick={() => navigate('/book-demo')}
              className="group mt-1 flex items-center gap-2 px-6 py-3 rounded-xl text-base font-bold text-white w-max transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_28px_-6px_rgba(34,211,238,0.55)] hover:shadow-[0_0_42px_-4px_rgba(34,211,238,0.75)]"
              style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' }}
            >
              Book a Demo
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* ── Modules col ── */}
          <div className="lg:col-span-3 flex flex-col gap-3.5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
              <h4 className="text-xs font-extrabold text-cyan-400 uppercase tracking-[0.2em]">Modules</h4>
            </div>
            {modules.map((link) => (
              <a
                key={link}
                href="#"
                className="group flex items-center gap-2 text-zinc-400 text-[15px] font-medium hover:text-white transition-colors duration-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-cyan-500 transition-colors shrink-0" />
                {link}
              </a>
            ))}
          </div>

          {/* ── Company col ── */}
          <div className="lg:col-span-2 flex flex-col gap-3.5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[2px] rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
              <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-[0.2em]">Cephionix</h4>
            </div>
            {company.map((link) => (
              <a
                key={link}
                href="#"
                className="group flex items-center gap-2 text-zinc-400 text-[15px] font-medium hover:text-white transition-colors duration-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-amber-500 transition-colors shrink-0" />
                {link}
              </a>
            ))}
          </div>

          {/* ── Contact col ── */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[2px] rounded-full bg-gradient-to-r from-violet-400 to-blue-500" />
              <h4 className="text-xs font-extrabold text-violet-400 uppercase tracking-[0.2em]">Get in Touch</h4>
            </div>

            <a
              href="mailto:cephionix@gmail.com"
              className="flex items-center gap-3 p-3.5 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:border-cyan-500/35 hover:bg-white/[0.07] transition-all duration-200 group"
            >
              <div className="w-9 h-9 rounded-xl bg-cyan-500/15 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest mb-0.5">Email</span>
                <span className="text-zinc-300 group-hover:text-white text-sm font-medium transition-colors truncate">
                  cephionix@gmail.com
                </span>
              </div>
            </a>

            <a
              href="tel:+919646341001"
              className="flex items-center gap-3 p-3.5 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:border-violet-500/35 hover:bg-white/[0.07] transition-all duration-200 group"
            >
              <div className="w-9 h-9 rounded-xl bg-violet-500/15 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-violet-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest mb-0.5">Phone</span>
                <span className="text-zinc-300 group-hover:text-white text-sm font-medium transition-colors">
                  +91 9646341001
                </span>
              </div>
            </a>

            <a
              href="https://neuralwings.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3.5 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:border-blue-500/35 hover:bg-white/[0.07] transition-all duration-200 group"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center shrink-0">
                <Globe className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest mb-0.5">Website</span>
                <span className="text-zinc-300 group-hover:text-white text-sm font-medium transition-colors">
                  neuralwings.org
                </span>
              </div>
            </a>

            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-white/[0.07] bg-white/[0.03]">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest mb-0.5">Location</span>
                <span className="text-zinc-300 text-sm font-medium">India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6 mt-12 md:mt-16 pt-6 pb-10">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-zinc-500 text-sm font-medium">© 2026 Cephionix. All rights reserved.</span>
          <span className="text-zinc-400 text-sm font-semibold italic">"Built by Pilots. Built for Pilots."</span>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            <span className="text-zinc-400 text-xs md:text-sm font-medium">Built in India</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            <span className="text-zinc-400 text-xs md:text-sm font-medium">DGCA Compliant</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            <span className="text-zinc-400 text-xs md:text-sm font-medium">AI-Powered</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
