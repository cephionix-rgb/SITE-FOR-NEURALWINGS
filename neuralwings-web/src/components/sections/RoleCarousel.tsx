import { motion } from 'framer-motion';
import { 
  Building2, Award, Shield, Plane, BookOpen, 
  Wrench, ShieldAlert, IndianRupee, Users, 
  Home, Package, GraduationCap, Cpu, ArrowRight 
} from 'lucide-react';

const roles = [
  {
    title: 'Director / CEO',
    icon: Building2,
    desc: 'Complete fleet, finance, compliance, and student progress in one executive dashboard. Real-time alerts, KPIs, and multi-branch rollup.',
    border: 'from-yellow-400 to-yellow-600',
    glow: 'text-yellow-500 bg-yellow-500/10'
  },
  {
    title: 'Chief Flying Instructor',
    icon: Award,
    desc: 'Daily flying programme, instructor allocation, sortie authorisation, and DGCA compliance dashboard. Approve rosters with one click.',
    border: 'from-blue-400 to-blue-600',
    glow: 'text-blue-500 bg-blue-500/10'
  },
  {
    title: 'Deputy CFI (DCFI)',
    icon: Shield,
    desc: 'Programme oversight, standards monitoring, and compliance calendar. Deputy authorisation workflows and training trend analysis.',
    border: 'from-blue-400 to-blue-600',
    glow: 'text-blue-500 bg-blue-500/10'
  },
  {
    title: 'Flight Instructor (FI)',
    icon: Plane,
    desc: 'Personal sortie schedule, student briefing notes, logbook entries, and duty hour tracker — always within DGCA limits.',
    border: 'from-sky-400 to-blue-500',
    glow: 'text-sky-500 bg-sky-500/10'
  },
  {
    title: 'Chief Ground Instructor',
    icon: BookOpen,
    desc: 'Ground training schedule, exam results, syllabus progress, and student assessment dashboard.',
    border: 'from-green-400 to-green-600',
    glow: 'text-green-500 bg-green-500/10'
  },
  {
    title: 'Ground Instructor (GI)',
    icon: BookOpen,
    desc: 'Class schedule, attendance, exam management, and student query tracking.',
    border: 'from-green-400 to-green-500',
    glow: 'text-green-400 bg-green-400/10'
  },
  {
    title: 'LAME / AME',
    icon: Wrench,
    desc: 'Aircraft serviceability dashboard, maintenance scheduling, defect log, and pre-flight release management.',
    border: 'from-amber-400 to-amber-600',
    glow: 'text-amber-500 bg-amber-500/10'
  },
  {
    title: 'Safety Officer',
    icon: ShieldAlert,
    desc: 'SMS hazard reports, safety investigation tracking, risk matrix visualisation, and DGCA safety audit calendar.',
    border: 'from-red-400 to-red-600',
    glow: 'text-red-500 bg-red-500/10'
  },
  {
    title: 'Finance Officer',
    icon: IndianRupee,
    desc: 'Fee collection, outstanding receivables, expense tracking, P&L overview, and DGCA financial compliance.',
    border: 'from-yellow-400 to-yellow-600',
    glow: 'text-yellow-500 bg-yellow-500/10'
  },
  {
    title: 'HR Manager',
    icon: Users,
    desc: 'Staff records, leave management, document expiry tracker, payroll overview, and recruitment pipeline.',
    border: 'from-sky-400 to-sky-600',
    glow: 'text-sky-500 bg-sky-500/10'
  },
  {
    title: 'Hostel Warden',
    icon: Home,
    desc: 'Room allocation, occupancy dashboard, complaints management, and student accommodation records.',
    border: 'from-teal-400 to-teal-600',
    glow: 'text-teal-400 bg-teal-400/10'
  },
  {
    title: 'Storekeeper',
    icon: Package,
    desc: 'Inventory levels, purchase requests, consumption tracking, and critical stock alerts.',
    border: 'from-orange-400 to-orange-600',
    glow: 'text-orange-500 bg-orange-500/10'
  },
  {
    title: 'Student',
    icon: GraduationCap,
    desc: 'Personal progress dashboard, upcoming sorties, logbook, exam schedule, fee statements, and AI study assistant.',
    border: 'from-blue-400 to-sky-400',
    glow: 'text-blue-500 bg-blue-500/10'
  },
  {
    title: 'HICA AI Admin',
    icon: Cpu,
    desc: 'AI engine performance, training data management, model health, and conversation analytics for the HICA assistant.',
    border: 'from-sky-400 to-blue-500',
    glow: 'text-sky-500 bg-sky-500/10'
  }
];

export function RoleCarousel() {
  return (
    <section id="dashboards" className="relative py-[120px] bg-white/50 overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-sky-400/10 rounded-full blur-[150px] -translate-y-1/2 -translate-x-1/4 pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-300/15 rounded-full blur-[120px] translate-x-1/4 pointer-events-none z-0" />
      
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 mb-16">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans font-semibold text-[20px] text-accent-gold uppercase tracking-[0.25em] mb-4 block"
          >
            BUILT FOR EVERY ROLE
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-bold text-[36px] md:text-[48px] text-gradient leading-tight max-w-3xl"
          >
            Every person in your FTO has their own intelligent dashboard.
          </motion.h2>
        </div>
      </div>

      {/* Carousel Container */}
      <div
        className="relative z-10 w-full overflow-x-auto hide-scrollbar pb-12 cursor-grab active:cursor-grabbing px-4 md:px-12"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
      >
        <div className="flex gap-4 md:gap-6 w-max mx-auto md:mx-0 min-w-full">
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="w-[78vw] max-w-[260px] md:w-[260px] glass-card-light bg-white/80 backdrop-blur-md border border-white/50 shadow-sm flex-shrink-0 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 border-t-0 hover:shadow-[0_0_40px_rgba(14,165,233,0.2)]"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Top Gradient Border */}
              <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${role.border} opacity-80`} />

              <div className="p-5 md:p-6 flex flex-col h-full">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 md:mb-5 ${role.glow} border border-white/50 shadow-inner`}>
                  <role.icon className="w-5 h-5 md:w-6 md:h-6 z-10" />
                </div>

                <h3 className="font-heading font-bold text-[16px] md:text-[18px] text-zinc-900 mb-2 leading-tight">
                  {role.title}
                </h3>

                <p className="font-sans font-normal text-[13px] md:text-[14px] text-font-secondary leading-relaxed mb-5 flex-1">
                  {role.desc}
                </p>

                <a
                  href="#demo"
                  className="flex items-center gap-2 mt-auto text-[13px] font-sans font-medium text-sky-500 hover:text-sky-400 transition-colors group/link w-max"
                  onClick={() => {
                    // In a real app we would use Context to set the active demo dashboard.
                    // For now, smooth scrolling to demo section handles the UX.
                  }}
                >
                  View Dashboard
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile swipe hint */}
      <div className="md:hidden relative z-10 text-center mt-2 pb-2">
        <p className="text-zinc-400 text-[11px] font-medium tracking-wide">← Swipe to explore all roles →</p>
      </div>
    </section>
  );
}
