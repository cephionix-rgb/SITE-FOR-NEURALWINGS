import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plane, Shield, GraduationCap, Building2, TrendingUp,
  CheckCircle2, AlertTriangle,
} from 'lucide-react';

type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM';
type Category = 'OPERATIONS' | 'COMPLIANCE' | 'TRAINING' | 'ADMINISTRATION' | 'BUSINESS';

interface Problem {
  id: number;
  title: string;
  description: string;
  severity: Severity;
  category: Category;
  module: string;
  imageSrc?: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PROBLEMS: Problem[] = [
  { id: 1,  category: 'OPERATIONS',     severity: 'CRITICAL', title: 'No Single Source of Truth',             description: 'Flight records, fuel logs, and student progress live in separate systems — creating audit gaps and data contradictions every DGCA inspection.',    module: 'Flight Operations' },
  { id: 2,  category: 'OPERATIONS',     severity: 'CRITICAL', title: 'Morning Scheduling Takes 2–3 Hours',    description: 'The CFI manually cross-references student records, aircraft serviceability, duty hours, weather, and DGCA rules — every single morning.',         module: 'AIRE Roster Engine' },
  { id: 3,  category: 'OPERATIONS',     severity: 'CRITICAL', title: 'Directors Fly Blind',                   description: 'Owners have zero real-time visibility into fleet status, student progress, compliance health, or revenue. Every answer requires a phone call.',  module: 'Director Dashboard' },
  { id: 4,  category: 'OPERATIONS',     severity: 'HIGH',     title: 'No Real-Time Aircraft Tracking',        description: "Once airborne, the FTO has no live tracking, no overdue alert system, and no automated emergency trigger if an aircraft doesn't return on time.",   module: 'Flight Operations' },
  { id: 5,  category: 'OPERATIONS',     severity: 'HIGH',     title: 'Manual Go/No-Go Decisions',             description: 'Weather, NOTAM, serviceability, and student/instructor validity are checked separately — creating safety risk and legal liability.',              module: 'Go/No-Go Engine' },
  { id: 6,  category: 'OPERATIONS',     severity: 'HIGH',     title: 'Fuel Tracking Discrepancies',           description: 'Uplift, consumption, and refuelling tracked on paper — leading to undetected pilferage and inaccurate per-aircraft cost reporting.',             module: 'Fuel Management' },
  { id: 7,  category: 'OPERATIONS',     severity: 'MEDIUM',   title: 'No Integrated Flight Planning',         description: 'Instructors have no built-in tool for route planning, weight & balance, fuel calculation, or NOTAM fetching before cross-country flights.',      module: 'Flight Planning' },
  { id: 8,  category: 'OPERATIONS',     severity: 'HIGH',     title: 'Aircraft Overdue for Maintenance',      description: 'Without automated tracking, 100-hour checks and instrument calibrations are missed until an auditor catches it — or a safety event occurs.',     module: 'Fleet Management' },
  { id: 9,  category: 'OPERATIONS',     severity: 'MEDIUM',   title: 'Student No-Shows Handled Manually',     description: "When a student doesn't show, the replacement process is a chain of phone calls — wasting flying hours and disrupting the whole programme.",      module: 'AIRE Roster Engine' },
  { id: 10, category: 'COMPLIANCE',     severity: 'CRITICAL', title: 'One Missed Deadline = Fleet Grounded',  description: 'DGCA deadlines for medicals, calibrations, and revalidations are tracked manually. One overlooked date can ground the entire fleet.',              module: 'DGCA Compliance Calendar' },
  { id: 11, category: 'COMPLIANCE',     severity: 'CRITICAL', title: 'Instructor Duty Hour Violations',       description: 'DGCA CAR Section 7 duty time requirements are complex. Without automation, instructors routinely exceed limits unknowingly.',                   module: 'AIRE Roster Engine' },
  { id: 12, category: 'COMPLIANCE',     severity: 'CRITICAL', title: 'DGCA Audit Unpreparedness',             description: 'When an auditor walks in, the FTO scrambles across spreadsheets. There is no instant, exportable audit trail ready to present.',                module: 'Flight Operations' },
  { id: 13, category: 'COMPLIANCE',     severity: 'HIGH',     title: 'NOTAM Blindness',                       description: "Pilots and ops staff don't have a centralised view of active NOTAMs, TFRs, or AIP supplements relevant to their routes and aerodromes.",        module: 'Go/No-Go Engine' },
  { id: 14, category: 'COMPLIANCE',     severity: 'CRITICAL', title: 'No Formal Safety Management System',   description: 'Hazard reports, near-miss incidents, and CAPA tracking done on paper or not at all — a direct DGCA non-compliance.',                             module: 'Safety SMS' },
  { id: 15, category: 'COMPLIANCE',     severity: 'HIGH',     title: 'Document Expiry Goes Unnoticed',        description: 'Student medicals, instructor licences, AME authorisations, and insurance certificates expire without warning until it\'s too late.',              module: 'DGCA Compliance Calendar' },
  { id: 16, category: 'TRAINING',       severity: 'HIGH',     title: 'Student Progress Is Invisible',         description: 'Instructors and directors have no real-time view of DGCA syllabus completion, which exercises are done, and who is falling behind schedule.',     module: 'Student Management' },
  { id: 17, category: 'TRAINING',       severity: 'HIGH',     title: "Paper Logbooks — Lost, Wrong, Gone",    description: 'Paper logbooks are lost, damaged, or filled incorrectly. Entries are never automatically cross-verified against sortie records.',                module: 'Digital Logbook' },
  { id: 18, category: 'TRAINING',       severity: 'MEDIUM',   title: 'Ground School Disconnected from Flying', description: 'Ground exam results and theory progress are tracked separately from flight hours — making holistic student assessment impossible.',            module: 'Ground Training' },
  { id: 19, category: 'TRAINING',       severity: 'HIGH',     title: 'No AI Study Tools for Students',        description: 'Students rely on textbooks alone — no personalised question bank, no adaptive mocks, no AI doubt resolver, despite high DGCA failure rates.',     module: 'HICA AI Study Engine' },
  { id: 20, category: 'TRAINING',       severity: 'MEDIUM',   title: 'Examination Management Is Manual',      description: 'Scheduling, invigilation, grading, and result communication for internal ground exams done with no system and no audit trail.',                  module: 'Ground Training' },
  { id: 21, category: 'TRAINING',       severity: 'HIGH',     title: 'Syllabus Sequencing Not Enforced',      description: 'Students can be scheduled for advanced exercises before completing prerequisites — creating both safety and compliance exposure.',                module: 'AIRE Roster Engine' },
  { id: 22, category: 'ADMINISTRATION', severity: 'HIGH',     title: 'Fee Defaulters Identified Too Late',    description: 'Outstanding fees are discovered after significant training has been delivered. No early warning system means recovering bad debt.',              module: 'Finance' },
  { id: 23, category: 'ADMINISTRATION', severity: 'MEDIUM',   title: 'HR Records Are Scattered',              description: 'Staff contracts, leave records, medical history, payroll, and recruitment pipelines live across files, folders, and WhatsApp groups.',           module: 'HR Management' },
  { id: 24, category: 'ADMINISTRATION', severity: 'MEDIUM',   title: 'Hostel Management Is Informal',         description: 'Student accommodation managed without any system — no room allocation, no complaint tracking, no occupancy records exist.',                       module: 'Hostel Management' },
  { id: 25, category: 'ADMINISTRATION', severity: 'MEDIUM',   title: 'Inventory and Stores Run on Paper',     description: 'Aircraft spares, stationery, and consumables tracked on paper with no reorder alerts or consumption analytics at any level.',                   module: 'Stores & Inventory' },
  { id: 26, category: 'ADMINISTRATION', severity: 'MEDIUM',   title: 'Communication Runs on WhatsApp',        description: 'Internal announcements, student notifications, and briefings happen via WhatsApp — with no audit trail and no reliable delivery confirmation.',   module: 'Communications' },
  { id: 27, category: 'BUSINESS',       severity: 'CRITICAL', title: 'Fleet Is Chronically Underutilised',    description: 'Without optimal scheduling, aircraft sit idle during peak hours while other slots are double-booked. Revenue hours are lost every single day.',   module: 'AIRE Roster Engine' },
  { id: 28, category: 'BUSINESS',       severity: 'CRITICAL', title: 'Students Drop Out Due to Poor Experience', description: 'Delayed schedules, unclear progress, and admin friction push students to better-run FTOs — taking ₹8–20L in remaining fees with them.',    module: 'Student Management' },
  { id: 29, category: 'BUSINESS',       severity: 'HIGH',     title: 'No Data for Management Decisions',      description: 'The Director cannot tell which aircraft is most profitable, which instructor performs best, or which month had the highest operational cost.',     module: 'Reporting & Analytics' },
  { id: 30, category: 'BUSINESS',       severity: 'HIGH',     title: 'No Infrastructure to Scale',            description: 'Every process is manual, so opening a second location means doubling all the chaos. There is no multi-tenant infrastructure for growth.',         module: 'Multi-Tenant Platform' },
];

// ─── Config ──────────────────────────────────────────────────────────────────

const CATEGORIES: Array<{ key: Category | 'ALL'; label: string; count: number }> = [
  { key: 'ALL',            label: 'All Problems',   count: 30 },
  { key: 'OPERATIONS',     label: 'Operations',     count: 9  },
  { key: 'COMPLIANCE',     label: 'Compliance',     count: 6  },
  { key: 'TRAINING',       label: 'Training',       count: 6  },
  { key: 'ADMINISTRATION', label: 'Administration', count: 5  },
  { key: 'BUSINESS',       label: 'Business',       count: 4  },
];

const SEVERITY_CONFIG: Record<Severity, {
  stripe: string;
  dotColor: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  hoverShadow: string;
  hoverBorder: string;
}> = {
  CRITICAL: {
    stripe:      'bg-red-500',
    dotColor:    'bg-red-500',
    badgeBg:     'bg-red-50',
    badgeText:   'text-red-600',
    badgeBorder: 'border-red-200',
    hoverShadow: 'hover:shadow-[0_8px_40px_rgba(239,68,68,0.15)]',
    hoverBorder: 'hover:border-red-200',
  },
  HIGH: {
    stripe:      'bg-amber-400',
    dotColor:    'bg-amber-500',
    badgeBg:     'bg-amber-50',
    badgeText:   'text-amber-600',
    badgeBorder: 'border-amber-200',
    hoverShadow: 'hover:shadow-[0_8px_40px_rgba(245,158,11,0.15)]',
    hoverBorder: 'hover:border-amber-200',
  },
  MEDIUM: {
    stripe:      'bg-orange-400',
    dotColor:    'bg-orange-400',
    badgeBg:     'bg-orange-50',
    badgeText:   'text-orange-600',
    badgeBorder: 'border-orange-200',
    hoverShadow: 'hover:shadow-[0_8px_40px_rgba(249,115,22,0.12)]',
    hoverBorder: 'hover:border-orange-200',
  },
};

const CATEGORY_CONFIG: Record<Category, {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  tagStyle: string;
}> = {
  OPERATIONS:     { icon: Plane,         iconBg: 'bg-sky-100',     iconColor: 'text-sky-600',     tagStyle: 'text-sky-700 bg-sky-50 border-sky-200' },
  COMPLIANCE:     { icon: Shield,        iconBg: 'bg-purple-100',  iconColor: 'text-purple-600',  tagStyle: 'text-purple-700 bg-purple-50 border-purple-200' },
  TRAINING:       { icon: GraduationCap, iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600', tagStyle: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  ADMINISTRATION: { icon: Building2,     iconBg: 'bg-pink-100',    iconColor: 'text-pink-600',    tagStyle: 'text-pink-700 bg-pink-50 border-pink-200' },
  BUSINESS:       { icon: TrendingUp,    iconBg: 'bg-amber-100',   iconColor: 'text-amber-600',   tagStyle: 'text-amber-700 bg-amber-50 border-amber-200' },
};

// ─── Card ─────────────────────────────────────────────────────────────────────

function ProblemCard({ p, index }: { p: Problem; index: number }) {
  const s = SEVERITY_CONFIG[p.severity];
  const c = CATEGORY_CONFIG[p.category];
  const CatIcon = c.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.5) }}
      whileHover={{ y: -5 }}
      className={`group relative flex flex-col bg-white border border-zinc-200 rounded-2xl overflow-hidden transition-all duration-300 shadow-[0_2px_16px_rgba(0,0,0,0.06)] ${s.hoverShadow} ${s.hoverBorder}`}
    >
      {/* Left severity stripe */}
      <div className={`absolute top-0 left-0 w-[4px] h-full ${s.stripe}`} />

      <div className="flex flex-col flex-1 pl-6 pr-5 pt-5 pb-5">

        {/* Top row: incident ID + flip badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${s.dotColor} animate-pulse shrink-0`} />
            <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">
              INCIDENT #{String(p.id).padStart(2, '0')}
            </span>
          </div>

          {/* Status badge — flips on hover */}
          <div className="relative h-[22px] overflow-hidden">
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-red-200 bg-red-50 group-hover:opacity-0 group-hover:-translate-y-6 transition-all duration-300">
              <AlertTriangle className="w-2.5 h-2.5 text-red-500" />
              <span className="font-mono text-[9px] font-bold text-red-500 tracking-widest">OPEN</span>
            </span>
            <span className="absolute inset-0 flex items-center gap-1 px-2.5 py-1 rounded-full border border-emerald-200 bg-emerald-50 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
              <span className="font-mono text-[9px] font-bold text-emerald-600 tracking-widest whitespace-nowrap">FIXED BY NW</span>
            </span>
          </div>
        </div>

        {/* Category + Severity row */}
        <div className="flex items-center justify-between mb-4">
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${c.iconBg}`}>
            <CatIcon className={`w-3.5 h-3.5 ${c.iconColor}`} />
            <span className={`font-sans text-[10px] font-bold uppercase tracking-wide ${c.iconColor}`}>
              {p.category}
            </span>
          </div>
          <span className={`px-2.5 py-1 rounded-lg border font-sans text-[10px] font-bold tracking-wide uppercase ${s.badgeText} ${s.badgeBg} ${s.badgeBorder}`}>
            {p.severity}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-[16px] text-zinc-900 leading-snug mb-3">
          {p.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-[13px] text-zinc-500 leading-relaxed flex-1 mb-5">
          {p.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 gap-2 flex-wrap">
          <span className={`font-sans text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full border ${c.tagStyle}`}>
            {p.category}
          </span>
          <span className="font-sans text-[12px] font-medium text-sky-600 flex items-center gap-1.5 group-hover:text-sky-700 transition-colors">
            <span className="text-sky-400">→</span>
            {p.module}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function IncidentBoard() {
  const [active, setActive] = useState<Category | 'ALL'>('ALL');
  const filtered = active === 'ALL' ? PROBLEMS : PROBLEMS.filter((p) => p.category === active);

  return (
    <section id="incident-log" className="relative py-20 md:py-[120px] bg-gradient-to-b from-white via-[#F8FBFF] to-white overflow-hidden">

      <div className="absolute top-0 right-0 w-[700px] h-[500px] bg-blue-100/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-sky-100/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-[1280px] mx-auto px-6">

        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-red-400" />
            <span className="font-mono text-[11px] font-bold text-red-500 uppercase tracking-[0.3em]">
              The Damage Report
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-red-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-bold text-[30px] md:text-[52px] text-zinc-900 leading-tight mb-5"
          >
            30 Problems Every Indian FTO{' '}
            <span className="text-gradient">Has Right Now.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-[16px] text-zinc-500 max-w-[580px] leading-relaxed"
          >
            Not hypothetical. These are the documented operational failures at every Flight Training Organisation running without a modern management system.
          </motion.p>

          {/* Live severity counter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-7 flex items-center gap-6 flex-wrap justify-center"
          >
            {[
              { label: 'CRITICAL', count: 8, dot: 'bg-red-500' },
              { label: 'HIGH',     count: 13, dot: 'bg-amber-500' },
              { label: 'MEDIUM',   count: 9,  dot: 'bg-orange-400' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${s.dot} animate-pulse`} />
                <span className="font-mono text-[11px] font-bold text-zinc-400 tracking-widest">
                  {s.count} {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full border font-sans text-[13px] font-semibold transition-all duration-200 ${
                active === c.key
                  ? 'bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-200'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:border-sky-300 hover:text-sky-600 shadow-sm'
              }`}
            >
              {c.label}
              <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                active === c.key ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500'
              }`}>
                {c.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Problem grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((p, i) => (
              <ProblemCard key={p.id} p={p} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="font-sans text-[13px] text-zinc-400">
            Showing <span className="font-semibold text-zinc-600">{filtered.length}</span> of 30 documented failures
            {active !== 'ALL' && <> · <span className="font-semibold text-sky-600">{active}</span></>}
          </p>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />
    </section>
  );
}

export { PROBLEMS };
export type { Problem, Category };
