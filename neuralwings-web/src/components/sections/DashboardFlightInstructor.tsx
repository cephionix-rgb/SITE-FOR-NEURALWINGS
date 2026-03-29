import { motion } from 'framer-motion';
import { Plane, Star, Award, CheckCircle, CalendarDays, Clock, LogOut } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const TIME_SLOTS = ['06:00', '07:30', '09:00', '10:30', '12:00', '14:00'];

const bookings: Record<string, { student: string; ex: string; ac: string; color: string }> = {
  'Mon-06:00': { student: 'A. Sharma', ex: 'Ex 4 - Effects', ac: 'VT-SKY', color: 'bg-blue-100 border-blue-400 text-blue-800' },
  'Mon-09:00': { student: 'N. Gupta', ex: 'Solo Check', ac: 'VT-SNA', color: 'bg-amber-100 border-amber-400 text-amber-800' },
  'Tue-07:30': { student: 'R. Kumar', ex: 'Ex 14 - Turns', ac: 'VT-NWA', color: 'bg-green-100 border-green-400 text-green-800' },
  'Tue-10:30': { student: 'K. Iyer', ex: 'Ex 11 - Stalls', ac: 'VT-NWB', color: 'bg-blue-100 border-blue-400 text-blue-800' },
  'Wed-06:00': { student: 'A. Sharma', ex: 'Ex 15 - Nav', ac: 'VT-SKY', color: 'bg-purple-100 border-purple-400 text-purple-800' },
  'Wed-14:00': { student: 'D. Bose', ex: 'Ex 8 - Climb', ac: 'VT-NWC', color: 'bg-green-100 border-green-400 text-green-800' },
  'Thu-09:00': { student: 'M. Ali', ex: 'Ex 21 - Multi', ac: 'VT-NWD', color: 'bg-red-100 border-red-400 text-red-800' },
  'Fri-07:30': { student: 'N. Gupta', ex: 'Ex 18 - X-Country', ac: 'VT-SNA', color: 'bg-amber-100 border-amber-400 text-amber-800' },
  'Sat-06:00': { student: 'R. Kumar', ex: 'Ex 16 - Circuits', ac: 'VT-NWA', color: 'bg-blue-100 border-blue-400 text-blue-800' },
};

export function DashboardFlightInstructor() {
  return (
    <div className="w-full h-full text-zinc-900 p-6 overflow-y-auto hide-scrollbar flex flex-col gap-6 bg-white border-2 border-zinc-200 shadow-md rounded-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading font-bold text-2xl flex items-center gap-2">
            <Plane className="w-6 h-6 text-blue-500" />
            Flight Instructor Portal
          </h3>
          <p className="text-font-secondary font-sans text-sm">Capt. Vikram Singh</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-50 border border-amber-300 text-amber-700 text-xs font-bold hover:bg-amber-100 transition shadow-sm">
          <LogOut className="w-3.5 h-3.5" /> Apply Leave
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* My Schedule */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-zinc-200 rounded-xl flex flex-col overflow-hidden p-5 shadow-sm">
          <h4 className="font-heading font-bold text-zinc-900 mb-4 border-b border-zinc-200 pb-2">My Sorties Today</h4>
          <div className="space-y-4 font-sans text-sm">
            <div className="p-4 bg-blue-500/10 border border-blue-300 rounded-lg flex items-center justify-between">
              <div>
                <span className="font-bold text-zinc-900 mb-1">Cessna 172 • VT-SKY</span>
                <p className="text-font-secondary">Student: Aryan Sharma (Lesson 4 - Effects of Controls)</p>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-blue-600 block">08:00 IST</span>
                <span className="text-[10px] uppercase font-bold text-green-600">Cleared</span>
              </div>
            </div>
            <div className="p-4 bg-white border border-zinc-200 rounded-lg flex items-center justify-between opacity-70">
              <div>
                <span className="font-bold text-zinc-900 mb-1">Cessna 172 • VT-SNA</span>
                <p className="text-font-secondary">Student: Neha Gupta (Solo Check)</p>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-font-secondary block">11:30 IST</span>
                <span className="text-[10px] uppercase font-bold text-amber-500">Standby</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Authorizations & Grades */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white border border-zinc-200 rounded-xl flex flex-col overflow-hidden p-5 shadow-sm">
          <h4 className="font-heading font-bold text-zinc-900 mb-4 border-b border-zinc-200 pb-2">Instructor Authorizations</h4>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-zinc-50 border border-zinc-200 p-3 rounded-lg flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" />
              <span className="font-bold text-sm">C172 CFI</span>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 p-3 rounded-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-500" />
              <span className="font-bold text-sm">Instrument</span>
            </div>
          </div>

          <h4 className="font-heading font-bold text-zinc-900 mb-2 border-b border-zinc-200 pb-2">Pending Logbook Endorsements</h4>
          <div className="divide-y divide-zinc-200 font-sans">
            <div className="py-2 flex justify-between items-center hover:bg-zinc-50">
              <span className="text-sm">Ravi Kumar (Cross Country 150nm)</span>
              <button className="flex items-center gap-1 text-xs px-2 py-1 bg-green-500/10 text-green-700 border border-green-400 rounded hover:bg-green-100">
                <CheckCircle className="w-3 h-3" /> Sign
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Flight Training Calendar */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
        <div className="px-5 py-3 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-blue-500" />
            <h4 className="font-heading font-bold text-zinc-900">Flight Training Bookings — Week of 29 Mar 2026</h4>
          </div>
          <div className="flex items-center gap-3 text-xs font-medium text-zinc-500">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-blue-200 border border-blue-400 inline-block" /> Dual</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-amber-200 border border-amber-400 inline-block" /> Solo</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-green-200 border border-green-400 inline-block" /> X-Country</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="px-4 py-2 text-left font-semibold text-zinc-500 w-20 bg-zinc-50">
                  <Clock className="w-3 h-3 inline mr-1" />Time
                </th>
                {DAYS.map(day => (
                  <th key={day} className={`px-3 py-2 text-center font-bold text-zinc-700 bg-zinc-50 ${day === 'Tue' ? 'bg-blue-50 text-blue-700' : ''}`}>
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TIME_SLOTS.map((slot, si) => (
                <tr key={slot} className={`border-b border-zinc-100 ${si % 2 === 0 ? 'bg-white' : 'bg-zinc-50/50'}`}>
                  <td className="px-4 py-2 font-mono font-semibold text-zinc-400">{slot}</td>
                  {DAYS.map(day => {
                    const key = `${day}-${slot}`;
                    const booking = bookings[key];
                    return (
                      <td key={day} className="px-2 py-1.5 text-center">
                        {booking ? (
                          <div className={`rounded-md border px-2 py-1.5 text-left ${booking.color} cursor-pointer hover:opacity-90 transition`}>
                            <p className="font-bold truncate">{booking.student}</p>
                            <p className="text-[10px] truncate opacity-80">{booking.ex}</p>
                            <p className="text-[10px] font-mono opacity-70">{booking.ac}</p>
                          </div>
                        ) : (
                          <div className="h-12 rounded-md border border-dashed border-zinc-200 flex items-center justify-center text-zinc-300 hover:border-blue-300 hover:text-blue-400 cursor-pointer transition">
                            <span className="text-lg leading-none">+</span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
