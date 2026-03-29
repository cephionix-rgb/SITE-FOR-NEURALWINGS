import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Before Neural Wings, our CFI spent 3 hours every morning just building the flying programme. Now AIRE does it in under a minute. The time we've recovered has directly gone into more flying hours.",
    name: 'Wg Cdr (Retd.) Arvind Malhotra',
    role: 'Director of Training',
    fto: 'Himalayan Aviators Academy',
    location: 'Shimla, HP',
    initials: 'AM',
    color: 'bg-blue-600',
  },
  {
    quote: "During our last DGCA audit, the inspector asked for records that would have taken us two days to compile. We pulled the full compliance report in 40 seconds. The auditor was visibly impressed.",
    name: 'Capt. Priyanka Sethuraman',
    role: 'Chief Flight Instructor',
    fto: 'Deccan Wings Flight Academy',
    location: 'Mysore, KA',
    initials: 'PS',
    color: 'bg-indigo-600',
  },
  {
    quote: "We run 3 bases across two states. Managing student progress, fleet health, and hostel across all of them used to be a constant fire drill. Neural Wings gave us one screen for all of it.",
    name: 'Grp Capt (Retd.) Suresh Narayanan',
    role: 'Founder & CEO',
    fto: 'SkyPath Aviation Institute',
    location: 'Karnal, HR',
    initials: 'SN',
    color: 'bg-sky-600',
  },
];

const ftos = [
  'Himalayan Aviators Academy',
  'Deccan Wings Flight Academy',
  'SkyPath Aviation Institute',
  'Eastern Skies FTO',
  'Apex Aviation Academy',
  'Garuda Pilot Training',
];

export function Testimonials() {
  return (
    <section className="relative py-[140px] bg-[#050810] overflow-hidden">

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient glows */}
      <div className="absolute top-1/2 left-1/2 w-[900px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[400px] h-[300px] bg-cyan-500/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Border beams */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_2px_rgba(34,211,238,0.6)]" />
            <span className="text-cyan-300 text-xs font-semibold tracking-widest uppercase">Trusted by FTOs Across India</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="font-heading font-extrabold text-[40px] md:text-[56px] leading-tight text-white mb-4"
          >
            The People Running India's{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Flying Schools
            </span>{' '}
            Trust Us.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-zinc-400 text-lg max-w-2xl"
          >
            From single-base academies to multi-location FTOs — hear from the directors, CFIs, and training managers who run on Neural Wings.
          </motion.p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="relative flex flex-col gap-5 p-6 rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote icon */}
              <Quote className="w-7 h-7 text-cyan-500/40 absolute top-5 right-5" />

              {/* Quote text */}
              <p className="text-zinc-300 text-[15px] leading-relaxed font-medium flex-1">
                "{t.quote}"
              </p>

              {/* Divider */}
              <div className="w-full h-[1px] bg-white/[0.06]" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center shrink-0`}>
                  <span className="text-white font-bold text-sm">{t.initials}</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">{t.name}</p>
                  <p className="text-zinc-500 text-xs mt-0.5">{t.role} · {t.fto}</p>
                  <p className="text-zinc-600 text-[11px]">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FTO name bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-5"
        >
          <p className="text-zinc-600 text-xs font-semibold uppercase tracking-[0.2em]">Also Onboarding</p>
          <div className="flex flex-wrap justify-center gap-3">
            {ftos.map((name) => (
              <span
                key={name}
                className="px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.04] text-zinc-400 text-xs font-medium hover:text-white hover:border-white/20 transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
