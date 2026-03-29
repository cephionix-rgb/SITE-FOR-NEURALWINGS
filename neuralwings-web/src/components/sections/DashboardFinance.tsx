import { IndianRupee, TrendingUp, Download, AlertCircle, Sparkles } from "lucide-react"

export function DashboardFinance() {
  return (
    <div className="w-full h-full text-zinc-900 p-6 overflow-y-auto hide-scrollbar flex flex-col gap-6 bg-white border-2 border-zinc-200 shadow-md rounded-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h2 className="text-2xl font-extrabold font-heading text-zinc-900 tracking-tight">Finance Officer</h2>
            <p className="text-sm text-zinc-500 font-medium">Revenue, Fee Collection & DGCA Compliance</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Monthly Revenue Overview */}
         <div className="lg:col-span-1 space-y-6">
            <div className="rounded-xl p-5 bg-white border border-zinc-200 shadow-sm flex flex-col">
               <h3 className="text-sm font-bold font-heading flex items-center text-zinc-900 mb-6">
                  <TrendingUp className="w-4 h-4 text-sky-500 mr-2" />
                  Q1 FY26 Revenue Overview
               </h3>
               
               <div className="space-y-4 mb-8">
                  <div>
                     <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Total Billed</p>
                     <p className="text-3xl font-black font-heading text-zinc-900">₹24.80 <span className="text-sm text-zinc-400 font-medium">Lakhs</span></p>
                  </div>
                  <div>
                     <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Total Collected</p>
                     <p className="text-3xl font-black font-heading text-green-600">₹19.35 <span className="text-sm text-green-400 font-medium">Lakhs</span></p>
                  </div>
                  <div className="pt-4 border-t border-zinc-100">
                     <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Outstanding</p>
                     <p className="text-2xl font-black font-heading text-amber-500">₹5.45 <span className="text-xs text-amber-300 font-medium">Lakhs</span></p>
                  </div>
               </div>

               {/* Simulated Bar Chart */}
               <div className="flex items-end gap-3 h-32 w-full px-2 mt-auto">
                  {/* Jan */}
                  <div className="flex-1 flex flex-col items-center gap-1 group">
                     <div className="w-full flex justify-center gap-1 h-[80px]">
                        <div className="w-1/2 bg-sky-100 rounded-t-sm relative transition-all group-hover:bg-sky-200 h-[100%]" title="Billed: 8.2L" />
                        <div className="w-1/2 bg-sky-500 rounded-t-sm shadow-sm transition-all group-hover:bg-sky-600 h-[80%]" title="Collected: 6.5L" />
                     </div>
                     <span className="text-[9px] font-bold text-zinc-400 uppercase">Jan</span>
                  </div>
                  {/* Feb */}
                  <div className="flex-1 flex flex-col items-center gap-1 group">
                     <div className="w-full flex justify-center gap-1 h-[95px]">
                        <div className="w-1/2 bg-sky-100 rounded-t-sm relative transition-all group-hover:bg-sky-200 h-[100%]" title="Billed: 9.5L" />
                        <div className="w-1/2 bg-sky-500 rounded-t-sm shadow-sm transition-all group-hover:bg-sky-600 h-[60%]" title="Collected: 5.7L" />
                     </div>
                     <span className="text-[9px] font-bold text-zinc-400 uppercase">Feb</span>
                  </div>
                  {/* Mar */}
                  <div className="flex-1 flex flex-col items-center gap-1 group">
                     <div className="w-full flex justify-center gap-1 h-[70px]">
                        <div className="w-1/2 bg-sky-100 rounded-t-sm relative transition-all group-hover:bg-sky-200 h-[100%]" title="Billed: 7.1L" />
                        <div className="w-1/2 bg-sky-500 rounded-t-sm shadow-sm transition-all group-hover:bg-sky-600 h-[90%]" title="Collected: 6.4L" />
                     </div>
                     <span className="text-[9px] font-bold text-zinc-700 uppercase">Mar</span>
                  </div>
               </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-3">
               <button className="py-3 rounded-lg bg-white border border-zinc-200 shadow-sm text-[10px] font-bold text-zinc-700 hover:bg-zinc-50 transition flex flex-col items-center justify-center gap-1">
                  <IndianRupee className="w-4 h-4 text-sky-500 mb-0.5" /> Raise Invoice
               </button>
               <button className="py-3 rounded-lg bg-white border border-zinc-200 shadow-sm text-[10px] font-bold text-zinc-700 hover:bg-zinc-50 transition flex flex-col items-center justify-center gap-1">
                  <Download className="w-4 h-4 text-zinc-400 mb-0.5" /> Export Tally
               </button>
               <button className="py-3 rounded-lg bg-indigo-50 border border-indigo-100 shadow-sm text-[10px] font-bold text-indigo-700 hover:bg-indigo-100 transition flex flex-col items-center justify-center gap-1 shine-effect">
                  <Sparkles className="w-4 h-4 text-indigo-500 mb-0.5" /> AI Insights
               </button>
            </div>
         </div>

         {/* Fee Collection Table */}
         <div className="lg:col-span-2 rounded-xl p-0 bg-white border border-zinc-200 shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b border-zinc-100 bg-zinc-50 flex items-center justify-between">
               <h3 className="text-sm font-bold font-heading flex items-center text-zinc-900">
                  <IndianRupee className="w-4 h-4 text-amber-500 mr-2" />
                  Live Fee Collection Ledger
               </h3>
               <button className="text-[10px] font-bold px-3 py-1.5 rounded-md uppercase bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50 transition shadow-sm">
                  Send Mass Reminders
               </button>
            </div>
            
            <div className="overflow-x-auto flex-1">
            <table className="w-full text-xs text-left text-zinc-600">
               <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100 uppercase tracking-wider text-[10px] font-bold text-zinc-400">
                     <th className="py-3 px-4">Student</th>
                     <th className="py-3 px-4">Course</th>
                     <th className="py-3 px-4">Total Fee</th>
                     <th className="py-3 px-4">Paid</th>
                     <th className="py-3 px-4">Outstanding</th>
                     <th className="py-3 px-4">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-zinc-100 font-medium bg-white">
                  {[
                     { name: "Aryan Kapoor", crs: "CPL", tot: "₹8,50,000", paid: "₹8,50,000", out: "₹0", st: "✅ Cleared", stC: "bg-green-50 text-green-700", rC: "" },
                     { name: "Sneha Gupta", crs: "CPL", tot: "₹8,50,000", paid: "₹6,50,000", out: "₹2,00,000", st: "⚠ Partial", stC: "bg-amber-50 text-amber-700 font-bold", rC: "bg-amber-50/20" },
                     { name: "Vikram Singh", crs: "PPL", tot: "₹4,20,000", paid: "₹2,80,000", out: "₹1,40,000", st: "⚠ Partial", stC: "bg-amber-50 text-amber-700 font-bold", rC: "bg-amber-50/20" },
                     { name: "Priya Nair", crs: "CPL", tot: "₹8,50,000", paid: "₹8,50,000", out: "₹0", st: "✅ Cleared", stC: "bg-green-50 text-green-700", rC: "" },
                     { name: "Rohan Joshi", crs: "CPL", tot: "₹8,50,000", paid: "₹4,00,000", out: "₹4,50,000", st: "🔴 Default", stC: "bg-red-50 text-red-700 font-bold", rC: "bg-red-50/30" },
                  ].map((s, i) => (
                     <tr key={i} className={`hover:bg-slate-50 transition-colors ${s.rC}`}>
                        <td className="py-4 px-4 font-bold text-zinc-800">{s.name}</td>
                        <td className="py-4 px-4 font-mono text-zinc-500">{s.crs}</td>
                        <td className="py-4 px-4 font-mono">{s.tot}</td>
                        <td className="py-4 px-4 font-mono text-sky-600">{s.paid}</td>
                        <td className={`py-4 px-4 font-mono font-bold ${s.out !== '₹0' ? 'text-amber-600' : 'text-zinc-400'}`}>{s.out}</td>
                        <td className="py-4 px-4"><span className={`px-2 py-1 rounded-md text-[10px] whitespace-nowrap ${s.stC}`}>{s.st}</span></td>
                     </tr>
                  ))}
               </tbody>
            </table>
            </div>
         </div>

      </div>
    </div>
  );
}
