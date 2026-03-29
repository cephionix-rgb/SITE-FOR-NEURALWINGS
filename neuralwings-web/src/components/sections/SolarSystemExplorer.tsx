import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Plane, Users, Shield, BookOpen, Settings, Wrench, Droplet, CheckCircle, Database, Calendar, Lock, Globe, FileText, Home, IndianRupee, MessageSquare, Zap, Target, Info } from 'lucide-react';
import { useState } from 'react';

const MODULE_INFO: Record<string, { subtitle: string; description: string }> = {
  'Flight Ops': {
    subtitle: 'MODULE 01 — Operations Core',
    description: 'Manages the complete lifecycle of every sortie from initial authorisation through live execution to post-flight debrief and record closure. Provides ADS-B live position tracking, overdue alert timers with configurable thresholds, squawk code logging, and real-time cross-country monitoring. Sortie data feeds directly into the digital logbook, eliminating manual transcription and ensuring tamper-proof flight records.'
  },
  'Go/No-Go': {
    subtitle: 'MODULE 02 — Dispatch Authority',
    description: 'A rules-based AI engine that evaluates 15+ parameters simultaneously before issuing dispatch authority — aircraft airworthiness status, student medical and SPL validity, instructor duty time compliance, current weather VFR minima, fuel sufficiency, active NOTAMs, and Weight & Balance within limits. Every authorisation is logged with a digital signature that constitutes the legal dispatch record, fully auditable by DGCA inspectors.'
  },
  'Meteorology': {
    subtitle: 'MODULE 03 — Weather Intelligence',
    description: 'Integrates live METAR, TAF, SIGMET, and PIREP feeds directly into the operations dashboard. Provides automated VFR/IFR condition assessments for the local training area, visibility and ceiling trend graphs, and one-click weather briefing packages for cross-country students. Weather holds and cancellations are recorded automatically against the flying programme with timestamps.'
  },
  'Reporting': {
    subtitle: 'MODULE 04 — Analytics & MIS',
    description: 'Generates DGCA-mandated MIS reports, monthly flying hour statements, and utilisation summaries in standard formats at a single click. Provides fleet-wide utilisation heatmaps, student progress analytics, instructor productivity metrics, and financial performance dashboards. All reports are exportable as PDF or Excel and can be scheduled for automatic delivery to regulatory or management recipients.'
  },
  'Fleet Mgmt': {
    subtitle: 'MODULE 05 — Airworthiness & Maintenance',
    description: 'Maintains the complete airworthiness record of every aircraft including component lifing for engines, propellers, tyres, and instruments. Tracks scheduled maintenance at 50-hour, 100-hour, and annual intervals with automated alerts before due dates. Snag sheets are raised digitally, assigned to AMEs, tracked to closure, and archived — creating a full maintenance history accessible during DGCA audits.'
  },
  'Student Mgmt': {
    subtitle: 'MODULE 06 — Cadet Records',
    description: 'Maintains the complete digital dossier of every student cadet — admission documents, medical certificates, Student Pilot Licence validity, training phase progress, stage test results, and flying hours. Automated alerts flag expiring medicals or SPL renewals before they ground a cadet. DGCA licensing documentation is generated and tracked within the module, reducing compliance overhead to near zero.'
  },
  'Instructors': {
    subtitle: 'MODULE 07 — Instructor Management',
    description: 'Tracks every Flight Instructor\'s licensing validity (FIR, CFI endorsements), medical currency, and accumulated flying hours against DGCA duty time limits. Automated duty time calculations prevent instructors from being rostered beyond regulatory limits. Competency check schedules, standardisation flight records, and instructor authorisation levels are managed centrally, ensuring only current and qualified staff are assigned.'
  },
  'Ground Training': {
    subtitle: 'MODULE 08 — Academic & Simulator',
    description: 'Maps the complete DGCA ground training syllabus across all subject areas with tracking of classroom attendance, virtual classroom sessions, and CBT module completions. Electronic exam scheduling, scoring, and remedial tracking replace paper-based processes. Simulator bookings for FNPT II and FTD devices are managed within the same calendar as flying sorties, preventing double-booking and maximising device utilisation.'
  },
  'Digital Logbook': {
    subtitle: 'MODULE 09 — Electronic Log',
    description: 'Automatically populates flight log entries from verified sortie data — pilot name, aircraft registration, departure and arrival times, exercise completed, and dual or solo classification. Entries are tamper-proof once signed by the authorising instructor. Cumulative hour totals, day/night splits, and cross-country distance logs are maintained in DGCA-compliant format and exportable as a signed PDF at any time.'
  },
  'SMS': {
    subtitle: 'MODULE 10 — Safety Management',
    description: 'Implements a full ICAO Annex 19-compliant Safety Management System with digital hazard reporting, risk assessment matrices, and corrective action tracking. Safety events are classified by severity, assigned to responsible persons, and tracked to closure. Risk heatmaps visualise recurring hazard patterns across the operation, enabling proactive safety interventions before incidents escalate.'
  },
  'DGCA Calendar': {
    subtitle: 'MODULE 11 — Regulatory Compliance',
    description: 'Maintains a dynamic compliance calendar covering all DGCA-mandated renewals — pilot medicals, SPL and PPL validity, aircraft Certificate of Airworthiness, radio telephony licences, and instructor authorisations. Automated multi-stage alerts (60 days, 30 days, 7 days) are sent to relevant personnel. Audit preparation checklists and document readiness scores help quality teams stay permanently audit-ready.'
  },
  'Fuel Mgmt': {
    subtitle: 'MODULE 12 — Fuel Operations',
    description: 'Manages end-to-end aviation fuel operations including AVGAS 100LL and Jet A-1 stock levels, bowser uplift records, and per-sortie burn tracking. Automated reorder alerts trigger when stock falls below configurable minimums. Fuel consumption is reconciled against flight hours to identify abnormal burn rates that may indicate maintenance issues, supporting both operational efficiency and airworthiness oversight.'
  },
  'Flight Planning': {
    subtitle: 'MODULE 13 — Navigation & ATC',
    description: 'Generates standard navigation logs for cross-country and navigation exercises with track, distance, heading, and ETA calculations. Integrates active NOTAMs and airspace restrictions into route assessments. Weight and balance calculations, takeoff and landing performance data, and ATC clearance records are filed within the module, creating a complete pre-flight package that is archived against each sortie record.'
  },
  'Legal & Compliance': {
    subtitle: 'MODULE 14 — Regulatory Affairs',
    description: 'Provides a centralised, version-controlled repository of all regulatory documents — Air Operator Certificate conditions, Flying Training Organisation approval letters, operations manuals, and DGCA correspondence. Tracks document revision cycles, ensures staff have acknowledged policy updates, and maintains tamper-proof audit trails of all compliance activities. Legal hold and disclosure management features support regulatory inspection responses.'
  },
  'User & Roles': {
    subtitle: 'MODULE 15 — Access Control',
    description: 'Implements granular role-based access control mapped to the complete FTO organisational hierarchy — Director, CFI, Flight Instructor, Student Cadet, Ops Officer, AME, Finance Manager, HR, Legal, and more. Permissions are configurable at module and action level. Comprehensive audit logs record every login, data access, and system action by user and timestamp, meeting information security and data governance requirements.'
  },
  'Hostel Mgmt': {
    subtitle: 'MODULE 16 — Cadet Accommodation',
    description: 'Manages cadet housing across single and multi-occupancy rooms with live occupancy dashboards and automated allocation workflows. Mess fee billing is linked to each cadet\'s financial account for seamless monthly reconciliation. Maintenance requests for room facilities are raised and tracked digitally. Hostel records integrate with HR and student management to support the complete cadet welfare function.'
  },
  'Finance & Accounts': {
    subtitle: 'MODULE 17 — Revenue & Billing',
    description: 'Automates the end-to-end revenue cycle — tuition invoicing, flying hour billing calculated directly from verified sortie records, fee collection tracking, and outstanding dues management. Hostel and ground training fees are consolidated into a single cadet account statement. Financial dashboards provide real-time revenue, collection rate, and ageing analysis, while audit-ready ledgers support regulatory and statutory reporting requirements.'
  },
  'HR Management': {
    subtitle: 'MODULE 18 — People Operations',
    description: 'Manages the complete HR lifecycle for all staff categories — flight instructors, AMEs, operations officers, and ground crew. Features include staff onboarding, document management, leave planning with duty-impact analysis, payroll processing, and performance review tracking. Integration with the duty roster and flight programme prevents operational disruptions caused by leave approvals during critical flying periods.'
  },
  'Communications': {
    subtitle: 'MODULE 19 — Internal Messaging',
    description: 'Provides a secure, role-aware internal communications platform with direct messaging, broadcast announcements, and automated operational alerts. Critical notifications — aircraft AOG alerts, weather holds, student medical expiries, and maintenance due reminders — are delivered within the platform, by email, and via SMS, ensuring no safety-critical information is missed regardless of the recipient\'s location or device.'
  }
};

