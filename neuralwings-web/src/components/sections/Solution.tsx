import { motion } from 'framer-motion';
import { Plane, Cpu, GraduationCap, CheckCircle2 } from 'lucide-react';

const solutions = [
  {
    icon: Plane,
    gradient: 'from-blue-500 to-sky-400',
    shadow: 'shadow-blue-200',
    border: 'border-blue-100',
    hoverBorder: 'hover:border-blue-300',
    tagBg: 'bg-blue-50 border-blue-200 text-blue-700',
    tagIcon: 'text-blue-400',
    title: 'Real-Time Flight Operations',
    desc: 'From Go/No-Go dispatch to ADS-B tracking to sortie completion — every flight is documented, authorised, and auditable in real time.',
    tags: ['Flight Ops', 'Fleet', 'Fuel', 'Go/No-Go'],
  },
  {
    icon: Cpu,
    gradient: 'from-[#3B82F6] to-blue-400',
    shadow: 'shadow-blue-300',
    border: 'border-indigo-100',
    hoverBorder: 'hover:border-indigo-300',
    tagBg: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    tagIcon: 'text-indigo-400',
    title: 'AIRE — The AI Roster Engine',
    desc: 'Our flagship AI engine generates the entire daily flying programme in under 60 seconds — enforcing every DGCA duty limit, rest rule, and syllabus sequencing constraint automatically.',
    tags: ['AIRE', 'Rostering', 'DGCA Rules', 'Weather'],
  },
  {
    icon: GraduationCap,
    gradient: 'from-sky-400 to-cyan-400',
    shadow: 'shadow-sky-200',
    border: 'border-sky-100',
    hoverBorder: 'hover:border-sky-300',
    tagBg: 'bg-sky-50 border-sky-200 text-sky-700',
    tagIcon: 'text-sky-400',
    title: 'From Admission to CPL',
    desc: 'Track every student from ground school enrollment to their final flight test. Digital logbook, exam results, progress reports, and DGCA submissions — fully automated.',
    tags: ['Students', 'Logbook', 'Ground School', 'Compliance'],
  },
];

export function Solution() {
  return (
    <section id="features" className="relative py-16 md:py-[120px] overflow-hidden bg-[#F8FBFF]">
      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[140px] translate-x-1/4 -translate-y-1/4 pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-100/30 rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4 pointer-events-none z-0" />
      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans font-semibold text-[20px] text-accent-gold uppercase tracking-[0.25em] mb-4 block"
          >
            THE SOLUTION
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-bold text-[28px] md:text-[56px] text-zinc-900 leading-tight"
          >
            19 Modules.{' '}
            <span className="text-gradient">One Platform.</span>{' '}
            Zero Paper.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              whileHover={{ y: -8, boxShadow: '0 30px 60px rgba(59,130,246,0.12)' }}
              className={`bg-white rounded-2xl border ${item.border} ${item.hoverBorder} shadow-[0_4px_20px_rgba(59,130,246,0.06)] p-8 flex flex-col h-full transition-all duration-300 relative group`}
            >
              {/* Top accent line */}
              <div className={`absolute top-0 left-0 w-full h-[3px] rounded-t-2xl bg-gradient-to-r ${item.gradient}`} />

              <div className="mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg ${item.shadow}`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
              </div>

              <h3 className="font-heading font-semibold text-[20px] text-zinc-900 mb-3 leading-tight">
                {item.title}
              </h3>

              <p className="font-sans font-normal text-[15px] text-zinc-500 leading-relaxed mb-8 flex-1">
                {item.desc}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {item.tags.map(tag => (
                  <span key={tag} className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-sans font-medium ${item.tagBg}`}>
                    <CheckCircle2 className={`w-3 h-3 ${item.tagIcon}`} />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
