import { GraduationCap, BookOpen, Clock, Activity, CheckCircle, BrainCircuit, Play, ChevronRight } from "lucide-react"

export function DashboardStudent() {
  return (
    <div className="w-full h-full text-zinc-900 p-6 overflow-y-auto hide-scrollbar flex flex-col gap-6 bg-slate-50/50">
      
      {/* ── SECTION 1: My Progress Card ── */}
      <div className="rounded-xl p-5 bg-white border border-zinc-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
           <div>
              <h2 className="text-lg font-bold font-heading text-zinc-900">Syllabus Progress</h2>
              <p className="text-xs text-zinc-500 font-medium">Commercial Pilot License (CPL) Tract</p>
           </div>
           <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-50 text-sky-700 border border-sky-100 uppercase tracking-widest">
              Aryan Kapoor
           </span>
        </div>

        <div className="space-y-4">
           {/* Phase 1 */}
           <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                 <span className="text-zinc-700">Phase 1 (Ground School)</span>
                 <span className="text-green-600 flex items-center gap-1"><CheckCircle className="w-3 h-3"/> COMPLETE</span>
              </div>
              <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden">
                 <div className="h-full bg-green-500 w-full" />
              </div>
           </div>
           
           {/* Phase 2 */}
           <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                 <span className="text-zinc-900">Phase 2 (Basic Flying, Ex 1–15)</span>
                 <span className="text-sky-600">73%</span>
              </div>
              <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden">
                 <div className="h-full bg-gradient-to-r from-sky-400 to-blue-500 w-[73%] rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
              </div>
           </div>

           {/* Phase 3 */}
           <div>
              <div className="flex justify-between text-xs font-bold mb-1 opacity-60">
                 <span className="text-zinc-500 flex items-center gap-1">Phase 3 (Advanced Flying, Ex 16–30)</span>
                 <span className="text-zinc-400">Locked</span>
              </div>
              <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden opacity-60">
                 <div className="h-full bg-zinc-300 w-0" />
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         
         <div className="space-y-6">
            {/* Upcoming Sorties */}
            <div className="rounded-xl p-0 bg-white border border-zinc-200 shadow-sm flex flex-col overflow-hidden">
               <div className="p-4 border-b border-zinc-100 bg-zinc-50 flex items-center justify-between">
                  <h3 className="text-sm font-bold font-heading flex items-center text-zinc-900">
                     <Clock className="w-4 h-4 text-sky-500 mr-2" />
                     Upcoming Sorties
                  </h3>
               </div>
               <div className="divide-y divide-zinc-100">
                  <div className="p-4 bg-white hover:bg-slate-50 transition-colors flex items-center justify-between group">
                     <div>
                        <p className="text-xs font-bold text-sky-600 mb-0.5">Tomorrow, 06:30</p>
                        <p className="text-sm font-bold text-zinc-900">Ex. 13 — Forced Landing</p>
                        <p className="text-[11px] text-zinc-500 font-medium">Capt. Sharma · VT-SKY</p>
                     </div>
                     <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-zinc-100 text-zinc-700 group-hover:bg-zinc-900 group-hover:text-white transition-colors flex items-center gap-1">
                        Pre-Brief <ChevronRight className="w-3 h-3" />
                     </button>
                  </div>
                  <div className="p-4 bg-white hover:bg-slate-50 transition-colors flex items-center justify-between group">
                     <div>
                        <p className="text-xs font-bold text-zinc-500 mb-0.5">31 Mar, 06:00</p>
                        <p className="text-sm font-bold text-zinc-800">Ex. 13 — Consolidation</p>
                        <p className="text-[11px] text-zinc-500 font-medium">Capt. Sharma · VT-SNA</p>
                     </div>
                     <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-zinc-100 text-zinc-700 group-hover:bg-zinc-900 group-hover:text-white transition-colors flex items-center gap-1">
                        Pre-Brief <ChevronRight className="w-3 h-3" />
                     </button>
                  </div>
               </div>
            </div>

            {/* Digital Logbook Summary */}
            <div className="rounded-xl p-5 bg-white border border-zinc-200 shadow-sm flex flex-col">
               <h3 className="text-sm font-bold font-heading flex items-center text-zinc-900 mb-4">
                  <BookOpen className="w-4 h-4 text-amber-500 mr-2" />
                  Digital Logbook Summary
               </h3>
               <div className="flex items-end gap-4 mb-4">
                  <div>
                     <p className="text-xs font-bold text-zinc-500 uppercase tracking-wide">Total Hours</p>
                     <p className="text-4xl font-black font-mono text-zinc-900 tracking-tighter">47:30</p>
                  </div>
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2 mb-1">
                     <div className="bg-slate-50 px-2 py-1.5 rounded border border-zinc-100">
                        <p className="text-[9px] text-zinc-500 font-bold uppercase">P1 Hours</p>
                        <p className="text-xs font-bold font-mono text-zinc-800">12:15</p>
                     </div>
                     <div className="bg-slate-50 px-2 py-1.5 rounded border border-zinc-100">
                        <p className="text-[9px] text-zinc-500 font-bold uppercase">P2 Hours</p>
                        <p className="text-xs font-bold font-mono text-zinc-800">35:15</p>
                     </div>
                     <div className="bg-slate-50 px-2 py-1.5 rounded border border-zinc-100">
                        <p className="text-[9px] text-zinc-500 font-bold uppercase">Night</p>
                        <p className="text-xs font-bold font-mono text-zinc-800">04:00</p>
                     </div>
                     <div className="bg-slate-50 px-2 py-1.5 rounded border border-zinc-100">
                        <p className="text-[9px] text-zinc-500 font-bold uppercase">Instr.</p>
                        <p className="text-xs font-bold font-mono text-zinc-800">02:30</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="space-y-6 flex flex-col h-full">
            {/* My Exams */}
            <div className="rounded-xl p-5 bg-white border border-zinc-200 shadow-sm">
               <h3 className="text-sm font-bold font-heading flex items-center text-zinc-900 mb-4">
                  <GraduationCap className="w-4 h-4 text-blue-500 mr-2" />
                  My Exams
               </h3>
               <ul className="space-y-3 font-medium text-sm">
                  <li className="flex items-center justify-between">
                     <span className="flex items-center gap-2 text-zinc-900">
                        <CheckCircle className="w-4 h-4 text-green-500" /> Air Regulations
                     </span>
                     <div className="text-right">
                        <p className="text-sm font-bold text-zinc-900">82% <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded ml-1">Passed</span></p>
                     </div>
                  </li>
                  <li className="flex items-center justify-between">
                     <span className="flex items-center gap-2 text-zinc-900">
                        <CheckCircle className="w-4 h-4 text-green-500" /> Meteorology
                     </span>
                     <div className="text-right">
                        <p className="text-sm font-bold text-zinc-900">78% <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded ml-1">Passed</span></p>
                     </div>
                  </li>
                  <li className="flex items-center justify-between pt-1 border-t border-zinc-50">
                     <span className="flex items-center gap-2 text-zinc-900">
                        <Activity className="w-4 h-4 text-amber-500" /> Air Navigation
                     </span>
                     <div className="text-right">
                        <p className="text-[12px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded">Scheduled: 02 Apr 2026</p>
                     </div>
                  </li>
                  <li className="flex items-center justify-between pt-1">
                     <span className="flex items-center gap-2 text-zinc-400">
                        <Activity className="w-4 h-4 text-zinc-300" /> Aircraft Tech General
                     </span>
                     <div className="text-right">
                        <p className="text-[11px] font-bold text-zinc-400">Not Scheduled</p>
                     </div>
                  </li>
               </ul>
            </div>

            {/* HICA Chatbot Preview */}
            <div className="flex-1 rounded-xl p-0 bg-white border border-sky-200 shadow-md shadow-sky-100 flex flex-col overflow-hidden ring-1 ring-sky-50">
               <div className="p-3 border-b border-sky-100 bg-gradient-to-r from-sky-50 to-white flex items-center justify-between">
                  <div>
                     <h3 className="text-sm font-bold font-heading flex items-center text-sky-900">
                        <BrainCircuit className="w-4 h-4 text-sky-500 mr-2" />
                        HICA — Study Assistant
                     </h3>
                     <p className="text-[10px] text-sky-600 font-medium ml-6">Neural Wings Intelligence Engine</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-sky-100 border border-sky-200 text-sky-700 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1">
                     <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" /> Online
                  </span>
               </div>
               <div className="p-4 flex-1 bg-white space-y-4">
                  {/* User Message */}
                  <div className="flex justify-end">
                     <div className="bg-zinc-100 text-zinc-800 rounded-2xl rounded-tr-sm px-4 py-2 text-xs font-medium max-w-[85%]">
                        Explain V-speeds and when they are used
                     </div>
                  </div>
                  {/* AI Response */}
                  <div className="flex items-end gap-2">
                     <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-sky-400 to-blue-500 flex items-center justify-center shrink-0 shadow-sm">
                        <BrainCircuit className="w-3.5 h-3.5 text-white" />
                     </div>
                     <div className="bg-sky-50 text-sky-900 border border-sky-100 rounded-2xl rounded-bl-sm px-4 py-3 text-xs font-medium leading-relaxed max-w-[85%]">
                        Great question! V-speeds are standardised aircraft performance speeds defined by the manufacturer and regulatory authorities. Here are the key ones you need for your PPL/CPL exams:<br/><br/>
                        <strong>Vs0</strong> is the stalling speed in landing configuration (flaps fully extended)...
                     </div>
                  </div>
               </div>
               <div className="p-3 border-t border-slate-100 bg-slate-50 flex gap-2">
                  <input type="text" placeholder="Ask me anything about aviation theory..." disabled className="flex-1 bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-500 shadow-inner" />
                  <button className="w-10 h-10 rounded-lg bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition shadow-sm">
                     <Play className="w-4 h-4" />
                  </button>
               </div>
            </div>

         </div>

      </div>
    </div>
  );
}