const rings = [
  // Ring 1 (Inner) - Operations & Core (5 modules)
  {
    radius: 130, duration: 45, items: [
      { name: 'Flight Ops', icon: Plane, color: 'text-sky-500' },
      { name: 'Go/No-Go', icon: CheckCircle, color: 'text-green-500' },
      { name: 'Meteorology', icon: Zap, color: 'text-sky-400' },
      { name: 'Reporting', icon: Database, color: 'text-blue-500' },
      { name: 'Fleet Mgmt', icon: Wrench, color: 'text-amber-500' },
    ]
  },
  // Ring 2 (Middle) - Training & Safety (7 modules)
  {
    radius: 230, duration: 60, items: [
      { name: 'Student Mgmt', icon: Users, color: 'text-blue-400' },
      { name: 'Instructors', icon: Target, color: 'text-red-500' },
      { name: 'Ground Training', icon: BookOpen, color: 'text-yellow-500' },
      { name: 'Digital Logbook', icon: FileText, color: 'text-sky-500' },
      { name: 'SMS', icon: Shield, color: 'text-red-500' },
      { name: 'DGCA Calendar', icon: Calendar, color: 'text-amber-500' },
      { name: 'Fuel Mgmt', icon: Droplet, color: 'text-teal-500' },
    ]
  },
  // Ring 3 (Outer) - Admin & Support (7 modules)
  {
    radius: 330, duration: 75, items: [
      { name: 'Flight Planning', icon: Globe, color: 'text-blue-600' },
      { name: 'Legal & Compliance', icon: Lock, color: 'text-green-600' },
      { name: 'User & Roles', icon: Settings, color: 'text-zinc-500' },
      { name: 'Hostel Mgmt', icon: Home, color: 'text-orange-500' },
      { name: 'Finance & Accounts', icon: IndianRupee, color: 'text-yellow-600' },
      { name: 'HR Management', icon: Users, color: 'text-sky-400' },
      { name: 'Communications', icon: MessageSquare, color: 'text-sky-600' },
    ]
  }
];

