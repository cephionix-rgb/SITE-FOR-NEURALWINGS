import { Layout } from '../components/layout/Layout';
import { DemoForm } from '../components/forms/DemoForm';

export function BookDemo() {
  return (
    <Layout>
       <div className="min-h-screen pt-32 pb-20 flex items-center justify-center relative overflow-hidden bg-slate-50">

          {/* Premium Ambient Background */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-sky-300/30 animate-[float-blob_10s_ease-in-out_infinite] rounded-full blur-[140px] pointer-events-none z-0" />
          <div className="absolute bottom-0 right-1/4 w-[700px] h-[600px] bg-sky-200/40 animate-[float-blob_15s_ease-in-out_infinite] rounded-full blur-[150px] pointer-events-none z-0" />

          <div className="relative z-10 w-full max-w-lg mx-auto px-6">
             <div className="bg-white/90 backdrop-blur-2xl border border-white uppercase-card shadow-2xl shadow-sky-900/10 rounded-[2rem] p-8 md:p-10">

                <div className="text-center mb-10">
                   <h1 className="text-3xl md:text-4xl font-black font-heading text-zinc-900 tracking-tight mb-3">Book Your Demo</h1>
                   <p className="text-sm font-medium text-zinc-500">
                      Transform your flight training organization with our all-in-one AI platform. Let's get started.
                   </p>
                </div>

                <DemoForm showReturnHome />

             </div>
          </div>
       </div>
    </Layout>
  );
}
