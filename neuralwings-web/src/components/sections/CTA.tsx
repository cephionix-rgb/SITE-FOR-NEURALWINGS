import { motion } from 'framer-motion';
import { ArrowRight, CalendarCheck, ShieldCheck, Zap, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DemoForm } from '../forms/DemoForm';

const stats = [
  { icon: CalendarCheck, value: '< 72 hrs', label: 'Onboarding Time' },
  { icon: ShieldCheck, value: 'ICAO', label: 'Standards-Based Core' },
  { icon: Zap, value: '12+', label: 'Intelligent Modules' },
  { icon: Globe, value: 'Worldwide', label: 'Any Country, Any Academy' },
];

export function CTA() {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 md:py-[140px] overflow-hidden bg-[#050810]">

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow – center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[900px] h-[500px] bg-blue-600/20 rounded-full blur-[160px]" />
      </div>
      {/* Secondary glow – bottom left */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
      {/* Tertiary glow – top right */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[350px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top border beam */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

      <div className="relative z-10 max-w-[960px] mx-auto px-6 flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_2px_rgba(34,211,238,0.6)] animate-pulse" />
          <span className="text-cyan-300 text-xs font-semibold tracking-widest uppercase">Now Onboarding FTOs</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="font-heading font-extrabold text-[36px] md:text-[72px] leading-[1.05] text-white mb-6"
        >
          Ready to Upgrade{' '}
          <span className="relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Your FTO?
            </span>
            {/* underline accent */}
            <span className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-60" />
          </span>
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-zinc-400 text-[18px] md:text-[22px] max-w-[680px] leading-relaxed mb-14"
        >
          Join the next generation of flying training organisations — in India and anywhere in the world —
          operating intelligently, safely, and profitably, powered by Neural Wings.
        </motion.p>

        {/* Stat pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.22 }}
          className="flex flex-wrap justify-center gap-4 mb-14"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm"
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center">
                <Icon className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-sm leading-none">{value}</p>
                <p className="text-zinc-500 text-[11px] mt-0.5 leading-none">{label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          {/* Primary — the form sits directly below, so scroll to it rather than leaving the page */}
          <button
            onClick={() => {
              document.getElementById('demo-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              // preventScroll, or focusing mid-flight yanks the page and the smooth scroll overshoots
              setTimeout(
                () => document.querySelector<HTMLInputElement>('#demo-form input[name="name"]')?.focus({ preventScroll: true }),
                700
              );
            }}
            className="group relative px-8 py-4 rounded-2xl font-bold text-[15px] text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_40px_-8px_rgba(34,211,238,0.5)] hover:shadow-[0_0_55px_-4px_rgba(34,211,238,0.7)]"
            style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' }}
          >
            {/* shimmer */}
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            <CalendarCheck className="w-5 h-5" />
            Book a Live Demonstration
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary */}
          <button
            onClick={() => navigate('/book-demo')}
            className="px-8 py-4 rounded-2xl font-bold text-[15px] text-zinc-300 border border-white/15 bg-white/[0.05] hover:bg-white/10 hover:border-cyan-500/40 hover:text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            Contact Sales
          </button>
        </motion.div>

        {/* Inline demo request form */}
        <motion.div
          id="demo-form"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="w-full max-w-[620px] mt-14 scroll-mt-24"
        >
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 md:p-9 shadow-[0_20px_70px_-20px_rgba(0,0,0,0.6)]">
            <div className="text-center mb-8">
              <h3 className="font-heading font-extrabold text-[24px] md:text-[28px] text-white tracking-tight mb-2">
                Tell us about your FTO
              </h3>
              <p className="text-zinc-400 text-[14px] leading-relaxed max-w-[420px] mx-auto">
                Send us your details and we will come back to you with a walkthrough built around how your
                organisation actually operates.
              </p>
            </div>

            <DemoForm variant="dark" />
          </div>
        </motion.div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
          className="text-zinc-600 text-[12px] mt-8 tracking-wide"
        >
          No credit card required &nbsp;·&nbsp; Onboarding typically under 72 hours &nbsp;·&nbsp; DGCA compliant from day one
        </motion.p>
      </div>

      {/* Bottom border beam */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
    </section>
  );
}
