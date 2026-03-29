import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plane, GraduationCap, Brain, Shield, Building, CheckCircle2, Cpu } from 'lucide-react';
import { cn } from '../../lib/utils';

// Hardcoded data structure based on the prompt
const categories = [
  {
    id: 'operations',
    name: 'OPERATIONS',
    icon: Plane,
    color: 'from-blue-400 to-blue-600',
    border: 'border-blue-500',
    tint: 'bg-blue-500/10',
    modules: [
      { id: 'flight-ops', name: 'Flight Operations' },
      { id: 'fleet', name: 'Fleet Management' },
      { id: 'fuel', name: 'Fuel Management' },
      { id: 'flight-planning', name: 'Flight Planning' },
      { id: 'go-no-go', name: 'Go/No-Go Engine' },
    ]
  },
  {
    id: 'training',
    name: 'TRAINING',
    icon: GraduationCap,
    color: 'from-yellow-400 to-yellow-600',
    border: 'border-yellow-500',
    tint: 'bg-yellow-500/10',
    modules: [
      { id: 'student', name: 'Student Management' },
      { id: 'instructor', name: 'Instructor Management' },
      { id: 'ground', name: 'Ground Training' },
      { id: 'logbook', name: 'Digital Logbook' },
    ]
  },
  {
    id: 'ai',
    name: 'AI INTELLIGENCE',
    icon: Brain,
    color: 'from-violet-400 to-indigo-600',
    border: 'border-indigo-500',
    tint: 'bg-indigo-500/10',
    modules: [
      { id: 'aire', name: 'AIRE Rostering Engine' },
      { id: 'met', name: 'Meteorological Module' },
      { id: 'analytics', name: 'Reporting & Analytics' },
    ]
  },
  {
    id: 'safety',
    name: 'SAFETY & COMPLIANCE',
    icon: Shield,
    color: 'from-green-400 to-green-600',
    border: 'border-green-500',
    tint: 'bg-green-500/10',
    modules: [
      { id: 'sms', name: 'Safety Management (SMS)' },
      { id: 'calendar', name: 'DGCA Compliance Calendar' },
      { id: 'legal', name: 'Legal & Compliance' },
    ]
  },
  {
    id: 'admin',
    name: 'ADMINISTRATION',
    icon: Building,
    color: 'from-purple-400 to-purple-600',
    border: 'border-purple-500',
    tint: 'bg-purple-500/10',
    modules: [
      { id: 'users', name: 'User & Role Management' },
      { id: 'hostel', name: 'Hostel Management' },
      { id: 'finance', name: 'Finance & Accounting' },
      { id: 'hr', name: 'HR Management' },
      { id: 'comms', name: 'Communications' },
    ]
  }
];

// Content for the right panel (mocked AIRE structure, default)
const moduleDetails: Record<string, any> = {
  'aire': {
    name: 'AIRE Rostering Engine',
    icon: Brain,
    tagline: 'Multi-constraint AI flight scheduling.',
    desc: "The heart of Neural Wings. AIRE is a multi-constraint AI optimisation engine that generates the entire daily flying programme in under 60 seconds. It simultaneously considers every student's syllabus stage, every instructor's rating and duty hours, every aircraft's serviceability and maintenance schedule, current METAR/weather conditions, and 100% of DGCA CAR Section 7 duty time and rest requirements. The result: an optimal, compliant, dispute-free roster — every morning, automatically.",
    capabilities: [
      'Generates full daily programme in < 60 seconds',
      'Enforces 100% of DGCA duty time limits',
      'Considers aircraft maintenance, weather, medical validity simultaneously',
      'CFI approval workflow with one-click publish',
      'Auto-notifies students and instructors via SMS/app',
      'Full audit trail of every scheduling decision'
    ]
  },
  // We'll fallback everything else to a generic detail since AIRE is the focus
};

