import { useState } from 'react';
import { Layout } from '../components/layout/Layout';

export function BookDemo() {
  const [submitted, setSubmitted] = useState(false);

  // PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL BELOW
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzftNNa8ebv3PGAXz_BBpOFndQVQMiri9gccyb3UCcOsJy46Hn6cQG777F_x_5ECIMCvA/exec";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = {
      name:     (form.elements.namedItem('name')     as HTMLInputElement).value,
      phone:    (form.elements.namedItem('phone')    as HTMLInputElement).value,
      email:    (form.elements.namedItem('email')    as HTMLInputElement).value,
      fto:      (form.elements.namedItem('fto')      as HTMLInputElement).value,
      location: (form.elements.namedItem('location') as HTMLInputElement).value,
      branches: (form.elements.namedItem('branches') as HTMLSelectElement).value,
    };

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
      });
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Submission failed. Please email us directly at cephionix@gmail.com");
    }
  };

  return (
    <Layout>
       <div className="min-h-screen pt-32 pb-20 flex items-center justify-center relative overflow-hidden bg-slate-50">
          
          {/* Premium Ambient Background */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-sky-300/30 animate-[float-blob_10s_ease-in-out_infinite] rounded-full blur-[140px] pointer-events-none z-0" />
          <div className="absolute bottom-0 right-1/4 w-[700px] h-[600px] bg-sky-200/40 animate-[float-blob_15s_ease-in-out_infinite] rounded-full blur-[150px] pointer-events-none z-0" />
          
          <div className="relative z-10 w-full max-w-lg mx-auto px-6">
             <div className="bg-white/90 backdrop-blur-2xl border border-white uppercase-card shadow-2xl shadow-sky-900/10 rounded-[2rem] p-8 md:p-10">
                
                {submitted ? (
                  <div className="text-center py-10">
                     <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                     </div>
                     <h2 className="text-2xl font-black font-heading text-zinc-900 tracking-tight mb-2">Request Received</h2>
                     <p className="text-zinc-600 font-medium text-sm mb-6">
                        Your FTO information has been successfully received by our team. We will contact you shortly to schedule your personalized product walkthrough.
                     </p>
                     <button 
                        onClick={() => window.location.href = '/'}
                        className="px-6 py-3 bg-zinc-900 text-white rounded-xl font-bold text-sm hover:-translate-y-1 transition shadow-lg shadow-zinc-900/20"
                     >
                        Return Home
                     </button>
                  </div>
                ) : (
                  <>
                     <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-black font-heading text-zinc-900 tracking-tight mb-3">Book Your Demo</h1>
                        <p className="text-sm font-medium text-zinc-500">
                           Transform your flight training organization with our all-in-one AI platform. Let's get started.
                        </p>
                     </div>

                     <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                           <div className="space-y-1.5">
                              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest pl-1">Name</label>
                              <input required type="text" name="name" className="w-full px-4 py-3 bg-slate-50 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition" placeholder="Capt. John Doe" />
                           </div>
                           <div className="space-y-1.5">
                              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest pl-1">Phone</label>
                              <input required type="tel" name="phone" className="w-full px-4 py-3 bg-slate-50 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition" placeholder="+91 99999 99999" />
                           </div>
                        </div>

                        <div className="space-y-1.5">
                           <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest pl-1">Work Email</label>
                           <input required type="email" name="email" className="w-full px-4 py-3 bg-slate-50 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition" placeholder="name@fto.com" />
                        </div>

                        <div className="space-y-1.5">
                           <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest pl-1">FTO Organization Name</label>
                           <input required type="text" name="fto" className="w-full px-4 py-3 bg-slate-50 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition" placeholder="e.g. Apex Aviation Academy" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                           <div className="space-y-1.5">
                              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest pl-1">Location / Base</label>
                              <input required type="text" name="location" className="w-full px-4 py-3 bg-slate-50 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition" placeholder="e.g. Karnal Airfield" />
                           </div>
                           <div className="space-y-1.5">
                              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest pl-1">Total Branches</label>
                              <select name="branches" className="w-full px-4 py-3 bg-slate-50 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition appearance-none">
                                 <option>1 (Single Base)</option>
                                 <option>2 - 4</option>
                                 <option>5+</option>
                              </select>
                           </div>
                        </div>

                        <div className="pt-4">
                           <button type="submit" className="w-full py-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white rounded-xl font-bold font-sans shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:-translate-y-1 transition active:translate-y-0 flex items-center justify-center gap-2">
                              Complete Request
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                           </button>
                        </div>
                        <p className="text-center text-[10px] text-zinc-400 font-medium mt-4">
                           By submitting, your details will be securely sent to our team at cephionix@gmail.com to process your demo request.
                        </p>
                     </form>
                  </>
                )}

             </div>
          </div>
       </div>
    </Layout>
  );
}
