import { motion } from 'framer-motion';
import { Lock, Server, FileCheck2 } from 'lucide-react';

export function Security() {
  return (
    <section className="relative py-16 md:py-[140px] overflow-hidden bg-gradient-to-b from-white to-[#F0F7FF]">
      {/* Soft blue aurora */}
      <div className="absolute top-0 left-1/2 w-[900px] h-[400px] bg-blue-100/50 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-sky-100/40 rounded-full blur-[100px] pointer-events-none" />
      {/* Bottom gradient transition to dark */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-background-primary pointer-events-none z-10" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans font-semibold text-[20px] text-accent-gold uppercase tracking-[0.25em] mb-4 block"
          >
            TRUST & COMPLIANCE
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-[28px] md:text-[52px] text-zinc-900 leading-tight max-w-3xl mb-6"
          >
            Bank-grade Security.{' '}
            <br className="hidden md:block" />
            <span className="text-gradient">DGCA Compliant.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-[18px] text-zinc-500 max-w-2xl"
          >
            Your FTO's data is critical infrastructure. We protect it with the same rigorous standards required by the world's leading financial institutions and aviation authorities.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Lock,
              gradient: 'from-blue-600 to-sky-400',
              shadow: 'shadow-blue-200',
              title: 'AES-256 Encryption',
              desc: 'All student records, flight logs, and financial data are encrypted at rest and in transit. Only authorized roles can decrypt and access sensitive information.',
            },
            {
              icon: Server,
              gradient: 'from-[#3B82F6] to-cyan-400',
              shadow: 'shadow-blue-200',
              title: 'Multi-AZ Cloud Backups',
              desc: 'Deployed on AWS infrastructure with active-active redundancies across multiple availability zones. Your data is backed up hourly and immune to single-point failures.',
            },
            {
              icon: FileCheck2,
              gradient: 'from-sky-500 to-blue-400',
              shadow: 'shadow-sky-200',
              title: 'Audit-Ready Always',
              desc: 'Every action taken in the system is immutably logged. Generate compliance reports for DGCA audits with a single click — no scrambling through paper files.',
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(59,130,246,0.12)', borderColor: 'rgba(59,130,246,0.25)' }}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-blue-100 shadow-[0_4px_20px_rgba(59,130,246,0.06)] transition-all duration-300 group"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg ${feature.shadow} group-hover:scale-110 transition-transform duration-500`}>
                <feature.icon className="w-8 h-8 text-zinc-900" />
              </div>
              <h3 className="font-heading font-bold text-[22px] text-zinc-900 mb-4">{feature.title}</h3>
              <p className="font-sans text-[15px] text-zinc-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
