import { useState, useEffect } from "react"
import { Plane, AlertCircle, CheckCircle, Activity, CalendarDays } from "lucide-react"

function useLiveDate() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function formatDateUpper(date: Date) {
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
}

function getWeekDays(date: Date) {
  const day = date.getDay(); // 0=Sun
  const monday = new Date(date);
  monday.setDate(date.getDate() - ((day + 6) % 7));
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return `${days[i]} ${d.getDate()}`;
  });
}

export function DashboardCFI() {
  const now = useLiveDate();
  const weekDays = getWeekDays(now);
  return (
    <div className="w-full h-full text-zinc-900 p-6 overflow-y-auto hide-scrollbar flex flex-col gap-6 bg-white border-2 border-zinc-200 shadow-sm rounded-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h2 className="text-2xl font-extrabold font-heading text-zinc-900 tracking-tight">Chief Flight Instructor (CFI) Auth</h2>
            <p className="text-sm text-zinc-500 font-medium">Flight Authorization & Scheduling Oversight</p>
         </div>
         <div className="flex gap-2">
           <span className="px-4 py-2 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200 flex items-center gap-2 shadow-sm">
              <CheckCircle className="w-4 h-4" /> Published Roster Active
           </span>
           <button className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50 transition shadow-sm">
              Request Leave
           </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Today's Flying Programme */}
         <div className="lg:col-span-2 rounded-xl p-0 bg-white border border-zinc-200 shadow-sm flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-zinc-100 bg-zinc-50">
               <h3 className="text-sm font-bold font-heading flex items-center text-zinc-900">
                  <Activity className="w-4 h-4 text-sky-500 mr-2" />
                  Today's Flying Programme — {formatDateUpper(now)}
               </h3>
               <div className="flex gap-2">
                 <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-green-100 text-green-700 border border-green-200">PUBLISHED</span>
                 <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-sky-100 text-sky-700 border border-sky-200">AIRE GENERATED</span>
               </div>
            </div>

            <table className="w-full text-xs text-left text-zinc-600">
               <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100 uppercase tracking-wider text-[10px] font-bold text-zinc-400">
                     <th className="py-3 px-4">Sortie</th>
                     <th className="py-3 px-4">Time</th>
                     <th className="py-3 px-4">Student</th>
                     <th className="py-3 px-4">Instructor</th>
                     <th className="py-3 px-4">Aircraft</th>
                     <th className="py-3 px-4">Exercise</th>
                     <th className="py-3 px-4">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-zinc-100 font-medium bg-white">
                  {[
                    { id: "001", time: "06:30", stu: "Aryan Kapoor", inst: "Capt. Sharma", ac: "VT-SKY", ex: "Ex. 12 — Stalls", st: "✅ COMPLETE", stC: "bg-green-50 text-green-700" },
                    { id: "002", time: "07:15", stu: "Sneha Gupta", inst: "Capt. Mehta", ac: "VT-SNA", ex: "Ex. 08 — Circuit", st: "✅ COMPLETE", stC: "bg-green-50 text-green-700" },
                    { id: "003", time: "08:00", stu: "Vikram Singh", inst: "Capt. Verma", ac: "VT-NWA", ex: "Ex. 15 — NAV", st: "🔵 IN PROGRESS", stC: "bg-blue-50 text-blue-700 border border-blue-100 animate-pulse font-bold" },
                    { id: "004", time: "08:45", stu: "Priya Nair", inst: "Capt. Sharma", ac: "VT-SKY", ex: "Ex. 06 — Flapless", st: "⏰ SCHEDULED", stC: "bg-zinc-100 text-zinc-600" },
                    { id: "005", time: "09:30", stu: "Rohan Joshi", inst: "Capt. Mehta", ac: "VT-SHD", ex: "Ex. 11 — Solo Consol", st: "⏰ SCHEDULED", stC: "bg-zinc-100 text-zinc-600" },
                  ].map((s, i) => (
                     <tr key={i} className={`hover:bg-slate-50 transition-colors ${i === 2 ? 'bg-blue-50/20' : ''}`}>
                        <td className="py-3 px-4 font-mono font-bold text-zinc-900">{s.id}</td>
                        <td className="py-3 px-4 font-mono text-zinc-500">{s.time}</td>
                        <td className="py-3 px-4 font-bold text-zinc-800">{s.stu}</td>
                        <td className="py-3 px-4 text-zinc-600">{s.inst}</td>
                        <td className="py-3 px-4 font-bold text-sky-600">{s.ac}</td>
                        <td className="py-3 px-4 truncate max-w-[120px]" title={s.ex}>{s.ex}</td>
                        <td className="py-3 px-4">
                           <span className={`px-2 py-1 rounded-md text-[10px] whitespace-nowrap ${s.stC}`}>{s.st}</span>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* Go/No-Go Status Panel */}
         <div className="rounded-xl p-0 bg-white border border-zinc-200 shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b border-zinc-100 bg-sky-50">
               <h3 className="text-sm font-bold font-heading flex items-center text-sky-900">
                  <Plane className="w-4 h-4 mr-2" />
                  Upcoming Dispatch: 004
               </h3>
               <p className="text-xs text-sky-700 mt-1 font-medium">Pre-Flight Go/No-Go Checklist</p>
            </div>

            <div className="p-5 flex-1 overflow-y-auto bg-white">
               <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                     <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                     <div>
                        <p className="text-xs font-bold text-zinc-900">Aircraft Serviceability (VT-SKY)</p>
                        <p className="text-[10px] text-zinc-500">Released by Line Maintenance</p>
                     </div>
                  </li>
                  <li className="flex items-start gap-3">
                     <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                     <div>
                        <p className="text-xs font-bold text-zinc-900">Fuel: 42L / Req: 30L</p>
                        <p className="text-[10px] text-zinc-500">Endurance: 2h 15m</p>
                     </div>
                  </li>
                  <li className="flex items-start gap-3">
                     <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                     <div>
                        <p className="text-xs font-bold text-zinc-900">Student Medical Valid</p>
                        <p className="text-[10px] text-zinc-500">Priya Nair - Class II Valid</p>
                     </div>
                  </li>
                  <li className="flex items-start gap-3">
                     <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                     <div>
                        <p className="text-xs font-bold text-zinc-900">Instructor Duty Time</p>
                        <p className="text-[10px] text-zinc-500">1h 45m of 6h DGCA limit</p>
                     </div>
                  </li>
                  <li className="flex items-start gap-3">
                     <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                     <div>
                        <p className="text-xs font-bold text-zinc-900">Weather: VFR Conditions</p>
                        <p className="text-[10px] text-zinc-500">Taf: 21015G25KT 9999 SCT030</p>
                     </div>
                  </li>
                  <li className="flex items-start gap-3">
                     <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                     <div>
                        <p className="text-xs font-bold text-zinc-900">Student SPL Validity</p>
                        <p className="text-[10px] text-amber-600 font-semibold">Valid — Expires in 12 days</p>
                     </div>
                  </li>
                  <li className="flex items-start gap-3">
                     <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                     <div>
                        <p className="text-xs font-bold text-zinc-900">Weight & Balance / NOTAMs</p>
                        <p className="text-[10px] text-zinc-500">Within limits. No NOTAMs affecting route.</p>
                     </div>
                  </li>
               </ul>

               <div className="mt-6 pt-6 border-t border-zinc-100 flex flex-col items-center">
                  <div className="text-3xl font-black font-heading tracking-widest text-green-500 drop-shadow-sm mb-2">
                     GO
                  </div>
                  <p className="text-[10px] text-zinc-400 text-center font-mono">
                     Authorised by: Capt. Sharma (CFI)<br />
                     <span className="text-zinc-900">Digital Signature Validated</span>
                  </p>
                  <button className="w-full mt-4 py-2.5 bg-zinc-900 text-white font-bold rounded-lg text-xs shadow-md shadow-zinc-900/10 hover:-translate-y-0.5 transition hover:shadow-lg hover:shadow-zinc-900/20 active:translate-y-0">
                     Authorize Dispatch
                  </button>
               </div>
            </div>
         </div>

         {/* Booking Calendar */}
         <div className="lg:col-span-3 rounded-xl p-0 bg-white border border-zinc-200 shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b border-zinc-100 bg-zinc-50">
               <h3 className="text-sm font-bold font-heading flex items-center text-zinc-900">
                  <CalendarDays className="w-4 h-4 text-sky-500 mr-2" />
                  Flight Training Simulator Bookings
               </h3>
            </div>
            <div className="p-6 overflow-x-auto bg-white">
               <div className="grid grid-cols-7 gap-2 min-w-[700px]">
                 {weekDays.map((day, i) => (
                    <div key={i} className="flex flex-col gap-2">
                       <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider text-center">{day}</span>
                       <div className={`rounded-lg p-2 text-xs border border-zinc-200 ${i === 2 || i === 4 ? 'bg-sky-50 text-sky-800 border-sky-200' : 'bg-slate-50 text-zinc-400'} text-center flex flex-col gap-1 min-h-[4rem] justify-center transition hover:border-sky-300 cursor-pointer`}>
                          {i === 2 && <><span className="font-bold">A320 FTD</span><span>08:00 - 12:00</span></>}
                          {i === 4 && <><span className="font-bold">C172 FNPT II</span><span>14:00 - 16:00</span></>}
                          {i !== 2 && i !== 4 && <span>Available</span>}
                       </div>
                    </div>
                 ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
