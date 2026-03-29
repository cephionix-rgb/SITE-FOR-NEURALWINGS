import { ShieldAlert, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export function DashboardSafety() {
  return (
    <div className="w-full h-full text-zinc-900 p-6 overflow-y-auto hide-scrollbar flex flex-col gap-6 bg-slate-50/50">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h2 className="text-2xl font-extrabold font-heading text-zinc-900 tracking-tight">Safety Officer (SMS)</h2>
            <p className="text-sm text-zinc-500 font-medium">Safety Management Systems & Audits</p>
         </div>
      </div>

      {/* Safety KPIs Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         
         <div className="rounded-xl p-5 bg-white border border-zinc-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2">
               <div className="p-1.5 rounded-lg bg-red-50 text-red-500">
                  <ShieldAlert className="w-4 h-4" />
               </div>
               <span className="text-xs font-semibold text-zinc-600 uppercase tracking-wide">Open Hazards</span>
            </div>
            <div className="flex items-end justify-between">
               <p className="text-3xl font-extrabold font-heading text-zinc-900">4</p>
               <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 animate-pulse">1 CRITICAL</span>
            </div>
         </div>

         <div className="rounded-xl p-5 bg-white border border-zinc-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2">
               <div className="p-1.5 rounded-lg bg-amber-50 text-amber-500">
                  <AlertTriangle className="w-4 h-4" />
               </div>
               <span className="text-xs font-semibold text-zinc-600 uppercase tracking-wide">Near Misses (30d)</span>
            </div>
            <p className="text-3xl font-extrabold font-heading text-zinc-900">2</p>
         </div>

         <div className="rounded-xl p-5 bg-white border border-zinc-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2">
               <div className="p-1.5 rounded-lg bg-sky-50 text-sky-500">
                  <CheckCircle className="w-4 h-4" />
               </div>
               <span className="text-xs font-semibold text-zinc-600 uppercase tracking-wide">Audit Score</span>
            </div>
            <p className="text-3xl font-extrabold font-heading text-zinc-900">88<span className="text-lg text-zinc-400">/100</span></p>
         </div>

         <div className="rounded-xl p-5 bg-green-500 border border-green-600 shadow-sm shadow-green-500/20 flex flex-col justify-between text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
            <div className="flex items-center gap-2 mb-2 relative z-10">
               <div className="p-1.5 rounded-lg bg-green-600 text-white shadow-inner">
                  <Clock className="w-4 h-4" />
               </div>
               <span className="text-xs font-bold uppercase tracking-wide text-green-100">Since Last Incident</span>
            </div>
            <p className="text-4xl font-extrabold justify-end font-heading relative z-10">47 <span className="text-lg font-medium text-green-200">Days</span></p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Active Hazard Reports Table */}
         <div className="lg:col-span-2 rounded-xl p-0 bg-white border border-zinc-200 shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b border-zinc-100 bg-zinc-50 flex items-center justify-between">
               <h3 className="text-sm font-bold font-heading flex items-center text-zinc-900">
                  <ShieldAlert className="w-4 h-4 text-slate-500 mr-2" />
                  Active Hazard Reports
               </h3>
               <button className="text-[10px] font-bold px-3 py-1.5 rounded-md uppercase bg-sky-500 text-white hover:bg-sky-600 transition shadow-sm">
                  + Log Hazard
               </button>
            </div>
            
            <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-zinc-600">
               <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100 uppercase tracking-wider text-[10px] font-bold text-zinc-400">
                     <th className="py-3 px-4">Report #</th>
                     <th className="py-3 px-4">Date</th>
                     <th className="py-3 px-4">Category</th>
                     <th className="py-3 px-4 w-1/3">Description</th>
                     <th className="py-3 px-4">Risk Level</th>
                     <th className="py-3 px-4">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-zinc-100 font-medium bg-white">
                  {[
                     { id: "SMS-2026-017", date: "28 Mar", cat: "Bird Strike", desc: "Bird strike reported on final approach RWY 23 — VT-NWA", risk: "HIGH", rC: "bg-red-100 text-red-700 font-bold", stat: "Under Investigation", stC: "bg-amber-100 text-amber-700" },
                     { id: "SMS-2026-016", date: "25 Mar", cat: "Fuel Discrep.", desc: "8L discrepancy between dispatch and bowser records", risk: "MEDIUM", rC: "bg-amber-100 text-amber-700 font-bold", stat: "Closed", stC: "bg-zinc-100 text-zinc-500" },
                     { id: "SMS-2026-015", date: "20 Mar", cat: "Equipment", desc: "Horizon indicator unserviceable — delayed detection", risk: "HIGH", rC: "bg-red-100 text-red-700 font-bold", stat: "Corrective Action", stC: "bg-sky-100 text-sky-700" },
                  ].map((r, i) => (
                     <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-zinc-800">{r.id}</td>
                        <td className="py-3 px-4 font-mono">{r.date}</td>
                        <td className="py-3 px-4 font-bold text-zinc-700">{r.cat}</td>
                        <td className="py-3 px-4 text-[11px] font-normal leading-snug">{r.desc}</td>
                        <td className="py-3 px-4"><span className={`px-2 py-0.5 rounded text-[10px] ${r.rC}`}>{r.risk}</span></td>
                        <td className="py-3 px-4"><span className={`px-2 py-1 rounded-md text-[10px] whitespace-nowrap ${r.stC}`}>{r.stat}</span></td>
                     </tr>
                  ))}
               </tbody>
            </table>
            </div>
         </div>

         {/* Risk Matrix Visualization */}
         <div className="rounded-xl p-5 bg-white border border-zinc-200 shadow-sm flex flex-col">
            <h3 className="text-sm font-bold font-heading flex items-center text-zinc-900 mb-4">
               Risk Heatmap (5x5)
            </h3>
            
            <div className="flex-1 flex flex-col pt-2">
               {/* Grid 5x5 */}
               <div className="grid grid-cols-5 gap-1 h-48 w-full border-l border-b border-zinc-200 pb-1 pl-1 relative">
                  
                  {/* Y Axis Label */}
                  <div className="absolute -left-5 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] font-bold text-zinc-400 tracking-widest uppercase">
                     Likelihood
                  </div>
                  {/* X Axis Label */}
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-zinc-400 tracking-widest uppercase">
                     Severity
                  </div>

                  {/* Matrix Cells - Colored mapped by risk zone */}
                  {Array.from({ length: 25 }).map((_, i) => {
                     const row = Math.floor(i / 5);
                     const col = i % 5;
                     const score = (5 - row) * (col + 1); // rough logic for heatmap color
                     
                     let bgClass = "bg-green-100 border border-green-200/50";
                     if (score > 16) bgClass = "bg-red-200 border border-red-300";
                     else if (score > 10) bgClass = "bg-amber-200 border border-amber-300";
                     else if (score > 5) bgClass = "bg-green-200 border border-green-300";

                     // Plotted Points
                     const isP1 = row === 1 && col === 3; // HIGH
                     const isP2 = row === 3 && col === 2; // MEDIUM
                     
                     return (
                        <div key={i} className={`rounded-sm flex items-center justify-center relative ${bgClass}`}>
                           {isP1 && <div className="absolute w-3 h-3 bg-red-600 rounded-full shadow-sm ring-2 ring-white animate-pulse" />}
                           {isP2 && <div className="absolute w-3 h-3 bg-amber-600 rounded-full shadow-sm ring-2 ring-white" />}
                        </div>
                     )
                  })}
               </div>
            </div>
            <div className="flex justify-between mt-6 text-[10px] font-bold text-zinc-500 uppercase">
               <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-green-200"/> Low</span>
               <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-amber-200"/> Med</span>
               <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-red-200"/> High</span>
            </div>
         </div>

      </div>
    </div>
  );
}
