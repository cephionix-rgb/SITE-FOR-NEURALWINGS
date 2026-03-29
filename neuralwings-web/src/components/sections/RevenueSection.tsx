import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { TrendingUp, Clock, ShieldCheck } from 'lucide-react';

function Counter({ from, to, duration = 2 }: { from: number, to: number, duration?: number }) {
  const [count, setCount] = useState(from);
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (inView) {
      let startTime: number;
      let animationFrame: number;

      const update = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);

        if (progress < 1) {
          setCount(from + (to - from) * progress);
          animationFrame = requestAnimationFrame(update);
        } else {
          setCount(to);
        }
      };

      animationFrame = requestAnimationFrame(update);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [inView, from, to, duration]);

  return <span ref={nodeRef}>{count.toFixed(1)}</span>;
}

export function RevenueSection() {
  return (
    <section className="relative py-[120px] bg-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-blue-50/80 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-200/60 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-200/60 to-transparent" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16 lg:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans font-semibold text-[20px] text-accent-gold uppercase tracking-[0.25em] mb-4 block"
          >
            ROI & EFFICIENCY
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-[36px] md:text-[52px] text-zinc-900 leading-tight max-w-4xl"
          >
            Unlock the True Value of Your Fleet.
          </motion.h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left: The Big Number */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex-1 text-center lg:text-left w-full"
          >
            <div className="relative w-full bg-white border border-blue-100 rounded-2xl p-6 mb-6 shadow-[0_4px_30px_rgba(59,130,246,0.08)] hover:-translate-y-1 transition-transform overflow-hidden">
              {/* Top accent */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 to-sky-400 rounded-t-2xl" />
              {/* Background number watermark */}
              <div className="absolute -right-4 -bottom-6 text-[160px] font-black text-blue-50 leading-none pointer-events-none select-none">
                1.8
              </div>
              <h3 className="font-heading font-extrabold text-[80px] md:text-[120px] text-blue-500 leading-none relative z-10">
                +<Counter from={0} to={1.8} duration={2} />h
              </h3>
              <p className="font-sans text-[20px] md:text-[24px] text-zinc-900 leading-tight font-semibold relative z-10">
                Average increase in daily utilization <span className="text-blue-500">per aircraft</span>.
              </p>
              <p className="font-sans text-[14px] text-zinc-500 font-medium leading-relaxed mt-2 relative z-10">
                By eliminating schedule conflicts, predicting maintenance events, and optimizing instructor duty times, AIRE squeezes maximum value out of every daylight hour.
              </p>
            </div>
          </motion.div>

          {/* Right: Stat Cards */}
          <div className="flex-1 w-full max-w-xl flex flex-col gap-5">
            {[
              {
                icon: TrendingUp,
                val: '+₹2.4 Cr',
                title: 'Additional Yearly Revenue',
                desc: 'Based on 1.8h extra flying per day across a standard 5-aircraft fleet at average hourly rates.',
                valColor: 'text-green-600',
                iconBg: 'bg-green-50',
                iconColor: 'text-green-500',
                border: 'border-green-100',
                accent: 'from-green-400 to-emerald-400',
              },
              {
                icon: Clock,
                val: '-30%',
                title: 'Grounded Time',
                desc: 'Predictive maintenance alerts ensure scheduled 100hr checks never disrupt active flight lines.',
                valColor: 'text-sky-600',
                iconBg: 'bg-sky-50',
                iconColor: 'text-sky-500',
                border: 'border-sky-100',
                accent: 'from-sky-400 to-blue-400',
              },
              {
                icon: ShieldCheck,
                val: 'Zero',
                title: 'DGCA Fines',
                desc: '100% guaranteed compliance with FDTL and CAR Section 7 limits for every scheduled sortie.',
                valColor: 'text-blue-600',
                iconBg: 'bg-blue-50',
                iconColor: 'text-blue-500',
                border: 'border-blue-100',
                accent: 'from-blue-400 to-indigo-400',
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className={`relative w-full bg-white border ${stat.border} rounded-2xl p-5 flex items-start gap-5 hover:-translate-y-1 transition-transform shadow-[0_4px_20px_rgba(59,130,246,0.05)] overflow-hidden`}
              >
                <div className={`absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b ${stat.accent} rounded-l-2xl`} />
                <div className={`mt-1 w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${stat.iconBg}`}>
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <div>
                  <div className="flex items-end gap-2 mb-1">
                    <span className={`font-heading font-bold text-[26px] leading-none ${stat.valColor}`}>{stat.val}</span>
                    <span className="font-heading font-bold text-[16px] text-zinc-800 leading-none pb-0.5">{stat.title}</span>
                  </div>
                  <p className="font-sans text-[13px] text-zinc-500 leading-relaxed mt-1.5">
                    {stat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
