import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Activity } from 'lucide-react';

interface Module {
  name: string;
  problemCount: number;
  capability: string;
  problemIds: number[];
  problemTitles: string[];
}

const MODULES: Module[] = [
  { name: 'AIRE Roster Engine', problemCount: 5, capability: 'Generates the optimal daily flying programme in <60 seconds. Enforces duty limits, weather, aircraft status, and syllabus sequencing automatically.', problemIds: [2, 9, 11, 21, 27], problemTitles: ['Morning scheduling takes 2–3 hours', 'Student no-shows handled manually', 'Instructor duty hour violations', 'Syllabus sequencing not enforced', 'Fleet underutilisation'] },
  { name: 'Flight Operations', problemCount: 3, capability: 'Single source of truth for every sortie — real-time status, full audit trail, and instant DGCA-ready export.', problemIds: [1, 4, 12], problemTitles: ['No single source of truth', 'No real-time aircraft tracking', 'DGCA audit unpreparedness'] },
  { name: 'Go/No-Go Engine', problemCount: 2, capability: 'Pulls live METAR, NOTAMs, aircraft serviceability, and crew/student validity into a single pre-sortie decision tool.', problemIds: [5, 13], problemTitles: ['Manual Go/No-Go decisions', 'NOTAM blindness'] },
  { name: 'Fleet Management', problemCount: 2, capability: "Tracks every aircraft's maintenance schedule, 100-hour checks, AOG status, and pre-flight releases with auto-alerts.", problemIds: [8, 15], problemTitles: ['Aircraft overdue for maintenance', 'Document expiry not proactively managed'] },
  { name: 'Fuel Management', problemCount: 1, capability: 'End-to-end fuel logging — uplift, consumption, top-up — with discrepancy detection and per-aircraft cost analytics.', problemIds: [6], problemTitles: ['Fuel tracking discrepancies'] },
  { name: 'Flight Planning', problemCount: 1, capability: 'Integrated route planner with weight & balance, NOTAM fetch, fuel calculation, and weather overlay.', problemIds: [7], problemTitles: ['No integrated flight planning'] },
  { name: 'DGCA Compliance Calendar', problemCount: 2, capability: 'Automated deadline tracking for every licence, medical, calibration, and regulatory submission — with advance alerts.', problemIds: [10, 15], problemTitles: ['One missed deadline = fleet grounding', 'Document expiry not proactively managed'] },
  { name: 'Safety SMS', problemCount: 1, capability: 'Full digital hazard reporting, CAPA tracking, risk matrix, and audit trail meeting DGCA safety management requirements.', problemIds: [14], problemTitles: ['No formal Safety Management System'] },
  { name: 'Student Management', problemCount: 3, capability: 'Full student lifecycle from admission to CPL — progress tracking, document status, sortie history, all in one place.', problemIds: [16, 28, 3], problemTitles: ['Student progress is invisible', 'Student dropout due to poor experience', 'Directors fly blind'] },
  { name: 'Digital Logbook', problemCount: 1, capability: 'Auto-populated from sorties, cross-verified against flight ops records, exportable in DGCA format.', problemIds: [17], problemTitles: ["Digital logbooks don't exist"] },
  { name: 'Ground Training', problemCount: 2, capability: 'Class scheduling, attendance, mock exams, and AI gap analysis — fully integrated with the flight training record.', problemIds: [18, 20], problemTitles: ['Ground school disconnected from flying', 'Examination management is manual'] },
  { name: 'HICA AI Study Engine', problemCount: 1, capability: 'AI-generated notes, flashcards, MCQs, mock exams, doubt resolver, and POH trainer for every student.', problemIds: [19], problemTitles: ['No AI study tools for students'] },
  { name: 'Finance', problemCount: 1, capability: 'Fee tracking, invoice generation, defaulter flagging, receivables dashboard, and expense tracking.', problemIds: [22], problemTitles: ['Fee defaulters identified too late'] },
  { name: 'HR Management', problemCount: 1, capability: 'Staff records, leave management, document expiry, payroll overview, and recruitment pipeline.', problemIds: [23], problemTitles: ['HR records scattered'] },
  { name: 'Hostel Management', problemCount: 1, capability: 'Room allocation, occupancy tracking, complaint management, and student accommodation records.', problemIds: [24], problemTitles: ['Hostel and accommodation unmanaged'] },
  { name: 'Stores & Inventory', problemCount: 1, capability: 'Stock levels, purchase requests, consumption tracking, and automated reorder alerts.', problemIds: [25], problemTitles: ['Inventory and stores manual'] },
  { name: 'Communications', problemCount: 1, capability: 'In-app announcements, SMS/email notifications, and student/instructor alerts — all logged with a full delivery trail.', problemIds: [26], problemTitles: ['Communication is unstructured'] },
  { name: 'Reporting & Analytics', problemCount: 2, capability: 'Executive KPI dashboards, per-role intelligence, and export-ready reports for management and auditors.', problemIds: [29, 3], problemTitles: ['No data for management decisions', 'Directors fly blind'] },
  { name: 'Multi-Tenant Platform', problemCount: 1, capability: 'Onboard a new branch in days. Each location gets its own isolated data environment on shared infrastructure.', problemIds: [30], problemTitles: ['Inability to scale or add branches'] },
];

