import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import logoUrl from '../../assets/logo.png';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-[1000] h-[72px] transition-all duration-300',
        'bg-white/80 backdrop-blur-xl border-b border-zinc-200',
        scrolled ? 'shadow-sm py-0' : 'py-2'
      )}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Left */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-4 cursor-pointer">
          <img src={logoUrl} alt="Neural Wings" className="h-[40px] w-auto" />
          <div className="flex flex-col">
            <span className="font-heading font-bold text-[18px] leading-tight text-zinc-900 tracking-wide">
              NEURAL WINGS
            </span>
            <span className="font-sans font-light text-[11px] text-accent-gold leading-tight">
              by Cephionix
            </span>
          </div>
        </button>

        {/* Center Links */}
        <div className="hidden lg:flex items-center gap-8">
          {['Features', 'Modules', 'AI Engine', 'Dashboards', 'Pricing', 'Demo'].map((item) => (
            item === 'AI Engine' ? (
              <button
                key={item}
                onClick={() => {
                  document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
                  window.dispatchEvent(new CustomEvent('openDemoTab', { detail: { tab: 'ops' } }));
                }}
                className="font-sans font-medium text-[14px] text-zinc-600 transition-colors hover:text-sky-600"
              >
                {item}
              </button>
            ) : (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="font-sans font-medium text-[14px] text-zinc-600 transition-colors hover:text-sky-600"
              >
                {item}
              </a>
            )
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Link to="/book-demo" className="px-6 py-2 rounded-xl bg-primary text-white font-sans text-sm font-medium transition-all duration-300 hover:bg-primary-hover shadow-sm">
            Book a Demo
          </Link>
        </div>
      </div>
    </nav>
  );
}
