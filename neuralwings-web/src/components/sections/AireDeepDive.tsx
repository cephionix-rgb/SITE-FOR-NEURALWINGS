import { motion } from 'framer-motion';
import { Brain, Database, Users, Cloud, ArrowDown } from 'lucide-react';

export function AireDeepDive() {
  return (
    <section className="relative py-[140px] bg-gradient-aire overflow-hidden">
      {/* Decorative inner glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030818_100%)] opacity-80" />
      <div className="absolute inset-0 hud-grid opacity-30 mix-blend-overlay" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans font-bold text-[11px] text-accent-gold uppercase tracking-[0.3em] mb-6 block drop-shadow-md"
          >
            FLAGSHIP AI FEATURE
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-[48px] md:text-[64px] text-zinc-900 leading-tight mb-6 drop-shadow-[0_0_60px_rgba(59,130,246,0.5)] block"
          >
            Meet AIRE
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans font-normal text-[20px] md:text-[22px] text-zinc-900/80 max-w-3xl leading-relaxed"
          >
            Your AI Chief Scheduler. It never sleeps, never makes errors, and knows every DGCA rule by heart.
          </motion.p>
        </div>

        {/* The Pipeline Diagram */}
        <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center mb-24">
          
          {/* Inputs Row */}
          <div className="w-full flex flex-wrap justify-center gap-4 md:gap-6 mb-8 md:mb-12">
            {[
              { icon: Users, label: 'Students' },
              { icon: Database, label: 'Aircraft' },
              { icon: Users, label: 'Instructors' },
              { icon: Cloud, label: 'Weather' },
              { icon: ShieldCheckIcon, label: 'DGCA Rules' },
            ].map((input, i) => (
              <motion.div
                key={input.label}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/80 border border-blue-400/30 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.2)]"
              >
                <input.icon className="w-4 h-4 text-sky-300" />
                <span className="font-sans font-medium text-[13px] text-zinc-900">{input.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Arrows pointing to center engine */}
          <div className="relative w-full h-8 md:h-12 mb-4 flex justify-center">
            <ArrowDown className="w-8 h-8 text-blue-400/50 animate-bounce" />
          </div>

          {/* The Engine */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: 'spring', bounce: 0.4 }}
            className="relative w-full max-w-2xl h-[120px] md:h-[160px] flex items-center justify-center group"
          >
            {/* Hexagonal glowing background proxy (using rounded box for simplicity, with intense glow) */}
            <div className="absolute inset-0 rounded-2xl bg-[#020D1E] border-2 border-blue-500/50 shadow-[0_0_50px_rgba(59,130,246,0.45)] overflow-hidden">
               {/* Rotating gradient background */}
               <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent,rgba(59,130,246,0.3),rgba(56,189,248,0.4),transparent)] animate-[spin_4s_linear_infinite]" />
               <div className="absolute inset-[2px] rounded-xl bg-transparent" />
            </div>

            <div className="relative z-10 flex items-center justify-center gap-6">
              <Brain className="w-16 h-16 text-sky-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              <span className="font-heading font-extrabold text-[28px] md:text-[36px] tracking-widest text-zinc-900">AIRE ENGINE</span>
            </div>
          </motion.div>

          {/* Arrow out */}
          <div className="relative w-full h-8 md:h-12 mt-4 flex justify-center">
            <ArrowDown className="w-8 h-8 text-accent-gold/50 animate-bounce" />
          </div>

          {/* Output Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="w-full max-w-2xl px-8 py-6 rounded-xl bg-white/50 border border-accent-gold shadow-[0_0_30px_rgba(201,168,76,0.15)] backdrop-blur-lg flex items-center justify-center gap-4"
          >
            <span className="font-sans font-semibold text-[16px] md:text-[18px] text-accent-gold uppercase tracking-widest text-center whitespace-pre-wrap">
              OPTIMISED DAILY FLYING PROGRAMME
            </span>
          </motion.div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-0 divide-x-0 md:divide-x divide-white/10">
          {[
            { value: '< 60 sec', label: 'Schedule\nGeneration' },
            { value: '100%', label: 'DGCA Rule\nEnforcement' },
            { value: '2 hrs → 5 min', label: 'Time saved\nper morning' },
            { value: 'Zero', label: 'Manual conflicts\nguaranteed' }
          ].map((stat, i) => (
            <motion.div 
              key={stat.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + (i * 0.1) }}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="font-heading font-extrabold text-[40px] md:text-[56px] lg:text-[60px] text-gradient bg-clip-text text-transparent mb-2 leading-none whitespace-nowrap">
                {stat.value}
              </div>
              <div className="font-sans font-medium text-[14px] text-zinc-900/70 whitespace-pre-line leading-snug">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Temporary icon component since Lucide's ShieldCheck is named that way
function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
}