// Flat list of all modules for the mobile grid
const allModules = rings.flatMap(r => r.items);

const allModules = rings.flatMap(r => r.items);

export function SolarSystemExplorer() {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const activeModule = hoveredModule ?? selectedModule;

  return (
    <section id="modules" className="relative py-[80px] md:py-[120px] bg-gradient-to-b from-[#F0F7FF] to-white overflow-hidden border-y border-blue-100">
      {/* Depth Orbs */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.04)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 -right-20 w-[800px] h-[800px] bg-sky-100/30 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 mb-16">
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans font-semibold text-[20px] text-accent-gold uppercase tracking-[0.25em] mb-4 block drop-shadow-sm"
          >
            THE NEURAL WINGS UNIVERSE
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-[36px] md:text-[52px] text-zinc-900 leading-tight mb-4 drop-shadow-sm"
          >
            19 Modules. One Core.
          </motion.h2>
          <p className="font-sans text-[15px] md:text-[16px] text-zinc-600 max-w-2xl mx-auto font-medium px-4 md:px-0">
            Everything your FTO needs, operating in perfect synchrony connected by the central autonomous intelligence engine.{' '}
            <span className="hidden md:inline">Hover over any module to explore its capabilities.</span>
            <span className="md:hidden">Tap any module to explore its capabilities.</span>
          </p>
        </div>
      </div>

      {/* ── Mobile grid (visible below md) ── */}
      <div className="md:hidden relative z-10 max-w-[1280px] mx-auto px-4 pb-4">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border-2 border-blue-300 bg-white shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <Brain className="w-6 h-6 text-blue-500" />
            <div>
              <p className="font-heading font-extrabold text-sm text-zinc-900 tracking-widest">AIRE</p>
              <p className="text-[10px] text-zinc-500 font-medium">Central AI Engine</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {allModules.map((mod) => {
            const isActive = selectedModule === mod.name;
            return (
              <button
                key={mod.name}
                onClick={() => setSelectedModule(prev => prev === mod.name ? null : mod.name)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all duration-200 ${isActive ? 'border-blue-400 bg-blue-50 shadow-sm' : 'border-zinc-200 bg-white'}`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center border ${isActive ? 'border-blue-300 bg-blue-100' : 'border-zinc-200 bg-zinc-50'}`}>
                  <mod.icon className={`w-4 h-4 ${mod.color}`} />
                </div>
                <span className={`text-[10px] font-semibold leading-tight ${isActive ? 'text-blue-700' : 'text-zinc-600'}`}>{mod.name}</span>
              </button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          {selectedModule && MODULE_INFO[selectedModule] && (
            <motion.div
              key={selectedModule}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-blue-200 rounded-2xl p-5 shadow-md"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-gold mb-1">{MODULE_INFO[selectedModule].subtitle}</p>
              <h3 className="font-heading font-bold text-lg text-zinc-900 mb-3">{selectedModule}</h3>
              <div className="h-px w-full bg-gradient-to-r from-blue-300 to-transparent mb-3" />
              <p className="text-zinc-600 text-sm leading-relaxed font-medium">{MODULE_INFO[selectedModule].description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Desktop solar system (hidden below md) ── */}
      <div className="hidden md:flex relative max-w-[1280px] mx-auto w-full h-[760px] items-center justify-between">
        <div className="relative flex-1 h-full flex items-center justify-center">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-yellow-300/25 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          {/* Sun / Core: AIRE */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white border-2 border-yellow-500 flex flex-col items-center justify-center shadow-[0_0_60px_rgba(202,138,4,0.4),0_0_120px_rgba(59,130,246,0.15)] cursor-pointer group"
            >
              <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 mb-1 group-hover:scale-110 transition-transform" />
              <span className="font-heading font-extrabold text-xs sm:text-sm text-zinc-900 tracking-widest drop-shadow-md">AIRE</span>
            </motion.div>
          </div>

          {/* Rings and Planets */}
          {rings.map((ring, ringIndex) => (
            <div
              key={ringIndex}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-zinc-900 pointer-events-none"
              style={{
                width: ring.radius * 2,
                height: ring.radius * 2,
                animation: `spin ${ring.duration}s linear infinite`
              }}
            >
              {ring.items.map((mod, index) => {
                const angle = (index / ring.items.length) * 2 * Math.PI;
                const x = Math.cos(angle) * ring.radius;
                const y = Math.sin(angle) * ring.radius;

                const isHovered = hoveredModule === mod.name;
                const isDimmed = hoveredModule && !isHovered;

                return (
                  <div
                    key={index}
                    className="absolute left-1/2 top-1/2 pointer-events-auto"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                    }}
                  >
                    <div
                      style={{ animation: `reverse-spin ${ring.duration}s linear infinite` }}
                      className={`flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${isDimmed ? 'opacity-20 scale-90' : 'opacity-100 scale-100'}`}
                      onMouseEnter={() => setHoveredModule(mod.name)}
                      onMouseLeave={() => setHoveredModule(null)}
                    >
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white backdrop-blur-md border border-blue-300 flex items-center justify-center shadow-md transition-transform ${isHovered ? 'scale-125 border-blue-500 bg-white shadow-[0_0_30px_rgba(59,130,246,0.4)] z-50' : 'hover:scale-110'}`}>
                        <mod.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${mod.color}`} />
                      </div>

                      <div className={`mt-2 font-sans text-center transition-all absolute top-10 sm:top-12 whitespace-nowrap bg-white px-2 py-0.5 rounded backdrop-blur-sm border border-blue-200 shadow-sm z-50 ${isHovered ? 'opacity-100 translate-y-0 text-zinc-900 font-bold text-xs' : 'opacity-0 translate-y-2 text-zinc-500 text-[10px]'}`}>
                        {mod.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Information Panel (Right Side) */}
        <div className="hidden lg:flex w-[380px] 2xl:w-[440px] h-full items-center justify-center p-6 z-50">
          <AnimatePresence mode="wait">
            {hoveredModule ? (
              <motion.div
                key={hoveredModule}

                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="bg-white/95 backdrop-blur-2xl border border-blue-300/60 shadow-xl shadow-blue-900/10 rounded-2xl p-7 w-full relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/40 rounded-full blur-2xl -z-10 translate-x-10 -translate-y-10" />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-gold mb-2">
                  {MODULE_INFO[hoveredModule]?.subtitle}
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <Info className="w-4 h-4" />
                  </div>
                  <h3 className="text-zinc-900 font-heading font-bold text-xl leading-tight">{hoveredModule}</h3>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-blue-300 to-transparent mb-4" />
                <p className="text-zinc-600 font-medium text-sm leading-relaxed">
                  {MODULE_INFO[hoveredModule]?.description}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white/60 backdrop-blur-md border border-blue-300/50 border-dashed rounded-2xl p-6 w-full h-[180px] flex flex-col items-center justify-center text-center shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-3">
                  <Target className="w-5 h-5" />
                </div>
                <p className="text-zinc-500 font-medium text-sm">Hover over any module to view its specifications.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>{/* end desktop solar system */}

      <style>{`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </section>
  );
}
