import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, LayoutDashboard, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HeroGlobe } from './HeroGlobe';

const WA_LINK =
  'https://wa.me/919914801833?text=Hi%2C%20I%27d%20like%20to%20book%20a%20Neural%20Wings%20demo';

function ParticleField() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; speed: number; size: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 0.05 + Math.random() * 0.1,
      size: 2 + Math.random() * 4,
    }));
    setParticles(newParticles);

    let animationFrameId: number;

    const updateParticles = () => {
      setParticles(prev => prev.map(p => ({
        ...p,
        y: p.y - p.speed > 0 ? p.y - p.speed : 100,
      })));
      animationFrameId = requestAnimationFrame(updateParticles);
    };

    animationFrameId = requestAnimationFrame(updateParticles);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 z-0">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute bg-sky-300 rounded-full blur-[1px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 md:pt-28 md:pb-20 overflow-hidden bg-transparent">
      {/* Background Effects */}
      <ParticleField />
      <div className="absolute inset-0 hud-grid-light z-0 opacity-[0.5]" />

      {/* Deeper Sky Blue atmosphere blobs for amplified aura */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-sky-400/35 animate-[float-blob_10s_ease-in-out_infinite] rounded-full blur-[140px] -translate-y-1/2 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-[700px] h-[600px] bg-sky-300/40 animate-[float-blob_15s_ease-in-out_infinite] rounded-full blur-[160px] translate-y-1/3 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 w-[550px] h-[550px] bg-blue-300/30 animate-[float-blob_12s_ease-in-out_infinite] rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-10 lg:gap-14 items-center">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="px-5 py-2 rounded-full border border-blue-400/40 bg-blue-500/15 shadow-sm mb-8 backdrop-blur-md inline-flex items-center gap-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="font-sans font-bold text-[10px] text-sky-800 uppercase tracking-[0.2em] drop-shadow-sm">
            Aviation Management System · Available Worldwide
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="font-heading font-extrabold text-[36px] sm:text-[52px] md:text-[72px] lg:text-[76px] leading-[1.05] tracking-tight text-zinc-900 mb-6"
        >
          <span className="block drop-shadow-sm">The Future of the</span>
          <span className="block text-gradient bg-[length:200%_auto] animate-[gradient_4s_ease-in-out_infinite] py-2">Aviation Industry</span>
          <span className="block drop-shadow-sm">is Here.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-sans font-normal text-[15px] md:text-[18px] lg:text-[20px] text-zinc-700 font-medium max-w-2xl lg:mx-0 mx-auto leading-relaxed mb-8 drop-shadow-sm px-2 md:px-0"
        >
          The complete AI-powered management system for flight training organisations — built on ICAO standards, so it fits the way academies operate under DGCA, EASA, the FAA or any national authority. 19 integrated modules. One platform. Zero paper.
        </motion.p>

        {/* Global availability strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
          className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 -mt-2 mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-200 bg-white/70 backdrop-blur-sm shadow-sm">
            <Globe className="w-3.5 h-3.5 text-sky-500" />
            <span className="font-sans text-[12px] md:text-[13px] font-semibold text-zinc-700">
              One platform, every jurisdiction — spin the globe to find yours
            </span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10 relative pointer-events-auto z-50 w-full sm:w-auto px-4 sm:px-0"
        >
          <Link to="/book-demo" className="relative group cursor-pointer inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
            <button className="relative h-14 px-6 md:px-7 whitespace-nowrap rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] text-white font-sans font-semibold text-[15px] md:text-[16px] shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto">
              Book a Live Demo
            </button>
          </Link>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="h-14 px-6 md:px-7 rounded-xl bg-white border-2 border-sky-400 text-sky-600 font-sans font-semibold text-[15px] md:text-[16px] shadow-sm hover:border-sky-500 hover:text-sky-700 hover:bg-sky-50 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <span className="whitespace-nowrap">Contact Sales</span> <span className="text-xl leading-none">→</span>
          </a>
          <a href="#demo" className="h-14 px-6 md:px-7 rounded-xl bg-white border border-zinc-200 text-zinc-700 font-sans font-semibold text-[15px] md:text-[16px] shadow-sm hover:border-sky-300 hover:text-sky-600 hover:bg-sky-50 transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
            <span className="whitespace-nowrap">Explore the System</span> <span className="text-xl leading-none">→</span>
          </a>
        </motion.div>

        {/* Interactive Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {[
            { metric: "19", label: "Integrated Modules", icon: null },
            { metric: "14", label: "Role Dashboards", icon: LayoutDashboard },
            { metric: "ICAO", label: "Standards-Based", icon: ShieldCheck },
            { metric: "AIRE", label: "Powered Scheduling", icon: Cpu },
          ].map((stat, i) => (
            <div key={i} className="group relative bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center">
              {stat.icon ? (
                <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <stat.icon className="w-6 h-6" />
                </div>
              ) : (
                <span className="text-gradient font-heading font-extrabold text-4xl mb-2">{stat.metric}</span>
              )}
              {stat.icon && stat.metric !== "14" && stat.metric !== "19" && (
                <span className="text-zinc-800 font-heading font-bold text-xl mb-1">{stat.metric}</span>
              )}
              <span className="text-zinc-600 font-sans text-[11px] uppercase tracking-wider font-bold">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
        </div>

        {/* Globe column — mounts on idle, so the headline paints first */}
        <div className="relative w-full flex justify-center lg:justify-end order-first lg:order-last">
          <HeroGlobe />
        </div>
      </div>
    </section>
  );
}