function ModuleRow({ m, index }: { m: Module; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.4) }}
      className="border-b border-zinc-100 last:border-0"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 py-4 px-3 text-left hover:bg-zinc-50 transition-colors rounded-xl group"
      >
        {/* Status dot */}
        <div className="shrink-0 flex items-center justify-center w-8">
          <div className="relative">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30" />
          </div>
        </div>

        {/* Module name */}
        <div className="flex-1 min-w-0">
          <span className="font-sans font-semibold text-[14px] text-zinc-800 group-hover:text-sky-600 transition-colors">
            {m.name}
          </span>
        </div>

        {/* ACTIVE badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 shrink-0">
          <Activity className="w-3 h-3 text-emerald-600" />
          <span className="font-sans text-[10px] font-bold text-emerald-700 tracking-wide">ACTIVE</span>
        </div>

        {/* Problem count */}
        <div className="shrink-0 hidden md:block w-36">
          <span className="font-sans text-[12px] text-zinc-400">
            {m.problemCount} incident{m.problemCount !== 1 ? 's' : ''} resolved
          </span>
        </div>

        {/* Capability preview — shown collapsed, wraps fully */}
        <div className="flex-[2] min-w-0 hidden lg:block">
          <p className="font-sans text-[12px] text-zinc-400 leading-relaxed">{m.capability}</p>
        </div>

        <ChevronDown className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="pb-5 px-11">
              <p className="font-sans text-[13px] text-zinc-500 leading-relaxed mb-4">{m.capability}</p>
              <div className="flex flex-wrap gap-2">
                {m.problemTitles.map((title, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200">
                    <span className="font-sans text-[10px] text-red-500 font-bold">#{String(m.problemIds[i]).padStart(2, '0')}</span>
                    <span className="font-sans text-[12px] text-zinc-600">{title}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function SystemsStatusBoard() {
  return (
    <section className="relative py-20 md:py-[100px] bg-white overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-emerald-100/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-[1280px] mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
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
            className="font-heading font-bold text-[28px] md:text-[48px] text-zinc-900 leading-tight mb-4"
          >
            19 Modules. Every Gap Closed.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-[16px] text-zinc-500 max-w-[560px] leading-relaxed"
          >
            Each Neural Wings module is purpose-built to address specific FTO failures. Click any row to see exactly which incidents it resolves.
          </motion.p>
        </div>

        {/* Table panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-zinc-200 overflow-hidden shadow-[0_4px_30px_rgba(59,130,246,0.06)]"
        >
          {/* Panel header bar */}
          <div className="flex items-center gap-2 px-5 py-3 bg-zinc-50 border-b border-zinc-200">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="ml-4 font-sans text-[12px] text-zinc-400">
              Neural Wings — All Modules Operational
            </span>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-sans text-[11px] text-emerald-600 font-semibold">LIVE</span>
            </div>
          </div>

          {/* Column headers */}
          <div className="hidden md:flex items-center gap-4 px-6 py-3 bg-zinc-50/60 border-b border-zinc-100">
            <div className="w-8 shrink-0" />
            <div className="flex-1 font-sans text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.12em]">Module</div>
            <div className="w-24 hidden sm:block font-sans text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.12em]">Status</div>
            <div className="w-36 hidden md:block font-sans text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.12em]">Coverage</div>
            <div className="flex-[2] hidden lg:block font-sans text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.12em]">Capability</div>
            <div className="w-4" />
          </div>

          {/* Module rows */}
          <div className="bg-white divide-y-0 px-2">
            {MODULES.map((m, i) => <ModuleRow key={m.name} m={m} index={i} />)}
          </div>
        </motion.div>

        <p className="mt-6 text-center font-sans text-[12px] text-zinc-400">
          19 modules · 30 incidents resolved · n8n automation running 24/7
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />
    </section>
  );
}
