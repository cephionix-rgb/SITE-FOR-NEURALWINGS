import { motion } from 'framer-motion';
import { AlertTriangle, FileX, Clock, EyeOff } from 'lucide-react';

const problems = [
  {
    num: '01',
    icon: FileX,
    title: 'No Single Source of Truth',
    desc: 'Flight records live in one register. Fuel in another. Student progress in a third. These records never talk to each other — creating gaps that become a compliance nightmare during DGCA audits.',
    risk: 'CRITICAL',
    riskColor: 'text-status-danger bg-red-50 border-red-200',
  },
  {
    num: '02',
    icon: AlertTriangle,
    title: 'Compliance is One Missed Deadline Away From a Grounding',
    desc: 'DGCA deadlines — medical renewals, instrument calibrations, licence revalidations — are tracked manually. One overlooked date can ground your entire fleet. No system warns you in advance.',
    risk: 'CRITICAL',
    riskColor: 'text-status-danger bg-red-50 border-red-200',
  },
  {
    num: '03',
    icon: Clock,
    title: 'Morning Scheduling Takes 2+ Hours Every Day',
    desc: 'The daily flying programme is manually assembled each morning — cross-referencing student records, aircraft serviceability, instructor availability, duty limits, and weather. It takes a CFI 2–3 hours. Every. Single. Day.',
    risk: 'HIGH',
    riskColor: 'text-status-warning bg-amber-50 border-amber-200',
  },
  {
    num: '04',
    icon: EyeOff,
    title: 'Directors Are Always Flying Blind',
    desc: 'Owners and directors have zero real-time visibility. Is the fleet airworthy? Are students progressing? Is the school compliant? Without a dashboard, every question requires a phone call.',
    risk: 'HIGH',
    riskColor: 'text-status-warning bg-amber-50 border-amber-200',
  }
];

export function Problem() {
  return (
    <section className="relative py-16 md:py-[120px] overflow-hidden bg-gradient-to-b from-[#F0F7FF] to-white">
      {/* Soft blue aurora blobs */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[400px] bg-blue-200/25 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-sky-200/20 rounded-full blur-[100px] pointer-events-none z-0" />
      {/* Gradient divider at bottom — transitions into next section */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans font-semibold text-[20px] text-accent-gold uppercase tracking-[0.25em] mb-4 block"
          >
            THE REALITY
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-bold text-[28px] md:text-[48px] text-zinc-900 leading-tight mb-6"
          >
            Indian FTOs Are Still Flying on{' '}
            <span className="text-gradient">Paperwork</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans font-normal text-[18px] text-zinc-500 max-w-[720px] leading-relaxed"
          >
            Every day, DGCA-approved flying schools across India lose hours to manual processes that put students, aircraft, and licences at risk.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: '0 20px 50px rgba(59,130,246,0.12)', borderColor: 'rgba(59,130,246,0.2)' }}
              className="bg-white rounded-2xl border border-zinc-200 shadow-[0_4px_30px_rgba(59,130,246,0.06)] overflow-hidden relative group transition-all duration-300"
            >
              {/* Danger/Warning gradient top bar */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-status-danger to-status-warning" />

              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center border border-red-100 relative">
                      <div className="absolute inset-0 rounded-xl bg-status-danger/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                      <problem.icon className="w-5 h-5 text-status-danger relative z-10" />
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center border border-zinc-200">
                      <span className="font-heading font-bold text-zinc-500 text-sm">{problem.num}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-lg border text-[10px] font-bold tracking-wider ${problem.riskColor}`}>
                    {problem.risk}
                  </span>
                </div>

                <h3 className="font-sans font-semibold text-[18px] text-zinc-900 mb-3 leading-snug">
                  {problem.title}
                </h3>
                <p className="font-sans font-normal text-[15px] text-zinc-500 leading-relaxed">
                  {problem.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
