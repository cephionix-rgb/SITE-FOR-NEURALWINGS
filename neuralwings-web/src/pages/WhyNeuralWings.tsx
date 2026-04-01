import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '../components/layout/Layout';
import { WarRoomHero } from '../components/sections/why/WarRoomHero';
import { IncidentBoard } from '../components/sections/why/IncidentBoard';
import { SystemsStatusBoard } from '../components/sections/why/SystemsStatusBoard';
import { RevenueIntelPanel } from '../components/sections/why/RevenueIntelPanel';

const WA_LINK =
  'https://wa.me/919914801833?text=Hi%2C%20I%27d%20like%20to%20book%20a%20Neural%20Wings%20demo';

function PageCTA() {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 md:py-[120px] bg-gradient-to-b from-[#F0F7FF] to-white overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[700px] h-[400px] bg-blue-200/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-sky-200/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-[800px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-200 bg-sky-50 font-sans text-[12px] font-semibold text-sky-600 tracking-wide mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            Ready to Fix All 30?
          </span>

          <h2 className="font-heading font-bold text-[36px] md:text-[56px] text-zinc-900 leading-tight mb-6">
            You've seen the damage.
            <br />
            <span className="text-gradient">Now fix it.</span>
          </h2>

          <p className="font-sans text-[17px] text-zinc-500 leading-relaxed mb-10 max-w-[560px] mx-auto">
            Neural Wings goes live in under 72 hours. No credit card. No spreadsheets. No chaos. One platform built for how Indian FTOs actually operate.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              onClick={() => navigate('/book-demo')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full bg-sky-500 text-white font-sans font-bold text-[15px] shadow-lg shadow-sky-200 hover:bg-sky-600 transition-colors"
            >
              Book a Live Demonstration
            </motion.button>
            <motion.a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full border border-zinc-200 bg-white text-zinc-800 font-sans font-bold text-[15px] shadow-sm hover:border-zinc-300 transition-all"
            >
              Contact Sales
            </motion.a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {['< 72 hrs onboarding', 'DGCA Compliant', '19 Integrated Modules', 'No Credit Card'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span className="font-sans text-[13px] text-zinc-400">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function WhyNeuralWings() {
  return (
    <Layout>
      <WarRoomHero />
      <IncidentBoard />
      <SystemsStatusBoard />
      <RevenueIntelPanel />
      <PageCTA />
    </Layout>
  );
}
