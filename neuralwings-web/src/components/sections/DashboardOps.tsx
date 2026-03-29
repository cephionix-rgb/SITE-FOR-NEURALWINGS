import { Plane, ClipboardList, Fuel, AlertTriangle, FileText, CalendarDays, Brain, Loader2, CheckCircle2 } from "lucide-react"
import { useState, useEffect } from "react"

function useLiveDate() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function formatShortDate(date: Date) {
  return date.toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
}

function formatDayMonth(date: Date) {
  return date.toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short' });
}

export function DashboardOps() {
  const now = useLiveDate();
  const [rosterState, setRosterState] = useState<'idle' | 'loading' | 'done'>('idle');

  const handleGenerateRoster = () => {
    setRosterState('loading');
    setTimeout(() => setRosterState('done'), 2200);
    setTimeout(() => setRosterState('idle'), 5000);
  };

  return (
    <div className="w-full h-full text-zinc-900 p-6 overflow-y-auto hide-scrollbar flex flex-col gap-6 bg-white border-2 border-zinc-200 shadow-md rounded-2xl">
      
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-xl font-bold font-heading">Flight Operations Control</h2>
            <p className="text-xs text-font-muted">VIKR Base — {formatShortDate(now)}</p>
         </div>
         <div className="flex gap-2 items-center">
            <button
              onClick={handleGenerateRoster}
              disabled={rosterState !== 'idle'}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 border
                ${rosterState === 'idle' ? 'bg-accent-gold/10 text-accent-gold border-accent-gold/40 hover:bg-accent-gold/20' : ''}
                ${rosterState === 'loading' ? 'bg-accent-gold/10 text-accent-gold border-accent-gold/30 cursor-not-allowed' : ''}
                ${rosterState === 'done' ? 'bg-green-500/10 text-green-500 border-green-500/30 cursor-not-allowed' : ''}
              `}
            >
              {rosterState === 'idle' && <><Brain className="w-3.5 h-3.5" /> Generate Roster</>}
              {rosterState === 'loading' && <><Loader2 className="w-3.5 h-3.5 animate-spin" /> AIRE Generating…</>}
              {rosterState === 'done' && <><CheckCircle2 className="w-3.5 h-3.5" /> Roster Ready</>}
            </button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
               Live METAR & TAF
            </button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-50 border border-zinc-200 text-font-secondary">
               Refresh
            </button>
         </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="rounded-xl p-4 bg-transparent border border-zinc-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium mb-1 text-font-muted">Pending Debriefs</p>
              <p className="text-2xl font-bold font-heading text-amber-500">12</p>
              <p className="text-[10px] mt-1 text-font-muted">Waiting ops review</p>
            </div>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-amber-500/10">
              <ClipboardList className="w-4.5 h-4.5 text-amber-500" />
            </div>
          </div>
        </div>
        
        <div className="rounded-xl p-4 bg-transparent border border-zinc-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium mb-1 text-font-muted">Today's Sorties</p>
              <p className="text-2xl font-bold font-heading text-blue-400">42</p>
              <p className="text-[10px] mt-1 text-font-muted">Flying programme</p>
            </div>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-blue-500/10">
              <Plane className="w-4.5 h-4.5 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="rounded-xl p-4 bg-transparent border border-zinc-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium mb-1 text-font-muted">Fuel Level</p>
              <p className="text-2xl font-bold font-heading text-green-500">76%</p>
              <p className="text-[10px] mt-1 text-font-muted">AVGAS 100LL</p>
            </div>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-green-500/10">
              <Fuel className="w-4.5 h-4.5 text-green-500" />
            </div>
          </div>
        </div>

        <div className="rounded-xl p-4 bg-transparent border border-zinc-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium mb-1 text-font-muted">Active NOTAMs</p>
              <p className="text-2xl font-bold font-heading text-red-500">3</p>
              <p className="text-[10px] mt-1 text-font-muted">Restrictions active</p>
            </div>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-red-500/10">
              <AlertTriangle className="w-4.5 h-4.5 text-red-500" />
            </div>
          </div>
        </div>

        <div className="rounded-xl p-4 bg-transparent border border-zinc-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium mb-1 text-font-muted">Load & Trim Pending</p>
              <p className="text-2xl font-bold font-heading text-green-500">0</p>
              <p className="text-[10px] mt-1 text-font-muted">All sheets reviewed</p>
            </div>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-green-500/10">
              <FileText className="w-4.5 h-4.5 text-green-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Today's Flying Programme */}
        <div className="xl:col-span-2 rounded-xl overflow-hidden bg-transparent border border-zinc-200 flex flex-col">
          <div className="px-4 py-3 flex items-center justify-between border-b border-white/50">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-semibold font-heading">Today's Flying Programme</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-indigo-500/10 text-violet-400">
               {formatDayMonth(now)}
            </span>
          </div>
          <div className="divide-y divide-zinc-100 flex-1">
             {[
               { time: "06:00Z", student: "A. Sharma", instructor: "Capt. Verma", ac: "VT-NWA (C152)", ex: "Ex 14 - Steep Turns", status: "AIRBORNE", col: "bg-green-500", fg: "text-green-500" },
               { time: "07:30Z", student: "R. Kapoor", instructor: "Capt. Verma", ac: "VT-NWA (C152)", ex: "Ex 15 - Navigation", status: "SCHEDULED", col: "bg-blue-500", fg: "text-blue-500" },
               { time: "08:00Z", student: "S. Singh", instructor: "Solo", ac: "VT-NWB (C172)", ex: "Ex 18 - Solo X-Country", status: "WEATHER HOLD", col: "bg-amber-500", fg: "text-amber-500" },
               { time: "09:15Z", student: "M. Ali", instructor: "Capt. Rao", ac: "VT-NWD (DA42)", ex: "Ex 21 - Multi-Engine App", status: "SCHEDULED", col: "bg-blue-500", fg: "text-blue-500" }
             ].map((s, i) => (
                <div key={i} className="px-4 py-3 flex items-center gap-3 hover:bg-zinc-50 transition-colors cursor-pointer">
                  <div className="text-xs font-mono font-semibold w-12 shrink-0 text-violet-400">{s.time}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-zinc-900">{s.student}</p>
                    <p className="text-xs text-font-muted">{s.ex} · {s.instructor}</p>
                  </div>
                  <div className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-50 text-font-secondary border border-white/5">{s.ac}</div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${s.col}/10 ${s.fg}`}>
                     {s.status}
                  </span>
                </div>
             ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
           {/* Fuel Status Box */}
           <div className="rounded-xl overflow-hidden bg-transparent border border-zinc-200">
             <div className="px-4 py-3 flex items-center gap-2 border-b border-white/50 text-green-500">
               <Fuel className="w-4 h-4" />
               <span className="text-sm font-semibold font-heading text-zinc-900">Fuel Status</span>
             </div>
             <div className="p-4 space-y-4">
                 <div>
                   <div className="flex items-center justify-between mb-1.5">
                     <div>
                       <p className="text-xs font-semibold uppercase tracking-wide text-font-secondary">AVGAS 100LL</p>
                       <p className="text-[10px] text-font-muted">18,240 L / 24,000 L</p>
                     </div>
                     <span className="text-lg font-bold font-heading text-green-500">76%</span>
                   </div>
                   <div className="h-2 rounded-full bg-transparent/5">
                     <div className="h-full rounded-full transition-all w-[76%] bg-green-500" />
                   </div>
                 </div>
                 
                 <div>
                   <div className="flex items-center justify-between mb-1.5">
                     <div>
                       <p className="text-xs font-semibold uppercase tracking-wide text-font-secondary">JET A-1</p>
                       <p className="text-[10px] text-font-muted">2,100 L / 8,000 L</p>
                     </div>
                     <span className="text-lg font-bold font-heading text-amber-500">26%</span>
                   </div>
                   <div className="h-2 rounded-full bg-transparent/5">
                     <div className="h-full rounded-full transition-all w-[26%] bg-amber-500" />
                   </div>
                 </div>
             </div>
           </div>

           {/* Pending Debriefs Preview */}
           <div className="rounded-xl overflow-hidden bg-transparent border border-zinc-200 flex-1 flex flex-col">
             <div className="px-4 py-3 flex items-center justify-between border-b border-white/50">
               <div className="flex items-center gap-2">
                 <ClipboardList className="w-4 h-4 text-amber-500" />
                 <span className="text-sm font-semibold font-heading">Pending Debriefs</span>
               </div>
               <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500">
                 12 pending
               </span>
             </div>
             <div className="divide-y divide-zinc-100 flex-1">
                 <div className="px-4 py-3 hover:bg-zinc-50 cursor-pointer">
                   <div className="flex items-center justify-between">
                     <p className="text-sm font-semibold text-zinc-900">K. Iyer</p>
                     <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500">REVIEW</span>
                   </div>
                   <p className="text-xs mt-0.5 text-font-muted">Ex 11 - Stalls · 27 Oct</p>
                 </div>
                 <div className="px-4 py-3 hover:bg-zinc-50 cursor-pointer">
                   <div className="flex items-center justify-between">
                     <p className="text-sm font-semibold text-zinc-900">D. Bose</p>
                     <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500">REVIEW</span>
                   </div>
                   <p className="text-xs mt-0.5 text-font-muted">Ex 8 - Climbing · 27 Oct</p>
                 </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
