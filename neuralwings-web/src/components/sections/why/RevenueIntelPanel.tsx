import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Shield, Users, Building2, CheckCircle2 } from 'lucide-react';

type TabKey = 'DIRECT' | 'PROTECTION' | 'RETENTION' | 'SCALE';

interface RevenueItem {
  module: string;
  mechanism: string;
  impact: string;
  detail: string;
}

interface Tab {
  key: TabKey;
  label: string;
  subtitle: string;
  Icon: React.ElementType;
  activeStyle: string;   // active button style
  headerColor: string;   // panel heading color
  iconBg: string;
  iconColor: string;
  borderAccent: string;
  items: RevenueItem[];
}

const TABS: Tab[] = [
  {
    key: 'DIRECT',
    label: 'Direct Uplift',
    subtitle: 'New revenue generated',
    Icon: TrendingUp,
    activeStyle: 'bg-emerald-500 text-white border-emerald-500 shadow-emerald-200',
    headerColor: 'text-emerald-600',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    borderAccent: 'border-emerald-200',
    items: [
      { module: 'AIRE Roster Engine',                  mechanism: 'Fills scheduling gaps a manual CFI misses — adds flying hours across the fleet every day',         impact: '+₹2–5L/month',        detail: 'Even one extra sortie per aircraft per day at ₹4,000–8,000/hour adds lakhs per month across a 6-aircraft fleet.' },
      { module: 'Flight Operations',                   mechanism: 'Ensures every billable sortie hour is captured in the system — no uncounted flights',               impact: '100% capture rate',   detail: 'Real-time sortie tracking eliminates uncounted flying — every completed hour is billed and recorded.' },
      { module: 'Go/No-Go Engine',                     mechanism: 'Reduces false groundings from incomplete pre-flight assessments — more hours in the air billed',    impact: 'Fewer cancellations', detail: 'Informed decisions reduce unnecessary cancellations, translating directly to more billable hours per day.' },
      { module: 'Student Management + Digital Logbook', mechanism: 'Faster progress tracking means CPL completion on schedule — freeing slots for new admissions',   impact: 'Higher throughput',   detail: 'Increased student throughput per slot means more total fee revenue per batch per year.' },
    ],
  },
  {
    key: 'PROTECTION',
    label: 'Revenue Protection',
    subtitle: 'Preventing operational losses',
    Icon: Shield,
    activeStyle: 'bg-sky-500 text-white border-sky-500 shadow-sky-200',
    headerColor: 'text-sky-600',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
    borderAccent: 'border-sky-200',
    items: [
      { module: 'DGCA Compliance Calendar', mechanism: 'Prevents fleet grounding by proactively managing every regulatory deadline before it breaches', impact: '₹5–20L/week saved',    detail: 'Avoiding a single fleet grounding event pays for the entire platform subscription many times over.' },
      { module: 'Fleet Management',         mechanism: 'Prevents unplanned AOG events through proactive maintenance scheduling and auto-alerts',         impact: '₹15–50K/day/aircraft', detail: 'One unplanned Aircraft on Ground event costs ₹15,000–50,000 in lost sorties per aircraft per day.' },
      { module: 'Safety SMS',               mechanism: 'Proper safety documentation reduces insurance premiums and protects against regulatory penalties', impact: 'Up to ₹10L+ saved',    detail: 'DGCA penalties for SMS non-compliance alone can exceed ₹10L. Reduced insurance costs accumulate over time.' },
      { module: 'Finance — Defaulter Flag', mechanism: 'Early identification of fee defaulters lets the FTO pause services before further exposure',      impact: 'Recover bad debt early', detail: 'Catching defaults early prevents more training being delivered on unpaid accounts every year.' },
    ],
  },
  {
    key: 'RETENTION',
    label: 'Student Retention',
    subtitle: 'Each student = ₹8–20L in total fees',
    Icon: Users,
    activeStyle: 'bg-purple-500 text-white border-purple-500 shadow-purple-200',
    headerColor: 'text-purple-600',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    borderAccent: 'border-purple-200',
    items: [
      { module: 'HICA AI Study Engine',  mechanism: 'Higher DGCA written exam pass rates improve FTO reputation and attract more admissions',           impact: 'Per student: ₹8–20L',         detail: 'Students who feel academically supported stay — each retained student is ₹8–20L in fee revenue.' },
      { module: 'Student Dashboard',     mechanism: 'Students who see their progress clearly are more engaged and less likely to transfer out',         impact: '₹4–10L per retained student', detail: 'Visible progress and a structured experience directly reduce mid-training dropouts.' },
      { module: 'Communications Module', mechanism: 'Timely automated reminders for sorties, exams, and medical renewals reduce no-shows',            impact: 'Protects scheduled revenue',   detail: 'Automated reminders reduce no-shows, keeping the daily programme on schedule and revenue protected.' },
    ],
  },
  {
    key: 'SCALE',
    label: 'Scalability',
    subtitle: 'Revenue multiplication without proportional overhead',
    Icon: Building2,
    activeStyle: 'bg-amber-500 text-white border-amber-500 shadow-amber-200',
    headerColor: 'text-amber-600',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    borderAccent: 'border-amber-200',
    items: [
      { module: 'Multi-Tenant Architecture', mechanism: 'Onboard a new branch in days — revenue multiplication without proportional admin cost',               impact: '2× revenue, same stack',      detail: 'Open a second FTO without doubling the chaos — same platform, isolated data, new revenue stream.' },
      { module: 'Reporting & Analytics',     mechanism: 'Directors get the data to make profitable decisions — aircraft, instructors, cohorts, costs',         impact: 'Evidence-based expansion',     detail: 'Per-aircraft profitability, instructor throughput, and cohort pass rates enable precise expansion decisions.' },
      { module: 'HR + Hostel Modules',       mechanism: 'Reducing admin overhead frees senior staff to focus on sorties and admissions instead of paperwork', impact: 'Operational leverage',         detail: 'Staff time freed from manual admin directly translates to more productive flying hours and intake capacity.' },
    ],
  },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        const step = value / (1200 / 16);
        let start = 0;
        const timer = setInterval(() => {
          start += step;
          if (start >= value) { setDisplay(value); clearInterval(timer); }
          else setDisplay(Math.floor(start));
        }, 16);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

function RevenueCard({ item, index, tab }: { item: RevenueItem; index: number; tab: Tab }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      onClick={() => setExpanded((v) => !v)}
      whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(59,130,246,0.10)' }}
      className="group relative flex flex-col bg-white rounded-2xl border border-zinc-200 shadow-[0_4px_20px_rgba(59,130,246,0.06)] cursor-pointer transition-all duration-300 overflow-hidden"
    >
      {/* Top accent bar */}
      <div className={`absolute top-0 left-0 w-full h-[3px] ${tab.iconBg.replace('bg-', 'bg-gradient-to-r from-').replace('-100', '-400')} to-transparent`}
        style={{ background: `linear-gradient(90deg, currentColor 0%, transparent 100%)` }}
      />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${tab.iconBg} flex items-center justify-center shrink-0`}>
              <tab.Icon className={`w-5 h-5 ${tab.iconColor}`} />
            </div>
            <p className="font-sans text-[12px] font-semibold text-zinc-400 leading-tight">{item.module}</p>
          </div>
          {/* Impact badge */}
          <span className={`shrink-0 font-sans text-[12px] font-bold px-3 py-1.5 rounded-xl border whitespace-nowrap ${tab.headerColor} ${tab.iconBg} ${tab.borderAccent}`}>
            {item.impact}
          </span>
        </div>

        {/* Mechanism */}
        <p className="font-sans text-[14px] text-zinc-700 leading-relaxed">
          {item.mechanism}
        </p>

        {/* Expand arrow */}
        <div className="mt-4 flex items-center gap-1.5">
          <CheckCircle2 className={`w-3.5 h-3.5 ${tab.iconColor} opacity-60`} />
          <span className="font-sans text-[12px] text-zinc-400 group-hover:text-zinc-600 transition-colors">
            {expanded ? 'Hide detail' : 'Show detail'}
          </span>
        </div>

        {/* Expanded detail */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="mt-3 pt-3 border-t border-zinc-100 font-sans text-[13px] text-zinc-500 leading-relaxed">
                {item.detail}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function RevenueIntelPanel() {
  const [active, setActive] = useState<TabKey>('DIRECT');
  const tab = TABS.find((t) => t.key === active)!;

  return (
    <section className="relative py-20 md:py-[120px] bg-[#F8FBFF] overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[700px] h-[400px] bg-emerald-100/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-sky-100/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-[1280px] mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans font-semibold text-[13px] text-accent-gold uppercase tracking-[0.3em] mb-5 block"
          >
            REVENUE INTELLIGENCE
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-bold text-[30px] md:text-[52px] text-zinc-900 leading-tight mb-5"
          >
            The ROI of{' '}
            <span className="text-gradient">Getting It Right.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-[16px] text-zinc-500 max-w-[580px] leading-relaxed"
          >
            Neural Wings isn't a cost — it generates, protects, retains, and multiplies FTO revenue across 19 measurable parameters.
          </motion.p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[
            { label: 'Revenue Parameters', value: 19, suffix: '', color: 'text-sky-600' },
            { label: 'Incidents Resolved',  value: 30, suffix: '', color: 'text-red-500' },
            { label: 'AOG Cost per Day',    value: 50, suffix: 'K+', color: 'text-amber-600' },
            { label: 'Per-Student Value',   value: 20, suffix: 'L', color: 'text-emerald-600' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col items-center py-6 px-4 rounded-2xl border border-zinc-200 bg-white shadow-[0_4px_20px_rgba(59,130,246,0.06)]"
            >
              <span className={`font-heading font-bold text-[36px] md:text-[40px] leading-none ${s.color}`}>
                ₹<AnimatedNumber value={s.value} suffix={s.suffix} />
              </span>
              <span className="mt-2 font-sans text-[11px] text-zinc-400 tracking-wide text-center uppercase">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full border font-sans text-[13px] font-semibold transition-all duration-200 shadow-sm ${
                active === t.key
                  ? t.activeStyle
                  : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:text-zinc-800'
              }`}
            >
              <t.Icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
          >
            {/* Panel heading */}
            <div className={`flex items-center gap-3 mb-8 pb-5 border-b ${tab.borderAccent}`}>
              <div className={`w-10 h-10 rounded-xl ${tab.iconBg} flex items-center justify-center`}>
                <tab.Icon className={`w-5 h-5 ${tab.iconColor}`} />
              </div>
              <div>
                <h3 className={`font-heading font-bold text-[22px] ${tab.headerColor}`}>{tab.label}</h3>
                <p className="font-sans text-[13px] text-zinc-500">{tab.subtitle}</p>
              </div>
            </div>

            {/* Revenue cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {tab.items.map((item, i) => (
                <RevenueCard key={i} item={item} index={i} tab={tab} />
              ))}
            </div>

            <p className="mt-6 text-center font-sans text-[12px] text-zinc-400">
              Click any card to expand the revenue detail
            </p>
          </motion.div>
        </AnimatePresence>

      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />
    </section>
  );
}
