import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import {
  Building2, GraduationCap, ShieldCheck, Scale,
  CloudSun, FileText, Activity, Users, Plane, FileBadge,
  Wrench, BookOpen, Banknote
} from 'lucide-react';

import { DashboardDirector } from './DashboardDirector';
import { DashboardCFI } from './DashboardCFI';
import { DashboardOps } from './DashboardOps';
import { DashboardFleet } from './DashboardFleet';
import { DashboardFlightInstructor } from './DashboardFlightInstructor';
import { DashboardTraining } from './DashboardTraining';
import { DashboardStudent } from './DashboardStudent';
import { DashboardHostel } from './DashboardHostel';
import { DashboardHR } from './DashboardHR';
import { DashboardSafety } from './DashboardSafety';
import { DashboardQuality } from './DashboardQuality';
import { DashboardLegal } from './DashboardLegal';
import { DashboardMet } from './DashboardMet';
import { DashboardFinance } from './DashboardFinance';

const tabs = [
  { id: 'director', label: 'Director', icon: Building2 },
  { id: 'ops', label: 'Flight Ops', icon: Activity },
  { id: 'cfi', label: 'Chief Flight Inst.', icon: FileBadge },
  { id: 'flight_instructor', label: 'Instructor', icon: Plane },
  { id: 'student', label: 'Student Cadet', icon: GraduationCap },
  { id: 'training', label: 'CGI', icon: BookOpen },
  { id: 'fleet', label: 'Fleet & Maint.', icon: Wrench },
  { id: 'safety', label: 'Safety (SMS)', icon: ShieldCheck },
  { id: 'quality', label: 'Quality Dept', icon: FileCheck },
  { id: 'finance', label: 'Finance & Billing', icon: Banknote },
  { id: 'met', label: 'Meteorology', icon: CloudSun },
  { id: 'hr', label: 'HR / Admin', icon: Users },
  { id: 'legal', label: 'Legal Dept', icon: Scale },
  { id: 'hostel', label: 'Hostel Mgmt', icon: Building2 },
];

function FileCheck(props: any) {
  return <FileText {...props} />;
}

export function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState('director');

  useEffect(() => {
    const handler = (e: Event) => {
      const tab = (e as CustomEvent).detail?.tab;
      if (tab) setActiveTab(tab);
    };
    window.addEventListener('openDemoTab', handler);
    return () => window.removeEventListener('openDemoTab', handler);
  }, []);

  const renderDashboard = () => {
    switch(activeTab) {
      case 'director': return <DashboardDirector />;
      case 'cfi': return <DashboardCFI />;
      case 'ops': return <DashboardOps />;
      case 'fleet': return <DashboardFleet />;
      case 'flight_instructor': return <DashboardFlightInstructor />;
      case 'training': return <DashboardTraining />;
      case 'hr': return <DashboardHR />;
      case 'student': return <DashboardStudent />;
      case 'hostel': return <DashboardHostel />;
      case 'safety': return <DashboardSafety />;
      case 'quality': return <DashboardQuality />;
      case 'legal': return <DashboardLegal />;
      case 'met': return <DashboardMet />;
      case 'finance': return <DashboardFinance />;
      default: return <DashboardDirector />;
    }
  };

  return (
    <section id="demo" className="relative py-24 bg-transparent overflow-hidden">
      {/* Immersive Depth Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-sky-200/40 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[130px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans font-bold text-[20px] text-primary uppercase tracking-[0.2em] mb-4 block"
          >
            THE PLATFORM
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-[36px] md:text-[48px] text-zinc-900 leading-tight mb-4"
          >
            One System. Every Role.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans font-normal text-lg text-zinc-500 max-w-2xl text-center"
          >
            Select a role to explore their tailored workspace.
            Real-time data flow, zero friction.
          </motion.p>
        </div>

        {/* Application Shell */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="w-full bg-white/80 backdrop-blur-3xl border-[3px] border-zinc-200 shadow-sm rounded-2xl overflow-hidden min-h-[600px] md:min-h-[800px] flex flex-col relative z-20"
        >
          {/* Mac-like Window Header */}
          <div className="h-12 bg-white/50 border-b border-zinc-100 flex items-center px-4 gap-2 shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/20" />
            <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500/20" />
            <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500/20" />
            <div className="mx-auto flex flex-col items-center">
              <span className="text-[11px] text-zinc-500 font-sans font-bold uppercase tracking-wide">
                Neural Wings Base :: vikr.neuralwings.org
              </span>
            </div>
            <div className="w-[52px]" />
          </div>

          {/* ── Mobile tab bar (visible below lg) ── */}
          <div className="lg:hidden flex overflow-x-auto hide-scrollbar border-b border-zinc-100 bg-white/60 gap-1 p-2 shrink-0" style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{ scrollSnapAlign: 'start' }}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg font-sans text-xs font-medium whitespace-nowrap transition-all duration-200 shrink-0',
                  activeTab === tab.id
                    ? 'bg-sky-100 text-sky-700 shadow-sm'
                    : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800'
                )}
              >
                <tab.icon className={cn('w-3.5 h-3.5', activeTab === tab.id ? 'text-sky-600' : 'text-zinc-400')} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* ── Desktop Sidebar (hidden below lg) ── */}
            <div className="hidden lg:flex w-[280px] shrink-0 bg-white/50 border-r border-white/50 overflow-y-auto hide-scrollbar flex-col h-full py-4">
              <div className="px-5 mb-4 border-b border-white/50 pb-4">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Select Persona</p>
                <h3 className="text-sm font-semibold text-zinc-900">Platform Directory</h3>
              </div>

              <div className="flex-1 px-3 space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-sans text-sm font-medium transition-all duration-200 text-left',
                      activeTab === tab.id
                        ? 'bg-sky-100 text-sky-700 shadow-sm'
                        : 'bg-transparent text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
                    )}
                  >
                    <tab.icon className={cn('w-4 h-4', activeTab === tab.id ? 'text-sky-600' : 'text-zinc-400')} />
                    <span className="truncate">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-transparent overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 w-full h-full"
                >
                  {renderDashboard()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
