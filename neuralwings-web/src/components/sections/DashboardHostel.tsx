import { Building2, Users, CheckCircle, Wrench, Plus } from "lucide-react"

export function DashboardHostel() {
  const rooms = Array.from({ length: 42 }).map((_, i) => ({
     num: `${101 + i + (Math.floor(i/14) * 85)}`,
     status: Math.random() > 0.3 ? (Math.random() > 0.1 ? 'OCCUPIED' : 'MAINTENANCE') : 'VACANT',
     occupant: Math.random() > 0.5 ? 'A. Singh' : 'D. Patel'
  }));

  return (
    <div className="w-full h-full p-3 sm:p-6 overflow-y-auto hide-scrollbar flex flex-col gap-4 sm:gap-6 bg-white border-2 border-zinc-200 shadow-sm rounded-2xl">
      
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-xl font-bold font-heading text-zinc-900">Hostel Rooms</h2>
            <p className="text-xs text-zinc-500">Manage room inventory and cadet accommodation</p>
         </div>
         <button className="px-4 py-2 bg-blue-600 text-zinc-900 rounded-lg text-xs font-semibold hover:bg-blue-700 flex items-center gap-1 transition">
            <Plus className="w-4 h-4" /> Add Room
         </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Rooms", val: "42", icon: Building2, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Occupied", val: "29", icon: Users, color: "text-green-600", bg: "bg-green-50" },
          { label: "Vacant", val: "9", icon: CheckCircle, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Under Maintenance", val: "4", icon: Wrench, color: "text-red-600", bg: "bg-red-50" },
        ].map((s, i) => (
          <div key={i} className="bg-transparent p-4 rounded-xl border border-zinc-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-zinc-500 mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-zinc-900">{s.val}</p>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${s.bg}`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 bg-transparent border border-zinc-200 rounded-xl shadow-sm p-3 sm:p-6 flex flex-col">
         <div className="flex items-center gap-2 mb-6">
            <Building2 className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-zinc-900">Room Occupancy Grid</h3>
         </div>

         <div className="grid grid-cols-4 md:grid-cols-7 gap-3 mb-6">
            {rooms.map((r, i) => (
               <div key={i} className={`rounded-xl p-3 border-2 text-center transition-all ${
                 r.status === 'OCCUPIED' ? 'bg-green-50 border-green-400' :
                 r.status === 'MAINTENANCE' ? 'bg-amber-50 border-amber-400' : 'bg-white/50 border-white/50'
               }`}>
                 <p className={`font-mono font-bold text-sm ${
                   r.status === 'OCCUPIED' ? 'text-green-700' :
                   r.status === 'MAINTENANCE' ? 'text-amber-700' : 'text-zinc-500'
                 }`}>{r.num}</p>
                 <p className={`text-[10px] mt-1 truncate ${
                   r.status === 'OCCUPIED' ? 'text-green-600/80':
                   r.status === 'MAINTENANCE' ? 'text-amber-600/80 uppercase': 'text-zinc-500 uppercase'
                 }`}>
                   {r.status === 'OCCUPIED' ? r.occupant : r.status === 'VACANT' ? 'Vacant' : 'Maint'}
                 </p>
               </div>
            ))}
         </div>

         <div className="pt-4 border-t border-white/50 flex gap-6 mt-auto">
            <span className="flex items-center gap-2 text-xs text-zinc-500">
               <span className="w-3 h-3 rounded bg-green-50 border-2 border-green-400" /> Occupied
            </span>
            <span className="flex items-center gap-2 text-xs text-zinc-500">
               <span className="w-3 h-3 rounded bg-white/50 border-2 border-white/50" /> Vacant
            </span>
            <span className="flex items-center gap-2 text-xs text-zinc-500">
               <span className="w-3 h-3 rounded bg-amber-50 border-2 border-amber-400" /> Maintenance
            </span>
         </div>
      </div>

    </div>
  );
}
