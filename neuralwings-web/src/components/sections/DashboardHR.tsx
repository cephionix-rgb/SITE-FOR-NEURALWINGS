import { Users, UserCheck, Clock, UserPlus, Search } from "lucide-react"

export function DashboardHR() {
  return (
    <div className="w-full h-full p-3 sm:p-6 overflow-y-auto hide-scrollbar flex flex-col gap-4 sm:gap-6 bg-white border-2 border-zinc-200 shadow-sm rounded-2xl">
      
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-xl font-bold font-heading text-zinc-900">Human Resources & Admin</h2>
            <p className="text-xs text-zinc-500">Personnel, attendance, and onboarding</p>
         </div>
         <button className="px-4 py-2 bg-blue-600 text-zinc-900 rounded-lg text-xs font-semibold hover:bg-blue-700 transition">
            Add Employee
         </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Employees", val: "142", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Active Today", val: "128", icon: UserCheck, color: "text-green-600", bg: "bg-green-50" },
          { label: "On Leave", val: "14", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "New This Month", val: "6", icon: UserPlus, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((s, i) => (
          <div key={i} className="bg-transparent p-4 rounded-xl border border-zinc-200 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${s.bg}`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500">{s.label}</p>
              <p className="text-2xl font-bold text-zinc-900">{s.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 bg-transparent border border-zinc-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
         <div className="p-4 border-b border-white/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <Users className="w-5 h-5 text-blue-500" />
               <h3 className="font-semibold text-zinc-900">Employee Register</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
               <div className="relative">
                  <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" placeholder="Search employees..." className="pl-9 pr-4 py-1.5 text-sm border border-zinc-200 rounded-lg bg-white/50 text-zinc-900 focus:outline-none w-full sm:w-auto" />
               </div>
               <select className="px-3 py-1.5 text-sm border border-zinc-200 rounded-lg bg-white/50 text-zinc-600 outline-none">
                  <option>All Departments</option>
                  <option>Flight Operations</option>
                  <option>Maintenance</option>
               </select>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-zinc-500 uppercase bg-white/50 border-b border-white/50">
                <tr>
                  <th className="px-6 py-3 font-medium">Employee ID</th>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Designation</th>
                  <th className="px-6 py-3 font-medium">Department</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Join Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                 {[
                   { id: "EMP-1042", name: "Capt. A. Verma", desig: "Chief Flight Instructor", dept: "Flight Operations", sts: "ACTIVE", join: "2018-04-12" },
                   { id: "EMP-1089", name: "R. Sharma", desig: "Chief Engineer (AME)", dept: "Maintenance", sts: "ACTIVE", join: "2019-11-01" },
                   { id: "EMP-1102", name: "S. Patel", desig: "HR Officer", dept: "Administration", sts: "ON LEAVE", join: "2021-02-15" },
                   { id: "EMP-1145", name: "M. Singh", desig: "Ground Instructor", dept: "Training", sts: "ACTIVE", join: "2022-08-20" },
                 ].map((emp, i) => (
                    <tr key={i} className="hover:bg-zinc-50 cursor-pointer">
                      <td className="px-6 py-4 font-mono text-blue-600 font-medium">{emp.id}</td>
                      <td className="px-6 py-4 font-medium text-zinc-900">{emp.name}</td>
                      <td className="px-6 py-4 text-zinc-500">{emp.desig}</td>
                      <td className="px-6 py-4 text-zinc-500">{emp.dept}</td>
                      <td className="px-6 py-4">
                         <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${
                           emp.sts === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                         }`}>
                           {emp.sts}
                         </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-zinc-500">{emp.join}</td>
                    </tr>
                 ))}
              </tbody>
            </table>
         </div>
      </div>

    </div>
  );
}
