import { motion } from 'framer-motion';
import { Zap, Box, Layout, Code2, Database } from 'lucide-react';

const techies = [
  { name: 'React 18', icon: Box, desc: 'Component Architecture' },
  { name: 'TypeScript', icon: Code2, desc: 'Type-Safe Logic' },
  { name: 'Vite', icon: Zap, desc: 'Lightning Fast Build' },
  { name: 'TailwindCSS', icon: Layout, desc: 'Styling Engine' },
  { name: 'Framer Motion', icon: Box, desc: 'Fluid UI Animations' },
  { name: 'Node.js', icon: Database, desc: 'Backend Services' },
  { name: 'Python', icon: Code2, desc: 'AIRE Engine Core' },
  { name: 'PostgreSQL', icon: Database, desc: 'Relational Data' },
];

export function TechStack() {
  return (
    <section className="relative py-[100px] bg-white overflow-hidden border-y border-blue-100">
      {/* Subtle blue tint blobs */}
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[300px] bg-blue-50 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-bold text-[28px] md:text-[36px] text-zinc-900 mb-4"
          >
            Built for Performance.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans text-[16px] text-zinc-500 max-w-2xl mx-auto"
          >
            Modern FTOs deserve modern infrastructure. We use a best-in-class, enterprise-grade technology stack to ensure sub-second latencies and unbreakable reliability.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-5xl mx-auto">
          {techies.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(59,130,246,0.12)', borderColor: 'rgba(59,130,246,0.35)' }}
              className="px-6 py-4 rounded-xl bg-[#F5F9FF] border border-blue-100 flex items-center gap-4 transition-all duration-300 group cursor-default"
            >
              <tech.icon className="w-6 h-6 text-zinc-500 group-hover:text-blue-500 transition-colors" />
              <div className="flex flex-col text-left">
                <span className="font-heading font-bold text-[15px] text-zinc-900">{tech.name}</span>
                <span className="font-sans text-[11px] text-zinc-500">{tech.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