export function ModulesExplorer() {
  const [activeCategory, setActiveCategory] = useState<string>('ai');
  const [activeModule, setActiveModule] = useState<string>('aire');

  const getModuleDetails = (id: string, name: string) => {
    return moduleDetails[id] || {
      name: name,
      icon: Cpu,
      tagline: 'Integrated automation for efficient workflows.',
      desc: `The ${name} module provides real-time oversight and process automation designed specifically for DGCA-approved flying training organisations. Eliminate manual tracking and streamline operations with a fully integrated data pipeline that connects directly to other relevant modules.`,
      capabilities: [
        'Real-time data synchronization',
        'Role-based access controls',
        'Custom report generation',
        'Audit-ready record keeping',
        'Automated compliance alerts'
      ]
    };
  };

  const currentDetail = getModuleDetails(activeModule, categories.flatMap(c => c.modules).find(m => m.id === activeModule)?.name || '');
  const DetailIcon = currentDetail.icon || Brain;

  return (
    <section id="modules" className="relative py-[120px] bg-transparent overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0" />
      
      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        <div className="mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans font-semibold text-[11px] text-accent-gold uppercase tracking-[0.25em] mb-4 block"
          >
            THE SYSTEM
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-bold text-[36px] md:text-[52px] text-gradient leading-tight"
          >
            Every corner of your FTO, covered.
          </motion.h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8 min-h-[600px]">
          {/* Left Panel - Sticky Sidebar */}
          <div className="w-full md:w-[35%] flex-shrink-0">
            <div className="sticky top-24 bg-background-surface/80 backdrop-blur-xl border border-indigo-900/30 rounded-2xl p-4 overflow-y-auto max-h-[80vh] hide-scrollbar">
              {categories.map((category) => {
                const isActiveCat = activeCategory === category.id;
                
                return (
                  <div key={category.id} className="mb-2">
                    <button 
                      onClick={() => setActiveCategory(isActiveCat ? '' : category.id)}
                      className={cn(
                        "w-full flex items-center justify-between p-3 rounded-lg transition-all",
                        isActiveCat ? `bg-white/50 border-l-4 ${category.border}` : "hover:bg-white/50 border-l-4 border-transparent"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <category.icon className={`w-5 h-5 bg-gradient-to-br ${category.color} text-zinc-900 rounded p-0.5`} />
                        <span className="font-heading font-bold text-[13px] tracking-wide text-zinc-900">{category.name}</span>
                      </div>
                      <ChevronDown className={cn("w-4 h-4 text-font-muted transition-transform", isActiveCat && "rotate-180")} />
                    </button>
                    
                    <AnimatePresence>
                      {isActiveCat && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-2 pb-4 pl-11 flex flex-col gap-1">
                            {category.modules.map(mod => {
                              const isActiveMod = activeModule === mod.id;
                              return (
                                <button
                                  key={mod.id}
                                  onClick={() => setActiveModule(mod.id)}
                                  className={cn(
                                    "text-left px-3 py-2 rounded-lg text-sm font-sans transition-all border-l-2",
                                    isActiveMod
                                      ? `text-zinc-900 ${category.tint} border-indigo-400 font-medium scale-[1.02] shadow-sm`
                                      : "text-font-secondary border-transparent hover:text-zinc-900 hover:bg-white/50"
                                  )}
                                >
                                  {mod.name}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel - Detail View */}
          <div className="w-full md:w-[65%]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-background-surface/40 backdrop-blur-2xl border border-indigo-500/20 rounded-2xl p-8 lg:p-12 h-full flex flex-col relative overflow-hidden"
              >
                {/* Background glow specific to the active module */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="flex items-start gap-6 mb-8 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-400/20 to-indigo-600/20 border border-violet-400/30 flex items-center justify-center shadow-glow-cyan shrink-0">
                    <DetailIcon className="w-8 h-8 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-[28px] md:text-[32px] text-gradient mb-2 leading-tight">
                      {currentDetail.name}
                    </h3>
                    <p className="font-sans text-[18px] text-font-secondary font-medium">
                      {currentDetail.tagline}
                    </p>
                  </div>
                </div>

                <p className="font-sans text-[15px] text-font-secondary leading-relaxed mb-8 max-w-2xl relative z-10">
                  {currentDetail.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 relative z-10">
                  {currentDetail.capabilities.map((cap: string, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1"><CheckCircle2 className="w-4 h-4 text-indigo-400" /></div>
                      <span className="font-sans text-[14px] text-zinc-900/90 leading-snug">{cap}</span>
                    </div>
                  ))}
                </div>

                {/* Abstract UI Mockup */}
                <div className="mt-auto pt-8 border-t border-white/50 relative z-10">
                  <div className="w-full h-[200px] bg-[#080228]/80 border border-indigo-900/50 rounded-xl p-4 flex flex-col gap-3 opacity-60">
                    {/* Header mock */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-32 h-4 bg-white/15 rounded" />
                      <div className="w-16 h-4 bg-indigo-500/20 rounded" />
                    </div>
                    {/* Grid mock */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-16 bg-white/50 rounded-lg border border-white/50" />
                      <div className="h-16 bg-white/50 rounded-lg border border-white/50" />
                      <div className="h-16 bg-white/50 rounded-lg border border-white/50" />
                    </div>
                    {/* Table mock */}
                    <div className="flex-1 bg-white/50 rounded-lg border border-white/50 flex flex-col gap-2 p-3 mt-2">
                       <div className="w-full h-2 bg-white/15 rounded" />
                       <div className="w-[80%] h-2 bg-white/15 rounded" />
                       <div className="w-[90%] h-2 bg-white/15 rounded" />
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
