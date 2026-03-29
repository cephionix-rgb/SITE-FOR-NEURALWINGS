import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, CheckCircle2, ChevronRight, Video, FileText,
  ListChecks, Clock, Scale, Wind, Compass, Settings, Radio, Cpu, Sparkles
} from 'lucide-react';

function useLiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/-/g, ' ');
}

const subjects = [
  { label: 'Air Regulations',           icon: Scale,    bg: 'bg-blue-50',    border: 'border-blue-200',   text: 'text-blue-700',   iconColor: 'text-blue-500'   },
  { label: 'Aviation Meteorology',       icon: Wind,     bg: 'bg-sky-50',     border: 'border-sky-200',    text: 'text-sky-700',    iconColor: 'text-sky-500'    },
  { label: 'Air Navigation',             icon: Compass,  bg: 'bg-indigo-50',  border: 'border-indigo-200', text: 'text-indigo-700', iconColor: 'text-indigo-500' },
  { label: 'Technical General',          icon: Settings, bg: 'bg-violet-50',  border: 'border-violet-200', text: 'text-violet-700', iconColor: 'text-violet-500' },
  { label: 'Technical Specific',         icon: Cpu,      bg: 'bg-purple-50',  border: 'border-purple-200', text: 'text-purple-700', iconColor: 'text-purple-500' },
  { label: 'RTR (Acro)',                 icon: Radio,    bg: 'bg-teal-50',    border: 'border-teal-200',   text: 'text-teal-700',   iconColor: 'text-teal-500'   },
];

export function DashboardTraining() {
  const now = useLiveClock();

  return (
    <div className="w-full h-full text-zinc-900 p-6 overflow-y-auto hide-scrollbar flex flex-col gap-6 bg-white border-2 border-zinc-200 shadow-sm rounded-2xl">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading font-bold text-2xl flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-green-500" />
            Chief Ground Instructor (CGI)
          </h3>
          <p className="text-zinc-500 font-sans text-sm">Batch: CPL-Alpha 2026</p>
        </div>

        {/* Live clock */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-sky-200 bg-sky-50">
          <Clock className="w-4 h-4 text-sky-500 shrink-0" />
          <div className="flex flex-col items-end">
            <span className="font-mono font-extrabold text-sky-700 text-sm leading-none tracking-wider">
              {formatTime(now)} <span className="text-[10px] font-bold text-sky-500 uppercase">IST</span>
            </span>
            <span className="font-mono text-[11px] text-sky-500 font-semibold mt-0.5 leading-none">
              {formatDate(now)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Today's Schedule */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white border border-zinc-200 rounded-xl flex flex-col overflow-hidden shadow-sm"
        >
          <div className="p-4 border-b border-zinc-100 bg-zinc-50 flex justify-between items-center">
            <h4 className="font-heading font-bold text-sm text-zinc-900">Class Schedule Today</h4>
            {/* ← live date replaces hardcoded "29 Mar 2026" */}
            <span className="text-xs font-semibold text-zinc-500 bg-white border border-zinc-200 px-2.5 py-1 rounded-lg">
              {formatDate(now)}
            </span>
          </div>

          <div className="flex-1 p-5 space-y-4">
            {/* Class 1 */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center justify-center shrink-0 w-16 h-16 rounded-lg bg-zinc-100 border border-zinc-200 font-mono text-sm leading-tight">
                <span className="font-bold text-zinc-800">10:00</span>
                <span className="text-[10px] uppercase font-bold text-zinc-500">IST</span>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex-1 flex justify-between items-center">
                <div>
                  <h5 className="font-bold text-zinc-900 text-sm mb-0.5">Air Navigation — Plotting</h5>
                  <p className="text-xs text-zinc-500 font-sans">Instructor: Raghuvir Mathur</p>
                </div>
                <div className="px-2 py-1 bg-green-100 text-green-700 border border-green-200 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Concluded
                </div>
              </div>
            </div>

            <div className="w-0.5 h-4 bg-zinc-200 ml-8 my-1" />

            {/* Class 2 */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center justify-center shrink-0 w-16 h-16 rounded-lg bg-indigo-50 border border-indigo-300 font-mono text-sm leading-tight shadow-sm">
                <span className="font-bold text-indigo-700">14:30</span>
                <span className="text-[10px] uppercase font-bold text-indigo-500">IST</span>
              </div>
              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg flex-1 flex justify-between items-center">
                <div>
                  <h5 className="font-bold text-zinc-900 text-sm mb-0.5">Aviation Meteorology</h5>
                  <p className="text-xs text-indigo-600 font-semibold font-sans">Live Weather Briefing · Room 4</p>
                </div>
                <button className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center hover:bg-indigo-400 transition-colors shadow">
                  <Video className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Batch Progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-zinc-200 rounded-xl flex flex-col overflow-hidden shadow-sm"
        >
          <div className="p-4 border-b border-zinc-100 bg-zinc-50 flex justify-between items-center">
            <h4 className="font-heading font-bold text-sm text-zinc-900">Batch Performance (CPL-Alpha)</h4>
            <button className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-0.5 transition-colors">
              Full Report <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="p-5 font-sans space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-zinc-700">Syllabus Completion</span>
                <span className="text-sm font-bold text-green-600">82%</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden bg-zinc-100">
                <div className="w-[82%] h-full bg-green-500 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-zinc-700">Air Regulations (Mock Test Avg)</span>
                <span className="text-sm font-bold text-blue-600">88%</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden bg-zinc-100">
                <div className="w-[88%] h-full bg-blue-500 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-zinc-700">Navigation (Mock Test Avg)</span>
                <span className="text-sm font-bold text-amber-600">65%</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden bg-zinc-100">
                <div className="w-[65%] h-full bg-amber-400 rounded-full" />
              </div>
              <p className="text-xs text-amber-600 font-semibold mt-2">Class average below threshold. Remedial session recommended.</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Questionnaire & Subjects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">

        {/* Generate Questionnaire — light UI card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm relative overflow-hidden"
        >
          {/* Decorative top gradient strip */}
          <div className="absolute top-0 left-0 w-full h-1 rounded-t-xl bg-gradient-to-r from-sky-400 to-blue-500" />
          <div className="absolute top-4 right-4 w-24 h-24 bg-sky-100 rounded-full blur-2xl pointer-events-none" />

          <div className="w-10 h-10 rounded-xl bg-sky-100 border border-sky-200 flex items-center justify-center mb-4">
            <Sparkles className="w-5 h-5 text-sky-600" />
          </div>
          <h4 className="font-heading font-bold text-base text-zinc-900 mb-1.5">Generate Questionnaire</h4>
          <p className="text-zinc-500 text-sm mb-5 leading-relaxed">
            Instantly compile DGCA-format question banks using AI based on the current syllabus phase.
          </p>
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs rounded-lg shadow-md shadow-sky-200 hover:shadow-sky-300 hover:-translate-y-0.5 transition-all flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Generate Now
            </button>
            <span className="text-[10px] text-zinc-400 font-medium">Powered by AIRE · AI Engine</span>
          </div>
        </motion.div>

        {/* All Subjects — coloured pills with icons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm flex flex-col"
        >
          <div className="flex items-center gap-2 mb-4">
            <ListChecks className="w-5 h-5 text-zinc-400" />
            <h4 className="font-heading font-bold text-base text-zinc-900">All Subjects</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {subjects.map(({ label, icon: Icon, bg, border, text, iconColor }) => (
              <span
                key={label}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer hover:scale-105 transition-transform shadow-sm ${bg} ${border} ${text}`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${iconColor}`} />
                {label}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
