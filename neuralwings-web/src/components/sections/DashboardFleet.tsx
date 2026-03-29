import { Plane, Wrench, AlertOctagon, CheckCircle2, Search } from "lucide-react"

export function DashboardFleet() {
  return (
    <div className="w-full h-full p-6 overflow-y-auto hide-scrollbar flex flex-col gap-6 bg-white border-2 border-zinc-200 shadow-sm rounded-2xl">
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-xl font-bold font-heading text-zinc-900">Fleet Management</h2>
            <p className="text-xs text-zinc-500">Aircraft register, utilization, and maintenance</p>
         </div>
         <button className="px-4 py-2 bg-accent-gold text-white rounded-lg text-xs font-semibold hover:opacity-90 transition">
            Add Aircraft
         </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Aircraft", val: "18", icon: Plane, color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
          { label: "Serviceable", val: "14", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50 border-green-100" },
          { label: "AOG", val: "1", icon: AlertOctagon, color: "text-red-600", bg: "bg-red-50 border-red-100" },
          { label: "In Maintenance", val: "3", icon: Wrench, color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
        ].map((s, i) => (
          <div key={i} className={`rounded-xl p-4 border bg-transparent shadow-sm flex items-center justify-between`}>
             <div>
               <p className="text-xs font-medium text-zinc-500 mb-1">{s.label}</p>
               <p className="text-2xl font-bold text-zinc-900">{s.val}</p>
             </div>
             <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${s.bg}`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
             </div>
          </div>
        ))}
      </div>

      <div className="flex-1 bg-transparent border border-zinc-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/50 flex items-center justify-between">
           <h3 className="font-semibold text-zinc-900">Aircraft Register</h3>
           <div className="relative">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search registration..." className="pl-9 pr-4 py-1.5 text-sm border border-zinc-200 rounded-lg bg-white/50 text-zinc-900 focus:outline-none focus:border-blue-500" />
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-500 uppercase bg-white/50 border-b border-white/50">
              <tr>
                <th className="px-6 py-3 font-medium">Registration</th>
                <th className="px-6 py-3 font-medium">Model</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">TTAF Hours</th>
                <th className="px-6 py-3 font-medium text-right">Hrs to 50hr</th>
                <th className="px-6 py-3 font-medium text-right">Hrs to 100hr</th>
                <th className="px-6 py-3 font-medium text-center">Open Snags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
               {[
                 { reg: "VT-NWA", mod: "Cessna 152", sts: "SERVICEABLE", ttaf: "4,250", to50: "12.4 hrs", to100: "62.4 hrs", snag: 0 },
                 { reg: "VT-NWB", mod: "Cessna 172", sts: "AOG", ttaf: "1,890", to50: "4.1 hrs", to100: "54.1 hrs", snag: 2 },
                 { reg: "VT-NWC", mod: "Cessna 172", sts: "SERVICEABLE", ttaf: "5,120", to50: "29.8 hrs", to100: "79.8 hrs", snag: 1 },
                 { reg: "VT-NWD", mod: "Diamond DA42", sts: "MAINTENANCE", ttaf: "840", to50: "0.0 hrs", to100: "50.0 hrs", snag: 0 },
               ].map((ac, i) => (
                  <tr key={i} className="hover:bg-white/50/50">
                    <td className="px-6 py-3.5 font-mono font-semibold text-blue-600">{ac.reg}</td>
                    <td className="px-6 py-3.5 text-zinc-600">{ac.mod}</td>
                    <td className="px-6 py-3.5">
                       <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${
                         ac.sts === "SERVICEABLE" ? "bg-green-100 text-green-700" :
                         ac.sts === "AOG" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                       }`}>
                         {ac.sts}
                       </span>
                    </td>
                    <td className="px-6 py-3.5 font-mono text-zinc-500 text-right">{ac.ttaf}</td>
                    <td className="px-6 py-3.5 font-mono text-zinc-500 text-right">{ac.to50}</td>
                    <td className="px-6 py-3.5 font-mono text-zinc-500 text-right">{ac.to100}</td>
                    <td className="px-6 py-3.5 text-center">
                       <span className={`font-mono font-bold ${ac.snag > 0 ? "text-amber-600" : "text-zinc-500"}`}>
                         {ac.snag}
                       </span>
                    </td>
                  </tr>
               ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
