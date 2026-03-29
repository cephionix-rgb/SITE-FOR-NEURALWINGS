import { motion } from 'framer-motion';
import { FileSignature, ShieldAlert, CheckCircle } from 'lucide-react';

export function DashboardLegal() {
  return (
    <div className="w-full h-full text-zinc-900 p-6 overflow-y-auto hide-scrollbar flex flex-col gap-6 bg-white border-2 border-zinc-200 shadow-sm rounded-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading font-bold text-2xl flex items-center gap-2">
            <FileSignature className="w-6 h-6 text-stone-600" />
            Legal & Compliance
          </h3>
          <p className="text-font-secondary font-sans text-sm">DGCA Reporting & Audits</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/50 border border-zinc-200 rounded-xl flex flex-col overflow-hidden p-5">
           <h4 className="font-heading font-bold lg text-zinc-900 mb-4 border-b border-white/50 pb-2">Upcoming Audits</h4>
           <div className="space-y-3">
              <div className="p-4 bg-white/50 border border-zinc-200 rounded-lg">
                 <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-zinc-900 text-sm">CFOI Standardisation Check</span>
                    <span className="font-mono font-bold text-red-500 text-xs">4 Days</span>
                 </div>
                 <p className="text-xs text-font-secondary">All training records, student logbooks, and instructor authorizations must be digitally signed and frozen.</p>
              </div>
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                 <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-zinc-900 text-sm">Aircraft Document Renewal</span>
                    <span className="font-mono font-bold text-green-600 text-xs">30+ Days</span>
                 </div>
                 <p className="text-xs text-green-700">ARC for VT-SNA valid till May 2026. No immediate action required.</p>
              </div>
           </div>
         </motion.div>

         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/50 border border-zinc-200 rounded-xl flex flex-col overflow-hidden p-5">
           <h4 className="font-heading font-bold lg text-zinc-900 mb-4 border-b border-white/50 pb-2">Compliance Tasks</h4>
           <div className="divide-y divide-zinc-200 font-sans">
              <div className="p-3 flex items-center justify-between hover:bg-zinc-50">
                 <div className="flex items-center gap-3">
                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-medium">Verify CFI FDTL Exceptions</span>
                 </div>
                 <button className="px-3 py-1 bg-transparent border border-zinc-200 text-xs rounded hover:bg-zinc-50">Review</button>
              </div>
              <div className="p-3 flex items-center justify-between hover:bg-zinc-50">
                 <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">Submit Monthly Flying Returns (MFR)</span>
                 </div>
                 <span className="text-xs text-green-600 font-bold uppercase">Submitted</span>
              </div>
           </div>
         </motion.div>
      </div>

      {/* FTO Record Table */}
      <div className="mt-4 rounded-xl bg-white border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
         <div className="p-4 border-b border-zinc-100 bg-zinc-50 flex justify-between items-center">
            <h4 className="font-heading font-bold text-zinc-900 flex items-center gap-2">
               <FileSignature className="w-4 h-4 text-stone-600" /> Record of the FTO
            </h4>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left font-sans">
               <thead className="text-xs text-zinc-500 uppercase bg-zinc-50/50 border-b border-zinc-100">
                  <tr>
                     <th className="px-6 py-3 font-medium">Record Title</th>
                     <th className="px-6 py-3 font-medium">Category</th>
                     <th className="px-6 py-3 font-medium">Last Audited / Issue Date</th>
                     <th className="px-6 py-3 font-medium text-center">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-zinc-100">
                  <tr className="hover:bg-zinc-50 transition-colors">
                     <td className="px-6 py-4 font-bold text-zinc-900">Training & Procedures Manual (TPM)</td>
                     <td className="px-6 py-4 text-zinc-600">Manuals</td>
                     <td className="px-6 py-4 text-zinc-500 font-mono">12 Jan 2026</td>
                     <td className="px-6 py-4 text-center"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-[10px] font-bold uppercase">Approved</span></td>
                  </tr>
                  <tr className="hover:bg-zinc-50 transition-colors">
                     <td className="px-6 py-4 font-bold text-zinc-900">Safety Management System (SMS) Manual</td>
                     <td className="px-6 py-4 text-zinc-600">Manuals</td>
                     <td className="px-6 py-4 text-zinc-500 font-mono">05 Mar 2026</td>
                     <td className="px-6 py-4 text-center"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-[10px] font-bold uppercase">Approved</span></td>
                  </tr>
                  <tr className="hover:bg-zinc-50 transition-colors">
                     <td className="px-6 py-4 font-bold text-zinc-900">FTO Approval Certificate</td>
                     <td className="px-6 py-4 text-zinc-600">Certificates</td>
                     <td className="px-6 py-4 text-zinc-500 font-mono">14 Aug 2025</td>
                     <td className="px-6 py-4 text-center"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-[10px] font-bold uppercase whitespace-nowrap">Renewal Due</span></td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
