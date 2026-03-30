import { motion } from 'framer-motion';
import { Target, Search, FileSymlink, BadgeCheck, ShieldAlert } from 'lucide-react';

export function DashboardQuality() {
  return (
    <div className="w-full h-full text-zinc-900 p-3 sm:p-6 overflow-y-auto hide-scrollbar flex flex-col gap-4 sm:gap-6 bg-white border-2 border-zinc-200 shadow-sm rounded-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading font-bold text-xl sm:text-2xl flex items-center gap-2">
            <Target className="w-6 h-6 text-teal-500" />
            Quality Assurance Manager
          </h3>
          <p className="text-font-secondary font-sans text-sm">Internal Audits & Process Controls</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Internal Audits */}
         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/50 border border-zinc-200 rounded-xl flex flex-col overflow-hidden p-5">
           <h4 className="font-heading font-bold lg text-zinc-900 mb-4 border-b border-white/50 pb-2 flex items-center justify-between">
              Internal Audit Tracker
              <span className="px-2 py-0.5 bg-transparent/20 border border-zinc-200 rounded text-[10px] font-mono">Q2 - 2026</span>
           </h4>
           
           <div className="space-y-4 font-sans text-sm">
              <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg">
                 <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                       <Search className="w-4 h-4 text-teal-600" />
                       <span className="font-bold text-zinc-900">Flight Operations Audit</span>
                    </div>
                    <span className="px-2 py-1 bg-teal-100 text-teal-700 font-bold text-[10px] rounded uppercase">In Progress</span>
                 </div>
                 <div className="w-full h-1.5 bg-teal-200 rounded-full overflow-hidden mt-3">
                    <div className="w-[60%] h-full bg-teal-500" />
                 </div>
                 <p className="text-xs text-font-muted mt-2">Checking SOP adherence for pre-flight briefings.</p>
              </div>

              <div className="p-4 bg-white/50 border border-zinc-200 rounded-lg">
                 <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                       <FileSymlink className="w-4 h-4 text-font-secondary" />
                       <span className="font-bold text-zinc-900">Maintenance Records Review</span>
                    </div>
                    <span className="px-2 py-1 bg-transparent/30 text-font-secondary font-bold text-[10px] rounded uppercase">Scheduled</span>
                 </div>
                 <p className="text-xs text-font-muted mt-2">Due: 15 May 2026.</p>
              </div>
           </div>
         </motion.div>

         {/* Corrective Action Plans (CAPA) */}
         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/50 border border-zinc-200 rounded-xl flex flex-col overflow-hidden p-5">
           <h4 className="font-heading font-bold lg text-zinc-900 mb-4 border-b border-white/50 pb-2">Open CAPA Reports</h4>
           <div className="divide-y divide-zinc-200 font-sans">
              <div className="py-3 flex justify-between items-start hover:bg-zinc-50">
                 <div>
                    <span className="text-sm font-bold block mb-1">CAPA-2026-004: Tool Control</span>
                    <p className="text-xs text-font-secondary">Discrepancy in tool shadow board in Hangar A.</p>
                 </div>
                 <span className="text-[10px] px-2 py-1 bg-amber-100 text-amber-700 rounded font-bold uppercase">Pending</span>
              </div>
              <div className="py-3 flex justify-between items-start hover:bg-zinc-50">
                 <div>
                    <span className="text-sm font-bold block mb-1 flex items-center gap-1">
                       <BadgeCheck className="w-4 h-4 text-green-500" /> CAPA-2026-003: Logbook Entry
                    </span>
                    <p className="text-xs text-font-secondary">Instructor signature missing on dual flight. Remedied.</p>
                 </div>
                 <span className="text-[10px] px-2 py-1 bg-green-100 text-green-700 rounded font-bold uppercase">Closed</span>
              </div>
           </div>
         </motion.div>
      </div>

      {/* DGCA Compliance Table */}
      <div className="mt-4 rounded-xl bg-white border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
         <div className="p-4 border-b border-zinc-100 bg-zinc-50 flex justify-between items-center">
            <h4 className="font-heading font-bold text-zinc-900 flex items-center gap-2">
               <ShieldAlert className="w-4 h-4 text-emerald-600" /> DGCA Compliance Records
            </h4>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left font-sans">
               <thead className="text-xs text-zinc-500 uppercase bg-zinc-50/50 border-b border-zinc-100">
                  <tr>
                     <th className="px-6 py-3 font-medium">Document / Audit ID</th>
                     <th className="px-6 py-3 font-medium">Description</th>
                     <th className="px-6 py-3 font-medium">Validity</th>
                     <th className="px-6 py-3 font-medium text-center">Status</th>
                     <th className="px-6 py-3 font-medium text-right">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-zinc-100">
                  <tr className="hover:bg-zinc-50 transition-colors">
                     <td className="px-6 py-4 font-bold text-zinc-900">DGCA/FTO/2026/01</td>
                     <td className="px-6 py-4 text-zinc-600">Annual Safety Audit Report</td>
                     <td className="px-6 py-4 text-zinc-500 font-mono">31 Dec 2026</td>
                     <td className="px-6 py-4 text-center"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-[10px] font-bold uppercase">Valid</span></td>
                     <td className="px-6 py-4 text-right"><button className="text-sky-600 hover:text-sky-700 font-bold text-xs inline-flex items-center gap-1"><FileSymlink className="w-3 h-3"/> PDF &nbsp;&nbsp;</button></td>
                  </tr>
                  <tr className="hover:bg-zinc-50 transition-colors">
                     <td className="px-6 py-4 font-bold text-zinc-900">CAR Sec 7 Ser I</td>
                     <td className="px-6 py-4 text-zinc-600">FDTL Exemption Approvals</td>
                     <td className="px-6 py-4 text-zinc-500 font-mono">15 Aug 2026</td>
                     <td className="px-6 py-4 text-center"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-[10px] font-bold uppercase">Valid</span></td>
                     <td className="px-6 py-4 text-right"><button className="text-sky-600 hover:text-sky-700 font-bold text-xs inline-flex items-center gap-1"><FileSymlink className="w-3 h-3"/> PDF &nbsp;&nbsp;</button></td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
