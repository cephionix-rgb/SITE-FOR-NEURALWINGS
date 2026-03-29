import { CloudSun, Users, Plane, ShieldAlert, BarChart3, ChevronRight, AlertTriangle, CheckCircle } from "lucide-react"

export function DashboardDirector() {
  return (
    <div className="w-full h-full text-zinc-900 p-6 overflow-y-auto hide-scrollbar flex flex-col gap-6">
      
      {/* ── SECTION 1: Weather & Branch AIRE Bar ── */}
      <div className="rounded-xl p-4 bg-white/90 border border-zinc-200 shadow-sm border-l-4 border-l-green-500">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-sm font-bold font-heading text-zinc-900">
                AIRE — AI Autonomous Rostering Engine
              </h2>
              <div className="flex items-center gap-1 mt-1">
                 <button className="px-2.5 py-1 rounded-md text-xs font-bold transition-colors bg-sky-500 text-white shadow-sm hover:bg-sky-600">
                    VIKR (Main Base)
                 </button>
                 <button className="px-2.5 py-1 rounded-md text-xs font-bold transition-colors bg-transparent text-zinc-500 hover:bg-zinc-100">
                    VOTB (Satellite)
                 </button>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 font-bold text-green-600 bg-green-50 px-2 rounded-md">
                  <CloudSun className="w-4 h-4" /> VFR GO
                </span>
                <span className="flex items-center gap-1 text-zinc-600 font-medium font-sans">
                  210°/12kt G18
                </span>
                <span className="flex items-center gap-1 text-zinc-600 font-medium font-sans">
                  Vis: +10km
                </span>
                <span className="flex items-center gap-1 text-zinc-600 font-medium font-sans">
                  QNH: 1012hPa
                </span>
              </div>
              <p className="font-mono text-[10px] leading-tight text-zinc-500 bg-zinc-50 p-1.5 rounded border border-zinc-100 mt-1">
                VIKR 280630Z 21012G18KT 9999 FEW030 SCT100 24/16 Q1012 NOSIG
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 bg-amber-50 text-amber-600 border border-amber-200 shadow-sm hover:bg-amber-100 hover:text-amber-700 transition">
              <AlertTriangle className="w-3.5 h-3.5" />
              1 NOTAM Blocking
            </button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-zinc-200 text-zinc-600 shadow-sm hover:bg-zinc-50 transition">
              Refresh AIRE
            </button>
          </div>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Aircraft", val: "6", sub: "4 Svc / 2 Maint", col: "text-blue-500", bg: "bg-blue-50", icon: Plane },
          { title: "Active Students", val: "47", sub: "38 Flying / 9 Ground", col: "text-amber-500", bg: "bg-amber-50", icon: Users },
          { title: "Today's Sorties", val: "12", sub: "8 Completed / 4 Sched", col: "text-sky-500", bg: "bg-sky-50", icon: BarChart3 },
          { title: "Compliance Score", val: "94%", sub: "2 Items Due", col: "text-green-500", bg: "bg-green-50", icon: ShieldAlert },
        ].map((k, i) => (
          <div key={i} className="rounded-xl p-5 bg-white border border-zinc-200 shadow-sm hover:-translate-y-1 transition-transform duration-300 group">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 rounded-lg ${k.bg}`}>
                <k.icon className={`w-4 h-4 ${k.col}`} />
              </div>
              <span className="text-xs font-semibold text-zinc-600 uppercase tracking-wide">{k.title}</span>
            </div>
            <p className="text-3xl font-extrabold font-heading text-zinc-900 tracking-tight">{k.val}</p>
            <p className="text-[11px] font-semibold text-zinc-500 mt-1">{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Fleet Status Table */}
        <div className="lg:col-span-2 rounded-xl p-0 bg-white border border-zinc-200 flex flex-col overflow-hidden shadow-sm">
          <div className="flex items-center justify-between p-4 border-b border-zinc-100 bg-zinc-50/50">
             <h3 className="text-sm font-bold font-heading flex items-center text-zinc-900">
               <Plane className="w-4 h-4 text-sky-500 mr-2" />
               Live Fleet Status
             </h3>
             <span className="text-[10px] bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
               Real-Time Data
             </span>
          </div>

          <table className="w-full text-xs text-left text-zinc-600">
             <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50 uppercase tracking-wider text-[10px] font-bold text-zinc-500">
                   <th className="py-3 px-4">Aircraft</th>
                   <th className="py-3 px-4">Type</th>
                   <th className="py-3 px-4">Status</th>
                   <th className="py-3 px-4">Hrs Since Service</th>
                   <th className="py-3 px-4">Next Maintenance</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-zinc-100 bg-white font-sans font-medium">
                {[
                  { reg: "VT-SKY", type: "C-152", status: "Serviceable", stC: "bg-green-100 text-green-700", hrs: "42:30", next: "07 Apr 2026", rowC: "" },
                  { reg: "VT-SNA", type: "C-152", status: "Serviceable", stC: "bg-green-100 text-green-700", hrs: "38:15", next: "15 Apr 2026", rowC: "" },
                  { reg: "VT-SMR", type: "C-172", status: "AOG - Maint.", stC: "bg-amber-100 text-amber-700", hrs: "—", next: "30 Mar 2026", rowC: "bg-orange-50/30" },
                  { reg: "VT-SHD", type: "C-172", status: "Serviceable", stC: "bg-green-100 text-green-700", hrs: "28:00", next: "22 Apr 2026", rowC: "" },
                  { reg: "VT-NWA", type: "DA-40", status: "Serviceable", stC: "bg-green-100 text-green-700", hrs: "18:45", next: "10 Apr 2026", rowC: "" },
                  { reg: "VT-NWB", type: "DA-40", status: "100hr Overdue", stC: "bg-red-100 text-red-700", hrs: "—", next: "OVERDUE", rowC: "bg-red-50" },
                ].map((c, i) => (
                   <tr key={i} className={`hover:bg-zinc-50 cursor-pointer transition-colors ${c.rowC}`}>
                      <td className="py-3 px-4 font-bold text-zinc-900 border-l-2 border-transparent hover:border-sky-500">{c.reg}</td>
                      <td className="py-3 px-4 text-zinc-500">{c.type}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${c.stC}`}>{c.status}</span>
                      </td>
                      <td className="py-3 px-4 font-mono text-zinc-600">{c.hrs}</td>
                      <td className={`py-3 px-4 ${c.next === 'OVERDUE' ? 'text-red-600 font-bold' : ''}`}>{c.next}</td>
                   </tr>
                ))}
             </tbody>
          </table>
        </div>

        {/* Live Alerts Panel */}
        <div className="rounded-xl p-0 bg-white border border-zinc-200 flex flex-col shadow-sm">
          <div className="p-4 border-b border-zinc-100 bg-zinc-50/50">
            <h3 className="text-sm font-bold font-heading flex items-center text-zinc-900">
              <AlertTriangle className="w-4 h-4 text-amber-500 mr-2" />
              Recent Alerts
            </h3>
          </div>
          <div className="p-4 flex-1 overflow-y-auto space-y-3 bg-white">
             <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <p className="text-[10px] font-bold text-red-700 uppercase tracking-widest">CRITICAL</p>
                  <p className="text-[10px] text-zinc-500 ml-auto font-medium">2h ago</p>
                </div>
                <p className="text-xs font-semibold text-zinc-900">VT-NWB 100hr check overdue</p>
             </div>
             
             <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                <div className="flex items-center gap-1.5 mb-1">
                  <AlertTriangle className="w-3 h-3 text-amber-600" />
                  <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest">HIGH</p>
                  <p className="text-[10px] text-zinc-500 ml-auto font-medium">3h ago</p>
                </div>
                <p className="text-xs font-semibold text-zinc-900">Student Vikram Singh — medical due in 5 days</p>
             </div>

             <div className="p-3 bg-sky-50 border border-sky-100 rounded-lg">
                <div className="flex items-center gap-1.5 mb-1">
                  <CheckCircle className="w-3 h-3 text-sky-600" />
                  <p className="text-[10px] font-bold text-sky-700 uppercase tracking-widest">INFO</p>
                  <p className="text-[10px] text-zinc-500 ml-auto font-medium">08:15</p>
                </div>
                <p className="text-xs font-semibold text-zinc-900">Today's flying programme published by CFI</p>
             </div>

             <div className="p-3 bg-zinc-50 border border-zinc-100 rounded-lg">
                <div className="flex items-center gap-1.5 mb-1">
                  <CheckCircle className="w-3 h-3 text-zinc-400" />
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">INFO</p>
                  <p className="text-[10px] text-zinc-400 ml-auto font-medium">07:30</p>
                </div>
                <p className="text-xs font-semibold text-zinc-700">3 new fee payments received — ₹1,82,500</p>
             </div>
          </div>
          <div className="p-3 border-t border-zinc-100 bg-zinc-50/50">
            <button className="w-full py-2 text-xs font-bold bg-white border border-zinc-200 hover:bg-zinc-50 rounded-lg flex justify-center items-center text-zinc-700 transition">
              View All Clearances <ChevronRight className="w-3 h-3 ml-1" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
